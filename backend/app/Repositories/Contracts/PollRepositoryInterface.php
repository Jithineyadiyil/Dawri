<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Poll;
use Illuminate\Database\Eloquent\Collection;

interface PollRepositoryInterface
{
    public function findById(string $id): ?Poll;

    /**
     * A poll with its options and aggregated vote counts eager-loaded.
     */
    public function findWithResults(string $id): ?Poll;

    /** @return Collection<int, Poll> Polls for a channel, newest first. */
    public function listForChannel(string $channelId): Collection;

    public function create(array $attributes): Poll;

    public function update(Poll $poll, array $attributes): Poll;

    public function delete(Poll $poll): bool;
}
