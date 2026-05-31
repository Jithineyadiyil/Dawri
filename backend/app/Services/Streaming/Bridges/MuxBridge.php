<?php

declare(strict_types=1);

namespace App\Services\Streaming\Bridges;

use App\Models\LiveBroadcast;
use App\Services\Streaming\Clients\MuxClient;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use DateTimeImmutable;
use Psr\Log\LoggerInterface;

/**
 * Mux Live implementation of {@see StreamingBridgeInterface}.
 *
 * Flow:
 *   1. Verify the broadcast already has a YouTube broadcast + stream key
 *      (provisioned earlier by LiveBroadcastService)
 *   2. Create a Mux Live Stream with low-latency mode
 *   3. Register YouTube as a simulcast target on that Mux stream
 *   4. Compose the WHIP URL the browser publishes to
 *   5. Persist provider IDs on the broadcast row for later cleanup
 *
 * Once the browser starts publishing WHIP → Mux, Mux automatically
 * transcodes and pushes to YouTube via the simulcast target. No further
 * server-side work is needed during the broadcast.
 */
final class MuxBridge implements StreamingBridgeInterface
{
    private const PROVIDER = 'mux';

    /**
     * @param MuxClient       $client            HTTP client wrapping Mux's API.
     * @param LoggerInterface $log               PSR-3 logger.
     * @param string          $whipBaseUrl       Mux WHIP ingest base, e.g.
     *                                            "https://global-live.mux.com/api/v1/whip".
     * @param string          $webhookSecret     Mux webhook signing secret.
     * @param string          $youtubeRtmpUrl    Default YouTube RTMP ingest URL.
     * @param int             $sessionTtlSeconds WHIP token lifetime.
     */
    public function __construct(
        private readonly MuxClient $client,
        private readonly LoggerInterface $log,
        private readonly string $whipBaseUrl,
        private readonly string $webhookSecret,
        private readonly string $youtubeRtmpUrl,
        private readonly int $sessionTtlSeconds,
    ) {}

    /**
     * @inheritDoc
     *
     * @throws StreamingBridgeException
     */
    public function createSession(LiveBroadcast $broadcast): BrowserBroadcastSession
    {
        $youtubeStreamKey = $broadcast->youtube_stream_key;
        $youtubeVideoId   = $broadcast->youtube_video_id;

        if (! $youtubeStreamKey || ! $youtubeVideoId) {
            throw new StreamingBridgeException(
                StreamingBridgeException::REASON_PRECONDITION_FAILED,
                self::PROVIDER,
                'YouTube broadcast is not provisioned for this LiveBroadcast yet.',
            );
        }

        // 1. Provision Mux live stream (or reuse if we already did)
        if ($broadcast->mux_stream_id) {
            $muxStream = $this->client->getLiveStream($broadcast->mux_stream_id);
        } else {
            $muxStream = $this->client->createLiveStream([
                'passthrough'      => "dawri-broadcast-{$broadcast->id}",
                'latency_mode'     => 'low',
                'reconnect_window' => 60,
            ]);

            // 2. Wire YouTube as simulcast destination
            $simulcastId = $this->client->addSimulcastTarget(
                liveStreamId: $muxStream->id,
                rtmpUrl:      $this->youtubeRtmpUrl,
                streamKey:    $youtubeStreamKey,
            );

            $broadcast->forceFill([
                'mux_stream_id'           => $muxStream->id,
                'mux_playback_id'         => $muxStream->playbackId,
                'mux_simulcast_target_id' => $simulcastId,
                'bridge_provider'         => self::PROVIDER,
                'whip_url'                => $this->composeWhipUrl($muxStream->streamKey),
            ])->save();

            $this->log->info('mux_bridge.session_created', [
                'broadcast_id'   => $broadcast->id,
                'mux_stream_id'  => $muxStream->id,
                'simulcast_id'   => $simulcastId,
                'test_mode'      => $muxStream->isTest,
            ]);
        }

        return new BrowserBroadcastSession(
            broadcastId: (string) $broadcast->id,
            whipUrl:     $this->composeWhipUrl($muxStream->streamKey),
            whipToken:   null, // Mux embeds auth in the URL; no separate Bearer.
            playbackUrl: $muxStream->hlsPlaybackUrl(),
            watchUrl:    sprintf('https://www.youtube.com/watch?v=%s', $youtubeVideoId),
            expiresAt:   new DateTimeImmutable("+{$this->sessionTtlSeconds} seconds"),
            provider:    self::PROVIDER,
        );
    }

    /**
     * @inheritDoc
     */
    public function endSession(LiveBroadcast $broadcast): void
    {
        if (! $broadcast->mux_stream_id) {
            return;
        }

        try {
            $this->client->deleteLiveStream($broadcast->mux_stream_id);
        } catch (StreamingBridgeException $e) {
            // Swallow — best-effort cleanup. Mux will GC unused streams anyway.
            $this->log->warning('mux_bridge.cleanup_failed', [
                'broadcast_id'  => $broadcast->id,
                'mux_stream_id' => $broadcast->mux_stream_id,
                'reason'        => $e->reason,
                'message'       => $e->getMessage(),
            ]);
        }

        $broadcast->forceFill([
            'mux_stream_id'           => null,
            'mux_playback_id'         => null,
            'mux_simulcast_target_id' => null,
            'whip_url'                => null,
        ])->save();
    }

    /**
     * @inheritDoc
     */
    public function verifyWebhookSignature(string $payload, string $signature): bool
    {
        if ($this->webhookSecret === '') {
            // Defense-in-depth: no secret configured ⇒ refuse all webhooks.
            return false;
        }

        return $this->client->verifyWebhookSignature(
            payload:         $payload,
            signatureHeader: $signature,
            signingSecret:   $this->webhookSecret,
        );
    }

    /**
     * @inheritDoc
     */
    public function providerName(): string
    {
        return self::PROVIDER;
    }

    /**
     * Compose the Mux WHIP ingest URL for a given stream key.
     *
     * Mux accepts the stream key embedded in the URL path; no separate
     * Bearer token is required. The stream key is single-broadcast and
     * gets rotated when the Mux live stream is deleted in
     * {@see self::endSession()}.
     */
    private function composeWhipUrl(string $streamKey): string
    {
        return rtrim($this->whipBaseUrl, '/') . '/' . $streamKey;
    }
}
