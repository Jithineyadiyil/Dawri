<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Message;
use Illuminate\Foundation\Http\FormRequest;

final class SendMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'content' => [
                'required',
                'string',
                'min:1',
                'max:' . Message::MAX_LENGTH,
            ],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'content.required' => 'Message cannot be empty.',
            'content.min'      => 'Message cannot be empty.',
            'content.max'      => 'Message exceeds the ' . Message::MAX_LENGTH . '-character limit.',
        ];
    }
}
