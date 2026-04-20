<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\TournamentMatch;
use App\Services\BracketAdvancementService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * Auto-confirms match results that have been pending for 24+ hours.
 *
 * PRD requirement: "If opponent does not respond within 24 hours,
 * result is auto-confirmed."
 *
 * Schedule: hourly in routes/console.php or Kernel
 *   Schedule::command('matches:auto-confirm')->hourly();
 */
class AutoConfirmMatchesCommand extends Command
{
    /** @var string */
    protected $signature = 'matches:auto-confirm';

    /** @var string */
    protected $description = 'Auto-confirm match results that have been pending for 24+ hours';

    public function handle(BracketAdvancementService $advancement): int
    {
        $staleMatches = TournamentMatch::where('status', 'submitted')
            ->where('updated_at', '<', now()->subHours(24))
            ->whereNotNull('submitted_by')
            ->whereNotNull('winner_id')
            ->get();

        $confirmed = 0;
        $failed = 0;

        foreach ($staleMatches as $match) {
            try {
                $advancement->advance($match->id, $match->winner_id);
                $confirmed++;
                Log::info("Auto-confirmed match {$match->id}", [
                    'winner_id'  => $match->winner_id,
                    'bracket_id' => $match->bracket_id,
                ]);
            } catch (\Throwable $e) {
                $failed++;
                Log::error("Auto-confirm failed for match {$match->id}: {$e->getMessage()}");
            }
        }

        $this->info("Auto-confirmed {$confirmed} matches. Failed: {$failed}.");

        return self::SUCCESS;
    }
}
