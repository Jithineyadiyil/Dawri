<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\BroadcastSetupLog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * LogWizardEventRequest
 *
 * Validates payload for POST /broadcasts/{id}/setup-wizard/event
 * and       POST /tournaments/{id}/setup-wizard/event.
 *
 * @package App\Http\Requests
 */
final class LogWizardEventRequest extends FormRequest
{
    /**
     * Authorization is enforced inside ObsWizardService — service-level
     * check (matches LiveBroadcastController's pattern).
     */
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
            'event'       => ['required', 'string', Rule::in(BroadcastSetupLog::EVENTS)],
            'step_number' => ['nullable', 'integer', 'between:1,6'],
            'platform'    => ['nullable', 'string', Rule::in(BroadcastSetupLog::PLATFORMS)],
            'metadata'    => ['nullable', 'array'],
            'metadata.*'  => ['nullable'],
        ];
    }

    /**
     * @return array<string,string>
     */
    public function messages(): array
    {
        return [
            'event.in'            => 'Unknown wizard event code.',
            'step_number.between' => 'Wizard step must be between 1 and 6.',
            'platform.in'         => 'Platform must be windows, macos, linux, or unknown.',
        ];
    }
}
