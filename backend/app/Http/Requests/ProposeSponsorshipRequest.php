<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * ProposeSponsorshipRequest
 *
 * Used by the organizer-facing propose endpoint. Authorization is handled by
 * the controller (ownership check) rather than here because it depends on the
 * route's {tournament} binding which isn't available at FormRequest::authorize()
 * time on all Laravel versions without extra work. Controllers always check.
 */
class ProposeSponsorshipRequest extends FormRequest
{
    public function authorize(): bool
    {
        $role = $this->user()?->role;
        return in_array($role, ['admin', 'organizer'], true);
    }

    public function rules(): array
    {
        return [
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
