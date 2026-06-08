<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Per-user, per-channel read state.
 *
 * Stores the most recent message ID a user has marked as read in each
 * channel. The unread count for a channel = COUNT(messages WHERE created_at > last_read_at).
 * The row is upserted by the API endpoint POST /channels/{id}/mark-read.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('channel_reads', function (Blueprint $table): void {
            $table->uuid('user_id');
            $table->uuid('channel_id');
            $table->uuid('last_read_message_id')->nullable();
            $table->timestamp('last_read_at')->useCurrent();

            $table->primary(['user_id', 'channel_id']);

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->foreign('channel_id')
                ->references('id')->on('channels')
                ->cascadeOnDelete();

            $table->foreign('last_read_message_id')
                ->references('id')->on('messages')
                ->nullOnDelete();

            $table->index('last_read_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('channel_reads');
    }
};
