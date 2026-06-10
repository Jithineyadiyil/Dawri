<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePollRequest;
use App\Http\Resources\PollResource;
use App\Models\Channel;
use App\Models\Poll;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\PollRepositoryInterface;
use App\Services\PollService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 2 — community polls.
 */
final class PollController extends Controller
{
    public function __construct(
        private readonly PollService $polls,
        private readonly PollRepositoryInterface $repo,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /** GET /channels/{channel}/polls */
    public function index(Request $request, Channel $channel): JsonResponse
    {
        if (! $this->members->isMember($channel->community_id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'data' => PollResource::collection($this->repo->listForChannel($channel->id)),
        ]);
    }

    /** POST /channels/{channel}/polls */
    public function store(CreatePollRequest $request, Channel $channel): JsonResponse
    {
        try {
            $poll = $this->polls->create(
                $channel,
                $request->user(),
                $request->string('question')->toString(),
                $request->input('options', []),
                (bool) $request->boolean('is_multiple'),
                $request->input('closes_at'),
            );
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $full = $this->repo->findWithResults($poll->id);

        return response()->json(['data' => new PollResource($full)], Response::HTTP_CREATED);
    }

    /** POST /polls/{poll}/vote  Body: { option_id } */
    public function vote(Request $request, Poll $poll): JsonResponse
    {
        $request->validate(['option_id' => ['required', 'uuid']]);

        try {
            $updated = $this->polls->vote($poll, $request->user(), $request->string('option_id')->toString());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(['data' => new PollResource($updated)]);
    }

    /** POST /polls/{poll}/close */
    public function close(Request $request, Poll $poll): JsonResponse
    {
        try {
            $this->polls->close($poll, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new PollResource($this->repo->findWithResults($poll->id))]);
    }

    /** DELETE /polls/{poll} */
    public function destroy(Request $request, Poll $poll): JsonResponse
    {
        try {
            $this->polls->delete($poll, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Poll deleted.']);
    }
}
