<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Webhooks;

use App\Http\Controllers\Controller;
use App\Models\LiveBroadcast;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Psr\Log\LoggerInterface;

/**
 * Receives webhooks from Mux.
 *
 * Mux fires events when:
 *   - `video.live_stream.active`        — browser started publishing
 *   - `video.live_stream.idle`          — browser stopped publishing
 *   - `video.live_stream.disconnected`  — temporary disconnection
 *   - `video.live_stream.recording.ready` — VOD recording finished
 *
 * We use these to keep `live_broadcasts.status` in sync without having
 * to poll Mux. All signature verification happens before any state
 * mutation; an invalid signature returns 401 without side effects.
 *
 * Route (registered in api.streaming.php, OUTSIDE auth:sanctum group):
 *   POST /api/v1/webhooks/mux
 */
final class MuxWebhookController extends Controller
{
    /**
     * @param StreamingBridgeInterface         $bridge     Bridge (verifies signature).
     * @param LiveBroadcastRepositoryInterface $broadcasts Broadcast persistence.
     * @param LoggerInterface                  $log        PSR-3 logger.
     */
    public function __construct(
        private readonly StreamingBridgeInterface $bridge,
        private readonly LiveBroadcastRepositoryInterface $broadcasts,
        private readonly LoggerInterface $log,
    ) {}

    /**
     * Webhook entry point.
     *
     * @param Request $request
     *
     * @return Response Always JSON-empty 204 on success, 401 on bad signature.
     */
    public function __invoke(Request $request): Response
    {
        $payload = $request->getContent();
        $signature = $request->header('Mux-Signature', '');

        if (! $this->bridge->verifyWebhookSignature($payload, $signature)) {
            $this->log->warning('mux_webhook.invalid_signature', [
                'ip'        => $request->ip(),
                'has_header' => $signature !== '',
            ]);

            return response('Invalid signature', Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($payload, true);
        if (! is_array($data)) {
            return response()->noContent();
        }

        $event = (string) ($data['type'] ?? '');
        $muxStreamId = (string) ($data['object']['id'] ?? '');

        if ($muxStreamId === '') {
            return response()->noContent();
        }

        $broadcast = $this->broadcasts->findByMuxStreamId($muxStreamId);
        if ($broadcast === null) {
            // Could be an orphan from a deleted broadcast; nothing to do.
            return response()->noContent();
        }

        $this->handleEvent($broadcast, $event);

        return response()->noContent();
    }

    /**
     * Translate a Mux event into a broadcast state change.
     */
    private function handleEvent(LiveBroadcast $broadcast, string $event): void
    {
        $newStatus = match ($event) {
            'video.live_stream.active'         => 'live',
            'video.live_stream.idle'           => 'ready',
            'video.live_stream.disconnected'   => 'reconnecting',
            'video.live_stream.recording.ready'=> $broadcast->status, // no status change
            default                             => null,
        };

        if ($newStatus !== null && $newStatus !== $broadcast->status) {
            $broadcast->forceFill(['status' => $newStatus])->save();

            $this->log->info('mux_webhook.status_synced', [
                'broadcast_id' => $broadcast->id,
                'event'        => $event,
                'new_status'   => $newStatus,
            ]);
        }
    }
}
