<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * POST /api/v1/matches/{match}/schedule
 *
 * Payload:
 *   scheduled_at : ISO-8601 datetime, must be in the future.
 */
class ScheduleMatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Authorization is enforced in the controller (organizer/admin check).
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'scheduled_at' => ['required', 'date', 'after:now'],
        ];
    }
}
