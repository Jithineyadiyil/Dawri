<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Community;
use App\Models\Tournament;
use App\Models\User;
use App\Services\CommunityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

final class CommunityServiceTest extends TestCase
{
    use RefreshDatabase;

    private CommunityService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = $this->app->make(CommunityService::class);
    }

    public function test_ensure_global_community_is_idempotent(): void
    {
        $first  = $this->service->ensureGlobalCommunity();
        $second = $this->service->ensureGlobalCommunity();

        $this->assertSame($first->id, $second->id);
        $this->assertSame(Community::GLOBAL_SLUG, $first->slug);
        $this->assertSame(
            count(CommunityService::GLOBAL_DEFAULT_CHANNELS),
            $first->channels()->count()
        );
    }

    public function test_ensure_tournament_community_creates_unique_room_with_organizer_as_owner(): void
    {
        $organizer  = User::factory()->create();
        $tournament = $this->makeTournament(['organizer_id' => $organizer->id]);

        $community = $this->service->ensureTournamentCommunity($tournament);

        $this->assertSame(Community::TYPE_TOURNAMENT, $community->type);
        $this->assertSame($tournament->id, $community->tournament_id);
        $this->assertStringStartsWith('tour-', $community->slug);
        $this->assertDatabaseHas('community_members', [
            'community_id' => $community->id,
            'user_id'      => $organizer->id,
            'role'         => 'owner',
        ]);
    }

    public function test_join_tournament_community_adds_member(): void
    {
        $organizer = User::factory()->create();
        $player    = User::factory()->create();
        $tournament = $this->makeTournament(['organizer_id' => $organizer->id]);

        $this->service->ensureTournamentCommunity($tournament);
        $this->service->joinTournamentCommunity($tournament, $player);

        $this->assertDatabaseHas('community_members', [
            'user_id' => $player->id,
            'role'    => 'member',
        ]);
    }

    public function test_archive_tournament_community_sets_archived_at(): void
    {
        $tournament = $this->makeTournament();
        $community  = $this->service->ensureTournamentCommunity($tournament);

        $this->service->archiveTournamentCommunity($tournament);

        $this->assertNotNull($community->fresh()->archived_at);
        $this->assertFalse((bool) $community->fresh()->is_active);
    }

    /**
     * Tournament factory does not exist in the Dawri repo (as of Sprint 14),
     * so we construct the model directly with only the fields Sprint 15 reads.
     * Add more columns here if your tournaments table requires NOT NULL on them.
     */
    private function makeTournament(array $overrides = []): Tournament
    {
        $organizer = $overrides['organizer_id'] ?? User::factory()->create()->id;

        return Tournament::create(array_merge([
            'id'           => (string) Str::uuid(),
            'name'         => 'Sprint 15 Test Tournament ' . Str::random(6),
            'organizer_id' => $organizer,
            'status'       => 'draft',
        ], $overrides));
    }
}
