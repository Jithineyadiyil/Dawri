<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\MatchEvidence;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

/**
 * POST /api/v1/matches/{match}/evidence
 *
 * Multipart form:
 *   file    : image (jpg|jpeg|png|webp, ≤5MB) OR video (mp4|webm, ≤50MB)
 *   caption : optional plain text up to 255 chars
 */
class UploadEvidenceRequest extends FormRequest
{
    private const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp'];
    private const VIDEO_EXTS = ['mp4', 'webm'];

    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Laravel's default `max:` validator only accepts an integer (KB),
     * which can't differentiate between images (5MB max) and videos (50MB max).
     * We therefore validate the envelope (type + ext) with built-in rules
     * and enforce size in the after-hook below.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'mimes:' . implode(',', array_merge(self::IMAGE_EXTS, self::VIDEO_EXTS)),
            ],
            'caption' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Enforce per-type size limits. Invoked automatically after `rules()`.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v): void {
            $file = $this->file('file');
            if ($file === null) {
                return;
            }

            $ext  = strtolower($file->getClientOriginalExtension());
            $size = (int) $file->getSize();

            if (in_array($ext, self::IMAGE_EXTS, true) && $size > MatchEvidence::MAX_IMAGE_BYTES) {
                $v->errors()->add('file', sprintf(
                    'Image must be ≤ %dMB.',
                    MatchEvidence::MAX_IMAGE_BYTES / 1024 / 1024,
                ));
            }

            if (in_array($ext, self::VIDEO_EXTS, true) && $size > MatchEvidence::MAX_VIDEO_BYTES) {
                $v->errors()->add('file', sprintf(
                    'Video must be ≤ %dMB.',
                    MatchEvidence::MAX_VIDEO_BYTES / 1024 / 1024,
                ));
            }
        });
    }
}
