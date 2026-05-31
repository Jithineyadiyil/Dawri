<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the `POST /api/v1/broadcasts/{broadcast}/browser-session` payload.
 *
 * Currently no body fields are required — the broadcast is identified via
 * the route parameter — but this FormRequest exists so we have a stable
 * place to add future fields (capture mode preset, bitrate hints, etc.)
 * without touching the controller signature.
 */
final class CreateBrowserSessionRequest extends FormRequest
{
    /**
     * The actual authorization check runs in the Service layer
     * (per project convention). Here we only ensure the user is
     * authenticated, which Sanctum middleware already enforces.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, list<string>|string>
     */
    public function rules(): array
    {
        return [
            'capture_mode' => ['sometimes', 'string', 'in:webcam,screen,screen_with_cam'],
            'preferred_resolution' => ['sometimes', 'string', 'in:720p,1080p'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'capture_mode.in' => 'Capture mode must be one of: webcam, screen, screen_with_cam.',
            'preferred_resolution.in' => 'Resolution must be one of: 720p, 1080p.',
        ];
    }
}
