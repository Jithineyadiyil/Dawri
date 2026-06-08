<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Channel;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\Message;
use App\Models\User;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Services\MessageService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sprint 15 — unit coverage for MessageService.
 *
 * Uses RefreshDatabase rather than mocking the repositories because the
 * service touches several relational invariants (mentions table FKs,
 * soft-delete cascade) that aren't worth mocking faithfully.
 */
final class MessageServiceTest extends TestCase
{
    use RefreshDatabase;

    private MessageService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = $this->app->make(MessageService::class);
    }

    public function test_member_can_post_into_text_channel(): void
    {
        [$user, $channel] = $this->makeChannelAndMember();

        $msg = $this->service->post($channel, $user, 'Hello world');

        $this->assertSame('Hello world', $msg->content);
        $this->assertSame($user->id, $msg->user_id);
        $this->assertSame($channel->id, $msg->channel_id);
        $this->assertDatabaseHas('messages', ['id' => $msg->id, 'deleted_at' => null]);
    }

    public function test_banned_member_cannot_post(): void
    {
        [$user, $channel, $member] = $this->makeChannelAndMember();
        $member->banned_at = now();
        $member->save();

        $this->expectException(AuthorizationException::class);
        $this->service->post($channel, $user, 'should fail');
    }

    public function test_muted_member_cannot_post(): void
    {
        [$user, $channel, $member] = $this->makeChannelAndMember();
        $member->muted_until = now()->addMinutes(10);
        $member->save();

        $this->expectException(AuthorizationException::class);
        $this->service->post($channel, $user, 'should fail');
    }

    public function test_announcement_channel_blocks_regular_members(): void
    {
        [$user, $channel] = $this->makeChannelAndMember(channelType: Channel::TYPE_ANNOUNCEMENT);

        $this->expectException(AuthorizationException::class);
        $this->service->post($channel, $user, 'no can do');
    }

    public function test_moderator_can_post_in_announcement(): void
    {
        [$user, $channel, $member] = $this->makeChannelAndMember(channelType: Channel::TYPE_ANNOUNCEMENT);
        $member->role = CommunityMember::ROLE_MODERATOR;
        $member->save();

        $msg = $this->service->post($channel, $user, 'official news');

        $this->assertSame('official news', $msg->content);
    }

    public function test_author_can_edit_own_message_within_window(): void
    {
        [$user, $channel] = $this->makeChannelAndMember();
        $msg = $this->service->post($channel, $user, 'first draft');

        $updated = $this->service->edit($msg, $user, 'final draft');

        $this->assertSame('final draft', $updated->content);
        $this->assertNotNull($updated->edited_at);
    }

    public function test_author_cannot_edit_after_grace_window(): void
    {
        [$user, $channel] = $this->makeChannelAndMember();
        $msg = $this->service->post($channel, $user, 'first');
        // Travel past the edit window
        $msg->created_at = now()->subMinutes(Message::SELF_EDIT_WINDOW_MINUTES + 1);
        $msg->save();

        $this->expectException(AuthorizationException::class);
        $this->service->edit($msg, $user, 'too late');
    }

    public function test_non_author_cannot_edit(): void
    {
        [$author, $channel] = $this->makeChannelAndMember();
        $msg = $this->service->post($channel, $author, 'mine');

        $other = User::factory()->create();

        $this->expectException(AuthorizationException::class);
        $this->service->edit($msg, $other, 'not mine to edit');
    }

    public function test_moderator_can_delete_any_message(): void
    {
        [$author, $channel] = $this->makeChannelAndMember();
        $msg = $this->service->post($channel, $author, 'controversial');

        $mod = User::factory()->create();
        CommunityMember::create([
            'community_id' => $channel->community_id,
            'user_id'      => $mod->id,
            'role'         => CommunityMember::ROLE_MODERATOR,
            'joined_at'    => now(),
        ]);

        $this->service->delete($msg, $mod);

        $this->assertSoftDeleted('messages', ['id' => $msg->id]);
        $this->assertSame($mod->id, $msg->fresh()->deleted_by);
    }

    public function test_mentions_are_extracted_and_stored(): void
    {
        [$author, $channel] = $this->makeChannelAndMember();
        $mentioned = User::factory()->create(['nickname' => 'shadow_fox']);

        // Add the mentioned user as a community member (mentions only work for members)
        CommunityMember::create([
            'community_id' => $channel->community_id,
            'user_id'      => $mentioned->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);

        $msg = $this->service->post($channel, $author, 'good game @shadow_fox');

        $this->assertDatabaseHas('message_mentions', [
            'message_id'        => $msg->id,
            'mentioned_user_id' => $mentioned->id,
        ]);
    }

    /**
     * @return array{0: User, 1: Channel, 2: CommunityMember}
     */
    private function makeChannelAndMember(string $channelType = Channel::TYPE_TEXT): array
    {
        $community = Community::create([
            'type'      => Community::TYPE_GLOBAL,
            'name'      => 'Test',
            'slug'      => 'test-' . uniqid(),
            'is_active' => true,
        ]);
        $channel = Channel::create([
            'community_id' => $community->id,
            'name'         => 'general',
            'type'         => $channelType,
            'position'     => 0,
        ]);
        $user = User::factory()->create();
        $member = CommunityMember::create([
            'community_id' => $community->id,
            'user_id'      => $user->id,
            'role'         => CommunityMember::ROLE_MEMBER,
            'joined_at'    => now(),
        ]);

        return [$user, $channel, $member];
    }
}
