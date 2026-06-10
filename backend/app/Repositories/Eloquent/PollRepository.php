<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Poll;
use App\Repositories\Contracts\PollRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class PollRepository implements PollRepositoryInterface
{
    public function __construct(private readonly Poll $model)
    {
    }

    public function findById(string $id): ?Poll
    {
        return $this->model->find($id);
    }

    public function findWithResults(string $id): ?Poll
    {
        return $this->model
            ->with([
                'author:id,name,nickname,avatar',
                'options' => fn ($q) => $q->withCount('votes')->orderBy('position'),
                'votes:id,poll_id,option_id,user_id',
            ])
            ->find($id);
    }

    public function listForChannel(string $channelId): Collection
    {
        return $this->model
            ->where('channel_id', $channelId)
            ->with([
                'author:id,name,nickname,avatar',
                'options' => fn ($q) => $q->withCount('votes')->orderBy('position'),
                'votes:id,poll_id,option_id,user_id',
            ])
            ->orderByDesc('created_at')
            ->get();
    }

    public function create(array $attributes): Poll
    {
        return $this->model->create($attributes);
    }

    public function update(Poll $poll, array $attributes): Poll
    {
        $poll->update($attributes);

        return $poll->fresh();
    }

    public function delete(Poll $poll): bool
    {
        return (bool) $poll->delete();
    }
}
