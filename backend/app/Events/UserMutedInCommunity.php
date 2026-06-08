<?php

declare(strict_types=1);

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Broadcast on a PER-USER private channel so we never leak moderation
 * actions to the whole community feed.
 */
final class UserMutedInCommunity implements ShouldBroadcast
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(
        public readonly string $communityId,
        public readonly string $userId,
        public readonly string $mutedUntil,
        public readonly ?string $reason = null,
    ) {
    }

    /** @return array<int, PrivateChannel> */
    public function broadcastOn(): array
    {
        return [new PrivateChannel('user.' . $this->userId)];
    }

    public function broadcastAs(): string
    {
        return 'moderation.muted';
    }

    /** @return array<string, mixed> */
    public function broadcastWith(): array
    {
        return [
            'community_id' => $this->communityId,
            'muted_until'  => $this->mutedUntil,
            'reason'       => $this->reason,
        ];
    }
}
