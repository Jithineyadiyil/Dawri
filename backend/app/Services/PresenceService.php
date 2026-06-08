<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\UserPresence;
use Illuminate\Support\Carbon;

/**
 * User presence tracking. Updated on every authenticated WebSocket
 * subscribe + on every authenticated API request via middleware.
 *
 * Sweep is run by `php artisan community:sweep-presence` — idle-after
 * 5 minutes, offline-after 30. Defaults match Discord's behaviour.
 */
final class PresenceService
{
    public function heartbeat(User $user): UserPresence
    {
        return UserPresence::updateOrCreate(
            ['user_id' => $user->id],
            [
                'status'       => UserPresence::STATUS_ONLINE,
                'last_seen_at' => now(),
            ]
        );
    }

    public function markOffline(User $user): void
    {
        UserPresence::where('user_id', $user->id)
            ->update(['status' => UserPresence::STATUS_OFFLINE]);
    }

    /**
     * Sweep stale online → idle and stale idle → offline.
     * Run from `community:sweep-presence` artisan command on a 1-minute schedule.
     *
     * @return array{idled: int, offlined: int}
     */
    public function sweep(): array
    {
        $idleCutoff    = now()->subMinutes(UserPresence::IDLE_AFTER_MINUTES);
        $offlineCutoff = now()->subMinutes(UserPresence::OFFLINE_AFTER_MINUTES);

        $idled = UserPresence::where('status', UserPresence::STATUS_ONLINE)
            ->where('last_seen_at', '<', $idleCutoff)
            ->update(['status' => UserPresence::STATUS_IDLE]);

        $offlined = UserPresence::whereIn('status', [UserPresence::STATUS_ONLINE, UserPresence::STATUS_IDLE])
            ->where('last_seen_at', '<', $offlineCutoff)
            ->update(['status' => UserPresence::STATUS_OFFLINE]);

        return ['idled' => $idled, 'offlined' => $offlined];
    }

    /**
     * @param  array<int, string>  $userIds
     * @return array<string, array{status: string, last_seen_at: string}>
     */
    public function snapshot(array $userIds): array
    {
        if ($userIds === []) {
            return [];
        }

        return UserPresence::whereIn('user_id', $userIds)
            ->get()
            ->mapWithKeys(fn (UserPresence $p) => [$p->user_id => [
                'status'       => $p->status,
                'last_seen_at' => $p->last_seen_at->toIso8601String(),
            ]])
            ->all();
    }
}
