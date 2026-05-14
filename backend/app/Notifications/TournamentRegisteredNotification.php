<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to a player when they successfully register for a tournament. */
final class TournamentRegisteredNotification extends TournamentNotification
{
    public function __construct(
        private readonly string $tournamentId,
        private readonly string $tournamentName,
        private readonly string $format,
        private readonly string $startsAt,
        private readonly int    $participantCount,
        private readonly int    $maxParticipants,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'              => 'tournament_registered',
            'title'             => '✅ Registration confirmed!',
            'body'              => "You're in! {$this->tournamentName} ({$this->format}) starts {$this->startsAt}. Slot {$this->participantCount}/{$this->maxParticipants}.",
            'icon'              => '✅',
            'tournament_id'     => $this->tournamentId,
            'tournament_name'   => $this->tournamentName,
            'format'            => $this->format,
            'starts_at'         => $this->startsAt,
            'participant_count' => $this->participantCount,
            'max_participants'  => $this->maxParticipants,
            'action_url'        => "/tournaments/{$this->tournamentId}",
            'action_label'      => 'View Tournament',
        ];
    }
}
