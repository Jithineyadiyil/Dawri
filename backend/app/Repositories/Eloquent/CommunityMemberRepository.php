<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\CommunityMember;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class CommunityMemberRepository implements CommunityMemberRepositoryInterface
{
    public function __construct(private readonly CommunityMember $model)
    {
    }

    public function find(string $communityId, string $userId): ?CommunityMember
    {
        return $this->model
            ->where('community_id', $communityId)
            ->where('user_id', $userId)
            ->first();
    }

    public function attach(string $communityId, string $userId, string $role = CommunityMember::ROLE_MEMBER): CommunityMember
    {
        return $this->model->updateOrCreate(
            ['community_id' => $communityId, 'user_id' => $userId],
            ['role' => $role, 'joined_at' => now(), 'banned_at' => null, 'banned_by' => null, 'ban_reason' => null]
        );
    }

    public function detach(string $communityId, string $userId): bool
    {
        return (bool) $this->model
            ->where('community_id', $communityId)
            ->where('user_id', $userId)
            ->delete();
    }

    public function listMembers(string $communityId, ?string $search = null, int $limit = 100): Collection
    {
        return $this->model
            ->where('community_id', $communityId)
            ->whereNull('banned_at')
            ->with('user:id,nickname,avatar,role')
            ->when($search, fn ($q, $s) => $q->whereHas('user', fn ($u) => $u
                ->where('nickname', 'like', "%{$s}%")))
            ->orderByRaw("FIELD(role, 'owner', 'admin', 'moderator', 'member')")
            ->limit($limit)
            ->get();
    }

    public function setRole(CommunityMember $member, string $role): CommunityMember
    {
        $member->role = $role;
        $member->save();
        return $member->fresh();
    }

    public function mute(CommunityMember $member, \DateTimeInterface $until): CommunityMember
    {
        $member->muted_until = $until;
        $member->save();
        return $member->fresh();
    }

    public function ban(CommunityMember $member, string $reason, string $bannedByUserId): CommunityMember
    {
        $member->banned_at = now();
        $member->ban_reason = $reason;
        $member->banned_by = $bannedByUserId;
        $member->save();
        return $member->fresh();
    }

    public function unban(CommunityMember $member): CommunityMember
    {
        $member->banned_at = null;
        $member->ban_reason = null;
        $member->banned_by = null;
        $member->save();
        return $member->fresh();
    }

    public function isMember(string $communityId, string $userId): bool
    {
        return $this->model
            ->where('community_id', $communityId)
            ->where('user_id', $userId)
            ->whereNull('banned_at')
            ->exists();
    }
}
