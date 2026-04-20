<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Creates the ranking system tables:
 * - seasons: competitive season periods
 * - player_rankings: per-game, per-season ranking data
 * - player_stats: lifetime aggregate stats per player per game
 */
return new class extends Migration
{
    public function up(): void
    {
        // ── Seasons ───────────────────────────────────────────────────────
        Schema::create('seasons', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name', 100)->comment('e.g. Season 1 — Spring 2026');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->boolean('is_active')->default(false)->index();
            $table->timestamps();

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Player Rankings ───────────────────────────────────────────────
        Schema::create('player_rankings', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('game', 50)->comment('ea_fc25, pubg_mobile, cod_mobile');
            $table->uuid('season_id')->nullable();
            $table->integer('total_points')->default(0)->index();
            $table->integer('wins')->default(0);
            $table->integer('losses')->default(0);
            $table->integer('tournaments_played')->default(0);
            $table->decimal('win_rate', 5, 1)->default(0.0);
            $table->integer('rank_position')->default(0)->index();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('season_id')->references('id')->on('seasons')->nullOnDelete();
            $table->unique(['user_id', 'game', 'season_id'], 'player_rankings_unique');
            $table->index(['game', 'total_points'], 'rankings_game_points');

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Player Stats (lifetime aggregates) ────────────────────────────
        Schema::create('player_stats', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('game', 50);
            $table->integer('total_wins')->default(0);
            $table->integer('total_losses')->default(0);
            $table->integer('total_tournaments')->default(0);
            $table->integer('total_points')->default(0);
            $table->decimal('win_rate', 5, 1)->default(0.0);
            $table->integer('matches_played')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->unique(['user_id', 'game'], 'player_stats_unique');

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Add gaming fields to users table ──────────────────────────────
        Schema::table('users', static function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'game_username')) {
                $table->string('game_username', 100)->nullable()
                    ->comment('Primary in-game display name');
            }
            if (! Schema::hasColumn('users', 'psn_id')) {
                $table->string('psn_id', 100)->nullable();
            }
            if (! Schema::hasColumn('users', 'pubg_id')) {
                $table->string('pubg_id', 100)->nullable();
            }
            if (! Schema::hasColumn('users', 'cod_id')) {
                $table->string('cod_id', 100)->nullable();
            }
            if (! Schema::hasColumn('users', 'preferred_games')) {
                $table->json('preferred_games')->nullable()
                    ->comment('JSON array of preferred game keys');
            }
            if (! Schema::hasColumn('users', 'bio')) {
                $table->text('bio')->nullable();
            }
            if (! Schema::hasColumn('users', 'country')) {
                $table->string('country', 2)->nullable()
                    ->comment('ISO 3166-1 alpha-2');
            }
            if (! Schema::hasColumn('users', 'city')) {
                $table->string('city', 100)->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_stats');
        Schema::dropIfExists('player_rankings');
        Schema::dropIfExists('seasons');

        Schema::table('users', static function (Blueprint $table): void {
            $cols = ['game_username', 'psn_id', 'pubg_id', 'cod_id', 'preferred_games', 'bio', 'country', 'city'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('users', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
