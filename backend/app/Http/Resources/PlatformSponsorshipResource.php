<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * PlatformSponsorshipResource — public response shape.
 *
 * IMPORTANT: contract_value_sar and internal_notes are NEVER serialised
 * to public consumers. Admin endpoints use a separate resource that
 * includes those fields.
 *
 * Logo URL is normalised to an absolute URL so that frontend hosts on
 * different origins (e.g. Angular dev on :4300 hitting Laravel on :8001)
 * can render the image directly.
 */
class PlatformSponsorshipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'tier'          => $this->tier,
            'display_order' => $this->display_order,
            'sponsor'       => [
                'id'          => $this->sponsor?->id,
                'name'        => $this->sponsor?->name,
                'name_ar'     => $this->sponsor?->name_ar,
                'slug'        => $this->sponsor?->slug,
                'tagline'     => $this->sponsor?->tagline,
                'tagline_ar'  => $this->sponsor?->tagline_ar,
                'logo_url'    => $this->absolutise($this->sponsor?->logo_url),
                'website_url' => $this->sponsor?->website_url,
            ],
        ];
    }

    /**
     * Convert a possibly-relative URL to an absolute one rooted at the
     * configured app URL. Already-absolute URLs (http://, https://, //)
     * pass through untouched.
     */
    private function absolutise(?string $url): ?string
    {
        if ($url === null || $url === '') {
            return null;
        }
        // Already absolute (http://, https://, //)
        if (preg_match('#^(https?:)?//#i', $url)) {
            return $url;
        }
        // Leading slash → resolve against APP_URL
        $base = rtrim((string) config('app.url', url('/')), '/');
        return $base . '/' . ltrim($url, '/');
    }
}
