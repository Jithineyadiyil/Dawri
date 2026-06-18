<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Social — voice messages on direct messages.
 *
 * A DM is either text (body) or a voice note (audio_path + duration). For a
 * voice note `body` is stored empty. Audio is kept on the 'public' disk.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('direct_messages', function (Blueprint $table): void {
            $table->string('audio_path')->nullable()->after('body');
            $table->unsignedInteger('audio_duration_ms')->nullable()->after('audio_path');
            // body may be empty for a voice note
            $table->text('body')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('direct_messages', function (Blueprint $table): void {
            $table->dropColumn(['audio_path', 'audio_duration_ms']);
        });
    }
};
