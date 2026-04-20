<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $game  = $request->input('game', 'ea_fc');
        $limit = min((int) $request->input('limit', 50), 100);

        $winsQuery = DB::table('tournament_matches as m')
            ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
            ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
            ->join('tournament_participants as wp', 'wp.id', '=', 'm.winner_id')
            ->where('m.status', 'completed')
            ->whereNotNull('m.winner_id')
            ->where('t.game', $game)
            ->groupBy('wp.user_id')
            ->select('wp.user_id', DB::raw('COUNT(*) as win_count'));

        $lossesA = DB::table('tournament_matches as m')
            ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
            ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
            ->join('tournament_participants as pa', 'pa.id', '=', 'm.participant_a_id')
            ->where('m.status', 'completed')
            ->whereNotNull('m.winner_id')
            ->whereColumn('m.winner_id', '!=', 'm.participant_a_id')
            ->where('t.game', $game)
            ->groupBy('pa.user_id')
            ->select('pa.user_id', DB::raw('COUNT(*) as loss_count'));

        $lossesB = DB::table('tournament_matches as m')
            ->join('brackets as br', 'br.id', '=', 'm.bracket_id')
            ->join('tournaments as t', 't.id', '=', 'br.tournament_id')
            ->join('tournament_participants as pb', 'pb.id', '=', 'm.participant_b_id')
            ->where('m.status', 'completed')
            ->whereNotNull('m.winner_id')
            ->whereColumn('m.winner_id', '!=', 'm.participant_b_id')
            ->where('t.game', $game)
            ->groupBy('pb.user_id')
            ->select('pb.user_id', DB::raw('COUNT(*) as loss_count'));

        $lossUnion = $lossesA->unionAll($lossesB);

        $results = DB::table('users as u')
            ->joinSub($winsQuery, 'w', 'w.user_id', '=', 'u.id')
            ->leftJoinSub($lossUnion, 'l', 'l.user_id', '=', 'u.id')
            ->select([
                'u.id as user_id',
                'u.name',
                'u.avatar',
                DB::raw('COALESCE(w.win_count, 0) as wins'),
                DB::raw('COALESCE(SUM(l.loss_count), 0) as losses'),
                DB::raw('COALESCE(w.win_count, 0) * 3 as points'),
            ])
            ->groupBy('u.id', 'u.name', 'u.avatar', 'w.win_count')
            ->orderByDesc('points')
            ->orderByDesc('wins')
            ->limit($limit)
            ->get();

        $authId = (string) optional($request->user())->id;

        $data = $results->values()->map(fn ($row, $idx) => [
            'rank'       => $idx + 1,
            'user_id'    => (string) $row->user_id,
            'name'       => $row->name,
            'avatar'     => $row->avatar,
            'wins'       => (int) $row->wins,
            'losses'     => (int) $row->losses,
            'points'     => (int) $row->points,
            'is_current' => (string) $row->user_id === $authId,
        ]);

        return response()->json(['data' => $data]);
    }
}
