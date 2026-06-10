<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 6 — admin & safety.
 *
 * Part A: communities.rules (markdown-ish text shown on join / via a Rules button)
 * Part B: community_audit_log (records moderation + admin actions)
 * Part C: community_blocked_words (per-community keyword auto-moderation list)
 */
return new class extends Migration {
    public function up(): void
    {
        // Part A — rules text on the community.
        Schema::table('communities', function (Blueprint $table): void {
            $table->text('rules')->nullable()->after('description')
                ->comment('Community rules shown to members (plain text).');
        });

        // Part B — audit log.
        Schema::create('community_audit_log', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->uuid('actor_id')->nullable()->comment('Who performed the action (null = system)');
            $table->uuid('target_user_id')->nullable()->comment('Affected user, if any');
            $table->string('action', 40)->comment('mute | unmute | ban | unban | kick | set_role | rules_updated | policy_updated | word_added | word_removed');
            $table->json('meta')->nullable()->comment('Extra context: reason, minutes, role, etc.');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('community_id')->references('id')->on('communities')->cascadeOnDelete();
            $table->foreign('actor_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('target_user_id')->references('id')->on('users')->nullOnDelete();
            $table->index(['community_id', 'created_at'], 'audit_community_time_idx');
        });

        // Part C — per-community blocked words.
        Schema::create('community_blocked_words', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->uuid('created_by')->nullable();
            $table->string('word', 100)->comment('Lower-cased term to block (matched as a whole word)');
            $table->string('mode', 10)->default('block')->comment('block = reject message | flag = allow but log');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('community_id')->references('id')->on('communities')->cascadeOnDelete();
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->unique(['community_id', 'word'], 'blocked_words_unique_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_blocked_words');
        Schema::dropIfExists('community_audit_log');
        Schema::table('communities', function (Blueprint $table): void {
            $table->dropColumn('rules');
        });
    }
};
