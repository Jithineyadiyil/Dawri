<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Community;
use App\Models\CommunityInvite;
use App\Models\CommunityJoinRequest;
use App\Models\CommunityMember;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Phase 5 — join flow: invite links + request-to-join.
 *
 * Enrollment reuses CommunityMemberRepository::attach. Managing invites and
 * deciding requests requires a moderator+ of the community.
 *
 * Result of an invite redemption / request is one of:
 *   'joined'   — the user is now a member
 *   'requested'— a pending join request was created (awaiting approval)
 *   'member'   — the user was already a member
 */
final class JoinService
{
    public function __construct(
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    // ── Invites (moderator+) ─────────────────────────────────────────────────

    /**
     * @throws AuthorizationException
     */
    public function createInvite(
        Community $community,
        User $actor,
        ?int $maxUses = null,
        ?string $expiresAt = null,
    ): CommunityInvite {
        $this->assertCanManage($community->id, $actor);

        return CommunityInvite::create([
            'community_id' => $community->id,
            'created_by'   => $actor->id,
            'token'        => $this->uniqueToken(),
            'max_uses'     => $maxUses,
            'expires_at'   => $expiresAt,
        ]);
    }

    /** @throws AuthorizationException */
    public function revokeInvite(CommunityInvite $invite, User $actor): void
    {
        $this->assertCanManage($invite->community_id, $actor);
        $invite->update(['is_revoked' => true]);
    }

    /**
     * Redeem an invite token. Joins instantly when the community is `open`,
     * otherwise creates a pending request (when `request`). `closed`
     * communities still honour a valid invite as an instant join (the invite
     * itself is the authorisation).
     *
     * @return array{result:string, community: Community}
     *
     * @throws RuntimeException
     */
    public function redeemInvite(string $token, User $user): array
    {
        $invite = CommunityInvite::where('token', $token)->first();
        if ($invite === null || ! $invite->isUsable()) {
            throw new RuntimeException('This invite link is invalid or has expired.');
        }

        $community = $invite->community;

        if ($this->isMember($community->id, $user->id)) {
            return ['result' => 'member', 'community' => $community];
        }

        // `request` policy: an invite still routes through approval.
        if ($community->join_policy === 'request') {
            $this->createRequest($community, $user, null);

            return ['result' => 'requested', 'community' => $community];
        }

        // open OR closed-with-valid-invite → instant join, count the use.
        DB::transaction(function () use ($invite, $community, $user): void {
            $this->members->attach($community->id, $user->id, CommunityMember::ROLE_MEMBER);
            $invite->increment('uses');
        });

        return ['result' => 'joined', 'community' => $community];
    }

    // ── Request-to-join (any authenticated user) ─────────────────────────────

    /**
     * Request to join a community. Instant when policy is `open`; creates a
     * pending request when `request`; rejected when `closed`.
     *
     * @return array{result:string, community: Community}
     *
     * @throws RuntimeException
     */
    public function requestJoin(Community $community, User $user, ?string $message): array
    {
        if ($this->isMember($community->id, $user->id)) {
            return ['result' => 'member', 'community' => $community];
        }

        if ($community->join_policy === 'open') {
            $this->members->attach($community->id, $user->id, CommunityMember::ROLE_MEMBER);

            return ['result' => 'joined', 'community' => $community];
        }

        if ($community->join_policy === 'closed') {
            throw new RuntimeException('This community is invite-only.');
        }

        // request policy
        $this->createRequest($community, $user, $message);

        return ['result' => 'requested', 'community' => $community];
    }

    /** @throws AuthorizationException */
    public function approveRequest(CommunityJoinRequest $request, User $actor): void
    {
        $this->assertCanManage($request->community_id, $actor);

        DB::transaction(function () use ($request, $actor): void {
            $this->members->attach($request->community_id, $request->user_id, CommunityMember::ROLE_MEMBER);
            $request->update([
                'status'     => CommunityJoinRequest::APPROVED,
                'decided_by' => $actor->id,
                'decided_at' => now(),
            ]);
        });
    }

    /** @throws AuthorizationException */
    public function denyRequest(CommunityJoinRequest $request, User $actor): void
    {
        $this->assertCanManage($request->community_id, $actor);
        $request->update([
            'status'     => CommunityJoinRequest::DENIED,
            'decided_by' => $actor->id,
            'decided_at' => now(),
        ]);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private function createRequest(Community $community, User $user, ?string $message): CommunityJoinRequest
    {
        // Re-requesting resets a prior denied/pending row to pending.
        return CommunityJoinRequest::updateOrCreate(
            ['community_id' => $community->id, 'user_id' => $user->id],
            [
                'status'     => CommunityJoinRequest::PENDING,
                'message'    => $message !== null ? trim($message) : null,
                'decided_by' => null,
                'decided_at' => null,
            ],
        );
    }

    private function isMember(string $communityId, string $userId): bool
    {
        return $this->members->find($communityId, $userId) !== null;
    }

    private function uniqueToken(): string
    {
        do {
            $token = Str::lower(Str::random(12));
        } while (CommunityInvite::where('token', $token)->exists());

        return $token;
    }

    /** @throws AuthorizationException */
    private function assertCanManage(string $communityId, User $actor): void
    {
        if ($actor->role === 'admin') {
            return;
        }

        $member = $this->members->find($communityId, $actor->id);
        if ($member === null || ! $member->canModerate()) {
            throw new AuthorizationException('Only community moderators can do that.');
        }
    }
}
