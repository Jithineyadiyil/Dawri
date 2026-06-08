<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — User presence (online / idle / offline).
 *
 * We persist this rather than relying only on Reverb's in-memory state so
 * that "last seen 5 min ago" works after a server restart and across
 * multiple Reverb instances behind a load balancer. The PresenceService
 * upserts on every channel-subscribe event; an idle sweep job moves stale
 * online users to idle/offline.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_presence', function (Blueprint $table): void {
            $table->uuid('user_id')->primary();
            $table->enum('status', ['online', 'idle', 'offline'])->default('offline');
            $table->timestamp('last_seen_at')->useCurrent();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->index(['status', 'last_seen_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_presence');
    }
};
