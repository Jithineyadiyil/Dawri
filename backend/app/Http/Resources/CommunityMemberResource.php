<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityMember
 */
final class CommunityMemberResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'community_id' => $this->community_id,
            'user'         => [
                'id'       => $this->user->id ?? $this->user_id,
                'nickname' => $this->user->display_name ?? $this->user->nickname ?? null,
                'avatar'   => $this->user->avatar_url ?? $this->user->avatar ?? null,
            ],
            'role'         => $this->role,
            'joined_at'    => $this->joined_at?->toIso8601String(),
            'muted_until'  => $this->muted_until?->toIso8601String(),
            'is_muted'     => $this->isMuted(),
            'is_banned'    => $this->isBanned(),
            'ban_reason'   => $this->ban_reason,
        ];
    }
}
