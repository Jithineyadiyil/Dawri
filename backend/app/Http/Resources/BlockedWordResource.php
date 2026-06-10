<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\CommunityBlockedWord
 */
final class BlockedWordResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'word'       => $this->word,
            'mode'       => $this->mode,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
