<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Subscription;
use App\Models\Tournament;
use App\Models\User;
use App\Services\BrandingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sprint 3 — BrandingService resolution order, plan gating, endpoint access.
 */
class BrandingTest extends TestCase
{
    use RefreshDatabase;

    public function test_platform_defaults_used_when_no_plan(): void
    {
        $user       = User::factory()->create(['role' => 'player']);
        $tournament = Tournament::factory()->create(['organizer_id' => $user->id]);

        $brand = app(BrandingService::class)->forTournament($tournament);

        $this->assertSame(BrandingService::PLATFORM_DEFAULTS['primary_color'], $brand['primary_color']);
        $this->assertSame('platform', $brand['source']);
    }

    public function test_company_branding_applied_when_plan_qualifies(): void
    {
        $company = Company::factory()->create([
            'primary_color' => '#ff0066',
            'font_family'   => 'Orbitron, sans-serif',
        ]);
        Subscription::factory()->create([
            'company_id' => $company->id,
            'status'     => 'active',
            'plan'       => 'professional',
        ]);
        $organizer  = User::factory()->create(['role' => 'organizer', 'company_id' => $company->id]);
        $tournament = Tournament::factory()->create([
            'organizer_id' => $organizer->id,
            'company_id'   => $company->id,
        ]);

        $brand = app(BrandingService::class)->forTournament($tournament->fresh(['organizer.company', 'company']));

        $this->assertSame('#ff0066', $brand['primary_color']);
        $this->assertSame('Orbitron, sans-serif', $brand['font_family']);
        $this->assertSame('company', $brand['source']);
    }

    public function test_tournament_override_wins_when_enabled(): void
    {
        $company = Company::factory()->create(['primary_color' => '#ff0066']);
        Subscription::factory()->create([
            'company_id' => $company->id,
            'status'     => 'active',
            'plan'       => 'enterprise',
        ]);
        $organizer  = User::factory()->create(['role' => 'organizer', 'company_id' => $company->id]);
        $tournament = Tournament::factory()->create([
            'organizer_id'   => $organizer->id,
            'company_id'     => $company->id,
            'brand_override' => true,
            'primary_color'  => '#00ff88',
        ]);

        $brand = app(BrandingService::class)->forTournament($tournament->fresh(['organizer.company', 'company']));

        $this->assertSame('#00ff88', $brand['primary_color']);
        $this->assertSame('tournament', $brand['source']);
    }

    public function test_branding_endpoint_rejects_free_plan(): void
    {
        $user = User::factory()->create(['role' => 'organizer']);
        $tournament = Tournament::factory()->create(['organizer_id' => $user->id]);

        $this->actingAs($user, 'sanctum')
            ->patchJson("/api/v1/tournaments/{$tournament->id}/brand", [
                'brand_override' => true,
                'primary_color'  => '#ff0066',
            ])
            ->assertForbidden()
            ->assertJsonPath('required_plans', ['professional', 'enterprise']);
    }
}
