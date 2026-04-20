<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Season;
use App\Models\PlayerRanking;
use App\Models\PlayerStat;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seeds the ranking system with a current season and sample ranking data.
 *
 * Run with: php artisan db:seed --class=RankingSeeder
 */
class RankingSeeder extends Seeder
{
    public function run(): void
    {
        // ── Create current season ─────────────────────────────────────────
        $season = Season::firstOrCreate(
            ['name' => 'Season 1 — Spring 2026'],
            [
                'starts_at' => now()->startOfMonth()->subMonths(2),
                'ends_at'   => now()->endOfMonth()->addMonths(1),
                'is_active' => true,
            ]
        );

        // ── Seed sample rankings for existing players ─────────────────────
        $players = User::where('email', 'like', 'player%@dawri.gg')->get();
        $games = ['ea_fc25', 'pubg_mobile', 'cod_mobile'];

        foreach ($players as $idx => $player) {
            // Each player gets a random game ranking
            $game = $games[$idx % count($games)];
            $wins = rand(5, 40);
            $losses = rand(2, 20);
            $tournaments = rand(3, 15);
            $points = ($wins * 3) + ($losses * 1) + ($tournaments * 25);
            $winRate = round(($wins / max($wins + $losses, 1)) * 100, 1);

            PlayerRanking::firstOrCreate(
                [
                    'user_id'   => $player->id,
                    'game'      => $game,
                    'season_id' => $season->id,
                ],
                [
                    'total_points'       => $points,
                    'wins'               => $wins,
                    'losses'             => $losses,
                    'tournaments_played' => $tournaments,
                    'win_rate'           => $winRate,
                    'rank_position'      => 0, // Will be recalculated
                ]
            );

            PlayerStat::firstOrCreate(
                ['user_id' => $player->id, 'game' => $game],
                [
                    'total_wins'        => $wins,
                    'total_losses'      => $losses,
                    'total_tournaments' => $tournaments,
                    'total_points'      => $points,
                    'matches_played'    => $wins + $losses,
                    'win_rate'          => $winRate,
                ]
            );
        }

        // ── Recalculate rank positions ────────────────────────────────────
        foreach ($games as $game) {
            $rankings = PlayerRanking::where('game', $game)
                ->where('season_id', $season->id)
                ->orderByDesc('total_points')
                ->get();

            foreach ($rankings as $pos => $ranking) {
                $ranking->update(['rank_position' => $pos + 1]);
            }
        }

        $this->command->info('Seeded season + ' . $players->count() . ' player rankings.');
    }
}
