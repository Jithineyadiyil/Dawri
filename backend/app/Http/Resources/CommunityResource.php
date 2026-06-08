<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Community
 */
final class CommunityResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'type'            => $this->type,
            'tournament_id'   => $this->tournament_id,
            'name'            => $this->name,
            'slug'            => $this->slug,
            'description'     => $this->description,
            'icon_url'        => $this->icon_url,
            'is_active'       => $this->is_active,
            'is_archived'     => $this->isArchived(),
            'archived_at'     => $this->archived_at?->toIso8601String(),
            'channels'        => ChannelResource::collection($this->whenLoaded('channels')),
            'member_count'    => $this->whenCounted('memberships'),
            'created_at'      => $this->created_at->toIso8601String(),
        ];
    }
}
