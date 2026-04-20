<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates incoming tournament creation payload.
 */
class CreateTournamentRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name'                   => ['required', 'string', 'max:150'],
            'name_ar'                => ['nullable', 'string', 'max:150'],
            'game'                   => ['required', 'in:ea_fc25,pubg_mobile,cod_mobile'],
            'format'                 => ['required', 'in:single_elimination,double_elimination,round_robin,swiss'],
            'max_participants'       => ['required', 'integer', 'min:4', 'max:512'],
            'swiss_rounds'           => ['nullable', 'required_if:format,swiss', 'integer', 'min:3', 'max:15'],
            'registration_closes_at' => ['required', 'date', 'after:now'],
            'starts_at'              => ['required', 'date', 'after:registration_closes_at'],
            'timezone'               => ['nullable', 'string', 'max:50'],
            'is_public'              => ['boolean'],
            'prize_pool'             => ['nullable', 'array'],
            'prize_pool.*.position'  => ['required_with:prize_pool', 'integer', 'min:1'],
            'prize_pool.*.reward'    => ['required_with:prize_pool', 'string', 'max:200'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'swiss_rounds.required_if' => 'Swiss rounds count is required for Swiss format.',
            'starts_at.after'          => 'Tournament must start after registration closes.',
        ];
    }
}
