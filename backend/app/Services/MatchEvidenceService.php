<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\MatchEvidence;
use App\Models\TournamentMatch;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * MatchEvidenceService — upload, list, and delete match evidence files.
 *
 * Authorization is enforced at the service layer as defence-in-depth, in
 * addition to the controller's checks.
 *
 * Gating rules (per the product spec):
 *   • Upload requires the match to have scheduled_at set (i.e. match is
 *     "any time after the match is scheduled" per the Sprint 2 decision).
 *   • Uploader must be a participant, the organizer, or an admin.
 *   • Delete is allowed to the uploader, the organizer, or an admin.
 *   • A single user may not upload more than MAX_PER_USER_PER_MATCH files
 *     on one match (anti-DoS).
 */
class MatchEvidenceService
{
    /**
     * Accept a file upload and persist it to the `public` disk, then create
     * the DB record. If the DB insert fails the file is cleaned up.
     *
     * @throws RuntimeException On any authorization or gating failure.
     */
    public function upload(
        TournamentMatch $match,
        User $user,
        UploadedFile $file,
        ?string $caption = null,
    ): MatchEvidence {
        $this->assertCanUpload($match, $user);

        $fileType = $this->classify($file);
        $ext      = $file->getClientOriginalExtension() ?: $file->extension();
        $filename = Str::uuid()->toString() . '.' . $ext;
        $dir      = "match-evidence/{$match->id}";
        $path     = $file->storeAs($dir, $filename, 'public');

        if ($path === false) {
            throw new RuntimeException('File upload failed.');
        }

        try {
            return DB::transaction(function () use ($match, $user, $file, $fileType, $path, $caption) {
                return MatchEvidence::create([
                    'match_id'       => $match->id,
                    'uploaded_by_id' => $user->id,
                    'file_path'      => $path,
                    'file_type'      => $fileType,
                    'file_mime'      => $file->getClientMimeType(),
                    'file_size'      => $file->getSize() ?: null,
                    'caption'        => $caption,
                ]);
            });
        } catch (\Throwable $e) {
            // Clean up the orphaned file if the DB insert failed.
            Storage::disk('public')->delete($path);
            throw $e;
        }
    }

    /**
     * Delete an evidence record and its underlying file.
     *
     * @throws RuntimeException If the user is not authorized to delete.
     */
    public function delete(MatchEvidence $evidence, User $user): void
    {
        $isOwner     = $evidence->uploaded_by_id === $user->id;
        $isOrganizer = in_array($user->role ?? '', ['organizer', 'admin'], true);

        if (! $isOwner && ! $isOrganizer) {
            throw new RuntimeException('You are not authorized to delete this evidence.');
        }

        DB::transaction(function () use ($evidence): void {
            // Capture path before delete to clean up the file afterwards.
            $path = $evidence->file_path;
            $evidence->delete();
            Storage::disk('public')->delete($path);
        });
    }

    // ── Internals ────────────────────────────────────────────────────────

    /**
     * Assert that the given user can upload evidence to this match.
     */
    private function assertCanUpload(TournamentMatch $match, User $user): void
    {
        // Rule 1: match must be scheduled.
        if ($match->scheduled_at === null) {
            throw new RuntimeException('Evidence can only be uploaded after the match is scheduled.');
        }

        // Rule 2: match cannot be fully completed (once result is confirmed,
        // further uploads are confusing and serve no purpose).
        if (in_array($match->status, ['completed', 'walkover'], true)) {
            throw new RuntimeException('Evidence cannot be uploaded to a completed match.');
        }

        // Rule 3: user must be a participant OR an organizer/admin.
        $isParticipant = $match->isParticipantUser($user->id);
        $isOrganizer   = in_array($user->role ?? '', ['organizer', 'admin'], true);

        if (! $isParticipant && ! $isOrganizer) {
            throw new RuntimeException('Only participants or organizers can upload evidence.');
        }

        // Rule 4: per-user per-match cap.
        $count = MatchEvidence::where('match_id', $match->id)
            ->where('uploaded_by_id', $user->id)
            ->count();

        if ($count >= MatchEvidence::MAX_PER_USER_PER_MATCH) {
            throw new RuntimeException(sprintf(
                'Upload limit reached (%d files per match). Delete an existing one first.',
                MatchEvidence::MAX_PER_USER_PER_MATCH,
            ));
        }
    }

    /**
     * Determine whether the file is an image or a video from its MIME.
     */
    private function classify(UploadedFile $file): string
    {
        $mime = $file->getClientMimeType();

        return match (true) {
            str_starts_with($mime, 'image/') => MatchEvidence::TYPE_IMAGE,
            str_starts_with($mime, 'video/') => MatchEvidence::TYPE_VIDEO,
            default                          => throw new RuntimeException("Unsupported file type: {$mime}"),
        };
    }
}
