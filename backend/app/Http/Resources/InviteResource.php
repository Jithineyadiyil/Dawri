<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityInvite
 */
final class InviteResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'token'      => $this->token,
            'max_uses'   => $this->max_uses,
            'uses'       => $this->uses,
            'expires_at' => $this->expires_at?->toIso8601String(),
            'is_revoked' => $this->is_revoked,
            'is_usable'  => $this->isUsable(),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
