<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Channel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateChannelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $channelId   = $this->route('channel')?->id;
        $communityId = $this->route('channel')?->community_id;

        return [
            'name' => [
                'sometimes',
                'string',
                'min:2',
                'max:80',
                'regex:/^[a-z0-9][a-z0-9\-]*[a-z0-9]$/',
                Rule::unique('channels', 'name')
                    ->where('community_id', $communityId)
                    ->ignore($channelId),
            ],
            'topic'    => ['sometimes', 'nullable', 'string', 'max:250'],
            'type'     => ['sometimes', Rule::in([Channel::TYPE_TEXT, Channel::TYPE_ANNOUNCEMENT])],
            'position' => ['sometimes', 'integer', 'min:0', 'max:999'],
        ];
    }
}
