<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\EventRsvp;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityEvent
 *
 * Shapes an event with per-status RSVP counts, the total going, and the current
 * viewer's own RSVP status (so the UI can highlight their choice).
 */
final class EventResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $userId = $request->user()?->id;

        $counts = ['going' => 0, 'maybe' => 0, 'declined' => 0];
        $myStatus = null;

        if ($this->relationLoaded('rsvps')) {
            foreach ($this->rsvps as $rsvp) {
                if (isset($counts[$rsvp->status])) {
                    $counts[$rsvp->status]++;
                }
                if ($userId !== null && $rsvp->user_id === $userId) {
                    $myStatus = $rsvp->status;
                }
            }
        }

        return [
            'id'           => $this->id,
            'community_id' => $this->community_id,
            'title'        => $this->title,
            'description'  => $this->description,
            'location'     => $this->location,
            'starts_at'    => $this->starts_at->toIso8601String(),
            'ends_at'      => $this->ends_at?->toIso8601String(),
            'is_cancelled' => $this->is_cancelled,
            'is_upcoming'  => $this->isUpcoming(),
            'creator'      => [
                'id'       => $this->creator?->id,
                'nickname' => $this->creator?->display_name,
            ],
            'counts'       => $counts,
            'my_status'    => $myStatus,
            'created_at'   => $this->created_at->toIso8601String(),
        ];
    }
}
