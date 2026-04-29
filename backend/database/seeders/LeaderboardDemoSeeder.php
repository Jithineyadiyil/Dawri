<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * LeaderboardDemoSeeder — DEPRECATED.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THIS SEEDER IS DEPRECATED AND DELIBERATELY DISABLED.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Why it was disabled
 * ───────────────────
 * The original implementation generated a flat round-robin of matches for
 * EVERY tournament regardless of its declared format, with all matches
 * stamped as `round_number=1, bracket_section='winners'`. For Single
 * Elimination tournaments this looked superficially correct (since round 1
 * IS a flat list of winners-section matches). For Double Elimination,
 * Round Robin and Swiss tournaments it produced visually broken brackets:
 *   • An 8-player DE tournament got 28 matches (= 8 choose 2) all stacked
 *     in one column, instead of 14 matches across winners/losers/grand_final.
 *   • Bracket display rendered a single tall column labelled "FINAL".
 *   • Tournaments stayed in `status='registration_open'` with no champion.
 *
 * What replaced it
 * ─────────────────
 * Use the canonical bracket generator instead:
 *
 *   php artisan dawri:rebuild-brackets --auto-play
 *
 * That command:
 *   1. Wipes existing brackets and matches
 *   2. Calls BracketGeneratorService::generate() for each tournament,
 *      producing format-correct structures (SE/DE/RR/Swiss)
 *   3. With --auto-play, simulates seed-weighted match outcomes via the
 *      real BracketAdvancementService so winners propagate, losers drop
 *      into the losers bracket, ranking points are awarded, and the
 *      tournament reaches a proper `completed` state with a champion.
 *
 * If somehow you still need this seeder
 * ─────────────────────────────────────
 * Calling `db:seed --class=LeaderboardDemoSeeder` now prints a warning
 * and exits without modifying data. To override, set the env flag
 * `ALLOW_DEPRECATED_LEADERBOARD_SEEDER=true` — but you almost certainly
 * shouldn't.
 */
class LeaderboardDemoSeeder extends Seeder
{
    public function run(): void
    {
        if (env('ALLOW_DEPRECATED_LEADERBOARD_SEEDER') !== true) {
            $this->command?->warn('LeaderboardDemoSeeder is deprecated and disabled.');
            $this->command?->warn('Use:  php artisan dawri:rebuild-brackets --auto-play');
            $this->command?->warn('See file header for full rationale.');
            return;
        }

        $this->command?->error('Refusing to run deprecated seeder. Read LeaderboardDemoSeeder.php header.');
    }
}
