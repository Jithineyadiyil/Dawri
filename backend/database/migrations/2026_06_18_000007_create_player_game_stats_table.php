<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — per-game player stats.
 *
 * Aggregated stats per (user, game). Updated incrementally by listeners on
 * match completion + tournament completion (or via the backfill command).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('player_game_stats', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('game', 40);

            $table->unsignedInteger('matches_played')->default(0);
            $table->unsignedInteger('wins')->default(0);
            $table->unsignedInteger('losses')->default(0);
            $table->unsignedInteger('draws')->default(0);

            $table->unsignedInteger('tournaments_played')->default(0);
            $table->unsignedInteger('tournaments_won')->default(0);
            $table->unsignedInteger('mvp_count')->default(0);

            $table->unsignedInteger('current_win_streak')->default(0);
            $table->unsignedInteger('best_win_streak')->default(0);

            $table->timestamp('last_match_at')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->unique(['user_id', 'game']);
            $table->index('game');
            $table->index(['game', 'wins']);  // leaderboard reads
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_game_stats');
    }
};
