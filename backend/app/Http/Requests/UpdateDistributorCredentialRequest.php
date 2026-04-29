<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\DistributorCredential;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validation for PUT /admin/marketplace/distributors/{distributor}/credentials.
 * Admin-only — authorise() checks role.
 */
class UpdateDistributorCredentialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'environment'    => ['required', Rule::in(DistributorCredential::ENVIRONMENTS)],
            'api_key'        => ['nullable', 'string', 'max:500'],
            'api_secret'     => ['nullable', 'string', 'max:500'],
            'client_id'      => ['nullable', 'string', 'max:500'],
            'client_secret'  => ['nullable', 'string', 'max:500'],
            'base_url'       => ['nullable', 'url', 'max:300'],
            'is_active'      => ['nullable', 'boolean'],
        ];
    }
}
