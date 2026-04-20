<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * PATCH /tournaments/{id}/brand
 * Payload: all optional. Send null to clear a field.
 *   brand_override  : bool
 *   primary_color   : #hex
 *   secondary_color : #hex
 *   accent_color    : #hex
 *   background_color: #hex
 *   font_family     : string (one of the allowed list)
 *   logo_url        : URL
 */
class UpdateTournamentBrandingRequest extends FormRequest
{
    /** @var array<int, string> Curated, web-safe font options. */
    private const ALLOWED_FONTS = [
        'Bebas Neue, Rajdhani, sans-serif',
        'Rajdhani, sans-serif',
        'Inter, sans-serif',
        'Orbitron, sans-serif',
        'Poppins, sans-serif',
        'Cairo, sans-serif',
        'Space Mono, monospace',
    ];

    public function authorize(): bool { return $this->user() !== null; }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $hex = ['nullable', 'regex:/^#([A-Fa-f0-9]{6})$/'];

        return [
            'brand_override'   => ['sometimes', 'boolean'],
            'primary_color'    => $hex,
            'secondary_color'  => $hex,
            'accent_color'     => $hex,
            'background_color' => $hex,
            'font_family'      => ['nullable', 'string', 'in:' . implode(',', self::ALLOWED_FONTS)],
            'logo_url'         => ['nullable', 'url', 'max:500'],
        ];
    }
}
