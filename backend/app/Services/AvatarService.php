<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * AvatarService — handles user avatar uploads on the 'public' disk.
 *
 * Storage layout:
 *   storage/app/public/avatars/{user_id}/{uuid}.{ext}
 *
 * On replace, the old avatar file is deleted if it was managed by this service
 * (i.e. stored as a relative path, not an external URL).
 */
class AvatarService
{
    public const MAX_MB = 2;
    public const ALLOWED = ['jpg', 'jpeg', 'png', 'webp'];

    /** @throws RuntimeException */
    public function upload(User $user, UploadedFile $file): User
    {
        if ($file->getSize() > self::MAX_MB * 1024 * 1024) {
            throw new RuntimeException('Avatar must be under ' . self::MAX_MB . 'MB.');
        }

        $ext = strtolower($file->getClientOriginalExtension() ?: $file->extension());
        if (! in_array($ext, self::ALLOWED, true)) {
            throw new RuntimeException('Avatar must be JPG, PNG, or WEBP.');
        }

        // Remove old file if it was a managed path (not an external URL).
        $this->deleteStoredAvatar($user);

        $filename = Str::uuid()->toString() . '.' . $ext;
        $path     = $file->storeAs("avatars/{$user->id}", $filename, 'public');

        $user->avatar = $path;
        $user->save();

        return $user->fresh();
    }

    public function remove(User $user): User
    {
        $this->deleteStoredAvatar($user);
        $user->avatar = null;
        $user->save();
        return $user->fresh();
    }

    private function deleteStoredAvatar(User $user): void
    {
        if (empty($user->avatar)) { return; }
        if (preg_match('#^https?://#i', (string) $user->avatar)) { return; }
        Storage::disk('public')->delete($user->avatar);
    }
}
