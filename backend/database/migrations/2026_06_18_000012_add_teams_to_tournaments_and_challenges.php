<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — team-vs-team participation.
 *
 *   tournament_participants.team_id — set on team tournaments (one row per team
 *     instead of one per player). user_id stays nullable in that case.
 *
 *   challenges — extend to allow team-vs-team alongside player-vs-player:
 *     • challenger_team_id, opponent_team_id (nullable)
 *     • when team IDs are set, treat as a team challenge
 *     • challenger_id / opponent_id stay populated as the captain/owner
 *       who initiated and the captain/owner who must accept respectively
 *       (so notifications + can_accept checks keep working)
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('tournament_participants', function (Blueprint $table): void {
            $table->uuid('team_id')->nullable()->after('user_id');
            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->index('team_id');
        });
        // user_id needs to be nullable so a team-only participant row works.
        DB::statement('ALTER TABLE tournament_participants MODIFY user_id CHAR(36) NULL');

        Schema::table('challenges', function (Blueprint $table): void {
            $table->uuid('challenger_team_id')->nullable()->after('opponent_id');
            $table->uuid('opponent_team_id')->nullable()->after('challenger_team_id');
            $table->uuid('winner_team_id')->nullable()->after('winner_id');

            $table->foreign('challenger_team_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->foreign('opponent_team_id')->references('id')->on('teams')->cascadeOnDelete();

            $table->index(['challenger_team_id', 'status']);
            $table->index(['opponent_team_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table): void {
            $table->dropForeign(['challenger_team_id']);
            $table->dropForeign(['opponent_team_id']);
            $table->dropIndex(['challenger_team_id', 'status']);
            $table->dropIndex(['opponent_team_id', 'status']);
            $table->dropColumn(['challenger_team_id', 'opponent_team_id', 'winner_team_id']);
        });
        Schema::table('tournament_participants', function (Blueprint $table): void {
            $table->dropForeign(['team_id']);
            $table->dropIndex(['team_id']);
            $table->dropColumn('team_id');
        });
    }
};
