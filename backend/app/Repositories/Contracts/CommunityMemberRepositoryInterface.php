<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\CommunityMember;
use Illuminate\Database\Eloquent\Collection;

interface CommunityMemberRepositoryInterface
{
    public function find(string $communityId, string $userId): ?CommunityMember;

    public function attach(string $communityId, string $userId, string $role = CommunityMember::ROLE_MEMBER): CommunityMember;

    public function detach(string $communityId, string $userId): bool;

    /** @return Collection<int, CommunityMember> */
    public function listMembers(string $communityId, ?string $search = null, int $limit = 100): Collection;

    public function setRole(CommunityMember $member, string $role): CommunityMember;

    public function mute(CommunityMember $member, \DateTimeInterface $until): CommunityMember;

    public function ban(CommunityMember $member, string $reason, string $bannedByUserId): CommunityMember;

    public function unban(CommunityMember $member): CommunityMember;

    public function isMember(string $communityId, string $userId): bool;
}
