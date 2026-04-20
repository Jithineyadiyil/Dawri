<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * PATCH /profile/me
 *
 * All fields optional. Send null to clear. Nickname is validated for
 * alphanumeric + underscore only, 3-30 chars, and globally unique
 * (when set), so it can serve as a gamer-tag identifier.
 */
class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool { return $this->user() !== null; }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name'          => ['sometimes', 'string', 'min:2', 'max:100'],
            'nickname'      => [
                'nullable', 'string', 'min:3', 'max:30',
                'regex:/^[A-Za-z0-9_]+$/',
                Rule::unique('users', 'nickname')->ignore($userId),
            ],
            'bio'           => ['nullable', 'string', 'max:500'],
            'country'       => ['nullable', 'string', 'max:50'],
            'city'          => ['nullable', 'string', 'max:50'],
            'game_username' => ['nullable', 'string', 'max:50'],
            'psn_id'        => ['nullable', 'string', 'max:50'],
            'pubg_id'       => ['nullable', 'string', 'max:50'],
            'cod_id'        => ['nullable', 'string', 'max:50'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'nickname.regex'   => 'Nickname may only contain letters, numbers, and underscores.',
            'nickname.unique'  => 'That nickname is already taken.',
        ];
    }
}
