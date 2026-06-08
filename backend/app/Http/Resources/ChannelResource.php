<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Channel
 */
final class ChannelResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'community_id' => $this->community_id,
            'name'         => $this->name,
            'topic'        => $this->topic,
            'type'         => $this->type,
            'position'     => $this->position,
            'is_archived'  => $this->is_archived,
            'unread_count' => $this->when(isset($this->unread_count), fn () => (int) $this->unread_count),
        ];
    }
}
