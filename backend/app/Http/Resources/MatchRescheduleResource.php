<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\MatchRescheduleRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MatchRescheduleRequest
 */
class MatchRescheduleResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                     => $this->id,
            'match_id'               => $this->match_id,
            'requested_by' => [
                'id'   => $this->requested_by_id,
                'name' => $this->whenLoaded('requestedBy', fn () => $this->requestedBy?->name),
            ],
            'proposed_at'            => $this->proposed_at?->toIso8601String(),
            'reason'                 => $this->reason,
            'status'                 => $this->status,
            'responded_by' => $this->when(
                $this->responded_by_id !== null,
                fn () => [
                    'id'   => $this->responded_by_id,
                    'name' => $this->whenLoaded('respondedBy', fn () => $this->respondedBy?->name),
                ]
            ),
            'responded_at'           => $this->responded_at?->toIso8601String(),
            'was_organizer_override' => (bool) $this->was_organizer_override,
            'is_pending'             => $this->status === MatchRescheduleRequest::STATUS_PENDING,
            'created_at'             => $this->created_at?->toIso8601String(),
        ];
    }
}
