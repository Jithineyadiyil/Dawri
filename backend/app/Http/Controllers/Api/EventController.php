<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Community;
use App\Models\CommunityEvent;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Services\EventService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 4 — community events + RSVPs.
 */
final class EventController extends Controller
{
    public function __construct(
        private readonly EventService $events,
        private readonly EventRepositoryInterface $repo,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /** GET /communities/{community}/events?past=1 */
    public function index(Request $request, Community $community): JsonResponse
    {
        if (! $this->members->isMember($community->id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        $includePast = $request->boolean('past');

        return response()->json([
            'data' => EventResource::collection(
                $this->repo->listForCommunity($community->id, $includePast)
            ),
        ]);
    }

    /** POST /communities/{community}/events */
    public function store(StoreEventRequest $request, Community $community): JsonResponse
    {
        try {
            $event = $this->events->create($community, $request->user(), $request->validated());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new EventResource($event)], Response::HTTP_CREATED);
    }

    /** PATCH /events/{event} */
    public function update(StoreEventRequest $request, CommunityEvent $event): JsonResponse
    {
        try {
            $updated = $this->events->update($event, $request->user(), $request->validated());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new EventResource($updated)]);
    }

    /** POST /events/{event}/cancel */
    public function cancel(Request $request, CommunityEvent $event): JsonResponse
    {
        try {
            $updated = $this->events->cancel($event, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new EventResource($updated)]);
    }

    /** DELETE /events/{event} */
    public function destroy(Request $request, CommunityEvent $event): JsonResponse
    {
        try {
            $this->events->delete($event, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Event deleted.']);
    }

    /** POST /events/{event}/rsvp  Body: { status: going|maybe|declined } */
    public function rsvp(Request $request, CommunityEvent $event): JsonResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:going,maybe,declined'],
        ]);

        try {
            $updated = $this->events->rsvp($event, $request->user(), $request->string('status')->toString());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(['data' => new EventResource($updated)]);
    }
}
