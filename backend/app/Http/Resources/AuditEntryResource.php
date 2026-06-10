<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityAuditEntry
 */
final class AuditEntryResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'action'     => $this->action,
            'meta'       => $this->meta,
            'actor'      => $this->actor ? [
                'id'       => $this->actor->id,
                'nickname' => $this->actor->display_name,
            ] : null,
            'target'     => $this->targetUser ? [
                'id'       => $this->targetUser->id,
                'nickname' => $this->targetUser->display_name,
            ] : null,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
