<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Company
 */
class CompanyBrandingResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'name_ar'          => $this->name_ar,
            'logo_url'         => $this->logo_url,
            'primary_color'    => $this->primary_color,
            'secondary_color'  => $this->secondary_color,
            'accent_color'     => $this->accent_color,
            'background_color' => $this->background_color,
            'font_family'      => $this->font_family,
            'has_branding'     => $this->hasBranding(),
        ];
    }
}
