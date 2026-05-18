<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Backfill participant wins / losses / points from existing match data.
 *
 * Why this command exists:
 *   The original BracketAdvancementService advanced brackets without
 *   ever writing back to tournament_participants.wins/losses/points,
 *   so every tournament played before that fix shows 0/0/0 on the
 *   Players and Standings tabs. Run this once (or per-tournament) to
 *   reconstruct the counters from completed match records.
 *
 * Idempotent:
 *   Resets participants' stats to 0 BEFORE counting, so re-running
 *   the command produces the same result regardless of how many
 *   times it's been run before. Safe in production.
 *
 * Usage:
 *   php artisan dawri:backfill-participant-stats                 # all tournaments
 *   php artisan dawri:backfill-participant-stats --tournament=ID # single tournament
 *   php artisan dawri:backfill-participant-stats --dry-run       # preview only
 */
class BackfillParticipantStats extends Command
{
    protected $signature = 'dawri:backfill-participant-stats
                            {--tournament= : Restrict to a single tournament UUID}
                            {--dry-run     : Show what would change without writing}';

    protected $description = 'Reconstruct wins/losses/points on tournament_participants from match results.';

    public function handle(): int
    {
        $dryRun       = (bool) $this->option('dry-run');
        $tournamentId = $this->option('tournament');

        // Pull all completed matches (or matches with a winner_id set).
        // We look at winner_id rather than status because some legacy
        // rows may have winner_id set but status=='submitted' due to
        // the same bug we're patching.
        $matches = TournamentMatch::query()
            ->whereNotNull('winner_id')
            ->when($tournamentId, function ($q) use ($tournamentId) {
                $q->whereHas('bracket', fn ($b) => $b->where('tournament_id', $tournamentId));
            })
            ->get();

        if ($matches->isEmpty()) {
            $this->warn('No matches with a winner found.');
            return self::SUCCESS;
        }

        // Aggregate in memory: participantId => [wins, losses, points]
        $stats = [];
        foreach ($matches as $m) {
            $w = $m->winner_id;
            $l = $w === $m->participant_a_id ? $m->participant_b_id : $m->participant_a_id;

            $stats[$w] ??= ['wins' => 0, 'losses' => 0, 'points' => 0];
            $stats[$w]['wins']++;
            $stats[$w]['points']++;

            $loserIsBye = ($m->participant_a_id === $l && $m->participant_a_is_bye)
                       || ($m->participant_b_id === $l && $m->participant_b_is_bye);

            if ($l && ! $loserIsBye) {
                $stats[$l] ??= ['wins' => 0, 'losses' => 0, 'points' => 0];
                $stats[$l]['losses']++;
            }
        }

        $this->info("Computed stats for " . count($stats) . " participants from {$matches->count()} matches.");

        if ($dryRun) {
            $this->warn('DRY RUN — no DB changes.');
            $this->table(
                ['Participant ID', 'Wins', 'Losses', 'Points'],
                collect($stats)->map(fn ($s, $id) => [$id, $s['wins'], $s['losses'], $s['points']])->values()->toArray(),
            );
            return self::SUCCESS;
        }

        DB::transaction(function () use ($stats, $tournamentId): void {
            // Step 1: zero out target participants. Restricting by tournament
            // keeps the reset surgical when --tournament is passed.
            $resetQuery = TournamentParticipant::query();
            if ($tournamentId) {
                $resetQuery->where('tournament_id', $tournamentId);
            }
            $resetQuery->update(['wins' => 0, 'losses' => 0, 'points' => 0]);

            // Step 2: apply aggregated stats.
            foreach ($stats as $participantId => $s) {
                TournamentParticipant::where('id', $participantId)->update([
                    'wins'   => $s['wins'],
                    'losses' => $s['losses'],
                    'points' => $s['points'],
                ]);
            }
        });

        $this->info('Backfill complete.');
        return self::SUCCESS;
    }
}
