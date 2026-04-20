<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transforms a PlayerRanking model for leaderboard API responses.
 */
class LeaderboardResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'rank'               => $this->rank_position,
            'user_id'            => $this->user_id,
            'name'               => $this->user?->game_username ?? $this->user?->name ?? 'Unknown',
            'avatar'             => $this->user?->avatar,
            'country'            => $this->user?->country,
            'game'               => $this->game,
            'total_points'       => $this->total_points,
            'wins'               => $this->wins,
            'losses'             => $this->losses,
            'tournaments_played' => $this->tournaments_played,
            'win_rate'           => $this->win_rate,
        ];
    }
}
