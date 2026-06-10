<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 5 — join flow: invite links + request-to-join.
 *
 * - communities gains a `join_policy`: open | request | closed.
 *     open    = anyone with an invite joins instantly
 *     request = joining creates a pending request a moderator must approve
 *     closed  = invite-only; no open requests (default for existing communities)
 * - community_invites: shareable tokens (optional expiry / max uses).
 * - community_join_requests: pending/approved/denied membership requests.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('communities', function (Blueprint $table): void {
            $table->string('join_policy', 10)->default('closed')->after('is_active')
                ->comment('open | request | closed');
        });

        Schema::create('community_invites', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->uuid('created_by');
            $table->string('token', 40)->unique();
            $table->unsignedInteger('max_uses')->nullable()->comment('null = unlimited');
            $table->unsignedInteger('uses')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_revoked')->default(false);
            $table->timestamps();

            $table->foreign('community_id')->references('id')->on('communities')->cascadeOnDelete();
            $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete();
            $table->index(['community_id', 'is_revoked']);
        });

        Schema::create('community_join_requests', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->uuid('user_id');
            $table->string('status', 10)->default('pending')->comment('pending | approved | denied');
            $table->text('message')->nullable()->comment('optional note from the requester');
            $table->uuid('decided_by')->nullable();
            $table->timestamp('decided_at')->nullable();
            $table->timestamps();

            $table->foreign('community_id')->references('id')->on('communities')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('decided_by')->references('id')->on('users')->nullOnDelete();

            // One active request row per user per community (re-request updates it).
            $table->unique(['community_id', 'user_id'], 'join_requests_unique_idx');
            $table->index(['community_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_join_requests');
        Schema::dropIfExists('community_invites');
        Schema::table('communities', function (Blueprint $table): void {
            $table->dropColumn('join_policy');
        });
    }
};
