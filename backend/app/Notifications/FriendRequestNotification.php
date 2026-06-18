<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Social — someone sent the recipient a friend request.
 *
 * Database channel only, so it appears in the existing notifications inbox.
 */
final class FriendRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $friendshipId,
        public readonly string $fromUserId,
        public readonly string $fromName,
        public readonly ?string $fromAvatar,
    ) {
    }

    /** @return list<string> */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /** @return array<string, mixed> */
    public function toDatabase(object $notifiable): array
    {
        return [
            'type'          => 'friend.request',
            'friendship_id' => $this->friendshipId,
            'from_user_id'  => $this->fromUserId,
            'from_name'     => $this->fromName,
            'from_avatar'   => $this->fromAvatar,
            'title'         => sprintf('%s sent you a friend request', $this->fromName),
            'body'          => 'Tap to accept or decline.',
            'action_url'    => '/friends?tab=requests',
        ];
    }
}
