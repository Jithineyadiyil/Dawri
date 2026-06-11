<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 7 — scheduled posts. A moderator drafts a message for a channel with a
 * future send time; a per-minute scheduled command publishes due rows through
 * the normal MessageService::post path (so sanitising, word-filtering, and
 * broadcasting all apply identically).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_messages', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            $table->uuid('user_id')->comment('Author who scheduled it');
            $table->text('content');
            $table->timestamp('scheduled_for');
            $table->timestamp('posted_at')->nullable()->comment('Set once published');
            $table->uuid('posted_message_id')->nullable()->comment('FK → messages.id after publish');
            $table->timestamp('cancelled_at')->nullable();
            $table->text('error')->nullable()->comment('Last failure reason, if publishing errored');
            $table->timestamps();

            $table->foreign('channel_id')->references('id')->on('channels')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            // The command queries pending rows due now: posted_at IS NULL AND
            // cancelled_at IS NULL AND scheduled_for <= now().
            $table->index(['posted_at', 'cancelled_at', 'scheduled_for']);
            $table->index('channel_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_messages');
    }
};
