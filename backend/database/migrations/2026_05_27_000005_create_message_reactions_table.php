<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Emoji reactions on messages.
 *
 * Unicode emoji stored verbatim (e.g. "🔥", "👍"). Custom uploaded emoji
 * are out of scope for v1. The UNIQUE composite key ensures a user can
 * react with each distinct emoji exactly once per message — re-reacting
 * with the same emoji should call DELETE, not POST.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('message_reactions', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('message_id');
            $table->uuid('user_id');
            $table->string('emoji', 16)
                ->comment('Unicode emoji codepoint(s) — VARCHAR(16) covers all composed emoji');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('message_id')
                ->references('id')->on('messages')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->unique(['message_id', 'user_id', 'emoji'], 'reactions_unique_idx');
            $table->index(['message_id', 'emoji']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_reactions');
    }
};
