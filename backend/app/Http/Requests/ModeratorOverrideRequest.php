<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates a moderator override on a match result.
 */
class ModeratorOverrideRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'winner_participant_id' => ['required', 'string', 'uuid'],
            'reason'                => ['required', 'string', 'min:10', 'max:1000'],
        ];
    }
}
