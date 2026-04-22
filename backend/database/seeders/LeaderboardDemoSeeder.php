<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * LeaderboardDemoSeeder — populate the /leaderboard page with realistic data.
 *
 * The LeaderboardController aggregates win/loss counts from completed
 * tournament_matches (joined to brackets → tournaments → tournament_participants).
 * Neither TournamentSeeder nor RankingSeeder generates these match rows, so
 * the leaderboard stays empty until real players play real matches.
 *
 * This seeder closes that gap for dev/demo environments by:
 *   1. Walking every tournament that already has ≥ 2 participants.
 *   2. Creating a bracket row for it if missing.
 *   3. Generating a round-robin of completed matches across all participants.
 *   4. Picking winners weighted by seed (higher seed = slightly better record).
 *
 * Idempotent: re-running the seeder deletes any prior demo matches/brackets
 * it created (identified by a sentinel column value) and recreates them.
 * Real matches produced by the BracketGeneratorService are left untouched
 * because the service uses a different bracket_section / metadata shape.
 *
 * Run: php artisan db:seed --class=LeaderboardDemoSeeder
 */
class LeaderboardDemoSeeder extends Seeder
{
    /** Value stored in brackets.status for rows created by this seeder, so
     *  subsequent runs can clean them up without touching real brackets. */
    private const SENTINEL_STATUS = 'demo_seeded';

    public function run(): void
    {
        // ── Step 1: clean up prior demo runs ──────────────────────────────
        $prior = DB::table('brackets')->where('status', self::SENTINEL_STATUS)->pluck('id');
        if ($prior->isNotEmpty()) {
            DB::table('tournament_matches')->whereIn('bracket_id', $prior)->delete();
            DB::table('brackets')->whereIn('id', $prior)->delete();
            $this->command->info("  cleaned {$prior->count()} prior demo brackets");
        }

        // ── Step 2: walk tournaments with participants ────────────────────
        $tournaments = DB::table('tournaments')->get(['id', 'name', 'game']);

        $totalMatches   = 0;
        $totalBrackets  = 0;

        foreach ($tournaments as $tourney) {
            $participants = DB::table('tournament_participants')
                ->where('tournament_id', $tourney->id)
                ->orderBy('seed')
                ->get(['id', 'user_id', 'seed']);

            if ($participants->count() < 2) {
                continue; // can't play matches
            }

            // Skip tournaments that already have a bracket (real or demo).
            // The brackets.tournament_id UNIQUE constraint means we can't
            // co-exist; real brackets from BracketGeneratorService take
            // precedence over demo data.
            $hasExistingBracket = DB::table('brackets')
                ->where('tournament_id', $tourney->id)
                ->exists();
            if ($hasExistingBracket) {
                $this->command->info("  skipped '{$tourney->name}' — already has a bracket");
                continue;
            }

            $bracketId = (string) Str::uuid();
            $now = now();

            DB::table('brackets')->insert([
                'id'                 => $bracketId,
                'tournament_id'      => $tourney->id,
                'format'             => 'round_robin',
                'status'             => self::SENTINEL_STATUS,
                'total_rounds'       => 1,
                'current_round'      => 1,
                'participant_count'  => $participants->count(),
                'bye_count'          => 0,
                'generated_at'       => $now,
                'completed_at'       => $now,
                'created_at'         => $now,
                'updated_at'         => $now,
            ]);
            $totalBrackets++;

            // ── Step 3: round-robin, all pairs play ──────────────────────
            $matchNumber = 1;
            $pList = $participants->values();
            $winCount  = [];  // participant_id => wins
            $lossCount = [];  // participant_id => losses

            for ($i = 0; $i < $pList->count(); $i++) {
                for ($j = $i + 1; $j < $pList->count(); $j++) {
                    $a = $pList[$i];
                    $b = $pList[$j];

                    // Seed-weighted winner — lower seed number = stronger player.
                    // A seed-1 beats a seed-16 roughly 85% of the time.
                    $winnerIsA = $this->decideWinner($a->seed, $b->seed);
                    $winner = $winnerIsA ? $a : $b;
                    $loser  = $winnerIsA ? $b : $a;

                    $scoreWinner = rand(2, 3);                // winner 2 or 3
                    $scoreLoser  = rand(0, $scoreWinner - 1); // always lower

                    DB::table('tournament_matches')->insert([
                        'id'                    => (string) Str::uuid(),
                        'bracket_id'            => $bracketId,
                        'round_number'          => 1,
                        'match_number'          => $matchNumber++,
                        'bracket_section'       => 'winners',
                        'participant_a_id'      => $a->id,
                        'participant_b_id'      => $b->id,
                        'participant_a_is_bye'  => false,
                        'participant_b_is_bye'  => false,
                        'winner_id'             => $winner->id,
                        'loser_id'              => $loser->id,
                        'score_a'               => $winnerIsA ? $scoreWinner : $scoreLoser,
                        'score_b'               => $winnerIsA ? $scoreLoser  : $scoreWinner,
                        'status'                => 'completed',
                        'scheduled_at'          => $now->copy()->subDays(rand(1, 14)),
                        'created_at'            => $now,
                        'updated_at'            => $now,
                    ]);
                    $totalMatches++;

                    $winCount[$winner->id]  = ($winCount[$winner->id]  ?? 0) + 1;
                    $lossCount[$loser->id]  = ($lossCount[$loser->id] ?? 0) + 1;
                }
            }

            // ── Step 4: sync wins/losses back onto tournament_participants ─
            foreach ($pList as $p) {
                DB::table('tournament_participants')
                    ->where('id', $p->id)
                    ->update([
                        'wins'          => $winCount[$p->id]  ?? 0,
                        'losses'        => $lossCount[$p->id] ?? 0,
                        'is_eliminated' => ($lossCount[$p->id] ?? 0) > 0 && ($winCount[$p->id] ?? 0) === 0,
                        'updated_at'    => $now,
                    ]);
            }
        }

        $this->command->info("✓ LeaderboardDemoSeeder done:");
        $this->command->info("    brackets created:  {$totalBrackets}");
        $this->command->info("    matches completed: {$totalMatches}");
    }

    /**
     * Pick a winner between two seeds with seed-weighted probability.
     * Lower seed wins ~70% against a single-step-higher seed; the margin
     * grows with seed delta.
     */
    private function decideWinner(int $seedA, int $seedB): bool
    {
        // Avoid divide-by-zero when seeds are equal
        if ($seedA === $seedB) {
            return (bool) rand(0, 1);
        }

        $delta   = abs($seedA - $seedB);
        $pStrong = min(50 + ($delta * 6), 88); // 56% at delta 1 → 88% at delta 7+

        $strongerIsA = $seedA < $seedB;
        $roll        = rand(1, 100);

        return $strongerIsA ? ($roll <= $pStrong) : ($roll > $pStrong);
    }
}
