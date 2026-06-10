<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Channel;
use App\Models\Poll;
use App\Models\PollOption;
use App\Models\PollVote;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\PollRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Phase 2 — poll lifecycle: create, vote, close, delete.
 *
 * Permission rules mirror message posting: must be a non-banned, non-muted
 * member to create or vote. Closing/deleting is restricted to the poll's
 * creator or a community moderator/admin.
 */
final class PollService
{
    public function __construct(
        private readonly PollRepositoryInterface $polls,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * Create a poll with its options.
     *
     * @param array<int, string> $optionLabels
     *
     * @throws AuthorizationException
     */
    public function create(
        Channel $channel,
        User $author,
        string $question,
        array $optionLabels,
        bool $isMultiple = false,
        ?string $closesAt = null,
    ): Poll {
        $this->assertCanParticipate($channel, $author);

        $labels = array_values(array_filter(array_map('trim', $optionLabels), fn ($l) => $l !== ''));
        if (count($labels) < 2) {
            throw new \InvalidArgumentException('A poll needs at least two options.');
        }
        if (count($labels) > 10) {
            throw new \InvalidArgumentException('A poll can have at most ten options.');
        }

        $poll = DB::transaction(function () use ($channel, $author, $question, $labels, $isMultiple, $closesAt) {
            $poll = $this->polls->create([
                'channel_id'  => $channel->id,
                'user_id'     => $author->id,
                'question'    => trim($question),
                'is_multiple' => $isMultiple,
                'closes_at'   => $closesAt,
            ]);

            $rows = [];
            foreach ($labels as $i => $label) {
                $rows[] = [
                    'id'       => (string) Str::uuid(),
                    'poll_id'  => $poll->id,
                    'label'    => $label,
                    'position' => $i,
                ];
            }
            PollOption::insert($rows);

            // Carrier message so the poll appears inline in the chronological
            // feed and rides the existing message broadcast/pagination paths.
            $message = \App\Models\Message::create([
                'channel_id' => $channel->id,
                'user_id'    => $author->id,
                'content'    => '',
                'poll_id'    => $poll->id,
            ]);

            // Broadcast the carrier message after commit so other clients see
            // the poll appear live, exactly like a normal message.
            DB::afterCommit(function () use ($message): void {
                $message->load(['author', 'reactions', 'mentions', 'parent.author', 'poll.author', 'poll.options']);
                broadcast(new \App\Events\MessagePosted($message))->toOthers();
            });

            return $poll->fresh(['author', 'options']);
        });

        return $poll;
    }

    /**
     * Cast (or update) a user's vote.
     *
     * Single-choice: selecting an option replaces any previous vote.
     * Multiple-choice: toggling an already-selected option removes it;
     * otherwise it is added.
     *
     * @throws AuthorizationException
     */
    public function vote(Poll $poll, User $user, string $optionId): Poll
    {
        $channel = $poll->channel;
        $this->assertCanParticipate($channel, $user);

        if (! $poll->isOpen()) {
            throw new AuthorizationException('This poll is closed.');
        }

        $option = $poll->options()->where('id', $optionId)->first();
        if ($option === null) {
            throw new \InvalidArgumentException('That option does not belong to this poll.');
        }

        DB::transaction(function () use ($poll, $user, $option): void {
            $existing = PollVote::where('option_id', $option->id)
                ->where('user_id', $user->id)
                ->first();

            if ($poll->is_multiple) {
                // Toggle this option.
                if ($existing !== null) {
                    $existing->delete();
                } else {
                    PollVote::create([
                        'poll_id'   => $poll->id,
                        'option_id' => $option->id,
                        'user_id'   => $user->id,
                    ]);
                }

                return;
            }

            // Single-choice: clear other votes for this poll, then set this one.
            if ($existing !== null) {
                // Re-clicking the same option clears the vote.
                $existing->delete();

                return;
            }

            PollVote::where('poll_id', $poll->id)
                ->where('user_id', $user->id)
                ->delete();

            PollVote::create([
                'poll_id'   => $poll->id,
                'option_id' => $option->id,
                'user_id'   => $user->id,
            ]);
        });

        return $this->polls->findWithResults($poll->id);
    }

    /**
     * Close a poll (no more voting). Creator or community moderator only.
     *
     * @throws AuthorizationException
     */
    public function close(Poll $poll, User $actor): Poll
    {
        $this->assertCanManage($poll, $actor);

        return $this->polls->update($poll, ['is_closed' => true]);
    }

    /**
     * Delete a poll. Creator or community moderator only.
     *
     * @throws AuthorizationException
     */
    public function delete(Poll $poll, User $actor): void
    {
        $this->assertCanManage($poll, $actor);
        $this->polls->delete($poll);
    }

    /**
     * @throws AuthorizationException
     */
    private function assertCanParticipate(Channel $channel, User $user): void
    {
        $member = $this->members->find($channel->community_id, $user->id);

        if ($member === null) {
            throw new AuthorizationException('You are not a member of this community.');
        }
        if ($member->isBanned()) {
            throw new AuthorizationException('You are banned from this community.');
        }
        if ($member->isMuted()) {
            throw new AuthorizationException('You are muted in this community.');
        }
    }

    /**
     * @throws AuthorizationException
     */
    private function assertCanManage(Poll $poll, User $actor): void
    {
        if ($poll->user_id === $actor->id) {
            return;
        }
        if ($actor->role === 'admin') {
            return;
        }

        $member = $this->members->find($poll->channel->community_id, $actor->id);
        if ($member === null || ! $member->canModerate()) {
            throw new AuthorizationException('Only the poll creator or a moderator can do that.');
        }
    }
}
