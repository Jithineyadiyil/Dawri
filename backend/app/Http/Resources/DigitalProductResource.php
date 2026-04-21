<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * DigitalProductResource
 *
 * Sprint 5: brand logos now served from /brands/{slug}.svg (frontend public
 * assets) instead of Wikipedia Commons URLs. Falls back to a generic card
 * SVG if no local asset exists for this brand (bug 3).
 *
 * @mixin \App\Models\DigitalProduct
 */
final class DigitalProductResource extends JsonResource
{
    /** @var array<string, string>  brand → slug mapping for local /brands/ asset lookup */
    private const BRAND_SLUGS = [
        'PSN'          => 'psn',
        'PlayStation'  => 'psn',
        'Xbox'         => 'xbox',
        'Steam'        => 'steam',
        'PUBG'         => 'pubg',
        'Roblox'       => 'roblox',
        'Valorant'     => 'valorant',
        'Fortnite'     => 'fortnite',
        'Call of Duty' => 'cod',
        'Free Fire'    => 'freefire',
        'Minecraft'    => 'minecraft',
        'Jawaker'      => 'jawaker',
        'Netflix'      => 'netflix',
        'Spotify'      => 'spotify',
        'Apple'        => 'apple',
        'iTunes'       => 'apple',
        'Google Play'  => 'googleplay',
        'YouTube'      => 'youtube',
        'Shahid'       => 'shahid',
        'OSN'          => 'osn',
        'Amazon'       => 'amazon',
        'Noon'         => 'noon',
        'STC Pay'      => 'stcpay',
        'Carrefour'    => 'carrefour',
        'Starbucks'    => 'starbucks',
    ];

    /**
     * @param  Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'name_ar'     => $this->name_ar,
            'brand'       => $this->brand,
            'category'    => $this->category,
            'face_value'  => (float) $this->face_value,
            'currency'    => $this->currency,
            'our_price'   => (float) $this->our_price,
            'region'      => $this->region,
            'image_url'   => $this->image_url ?: $this->brandLogoUrl(),
            'distributor' => $this->distributor,
        ];
    }

    /**
     * Resolve the local-asset URL for this product's brand logo.
     */
    private function brandLogoUrl(): string
    {
        $key = trim((string) $this->brand);

        // Exact match first
        if (isset(self::BRAND_SLUGS[$key])) {
            return '/brands/' . self::BRAND_SLUGS[$key] . '.svg';
        }

        // Case-insensitive partial match
        foreach (self::BRAND_SLUGS as $name => $slug) {
            if (stripos($key, $name) !== false || stripos($name, $key) !== false) {
                return '/brands/' . $slug . '.svg';
            }
        }

        return '/brands/generic.svg';
    }
}
