<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\User;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\BrowserBroadcastService;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use App\Services\Streaming\LiveBroadcastService;
use DateTimeImmutable;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;

/**
 * Unit tests for {@see BrowserBroadcastService}.
 *
 * Uses Mockery to isolate the service from the bridge, repository, and
 * YouTube service. We assert behavior, not implementation details.
 *
 * @covers \App\Services\Streaming\BrowserBroadcastService
 */
final class BrowserBroadcastServiceTest extends TestCase
{
    /** @var StreamingBridgeInterface&MockInterface */
    private StreamingBridgeInterface $bridge;

    /** @var LiveBroadcastRepositoryInterface&MockInterface */
    private LiveBroadcastRepositoryInterface $broadcasts;

    /** @var LiveBroadcastService&MockInterface */
    private LiveBroadcastService $youtube;

    private BrowserBroadcastService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->bridge     = Mockery::mock(StreamingBridgeInterface::class);
        $this->broadcasts = Mockery::mock(LiveBroadcastRepositoryInterface::class);
        $this->youtube    = Mockery::mock(LiveBroadcastService::class);

        $this->service = new BrowserBroadcastService(
            bridge:     $this->bridge,
            broadcasts: $this->broadcasts,
            youtube:    $this->youtube,
            log:        new NullLogger(),
        );

        // Replace DB::transaction with a passthrough so we don't need
        // a real database connection in unit tests.
        DB::shouldReceive('transaction')
            ->andReturnUsing(fn (callable $cb) => $cb());
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * @test
     */
    public function admin_can_open_session(): void
    {
        $broadcast = $this->makeBroadcastWithKey();
        $admin     = $this->makeUser('admin');

        $this->broadcasts->shouldReceive('findOrFail')->andReturn($broadcast);
        $this->bridge->shouldReceive('createSession')->andReturn($this->expectedSession());

        $session = $this->service->openSession('bc-1', $admin);

        self::assertSame('https://global-live.mux.com/api/v1/whip/sk-1', $session->whipUrl);
    }

    /**
     * @test
     */
    public function organizer_can_open_session_for_their_tournament(): void
    {
        $broadcast = $this->makeBroadcastWithKey(organizerId: 42);
        $organizer = $this->makeUser('organizer', id: 42);

        $this->broadcasts->shouldReceive('findOrFail')->andReturn($broadcast);
        $this->bridge->shouldReceive('createSession')->andReturn($this->expectedSession());

        $session = $this->service->openSession('bc-1', $organizer);

        self::assertSame('mux', $session->provider);
    }

    /**
     * @test
     */
    public function player_cannot_open_session(): void
    {
        $broadcast = $this->makeBroadcastWithKey(organizerId: 42);
        $player    = $this->makeUser('player', id: 99);

        $this->broadcasts->shouldReceive('findOrFail')->andReturn($broadcast);
        $this->bridge->shouldNotReceive('createSession');

        $this->expectException(AuthorizationException::class);
        $this->service->openSession('bc-1', $player);
    }

    /**
     * @test
     */
    public function service_provisions_youtube_when_missing(): void
    {
        $broadcast = $this->makeBroadcastWithKey(streamKey: null);
        $admin     = $this->makeUser('admin');

        $this->broadcasts->shouldReceive('findOrFail')->andReturn($broadcast);

        $this->youtube->shouldReceive('ensureProvisioned')
            ->once()
            ->with($broadcast);

        $this->bridge->shouldReceive('createSession')->andReturn($this->expectedSession());

        $this->service->openSession('bc-1', $admin);
        $this->addToAssertionCount(1);
    }

    /**
     * @test
     */
    public function close_session_delegates_to_bridge(): void
    {
        $broadcast = $this->makeBroadcastWithKey();
        $admin     = $this->makeUser('admin');

        $this->broadcasts->shouldReceive('findOrFail')->andReturn($broadcast);
        $this->bridge->shouldReceive('endSession')->once()->with($broadcast);

        $this->service->closeSession('bc-1', $admin);
        $this->addToAssertionCount(1);
    }

    // ─────────────────────── helpers ─────────────────────────────────────

    private function makeBroadcastWithKey(
        ?string $streamKey = 'yt-key',
        ?int $organizerId = null,
    ): LiveBroadcast {
        $broadcast = Mockery::mock(LiveBroadcast::class)->makePartial();
        $broadcast->setAttribute('id', 'bc-1');
        $broadcast->setAttribute('youtube_stream_key', $streamKey);
        $broadcast->setAttribute('youtube_video_id', 'yt-v-1');
        $broadcast->shouldReceive('refresh')->andReturnSelf();

        if ($organizerId !== null) {
            $tournament = new Tournament();
            $tournament->setAttribute('organizer_id', $organizerId);
            $broadcast->shouldReceive('getAttribute')
                ->with('tournament')
                ->andReturn($tournament);
        } else {
            $broadcast->shouldReceive('getAttribute')
                ->with('tournament')
                ->andReturnNull();
        }

        return $broadcast;
    }

    private function makeUser(string $role, int $id = 1): User
    {
        $user = new User();
        $user->setAttribute('id', $id);
        $user->setAttribute('role', $role);
        return $user;
    }

    private function expectedSession(): BrowserBroadcastSession
    {
        return new BrowserBroadcastSession(
            broadcastId: 'bc-1',
            whipUrl:     'https://global-live.mux.com/api/v1/whip/sk-1',
            whipToken:   null,
            playbackUrl: 'https://stream.mux.com/pb-1.m3u8',
            watchUrl:    'https://www.youtube.com/watch?v=yt-v-1',
            expiresAt:   new DateTimeImmutable('+5 minutes'),
            provider:    'mux',
        );
    }
}
