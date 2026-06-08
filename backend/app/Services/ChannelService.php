<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Channel;
use App\Models\Community;
use App\Models\User;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Str;

/**
 * Channel CRUD with role checks. Only moderators+ in the community
 * (or platform admins) can create / update / archive channels.
 */
final class ChannelService
{
    public function __construct(
        private readonly ChannelRepositoryInterface $channels,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * @throws AuthorizationException
     */
    public function create(Community $community, User $actor, array $payload): Channel
    {
        $this->assertCanManage($community, $actor);

        $payload['community_id'] = $community->id;
        $payload['name'] = Str::slug($payload['name'] ?? '', '-');
        $payload['position'] ??= $this->channels->listForCommunity($community->id)->count();

        return $this->channels->create($payload);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(Channel $channel, User $actor, array $payload): Channel
    {
        $this->assertCanManage($channel->community, $actor);

        if (isset($payload['name'])) {
            $payload['name'] = Str::slug((string) $payload['name'], '-');
        }

        return $this->channels->update($channel, $payload);
    }

    /**
     * Archive (soft-disable) rather than delete — preserves message history.
     *
     * @throws AuthorizationException
     */
    public function archive(Channel $channel, User $actor): Channel
    {
        $this->assertCanManage($channel->community, $actor);
        return $this->channels->update($channel, ['is_archived' => true]);
    }

    /**
     * @throws AuthorizationException
     */
    private function assertCanManage(Community $community, User $actor): void
    {
        // Platform admins (system role) bypass community role checks.
        // Matches the EnsureAdmin middleware convention used elsewhere in Dawri.
        if ($actor->role === 'admin') {
            return;
        }

        $member = $this->members->find($community->id, $actor->id);
        if ($member === null || ! $member->canManage()) {
            throw new AuthorizationException(
                'Only the community owner / admins may modify channels.'
            );
        }
    }
}
