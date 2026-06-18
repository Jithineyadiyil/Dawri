<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlayerGameStat;
use App\Models\User;
use App\Models\UserPresence;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * PlayerProfileController — Dawri 2.0 profile API.
 *
 *   GET   /players/{user}/full      — public profile + per-game stats + presence
 *   GET   /me/profile               — my own full profile (same shape)
 *   PATCH /me/gaming-ids            — update my platform IDs (PSN/Xbox/Steam/Riot/Epic)
 */
final class PlayerProfileController extends Controller
{
    /** GET /players/{user}/full */
    public function show(User $user): JsonResponse
    {
        return response()->json(['data' => $this->buildProfile($user)]);
    }

    /** GET /me/profile */
    public function me(Request $request): JsonResponse
    {
        return response()->json(['data' => $this->buildProfile($request->user())]);
    }

    /** PATCH /me/gaming-ids */
    public function updateGamingIds(Request $request): JsonResponse
    {
        $data = $request->validate([
            'psn_id'        => ['nullable', 'string', 'max:80'],
            'xbox_gamertag' => ['nullable', 'string', 'max:80'],
            'steam_id'      => ['nullable', 'string', 'max:80'],
            'riot_id'       => ['nullable', 'string', 'max:80'],
            'epic_id'       => ['nullable', 'string', 'max:80'],
            'pubg_id'       => ['nullable', 'string', 'max:80'],
            'cod_id'        => ['nullable', 'string', 'max:80'],
        ]);

        $request->user()->fill($data)->save();

        return response()->json(['data' => $this->buildProfile($request->user())]);
    }

    /** Aggregate the public profile payload. */
    private function buildProfile(User $u): array
    {
        $stats = PlayerGameStat::query()
            ->where('user_id', $u->id)
            ->orderByDesc('matches_played')
            ->get();

        $totals = [
            'matches_played'     => (int) $stats->sum('matches_played'),
            'wins'               => (int) $stats->sum('wins'),
            'losses'             => (int) $stats->sum('losses'),
            'tournaments_played' => (int) $stats->sum('tournaments_played'),
            'tournaments_won'    => (int) $stats->sum('tournaments_won'),
            'mvp_count'          => (int) $stats->sum('mvp_count'),
        ];
        $totals['win_rate'] = $totals['matches_played'] > 0
            ? round(($totals['wins'] / $totals['matches_played']) * 100, 1)
            : 0.0;

        $presence = UserPresence::query()->where('user_id', $u->id)->first();

        return [
            'user' => [
                'id'           => $u->id,
                'name'         => $u->name,
                'nickname'     => $u->nickname,
                'display_name' => $u->display_name,
                'avatar_url'   => $u->avatar_url,
                'bio'          => $u->bio,
                'country'      => $u->country,
                'city'         => $u->city,
                'role'         => $u->role,
                'organization' => $u->organization_name,
                'created_at'   => $u->created_at,
            ],
            'gaming_ids' => [
                'psn_id'        => $u->psn_id,
                'xbox_gamertag' => $u->xbox_gamertag,
                'steam_id'      => $u->steam_id,
                'riot_id'       => $u->riot_id,
                'epic_id'       => $u->epic_id,
                'pubg_id'       => $u->pubg_id,
                'cod_id'        => $u->cod_id,
            ],
            'presence' => [
                'status'       => $presence?->status ?? UserPresence::STATUS_OFFLINE,
                'last_seen_at' => $presence?->last_seen_at,
            ],
            'totals' => $totals,
            'games'  => $stats->map(fn (PlayerGameStat $s) => [
                'game'               => $s->game,
                'matches_played'     => $s->matches_played,
                'wins'               => $s->wins,
                'losses'             => $s->losses,
                'draws'              => $s->draws,
                'win_rate'           => $s->win_rate,
                'tournaments_played' => $s->tournaments_played,
                'tournaments_won'    => $s->tournaments_won,
                'mvp_count'          => $s->mvp_count,
                'current_win_streak' => $s->current_win_streak,
                'best_win_streak'    => $s->best_win_streak,
                'last_match_at'      => $s->last_match_at,
            ])->values(),
        ];
    }
}
