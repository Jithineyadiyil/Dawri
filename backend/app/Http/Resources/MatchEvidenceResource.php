<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\MatchEvidence;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MatchEvidence
 */
class MatchEvidenceResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'match_id'       => $this->match_id,
            'uploaded_by' => [
                'id'   => $this->uploaded_by_id,
                'name' => $this->whenLoaded('uploadedBy', fn () => $this->uploadedBy?->name),
            ],
            'file_type'      => $this->file_type,
            'file_mime'      => $this->file_mime,
            'file_size'      => $this->file_size,
            'url'            => $this->url,
            'caption'        => $this->caption,
            'created_at'     => $this->created_at?->toIso8601String(),
        ];
    }
}
