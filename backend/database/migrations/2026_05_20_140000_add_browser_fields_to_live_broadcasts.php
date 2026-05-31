<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds browser-broadcast (Mux) fields to live_broadcasts.
 *
 * NOTE: Dawri's `live_broadcasts` table already uses UUID primary keys
 * (per Sprint 5 streaming PR). We add columns; we do not alter PK shape.
 *
 * Columns added:
 *   - bridge_provider          — which bridge served this broadcast
 *   - mux_stream_id            — Mux live stream UUID (for cleanup)
 *   - mux_playback_id          — Mux public playback ID (for HLS preview)
 *   - mux_simulcast_target_id  — ID of the YouTube simulcast target
 *   - whip_url                 — Composed ingest URL (cached for status views)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('live_broadcasts', function (Blueprint $table): void {
            $table->string('bridge_provider', 32)->nullable()
                ->after('youtube_video_id')
                ->comment('Streaming bridge provider name (mux, ffmpeg, ...)');

            $table->string('mux_stream_id', 64)->nullable()
                ->after('bridge_provider')
                ->comment('Mux live stream UUID');

            $table->string('mux_playback_id', 64)->nullable()
                ->after('mux_stream_id')
                ->comment('Mux public playback ID');

            $table->string('mux_simulcast_target_id', 64)->nullable()
                ->after('mux_playback_id')
                ->comment('Mux simulcast target ID (YouTube destination)');

            $table->string('whip_url', 500)->nullable()
                ->after('mux_simulcast_target_id')
                ->comment('Cached WHIP ingest URL composed from stream key');

            // Index for the webhook lookup path.
            $table->index('mux_stream_id', 'idx_live_broadcasts_mux_stream_id');
        });
    }

    public function down(): void
    {
        Schema::table('live_broadcasts', function (Blueprint $table): void {
            $table->dropIndex('idx_live_broadcasts_mux_stream_id');
            $table->dropColumn([
                'bridge_provider',
                'mux_stream_id',
                'mux_playback_id',
                'mux_simulcast_target_id',
                'whip_url',
            ]);
        });
    }
};
