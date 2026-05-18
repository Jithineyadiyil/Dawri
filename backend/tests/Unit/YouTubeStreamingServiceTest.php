<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\Streaming\Exceptions\StreamingException;
use App\Services\Streaming\YouTubeStreamingService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

/**
 * Unit tests for YouTubeStreamingService.
 *
 * Strategy: mock the HTTP layer with Http::fake() so we can assert against
 * outbound URLs / bodies and inject canned YouTube responses.
 */
final class YouTubeStreamingServiceTest extends TestCase
{
    private YouTubeStreamingService $service;

    protected function setUp(): void
    {
        parent::setUp();

        // Real config values would come from .env in normal test runs;
        // we override here so the tests don't depend on the environment.
        config([
            'services.youtube' => [
                'client_id'       => 'test-client-id',
                'client_secret'   => 'test-client-secret',
                'refresh_token'   => 'test-refresh-token',
                'channel_id'      => 'UCtest1234567890',
                'api_base_url'    => 'https://www.googleapis.com/youtube/v3',
                'oauth_token_url' => 'https://oauth2.googleapis.com/token',
                'default_privacy' => 'public',
                'enabled'         => true,
            ],
        ]);

        Cache::flush();
        $this->service = app(YouTubeStreamingService::class);
    }

    /* ───────── Feature-disabled guard ──────────────────────────────── */

    public function test_throws_when_disabled(): void
    {
        config(['services.youtube.enabled' => false]);

        $this->expectException(StreamingException::class);
        $this->expectExceptionMessage('disabled');

        $this->service->createBroadcast('t', null, 'public');
    }

    /* ───────── Access token refresh ────────────────────────────────── */

    public function test_caches_access_token_after_first_use(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response([
                'access_token' => 'ya29.fresh-token',
                'expires_in'   => 3600,
            ], 200),
            'www.googleapis.com/youtube/v3/liveBroadcasts*' => Http::response([
                'id' => 'bcast-1',
            ], 200),
        ]);

        $this->service->createBroadcast('Test', null, 'public');
        $this->service->createBroadcast('Test 2', null, 'public');

        // Token endpoint should only have been hit once.
        Http::assertSentCount(3); // 1 token + 2 broadcasts
    }

    public function test_throws_auth_failed_on_oauth_400(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response([
                'error'             => 'invalid_grant',
                'error_description' => 'Token revoked',
            ], 400),
        ]);

        try {
            $this->service->createBroadcast('t', null, 'public');
            $this->fail('Expected StreamingException');
        } catch (StreamingException $e) {
            $this->assertSame(StreamingException::AUTH_FAILED, $e->errorCode);
        }
    }

    /* ───────── createBroadcast ─────────────────────────────────────── */

    public function test_creates_broadcast_with_correct_payload(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response(['access_token' => 'tk', 'expires_in' => 3600], 200),
            'www.googleapis.com/youtube/v3/liveBroadcasts*' => Http::response([
                'id' => 'broadcast-xyz',
            ], 200),
        ]);

        $details = $this->service->createBroadcast('Final Match', 'EA FC 25 final', 'unlisted');

        $this->assertSame('broadcast-xyz', $details->broadcastId);
        $this->assertSame('UCtest1234567890', $details->channelId);
        $this->assertSame('unlisted', $details->privacy);
        $this->assertStringContainsString('broadcast-xyz', $details->watchUrl);
        $this->assertStringContainsString('broadcast-xyz', $details->embedUrl);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/liveBroadcasts')
                && $request->method() === 'POST'
                && $request->data()['snippet']['title'] === 'Final Match';
        });
    }

    public function test_throws_quota_exceeded(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response(['access_token' => 'tk', 'expires_in' => 3600], 200),
            'www.googleapis.com/youtube/v3/liveBroadcasts*' => Http::response([
                'error' => [
                    'message' => 'The quota has been exceeded.',
                    'errors'  => [['reason' => 'quotaExceeded']],
                ],
            ], 403),
        ]);

        try {
            $this->service->createBroadcast('t', null, 'public');
            $this->fail('Expected StreamingException');
        } catch (StreamingException $e) {
            $this->assertSame(StreamingException::QUOTA_EXCEEDED, $e->errorCode);
            $this->assertSame(429, $e->httpStatus());
        }
    }

    /* ───────── createStream ────────────────────────────────────────── */

    public function test_creates_stream_returns_rtmp_credentials(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response(['access_token' => 'tk', 'expires_in' => 3600], 200),
            'www.googleapis.com/youtube/v3/liveStreams*' => Http::response([
                'id' => 'stream-abc',
                'cdn' => [
                    'ingestionInfo' => [
                        'ingestionAddress' => 'rtmp://a.rtmp.youtube.com/live2',
                        'streamName'       => 'aaaa-bbbb-cccc-dddd-eeee',
                    ],
                ],
            ], 200),
        ]);

        $stream = $this->service->createStream('Final');

        $this->assertSame('stream-abc', $stream['stream_id']);
        $this->assertSame('rtmp://a.rtmp.youtube.com/live2', $stream['rtmp_url']);
        $this->assertSame('aaaa-bbbb-cccc-dddd-eeee', $stream['stream_key']);
    }

    public function test_throws_when_stream_response_incomplete(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response(['access_token' => 'tk', 'expires_in' => 3600], 200),
            'www.googleapis.com/youtube/v3/liveStreams*' => Http::response(['id' => 'x'], 200),  // missing cdn
        ]);

        try {
            $this->service->createStream('t');
            $this->fail('Expected StreamingException');
        } catch (StreamingException $e) {
            $this->assertSame(StreamingException::STREAM_BIND_FAILED, $e->errorCode);
        }
    }

    /* ───────── transition ──────────────────────────────────────────── */

    public function test_transition_validates_state(): void
    {
        $this->expectException(StreamingException::class);
        $this->service->transition('bcast-1', 'garbage');
    }

    /* ───────── fetchBroadcast ──────────────────────────────────────── */

    public function test_fetch_broadcast_throws_not_found_on_empty_items(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response(['access_token' => 'tk', 'expires_in' => 3600], 200),
            'www.googleapis.com/youtube/v3/liveBroadcasts*' => Http::response(['items' => []], 200),
        ]);

        try {
            $this->service->fetchBroadcast('does-not-exist');
            $this->fail('Expected StreamingException');
        } catch (StreamingException $e) {
            $this->assertSame(StreamingException::BROADCAST_NOT_FOUND, $e->errorCode);
        }
    }
}
