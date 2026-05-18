<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to the opponent when a match result is submitted (needs confirm/dispute). */
final class ResultSubmittedNotification extends TournamentNotification
{
    public function __construct(
        private readonly string $tournamentId,
        private readonly string $tournamentName,
        private readonly string $matchId,
        private readonly int    $matchNumber,
        private readonly string $submitterName,
        private readonly int    $scoreA,
        private readonly int    $scoreB,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'            => 'result_submitted',
            'title'           => 'Result submitted — confirm or dispute',
            'body'            => "{$this->submitterName} submitted Match #{$this->matchNumber} ({$this->scoreA}–{$this->scoreB}). Please confirm or dispute within 24 hours.",
            'icon'            => '📋',
            'tournament_id'   => $this->tournamentId,
            'tournament_name' => $this->tournamentName,
            'match_id'        => $this->matchId,
            'match_number'    => $this->matchNumber,
            'submitter_name'  => $this->submitterName,
            'score_a'         => $this->scoreA,
            'score_b'         => $this->scoreB,
            'action_url'      => "/tournaments/{$this->tournamentId}",
            'action_label'    => 'Confirm Result',
            'urgent'          => true,
        ];
    }
}
