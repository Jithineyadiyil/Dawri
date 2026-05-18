<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBroadcastRequest;
use App\Http\Resources\LiveBroadcastResource;
use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\Exceptions\StreamingException;
use App\Services\Streaming\LiveBroadcastService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * LiveBroadcastController — REST API for the YouTube Live (Option B) module.
 *
 * Endpoints:
 *   POST   /v1/matches/{match}/broadcast            — create + bind
 *   POST   /v1/tournaments/{tournament}/broadcast   — create (tournament-level)
 *   GET    /v1/broadcasts/{broadcast}                — fetch one
 *   POST   /v1/broadcasts/{broadcast}/go-live        — transition to live
 *   POST   /v1/broadcasts/{broadcast}/complete       — finalise broadcast
 *   DELETE /v1/broadcasts/{broadcast}                — cancel (pre-live only)
 *   GET    /v1/broadcasts/{broadcast}/credentials    — reveal RTMP key (creator only)
 *
 * Authorization:
 *   • Create:  only tournament organizer/moderator (or platform admin)
 *   • Read:    any authenticated user can see public broadcasts
 *   • Mutate:  only the creator (or platform admin)
 *
 * Errors from the YouTube layer are caught and translated to proper HTTP
 * status codes via StreamingException::httpStatus().
 */
final class LiveBroadcastController extends Controller
{
    public function __construct(
        private readonly LiveBroadcastService $service,
        private readonly LiveBroadcastRepositoryInterface $repo,
    ) {}

    /* ───────── Create ──────────────────────────────────────────────── */

    public function createForMatch(CreateBroadcastRequest $request, string $matchId): JsonResponse
    {
        $match = TournamentMatch::with('bracket.tournament')->findOrFail($matchId);
        $this->authorizeOrganizer($request, $match->bracket?->tournament);

        try {
            $broadcast = $this->service->createForMatch($match, $request->user(), $request->toOptions());
        } catch (StreamingException $e) {
            return $this->errorResponse($e);
        }

        return (new LiveBroadcastResource($broadcast))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function createForTournament(CreateBroadcastRequest $request, string $tournamentId): JsonResponse
    {
        $tournament = Tournament::findOrFail($tournamentId);
        $this->authorizeOrganizer($request, $tournament);

        try {
            $broadcast = $this->service->createForTournament($tournament, $request->user(), $request->toOptions());
        } catch (StreamingException $e) {
            return $this->errorResponse($e);
        }

        return (new LiveBroadcastResource($broadcast))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /* ───────── Read ─────────────────────────────────────────────────── */

    public function show(string $broadcastId): JsonResponse
    {
        $broadcast = $this->repo->find($broadcastId);
        return (new LiveBroadcastResource($broadcast))->response();
    }

    /* ───────── State transitions ───────────────────────────────────── */

    public function goLive(Request $request, string $broadcastId): JsonResponse
    {
        $broadcast = $this->repo->find($broadcastId);
        $this->authorizeCreator($request, $broadcast);

        try {
            $broadcast = $this->service->goLive($broadcast);
        } catch (StreamingException $e) {
            return $this->errorResponse($e);
        }

        return (new LiveBroadcastResource($broadcast))->response();
    }

    public function complete(Request $request, string $broadcastId): JsonResponse
    {
        $broadcast = $this->repo->find($broadcastId);
        $this->authorizeCreator($request, $broadcast);

        try {
            $broadcast = $this->service->complete($broadcast);
        } catch (StreamingException $e) {
            return $this->errorResponse($e);
        }

        return (new LiveBroadcastResource($broadcast))->response();
    }

    public function destroy(Request $request, string $broadcastId): JsonResponse
    {
        $broadcast = $this->repo->find($broadcastId);
        $this->authorizeCreator($request, $broadcast);

        try {
            $this->service->cancel($broadcast);
        } catch (StreamingException $e) {
            return $this->errorResponse($e);
        }

        return response()->json(['data' => ['cancelled' => true]]);
    }

    /* ───────── Reveal credentials (creator only, single use) ───────── */

    /**
     * Returns the RTMP URL + stream key so the organizer can paste them
     * into OBS. Audited; should be rate-limited at the route level.
     */
    public function credentials(Request $request, string $broadcastId): JsonResponse
    {
        $broadcast = $this->repo->find($broadcastId);
        $this->authorizeCreator($request, $broadcast);

        if ($broadcast->isTerminal()) {
            return response()->json([
                'error' => ['code' => 'broadcast_terminal', 'message' => 'Broadcast is already complete.'],
            ], Response::HTTP_GONE);
        }

        return response()->json([
            'data' => [
                'rtmp_url'   => $broadcast->rtmp_url,
                'stream_key' => $broadcast->getStreamKey(),
                'instructions' => [
                    'obs'     => 'OBS → Settings → Stream → Service: Custom → Server: <rtmp_url> → Stream Key: <stream_key>',
                    'go_live' => 'After you start streaming in OBS, click "Go Live" in Dawri to make the broadcast visible.',
                ],
            ],
        ], Response::HTTP_OK, [
            // Security headers: tell the browser/proxy never to cache.
            'Cache-Control'                   => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma'                          => 'no-cache',
            'X-Dawri-Sensitive-Response'      => 'true',
        ]);
    }

    /* ───────── Authorization helpers ───────────────────────────────── */

    private function authorizeOrganizer(Request $request, ?Tournament $tournament): void
    {
        if ($tournament === null) {
            abort(Response::HTTP_NOT_FOUND, 'Tournament not found for this match.');
        }

        $user = $request->user();
        $allowed = $user?->id === $tournament->organizer_id
            || $user?->id === $tournament->moderator_id
            || $user?->role === 'admin';

        if (! $allowed) {
            abort(Response::HTTP_FORBIDDEN, 'Only the tournament organizer can manage broadcasts.');
        }
    }

    private function authorizeCreator(Request $request, LiveBroadcast $broadcast): void
    {
        $user    = $request->user();
        $allowed = $user?->id === $broadcast->created_by || $user?->role === 'admin';

        if (! $allowed) {
            abort(Response::HTTP_FORBIDDEN, 'Only the broadcast creator can perform this action.');
        }
    }

    private function errorResponse(StreamingException $e): JsonResponse
    {
        return response()->json([
            'error' => [
                'code'    => $e->errorCode,
                'message' => $e->getMessage(),
            ],
        ], $e->httpStatus());
    }
}
