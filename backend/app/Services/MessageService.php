<?php

declare(strict_types=1);

namespace App\Services;

use App\Events\MessageDeleted;
use App\Events\MessageEdited;
use App\Events\MessagePosted;
use App\Models\Channel;
use App\Models\Message;
use App\Models\MessageMention;
use App\Models\User;
use App\Notifications\UserMentionedNotification;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

/**
 * Heart of Sprint 15 — message lifecycle: post, edit, soft-delete, pin.
 *
 * All writes happen inside a DB transaction so a half-posted message
 * (e.g. content saved but mentions failed) cannot exist. Events fire
 * AFTER the transaction commits via DB::afterCommit() so subscribers
 * never see a row that's about to be rolled back.
 */
final class MessageService
{
    public function __construct(
        private readonly MessageRepositoryInterface $messages,
        private readonly ChannelRepositoryInterface $channels,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * Post a new message into a channel.
     *
     * @throws AuthorizationException When the user is banned, muted, or
     *         the channel is announcement-only and the user is not a moderator.
     * @throws ValidationException    When the channel does not exist.
     */
    public function post(Channel $channel, User $author, string $content): Message
    {
        $this->assertCanPost($channel, $author);

        $cleanContent = $this->sanitize($content);
        $mentionedUserIds = $this->extractMentionedUserIds($cleanContent, $channel);

        $message = DB::transaction(function () use ($channel, $author, $cleanContent, $mentionedUserIds) {
            $msg = $this->messages->create([
                'channel_id' => $channel->id,
                'user_id'    => $author->id,
                'content'    => $cleanContent,
            ]);

            if ($mentionedUserIds !== []) {
                $rows = array_map(
                    fn (string $uid) => [
                        'id'                => (string) \Illuminate\Support\Str::uuid(),
                        'message_id'        => $msg->id,
                        'mentioned_user_id' => $uid,
                        'created_at'        => now(),
                    ],
                    $mentionedUserIds
                );
                MessageMention::insert($rows);
            }

            // Defer side-effects until after commit so a rollback can't
            // leak a half-baked notification.
            DB::afterCommit(function () use ($msg, $mentionedUserIds, $channel): void {
                $msg->load(['author', 'reactions', 'mentions']);
                broadcast(new MessagePosted($msg))->toOthers();

                if ($mentionedUserIds !== []) {
                    $this->notifyMentioned($msg, $channel, $mentionedUserIds);
                }
            });

            return $msg;
        });

        return $message->fresh(['author', 'reactions', 'mentions']);
    }

    /**
     * Edit an existing message. Author-only and only inside the grace window.
     *
     * @throws AuthorizationException
     */
    public function edit(Message $message, User $editor, string $newContent): Message
    {
        if ($message->user_id !== $editor->id) {
            throw new AuthorizationException('Only the author can edit a message.');
        }
        if (! $message->isWithinEditWindow()) {
            throw new AuthorizationException(sprintf(
                'Edits are allowed only within %d minutes of posting.',
                Message::SELF_EDIT_WINDOW_MINUTES
            ));
        }

        $updated = $this->messages->update($message, [
            'content'   => $this->sanitize($newContent),
            'edited_at' => now(),
        ]);

        DB::afterCommit(fn () => broadcast(new MessageEdited($updated))->toOthers());

        return $updated;
    }

    /**
     * Soft-delete a message. Authors can delete their own anytime;
     * moderators can delete anyone's.
     *
     * @throws AuthorizationException
     */
    public function delete(Message $message, User $actor): void
    {
        $isAuthor = $message->user_id === $actor->id;
        $isModerator = $this->isModerator($message->channel->community_id, $actor->id);

        if (! $isAuthor && ! $isModerator) {
            throw new AuthorizationException('Only the author or a moderator can delete this message.');
        }

        $this->messages->softDelete($message, $actor->id);

        DB::afterCommit(fn () => broadcast(new MessageDeleted(
            channelId: $message->channel_id,
            messageId: $message->id,
            deletedByModerator: ! $isAuthor,
        )));
    }

    /**
     * Pin / unpin a message. Moderators only.
     *
     * @throws AuthorizationException
     */
    public function setPinned(Message $message, User $actor, bool $pinned): Message
    {
        if (! $this->isModerator($message->channel->community_id, $actor->id)) {
            throw new AuthorizationException('Only moderators can pin messages.');
        }

        return $this->messages->update($message, [
            'is_pinned' => $pinned,
            'pinned_at' => $pinned ? now() : null,
            'pinned_by' => $pinned ? $actor->id : null,
        ]);
    }

    /* ------------------------------------------------------------------ *
     *  Internal helpers
     * ------------------------------------------------------------------ */

    /**
     * @throws AuthorizationException
     */
    private function assertCanPost(Channel $channel, User $user): void
    {
        $member = $this->members->find($channel->community_id, $user->id);

        if ($member === null) {
            throw new AuthorizationException('You are not a member of this community.');
        }
        if ($member->isBanned()) {
            throw new AuthorizationException('You are banned from this community.');
        }
        if ($member->isMuted()) {
            throw new AuthorizationException(sprintf(
                'You are muted until %s.',
                $member->muted_until->toDayDateTimeString()
            ));
        }
        if ($channel->isAnnouncement() && ! $member->canModerate()) {
            throw new AuthorizationException('Only moderators can post in announcement channels.');
        }
    }

    private function isModerator(string $communityId, string $userId): bool
    {
        $member = $this->members->find($communityId, $userId);
        return $member !== null && $member->canModerate();
    }

    /**
     * Strip control chars + collapse runaway whitespace. We deliberately
     * preserve user-entered newlines and emoji.
     */
    private function sanitize(string $content): string
    {
        // Remove only ASCII control chars except \n and \t
        $content = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $content) ?? '';
        // Collapse 3+ blank lines into 2
        $content = preg_replace("/\n{3,}/", "\n\n", $content) ?? $content;
        return trim($content);
    }

    /**
     * Find every "@nickname" in the content, resolve to user IDs that
     * are actually members of the channel's community (no leaking
     * outside members), and return the unique list.
     *
     * @return list<string>
     */
    private function extractMentionedUserIds(string $content, Channel $channel): array
    {
        if (! preg_match_all('/@([a-zA-Z0-9_.\-]{2,32})/', $content, $matches)) {
            return [];
        }

        $nicknames = array_unique($matches[1] ?? []);
        if ($nicknames === []) {
            return [];
        }

        return User::query()
            ->whereIn('nickname', $nicknames)
            ->whereHas('communities', fn ($q) => $q->where('communities.id', $channel->community_id))
            ->pluck('id')
            ->all();
    }

    /**
     * @param  list<string>  $mentionedUserIds
     */
    private function notifyMentioned(Message $message, Channel $channel, array $mentionedUserIds): void
    {
        try {
            $users = User::query()->whereIn('id', $mentionedUserIds)->get();
            Notification::send($users, new UserMentionedNotification(
                messageId: $message->id,
                channelId: $channel->id,
                communityId: $channel->community_id,
                authorNickname: $message->author->nickname ?? 'A user',
                snippet: \Illuminate\Support\Str::limit($message->content, 140),
            ));
        } catch (\Throwable $e) {
            // Notifications are best-effort — never fail the message post.
            Log::warning('Mention notification dispatch failed', [
                'message_id' => $message->id,
                'error'      => $e->getMessage(),
            ]);
        }
    }
}
