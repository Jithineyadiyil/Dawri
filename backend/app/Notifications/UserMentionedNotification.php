<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Sprint 15 — @mention notification.
 *
 * Goes via the database channel so it appears in the existing Sprint 12
 * notifications inbox without needing schema changes. Mail channel is
 * deliberately omitted in v1; we will batch mentions into a daily digest
 * in Sprint 16 to avoid notification fatigue.
 */
final class UserMentionedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $messageId,
        public readonly string $channelId,
        public readonly string $communityId,
        public readonly string $authorNickname,
        public readonly string $snippet,
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
            'type'             => 'community.mention',
            'community_id'     => $this->communityId,
            'channel_id'       => $this->channelId,
            'message_id'       => $this->messageId,
            'author_nickname'  => $this->authorNickname,
            'snippet'          => $this->snippet,
            'title'            => sprintf('%s mentioned you', $this->authorNickname),
            'body'             => $this->snippet,
            'action_url'       => sprintf('/community?channel=%s&message=%s', $this->channelId, $this->messageId),
        ];
    }
}
