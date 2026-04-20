<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * MatchEvidence — an evidence file (screenshot or video clip) uploaded by
 * a participant, organizer, or admin to support/refute a match result.
 *
 * File storage:
 *   All files live on the `public` disk, under:
 *     storage/app/public/match-evidence/{matchId}/{filename}.{ext}
 *   Accessible via URL:
 *     /storage/match-evidence/{matchId}/{filename}.{ext}
 *   (requires `php artisan storage:link` to have been run once.)
 *
 * @property string      $id
 * @property string      $match_id
 * @property string      $uploaded_by_id
 * @property string      $file_path
 * @property string      $file_type    image | video
 * @property string      $file_mime
 * @property int|null    $file_size
 * @property string|null $caption
 * @property-read string $url          Public URL to the file (computed).
 */
class MatchEvidence extends Model
{
    use HasUuids;

    protected $table = 'match_evidence';

    public const TYPE_IMAGE = 'image';
    public const TYPE_VIDEO = 'video';

    /** Maximum file sizes in bytes — also enforced by UploadEvidenceRequest. */
    public const MAX_IMAGE_BYTES = 5  * 1024 * 1024;   // 5 MB
    public const MAX_VIDEO_BYTES = 50 * 1024 * 1024;   // 50 MB

    /** Per-(user, match) cap on number of files — prevents DoS via upload. */
    public const MAX_PER_USER_PER_MATCH = 10;

    protected $fillable = [
        'match_id', 'uploaded_by_id',
        'file_path', 'file_type', 'file_mime', 'file_size',
        'caption',
    ];

    protected $casts = [
        'file_size' => 'integer',
    ];

    protected $appends = ['url'];

    // ── Relations ────────────────────────────────────────────────────────

    public function match(): BelongsTo
    {
        return $this->belongsTo(TournamentMatch::class, 'match_id');
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_id');
    }

    // ── Accessors ────────────────────────────────────────────────────────

    /**
     * Publicly-accessible URL for the stored file.
     *
     * Uses Laravel's Storage facade which returns a URL like
     * /storage/match-evidence/{matchId}/{filename}.ext when the `public`
     * disk is symlinked (required once via `php artisan storage:link`).
     */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn (): string => Storage::disk('public')->url($this->file_path),
        );
    }
}
