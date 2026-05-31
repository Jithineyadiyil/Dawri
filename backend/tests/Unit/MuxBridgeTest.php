<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\LiveBroadcast;
use App\Services\Streaming\Bridges\MuxBridge;
use App\Services\Streaming\Clients\MuxClient;
use App\Services\Streaming\DTOs\MuxLiveStreamData;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;

/**
 * Unit tests for {@see MuxBridge}.
 *
 * Mocks the MuxClient so the bridge can be tested in isolation without
 * any HTTP traffic. Uses a stub LiveBroadcast that only implements
 * `forceFill()->save()` semantics enough to verify state mutations.
 *
 * @covers \App\Services\Streaming\Bridges\MuxBridge
 */
final class MuxBridgeTest extends TestCase
{
    /** @var MuxClient&MockInterface */
    private MuxClient $client;

    private MuxBridge $bridge;

    protected function setUp(): void
    {
        parent::setUp();

        /** @var MuxClient&MockInterface $client */
        $client = Mockery::mock(MuxClient::class);
        $this->client = $client;

        $this->bridge = new MuxBridge(
            client:            $this->client,
            log:               new NullLogger(),
            whipBaseUrl:       'https://global-live.mux.com/api/v1/whip',
            webhookSecret:     'whsec_test',
            youtubeRtmpUrl:    'rtmp://a.rtmp.youtube.com/live2',
            sessionTtlSeconds: 300,
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * @test
     */
    public function provider_name_is_mux(): void
    {
        self::assertSame('mux', $this->bridge->providerName());
    }

    /**
     * @test
     */
    public function create_session_provisions_mux_stream_and_simulcast(): void
    {
        $broadcast = $this->makeBroadcast([
            'id'                 => 'bc-uuid-1',
            'youtube_stream_key' => 'yt-key-abc',
            'youtube_video_id'   => 'yt-vid-xyz',
        ]);

        $muxStream = new MuxLiveStreamData(
            id:          'mux-1',
            streamKey:   'sk-mux-1',
            playbackId:  'pb-1',
            status:      'idle',
            latencyMode: 'low',
            isTest:      true,
        );

        $this->client->shouldReceive('createLiveStream')
            ->once()
            ->andReturn($muxStream);

        $this->client->shouldReceive('addSimulcastTarget')
            ->once()
            ->with('mux-1', 'rtmp://a.rtmp.youtube.com/live2', 'yt-key-abc')
            ->andReturn('sim-1');

        $session = $this->bridge->createSession($broadcast);

        self::assertSame('bc-uuid-1', $session->broadcastId);
        self::assertSame('https://global-live.mux.com/api/v1/whip/sk-mux-1', $session->whipUrl);
        self::assertNull($session->whipToken);
        self::assertSame('https://stream.mux.com/pb-1.m3u8', $session->playbackUrl);
        self::assertSame('https://www.youtube.com/watch?v=yt-vid-xyz', $session->watchUrl);
        self::assertSame('mux', $session->provider);
    }

    /**
     * @test
     */
    public function create_session_rejects_broadcast_without_youtube_key(): void
    {
        $broadcast = $this->makeBroadcast([
            'id'                 => 'bc-uuid-2',
            'youtube_stream_key' => null,
            'youtube_video_id'   => null,
        ]);

        $this->expectException(StreamingBridgeException::class);

        try {
            $this->bridge->createSession($broadcast);
        } catch (StreamingBridgeException $e) {
            self::assertSame(
                StreamingBridgeException::REASON_PRECONDITION_FAILED,
                $e->reason,
            );
            throw $e;
        }
    }

    /**
     * @test
     */
    public function end_session_deletes_mux_stream_and_clears_columns(): void
    {
        $broadcast = $this->makeBroadcast([
            'id'                       => 'bc-uuid-3',
            'mux_stream_id'            => 'mux-3',
            'mux_playback_id'          => 'pb-3',
            'mux_simulcast_target_id'  => 'sim-3',
            'whip_url'                 => 'https://...',
        ]);

        $this->client->shouldReceive('deleteLiveStream')
            ->once()
            ->with('mux-3');

        $this->bridge->endSession($broadcast);

        self::assertNull($broadcast->mux_stream_id);
        self::assertNull($broadcast->mux_playback_id);
        self::assertNull($broadcast->mux_simulcast_target_id);
        self::assertNull($broadcast->whip_url);
    }

    /**
     * @test
     */
    public function end_session_is_safe_when_no_mux_stream(): void
    {
        $broadcast = $this->makeBroadcast(['mux_stream_id' => null]);

        $this->client->shouldNotReceive('deleteLiveStream');

        $this->bridge->endSession($broadcast); // should not throw
        $this->addToAssertionCount(1);
    }

    /**
     * @test
     */
    public function webhook_signature_check_delegates_to_client(): void
    {
        $this->client->shouldReceive('verifyWebhookSignature')
            ->once()
            ->with('payload', 'sig', 'whsec_test')
            ->andReturnTrue();

        self::assertTrue($this->bridge->verifyWebhookSignature('payload', 'sig'));
    }

    /**
     * Build a minimal LiveBroadcast double for tests.
     *
     * @param array<string, mixed> $attributes
     */
    private function makeBroadcast(array $attributes): LiveBroadcast
    {
        // Anonymous subclass with simplified persistence.
        $broadcast = new class extends LiveBroadcast {
            public bool $saved = false;

            public function save(array $options = []): bool
            {
                $this->saved = true;
                return true;
            }

            public function refresh(): static
            {
                return $this;
            }
        };

        foreach ($attributes as $key => $value) {
            $broadcast->setAttribute($key, $value);
        }

        return $broadcast;
    }
}
