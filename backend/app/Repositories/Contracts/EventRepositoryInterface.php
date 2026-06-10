<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\CommunityEvent;
use Illuminate\Database\Eloquent\Collection;

interface EventRepositoryInterface
{
    public function findById(string $id): ?CommunityEvent;

    /** An event with creator + RSVP rows (for counts and the viewer's status). */
    public function findWithRsvps(string $id): ?CommunityEvent;

    /**
     * Events for a community. Upcoming (and ongoing) first by start time;
     * past events optionally included.
     *
     * @return Collection<int, CommunityEvent>
     */
    public function listForCommunity(string $communityId, bool $includePast = false): Collection;

    public function create(array $attributes): CommunityEvent;

    public function update(CommunityEvent $event, array $attributes): CommunityEvent;

    public function delete(CommunityEvent $event): bool;
}
