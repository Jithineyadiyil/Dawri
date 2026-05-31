<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBrowserSessionRequest;
use App\Http\Resources\BrowserBroadcastSessionResource;
use App\Services\Streaming\BrowserBroadcastService;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * REST API for browser-based broadcasting sessions.
 *
 * Routes (registered in routes/api.streaming.php):
 *   POST   /api/v1/broadcasts/{broadcast}/browser-session   open
 *   DELETE /api/v1/broadcasts/{broadcast}/browser-session   close
 *
 * Both endpoints require Sanctum auth. The service layer performs the
 * fine-grained authorization check (admin or tournament organizer only).
 */
final class BrowserBroadcastController extends Controller
{
    /**
     * @param BrowserBroadcastService $service Orchestration service.
     */
    public function __construct(
        private readonly BrowserBroadcastService $service,
    ) {}

    /**
     * Open a browser-broadcast session.
     *
     * @param CreateBrowserSessionRequest $request   Validated request.
     * @param string                      $broadcast UUID from the route.
     *
     * @return JsonResponse
     */
    public function store(CreateBrowserSessionRequest $request, string $broadcast): JsonResponse
    {
        try {
            $session = $this->service->openSession(
                broadcastId: $broadcast,
                actor:       $request->user(),
            );
        } catch (AuthorizationException $e) {
            throw new HttpException(Response::HTTP_FORBIDDEN, $e->getMessage(), $e);
        } catch (StreamingBridgeException $e) {
            throw new HttpException($e->httpStatusCode(), $e->getMessage(), $e);
        }

        return BrowserBroadcastSessionResource::make($session)
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Close a browser-broadcast session.
     *
     * @param Request $request
     * @param string  $broadcast UUID from the route.
     *
     * @return Response 204 No Content on success.
     */
    public function destroy(Request $request, string $broadcast): Response
    {
        try {
            $this->service->closeSession(
                broadcastId: $broadcast,
                actor:       $request->user(),
            );
        } catch (AuthorizationException $e) {
            throw new HttpException(Response::HTTP_FORBIDDEN, $e->getMessage(), $e);
        } catch (StreamingBridgeException $e) {
            throw new HttpException($e->httpStatusCode(), $e->getMessage(), $e);
        }

        return response()->noContent();
    }
}
