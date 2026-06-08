<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Channel;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class ChannelRepository implements ChannelRepositoryInterface
{
    public function __construct(private readonly Channel $model)
    {
    }

    public function findById(string $id): ?Channel
    {
        return $this->model->find($id);
    }

    public function listForCommunity(string $communityId): Collection
    {
        return $this->model
            ->where('community_id', $communityId)
            ->where('is_archived', false)
            ->orderBy('position')
            ->orderBy('name')
            ->get();
    }

    public function create(array $attributes): Channel
    {
        return $this->model->create($attributes);
    }

    public function update(Channel $channel, array $attributes): Channel
    {
        $channel->fill($attributes)->save();
        return $channel->fresh();
    }

    public function delete(Channel $channel): bool
    {
        return (bool) $channel->delete();
    }
}
