<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSponsorshipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'tournament_id'          => ['required', 'uuid', 'exists:tournaments,id'],
            'sponsor_id'             => ['required', 'uuid', 'exists:sponsors,id'],
            'placement_type'         => ['required', Rule::in(['title', 'presenting', 'supporting'])],
            'contribution_type'      => ['required', Rule::in(['cash', 'in_kind', 'logo'])],
            'cash_amount_sar'        => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'in_kind_description'    => ['nullable', 'string', 'max:500'],
            'in_kind_description_ar' => ['nullable', 'string', 'max:500'],
            'in_kind_value_sar'      => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'notes'                  => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'placement_type.in'    => 'Placement type must be one of: title, presenting, supporting.',
            'contribution_type.in' => 'Contribution type must be one of: cash, in_kind, logo.',
        ];
    }
}
