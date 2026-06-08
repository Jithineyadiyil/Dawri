<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Community;
use Illuminate\Database\Eloquent\Collection;

/**
 * Read-side data access for communities.
 *
 * Writes happen via CommunityService → factory methods on the model.
 * This split keeps query logic testable without booting Eloquent for
 * service unit tests.
 */
interface CommunityRepositoryInterface
{
    public function findById(string $id): ?Community;

    public function findBySlug(string $slug): ?Community;

    public function findGlobal(): ?Community;

    public function findByTournament(string $tournamentId): ?Community;

    /**
     * Communities the user has access to (member of, not banned, community active).
     *
     * @return Collection<int, Community>
     */
    public function listForUser(string $userId): Collection;

    public function create(array $attributes): Community;
}
