<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        // PATCH/PUT updates: all fields optional ("sometimes"); POST: required core fields.
        $creating = $this->isMethod('post');

        return [
            'title'       => [$creating ? 'required' : 'sometimes', 'string', 'min:1', 'max:200'],
            'description' => ['nullable', 'string', 'max:5000'],
            'location'    => ['nullable', 'string', 'max:255'],
            'starts_at'   => [$creating ? 'required' : 'sometimes', 'date'],
            'ends_at'     => ['nullable', 'date', 'after_or_equal:starts_at'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'starts_at.required' => 'A start date and time is required.',
            'ends_at.after_or_equal' => 'The end time must be at or after the start time.',
        ];
    }
}
