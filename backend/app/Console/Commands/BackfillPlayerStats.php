<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\PlayerGameStat;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Recompute player_game_stats from the existing tournament data.
 *
 *   php artisan dawri:backfill-stats          # all users
 *   php artisan dawri:backfill-stats --truncate
 *
 * Sources of truth:
 *   - tournament_participants  → tournaments_played (per game), tournaments_won
 *     (where the participant won the final and tournament.status='completed').
 *   - tournament_matches       → matches_played, wins, losses, draws,
 *     last_match_at, win-streak (best-effort, chronological).
 */
final class BackfillPlayerStats extends Command
{
    protected $signature   = 'dawri:backfill-stats {--truncate}';
    protected $description = 'Recompute per-game player stats from existing tournaments + matches.';

    public function handle(): int
    {
        if ($this->option('truncate')) {
            $this->warn('Truncating player_game_stats…');
            DB::table('player_game_stats')->truncate();
        }

        $this->info('Aggregating from tournament_participants…');
        // Tournaments played / won, per (user, game). Winner is on brackets.
        $rows = DB::table('tournament_participants as tp')
            ->join('tournaments as t', 't.id', '=', 'tp.tournament_id')
            ->leftJoin('brackets as b', 'b.tournament_id', '=', 't.id')
            ->selectRaw('tp.user_id as user_id, t.game as game,
                COUNT(*) as tournaments_played,
                SUM(CASE WHEN b.status = "completed" AND tp.id = b.winner_participant_id THEN 1 ELSE 0 END) as tournaments_won')
            ->whereNotNull('tp.user_id')
            ->groupBy('tp.user_id', 't.game')
            ->get();

        foreach ($rows as $r) {
            $this->upsert($r->user_id, $r->game, [
                'tournaments_played' => (int) $r->tournaments_played,
                'tournaments_won'    => (int) $r->tournaments_won,
            ]);
        }
        $this->info("Aggregated tournaments for {$rows->count()} (user, game) pairs.");

        $this->info('Aggregating from tournament_matches…');
        // Per-match stats — winners/losers count, last_match_at.
        // We resolve participant -> user via tournament_participants.
        $matchRows = DB::table('tournament_matches as m')
            ->join('brackets as b', 'b.id', '=', 'm.bracket_id')
            ->join('tournaments as t', 't.id', '=', 'b.tournament_id')
            ->join('tournament_participants as pa', 'pa.id', '=', 'm.participant_a_id')
            ->join('tournament_participants as pb', 'pb.id', '=', 'm.participant_b_id')
            ->whereIn('m.status', ['completed', 'walkover'])
            ->select(
                't.game as game', 'm.completed_at', 'm.winner_id', 'm.loser_id',
                'pa.id as pa_id', 'pa.user_id as pa_user',
                'pb.id as pb_id', 'pb.user_id as pb_user',
            )
            ->get();

        // Aggregate in-memory then bulk write — small enough for current data volume.
        $agg = [];
        foreach ($matchRows as $m) {
            foreach ([['pa', $m->pa_id, $m->pa_user], ['pb', $m->pb_id, $m->pb_user]] as [$side, $pid, $uid]) {
                if (! $uid) continue;
                $key = $uid . '|' . $m->game;
                $agg[$key] ??= ['user_id' => $uid, 'game' => $m->game, 'matches_played' => 0, 'wins' => 0, 'losses' => 0, 'draws' => 0, 'last' => null];
                $agg[$key]['matches_played']++;
                if ($m->winner_id === $pid)      $agg[$key]['wins']++;
                elseif ($m->loser_id === $pid)   $agg[$key]['losses']++;
                else                             $agg[$key]['draws']++;
                if ($m->completed_at && (! $agg[$key]['last'] || $m->completed_at > $agg[$key]['last'])) {
                    $agg[$key]['last'] = $m->completed_at;
                }
            }
        }
        foreach ($agg as $a) {
            $this->upsert($a['user_id'], $a['game'], [
                'matches_played' => $a['matches_played'],
                'wins'           => $a['wins'],
                'losses'         => $a['losses'],
                'draws'          => $a['draws'],
                'last_match_at'  => $a['last'],
            ]);
        }
        $this->info('Aggregated matches for ' . count($agg) . ' (user, game) pairs.');

        $this->info('Done.');
        return self::SUCCESS;
    }

    /**
     * Upsert one (user, game) row, merging the given fields with existing values.
     * `tournaments_*` from the first pass and `matches_*` from the second pass
     * both coexist on the same row.
     */
    private function upsert(string $userId, string $game, array $fields): void
    {
        $row = PlayerGameStat::query()->firstOrNew([
            'user_id' => $userId, 'game' => $game,
        ]);
        foreach ($fields as $k => $v) $row->{$k} = $v;
        $row->save();
    }
}
