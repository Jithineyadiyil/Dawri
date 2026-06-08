<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Channel;
use Illuminate\Database\Eloquent\Collection;

interface ChannelRepositoryInterface
{
    public function findById(string $id): ?Channel;

    /** @return Collection<int, Channel> */
    public function listForCommunity(string $communityId): Collection;

    public function create(array $attributes): Channel;

    public function update(Channel $channel, array $attributes): Channel;

    public function delete(Channel $channel): bool;
}
