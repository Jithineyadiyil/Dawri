<?php

declare(strict_types=1);

namespace App\Services\Streaming;

use App\Services\Streaming\DTOs\BroadcastDetails;
use App\Services\Streaming\Exceptions\StreamingException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * YouTubeStreamingService — thin, well-tested wrapper over YouTube Data API v3.
 *
 * Responsibilities (single-purpose):
 *   • Refresh OAuth access tokens (cached for ~55 min)
 *   • Create liveBroadcasts (the schedulable broadcast resource)
 *   • Create liveStreams (the RTMP ingest resource)
 *   • Bind a stream to a broadcast
 *   • Transition a broadcast: testing → live → complete
 *   • Fetch broadcast status / health
 *
 * What this service does NOT do:
 *   • Persistence (LiveBroadcastService handles the DB)
 *   • Authorization (the controller / FormRequest decides who can call)
 *   • Idempotency (controller provides idempotency_key on retries)
 *
 * Config (config/services.php → 'youtube'):
 *   client_id, client_secret, refresh_token, channel_id,
 *   api_base_url, oauth_token_url, default_privacy, enabled
 *
 * All public methods throw StreamingException on failure with a stable
 * machine-readable code (see StreamingException constants).
 */
final class YouTubeStreamingService
{
    /** Cache key for the short-lived access token. */
    private const ACCESS_TOKEN_CACHE_KEY = 'youtube:access_token';

    /** Safety window: refresh 5 minutes before expiry. */
    private const TOKEN_REFRESH_SAFETY_SECONDS = 300;

    /** Default HTTP timeout for YouTube API calls (seconds). */
    private const HTTP_TIMEOUT = 15;

    /**
     * Issue a request against the YouTube Data API v3.
     *
     * @param string               $method  HTTP verb (GET/POST/PUT/DELETE)
     * @param string               $path    API path, e.g. "/liveBroadcasts"
     * @param array<string, mixed> $query   Query-string parameters
     * @param array<string, mixed> $body    JSON body (null = no body)
     * @return array<string, mixed>         Decoded JSON response body
     *
     * @throws StreamingException
     */
    public function call(string $method, string $path, array $query = [], ?array $body = null): array
    {
        $this->assertEnabled();

        $token = $this->getAccessToken();
        $url   = rtrim((string) config('services.youtube.api_base_url'), '/') . $path;

        try {
            $request = Http::withToken($token)
                ->timeout(self::HTTP_TIMEOUT)
                ->acceptJson()
                ->withQueryParameters($query);

            $response = $body === null
                ? $request->send($method, $url)
                : $request->send($method, $url, ['json' => $body]);
        } catch (Throwable $e) {
            throw new StreamingException(
                StreamingException::UPSTREAM_ERROR,
                'YouTube API request failed: ' . $e->getMessage(),
                ['method' => $method, 'path' => $path],
                $e,
            );
        }

        return $this->parseResponse($response, $method, $path);
    }

    /**
     * Create a liveBroadcast resource (the schedulable event on a channel).
     * Returns the YouTube-assigned broadcast id (which is also the video id).
     *
     * @param string         $title            Up to 100 chars (YouTube cap)
     * @param string|null    $description      Up to 5000 chars
     * @param string         $privacy          public|unlisted|private
     * @param Carbon|null    $scheduledStart   Defaults to "now + 5 minutes"
     *
     * @throws StreamingException
     */
    public function createBroadcast(
        string $title,
        ?string $description,
        string $privacy,
        ?Carbon $scheduledStart = null,
    ): BroadcastDetails {
        // YouTube requires a future scheduledStartTime
        $start = $scheduledStart ?? Carbon::now()->addMinutes(5);

        $payload = [
            'snippet' => [
                'title'              => mb_substr($title, 0, 100),
                'description'        => $description !== null ? mb_substr($description, 0, 5000) : '',
                'scheduledStartTime' => $start->toIso8601String(),
            ],
            'status' => [
                'privacyStatus'           => $privacy,
                'selfDeclaredMadeForKids' => false,
            ],
            'contentDetails' => [
                'enableAutoStart' => false,
                'enableAutoStop'  => false,
                'enableDvr'       => true,
                'recordFromStart' => true,
            ],
        ];

        $response = $this->call('POST', '/liveBroadcasts', [
            'part' => 'snippet,status,contentDetails',
        ], $payload);

        $broadcastId = (string) ($response['id'] ?? '');
        if ($broadcastId === '') {
            throw new StreamingException(
                StreamingException::UPSTREAM_ERROR,
                'YouTube returned no broadcast id',
                ['response' => $response],
            );
        }

        return new BroadcastDetails(
            broadcastId:       $broadcastId,
            streamId:          null,
            channelId:         (string) config('services.youtube.channel_id'),
            title:             $title,
            privacy:           $privacy,
            rtmpUrl:           null,
            streamKey:         null,
            watchUrl:          BroadcastDetails::watchUrlFor($broadcastId),
            embedUrl:          BroadcastDetails::embedUrlFor($broadcastId),
            scheduledStartIso: $start->toIso8601String(),
        );
    }

    /**
     * Create a liveStream resource (the RTMP ingest endpoint).
     * Returns an array containing stream_id, rtmp_url, stream_key.
     *
     * @return array{stream_id:string, rtmp_url:string, stream_key:string}
     *
     * @throws StreamingException
     */
    public function createStream(string $title, string $resolution = '1080p', int $frameRate = 60): array
    {
        $payload = [
            'snippet' => [
                'title' => mb_substr('Dawri ingest — ' . $title, 0, 100),
            ],
            'cdn' => [
                'frameRate'     => $frameRate . 'fps',
                'ingestionType' => 'rtmp',
                'resolution'    => $resolution,
            ],
            'contentDetails' => [
                'isReusable' => false,   // one stream per broadcast = simpler lifecycle
            ],
        ];

        $response = $this->call('POST', '/liveStreams', [
            'part' => 'snippet,cdn,contentDetails,status',
        ], $payload);

        $streamId  = (string) ($response['id'] ?? '');
        $ingestion = $response['cdn']['ingestionInfo'] ?? [];
        $rtmpUrl   = (string) ($ingestion['ingestionAddress'] ?? '');
        $streamKey = (string) ($ingestion['streamName'] ?? '');

        if ($streamId === '' || $rtmpUrl === '' || $streamKey === '') {
            throw new StreamingException(
                StreamingException::STREAM_BIND_FAILED,
                'YouTube returned incomplete liveStream resource',
                ['response' => $response],
            );
        }

        return [
            'stream_id'  => $streamId,
            'rtmp_url'   => $rtmpUrl,
            'stream_key' => $streamKey,
        ];
    }

    /**
     * Bind a liveStream to a liveBroadcast. Required before transitioning.
     *
     * @throws StreamingException
     */
    public function bindStreamToBroadcast(string $broadcastId, string $streamId): void
    {
        $this->call('POST', '/liveBroadcasts/bind', [
            'part'     => 'id,contentDetails',
            'id'       => $broadcastId,
            'streamId' => $streamId,
        ]);
    }

    /**
     * Transition a broadcast lifecycle state.
     *
     * @param string $broadcastStatus  One of: testing, live, complete
     * @throws StreamingException
     */
    public function transition(string $broadcastId, string $broadcastStatus): void
    {
        if (! in_array($broadcastStatus, ['testing', 'live', 'complete'], true)) {
            throw new StreamingException(
                StreamingException::INVALID_TRANSITION,
                "Invalid transition state: {$broadcastStatus}",
            );
        }

        $this->call('POST', '/liveBroadcasts/transition', [
            'part'            => 'status',
            'id'              => $broadcastId,
            'broadcastStatus' => $broadcastStatus,
        ]);
    }

    /**
     * Fetch a single broadcast (used for status polling / health checks).
     *
     * @throws StreamingException
     */
    public function fetchBroadcast(string $broadcastId): array
    {
        $response = $this->call('GET', '/liveBroadcasts', [
            'part' => 'id,snippet,status,contentDetails',
            'id'   => $broadcastId,
        ]);

        $items = $response['items'] ?? [];
        if (empty($items)) {
            throw new StreamingException(
                StreamingException::BROADCAST_NOT_FOUND,
                "Broadcast {$broadcastId} not found",
            );
        }

        return $items[0];
    }

    /**
     * Delete a broadcast (used by clean-up if creation fails mid-flow, or
     * if the organizer cancels before going live).
     *
     * @throws StreamingException
     */
    public function deleteBroadcast(string $broadcastId): void
    {
        $this->call('DELETE', '/liveBroadcasts', ['id' => $broadcastId]);
    }

    /* ───────────────── private helpers ─────────────────────────────── */

    /**
     * Get a valid access token, refreshing from the long-lived refresh
     * token if the cache is empty / expired.
     *
     * @throws StreamingException
     */
    private function getAccessToken(): string
    {
        $cached = Cache::get(self::ACCESS_TOKEN_CACHE_KEY);
        if (is_string($cached) && $cached !== '') {
            return $cached;
        }

        $cfg = config('services.youtube');

        try {
            $response = Http::asForm()
                ->timeout(self::HTTP_TIMEOUT)
                ->post($cfg['oauth_token_url'], [
                    'client_id'     => $cfg['client_id'],
                    'client_secret' => $cfg['client_secret'],
                    'refresh_token' => $cfg['refresh_token'],
                    'grant_type'    => 'refresh_token',
                ]);
        } catch (Throwable $e) {
            throw new StreamingException(
                StreamingException::AUTH_FAILED,
                'Failed to contact OAuth token endpoint: ' . $e->getMessage(),
                [],
                $e,
            );
        }

        if (! $response->successful()) {
            $body = $response->json();
            throw new StreamingException(
                StreamingException::AUTH_FAILED,
                'OAuth refresh failed: ' . ($body['error_description'] ?? $body['error'] ?? 'unknown'),
                ['response' => $body],
            );
        }

        $token     = (string) $response->json('access_token', '');
        $expiresIn = (int) $response->json('expires_in', 3600);

        if ($token === '') {
            throw new StreamingException(
                StreamingException::AUTH_FAILED,
                'OAuth response missing access_token',
            );
        }

        Cache::put(
            self::ACCESS_TOKEN_CACHE_KEY,
            $token,
            now()->addSeconds(max(60, $expiresIn - self::TOKEN_REFRESH_SAFETY_SECONDS)),
        );

        return $token;
    }

    private function assertEnabled(): void
    {
        if (! (bool) config('services.youtube.enabled')) {
            throw new StreamingException(
                StreamingException::FEATURE_DISABLED,
                'YouTube streaming integration is disabled (YOUTUBE_ENABLED=false)',
            );
        }
    }

    /**
     * Translate an HTTP response into either a JSON array or a
     * StreamingException with the right machine-readable code.
     *
     * @return array<string, mixed>
     * @throws StreamingException
     */
    private function parseResponse(Response $response, string $method, string $path): array
    {
        if ($response->successful()) {
            return (array) ($response->json() ?? []);
        }

        $body   = (array) ($response->json() ?? []);
        $reason = $body['error']['errors'][0]['reason'] ?? '';
        $msg    = $body['error']['message'] ?? "HTTP {$response->status()} from YouTube";

        $code = match (true) {
            $response->status() === 401                       => StreamingException::AUTH_FAILED,
            $response->status() === 404                       => StreamingException::BROADCAST_NOT_FOUND,
            $reason === 'quotaExceeded'                       => StreamingException::QUOTA_EXCEEDED,
            $reason === 'liveStreamingNotEnabled'             => StreamingException::CHANNEL_NOT_STREAMABLE,
            $reason === 'invalidTransition'                   => StreamingException::INVALID_TRANSITION,
            default                                            => StreamingException::UPSTREAM_ERROR,
        };

        // Auth failures invalidate the cached token, so the next call retries.
        if ($code === StreamingException::AUTH_FAILED) {
            Cache::forget(self::ACCESS_TOKEN_CACHE_KEY);
        }

        Log::warning('YouTube API error', [
            'method' => $method,
            'path'   => $path,
            'status' => $response->status(),
            'reason' => $reason,
            'body'   => $body,
        ]);

        throw new StreamingException($code, $msg, $body);
    }
}
