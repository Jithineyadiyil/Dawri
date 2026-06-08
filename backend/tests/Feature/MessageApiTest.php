<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Channel;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class MessageApiTest extends TestCase
{
    use RefreshDatabase;

    private Community $community;
    private Channel $channel;
    private User $member;

    protected function setUp(): void
    {
        parent::setUp();
        $this->community = Community::create([
            'type'      => Community::TYPE_GLOBAL,
            'name'      => 'Test',
            'slug'      => 'test-community',
            'is_active' => true,
        ]);
        $this->channel = Channel::create([
            'community_id' => $this->community->id,
            'name'         => 'general',
            'type'         => Channel::TYPE_TEXT,
            'position'     => 0,
        ]);
        $this->member = User::factory()->create();
        CommunityMember::create([
            'community_id' => $this->community->id,
            'user_id'      => $this->member->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);
    }

    public function test_member_can_post_message(): void
    {
        Sanctum::actingAs($this->member);

        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", [
            'content' => 'Hello community',
        ])
        ->assertCreated()
        ->assertJsonPath('data.content', 'Hello community')
        ->assertJsonPath('data.author.is_self', true);
    }

    public function test_validation_rejects_empty_message(): void
    {
        Sanctum::actingAs($this->member);

        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", [
            'content' => '',
        ])->assertUnprocessable();
    }

    public function test_validation_rejects_oversized_message(): void
    {
        Sanctum::actingAs($this->member);

        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", [
            'content' => str_repeat('a', 4001),
        ])->assertUnprocessable();
    }

    public function test_non_member_cannot_post(): void
    {
        $outsider = User::factory()->create();
        Sanctum::actingAs($outsider);

        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", [
            'content' => 'sneak attack',
        ])->assertForbidden();
    }

    public function test_feed_returns_messages_newest_first(): void
    {
        Sanctum::actingAs($this->member);

        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'first']);
        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'second']);
        $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'third']);

        $resp = $this->getJson("/api/v1/channels/{$this->channel->id}/messages");

        $resp->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.content', 'third'); // newest first
    }

    public function test_author_can_edit_within_window(): void
    {
        Sanctum::actingAs($this->member);

        $post = $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'oops']);
        $id = $post->json('data.id');

        $this->patchJson("/api/v1/messages/{$id}", ['content' => 'fixed'])
            ->assertOk()
            ->assertJsonPath('data.content', 'fixed')
            ->assertJsonPath('data.is_deleted', false);
    }

    public function test_author_can_soft_delete_own_message(): void
    {
        Sanctum::actingAs($this->member);

        $post = $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'oops']);
        $id = $post->json('data.id');

        $this->deleteJson("/api/v1/messages/{$id}")->assertOk();

        $resp = $this->getJson("/api/v1/channels/{$this->channel->id}/messages");
        // Soft-deleted rows are hidden by the `visible()` scope used in MessageRepository::feed()
        $resp->assertJsonCount(0, 'data');
    }

    public function test_emoji_reaction_round_trip(): void
    {
        Sanctum::actingAs($this->member);
        $post = $this->postJson("/api/v1/channels/{$this->channel->id}/messages", ['content' => 'fire post']);
        $id = $post->json('data.id');

        $this->postJson("/api/v1/messages/{$id}/reactions", ['emoji' => '🔥'])->assertCreated();

        $feed = $this->getJson("/api/v1/channels/{$this->channel->id}/messages");
        $reactions = $feed->json('data.0.reactions');
        $this->assertCount(1, $reactions);
        $this->assertSame('🔥', $reactions[0]['emoji']);

        $this->deleteJson("/api/v1/messages/{$id}/reactions/" . urlencode('🔥'))->assertOk();
    }
}
