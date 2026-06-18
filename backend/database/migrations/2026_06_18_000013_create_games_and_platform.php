<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Dawri 2.0 — game catalog table + platform on tournaments.
 *
 *   games — admin-managed catalog. Seeded with the launch set: EA FC,
 *           PUBG, CoD, Valorant, Fortnite, Tekken, Rocket League,
 *           Dota 2, League of Legends, Counter-Strike.
 *
 *   tournaments.platform — PSN | Xbox | PC | Mobile | Cross-platform
 *   tournaments.format — extend the enum to include 'group_knockout'
 *                        (handled via raw SQL ALTER since enum changes
 *                        need direct DDL).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table): void {
            $table->id();
            $table->string('key', 40)->unique();
            $table->string('name', 100);
            $table->string('name_ar', 100)->nullable();
            $table->string('icon_url', 500)->nullable();
            $table->string('icon_emoji', 8)->nullable();   // fallback while logos load
            $table->string('platform', 40)->nullable();   // primary/typical platform
            $table->string('genre', 40)->nullable();      // sports | shooter | moba | fighting | br | etc.
            $table->json('supported_formats')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::table('tournaments', function (Blueprint $table): void {
            $table->enum('platform', ['psn', 'xbox', 'pc', 'mobile', 'cross'])
                ->nullable()
                ->after('game');
            $table->index('platform');
        });

        // Extend the tournament format enum to include 'group_knockout'.
        // Raw SQL because enum changes need direct DDL.
        DB::statement("ALTER TABLE tournaments MODIFY COLUMN format ENUM('single_elimination','double_elimination','round_robin','swiss','group_knockout') NOT NULL");

        // Seed the launch catalog. Existing 3 games keep their keys so all
        // legacy tournament rows still join cleanly.
        $now = now();
        $rows = [
            ['key' => 'ea_fc25',           'name' => 'EA FC 25',            'genre' => 'sports',  'icon_emoji' => '⚽',  'sort_order' => 1],
            ['key' => 'pubg_mobile',       'name' => 'PUBG Mobile',         'genre' => 'br',      'icon_emoji' => '🔫',  'sort_order' => 2],
            ['key' => 'cod_mobile',        'name' => 'Call of Duty Mobile', 'genre' => 'shooter', 'icon_emoji' => '💥',  'sort_order' => 3],
            ['key' => 'valorant',          'name' => 'Valorant',            'genre' => 'shooter', 'icon_emoji' => '🎯',  'sort_order' => 10],
            ['key' => 'fortnite',          'name' => 'Fortnite',            'genre' => 'br',      'icon_emoji' => '🏗',  'sort_order' => 11],
            ['key' => 'tekken',            'name' => 'Tekken',              'genre' => 'fighting','icon_emoji' => '👊',  'sort_order' => 12],
            ['key' => 'rocket_league',     'name' => 'Rocket League',       'genre' => 'sports',  'icon_emoji' => '🚗',  'sort_order' => 13],
            ['key' => 'dota2',             'name' => 'Dota 2',              'genre' => 'moba',    'icon_emoji' => '⚔',   'sort_order' => 14],
            ['key' => 'league_of_legends', 'name' => 'League of Legends',   'genre' => 'moba',    'icon_emoji' => '🛡',  'sort_order' => 15],
            ['key' => 'counter_strike',    'name' => 'Counter-Strike',      'genre' => 'shooter', 'icon_emoji' => '💣',  'sort_order' => 16],
        ];
        foreach ($rows as $r) {
            DB::table('games')->insert(array_merge($r, [
                'is_active' => true, 'created_at' => $now, 'updated_at' => $now,
            ]));
        }
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE tournaments MODIFY COLUMN format ENUM('single_elimination','double_elimination','round_robin','swiss') NOT NULL");
        Schema::table('tournaments', function (Blueprint $table): void {
            $table->dropIndex(['platform']);
            $table->dropColumn('platform');
        });
        Schema::dropIfExists('games');
    }
};
