<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SponsorshipResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $isAdmin = $request->user()?->role === 'admin';

        return array_filter([
            'id'                 => $this->id,
            'tournament_id'      => $this->tournament_id,
            'sponsor'            => $this->whenLoaded('sponsor', fn () => new SponsorResource($this->sponsor)),
            'placement_type'     => $this->placement_type,
            'contribution_type'  => $this->contribution_type,
            'cash_amount_sar'    => (float) $this->cash_amount_sar,
            'in_kind_description'    => $this->in_kind_description,
            'in_kind_description_ar' => $this->in_kind_description_ar,
            'in_kind_value_sar'  => $this->in_kind_value_sar !== null ? (float) $this->in_kind_value_sar : null,
            'contract_status'    => $this->contract_status,
            'activated_at'       => $this->activated_at?->toIso8601String(),
            'fulfilled_at'       => $this->fulfilled_at?->toIso8601String(),

            // Admin-only
            'notes'              => $isAdmin ? $this->notes : null,
            'created_at'         => $isAdmin ? $this->created_at?->toIso8601String() : null,
        ], fn ($v) => $v !== null);
    }
}
