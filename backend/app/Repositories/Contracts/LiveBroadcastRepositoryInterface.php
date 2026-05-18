<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\LiveBroadcast;
use Illuminate\Support\Collection;

interface LiveBroadcastRepositoryInterface
{
    public function find(string $id): LiveBroadcast;

    public function findByMatch(string $matchId): ?LiveBroadcast;

    public function findByTournament(string $tournamentId): ?LiveBroadcast;

    /** @param array<string, mixed> $data */
    public function create(array $data): LiveBroadcast;

    /** @param array<string, mixed> $data */
    public function update(LiveBroadcast $broadcast, array $data): LiveBroadcast;

    public function delete(LiveBroadcast $broadcast): void;

    /**
     * All non-terminal broadcasts (status = created|ready|live) — used by
     * the watchdog command to reconcile state.
     *
     * @return Collection<int, LiveBroadcast>
     */
    public function active(): Collection;
}
