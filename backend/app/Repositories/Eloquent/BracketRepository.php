<?php
declare(strict_types=1);
namespace App\Repositories\Eloquent;
use App\Models\Bracket;
use App\Repositories\Contracts\BracketRepositoryInterface;

class BracketRepository implements BracketRepositoryInterface {
    public function findWithMatches(string $bracketId): Bracket {
        return Bracket::with(['matches'])->findOrFail($bracketId);
    }
    public function create(array $data): Bracket {
        return Bracket::create($data);
    }
}
