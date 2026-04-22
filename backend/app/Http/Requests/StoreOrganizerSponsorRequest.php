<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validation for organizer-facing POST /sponsors.
 *
 * Organizers create brand entries to use in their own tournament sponsorships.
 * These start scoped (is_global=false) until an admin promotes them.
 *
 * Admins can use this endpoint too — their sponsors are created with
 * is_global=true. That decision is made in the controller, not here.
 */
class StoreOrganizerSponsorRequest extends FormRequest
{
    public function authorize(): bool
    {
        $role = $this->user()?->role;
        return in_array($role, ['admin', 'organizer'], true);
    }

    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'min:2', 'max:120'],
            'name_ar'       => ['nullable', 'string', 'max:120'],
            'tagline'       => ['nullable', 'string', 'max:500'],
            'tagline_ar'    => ['nullable', 'string', 'max:500'],
            'website_url'   => ['nullable', 'url', 'max:300'],
            'contact_name'  => ['nullable', 'string', 'max:120'],
            'contact_email' => ['nullable', 'email', 'max:180'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Sponsor name is required.',
            'name.min'      => 'Sponsor name must be at least 2 characters.',
            'website_url.url' => 'Website must be a valid URL (start with http:// or https://).',
        ];
    }
}
