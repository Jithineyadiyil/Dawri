<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Community;
use App\Repositories\Contracts\CommunityRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class CommunityRepository implements CommunityRepositoryInterface
{
    public function __construct(private readonly Community $model)
    {
    }

    public function findById(string $id): ?Community
    {
        return $this->model->find($id);
    }

    public function findBySlug(string $slug): ?Community
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function findGlobal(): ?Community
    {
        return $this->model->where('type', Community::TYPE_GLOBAL)->first();
    }

    public function findByTournament(string $tournamentId): ?Community
    {
        return $this->model->where('tournament_id', $tournamentId)->first();
    }

    public function listForUser(string $userId): Collection
    {
        return $this->model
            ->where('is_active', true)
            ->whereNull('archived_at')
            ->whereHas('memberships', fn ($q) => $q
                ->where('user_id', $userId)
                ->whereNull('banned_at'))
            ->with(['channels' => fn ($q) => $q->where('is_archived', false)])
            ->orderByDesc('type') // 'tournament' sorts before 'global' alphabetically, but we want global first
            ->orderBy('name')
            ->get()
            // Force global to top of returned list
            ->sortBy(fn (Community $c) => $c->isGlobal() ? 0 : 1)
            ->values();
    }

    public function create(array $attributes): Community
    {
        return $this->model->create($attributes);
    }
}
