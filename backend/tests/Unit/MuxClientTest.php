<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\Streaming\Clients\MuxClient;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;

/**
 * Unit tests for {@see MuxClient}.
 *
 * Uses Laravel's Http::fake() to stub HTTP responses, so these tests
 * never touch the network and can be run on any developer machine.
 *
 * @covers \App\Services\Streaming\Clients\MuxClient
 */
final class MuxClientTest extends TestCase
{
    private MuxClient $client;
    private HttpFactory $http;

    protected function setUp(): void
    {
        parent::setUp();

        $this->http = new HttpFactory();
        $this->client = new MuxClient(
            http:     $this->http,
            log:      new NullLogger(),
            tokenId:  'test-token-id',
            secret:   'test-secret',
            testMode: true,
        );
    }

    /**
     * @test
     */
    public function it_creates_a_live_stream_and_returns_typed_data(): void
    {
        $this->http->fake([
            'api.mux.com/video/v1/live-streams' => $this->http::response([
                'data' => [
                    'id'           => 'mux-stream-abc',
                    'stream_key'   => 'sk-xyz-123',
                    'status'       => 'idle',
                    'latency_mode' => 'low',
                    'test'         => true,
                    'playback_ids' => [
                        ['id' => 'pb-public-1', 'policy' => 'public'],
                    ],
                ],
            ], 201),
        ]);

        $stream = $this->client->createLiveStream([
            'passthrough' => 'dawri-broadcast-test',
        ]);

        self::assertSame('mux-stream-abc', $stream->id);
        self::assertSame('sk-xyz-123', $stream->streamKey);
        self::assertSame('pb-public-1', $stream->playbackId);
        self::assertSame('low', $stream->latencyMode);
        self::assertTrue($stream->isTest);
        self::assertSame('https://stream.mux.com/pb-public-1.m3u8', $stream->hlsPlaybackUrl());
    }

    /**
     * @test
     */
    public function it_throws_auth_failed_on_401(): void
    {
        $this->http->fake([
            'api.mux.com/*' => $this->http::response(
                ['error' => ['type' => 'unauthorized', 'message' => 'Bad token']],
                401,
            ),
        ]);

        $this->expectException(StreamingBridgeException::class);
        $this->expectExceptionMessageMatches('/Mux 401/');

        try {
            $this->client->createLiveStream();
        } catch (StreamingBridgeException $e) {
            self::assertSame(StreamingBridgeException::REASON_AUTH_FAILED, $e->reason);
            self::assertSame(502, $e->httpStatusCode());
            throw $e;
        }
    }

    /**
     * @test
     */
    public function it_throws_quota_exceeded_on_429(): void
    {
        $this->http->fake([
            'api.mux.com/*' => $this->http::response(['error' => ['message' => 'Rate limited']], 429),
        ]);

        $this->expectException(StreamingBridgeException::class);

        try {
            $this->client->createLiveStream();
        } catch (StreamingBridgeException $e) {
            self::assertSame(StreamingBridgeException::REASON_QUOTA_EXCEEDED, $e->reason);
            self::assertSame(429, $e->httpStatusCode());
            throw $e;
        }
    }

    /**
     * @test
     */
    public function it_treats_404_on_delete_as_success(): void
    {
        $this->http->fake([
            'api.mux.com/video/v1/live-streams/*' => $this->http::response(null, 404),
        ]);

        // Should not throw.
        $this->client->deleteLiveStream('mux-stream-missing');
        $this->addToAssertionCount(1);
    }

    /**
     * @test
     */
    public function it_verifies_a_correctly_signed_webhook(): void
    {
        $secret    = 'whsec_test_secret';
        $payload   = '{"type":"video.live_stream.active","object":{"id":"mux-abc"}}';
        $timestamp = time();
        $signature = hash_hmac('sha256', $timestamp . '.' . $payload, $secret);
        $header    = "t={$timestamp},v1={$signature}";

        self::assertTrue(
            $this->client->verifyWebhookSignature($payload, $header, $secret),
        );
    }

    /**
     * @test
     */
    public function it_rejects_a_tampered_webhook(): void
    {
        $secret    = 'whsec_test_secret';
        $payload   = '{"type":"video.live_stream.active"}';
        $timestamp = time();
        $header    = "t={$timestamp},v1=deadbeef";

        self::assertFalse(
            $this->client->verifyWebhookSignature($payload, $header, $secret),
        );
    }

    /**
     * @test
     */
    public function it_rejects_a_webhook_with_old_timestamp(): void
    {
        $secret    = 'whsec_test_secret';
        $payload   = '{}';
        $timestamp = time() - 3600; // 1 hour old
        $signature = hash_hmac('sha256', $timestamp . '.' . $payload, $secret);
        $header    = "t={$timestamp},v1={$signature}";

        self::assertFalse(
            $this->client->verifyWebhookSignature($payload, $header, $secret),
        );
    }
}
