<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityMemberResource;
use App\Http\Resources\CommunityResource;
use App\Models\Community;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\CommunityRepositoryInterface;
use App\Services\PresenceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sprint 15 — community read endpoints.
 *
 * Members-only views; non-members get 404 so we don't leak the existence
 * of private tournament communities.
 */
final class CommunityController extends Controller
{
    public function __construct(
        private readonly CommunityRepositoryInterface $communities,
        private readonly CommunityMemberRepositoryInterface $members,
        private readonly PresenceService $presence,
    ) {
    }

    /**
     * GET /api/v1/communities
     * Communities the current user has access to.
     */
    public function index(Request $request): JsonResponse
    {
        $communities = $this->communities->listForUser($request->user()->id);

        return response()->json([
            'data' => CommunityResource::collection($communities),
        ]);
    }

    /**
     * GET /api/v1/communities/{slug}
     */
    public function show(Request $request, string $slug): JsonResponse
    {
        $community = $this->communities->findBySlug($slug);

        if ($community === null || ! $this->members->isMember($community->id, $request->user()->id)) {
            return response()->json(['message' => 'Community not found.'], Response::HTTP_NOT_FOUND);
        }

        $community->load(['channels' => fn ($q) => $q->where('is_archived', false)->orderBy('position')]);
        $community->loadCount('memberships');

        return response()->json(['data' => new CommunityResource($community)]);
    }

    /**
     * GET /api/v1/communities/{community}/members
     */
    public function members(Request $request, Community $community): JsonResponse
    {
        if (! $this->members->isMember($community->id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        $search = $request->query('search');
        $list = $this->members->listMembers($community->id, is_string($search) ? $search : null);
        $presence = $this->presence->snapshot($list->pluck('user_id')->all());

        return response()->json([
            'data'     => CommunityMemberResource::collection($list),
            'presence' => $presence,
        ]);
    }

    /**
     * POST /api/v1/communities/{community}/leave
     */
    public function leave(Request $request, Community $community): JsonResponse
    {
        // Cannot leave global; you can only get muted/banned out.
        if ($community->isGlobal()) {
            return response()->json([
                'message' => 'You cannot leave the global Dawri Community.',
            ], Response::HTTP_FORBIDDEN);
        }

        $member = $this->members->find($community->id, $request->user()->id);
        if ($member === null) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_NOT_FOUND);
        }

        $this->members->detach($community->id, $request->user()->id);

        return response()->json(['message' => 'Left the community.']);
    }
}
