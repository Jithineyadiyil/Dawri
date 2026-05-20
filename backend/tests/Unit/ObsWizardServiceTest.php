<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\BroadcastSetupLog;
use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\User;
use App\Repositories\Contracts\BroadcastSetupLogRepositoryInterface;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\LiveBroadcastService;
use App\Services\Streaming\ObsWizardService;
use Illuminate\Auth\Access\AuthorizationException;
use InvalidArgumentException;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for ObsWizardService.
 *
 * Pure logic — no Laravel TestCase, no database. All collaborators are mocked.
 */
final class ObsWizardServiceTest extends TestCase
{
    /** @var LiveBroadcastService&MockInterface */
    private $broadcastService;

    /** @var LiveBroadcastRepositoryInterface&MockInterface */
    private $broadcastRepo;

    /** @var BroadcastSetupLogRepositoryInterface&MockInterface */
    private $logs;

    private ObsWizardService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->broadcastService = Mockery::mock(LiveBroadcastService::class);
        $this->broadcastRepo    = Mockery::mock(LiveBroadcastRepositoryInterface::class);
        $this->logs             = Mockery::mock(BroadcastSetupLogRepositoryInterface::class);

        $this->service = new ObsWizardService(
            broadcastService: $this->broadcastService,
            broadcastRepo:    $this->broadcastRepo,
            logs:             $this->logs,
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /* ───────────────── configForBroadcast() ───────────────── */

    public function test_creator_can_load_config_for_their_broadcast(): void
    {
        $creator   = $this->makeUser('user-uuid-1', 'player');
        $broadcast = $this->makeBroadcast(createdBy: 'user-uuid-1');

        $this->logs->shouldReceive('hasCompletedForBroadcast')
            ->once()
            ->with('bc-uuid', 'user-uuid-1')
            ->andReturn(false);

        $cfg = $this->service->configForBroadcast($broadcast, $creator);

        self::assertSame('broadcast', $cfg['scope']);
        self::assertSame('bc-uuid', $cfg['broadcast_id']);
        self::assertTrue($cfg['has_broadcast']);
        self::assertFalse($cfg['is_live']);
        self::assertFalse($cfg['already_completed']);
        self::assertSame('https://www.youtube.com/watch?v=YT123', $cfg['watch_url']);
        self::assertSame('/api/v1/broadcasts/bc-uuid/credentials', $cfg['credentials_url']);
        self::assertSame('/api/v1/broadcasts/bc-uuid/setup-wizard/finish', $cfg['go_live_url']);
        self::assertArrayHasKey('pc_high', $cfg['encoder_profiles']);
    }

    public function test_admin_can_load_config_for_any_broadcast(): void
    {
        $admin     = $this->makeUser('admin-uuid', 'admin');
        $broadcast = $this->makeBroadcast(createdBy: 'someone-else');

        $this->logs->shouldReceive('hasCompletedForBroadcast')->andReturn(false);

        $cfg = $this->service->configForBroadcast($broadcast, $admin);
        self::assertSame('bc-uuid', $cfg['broadcast_id']);
    }

    public function test_other_user_is_denied_broadcast_config(): void
    {
        $intruder  = $this->makeUser('intruder-uuid', 'player');
        $broadcast = $this->makeBroadcast(createdBy: 'someone-else');

        $this->expectException(AuthorizationException::class);
        $this->service->configForBroadcast($broadcast, $intruder);
    }

    /* ───────────────── configForTournament() ───────────────── */

    public function test_organizer_gets_tournament_config_with_active_broadcast(): void
    {
        $organizer  = $this->makeUser('org-uuid', 'organizer');
        $tournament = $this->makeTournament(organizerId: 'org-uuid');
        $broadcast  = $this->makeBroadcast(createdBy: 'org-uuid');

        $this->broadcastRepo->shouldReceive('findByTournament')
            ->once()->with('t-uuid')->andReturn($broadcast);

        $this->logs->shouldReceive('hasCompletedForTournament')
            ->once()->with('t-uuid', 'org-uuid')->andReturn(false);

        $cfg = $this->service->configForTournament($tournament, $organizer);

        self::assertSame('tournament', $cfg['scope']);
        self::assertTrue($cfg['has_broadcast']);
        self::assertSame('bc-uuid', $cfg['broadcast_id']);
        self::assertSame('t-uuid', $cfg['tournament_id']);
        self::assertNull($cfg['create_broadcast_url']);
    }

    public function test_tournament_config_without_broadcast_exposes_create_url(): void
    {
        $organizer  = $this->makeUser('org-uuid', 'organizer');
        $tournament = $this->makeTournament(organizerId: 'org-uuid');

        $this->broadcastRepo->shouldReceive('findByTournament')
            ->once()->andReturnNull();
        $this->logs->shouldReceive('hasCompletedForTournament')->andReturn(false);

        $cfg = $this->service->configForTournament($tournament, $organizer);

        self::assertFalse($cfg['has_broadcast']);
        self::assertNull($cfg['broadcast_id']);
        self::assertSame('/api/v1/tournaments/t-uuid/broadcast', $cfg['create_broadcast_url']);
    }

    public function test_moderator_can_run_tournament_wizard(): void
    {
        $moderator  = $this->makeUser('mod-uuid', 'organizer');
        $tournament = $this->makeTournament(organizerId: 'other', moderatorId: 'mod-uuid');

        $this->broadcastRepo->shouldReceive('findByTournament')->andReturnNull();
        $this->logs->shouldReceive('hasCompletedForTournament')->andReturn(false);

        $cfg = $this->service->configForTournament($tournament, $moderator);
        self::assertSame('tournament', $cfg['scope']);
    }

    public function test_player_cannot_run_tournament_wizard(): void
    {
        $player     = $this->makeUser('p-uuid', 'player');
        $tournament = $this->makeTournament(organizerId: 'other');

        $this->expectException(AuthorizationException::class);
        $this->service->configForTournament($tournament, $player);
    }

    /* ───────────────── logEvent() ───────────────── */

    public function test_log_event_persists_valid_payload(): void
    {
        $user      = $this->makeUser('u-uuid', 'admin');
        $broadcast = $this->makeBroadcast(createdBy: 'u-uuid');
        $fake      = new BroadcastSetupLog();
        $fake->id  = 'log-uuid';
        $fake->event = 'step_completed';

        $this->logs->shouldReceive('record')
            ->once()
            ->with(Mockery::on(static function (array $a): bool {
                return $a['broadcast_id'] === 'bc-uuid'
                    && $a['user_id']      === 'u-uuid'
                    && $a['event']        === 'step_completed'
                    && $a['step_number']  === 3
                    && $a['platform']     === 'windows'
                    && $a['source']       === 'obs';
            }))
            ->andReturn($fake);

        $r = $this->service->logEvent($broadcast, null, $user, 'step_completed', 3, 'windows', ['foo' => 'bar']);
        self::assertSame('log-uuid', $r->id);
    }

    public function test_log_event_requires_broadcast_or_tournament(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/At least one of/');

        $this->service->logEvent(null, null, $this->makeUser('u', 'admin'), 'step_viewed');
    }

    public function test_log_event_rejects_invalid_event_code(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->service->logEvent(
            $this->makeBroadcast('u'), null, $this->makeUser('u', 'admin'), 'nope'
        );
    }

    public function test_log_event_rejects_step_out_of_range(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->service->logEvent(
            $this->makeBroadcast('u'), null, $this->makeUser('u', 'admin'),
            'step_viewed', stepNumber: 99
        );
    }

    public function test_log_event_strips_secret_keys_from_metadata(): void
    {
        $this->logs->shouldReceive('record')
            ->once()
            ->with(Mockery::on(static function (array $a): bool {
                $m = $a['metadata'] ?? [];
                return ! array_key_exists('stream_key', $m)
                    && ! array_key_exists('token', $m)
                    && ! array_key_exists('rtmp_url', $m)
                    && array_key_exists('safe', $m);
            }))
            ->andReturn(new BroadcastSetupLog());

        $this->service->logEvent(
            $this->makeBroadcast('u'), null, $this->makeUser('u', 'admin'),
            'step_completed', null, null,
            ['stream_key' => 'leak', 'token' => 'leak', 'rtmp_url' => 'leak', 'safe' => 'kept']
        );
    }

    public function test_log_event_normalises_invalid_platform_to_unknown(): void
    {
        $this->logs->shouldReceive('record')
            ->once()
            ->with(Mockery::on(static fn (array $a): bool => $a['platform'] === 'unknown'))
            ->andReturn(new BroadcastSetupLog());

        $this->service->logEvent(
            $this->makeBroadcast('u'), null, $this->makeUser('u', 'admin'),
            'wizard_opened', null, 'plan9'
        );
    }

    /* ───────────────── finishAndGoLive() ───────────────── */

    public function test_finish_calls_go_live_and_logs_completion(): void
    {
        $creator   = $this->makeUser('u-uuid', 'player');
        $broadcast = $this->makeBroadcast(createdBy: 'u-uuid');

        $live = new LiveBroadcast();
        $live->id = 'bc-uuid';
        $live->status = LiveBroadcast::STATUS_LIVE;

        $this->broadcastService->shouldReceive('goLive')
            ->once()->with($broadcast)->andReturn($live);
        $this->logs->shouldReceive('record')->once()->andReturn(new BroadcastSetupLog());

        $result = $this->service->finishAndGoLive($broadcast, $creator);
        self::assertSame('live', $result->status);
    }

    public function test_finish_denies_non_creator(): void
    {
        $intruder = $this->makeUser('intruder', 'player');
        $broadcast = $this->makeBroadcast(createdBy: 'someone-else');

        $this->expectException(AuthorizationException::class);
        $this->service->finishAndGoLive($broadcast, $intruder);
    }

    /* ───────────────── Helpers ───────────────── */

    private function makeUser(string $id, string $role): User
    {
        $u = new User();
        $u->id   = $id;
        $u->role = $role;
        return $u;
    }

    private function makeTournament(string $organizerId, ?string $moderatorId = null): Tournament
    {
        $t = new Tournament();
        $t->id            = 't-uuid';
        $t->name          = 'EA FC Cup';
        $t->organizer_id  = $organizerId;
        $t->moderator_id  = $moderatorId;
        return $t;
    }

    private function makeBroadcast(string $createdBy): LiveBroadcast
    {
        $b = new LiveBroadcast();
        $b->id              = 'bc-uuid';
        $b->tournament_id   = 't-uuid';
        $b->created_by      = $createdBy;
        $b->status          = LiveBroadcast::STATUS_READY;
        $b->source          = LiveBroadcast::SOURCE_OBS;
        $b->watch_url       = 'https://www.youtube.com/watch?v=YT123';
        $b->embed_url       = 'https://www.youtube.com/embed/YT123';
        return $b;
    }
}
