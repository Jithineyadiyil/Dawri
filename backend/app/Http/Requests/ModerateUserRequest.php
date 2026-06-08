<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\ModerationService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ModerateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $action = $this->input('action');

        return [
            'action'   => ['required', Rule::in(['mute', 'unmute', 'ban', 'unban'])],
            'user_id'  => ['required', 'uuid', 'exists:users,id'],
            'minutes'  => [
                Rule::requiredIf(fn () => $action === 'mute'),
                'nullable',
                'integer',
                Rule::in(ModerationService::MUTE_DURATIONS),
            ],
            'reason'   => [
                Rule::requiredIf(fn () => $action === 'ban'),
                'nullable',
                'string',
                'max:500',
            ],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'action.in'      => 'Action must be one of: mute, unmute, ban, unban.',
            'minutes.in'     => 'Mute duration must be one of: 5, 30, 60, 240, 1440, or 10080 minutes.',
            'reason.required'=> 'A ban reason is required.',
        ];
    }
}
