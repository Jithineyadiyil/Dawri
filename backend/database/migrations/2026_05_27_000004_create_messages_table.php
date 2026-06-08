<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Community messages.
 *
 * Messages are immutable in spirit: edits track an `edited_at` timestamp,
 * deletes are soft (so moderators can audit), and the original `content`
 * is preserved unless a moderator scrubs it. Hard delete is never exposed
 * via API and only available via tinker for compliance requests.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            $table->uuid('user_id')->comment('Author');
            $table->uuid('parent_id')->nullable()
                ->comment('Reserved for Sprint 16 threading — null in v1');
            $table->text('content')->comment('Up to 4000 chars enforced in FormRequest');
            $table->timestamp('edited_at')->nullable();
            $table->timestamp('deleted_at')->nullable()
                ->comment('Soft delete — visible to moderators, hidden from public reads');
            $table->uuid('deleted_by')->nullable()
                ->comment('FK → users.id; differentiates self-delete from mod-delete');
            $table->boolean('is_pinned')->default(false);
            $table->timestamp('pinned_at')->nullable();
            $table->uuid('pinned_by')->nullable();
            $table->timestamps();

            $table->foreign('channel_id')
                ->references('id')->on('channels')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->foreign('parent_id')
                ->references('id')->on('messages')
                ->nullOnDelete();

            $table->foreign('deleted_by')
                ->references('id')->on('users')
                ->nullOnDelete();

            $table->foreign('pinned_by')
                ->references('id')->on('users')
                ->nullOnDelete();

            // Critical: this index supports the main message-fetch query
            //   WHERE channel_id = ? AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 50
            $table->index(['channel_id', 'deleted_at', 'created_at'], 'messages_channel_feed_idx');
            $table->index(['channel_id', 'is_pinned'], 'messages_channel_pinned_idx');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
