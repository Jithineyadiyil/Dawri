<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to all tournament participants when the bracket is generated. */
final class BracketGeneratedNotification extends TournamentNotification
{
    public function __construct(
        private readonly string $tournamentId,
        private readonly string $tournamentName,
        private readonly string $format,
        private readonly int    $participantCount,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'              => 'bracket_generated',
            'title'             => '🎮 Tournament bracket is live!',
            'body'              => "The {$this->tournamentName} bracket is ready. {$this->participantCount} players, {$this->format} format. Check your first match!",
            'icon'              => '🎮',
            'tournament_id'     => $this->tournamentId,
            'tournament_name'   => $this->tournamentName,
            'format'            => $this->format,
            'participant_count' => $this->participantCount,
            'action_url'        => "/tournaments/{$this->tournamentId}",
            'action_label'      => 'View Bracket',
        ];
    }
}
