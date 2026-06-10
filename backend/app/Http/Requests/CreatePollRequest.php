<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreatePollRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'question'    => ['required', 'string', 'min:1', 'max:300'],
            'options'     => ['required', 'array', 'min:2', 'max:10'],
            'options.*'   => ['required', 'string', 'min:1', 'max:150'],
            'is_multiple' => ['nullable', 'boolean'],
            'closes_at'   => ['nullable', 'date', 'after:now'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'options.min'   => 'A poll needs at least two options.',
            'options.max'   => 'A poll can have at most ten options.',
            'closes_at.after' => 'The close time must be in the future.',
        ];
    }
}
