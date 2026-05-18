<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration: create_live_broadcasts_table
 *
 * Sprint 5 — YouTube Live (Option B): Dawri-managed broadcasts.
 *
 * Unlike the existing `stream_url` column on tournament_matches (Option A,
 * where the organizer pastes a Twitch/YouTube URL), Option B has Dawri
 * create the broadcast on YouTube via the Data API v3 and hand the RTMP
 * credentials back to the organizer.
 *
 * The two paths coexist: a successful broadcast's watch URL is copied into
 * tournament_matches.stream_url so existing embed logic keeps working.
 *
 * Lifecycle (status column):
 *   created  → broadcast & stream resources created on YouTube
 *   ready    → stream bound to broadcast, RTMP credentials available
 *   live     → transitioned to live; viewers can watch
 *   complete → ended cleanly; archived on the channel
 *   failed   → API failure / never started; row kept for audit
 *
 * Soft-deletes preserve history for analytics.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('live_broadcasts', function (Blueprint $table): void {
            $table->uuid('id')->primary();

            // ── Dawri bindings (UUIDs — match project convention) ───────
            $table->uuid('tournament_id')->nullable();
            $table->uuid('match_id')->nullable();
            $table->uuid('created_by');

            $table->foreign('tournament_id')->references('id')->on('tournaments')->cascadeOnDelete();
            $table->foreign('match_id')->references('id')->on('tournament_matches')->cascadeOnDelete();
            $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete();

            // ── YouTube identifiers ─────────────────────────────────────
            $table->string('yt_broadcast_id', 64)->index();
            $table->string('yt_stream_id', 64)->nullable();
            $table->string('yt_channel_id', 64);

            // ── Public-facing metadata ──────────────────────────────────
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->enum('privacy', ['public', 'unlisted', 'private'])->default('public');

            // ── RTMP ingest (encrypted; never exposed via API Resource) ─
            $table->string('rtmp_url', 255)->nullable();
            $table->text('stream_key_enc')->nullable();      // AES-256 via 'encrypted' cast

            $table->string('watch_url', 255)->nullable();    // https://youtube.com/watch?v=...
            $table->string('embed_url', 255)->nullable();    // https://youtube.com/embed/...

            // ── State machine ───────────────────────────────────────────
            $table->enum('status', ['created', 'ready', 'live', 'complete', 'failed'])
                ->default('created')
                ->index();

            $table->enum('source', ['obs', 'browser', 'rtmp'])->default('obs');
            $table->enum('trigger', ['manual', 'auto'])->default('manual');

            // ── Scheduling ──────────────────────────────────────────────
            $table->timestamp('scheduled_start_at')->nullable();
            $table->timestamp('actual_start_at')->nullable();
            $table->timestamp('actual_end_at')->nullable();

            // ── Audit ───────────────────────────────────────────────────
            $table->text('last_error')->nullable();
            $table->unsignedTinyInteger('failure_count')->default(0);

            $table->timestamps();
            $table->softDeletes();

            // ── Composite indexes ───────────────────────────────────────
            $table->index(['tournament_id', 'status']);
            $table->index(['match_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('live_broadcasts');
    }
};
