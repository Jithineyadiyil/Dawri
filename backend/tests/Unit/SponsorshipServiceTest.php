<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Sponsor;
use App\Models\Sponsorship;
use App\Services\SponsorshipService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use InvalidArgumentException;
use RuntimeException;
use Tests\TestCase;

/**
 * Unit tests for SponsorshipService. Covers the business rules defined in
 * the guards and the state transitions (draft → active → fulfilled).
 *
 * Note: Tournament model does not currently have HasFactory, so this test
 * creates tournament + organizer rows via raw DB inserts. The test only
 * needs a valid UUID that satisfies the tournament_id FK constraint.
 */
class SponsorshipServiceTest extends TestCase
{
    use RefreshDatabase;

    private SponsorshipService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(SponsorshipService::class);
    }

    public function test_creates_cash_sponsorship_in_draft_state(): void
    {
        $sponsor       = Sponsor::factory()->create();
        $tournamentId  = $this->makeTournamentId();

        $sponsorship = $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 5000,
        ]);

        $this->assertEquals('draft', $sponsorship->contract_status);
        $this->assertEquals(5000, $sponsorship->cash_amount_sar);
    }

    public function test_cannot_create_cash_sponsorship_without_amount(): void
    {
        $sponsor      = Sponsor::factory()->create();
        $tournamentId = $this->makeTournamentId();

        $this->expectException(InvalidArgumentException::class);

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 0,
        ]);
    }

    public function test_cannot_create_in_kind_without_description(): void
    {
        $sponsor      = Sponsor::factory()->create();
        $tournamentId = $this->makeTournamentId();

        $this->expectException(InvalidArgumentException::class);

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'in_kind',
        ]);
    }

    public function test_logo_only_sponsorship_rejects_cash(): void
    {
        $sponsor      = Sponsor::factory()->create();
        $tournamentId = $this->makeTournamentId();

        $this->expectException(InvalidArgumentException::class);

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'logo',
            'cash_amount_sar'   => 100,
        ]);
    }

    public function test_only_one_title_sponsor_per_tournament(): void
    {
        $tournamentId = $this->makeTournamentId();
        $sponsorA = Sponsor::factory()->create();
        $sponsorB = Sponsor::factory()->create();

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsorA->id,
            'placement_type'    => 'title',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 10000,
        ]);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('title sponsor already exists');

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsorB->id,
            'placement_type'    => 'title',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 5000,
        ]);
    }

    public function test_multiple_supporting_sponsors_allowed(): void
    {
        $tournamentId = $this->makeTournamentId();
        $a = Sponsor::factory()->create();
        $b = Sponsor::factory()->create();
        $c = Sponsor::factory()->create();

        foreach ([$a, $b, $c] as $s) {
            $this->service->create([
                'tournament_id'     => $tournamentId,
                'sponsor_id'        => $s->id,
                'placement_type'    => 'supporting',
                'contribution_type' => 'cash',
                'cash_amount_sar'   => 1000,
            ]);
        }

        $this->assertEquals(3, Sponsorship::where('tournament_id', $tournamentId)->count());
    }

    public function test_inactive_sponsor_rejected(): void
    {
        $sponsor      = Sponsor::factory()->inactive()->create();
        $tournamentId = $this->makeTournamentId();

        $this->expectException(InvalidArgumentException::class);

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 500,
        ]);
    }

    public function test_activate_sets_status_and_timestamp(): void
    {
        $sponsorship = $this->createDraftSponsorship();
        $this->assertEquals('draft', $sponsorship->contract_status);

        $this->service->activate($sponsorship);

        $sponsorship->refresh();
        $this->assertEquals('active', $sponsorship->contract_status);
        $this->assertNotNull($sponsorship->activated_at);
    }

    public function test_fulfill_requires_active_state(): void
    {
        $sponsorship = $this->createDraftSponsorship();

        $this->expectException(RuntimeException::class);
        $this->service->fulfill($sponsorship);
    }

    public function test_full_lifecycle_draft_to_fulfilled(): void
    {
        $sponsorship = $this->createDraftSponsorship();
        $this->service->activate($sponsorship);
        $this->service->fulfill($sponsorship);

        $sponsorship->refresh();
        $this->assertEquals('fulfilled', $sponsorship->contract_status);
        $this->assertNotNull($sponsorship->fulfilled_at);
    }

    public function test_cancel_records_reason_in_notes(): void
    {
        $sponsorship = $this->createDraftSponsorship();

        $this->service->cancel($sponsorship, 'Sponsor pulled out');

        $sponsorship->refresh();
        $this->assertEquals('cancelled', $sponsorship->contract_status);
        $this->assertStringContainsString('Sponsor pulled out', $sponsorship->notes);
    }

    public function test_summarize_for_tournament_computes_prize_pool(): void
    {
        $tournamentId = $this->makeTournamentId();
        $title = Sponsor::factory()->create(['name' => 'TitleCo']);
        $pres  = Sponsor::factory()->create(['name' => 'PresentCo']);
        $supp  = Sponsor::factory()->create(['name' => 'SupportCo']);

        $titleSp = $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $title->id,
            'placement_type'    => 'title',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 50000,
        ]);
        $presSp = $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $pres->id,
            'placement_type'    => 'presenting',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 20000,
        ]);
        $suppSp = $this->service->create([
            'tournament_id'         => $tournamentId,
            'sponsor_id'            => $supp->id,
            'placement_type'        => 'supporting',
            'contribution_type'     => 'in_kind',
            'in_kind_description'   => '10 gaming keyboards',
            'in_kind_value_sar'     => 5000,
        ]);

        $this->service->activate($titleSp);
        $this->service->activate($presSp);
        $this->service->activate($suppSp);

        $tournament = \App\Models\Tournament::find($tournamentId);
        $summary = $this->service->summarizeForTournament($tournament);

        $this->assertEquals(70000, $summary['total_cash_sar']);
        $this->assertEquals(5000,  $summary['total_in_kind_value_sar']);
        $this->assertEquals(75000, $summary['total_pool_sar']);
        $this->assertEquals('TitleCo', $summary['title_sponsor']['name']);
        $this->assertCount(1, $summary['presenting_sponsors']);
        $this->assertCount(1, $summary['supporting_sponsors']);
    }

    public function test_draft_sponsorships_excluded_from_summary(): void
    {
        $tournamentId = $this->makeTournamentId();
        $sponsor      = Sponsor::factory()->create();

        $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'title',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 10000,
        ]); // stays in draft

        $tournament = \App\Models\Tournament::find($tournamentId);
        $summary = $this->service->summarizeForTournament($tournament);

        $this->assertEquals(0, $summary['total_pool_sar']);
        $this->assertNull($summary['title_sponsor']);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    /**
     * Create a valid organizer user directly via DB insert, bypassing
     * the missing UserFactory dependency chain in test environments.
     */
    private function makeOrganizerId(): string
    {
        $id = (string) Str::uuid();
        $suffix = Str::random(10);

        DB::table('users')->insert([
            'id'         => $id,
            'name'       => 'Test Organizer ' . $suffix,
            'email'      => "org-{$suffix}@test.local",
            'password'   => '$2y$10$abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUV',
            'role'       => 'organizer',
            'active'     => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $id;
    }

    /**
     * Create a minimal valid tournament row directly via DB insert.
     * Returns the tournament UUID so tests can use it as a foreign key.
     */
    private function makeTournamentId(): string
    {
        $id          = (string) Str::uuid();
        $organizerId = $this->makeOrganizerId();

        DB::table('tournaments')->insert([
            'id'               => $id,
            'name'             => 'Test Tournament ' . Str::random(6),
            'name_ar'          => null,
            'game'             => 'ea_fc25',
            'format'           => 'single_elimination',
            'max_participants' => 16,
            'is_public'        => true,
            'entry_fee_sar'    => 0,
            'timezone'         => 'Asia/Riyadh',
            'organizer_id'     => $organizerId,
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        return $id;
    }

    private function createDraftSponsorship(): Sponsorship
    {
        $sponsor      = Sponsor::factory()->create();
        $tournamentId = $this->makeTournamentId();

        return $this->service->create([
            'tournament_id'     => $tournamentId,
            'sponsor_id'        => $sponsor->id,
            'placement_type'    => 'supporting',
            'contribution_type' => 'cash',
            'cash_amount_sar'   => 1000,
        ]);
    }
}
