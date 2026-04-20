<?php
declare(strict_types=1);
namespace App\Repositories\Eloquent;
use App\Models\{Tournament, TournamentParticipant};
use App\Repositories\Contracts\TournamentRepositoryInterface;
use Illuminate\Database\Eloquent\{Collection, ModelNotFoundException};

class TournamentRepository implements TournamentRepositoryInterface {
    public function all(array $filters = []): Collection {
        $q = Tournament::with(['organizer:id,name','bracket:id,tournament_id,status,current_round,total_rounds'])
            ->where('is_public', true)->whereNull('deleted_at');
        if (!empty($filters['game']))   $q->where('game', $filters['game']);
        if (!empty($filters['format'])) $q->where('format', $filters['format']);
        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where(fn($q) => $q->where('name','like',"%$s%")->orWhere('name_ar','like',"%$s%"));
        }
        return $q->orderByDesc('created_at')->get();
    }
    public function findWithRelations(string $id): Tournament {
        return Tournament::with([
            'organizer:id,name','moderator:id,name',
            'participants.user:id,name,ranking_points,game_username',
            'bracket.matches',
        ])->findOrFail($id);
    }
    public function create(array $data): Tournament {
        return Tournament::create($data);
    }
    public function registerParticipant(Tournament $tournament, string $userId): void {
        TournamentParticipant::firstOrCreate(
            ['tournament_id'=>$tournament->id,'user_id'=>$userId],
            ['seed'=>0,'wins'=>0,'losses'=>0,'points'=>0,'buchholz'=>0,
             'is_eliminated'=>false,'registered_at'=>now()]
        );
    }
}
