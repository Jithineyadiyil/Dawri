<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\LiveBroadcast;
use Illuminate\Foundation\Http\FormRequest;

/**
 * CreateBroadcastRequest — validates POST /matches/{match}/broadcast and
 * POST /tournaments/{tournament}/broadcast payloads.
 */
final class CreateBroadcastRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'title'              => ['required', 'string', 'min:3', 'max:100'],
            'description'        => ['nullable', 'string', 'max:5000'],
            'privacy'            => ['nullable', 'in:public,unlisted,private'],
            'source'             => ['nullable', 'in:obs,browser,rtmp'],
            'scheduled_start_at' => ['nullable', 'date', 'after:now'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required'             => 'Broadcast title is required.',
            'title.max'                  => 'YouTube limits broadcast titles to 100 characters.',
            'description.max'            => 'YouTube limits broadcast descriptions to 5000 characters.',
            'privacy.in'                 => 'Privacy must be one of: public, unlisted, private.',
            'source.in'                  => 'Source must be one of: obs, browser, rtmp.',
            'scheduled_start_at.after'   => 'Scheduled start time must be in the future.',
        ];
    }

    /**
     * Normalised options array consumed by LiveBroadcastService.
     *
     * @return array<string, mixed>
     */
    public function toOptions(): array
    {
        return array_filter([
            'title'              => $this->string('title')->toString(),
            'description'        => $this->input('description'),
            'privacy'            => $this->input('privacy'),
            'source'             => $this->input('source', LiveBroadcast::SOURCE_OBS),
            'scheduled_start_at' => $this->date('scheduled_start_at'),
        ], static fn ($v) => $v !== null);
    }
}
