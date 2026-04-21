<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * LeaderboardController
 *
 * Returns ranked player standings for a single game, computed from
 * completed match results across ALL tournaments for that game.
 *
 * Sprint 5 fixes:
 *   (1) Avatars now resolve through User::avatar_url accessor (handles
 *       both uploaded storage paths and external DiceBear URLs).
 *   (2) Each row carries display_name + nickname, matching the rest of
 *       the app's participant serialization shape (Sprint 4).
 *   (3) Loss-count union rewritten to avoid potential double-counting
 *       when a user appears in both participant_a and participant_b rows.
 *
 * Endpoint:  GET /api/v1/leaderboard?game={game}&limit={limit}
 */
class LeaderboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $game  = (string) $request->input('game', 'ea_fc');
        $limit = min((int) $request->input('limit', 50), 100);

        // ── Step 1: Aggregate per-user win/loss counts ──────────────────
        //
        // We compute wins AND losses in a single UNIONed subquery that
        // emits one row per (user_id, outcome_type), then pivot-sum in
        // the outer query. This is safer than the previous approach,
        // which joined two separate loss subqueries (risking double-count
        // if a user ever appeared in both, and producing inflated SUMs).
        //
        // Each completed match contributes exactly one win row and one
        // loss row (unless it was a bye, in which case winner_id is null
        // and it's excluded by whereNotNull).

        $winsAndLosses = DB::query()->fromSub(
            DB::table('tournament_matches as m')
                ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
                ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
                ->join('tournament_participants as wp', 'wp.id', '=', 'm.winner_id')
                ->where('m.status', 'completed')
                ->whereNotNull('m.winner_id')
                ->where('t.game', $game)
                ->select('wp.user_id', DB::raw("'win' as outcome"))
                ->unionAll(
                    DB::table('tournament_matches as m')
                        ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
                        ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
                        ->join('tournament_participants as pa', 'pa.id', '=', 'm.participant_a_id')
                        ->where('m.status', 'completed')
                        ->whereNotNull('m.winner_id')
                        ->whereColumn('m.winner_id', '!=', 'm.participant_a_id')
                        ->where('t.game', $game)
                        ->select('pa.user_id', DB::raw("'loss' as outcome"))
                )
                ->unionAll(
                    DB::table('tournament_matches as m')
                        ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
                        ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
                        ->join('tournament_participants as pb', 'pb.id', '=', 'm.participant_b_id')
                        ->where('m.status', 'completed')
                        ->whereNotNull('m.winner_id')
                        ->whereColumn('m.winner_id', '!=', 'm.participant_b_id')
                        ->where('t.game', $game)
                        ->select('pb.user_id', DB::raw("'loss' as outcome"))
                ),
            'o'
        );

        // Pivot: one row per user, wins + losses counted.
        $aggregates = DB::query()
            ->fromSub($winsAndLosses, 'x')
            ->select([
                'x.user_id',
                DB::raw("SUM(CASE WHEN x.outcome = 'win'  THEN 1 ELSE 0 END) as wins"),
                DB::raw("SUM(CASE WHEN x.outcome = 'loss' THEN 1 ELSE 0 END) as losses"),
            ])
            ->groupBy('x.user_id')
            ->having('wins', '>', 0);  // must have won at least once to rank

        // ── Step 2: Rank and hydrate through User model ─────────────────
        //
        // We select the TOP N user_ids with their win/loss counts, then
        // fetch full User records so accessors (avatar_url, display_name)
        // apply. Sorting is by points (3 per win) then wins desc.

        $ranked = DB::query()
            ->fromSub($aggregates, 'agg')
            ->select([
                'agg.user_id',
                'agg.wins',
                'agg.losses',
                DB::raw('agg.wins * 3 as points'),
            ])
            ->orderByDesc('points')
            ->orderByDesc('wins')
            ->limit($limit)
            ->get();

        if ($ranked->isEmpty()) {
            return response()->json(['data' => []]);
        }

        // Hydrate users in one query, keyed by id for fast lookup.
        $userIds = $ranked->pluck('user_id')->unique()->values();
        $users   = User::whereIn('id', $userIds)->get()->keyBy('id');

        $authId = (string) optional($request->user())->id;

        $data = $ranked->values()->map(function ($row, int $idx) use ($users, $authId, $game) {
            /** @var User|null $u */
            $u = $users->get($row->user_id);
            if (! $u) { return null; }

            return [
                'rank'         => $idx + 1,
                'user_id'      => (string) $u->id,
                'name'         => $u->name,
                'nickname'     => $u->nickname,
                'display_name' => $u->display_name,
                'avatar_url'   => $u->avatar_url,
                'wins'         => (int) $row->wins,
                'losses'       => (int) $row->losses,
                'points'       => (int) $row->points,
                'game'         => $game,
                'is_current'   => (string) $u->id === $authId,
            ];
        })->filter()->values();

        return response()->json(['data' => $data]);
    }
}
