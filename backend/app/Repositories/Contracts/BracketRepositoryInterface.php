<?php
declare(strict_types=1);
namespace App\Repositories\Contracts;
use App\Models\Bracket;

interface BracketRepositoryInterface {
    public function findWithMatches(string $bracketId): Bracket;
    public function create(array $data): Bracket;
}
