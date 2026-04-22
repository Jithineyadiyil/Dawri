<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * SponsorResource — public shape for the Sponsor model.
 * Internal contact fields (email, phone) are only exposed to admins.
 */
class SponsorResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $isAdmin = $request->user()?->role === 'admin';

        return array_filter([
            'id'            => $this->id,
            'name'          => $this->name,
            'name_ar'       => $this->name_ar,
            'slug'          => $this->slug,
            'tagline'       => $this->tagline,
            'tagline_ar'    => $this->tagline_ar,
            'logo_url'      => $this->logo_url,
            'website_url'   => $this->website_url,
            'is_active'     => (bool) $this->is_active,

            // Admin-only fields
            'contact_name'  => $isAdmin ? $this->contact_name  : null,
            'contact_email' => $isAdmin ? $this->contact_email : null,
            'contact_phone' => $isAdmin ? $this->contact_phone : null,
            'company_id'    => $isAdmin ? $this->company_id    : null,
            'created_at'    => $isAdmin ? $this->created_at?->toIso8601String() : null,
        ], fn ($v) => $v !== null);
    }
}
