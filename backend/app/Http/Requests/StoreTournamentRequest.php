<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTournamentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && in_array(Auth::user()->role, ['organizer', 'admin'], true);
    }

    public function rules(): array
    {
        return [
            'name'                   => ['required', 'string', 'max:200'],
            'name_ar'                => ['nullable', 'string', 'max:200'],
            'description'            => ['nullable', 'string', 'max:2000'],
            'game'                   => ['required', 'string', 'in:ea_fc,ea_fc25,pubg_mobile,cod_mobile,valorant,fortnite,tekken,street_fighter'],
            'format'                 => ['required', 'string', 'in:single_elimination,double_elimination,round_robin,swiss'],
            'max_participants'       => ['required', 'integer', 'min:2', 'max:512'],
            'swiss_rounds'           => ['nullable', 'integer', 'min:3', 'max:15'],
            // Accept both field name conventions
            'start_date'             => ['nullable', 'date'],
            'starts_at'              => ['nullable', 'date'],
            'end_date'               => ['nullable', 'date'],
            'registration_start'     => ['nullable', 'date'],
            'registration_end'       => ['nullable', 'date'],
            'registration_closes_at' => ['nullable', 'date'],
            'entry_fee_sar'          => ['nullable', 'integer', 'min:0'],
            'prize_pool'             => ['nullable'],
            'prize_currency'         => ['nullable', 'string', 'size:3'],
            'timezone'               => ['nullable', 'string'],
            'is_public'              => ['nullable', 'boolean'],
            'banner_url'             => ['nullable', 'url', 'max:500'],
            'rules'                  => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * Normalize field name aliases before validation.
     */
    protected function prepareForValidation(): void
    {
        $merge = [];

        // starts_at → start_date
        if ($this->has('starts_at') && !$this->has('start_date')) {
            $merge['start_date'] = $this->starts_at;
        }
        // start_date → starts_at
        if ($this->has('start_date') && !$this->has('starts_at')) {
            $merge['starts_at'] = $this->start_date;
        }
        // registration_closes_at → registration_end
        if ($this->has('registration_closes_at') && !$this->has('registration_end')) {
            $merge['registration_end'] = $this->registration_closes_at;
        }

        if ($merge) {
            $this->merge($merge);
        }
    }

    public function messages(): array
    {
        return [
            'name.required'        => 'Tournament name is required.',
            'game.in'              => 'Selected game is not supported.',
            'format.in'            => 'Selected format is not supported.',
            'max_participants.min' => 'A tournament needs at least 2 participants.',
        ];
    }
}
