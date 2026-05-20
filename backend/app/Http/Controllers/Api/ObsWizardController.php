<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogWizardEventRequest;
use App\Http\Resources\LiveBroadcastResource;
use App\Http\Resources\WizardConfigResource;
use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Services\Streaming\Exceptions\StreamingException;
use App\Services\Streaming\ObsWizardService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * ObsWizardController
 *
 * HTTP layer for the OBS Setup Wizard. The wizard supports two scopes
 * (auto-detected from the URL):
 *
 *   • Broadcast scope:
 *       GET    /v1/broadcasts/{broadcast}/setup-wizard/config
 *       POST   /v1/broadcasts/{broadcast}/setup-wizard/event
 *       POST   /v1/broadcasts/{broadcast}/setup-wizard/finish   ← auto-Go-Live
 *
 *   • Tournament scope:
 *       GET    /v1/tournaments/{tournament}/setup-wizard/config
 *       POST   /v1/tournaments/{tournament}/setup-wizard/event
 *
 * Authorization is enforced inside ObsWizardService:
 *   - Broadcast scope: creator OR admin   (mirrors LiveBroadcastController)
 *   - Tournament scope: organizer/moderator OR admin
 *
 * @package App\Http\Controllers\Api
 */
final class ObsWizardController extends Controller
{
    public function __construct(private readonly ObsWizardService $wizard)
    {
    }

    /* ────────────────────────────────────────────────────────────────
       GET /broadcasts/{broadcast}/setup-wizard/config
       ──────────────────────────────────────────────────────────────── */
    public function configForBroadcast(Request $request, LiveBroadcast $broadcast): JsonResponse
    {
        try {
            $payload = $this->wizard->configForBroadcast($broadcast, $request->user());
        } catch (AuthorizationException $e) {
            return $this->error($e->getMessage(), Response::HTTP_FORBIDDEN);
        } catch (Throwable $e) {
            report($e);
            return $this->error('Could not load wizard configuration.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $this->fireAndForgetOpenEvent(broadcast: $broadcast, request: $request);

        return (new WizardConfigResource($payload))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    /* ────────────────────────────────────────────────────────────────
       GET /tournaments/{tournament}/setup-wizard/config
       ──────────────────────────────────────────────────────────────── */
    public function configForTournament(Request $request, Tournament $tournament): JsonResponse
    {
        try {
            $payload = $this->wizard->configForTournament($tournament, $request->user());
        } catch (AuthorizationException $e) {
            return $this->error($e->getMessage(), Response::HTTP_FORBIDDEN);
        } catch (Throwable $e) {
            report($e);
            return $this->error('Could not load wizard configuration.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $this->fireAndForgetOpenEvent(tournament: $tournament, request: $request);

        return (new WizardConfigResource($payload))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    /* ────────────────────────────────────────────────────────────────
       POST /broadcasts/{broadcast}/setup-wizard/event
       POST /tournaments/{tournament}/setup-wizard/event
       ──────────────────────────────────────────────────────────────── */
    public function logEventForBroadcast(LogWizardEventRequest $request, LiveBroadcast $broadcast): JsonResponse
    {
        return $this->doLogEvent($request, $broadcast, null);
    }

    public function logEventForTournament(LogWizardEventRequest $request, Tournament $tournament): JsonResponse
    {
        return $this->doLogEvent($request, null, $tournament);
    }

    private function doLogEvent(LogWizardEventRequest $request, ?LiveBroadcast $b, ?Tournament $t): JsonResponse
    {
        try {
            $log = $this->wizard->logEvent(
                broadcast:  $b,
                tournament: $t,
                user:       $request->user(),
                event:      (string) $request->validated('event'),
                stepNumber: $request->validated('step_number'),
                platform:   $request->validated('platform') ?? $this->detectPlatform($request),
                metadata:   $request->validated('metadata'),
                ipAddress:  $request->ip(),
            );
        } catch (Throwable $e) {
            report($e);
            return $this->error('Could not record wizard event.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'data' => [
                'id'         => $log->id,
                'event'      => $log->event,
                'created_at' => $log->created_at?->toIso8601String(),
            ],
        ], Response::HTTP_CREATED);
    }

    /* ────────────────────────────────────────────────────────────────
       POST /broadcasts/{broadcast}/setup-wizard/finish
       Transitions the broadcast to LIVE in one call.
       ──────────────────────────────────────────────────────────────── */
    public function finish(Request $request, LiveBroadcast $broadcast): JsonResponse
    {
        try {
            $updated = $this->wizard->finishAndGoLive($broadcast, $request->user());
        } catch (AuthorizationException $e) {
            return $this->error($e->getMessage(), Response::HTTP_FORBIDDEN);
        } catch (StreamingException $e) {
            return response()->json([
                'error' => ['code' => $e->errorCode, 'message' => $e->getMessage()],
            ], $e->httpStatus());
        } catch (Throwable $e) {
            report($e);
            return $this->error('Could not finalise the wizard.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return (new LiveBroadcastResource($updated))->response();
    }

    /* ════════════════════════════════════════════════════════════════
       Helpers
       ════════════════════════════════════════════════════════════════ */

    private function fireAndForgetOpenEvent(
        ?LiveBroadcast $broadcast = null,
        ?Tournament    $tournament = null,
        ?Request       $request = null,
    ): void {
        try {
            $this->wizard->logEvent(
                broadcast:  $broadcast,
                tournament: $tournament,
                user:       $request->user(),
                event:      'wizard_opened',
                platform:   $this->detectPlatform($request),
                ipAddress:  $request?->ip(),
            );
        } catch (Throwable $e) {
            report($e);
        }
    }

    private function detectPlatform(Request $request): string
    {
        $ua = strtolower((string) $request->userAgent());
        if ($ua === '') {
            return 'unknown';
        }
        return match (true) {
            str_contains($ua, 'windows')                                     => 'windows',
            str_contains($ua, 'mac os')   || str_contains($ua, 'macintosh')  => 'macos',
            str_contains($ua, 'linux')    || str_contains($ua, 'x11')        => 'linux',
            default                                                          => 'unknown',
        };
    }

    private function error(string $message, int $status): JsonResponse
    {
        return response()->json(['error' => ['code' => 'wizard_error', 'message' => $message]], $status);
    }
}
