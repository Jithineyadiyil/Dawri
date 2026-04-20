<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        // Create the table if it doesn't exist yet
        if (!Schema::hasTable('games')) {
            DB::statement("
                CREATE TABLE games (
                    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `key`           VARCHAR(60)  NOT NULL UNIQUE,
                    name            VARCHAR(120) NOT NULL,
                    name_ar         VARCHAR(120) NULL,
                    icon_url        VARCHAR(500) NULL,
                    icon_emoji      VARCHAR(10)  NULL,
                    platform        VARCHAR(60)  NULL,
                    genre           VARCHAR(60)  NULL,
                    supported_formats JSON       NULL,
                    is_active       TINYINT(1)   NOT NULL DEFAULT 1,
                    sort_order      INT UNSIGNED NOT NULL DEFAULT 0,
                    created_at      TIMESTAMP    NULL,
                    updated_at      TIMESTAMP    NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            ");
            $this->command->info('games table created.');
        }

        // Skip if already seeded
        if (DB::table('games')->count() > 0) {
            $this->command->info('games table already has data — skipping seed.');
            return;
        }

        $now = now();

        DB::table('games')->insert([
            [
                'key' => 'ea_fc', 'name' => 'EA FC 25', 'name_ar' => 'إيه إيه إف سي 25',
                'icon_emoji' => '⚽', 'platform' => 'Cross-platform', 'genre' => 'Sports',
                'supported_formats' => json_encode(['single_elimination','double_elimination','round_robin','swiss']),
                'is_active' => 1, 'sort_order' => 1, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'pubg_mobile', 'name' => 'PUBG Mobile', 'name_ar' => 'ببجي موبايل',
                'icon_emoji' => '🎯', 'platform' => 'Mobile', 'genre' => 'Battle Royale',
                'supported_formats' => json_encode(['single_elimination','double_elimination','swiss']),
                'is_active' => 1, 'sort_order' => 2, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'cod_mobile', 'name' => 'Call of Duty Mobile', 'name_ar' => 'كول أوف ديوتي',
                'icon_emoji' => '💀', 'platform' => 'Mobile', 'genre' => 'FPS',
                'supported_formats' => json_encode(['single_elimination','double_elimination','swiss']),
                'is_active' => 1, 'sort_order' => 3, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'valorant', 'name' => 'Valorant', 'name_ar' => 'فالورانت',
                'icon_emoji' => '🔫', 'platform' => 'PC', 'genre' => 'FPS',
                'supported_formats' => json_encode(['single_elimination','double_elimination','swiss']),
                'is_active' => 1, 'sort_order' => 4, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'fortnite', 'name' => 'Fortnite', 'name_ar' => 'فورتنايت',
                'icon_emoji' => '🏗️', 'platform' => 'Cross-platform', 'genre' => 'Battle Royale',
                'supported_formats' => json_encode(['single_elimination','double_elimination','swiss']),
                'is_active' => 1, 'sort_order' => 5, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'tekken', 'name' => 'Tekken 8', 'name_ar' => 'تيكن 8',
                'icon_emoji' => '👊', 'platform' => 'Cross-platform', 'genre' => 'Fighting',
                'supported_formats' => json_encode(['single_elimination','double_elimination']),
                'is_active' => 1, 'sort_order' => 6, 'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'key' => 'street_fighter', 'name' => 'Street Fighter 6', 'name_ar' => 'ستريت فايتر 6',
                'icon_emoji' => '🥊', 'platform' => 'Cross-platform', 'genre' => 'Fighting',
                'supported_formats' => json_encode(['single_elimination','double_elimination']),
                'is_active' => 1, 'sort_order' => 7, 'created_at' => $now, 'updated_at' => $now,
            ],
        ]);

        $this->command->info('Seeded ' . DB::table('games')->count() . ' games.');
    }
}
