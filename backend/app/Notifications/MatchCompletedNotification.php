<?php

declare(strict_types=1);

namespace App\Notifications;

/** Sent to both players when a match result is confirmed and bracket advances. */
final class MatchCompletedNotification extends TournamentNotification
{
    public function __construct(
        private readonly string  $tournamentId,
        private readonly string  $tournamentName,
        private readonly string  $matchId,
        private readonly int     $matchNumber,
        private readonly string  $winnerName,
        private readonly bool    $isWinner,
        private readonly int     $scoreA,
        private readonly int     $scoreB,
    ) {}

    public function toDatabase(object $notifiable): array
    {
        $title = $this->isWinner ? '🏆 You won the match!' : 'Match result confirmed';
        $body  = $this->isWinner
            ? "You won Match #{$this->matchNumber} ({$this->scoreA}–{$this->scoreB}) in {$this->tournamentName}. Keep going!"
            : "{$this->winnerName} won Match #{$this->matchNumber} ({$this->scoreA}–{$this->scoreB}) in {$this->tournamentName}.";

        return [
            'type'            => 'match_completed',
            'title'           => $title,
            'body'            => $body,
            'icon'            => $this->isWinner ? '🏆' : '📊',
            'tournament_id'   => $this->tournamentId,
            'tournament_name' => $this->tournamentName,
            'match_id'        => $this->matchId,
            'match_number'    => $this->matchNumber,
            'winner_name'     => $this->winnerName,
            'is_winner'       => $this->isWinner,
            'score_a'         => $this->scoreA,
            'score_b'         => $this->scoreB,
            'action_url'      => "/tournaments/{$this->tournamentId}",
            'action_label'    => 'View Bracket',
        ];
    }
}
