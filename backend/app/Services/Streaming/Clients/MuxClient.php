<?php

declare(strict_types=1);

namespace App\Services\Streaming\Clients;

use App\Services\Streaming\DTOs\MuxLiveStreamData;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Psr\Log\LoggerInterface;
use Throwable;

/**
 * Thin HTTP wrapper around Mux's Video API.
 *
 * Responsibilities:
 *   - Hold Mux credentials (token id + secret) loaded from config
 *   - Authenticate every call with HTTP Basic auth
 *   - Convert HTTP failures into typed {@see StreamingBridgeException}
 *   - Project Mux JSON into {@see MuxLiveStreamData} DTOs
 *
 * This class deliberately does NOT contain any Dawri-specific business
 * logic. That lives in {@see \App\Services\Streaming\Bridges\MuxBridge}.
 *
 * @internal Use only via MuxBridge.
 */
final class MuxClient
{
    private const API_BASE = 'https://api.mux.com';
    private const PROVIDER = 'mux';

    /**
     * @param HttpFactory     $http      Laravel HTTP client factory (mockable in tests).
     * @param LoggerInterface $log       PSR-3 logger for outbound call auditing.
     * @param string          $tokenId   Mux access token ID.
     * @param string          $secret    Mux secret key.
     * @param bool            $testMode  Create all live streams in Mux's free test mode.
     * @param int             $timeout   HTTP timeout in seconds.
     */
    public function __construct(
        private readonly HttpFactory $http,
        private readonly LoggerInterface $log,
        private readonly string $tokenId,
        private readonly string $secret,
        private readonly bool $testMode,
        private readonly int $timeout = 10,
    ) {}

    /**
     * Create a Mux Live Stream.
     *
     * @param array{
     *     passthrough?: string,
     *     latency_mode?: string,
     *     reconnect_window?: int,
     *     simulcast_targets?: list<array{url: string, stream_key: string, passthrough?: string}>,
     *     new_asset_settings?: array<string, mixed>,
     * } $options
     *
     * @throws StreamingBridgeException
     */
    public function createLiveStream(array $options = []): MuxLiveStreamData
    {
        $payload = array_merge([
            'playback_policy'    => ['public'],
            'latency_mode'       => 'low',
            'reconnect_window'   => 60,
            'reduced_latency'    => false,
            'test'               => $this->testMode,
            'new_asset_settings' => ['playback_policy' => ['public']],
        ], $options);

        $response = $this->send('POST', '/video/v1/live-streams', $payload);

        /** @var array{data: array<string, mixed>} $body */
        $body = $response->json();

        return MuxLiveStreamData::fromMuxResponse($body['data']);
    }

    /**
     * Add a simulcast (restream) target to an existing Mux live stream.
     *
     * @param string $liveStreamId
     * @param string $rtmpUrl   Destination RTMP URL (e.g. YouTube's rtmp://a.rtmp.youtube.com/live2).
     * @param string $streamKey Destination's stream key.
     *
     * @return string Simulcast target ID (needed for later removal).
     *
     * @throws StreamingBridgeException
     */
    public function addSimulcastTarget(string $liveStreamId, string $rtmpUrl, string $streamKey): string
    {
        $response = $this->send(
            'POST',
            sprintf('/video/v1/live-streams/%s/simulcast-targets', urlencode($liveStreamId)),
            [
                'url'         => $rtmpUrl,
                'stream_key'  => $streamKey,
                'passthrough' => 'dawri-youtube-simulcast',
            ],
        );

        /** @var array{data: array{id: string}} $body */
        $body = $response->json();

        return (string) $body['data']['id'];
    }

    /**
     * Retrieve the current state of a live stream.
     *
     * @throws StreamingBridgeException
     */
    public function getLiveStream(string $liveStreamId): MuxLiveStreamData
    {
        $response = $this->send(
            'GET',
            sprintf('/video/v1/live-streams/%s', urlencode($liveStreamId)),
        );

        /** @var array{data: array<string, mixed>} $body */
        $body = $response->json();

        return MuxLiveStreamData::fromMuxResponse($body['data']);
    }

    /**
     * Delete a Mux live stream (idempotent — 404 is treated as success).
     *
     * @throws StreamingBridgeException
     */
    public function deleteLiveStream(string $liveStreamId): void
    {
        try {
            $this->send(
                'DELETE',
                sprintf('/video/v1/live-streams/%s', urlencode($liveStreamId)),
                expectSuccess: true,
                allowNotFound: true,
            );
        } catch (StreamingBridgeException $e) {
            if ($e->reason === StreamingBridgeException::REASON_PRECONDITION_FAILED) {
                // 404 — already gone; safe to swallow.
                return;
            }
            throw $e;
        }
    }

    /**
     * Verify a Mux webhook payload signature.
     *
     * Mux signs webhooks with HMAC-SHA256 of "{timestamp}.{payload}",
     * keyed with the webhook signing secret. The header format is:
     *   Mux-Signature: t=<timestamp>,v1=<signature>
     *
     * @param string $payload         Raw request body.
     * @param string $signatureHeader Full Mux-Signature header value.
     * @param string $signingSecret   Webhook signing secret from Mux dashboard.
     * @param int    $toleranceSec    Max accepted clock skew.
     */
    public function verifyWebhookSignature(
        string $payload,
        string $signatureHeader,
        string $signingSecret,
        int $toleranceSec = 300,
    ): bool {
        $parts = [];
        foreach (explode(',', $signatureHeader) as $part) {
            $kv = explode('=', trim($part), 2);
            if (count($kv) === 2) {
                $parts[$kv[0]] = $kv[1];
            }
        }

        $timestamp = isset($parts['t']) ? (int) $parts['t'] : 0;
        $signature = $parts['v1'] ?? '';

        if ($timestamp === 0 || $signature === '') {
            return false;
        }

        if (abs(time() - $timestamp) > $toleranceSec) {
            return false;
        }

        $expected = hash_hmac('sha256', $timestamp . '.' . $payload, $signingSecret);

        return hash_equals($expected, $signature);
    }

    // ------------------------------------------------------------------
    //  Internal helpers
    // ------------------------------------------------------------------

    /**
     * @param array<string, mixed> $body
     *
     * @throws StreamingBridgeException
     */
    private function send(
        string $method,
        string $path,
        array $body = [],
        bool $expectSuccess = true,
        bool $allowNotFound = false,
    ): Response {
        try {
            $request = $this->client();
            $response = $method === 'GET'
                ? $request->get(self::API_BASE . $path, $body)
                : $request->send($method, self::API_BASE . $path, ['json' => $body]);
        } catch (ConnectionException $e) {
            throw new StreamingBridgeException(
                StreamingBridgeException::REASON_PROVIDER_UNAVAILABLE,
                self::PROVIDER,
                'Mux is unreachable: ' . $e->getMessage(),
                $e,
            );
        } catch (Throwable $e) {
            throw new StreamingBridgeException(
                StreamingBridgeException::REASON_PROVIDER_UNAVAILABLE,
                self::PROVIDER,
                'Mux transport error: ' . $e->getMessage(),
                $e,
            );
        }

        $this->log->info('mux.api.call', [
            'method' => $method,
            'path'   => $path,
            'status' => $response->status(),
        ]);

        if ($expectSuccess && ! $response->successful()) {
            throw $this->mapHttpFailure($response, $allowNotFound);
        }

        return $response;
    }

    private function client(): PendingRequest
    {
        return $this->http
            ->withBasicAuth($this->tokenId, $this->secret)
            ->acceptJson()
            ->asJson()
            ->timeout($this->timeout)
            ->retry(2, 250, fn ($e) => $e instanceof ConnectionException);
    }

    private function mapHttpFailure(Response $response, bool $allowNotFound): StreamingBridgeException
    {
        $status = $response->status();
        $message = (string) ($response->json('error.message') ?? $response->body() ?? 'Mux error');

        $reason = match (true) {
            $status === 401 || $status === 403 => StreamingBridgeException::REASON_AUTH_FAILED,
            $status === 404 && $allowNotFound  => StreamingBridgeException::REASON_PRECONDITION_FAILED,
            $status === 404                     => StreamingBridgeException::REASON_PRECONDITION_FAILED,
            $status === 409                     => StreamingBridgeException::REASON_PRECONDITION_FAILED,
            $status === 429                     => StreamingBridgeException::REASON_QUOTA_EXCEEDED,
            $status >= 500                      => StreamingBridgeException::REASON_PROVIDER_UNAVAILABLE,
            default                              => StreamingBridgeException::REASON_PROVIDER_REJECTED,
        };

        return new StreamingBridgeException(
            $reason,
            self::PROVIDER,
            sprintf('Mux %d: %s', $status, $message),
        );
    }
}
