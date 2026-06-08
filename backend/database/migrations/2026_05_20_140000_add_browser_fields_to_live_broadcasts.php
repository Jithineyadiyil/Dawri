<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 6 — Browser Broadcasting (Mux Live integration).
 *
 * Adds the 5 columns that BrowserBroadcastService + MuxBridge require.
 *
 * NOTE — original migration used ->after('youtube_video_id'), but that column
 * never existed in this codebase. live_broadcasts uses yt_broadcast_id /
 * yt_stream_id / yt_channel_id instead. The ->after() chains have been removed
 * so the columns simply append at the end of the table. Functionally identical.
 *
 * The Schema::hasColumn() guards make the migration idempotent — safe to re-run.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('live_broadcasts', function (Blueprint $table): void {
            if (! Schema::hasColumn('live_broadcasts', 'bridge_provider')) {
                $table->string('bridge_provider', 32)->nullable()
                    ->comment('Streaming bridge provider name (mux, ffmpeg, ...)');
            }
            if (! Schema::hasColumn('live_broadcasts', 'mux_stream_id')) {
                $table->string('mux_stream_id', 100)->nullable()
                    ->comment('Mux Live Stream ID returned by the API');
            }
            if (! Schema::hasColumn('live_broadcasts', 'mux_playback_id')) {
                $table->string('mux_playback_id', 100)->nullable()
                    ->comment('Mux playback ID for HLS playback');
            }
            if (! Schema::hasColumn('live_broadcasts', 'mux_simulcast_target_id')) {
                $table->string('mux_simulcast_target_id', 100)->nullable()
                    ->comment('Mux simulcast target ID for YouTube fan-out');
            }
            if (! Schema::hasColumn('live_broadcasts', 'whip_url')) {
                $table->text('whip_url')->nullable()
                    ->comment('WebRTC WHIP ingest URL for browser broadcast sessions');
            }
        });
    }

    public function down(): void
    {
        Schema::table('live_broadcasts', function (Blueprint $table): void {
            $columns = [
                'bridge_provider',
                'mux_stream_id',
                'mux_playback_id',
                'mux_simulcast_target_id',
                'whip_url',
            ];
            foreach ($columns as $col) {
                if (Schema::hasColumn('live_broadcasts', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
