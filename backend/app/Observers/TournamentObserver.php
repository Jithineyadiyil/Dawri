<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Tournament;
use App\Services\CommunityService;
use Illuminate\Support\Facades\Log;

/**
 * Sprint 15 — auto-provision a private community room when a tournament
 * is created, and archive it when the tournament completes.
 *
 * Registered in CommunityServiceProvider::boot().
 */
final class TournamentObserver
{
    public function __construct(private readonly CommunityService $communityService)
    {
    }

    public function created(Tournament $tournament): void
    {
        try {
            $this->communityService->ensureTournamentCommunity($tournament);
        } catch (\Throwable $e) {
            // Never block tournament creation if community provisioning fails;
            // we just log and move on. A scheduled job can retry later.
            Log::error('Auto-provision tournament community failed', [
                'tournament_id' => $tournament->id,
                'error'         => $e->getMessage(),
            ]);
        }
    }

    public function updated(Tournament $tournament): void
    {
        // Archive the community 30 days after a tournament hits "completed".
        // We mark archived_at NULL here and let a scheduled command run the
        // actual archival after the grace window. For v1 we archive immediately
        // when status transitions to completed.
        if ($tournament->wasChanged('status') && $tournament->status === 'completed') {
            try {
                $this->communityService->archiveTournamentCommunity($tournament);
            } catch (\Throwable $e) {
                Log::warning('Archive tournament community failed', [
                    'tournament_id' => $tournament->id,
                    'error'         => $e->getMessage(),
                ]);
            }
        }
    }
}
