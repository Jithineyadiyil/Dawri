<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds gamertag and registration status columns to tournament_participants.
 *
 * This migration bridges the v1 and v2 schemas:
 * - gamertag: carried over from v1, used for display in brackets
 * - status: registration state (registered, waitlisted, withdrawn)
 *
 * Run AFTER the original tournament engine migration that created the table.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tournament_participants', static function (Blueprint $table): void {
            if (! Schema::hasColumn('tournament_participants', 'gamertag')) {
                $table->string('gamertag', 100)
                    ->nullable()
                    ->after('user_id')
                    ->comment('In-game display name for this tournament');
            }

            if (! Schema::hasColumn('tournament_participants', 'status')) {
                $table->string('status', 20)
                    ->default('registered')
                    ->after('is_eliminated')
                    ->comment('Registration state: registered, waitlisted, withdrawn');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tournament_participants', static function (Blueprint $table): void {
            $table->dropColumn(['gamertag', 'status']);
        });
    }
};
