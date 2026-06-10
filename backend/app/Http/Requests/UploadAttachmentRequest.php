<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\AttachmentService;
use Illuminate\Foundation\Http\FormRequest;

final class UploadAttachmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $maxKb = AttachmentService::MAX_MB * 1024;

        return [
            'images'   => ['required', 'array', 'min:1', 'max:' . AttachmentService::MAX_PER_MSG],
            'images.*' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:' . $maxKb],
            'caption'  => ['nullable', 'string', 'max:4000'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'images.required' => 'Select at least one image.',
            'images.max'      => 'You can attach up to ' . AttachmentService::MAX_PER_MSG . ' images.',
            'images.*.image'  => 'Each file must be an image.',
            'images.*.mimes'  => 'Images must be JPG, PNG, WEBP, or GIF.',
            'images.*.max'    => 'Each image must be under ' . AttachmentService::MAX_MB . 'MB.',
        ];
    }
}
