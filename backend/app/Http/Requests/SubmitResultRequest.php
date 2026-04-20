<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates match result submission with optional screenshot.
 */
class SubmitResultRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'winner_participant_id' => ['required', 'string', 'uuid'],
            'score_a'               => ['nullable', 'integer', 'min:0', 'max:999'],
            'score_b'               => ['nullable', 'integer', 'min:0', 'max:999'],
            'screenshot'            => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];
    }
}
