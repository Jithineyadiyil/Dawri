<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * POST /api/v1/matches/{match}/reschedule-requests
 *
 * Payload:
 *   proposed_at : ISO-8601 datetime, must be in the future.
 *   reason      : optional plain text, max 500 chars.
 */
class RequestRescheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'proposed_at' => ['required', 'date', 'after:now'],
            'reason'      => ['nullable', 'string', 'max:500'],
        ];
    }
}
