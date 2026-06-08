<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Denormalized @mentions.
 *
 * When a message contains "@username" we extract the user IDs once at
 * post time and store one row per mentioned user. This lets us:
 *   1. Render mention pills in the UI without re-parsing content
 *   2. Drive the "Mentions" inbox view efficiently
 *   3. Fan-out notifications via Sprint 12 NotificationController
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('message_mentions', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('message_id');
            $table->uuid('mentioned_user_id');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('message_id')
                ->references('id')->on('messages')
                ->cascadeOnDelete();

            $table->foreign('mentioned_user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->unique(['message_id', 'mentioned_user_id'], 'mentions_unique_idx');
            // For the "messages where I was mentioned" feed
            $table->index(['mentioned_user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_mentions');
    }
};
