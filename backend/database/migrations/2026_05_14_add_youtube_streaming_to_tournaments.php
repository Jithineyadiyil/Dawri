<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds YouTube Live streaming columns to tournaments.
 *
 * ARCHITECTURE:
 *   Dawri owns one YouTube channel. Admin creates a YouTube Live Event
 *   per tournament via the YouTube Data API v3, which returns:
 *     - youtube_broadcast_id  → the live event ID (used to build watch URL)
 *     - youtube_stream_key    → RTMP ingestion key given to the organizer
 *     - youtube_stream_url    → watch URL (youtube.com/watch?v=broadcast_id)
 *     - youtube_rtmp_url      → rtmp://a.rtmp.youtube.com/live2 (constant)
 *
 *   The organizer enters the stream key into:
 *     - PS5: Settings → Broadcasting → Custom RTMP → paste key
 *     - OBS: Settings → Stream → YouTube - RTMPS → paste key
 *
 *   This way organizers stream TO Dawri's channel without password access.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            // YouTube Live Event ID (e.g. "abc123xyz")
            $table->string('youtube_broadcast_id', 100)->nullable()->after('status');
            // RTMP stream key — shown only to organizer, never publicly
            $table->string('youtube_stream_key', 200)->nullable()->after('youtube_broadcast_id');
            // Full YouTube watch URL — embedded on tournament page
            $table->string('youtube_stream_url', 500)->nullable()->after('youtube_stream_key');
            // Stream status: pending | live | ended
            $table->string('youtube_stream_status', 20)->nullable()->after('youtube_stream_url');
        });
    }

    public function down(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            $table->dropColumn([
                'youtube_broadcast_id',
                'youtube_stream_key',
                'youtube_stream_url',
                'youtube_stream_status',
            ]);
        });
    }
};
