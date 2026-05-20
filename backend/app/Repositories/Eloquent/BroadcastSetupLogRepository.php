<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\BroadcastSetupLog;
use App\Repositories\Contracts\BroadcastSetupLogRepositoryInterface;
use Illuminate\Support\Collection;

/**
 * BroadcastSetupLogRepository — Eloquent implementation.
 *
 * Sits alongside LiveBroadcastRepository under App\Repositories\Eloquent.
 *
 * @package App\Repositories\Eloquent
 */
final class BroadcastSetupLogRepository implements BroadcastSetupLogRepositoryInterface
{
    private const MAX_LIMIT = 1000;

    /**
     * {@inheritDoc}
     */
    public function record(array $attributes): BroadcastSetupLog
    {
        /** @var BroadcastSetupLog $log */
        $log = BroadcastSetupLog::query()->create($attributes);

        return $log;
    }

    /**
     * {@inheritDoc}
     */
    public function recentForBroadcast(string $broadcastId, int $limit = 200): Collection
    {
        $limit = max(1, min($limit, self::MAX_LIMIT));

        return BroadcastSetupLog::query()
            ->where('broadcast_id', $broadcastId)
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * {@inheritDoc}
     */
    public function recentForTournament(string $tournamentId, int $limit = 200): Collection
    {
        $limit = max(1, min($limit, self::MAX_LIMIT));

        return BroadcastSetupLog::query()
            ->where('tournament_id', $tournamentId)
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * {@inheritDoc}
     */
    public function hasCompletedForBroadcast(string $broadcastId, string $userId): bool
    {
        return BroadcastSetupLog::query()
            ->where('broadcast_id', $broadcastId)
            ->where('user_id', $userId)
            ->where('event', 'wizard_completed')
            ->exists();
    }

    /**
     * {@inheritDoc}
     */
    public function hasCompletedForTournament(string $tournamentId, string $userId): bool
    {
        return BroadcastSetupLog::query()
            ->where('tournament_id', $tournamentId)
            ->where('user_id', $userId)
            ->where('event', 'wizard_completed')
            ->exists();
    }
}
