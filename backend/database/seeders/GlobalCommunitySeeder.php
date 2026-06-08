<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use App\Services\CommunityService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Sprint 15 — Provisions the single platform-wide Dawri Community,
 * its 7 default channels, and back-fills every existing user as a member.
 *
 * Idempotent — safe to run multiple times.
 */
final class GlobalCommunitySeeder extends Seeder
{
    public function __construct(private readonly CommunityService $communityService)
    {
    }

    public function run(): void
    {
        $community = $this->communityService->ensureGlobalCommunity();
        $this->command?->info("Global community: {$community->name} ({$community->slug})");

        $existingMemberIds = DB::table('community_members')
            ->where('community_id', $community->id)
            ->pluck('user_id')
            ->all();

        $userIdsToAdd = User::query()
            ->whereNotIn('id', $existingMemberIds)
            ->pluck('id');

        $added = 0;
        foreach ($userIdsToAdd as $userId) {
            $role = $this->roleForUser($userId);
            DB::table('community_members')->insert([
                'community_id' => $community->id,
                'user_id'      => $userId,
                'role'         => $role,
                'joined_at'    => now(),
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
            $added++;
        }

        $this->command?->info("Back-filled {$added} users as community members.");
    }

    private function roleForUser(string $userId): string
    {
        $user = User::find($userId);
        if ($user === null) {
            return CommunityMember::ROLE_MEMBER;
        }
        if ($user->role === 'admin') {
            return CommunityMember::ROLE_ADMIN;
        }
        return CommunityMember::ROLE_MEMBER;
    }
}
