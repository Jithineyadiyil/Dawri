<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Social — challenge lifecycle notifications (received / accepted / declined /
 * result reported / completed). One class, parameterised by `kind`.
 */
final class ChallengeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $kind,            // received|accepted|declined|result|completed
        public readonly string $challengeId,
        public readonly string $fromUserId,
        public readonly string $fromName,
        public readonly ?string $fromAvatar,
        public readonly string $gameLabel,
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
        [$title, $body] = match ($this->kind) {
            'received'  => [sprintf('%s challenged you', $this->fromName), $this->gameLabel . ' — tap to accept or decline.'],
            'accepted'  => [sprintf('%s accepted your challenge', $this->fromName), 'Play your ' . $this->gameLabel . ' match, then report the result.'],
            'declined'  => [sprintf('%s declined your challenge', $this->fromName), $this->gameLabel],
            'result'    => [sprintf('%s reported a result', $this->fromName), 'Confirm the ' . $this->gameLabel . ' score.'],
            'completed' => [sprintf('Challenge with %s completed', $this->fromName), $this->gameLabel],
            default     => ['Challenge update', $this->gameLabel],
        };

        return [
            'type'         => 'challenge.' . $this->kind,
            'challenge_id' => $this->challengeId,
            'from_user_id' => $this->fromUserId,
            'from_name'    => $this->fromName,
            'from_avatar'  => $this->fromAvatar,
            'game_label'   => $this->gameLabel,
            'title'        => $title,
            'body'         => $body,
            'action_url'   => '/community/home?pane=challenges',
        ];
    }
}
