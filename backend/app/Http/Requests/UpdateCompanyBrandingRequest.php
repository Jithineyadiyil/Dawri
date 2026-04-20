<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * PATCH /companies/mine/brand
 */
class UpdateCompanyBrandingRequest extends FormRequest
{
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
            'primary_color'    => $hex,
            'secondary_color'  => $hex,
            'accent_color'     => $hex,
            'background_color' => $hex,
            'font_family'      => ['nullable', 'string', 'in:' . implode(',', self::ALLOWED_FONTS)],
        ];
    }
}
