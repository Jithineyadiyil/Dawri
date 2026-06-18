<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — Teams as first-class entities.
 *
 *   teams         — persistent gaming team with profile / roster / stats
 *   team_members  — roster row per (team, user) with role
 *   team_invites  — pending invites by the team owner/captain to a user
 *
 * A user may own multiple teams. A team belongs to ONE game (so stats can
 * roll up properly); a single owner_id is the founder + ultimate authority.
 * Roles:  owner > captain > member.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('owner_id');
            $table->string('name', 100);
            $table->string('slug', 120)->unique();
            $table->string('tag', 10)->nullable();              // e.g. "DWR"
            $table->string('logo_url', 500)->nullable();
            $table->string('region', 80)->nullable();
            $table->string('game', 40);                          // primary game
            $table->string('description', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_recruiting')->default(true);
            $table->timestamps();

            $table->foreign('owner_id')->references('id')->on('users')->cascadeOnDelete();
            $table->index('game');
            $table->index('owner_id');
        });

        Schema::create('team_members', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('team_id');
            $table->uuid('user_id');
            $table->enum('role', ['owner', 'captain', 'member'])->default('member');
            $table->string('jersey_number', 10)->nullable();
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->unique(['team_id', 'user_id']);
            $table->index('user_id');
        });

        Schema::create('team_invites', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('team_id');
            $table->uuid('user_id');                              // invitee
            $table->uuid('invited_by');                           // owner/captain
            $table->enum('status', ['pending', 'accepted', 'declined', 'cancelled'])->default('pending');
            $table->timestamp('decided_at')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('invited_by')->references('id')->on('users')->cascadeOnDelete();

            $table->unique(['team_id', 'user_id', 'status']);     // one open invite per pair
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_invites');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('teams');
    }
};
