<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Membership & roles within communities.
 *
 * For the global community, every Dawri user is implicitly a member
 * (seeder backfills on creation, observer adds new users on registration).
 * For tournament communities, membership is created when a user registers
 * for the tournament.
 *
 * Roles map to authorization rules in CommunityPolicy:
 *   owner      → tournament organizer / system root admin
 *   admin      → platform admin (system role from users.role)
 *   moderator  → trusted member with delete/mute powers
 *   member     → default
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('community_members', function (Blueprint $table): void {
            $table->uuid('community_id');
            $table->uuid('user_id');
            $table->enum('role', ['owner', 'admin', 'moderator', 'member'])->default('member');
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamp('muted_until')->nullable()
                ->comment('User cannot post while NOW() < muted_until');
            $table->timestamp('banned_at')->nullable()
                ->comment('User has lost access to the community');
            $table->text('ban_reason')->nullable();
            $table->uuid('banned_by')->nullable()->comment('FK → users.id of the moderator who issued the ban');
            $table->timestamps();

            $table->primary(['community_id', 'user_id']);

            $table->foreign('community_id')
                ->references('id')->on('communities')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->foreign('banned_by')
                ->references('id')->on('users')
                ->nullOnDelete();

            $table->index(['user_id', 'banned_at']);
            $table->index('muted_until');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_members');
    }
};
