<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 4 — community events + RSVPs.
 *
 * An event belongs to a community (community-wide, not channel-scoped). Members
 * RSVP with one of: going / maybe / declined (one RSVP per user per event).
 * Created/edited/deleted by moderators+ ; any member may RSVP.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('community_events', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->uuid('user_id')->comment('Creator');
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('location', 255)->nullable()
                ->comment('Physical place or a URL (e.g. Discord/stream link)');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();
            $table->boolean('is_cancelled')->default(false);
            $table->timestamps();

            $table->foreign('community_id')
                ->references('id')->on('communities')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->index(['community_id', 'starts_at'], 'events_community_time_idx');
        });

        Schema::create('event_rsvps', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('event_id');
            $table->uuid('user_id');
            $table->string('status', 10)->comment('going | maybe | declined');
            $table->timestamps();

            $table->foreign('event_id')
                ->references('id')->on('community_events')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            // One RSVP row per user per event.
            $table->unique(['event_id', 'user_id'], 'event_rsvps_unique_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_rsvps');
        Schema::dropIfExists('community_events');
    }
};
