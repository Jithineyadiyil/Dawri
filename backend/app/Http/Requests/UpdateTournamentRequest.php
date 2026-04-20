<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * Validates the payload for updating an existing tournament.
 */
class UpdateTournamentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name'               => ['sometimes', 'string', 'max:200'],
            'description'        => ['nullable', 'string', 'max:2000'],
            'game'               => ['sometimes', 'string', 'in:ea_fc,pubg_mobile,cod_mobile,valorant,fortnite,tekken,street_fighter'],
            'format'             => ['sometimes', 'string', 'in:single_elimination,double_elimination,round_robin,swiss'],
            'max_participants'   => ['sometimes', 'integer', 'min:2', 'max:512'],
            'start_date'         => ['sometimes', 'date'],
            'end_date'           => ['sometimes', 'date', 'after:start_date'],
            'registration_start' => ['nullable', 'date'],
            'registration_end'   => ['nullable', 'date'],
            'prize_pool'         => ['nullable', 'numeric', 'min:0'],
            'prize_currency'     => ['nullable', 'string', 'size:3'],
            'banner_url'         => ['nullable', 'url', 'max:500'],
            'rules'              => ['nullable', 'string', 'max:5000'],
            'status'             => ['sometimes', 'string', 'in:draft,registration,ongoing,completed,cancelled'],
        ];
    }
}
