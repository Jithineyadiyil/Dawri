<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Channel;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\Tournament;
use App\Models\User;
use App\Services\CommunityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sprint 15 — verifies the TournamentObserver auto-provisions a private
 * community room (and its default channels + owner membership) when a
 * tournament is created, and that the owner membership row — the exact write
 * that was throwing ArgumentCountError — now persists correctly.
 */
final class TournamentCommunityProvisioningTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Happy path: creating a tournament provisions its community via the observer.
     */
    public function test_creating_a_tournament_provisions_its_community(): void
    {
        $organizer = User::factory()->create();

        $tournament = Tournament::create([
            'name'             => 'Sprint 15 Smoke Test',
            'game'             => 'ea_fc_25',
            'format'           => 'single_elimination',
            'max_participants' => 8,
            'organizer_id'     => $organizer->id,
            'status'           => 'draft',
            'is_public'        => true,
            'entry_fee_sar'    => 0,
            'timezone'         => 'Asia/Riyadh',
        ]);

        $community = Community::where('tournament_id', $tournament->id)->first();

        self::assertNotNull(
            $community,
            'Observer should have provisioned a community for the new tournament.'
        );
        self::assertSame(Community::TYPE_TOURNAMENT, $community->type);
        self::assertTrue($community->is_active);
    }

    /**
     * The owner membership row — the write that previously threw
     * ArgumentCountError on the composite-PK pivot — must persist.
     */
    public function test_organizer_is_attached_as_owner(): void
    {
        $organizer  = User::factory()->create();
        $tournament = $this->makeTournament($organizer->id);

        $community = Community::where('tournament_id', $tournament->id)->firstOrFail();

        $membership = CommunityMember::query()
            ->where('community_id', $community->id)
            ->where('user_id', $organizer->id)
            ->first();

        self::assertNotNull($membership, 'Organizer membership row must be written.');
        self::assertSame(CommunityMember::ROLE_OWNER, $membership->role);
    }

    /**
     * Default tournament channels are created alongside the community.
     */
    public function test_default_channels_are_created(): void
    {
        $tournament = $this->makeTournament(User::factory()->create()->id);
        $community  = Community::where('tournament_id', $tournament->id)->firstOrFail();

        $channelNames = Channel::where('community_id', $community->id)
            ->pluck('name')
            ->all();

        foreach (['general', 'matches', 'rules'] as $expected) {
            self::assertContains($expected, $channelNames);
        }
    }

    /**
     * Idempotency: invoking provisioning twice must not duplicate the community.
     */
    public function test_provisioning_is_idempotent(): void
    {
        $tournament = $this->makeTournament(User::factory()->create()->id);

        // First provisioning already ran via the observer on create().
        app(CommunityService::class)->ensureTournamentCommunity($tournament->fresh());

        $count = Community::where('tournament_id', $tournament->id)->count();

        self::assertSame(1, $count, 'Re-provisioning must not create a second community.');
    }

    /**
     * Edge case: a tournament with no organizer still provisions a community,
     * just without an owner membership row.
     */
    public function test_tournament_without_organizer_still_provisions_community(): void
    {
        $tournament = Tournament::create([
            'name'             => 'Orphan Tournament',
            'game'             => 'pubg_mobile',
            'format'           => 'round_robin',
            'max_participants' => 8,
            'organizer_id'     => null,
            'status'           => 'draft',
            'is_public'        => true,
            'entry_fee_sar'    => 0,
            'timezone'         => 'Asia/Riyadh',
        ]);

        $community = Community::where('tournament_id', $tournament->id)->first();

        self::assertNotNull($community);
        self::assertSame(
            0,
            CommunityMember::where('community_id', $community->id)->count(),
            'No organizer means no owner membership row.'
        );
    }

    /**
     * Helper: create a tournament with sane defaults and return it fresh.
     */
    private function makeTournament(string $organizerId): Tournament
    {
        return Tournament::create([
            'name'             => 'Test Tournament',
            'game'             => 'ea_fc_25',
            'format'           => 'single_elimination',
            'max_participants' => 8,
            'organizer_id'     => $organizerId,
            'status'           => 'draft',
            'is_public'        => true,
            'entry_fee_sar'    => 0,
            'timezone'         => 'Asia/Riyadh',
        ]);
    }
}
