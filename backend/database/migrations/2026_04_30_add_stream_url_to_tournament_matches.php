<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add stream_url column to tournament_matches.
 *
 * Sprint: live streaming (Option A — embed external streams).
 *
 * Holds a Twitch or YouTube URL pointing to the live stream of this match.
 * Set by the organizer or one of the participants. Validated server-side
 * to be a recognised Twitch/YouTube URL before persistence.
 *
 * Nullable: most matches won't have a stream. The frontend gates the
 * embed on this being present.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('tournament_matches', function (Blueprint $table) {
            if (! Schema::hasColumn('tournament_matches', 'stream_url')) {
                // 500 char limit covers even the worst-case YouTube URL with
                // tracking params; we'll trim to 500 in the request validator.
                $table->string('stream_url', 500)->nullable()->after('result_screenshot_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tournament_matches', function (Blueprint $table) {
            if (Schema::hasColumn('tournament_matches', 'stream_url')) {
                $table->dropColumn('stream_url');
            }
        });
    }
};
