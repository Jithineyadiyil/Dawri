<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\BroadcastSetupLog;
use Illuminate\Support\Collection;

/**
 * BroadcastSetupLogRepositoryInterface
 *
 * Persistence abstraction for the OBS Setup Wizard analytics log so that
 * services can be unit-tested without hitting the database.
 *
 * @package App\Repositories\Contracts
 */
interface BroadcastSetupLogRepositoryInterface
{
    /**
     * Persist a single wizard event.
     *
     * @param  array{
     *     broadcast_id?:  string|null,
     *     tournament_id?: string|null,
     *     user_id:        string,
     *     event:          string,
     *     step_number?:   int|null,
     *     platform?:      string|null,
     *     source?:        string|null,
     *     metadata?:      array<string,mixed>|null,
     *     ip_address?:    string|null
     * } $attributes
     */
    public function record(array $attributes): BroadcastSetupLog;

    /**
     * Recent events for a broadcast (admin funnel view).
     *
     * @return Collection<int, BroadcastSetupLog>
     */
    public function recentForBroadcast(string $broadcastId, int $limit = 200): Collection;

    /**
     * Recent events for a tournament-scoped wizard session.
     *
     * @return Collection<int, BroadcastSetupLog>
     */
    public function recentForTournament(string $tournamentId, int $limit = 200): Collection;

    /**
     * Has this user already finished the wizard for this broadcast?
     */
    public function hasCompletedForBroadcast(string $broadcastId, string $userId): bool;

    /**
     * Has this user already finished the wizard for this tournament
     * (any broadcast attached to it)?
     */
    public function hasCompletedForTournament(string $tournamentId, string $userId): bool;
}
