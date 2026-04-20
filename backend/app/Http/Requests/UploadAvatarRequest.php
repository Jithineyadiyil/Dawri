<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\AvatarService;
use Illuminate\Foundation\Http\FormRequest;

/**
 * POST /profile/me/avatar
 * Multipart: file (JPG/PNG/WEBP, ≤2MB)
 */
class UploadAvatarRequest extends FormRequest
{
    public function authorize(): bool { return $this->user() !== null; }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'file' => [
                'required', 'file',
                'mimes:' . implode(',', AvatarService::ALLOWED),
                'max:' . (AvatarService::MAX_MB * 1024),
            ],
        ];
    }
}
