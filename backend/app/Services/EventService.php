<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Community;
use App\Models\CommunityEvent;
use App\Models\EventRsvp;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

/**
 * Phase 4 — community event lifecycle.
 *
 * Create / update / cancel / delete require a moderator+ of the community.
 * Any non-banned member may RSVP. Re-selecting the same RSVP status clears it
 * (toggle off).
 */
final class EventService
{
    public function __construct(
        private readonly EventRepositoryInterface $events,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * @param array{title:string,description?:?string,location?:?string,starts_at:string,ends_at?:?string} $data
     *
     * @throws AuthorizationException
     */
    public function create(Community $community, User $actor, array $data): CommunityEvent
    {
        $this->assertCanManage($community->id, $actor);

        $event = DB::transaction(function () use ($community, $actor, $data) {
            $event = $this->events->create([
                'community_id' => $community->id,
                'user_id'      => $actor->id,
                'title'        => trim($data['title']),
                'description'  => isset($data['description']) ? trim((string) $data['description']) : null,
                'location'     => isset($data['location']) ? trim((string) $data['location']) : null,
                'starts_at'    => $data['starts_at'],
                'ends_at'      => $data['ends_at'] ?? null,
            ]);

            // Phase 7 — drop a carrier message into the community feed so the
            // event is visible inline (mirrors the poll-carrier pattern). Target
            // the announcements channel, falling back to the first channel.
            $channel = $community->channels()
                ->where('type', \App\Models\Channel::TYPE_ANNOUNCEMENT)
                ->orderBy('position')
                ->first()
                ?? $community->channels()->orderBy('position')->first();

            if ($channel !== null) {
                $message = \App\Models\Message::create([
                    'channel_id' => $channel->id,
                    'user_id'    => $actor->id,
                    'content'    => '',
                    'event_id'   => $event->id,
                ]);

                DB::afterCommit(function () use ($message): void {
                    $message->load(['author', 'reactions', 'mentions', 'event.rsvps']);
                    broadcast(new \App\Events\MessagePosted($message))->toOthers();
                });
            }

            return $event;
        });

        return $this->events->findWithRsvps($event->id);
    }

    /**
     * @param array<string, mixed> $data
     *
     * @throws AuthorizationException
     */
    public function update(CommunityEvent $event, User $actor, array $data): CommunityEvent
    {
        $this->assertCanManage($event->community_id, $actor);

        $patch = [];
        foreach (['title', 'description', 'location', 'starts_at', 'ends_at'] as $field) {
            if (array_key_exists($field, $data)) {
                $value = $data[$field];
                $patch[$field] = is_string($value) ? trim($value) : $value;
            }
        }

        $this->events->update($event, $patch);

        return $this->events->findWithRsvps($event->id);
    }

    /** @throws AuthorizationException */
    public function cancel(CommunityEvent $event, User $actor): CommunityEvent
    {
        $this->assertCanManage($event->community_id, $actor);
        $this->events->update($event, ['is_cancelled' => true]);

        return $this->events->findWithRsvps($event->id);
    }

    /** @throws AuthorizationException */
    public function delete(CommunityEvent $event, User $actor): void
    {
        $this->assertCanManage($event->community_id, $actor);
        $this->events->delete($event);
    }

    /**
     * Set (or toggle off) the actor's RSVP. Returns the refreshed event.
     *
     * @throws AuthorizationException|\InvalidArgumentException
     */
    public function rsvp(CommunityEvent $event, User $actor, string $status): CommunityEvent
    {
        $member = $this->members->find($event->community_id, $actor->id);
        if ($member === null) {
            throw new AuthorizationException('You are not a member of this community.');
        }
        if ($member->isBanned()) {
            throw new AuthorizationException('You are banned from this community.');
        }
        if (! in_array($status, EventRsvp::STATUSES, true)) {
            throw new \InvalidArgumentException('Invalid RSVP status.');
        }
        if ($event->is_cancelled) {
            throw new AuthorizationException('This event has been cancelled.');
        }

        DB::transaction(function () use ($event, $actor, $status): void {
            $existing = EventRsvp::where('event_id', $event->id)
                ->where('user_id', $actor->id)
                ->first();

            if ($existing !== null && $existing->status === $status) {
                // Re-selecting the same status clears the RSVP.
                $existing->delete();

                return;
            }

            EventRsvp::updateOrCreate(
                ['event_id' => $event->id, 'user_id' => $actor->id],
                ['status' => $status],
            );
        });

        return $this->events->findWithRsvps($event->id);
    }

    /** @throws AuthorizationException */
    private function assertCanManage(string $communityId, User $actor): void
    {
        if ($actor->role === 'admin') {
            return;
        }

        $member = $this->members->find($communityId, $actor->id);
        if ($member === null || ! $member->canModerate()) {
            throw new AuthorizationException('Only community moderators can manage events.');
        }
    }
}
