<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\PlayerRanking;
use App\Models\PlayerStat;
use App\Models\Season;
use App\Models\Tournament;
use App\Models\TournamentParticipant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Manages player rankings, point awards, and leaderboard calculations.
 *
 * Called by BracketAdvancementService when a tournament bracket completes.
 * Points are awarded based on placement and tournament tier, then
 * rank positions are recalculated for the affected game.
 */
class RankingService
{
    /**
     * Award ranking points to all participants after a tournament completes.
     *
     * @param string $tournamentId
     * @return void
     */
    public function awardTournamentPoints(string $tournamentId): void
    {
        $tournament = Tournament::with(['participants' => function ($q) {
            $q->orderByDesc('points')->orderByDesc('wins');
        }])->findOrFail($tournamentId);

        $game    = $tournament->game;
        $tier    = $tournament->tier ?? config('ranking.default_tier', 'standard');
        $mult    = (float) config("ranking.tier_multipliers.{$tier}", 1.0);
        $season  = Season::current();

        DB::transaction(function () use ($tournament, $game, $mult, $season) {
            $participants = $tournament->participants()
                ->orderByDesc('points')
                ->orderByDesc('wins')
                ->orderBy('losses')
                ->get();

            foreach ($participants as $idx => $participant) {
                $placement = $idx + 1;
                $basePoints = $this->getPlacementPoints($placement);
                $points = (int) round($basePoints * $mult);

                // Upsert ranking record
                $ranking = PlayerRanking::firstOrCreate(
                    [
                        'user_id'   => $participant->user_id,
                        'game'      => $game,
                        'season_id' => $season?->id,
                    ],
                    ['total_points' => 0, 'wins' => 0, 'losses' => 0, 'tournaments_played' => 0]
                );

                $ranking->increment('total_points', $points);
                $ranking->increment('wins', $participant->wins);
                $ranking->increment('losses', $participant->losses);
                $ranking->increment('tournaments_played', 1);

                // Update win rate
                $totalMatches = $ranking->wins + $ranking->losses;
                $ranking->win_rate = $totalMatches > 0
                    ? round(($ranking->wins / $totalMatches) * 100, 1)
                    : 0.0;
                $ranking->save();

                // Update lifetime stats
                $this->updatePlayerStats($participant->user_id, $game, $participant, $points);
            }

            // Recalculate rank positions for this game
            $this->recalculatePositions($game, $season?->id);
        });

        Log::info("Ranking points awarded for tournament {$tournamentId}", [
            'game'         => $game,
            'tier'         => $tier,
            'participants' => $tournament->participants()->count(),
        ]);
    }

    /**
     * Get the leaderboard for a specific game and optional season.
     *
     * @param string      $game
     * @param string|null $seasonId
     * @param int         $limit
     * @return \Illuminate\Support\Collection
     */
    public function getLeaderboard(string $game, ?string $seasonId = null, int $limit = 50): \Illuminate\Support\Collection
    {
        $query = PlayerRanking::with('user:id,name,game_username,avatar,country')
            ->where('game', $game)
            ->orderBy('rank_position')
            ->orderByDesc('total_points');

        if ($seasonId !== null) {
            $query->where('season_id', $seasonId);
        } else {
            // Default to current season
            $current = Season::current();
            if ($current) {
                $query->where('season_id', $current->id);
            } else {
                $query->whereNull('season_id');
            }
        }

        return $query->limit($limit)->get();
    }

    /**
     * Get overall leaderboard across all games.
     *
     * @param int $limit
     * @return \Illuminate\Support\Collection
     */
    public function getOverallLeaderboard(int $limit = 50): \Illuminate\Support\Collection
    {
        $season = Season::current();

        $query = DB::table('player_rankings')
            ->select(
                'user_id',
                DB::raw('SUM(total_points) as total_points'),
                DB::raw('SUM(wins) as wins'),
                DB::raw('SUM(losses) as losses'),
                DB::raw('SUM(tournaments_played) as tournaments_played')
            )
            ->groupBy('user_id')
            ->orderByDesc('total_points')
            ->limit($limit);

        if ($season) {
            $query->where('season_id', $season->id);
        } else {
            $query->whereNull('season_id');
        }

        return collect($query->get())->map(function ($row, $idx) {
            $row->rank_position = $idx + 1;
            $total = $row->wins + $row->losses;
            $row->win_rate = $total > 0 ? round(($row->wins / $total) * 100, 1) : 0.0;
            return $row;
        });
    }

    /**
     * Get a specific player's ranking for a game.
     *
     * @param string $userId
     * @param string $game
     * @return PlayerRanking|null
     */
    public function getPlayerRanking(string $userId, string $game): ?PlayerRanking
    {
        $season = Season::current();

        return PlayerRanking::where('user_id', $userId)
            ->where('game', $game)
            ->where('season_id', $season?->id)
            ->first();
    }

    // ── Private Helpers ───────────────────────────────────────────────────

    /**
     * Get base points for a placement position.
     */
    private function getPlacementPoints(int $placement): int
    {
        $points = config('ranking.placement_points', []);

        if (isset($points[$placement])) {
            return (int) $points[$placement];
        }

        return (int) config('ranking.participation_points', 10);
    }

    /**
     * Recalculate rank positions for all players in a game.
     */
    private function recalculatePositions(string $game, ?string $seasonId): void
    {
        $rankings = PlayerRanking::where('game', $game)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->when(! $seasonId, fn ($q) => $q->whereNull('season_id'))
            ->orderByDesc('total_points')
            ->orderByDesc('wins')
            ->orderBy('losses')
            ->get();

        foreach ($rankings as $idx => $ranking) {
            $ranking->update(['rank_position' => $idx + 1]);
        }
    }

    /**
     * Update lifetime aggregate stats for a player.
     */
    private function updatePlayerStats(string $userId, string $game, TournamentParticipant $participant, int $points): void
    {
        $stat = PlayerStat::firstOrCreate(
            ['user_id' => $userId, 'game' => $game],
            ['total_wins' => 0, 'total_losses' => 0, 'total_tournaments' => 0, 'total_points' => 0, 'matches_played' => 0]
        );

        $stat->increment('total_wins', $participant->wins);
        $stat->increment('total_losses', $participant->losses);
        $stat->increment('total_tournaments', 1);
        $stat->increment('total_points', $points);
        $stat->increment('matches_played', $participant->wins + $participant->losses);

        $totalMatches = $stat->total_wins + $stat->total_losses;
        $stat->win_rate = $totalMatches > 0
            ? round(($stat->total_wins / $totalMatches) * 100, 1)
            : 0.0;
        $stat->save();
    }
}
