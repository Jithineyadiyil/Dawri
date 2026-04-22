<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSponsorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        $sponsorId = $this->route('sponsor'); // null on store, uuid on update

        return [
            'name'          => ['required', 'string', 'min:2', 'max:120'],
            'name_ar'       => ['nullable', 'string', 'max:120'],
            'slug'          => ['nullable', 'string', 'max:140', 'alpha_dash',
                                Rule::unique('sponsors', 'slug')->ignore($sponsorId)],
            'tagline'       => ['nullable', 'string', 'max:500'],
            'tagline_ar'    => ['nullable', 'string', 'max:500'],
            'logo_url'      => ['nullable', 'url', 'max:500'],
            'website_url'   => ['nullable', 'url', 'max:300'],
            'contact_name'  => ['nullable', 'string', 'max:120'],
            'contact_email' => ['nullable', 'email', 'max:180'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
            'company_id'    => ['nullable', 'uuid', 'exists:companies,id'],
            'is_active'     => ['nullable', 'boolean'],
        ];
    }
}
