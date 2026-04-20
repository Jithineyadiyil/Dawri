<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'key'               => $this->key,
            'name'              => $this->name,
            'name_ar'           => $this->name_ar,
            'icon_url'          => $this->icon_url,
            'icon_emoji'        => $this->icon_emoji,
            'platform'          => $this->platform,
            'genre'             => $this->genre,
            'supported_formats' => $this->supported_formats ?? [],
            'is_active'         => $this->is_active,
            'sort_order'        => $this->sort_order,
            'created_at'        => $this->created_at?->toIso8601String(),
            'updated_at'        => $this->updated_at?->toIso8601String(),
        ];
    }
}
