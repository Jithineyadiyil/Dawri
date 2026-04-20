<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Tournament;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * CoverImageService — upload/replace/remove tournament cover images.
 *
 * Storage: storage/app/public/tournament-covers/{tournamentId}/{uuid}.{ext}
 * URL:     /storage/tournament-covers/{tournamentId}/{uuid}.{ext}
 *          (requires php artisan storage:link)
 */
class CoverImageService
{
    public const MAX_BYTES = 5 * 1024 * 1024; // 5MB

    /**
     * Store a new cover image, replacing any previous one.
     */
    public function upload(Tournament $tournament, UploadedFile $file): Tournament
    {
        $mime = $file->getClientMimeType();
        if (! str_starts_with($mime, 'image/')) {
            throw new RuntimeException("Cover must be an image; got {$mime}.");
        }
        if ($file->getSize() > self::MAX_BYTES) {
            throw new RuntimeException('Cover image must be ≤ 5MB.');
        }

        // Remove any previous cover for this tournament.
        $this->removeFile($tournament);

        $ext      = $file->getClientOriginalExtension() ?: $file->extension();
        $filename = Str::uuid()->toString() . '.' . $ext;
        $path     = $file->storeAs("tournament-covers/{$tournament->id}", $filename, 'public');

        if ($path === false) {
            throw new RuntimeException('Failed to store cover image.');
        }

        $tournament->update(['cover_image_path' => $path]);
        return $tournament->refresh();
    }

    /** Delete the current cover and null the column. */
    public function remove(Tournament $tournament): Tournament
    {
        $this->removeFile($tournament);
        $tournament->update(['cover_image_path' => null]);
        return $tournament->refresh();
    }

    private function removeFile(Tournament $tournament): void
    {
        if ($tournament->cover_image_path) {
            Storage::disk('public')->delete($tournament->cover_image_path);
        }
    }
}
