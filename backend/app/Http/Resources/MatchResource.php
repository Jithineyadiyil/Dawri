<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transforms a TournamentMatch model into an API-safe array.
 */
class MatchResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'bracket_id'            => $this->bracket_id,
            'round_number'          => $this->round_number,
            'match_number'          => $this->match_number,
            'bracket_section'       => $this->bracket_section,
            'status'                => $this->status,
            'participant_a'         => $this->participantA ? [
                'id'        => $this->participantA->id,
                'user_name' => $this->participantA->user?->name ?? 'TBD',
                'seed'      => $this->participantA->seed,
            ] : null,
            'participant_b'         => $this->participantB ? [
                'id'        => $this->participantB->id,
                'user_name' => $this->participantB->user?->name ?? 'TBD',
                'seed'      => $this->participantB->seed,
            ] : null,
            'participant_a_is_bye'  => $this->participant_a_is_bye,
            'participant_b_is_bye'  => $this->participant_b_is_bye,
            'winner'                => $this->winner ? [
                'id'        => $this->winner->id,
                'user_name' => $this->winner->user?->name,
            ] : null,
            'score_a'               => $this->score_a,
            'score_b'               => $this->score_b,
            'next_match_id'         => $this->next_match_id,
            'loser_next_match_id'   => $this->loser_next_match_id,
            'dispute_reason'        => $this->dispute_reason,
            'scheduled_at'          => $this->scheduled_at?->toIso8601String(),
            'completed_at'          => $this->completed_at?->toIso8601String(),
        ];
    }
}
