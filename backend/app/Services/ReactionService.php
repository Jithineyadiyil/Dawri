<?php

declare(strict_types=1);

namespace App\Services;

use App\Events\ReactionAdded;
use App\Events\ReactionRemoved;
use App\Models\Message;
use App\Models\MessageReaction;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

/**
 * Emoji reactions on messages. Idempotent: re-acting with the same
 * emoji is a no-op (returns existing row).
 */
final class ReactionService
{
    /** Hard cap on distinct emoji per user per message to deter abuse. */
    public const MAX_REACTIONS_PER_USER_PER_MESSAGE = 10;

    public function __construct(
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * @throws AuthorizationException
     */
    public function react(Message $message, User $user, string $emoji): MessageReaction
    {
        $this->assertCanInteract($message, $user);

        $existing = MessageReaction::where('message_id', $message->id)
            ->where('user_id', $user->id)
            ->where('emoji', $emoji)
            ->first();

        if ($existing !== null) {
            return $existing;
        }

        $count = MessageReaction::where('message_id', $message->id)
            ->where('user_id', $user->id)
            ->count();
        if ($count >= self::MAX_REACTIONS_PER_USER_PER_MESSAGE) {
            throw new AuthorizationException('Reaction limit reached for this message.');
        }

        $reaction = MessageReaction::create([
            'message_id' => $message->id,
            'user_id'    => $user->id,
            'emoji'      => $emoji,
        ]);

        DB::afterCommit(fn () => broadcast(new ReactionAdded(
            channelId: $message->channel_id,
            messageId: $message->id,
            userId: $user->id,
            emoji: $emoji,
        ))->toOthers());

        return $reaction;
    }

    /**
     * @throws AuthorizationException
     */
    public function unreact(Message $message, User $user, string $emoji): bool
    {
        $deleted = (bool) MessageReaction::where('message_id', $message->id)
            ->where('user_id', $user->id)
            ->where('emoji', $emoji)
            ->delete();

        if ($deleted) {
            DB::afterCommit(fn () => broadcast(new ReactionRemoved(
                channelId: $message->channel_id,
                messageId: $message->id,
                userId: $user->id,
                emoji: $emoji,
            ))->toOthers());
        }

        return $deleted;
    }

    /**
     * @throws AuthorizationException
     */
    private function assertCanInteract(Message $message, User $user): void
    {
        $member = $this->members->find($message->channel->community_id, $user->id);
        if ($member === null || $member->isBanned()) {
            throw new AuthorizationException('You are not allowed to interact in this community.');
        }
    }
}
