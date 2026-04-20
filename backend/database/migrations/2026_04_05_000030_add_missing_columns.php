<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds missing columns identified during code review:
 * - tournaments.status (CRITICAL - every controller references this)
 * - tournaments.tier (for ranking multipliers)
 * - users.avatar (referenced by leaderboard, profile, dashboard)
 * - users.status (for account management)
 */
return new class extends Migration
{
    public function up(): void
    {
        // ── Tournaments ───────────────────────────────────────────────────
        Schema::table('tournaments', static function (Blueprint $table): void {
            if (! Schema::hasColumn('tournaments', 'status')) {
                $table->string('status', 30)->default('registration_open')
                    ->comment('registration_open, in_progress, completed, cancelled');
            }
            if (! Schema::hasColumn('tournaments', 'tier')) {
                $table->string('tier', 20)->default('standard')
                    ->comment('standard, featured, championship — affects ranking points');
            }
        });

        // ── Users ─────────────────────────────────────────────────────────
        Schema::table('users', static function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar', 500)->nullable();
            }
            if (! Schema::hasColumn('users', 'status')) {
                $table->string('status', 20)->default('active')
                    ->comment('active, suspended, banned');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tournaments', static function (Blueprint $table): void {
            if (Schema::hasColumn('tournaments', 'status')) $table->dropColumn('status');
            if (Schema::hasColumn('tournaments', 'tier'))   $table->dropColumn('tier');
        });
        Schema::table('users', static function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'avatar')) $table->dropColumn('avatar');
            if (Schema::hasColumn('users', 'status')) $table->dropColumn('status');
        });
    }
};
