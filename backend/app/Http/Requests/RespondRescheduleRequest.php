<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * POST /api/v1/matches/{match}/reschedule-requests/{id}/respond
 *
 * Payload:
 *   action   : 'accept' | 'reject'
 *   override : (optional) boolean — when true AND the user is an
 *              organizer/admin, bypasses the opposing-player-consent rule.
 */
class RespondRescheduleRequest extends FormRequest
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
            'action'   => ['required', 'in:accept,reject'],
            'override' => ['sometimes', 'boolean'],
        ];
    }

    public function wantsAccept(): bool
    {
        return $this->input('action') === 'accept';
    }

    public function wantsOverride(): bool
    {
        return (bool) $this->input('override', false);
    }
}
