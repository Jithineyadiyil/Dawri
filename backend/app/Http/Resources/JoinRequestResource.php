<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityJoinRequest
 */
final class JoinRequestResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'status'     => $this->status,
            'message'    => $this->message,
            'user'       => [
                'id'       => $this->user?->id,
                'nickname' => $this->user?->display_name,
                'avatar'   => $this->user?->avatar_url ?? $this->user?->avatar,
            ],
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
