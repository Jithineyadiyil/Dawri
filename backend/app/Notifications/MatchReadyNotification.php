<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to both players when their next match is ready. */
final class MatchReadyNotification extends TournamentNotification
{
    public function __construct(
        private readonly string $tournamentId,
        private readonly string $tournamentName,
        private readonly string $matchId,
        private readonly int    $matchNumber,
        private readonly string $opponentName,
        private readonly ?string $scheduledAt = null,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'            => 'match_ready',
            'title'           => 'Your match is ready!',
            'body'            => "Match #{$this->matchNumber} vs {$this->opponentName} in {$this->tournamentName}.",
            'icon'            => '⚔️',
            'tournament_id'   => $this->tournamentId,
            'tournament_name' => $this->tournamentName,
            'match_id'        => $this->matchId,
            'match_number'    => $this->matchNumber,
            'opponent_name'   => $this->opponentName,
            'scheduled_at'    => $this->scheduledAt,
            'action_url'      => "/tournaments/{$this->tournamentId}",
            'action_label'    => 'View Match',
        ];
    }
}
