<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Voice messages in community channels — a message attachment may now be an
 * audio voice note. duration_ms holds the recorded length (null for images).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('message_attachments', function (Blueprint $table): void {
            $table->unsignedInteger('duration_ms')->nullable()->after('height');
        });
    }

    public function down(): void
    {
        Schema::table('message_attachments', function (Blueprint $table): void {
            $table->dropColumn('duration_ms');
        });
    }
};
