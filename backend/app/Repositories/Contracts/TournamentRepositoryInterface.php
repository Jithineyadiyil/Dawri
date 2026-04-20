<?php
declare(strict_types=1);
namespace App\Repositories\Contracts;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Collection;

interface TournamentRepositoryInterface {
    public function all(array $filters = []): Collection;
    public function findWithRelations(string $id): Tournament;
    public function create(array $data): Tournament;
    public function registerParticipant(Tournament $tournament, string $userId): void;
}
