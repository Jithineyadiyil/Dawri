<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Social — someone invited you to a team.
 */
final class TeamInviteNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $inviteId,
        public readonly string $teamId,
        public readonly string $teamName,
        public readonly ?string $teamTag,
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
        $label = $this->teamTag ? "[{$this->teamTag}] {$this->teamName}" : $this->teamName;

        return [
            'type'         => 'team.invite',
            'invite_id'    => $this->inviteId,
            'team_id'      => $this->teamId,
            'team_name'    => $this->teamName,
            'team_tag'     => $this->teamTag,
            'from_name'    => $this->fromName,
            'from_avatar'  => $this->fromAvatar,
            'title'        => sprintf('%s invited you to join %s', $this->fromName, $label),
            'body'         => 'Tap to accept or decline.',
            'action_url'   => '/teams?tab=invites',
        ];
    }
}
