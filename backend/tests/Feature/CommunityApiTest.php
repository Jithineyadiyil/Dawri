<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Channel;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use App\Services\CommunityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class CommunityApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed the global community for every test
        $this->app->make(CommunityService::class)->ensureGlobalCommunity();
    }

    public function test_index_returns_only_communities_user_belongs_to(): void
    {
        $user = User::factory()->create();
        $globalCommunity = Community::where('type', Community::TYPE_GLOBAL)->first();

        // User is a member of global only
        CommunityMember::create([
            'community_id' => $globalCommunity->id,
            'user_id'      => $user->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);

        // A separate tournament community user is NOT in
        Community::create([
            'type'      => Community::TYPE_TOURNAMENT,
            'name'      => 'Other',
            'slug'      => 'tour-other',
            'is_active' => true,
        ]);

        Sanctum::actingAs($user);
        $resp = $this->getJson('/api/v1/communities');

        $resp->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', Community::GLOBAL_SLUG);
    }

    public function test_show_returns_404_for_non_members(): void
    {
        $user = User::factory()->create();
        // No membership

        Sanctum::actingAs($user);
        $this->getJson('/api/v1/communities/' . Community::GLOBAL_SLUG)
            ->assertNotFound();
    }

    public function test_show_returns_community_with_channels_for_member(): void
    {
        $user = User::factory()->create();
        $global = Community::where('type', Community::TYPE_GLOBAL)->first();
        CommunityMember::create([
            'community_id' => $global->id,
            'user_id'      => $user->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);

        Sanctum::actingAs($user);
        $resp = $this->getJson('/api/v1/communities/' . Community::GLOBAL_SLUG);

        $resp->assertOk()
            ->assertJsonPath('data.slug', Community::GLOBAL_SLUG)
            ->assertJsonStructure(['data' => ['id', 'name', 'slug', 'channels']]);
    }

    public function test_cannot_leave_global_community(): void
    {
        $user = User::factory()->create();
        $global = Community::where('type', Community::TYPE_GLOBAL)->first();
        CommunityMember::create([
            'community_id' => $global->id,
            'user_id'      => $user->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);

        Sanctum::actingAs($user);
        $this->postJson("/api/v1/communities/{$global->id}/leave")
            ->assertForbidden();
    }

    public function test_unauthenticated_requests_are_rejected(): void
    {
        $this->getJson('/api/v1/communities')->assertUnauthorized();
    }
}
