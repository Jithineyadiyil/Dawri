<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\LiveBroadcast;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use Illuminate\Support\Collection;

/**
 * LiveBroadcastRepository — Eloquent persistence for live broadcasts.
 *
 * Thin by design: no business logic here. State transitions, YouTube API
 * coordination, and authorization live in LiveBroadcastService.
 */
final class LiveBroadcastRepository implements LiveBroadcastRepositoryInterface
{
    public function find(string $id): LiveBroadcast
    {
        return LiveBroadcast::with(['tournament:id,name,name_ar', 'match:id,bracket_id', 'creator:id,name'])
            ->findOrFail($id);
    }

    public function findByMatch(string $matchId): ?LiveBroadcast
    {
        return LiveBroadcast::where('match_id', $matchId)
            ->whereIn('status', [
                LiveBroadcast::STATUS_CREATED,
                LiveBroadcast::STATUS_READY,
                LiveBroadcast::STATUS_LIVE,
            ])
            ->latest()
            ->first();
    }

    public function findByTournament(string $tournamentId): ?LiveBroadcast
    {
        return LiveBroadcast::where('tournament_id', $tournamentId)
            ->whereNull('match_id')
            ->whereIn('status', [
                LiveBroadcast::STATUS_CREATED,
                LiveBroadcast::STATUS_READY,
                LiveBroadcast::STATUS_LIVE,
            ])
            ->latest()
            ->first();
    }

    public function create(array $data): LiveBroadcast
    {
        return LiveBroadcast::create($data);
    }

    public function update(LiveBroadcast $broadcast, array $data): LiveBroadcast
    {
        $broadcast->fill($data)->save();
        return $broadcast->fresh();
    }

    public function delete(LiveBroadcast $broadcast): void
    {
        $broadcast->delete();
    }

    public function active(): Collection
    {
        return LiveBroadcast::whereIn('status', [
            LiveBroadcast::STATUS_CREATED,
            LiveBroadcast::STATUS_READY,
            LiveBroadcast::STATUS_LIVE,
        ])->get();
    }
}
