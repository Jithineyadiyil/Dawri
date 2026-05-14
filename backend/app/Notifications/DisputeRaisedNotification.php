<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to the tournament organizer/moderator when a dispute is raised. */
final class DisputeRaisedNotification extends TournamentNotification
{
    public function __construct(
        private readonly string $tournamentId,
        private readonly string $tournamentName,
        private readonly string $matchId,
        private readonly int    $matchNumber,
        private readonly string $disputerName,
        private readonly string $reason,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'            => 'dispute_raised',
            'title'           => '⚠️ Dispute raised — action needed',
            'body'            => "{$this->disputerName} disputed Match #{$this->matchNumber} in {$this->tournamentName}: \"{$this->reason}\"",
            'icon'            => '⚠️',
            'tournament_id'   => $this->tournamentId,
            'tournament_name' => $this->tournamentName,
            'match_id'        => $this->matchId,
            'match_number'    => $this->matchNumber,
            'disputer_name'   => $this->disputerName,
            'reason'          => $this->reason,
            'action_url'      => "/tournaments/{$this->tournamentId}",
            'action_label'    => 'Resolve Dispute',
            'urgent'          => true,
        ];
    }
}
