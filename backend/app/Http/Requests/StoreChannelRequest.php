<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Channel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreChannelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $communityId = $this->route('community')?->id;

        return [
            'name'  => [
                'required',
                'string',
                'min:2',
                'max:80',
                'regex:/^[a-z0-9][a-z0-9\-]*[a-z0-9]$/',
                Rule::unique('channels', 'name')->where('community_id', $communityId),
            ],
            'topic'    => ['nullable', 'string', 'max:250'],
            'type'     => ['nullable', 'string', Rule::in([Channel::TYPE_TEXT, Channel::TYPE_ANNOUNCEMENT])],
            'position' => ['nullable', 'integer', 'min:0', 'max:999'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.regex'  => 'Channel name must be lowercase, alphanumeric, and may contain hyphens (e.g. "ea-fc-25").',
            'name.unique' => 'A channel with this name already exists in this community.',
        ];
    }
}
