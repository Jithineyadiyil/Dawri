<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\CommunityEvent;
use App\Repositories\Contracts\EventRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class EventRepository implements EventRepositoryInterface
{
    public function __construct(private readonly CommunityEvent $model)
    {
    }

    public function findById(string $id): ?CommunityEvent
    {
        return $this->model->find($id);
    }

    public function findWithRsvps(string $id): ?CommunityEvent
    {
        return $this->model
            ->with([
                'creator:id,name,nickname,avatar',
                'rsvps:id,event_id,user_id,status',
            ])
            ->find($id);
    }

    public function listForCommunity(string $communityId, bool $includePast = false): Collection
    {
        $query = $this->model
            ->where('community_id', $communityId)
            ->with([
                'creator:id,name,nickname,avatar',
                'rsvps:id,event_id,user_id,status',
            ]);

        if (! $includePast) {
            // Keep events whose start is in the future OR that have no passed end.
            $query->where(function ($q): void {
                $q->where('starts_at', '>=', now())
                  ->orWhere(function ($q2): void {
                      $q2->whereNotNull('ends_at')->where('ends_at', '>=', now());
                  });
            });
        }

        return $query->orderBy('starts_at')->get();
    }

    public function create(array $attributes): CommunityEvent
    {
        return $this->model->create($attributes);
    }

    public function update(CommunityEvent $event, array $attributes): CommunityEvent
    {
        $event->update($attributes);

        return $event->fresh();
    }

    public function delete(CommunityEvent $event): bool
    {
        return (bool) $event->delete();
    }
}
