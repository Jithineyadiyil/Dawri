<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Social — the recipient's friend request was accepted.
 */
final class FriendRequestAcceptedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $byUserId,
        public readonly string $byName,
        public readonly ?string $byAvatar,
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
            'type'         => 'friend.accepted',
            'by_user_id'   => $this->byUserId,
            'by_name'      => $this->byName,
            'by_avatar'    => $this->byAvatar,
            'title'        => sprintf('%s accepted your friend request', $this->byName),
            'body'         => 'You are now friends. Say hi!',
            'action_url'   => '/friends',
        ];
    }
}
