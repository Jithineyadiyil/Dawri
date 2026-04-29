<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Bracket;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Services\BracketAdvancementService;
use App\Services\BracketGeneratorService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Throwable;

/**
 * dawri:rebuild-brackets
 *
 * One-off recovery command for tournaments whose brackets were populated
 * by the (now-deprecated) LeaderboardDemoSeeder, which created flat lists
 * of "round 1, winners section" matches regardless of the tournament's
 * actual format. Result was 28 matches in a single column for an 8-player
 * double-elimination tournament instead of the expected 14-match
 * winners/losers/grand-final structure.
 *
 * What this command does:
 *   1. Deletes ALL existing brackets + matches (demo or real — caller's choice)
 *   2. Regenerates proper brackets via the canonical BracketGeneratorService
 *      so the matches actually match the tournament's declared format
 *   3. Optionally auto-plays matches with seed-weighted outcomes so your
 *      demo data stays populated without manual click-through
 *
 * Usage:
 *   php artisan dawri:rebuild-brackets                  # regenerate, leave empty
 *   php artisan dawri:rebuild-brackets --auto-play      # regenerate AND fill in
 *   php artisan dawri:rebuild-brackets --tournament=ID  # one tournament only
 *   php artisan dawri:rebuild-brackets --dry-run        # report only, no changes
 *
 * SAFETY:
 *   - This DELETES match data. Always run with --dry-run first.
 *   - In production: use --tournament=ID to target one tournament at a time.
 */
class RebuildBracketsCommand extends Command
{
    protected $signature = 'dawri:rebuild-brackets
                            {--auto-play : Simulate match results so the bracket completes}
                            {--tournament= : Restrict to a single tournament UUID}
                            {--dry-run : Report what would change without modifying data}
                            {--force : Skip confirmation prompts (use in CI)}';

    protected $description = 'Rebuild tournament brackets via the canonical generator (fixes flat demo data)';

    public function __construct(
        private readonly BracketGeneratorService $generator,
        private readonly BracketAdvancementService $advancer,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $dryRun   = (bool) $this->option('dry-run');
        $autoPlay = (bool) $this->option('auto-play');
        $force    = (bool) $this->option('force');
        $only     = $this->option('tournament');

        // ── 1. Find tournaments to process ─────────────────────────────────
        $query = Tournament::query()->with(['participants' => fn ($q) => $q->orderBy('seed')]);
        if ($only) {
            $query->where('id', $only);
        }
        $tournaments = $query->get();

        if ($tournaments->isEmpty()) {
            $this->warn('No tournaments matched the criteria.');
            return self::SUCCESS;
        }

        $this->info(sprintf(
            'Found %d tournament(s). Mode: %s%s%s',
            $tournaments->count(),
            $dryRun ? 'DRY RUN' : 'WRITE',
            $autoPlay ? ' + auto-play' : '',
            $only ? ' (single)' : '',
        ));
        $this->newLine();

        // ── 2. Confirmation gate ───────────────────────────────────────────
        if (! $dryRun && ! $force) {
            $msg = sprintf(
                'This will DELETE existing brackets and matches for %d tournament(s) and regenerate them. Continue?',
                $tournaments->count(),
            );
            if (! $this->confirm($msg, false)) {
                $this->warn('Aborted.');
                return self::SUCCESS;
            }
        }

        // ── 3. Process each tournament ─────────────────────────────────────
        $processed = 0;
        $skipped   = 0;
        $failed    = 0;

        foreach ($tournaments as $t) {
            $label = sprintf('[%s] "%s" (%s · %d players)',
                substr((string) $t->id, 0, 8),
                $t->name,
                $t->format,
                $t->participants->count(),
            );

            if ($t->participants->count() < 2) {
                $this->line("  ⊘ {$label} — skipped (needs ≥2 participants)");
                $skipped++;
                continue;
            }

            try {
                if ($dryRun) {
                    $existing = Bracket::where('tournament_id', $t->id)->first();
                    $matchCount = $existing
                        ? TournamentMatch::where('bracket_id', $existing->id)->count()
                        : 0;
                    $this->line("  • {$label}");
                    $this->line("      would delete {$matchCount} matches and regenerate as {$t->format}");
                    $processed++;
                    continue;
                }

                $this->processOne($t, $autoPlay);
                $this->line("  ✓ {$label}");
                $processed++;
            } catch (Throwable $e) {
                $this->line("  ✗ {$label} — {$e->getMessage()}");
                $failed++;
            }
        }

        // ── 4. Summary ─────────────────────────────────────────────────────
        $this->newLine();
        $this->info("Processed: {$processed}");
        if ($skipped) $this->warn("Skipped:   {$skipped}");
        if ($failed)  $this->error("Failed:    {$failed}");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    /**
     * Process a single tournament: wipe + regenerate, optionally auto-play.
     * Wrapped in a transaction so a partial failure rolls back cleanly.
     */
    private function processOne(Tournament $tournament, bool $autoPlay): void
    {
        DB::transaction(function () use ($tournament, $autoPlay): void {
            // Reset tournament status so the generator's internal "ongoing"
            // assignment lands on a clean slate.
            $tournament->update(['status' => 'in_progress']);

            // Generator handles its own transaction internally; safe to nest.
            $this->generator->generate($tournament);

            if ($autoPlay) {
                $this->autoPlayTournament($tournament->fresh(['bracket', 'participants']));
            }
        });
    }

    /**
     * Walk the bracket from earliest to latest match, picking a winner for
     * each pending match using seed-weighted probability (lower seed = better
     * record), then calling the real BracketAdvancementService so winners
     * propagate, losers drop, and the tournament eventually completes
     * including ranking points.
     *
     * Loops until no pending matches remain or we hit a safety cap.
     */
    private function autoPlayTournament(Tournament $tournament): void
    {
        $bracket = $tournament->bracket;
        if (! $bracket) return;

        // Build a seed lookup keyed by participant id — needed every iteration.
        $seedById = $tournament->participants->pluck('seed', 'id')->toArray();

        // Safety cap: prevents infinite loop if advancement gets stuck.
        $maxIterations = 1000;
        $iterations    = 0;

        while ($iterations++ < $maxIterations) {
            // Pull the next playable match. "Playable" means both slots
            // filled with real participants (no nulls, no byes).
            $match = TournamentMatch::where('bracket_id', $bracket->id)
                ->whereIn('status', ['pending', 'ongoing'])
                ->whereNotNull('participant_a_id')
                ->whereNotNull('participant_b_id')
                ->where('participant_a_is_bye', false)
                ->where('participant_b_is_bye', false)
                ->orderBy('round_number')
                ->orderBy('match_number')
                ->first();

            if (! $match) break;

            // Resolve winner via seed-weighted coin-flip.
            $seedA = $seedById[$match->participant_a_id] ?? 99;
            $seedB = $seedById[$match->participant_b_id] ?? 99;
            $winnerId = $this->pickWinner($match->participant_a_id, $seedA, $match->participant_b_id, $seedB);

            // Realistic scores — winner gets 2 or 3, loser gets less.
            $winnerScore = random_int(2, 3);
            $loserScore  = random_int(0, $winnerScore - 1);

            $isWinnerA = $winnerId === $match->participant_a_id;
            $match->update([
                'winner_id' => $winnerId,
                'score_a'   => $isWinnerA ? $winnerScore : $loserScore,
                'score_b'   => $isWinnerA ? $loserScore  : $winnerScore,
                'status'    => 'completed',
            ]);

            // Advance — propagates winners, drops losers (DE), checks completion.
            $this->advancer->advance($match->fresh());
        }

        if ($iterations >= $maxIterations) {
            $this->warn("  ! auto-play hit safety cap on tournament {$tournament->id}");
        }
    }

    /**
     * Seed-weighted winner picker. Lower seed number = stronger player.
     * A seed-1 vs seed-8 produces ~75% win rate for the higher-ranked player;
     * close seeds produce closer-to-even odds.
     */
    private function pickWinner(string $aId, int $seedA, string $bId, int $seedB): string
    {
        // Probability that A wins, biased by relative seed strength.
        // Map to roughly [0.55, 0.85] for clear seed gaps; closer to 0.5 when seeds tie.
        $diff = $seedB - $seedA; // positive when A is stronger
        $bias = max(-0.35, min(0.35, $diff * 0.05));
        $pA   = 0.5 + $bias;

        return (mt_rand() / mt_getrandmax()) < $pA ? $aId : $bId;
    }
}
