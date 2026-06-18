<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlayerGameStat;
use App\Models\User;
use App\Models\UserPresence;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * PlayerDiscoveryController — Dawri 2.0 player search.
 *
 *   GET /players?game=&country=&q=&available=&min_wins=&sort=
 *
 * Filters:
 *   game        — restrict to users with stats in this game
 *   country     — exact match on users.country
 *   q           — substring search on name/nickname
 *   available   — only currently-online users
 *   min_wins    — users with at least N wins (if game set, in that game)
 *   sort        — wins | win_rate | recent (default: wins)
 *
 * Returns up to 60 results in one page (plenty for browse + a follow-up
 * query if needed). Presence is folded in for the online filter + display.
 */
final class PlayerDiscoveryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = $request->validate([
            'game'      => ['nullable', 'string', 'max:40'],
            'country'   => ['nullable', 'string', 'max:80'],
            'q'         => ['nullable', 'string', 'max:80'],
            'available' => ['nullable', 'boolean'],
            'min_wins'  => ['nullable', 'integer', 'min:0'],
            'sort'      => ['nullable', 'in:wins,win_rate,recent'],
        ]);

        $meId = $request->user()->id;

        // Base query — exclude self, banned/inactive, organizers if you want
        // (kept inclusive for now; organizers can still appear as players).
        $q = User::query()
            ->where('id', '!=', $meId)
            ->where('status', 'active');

        if (!empty($data['country'])) {
            $q->where('country', $data['country']);
        }
        if (!empty($data['q'])) {
            $needle = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $data['q']) . '%';
            $q->where(function ($w) use ($needle) {
                $w->where('name', 'like', $needle)
                  ->orWhere('nickname', 'like', $needle);
            });
        }

        // Game filter: only users who have stats for that game.
        $game     = $data['game']     ?? null;
        $minWins  = (int) ($data['min_wins']  ?? 0);
        $sort     = $data['sort']     ?? 'wins';
        $online   = (bool) ($data['available'] ?? false);

        if ($game) {
            $q->whereExists(function ($sub) use ($game, $minWins) {
                $sub->from('player_game_stats')
                    ->whereColumn('player_game_stats.user_id', 'users.id')
                    ->where('player_game_stats.game', $game)
                    ->where('player_game_stats.wins', '>=', $minWins);
            });
        } elseif ($minWins > 0) {
            // No game scope — apply min wins to the sum across games.
            $q->whereIn('users.id', PlayerGameStat::query()
                ->select('user_id')
                ->groupBy('user_id')
                ->havingRaw('SUM(wins) >= ?', [$minWins]));
        }

        if ($online) {
            $q->whereIn('users.id', UserPresence::query()->select('user_id')->where('status', UserPresence::STATUS_ONLINE));
        }

        $users = $q->limit(60)->get();
        if ($users->isEmpty()) {
            return response()->json(['data' => [], 'meta' => ['count' => 0]]);
        }

        $userIds = $users->pluck('id')->all();

        // Per-user stats (scoped to game if given, otherwise totals).
        $stats = $game
            ? PlayerGameStat::query()->whereIn('user_id', $userIds)->where('game', $game)->get()->keyBy('user_id')
            : PlayerGameStat::query()
                ->select('user_id', DB::raw('SUM(matches_played) as matches_played'), DB::raw('SUM(wins) as wins'), DB::raw('SUM(losses) as losses'), DB::raw('SUM(tournaments_won) as tournaments_won'))
                ->whereIn('user_id', $userIds)
                ->groupBy('user_id')
                ->get()
                ->keyBy('user_id');

        $presence = UserPresence::query()
            ->whereIn('user_id', $userIds)
            ->get()
            ->mapWithKeys(fn (UserPresence $p) => [$p->user_id => $p->status])
            ->all();

        $rows = $users->map(function (User $u) use ($stats, $presence, $game) {
            $s = $stats->get($u->id);
            $matches = (int) ($s->matches_played ?? 0);
            $wins    = (int) ($s->wins ?? 0);
            return [
                'user' => [
                    'id'           => $u->id,
                    'name'         => $u->name,
                    'nickname'     => $u->nickname,
                    'display_name' => $u->display_name,
                    'avatar_url'   => $u->avatar_url,
                    'country'      => $u->country,
                    'city'         => $u->city,
                ],
                'presence'        => $presence[$u->id] ?? 'offline',
                'matches_played'  => $matches,
                'wins'            => $wins,
                'losses'          => (int) ($s->losses ?? 0),
                'win_rate'        => $matches > 0 ? round(($wins / $matches) * 100, 1) : 0.0,
                'tournaments_won' => (int) ($s->tournaments_won ?? 0),
                'top_game'        => $game,
            ];
        });

        // In-PHP sort (set is small; lets us use the derived win_rate).
        $rows = match ($sort) {
            'win_rate' => $rows->sortByDesc('win_rate')->values(),
            'recent'   => $rows->sortByDesc(fn ($r) => $r['matches_played'])->values(),
            default    => $rows->sortByDesc('wins')->values(),
        };

        return response()->json(['data' => $rows, 'meta' => ['count' => $rows->count()]]);
    }
}
