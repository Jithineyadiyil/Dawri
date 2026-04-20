<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

/**
 * Transforms a user profile with stats, rankings, and recent tournaments.
 */
class PlayerProfileResource extends JsonResource
{
    private Collection $stats;
    private Collection $rankings;
    private Collection $recentTournaments;

    public function __construct(User $user, Collection $stats, Collection $rankings, Collection $recentTournaments)
    {
        parent::__construct($user);
        $this->stats = $stats;
        $this->rankings = $rankings;
        $this->recentTournaments = $recentTournaments;
    }

    /**
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'game_username'   => $this->game_username,
            'avatar'          => $this->avatar,
            'bio'             => $this->bio,
            'country'         => $this->country,
            'city'            => $this->city,
            'psn_id'          => $this->psn_id,
            'pubg_id'         => $this->pubg_id,
            'cod_id'          => $this->cod_id,
            'preferred_games' => $this->preferred_games,
            'member_since'    => $this->created_at?->toIso8601String(),

            'stats' => $this->stats->map(fn ($s) => [
                'game'              => $s->game,
                'total_wins'        => $s->total_wins,
                'total_losses'      => $s->total_losses,
                'total_tournaments' => $s->total_tournaments,
                'total_points'      => $s->total_points,
                'matches_played'    => $s->matches_played,
                'win_rate'          => $s->win_rate,
            ]),

            'rankings' => $this->rankings->map(fn ($r) => [
                'game'          => $r->game,
                'rank_position' => $r->rank_position,
                'total_points'  => $r->total_points,
                'season_id'     => $r->season_id,
            ]),

            'recent_tournaments' => $this->recentTournaments->map(fn ($p) => [
                'tournament_id'   => $p->tournament_id,
                'tournament_name' => $p->tournament?->name,
                'game'            => $p->tournament?->game,
                'wins'            => $p->wins,
                'losses'          => $p->losses,
                'points'          => $p->points,
                'is_eliminated'   => $p->is_eliminated,
                'registered_at'   => $p->registered_at?->toIso8601String(),
            ]),
        ];
    }
}
