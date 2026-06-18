<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — extend user gaming IDs.
 *
 * users already has psn_id, pubg_id, cod_id, game_username. Add platform
 * IDs for the additional games being seeded (Valorant/CS/Steam titles, etc).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('steam_id', 80)->nullable()->after('cod_id');
            $table->string('riot_id', 80)->nullable()->after('steam_id');   // Valorant / LoL
            $table->string('epic_id', 80)->nullable()->after('riot_id');    // Fortnite / Rocket League
            $table->string('xbox_gamertag', 80)->nullable()->after('epic_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['steam_id', 'riot_id', 'epic_id', 'xbox_gamertag']);
        });
    }
};
