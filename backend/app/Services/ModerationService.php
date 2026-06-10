<?php

declare(strict_types=1);

namespace App\Services;

use App\Events\UserMutedInCommunity;
use App\Events\UserBannedFromCommunity;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

/**
 * Mute / ban / unban + role changes. Rules:
 *  - Owner is untouchable (cannot be muted/banned/demoted by anyone but admin)
 *  - Admins can mute/ban anyone except the owner
 *  - Moderators can mute/ban members only (not other moderators/admins)
 *  - A moderator cannot ban themselves
 */
final class ModerationService
{
    /** Allowed mute durations (minutes). 0 = until manually unmuted. */
    public const MUTE_DURATIONS = [5, 30, 60, 240, 1440, 10080];

    public function __construct(
        private readonly CommunityMemberRepositoryInterface $members,
        private readonly AuditService $audit,
    ) {
    }

    /**
     * @throws AuthorizationException
     */
    public function mute(Community $community, User $actor, User $target, int $minutes, ?string $reason = null): CommunityMember
    {
        $this->assertCanModerate($community, $actor, $target);

        if (! in_array($minutes, self::MUTE_DURATIONS, true)) {
            throw new \InvalidArgumentException('Invalid mute duration.');
        }

        $member = $this->members->find($community->id, $target->id);
        if ($member === null) {
            throw new AuthorizationException('Target is not a member of this community.');
        }

        $until = now()->addMinutes($minutes);
        $updated = $this->members->mute($member, $until);

        $this->audit->record($community->id, $actor->id, 'mute', $target->id, [
            'minutes' => $minutes,
            'reason'  => $reason,
        ]);

        DB::afterCommit(fn () => broadcast(new UserMutedInCommunity(
            communityId: $community->id,
            userId: $target->id,
            mutedUntil: $until->toIso8601String(),
            reason: $reason,
        )));

        return $updated;
    }

    /**
     * @throws AuthorizationException
     */
    public function unmute(Community $community, User $actor, User $target): CommunityMember
    {
        $this->assertCanModerate($community, $actor, $target);

        $member = $this->members->find($community->id, $target->id);
        if ($member === null) {
            throw new AuthorizationException('Target is not a member of this community.');
        }

        $this->audit->record($community->id, $actor->id, 'unmute', $target->id);

        return $this->members->mute($member, now()->subSecond());
    }

    /**
     * @throws AuthorizationException
     */
    public function ban(Community $community, User $actor, User $target, string $reason): CommunityMember
    {
        $this->assertCanModerate($community, $actor, $target);

        if ($community->isGlobal() && $target->id === $actor->id) {
            throw new AuthorizationException('You cannot ban yourself.');
        }

        $member = $this->members->find($community->id, $target->id);
        if ($member === null) {
            throw new AuthorizationException('Target is not a member of this community.');
        }

        $updated = $this->members->ban($member, $reason, $actor->id);

        $this->audit->record($community->id, $actor->id, 'ban', $target->id, [
            'reason' => $reason,
        ]);

        DB::afterCommit(fn () => broadcast(new UserBannedFromCommunity(
            communityId: $community->id,
            userId: $target->id,
            reason: $reason,
        )));

        return $updated;
    }

    /**
     * @throws AuthorizationException
     */
    public function unban(Community $community, User $actor, User $target): CommunityMember
    {
        $this->assertCanModerate($community, $actor, $target);

        $member = $this->members->find($community->id, $target->id);
        if ($member === null) {
            throw new AuthorizationException('Target is not a member of this community.');
        }

        $this->audit->record($community->id, $actor->id, 'unban', $target->id);

        return $this->members->unban($member);
    }

    /**
     * @throws AuthorizationException
     */
    private function assertCanModerate(Community $community, User $actor, User $target): void
    {
        // Platform admins bypass — matches EnsureAdmin middleware convention.
        if ($actor->role === 'admin') {
            return;
        }

        $actorMember  = $this->members->find($community->id, $actor->id);
        $targetMember = $this->members->find($community->id, $target->id);

        if ($actorMember === null || ! $actorMember->canModerate()) {
            throw new AuthorizationException('You do not have moderation permission in this community.');
        }

        if ($targetMember?->role === CommunityMember::ROLE_OWNER) {
            throw new AuthorizationException('The community owner cannot be moderated.');
        }

        // Moderators cannot act on other moderators/admins
        if ($actorMember->role === CommunityMember::ROLE_MODERATOR
            && $targetMember !== null
            && in_array($targetMember->role, [CommunityMember::ROLE_MODERATOR, CommunityMember::ROLE_ADMIN], true)) {
            throw new AuthorizationException('Moderators can only act on regular members.');
        }
    }
}
