<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InviteResource;
use App\Http\Resources\JoinRequestResource;
use App\Mail\CommunityInvite as CommunityInviteMail;
use App\Models\Community;
use App\Models\CommunityInvite;
use App\Models\CommunityJoinRequest;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Services\JoinService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 5 — join flow endpoints.
 */
final class JoinController extends Controller
{
    public function __construct(
        private readonly JoinService $join,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    // ── Join policy ──────────────────────────────────────────────────────────

    /** PATCH /communities/{community}/join-policy  Body: { join_policy } */
    public function setPolicy(Request $request, Community $community): JsonResponse
    {
        $request->validate(['join_policy' => ['required', 'in:open,request,closed']]);

        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Only community moderators can do that.'], Response::HTTP_FORBIDDEN);
        }

        $community->update(['join_policy' => $request->string('join_policy')->toString()]);

        return response()->json(['data' => ['join_policy' => $community->join_policy]]);
    }

    // ── Invites ────────────────────────────────────────────────────────────────

    /** GET /communities/{community}/invites */
    public function invites(Request $request, Community $community): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $invites = CommunityInvite::where('community_id', $community->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['data' => InviteResource::collection($invites)]);
    }

    /** POST /communities/{community}/invites  Body: { max_uses?, expires_at?, email? } */
    public function createInvite(Request $request, Community $community): JsonResponse
    {
        $request->validate([
            'max_uses'   => ['nullable', 'integer', 'min:1', 'max:100000'],
            'expires_at' => ['nullable', 'date', 'after:now'],
            'email'      => ['nullable', 'email'],   // optional: email the link directly
        ]);

        try {
            $invite = $this->join->createInvite(
                $community,
                $request->user(),
                $request->input('max_uses'),
                $request->input('expires_at'),
            );
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        // If a recipient email was provided, send the invite by email
        if ($recipientEmail = $request->input('email')) {
            try {
                $inviteUrl = config('app.url') . '/community/join/' . $invite->token;
                Mail::to($recipientEmail)->queue(new CommunityInviteMail(
                    communityName: $community->name,
                    inviterName:   $request->user()->name,
                    inviteUrl:     $inviteUrl,
                    expiresAt:     $invite->expires_at?->format('d M Y'),
                ));
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning('CommunityInvite email failed: ' . $e->getMessage());
            }
        }

        return response()->json(['data' => new InviteResource($invite)], Response::HTTP_CREATED);
    }

    /** DELETE /invites/{invite} */
    public function revokeInvite(Request $request, CommunityInvite $invite): JsonResponse
    {
        try {
            $this->join->revokeInvite($invite, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Invite revoked.']);
    }

    /** POST /invites/{token}/redeem  (token in the path, not a UUID) */
    public function redeem(Request $request, string $token): JsonResponse
    {
        try {
            $outcome = $this->join->redeemInvite($token, $request->user());
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'data' => [
                'result'        => $outcome['result'],
                'community_id'   => $outcome['community']->id,
                'community_slug' => $outcome['community']->slug,
            ],
        ]);
    }

    // ── Requests ─────────────────────────────────────────────────────────────

    /** POST /communities/{community}/join  Body: { message? } */
    public function requestJoin(Request $request, Community $community): JsonResponse
    {
        $request->validate(['message' => ['nullable', 'string', 'max:1000']]);

        try {
            $outcome = $this->join->requestJoin($community, $request->user(), $request->input('message'));
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(['data' => ['result' => $outcome['result']]]);
    }

    /** GET /communities/{community}/join-requests  (pending, moderator+) */
    public function pendingRequests(Request $request, Community $community): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $requests = CommunityJoinRequest::where('community_id', $community->id)
            ->where('status', CommunityJoinRequest::PENDING)
            ->with('user:id,name,nickname,avatar')
            ->orderBy('created_at')
            ->get();

        return response()->json(['data' => JoinRequestResource::collection($requests)]);
    }

    /** POST /join-requests/{joinRequest}/approve */
    public function approve(Request $request, CommunityJoinRequest $joinRequest): JsonResponse
    {
        try {
            $this->join->approveRequest($joinRequest, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Request approved.']);
    }

    /** POST /join-requests/{joinRequest}/deny */
    public function deny(Request $request, CommunityJoinRequest $joinRequest): JsonResponse
    {
        try {
            $this->join->denyRequest($joinRequest, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Request denied.']);
    }

    // ── Helper ───────────────────────────────────────────────────────────────

    private function canManage(string $communityId, $user): bool
    {
        if ($user->role === 'admin') {
            return true;
        }
        $member = $this->members->find($communityId, $user->id);

        return $member !== null && $member->canModerate();
    }
}
