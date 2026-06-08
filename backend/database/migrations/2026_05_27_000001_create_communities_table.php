<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Dawri Community.
 *
 * Creates the `communities` table. A community is either the single platform-wide
 * "Dawri Community" (`type = global`) or an auto-provisioned per-tournament room
 * (`type = tournament`). Both types share the same schema; they differ only in
 * how authorization and lifecycle are managed.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('communities', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->enum('type', ['global', 'tournament'])
                ->comment('global = the single Dawri Community · tournament = per-tournament private room');
            $table->uuid('tournament_id')->nullable()
                ->comment('FK → tournaments.id (only set when type = tournament)');
            $table->string('name', 120)->comment('Display name (e.g. "Dawri Community" or tournament title)');
            $table->string('slug', 140)->unique()
                ->comment('URL-safe identifier (e.g. "dawri-community", "tour-{uuid12}")');
            $table->text('description')->nullable();
            $table->string('icon_url', 500)->nullable();
            $table->boolean('is_active')->default(true)
                ->comment('Master kill-switch — false hides the community from all users');
            $table->timestamp('archived_at')->nullable()
                ->comment('Set when a tournament community is archived post-completion');
            $table->timestamps();

            $table->foreign('tournament_id')
                ->references('id')->on('tournaments')
                ->cascadeOnDelete();

            $table->index(['type', 'is_active']);
            $table->index('archived_at');
            // Only ONE global community can exist — enforced at the application
            // layer (the seeder uses firstOrCreate) AND at the DB layer below.
            $table->unique('tournament_id', 'communities_tournament_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('communities');
    }
};
