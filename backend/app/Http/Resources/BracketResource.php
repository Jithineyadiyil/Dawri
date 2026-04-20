<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transforms a Bracket model into an API-safe array.
 */
class BracketResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'tournament_id'     => $this->tournament_id,
            'format'            => $this->format,
            'status'            => $this->status,
            'total_rounds'      => $this->total_rounds,
            'current_round'     => $this->current_round,
            'participant_count' => $this->participant_count,
            'bye_count'         => $this->bye_count,
            'winner'            => $this->whenLoaded('winner', fn () => $this->winner ? [
                'id'        => $this->winner->id,
                'user_name' => $this->winner->user?->name,
            ] : null),
            'matches'           => $this->whenLoaded('matches',
                fn () => MatchResource::collection($this->matches)
            ),
            'generated_at'      => $this->generated_at?->toIso8601String(),
            'completed_at'      => $this->completed_at?->toIso8601String(),
        ];
    }
}
