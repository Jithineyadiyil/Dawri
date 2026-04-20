<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * POST /tournaments/{id}/cover
 * Multipart: file (image, ≤5MB)
 */
class UploadCoverRequest extends FormRequest
{
    public function authorize(): bool { return $this->user() !== null; }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];
    }
}
