<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transforms a TournamentMatch for match history display.
 *
 * Expects the match to have a `_viewer_participant_ids` array set
 * to determine if the viewing player won or lost.
 */
class MatchHistoryResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $viewerIds = $this->_viewer_participant_ids ?? [];
        $isWinner = in_array($this->winner_id, $viewerIds, true);
        $isLoser = $this->winner_id !== null && ! $isWinner
            && (in_array($this->participant_a_id, $viewerIds, true)
                || in_array($this->participant_b_id, $viewerIds, true));

        // Determine opponent
        $isViewerA = in_array($this->participant_a_id, $viewerIds, true);
        $opponent = $isViewerA ? $this->participantB : $this->participantA;

        return [
            'match_id'        => $this->id,
            'tournament_id'   => $this->bracket?->tournament_id,
            'tournament_name' => $this->bracket?->tournament?->name,
            'game'            => $this->bracket?->tournament?->game,
            'round'           => $this->round_number,
            'match_number'    => $this->match_number,
            'bracket_section' => $this->bracket_section,
            'status'          => $this->status,
            'result'          => $this->winner_id === null ? 'pending' : ($isWinner ? 'win' : ($isLoser ? 'loss' : 'pending')),
            'score_a'         => $this->score_a,
            'score_b'         => $this->score_b,
            'opponent'        => $opponent ? [
                'participant_id' => $opponent->id,
                'user_id'        => $opponent->user_id,
                'name'           => $opponent->user?->game_username ?? $opponent->user?->name ?? $opponent->gamertag ?? 'TBD',
                'gamertag'       => $opponent->gamertag,
            ] : null,
            'played_at'       => $this->updated_at?->toIso8601String(),
        ];
    }
}
