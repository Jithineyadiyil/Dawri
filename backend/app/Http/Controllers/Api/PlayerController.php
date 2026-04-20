<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayerProfileResource;
use App\Http\Resources\MatchHistoryResource;
use App\Http\Resources\TournamentResource;
use App\Models\PlayerStat;
use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use App\Models\User;
use App\Services\RankingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Player profile, match history, and my-tournaments endpoints.
 */
class PlayerController extends Controller
{
    public function __construct(
        private readonly RankingService $ranking,
    ) {}

    /**
     * GET /api/v1/players/{id}
     *
     * Public player profile with stats and rankings.
     */
    public function show(string $id): PlayerProfileResource
    {
        $user = User::findOrFail($id);

        $stats = PlayerStat::where('user_id', $id)->get();
        $rankings = \App\Models\PlayerRanking::where('user_id', $id)
            ->orderByDesc('total_points')
            ->get();

        $recentTournaments = TournamentParticipant::with('tournament:id,name,name_ar,game,format,status')
            ->where('user_id', $id)
            ->orderByDesc('registered_at')
            ->limit(10)
            ->get();

        return new PlayerProfileResource($user, $stats, $rankings, $recentTournaments);
    }

    /**
     * GET /api/v1/players/{id}/matches?game=&tournament=&limit=20
     *
     * Match history for a player across all tournaments.
     */
    public function matches(Request $request, string $id): AnonymousResourceCollection
    {
        $request->validate([
            'game'          => 'nullable|string',
            'tournament_id' => 'nullable|uuid',
            'limit'         => 'nullable|integer|min:1|max:100',
        ]);

        // Find all participant IDs for this user
        $participantIds = TournamentParticipant::where('user_id', $id)
            ->pluck('id')
            ->toArray();

        if (empty($participantIds)) {
            return MatchHistoryResource::collection(collect());
        }

        $query = TournamentMatch::with([
            'participantA.user:id,name,game_username',
            'participantB.user:id,name,game_username',
            'bracket.tournament:id,name,game',
        ])
            ->where(function ($q) use ($participantIds) {
                $q->whereIn('participant_a_id', $participantIds)
                  ->orWhereIn('participant_b_id', $participantIds);
            })
            ->orderByDesc('updated_at');

        // Filter by game via tournament
        if ($request->filled('game')) {
            $query->whereHas('bracket.tournament', function ($q) use ($request) {
                $q->where('game', $request->input('game'));
            });
        }

        // Filter by specific tournament
        if ($request->filled('tournament_id')) {
            $query->whereHas('bracket', function ($q) use ($request) {
                $q->where('tournament_id', $request->input('tournament_id'));
            });
        }

        $limit = (int) $request->input('limit', 20);
        $matches = $query->limit($limit)->get();

        // Tag each match with the requesting user's participant IDs for win/loss marking
        $matches->each(function ($match) use ($participantIds) {
            $match->_viewer_participant_ids = $participantIds;
        });

        return MatchHistoryResource::collection($matches);
    }

    /**
     * GET /api/v1/tournaments/my
     *
     * Tournaments the authenticated user has registered for.
     * Requires auth.
     */
    public function myTournaments(Request $request): AnonymousResourceCollection
    {
        $userId = $request->user()->id;

        $query = TournamentParticipant::with([
            'tournament' => function ($q) {
                $q->withCount('participants');
            },
        ])
            ->where('user_id', $userId)
            ->orderByDesc('registered_at');

        // Optionally filter by status
        if ($request->filled('status')) {
            $query->whereHas('tournament', function ($q) use ($request) {
                $q->where('status', $request->input('status'));
            });
        }

        $participants = $query->paginate(20);

        // Map to tournament resources
        $tournaments = $participants->through(function ($p) use ($userId) {
            $t = $p->tournament;
            $t->_is_registered = true;
            $t->_participant = $p;
            return $t;
        });

        return TournamentResource::collection($tournaments);
    }

    /**
     * PUT /api/v1/profile
     *
     * Update the authenticated user's gaming profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'game_username'   => 'nullable|string|max:100',
            'psn_id'          => 'nullable|string|max:100',
            'pubg_id'         => 'nullable|string|max:100',
            'cod_id'          => 'nullable|string|max:100',
            'preferred_games' => 'nullable|array',
            'preferred_games.*' => 'string|in:ea_fc25,pubg_mobile,cod_mobile',
            'bio'             => 'nullable|string|max:1000',
            'country'         => 'nullable|string|size:2',
            'city'            => 'nullable|string|max:100',
        ]);

        $user = $request->user();
        $user->fill($validated);
        $user->save();

        return response()->json([
            'message' => 'Profile updated.',
            'data'    => [
                'id'              => $user->id,
                'name'            => $user->name,
                'game_username'   => $user->game_username,
                'psn_id'          => $user->psn_id,
                'pubg_id'         => $user->pubg_id,
                'cod_id'          => $user->cod_id,
                'preferred_games' => $user->preferred_games,
                'bio'             => $user->bio,
                'country'         => $user->country,
                'city'            => $user->city,
                'avatar'          => $user->avatar,
            ],
        ]);
    }
}
