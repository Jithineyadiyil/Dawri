<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 2b — link a poll to a message so polls render inline in the feed.
 *
 * A poll-bearing message carries a `poll_id`; the message sits in the
 * chronological feed like any other, and the UI renders the poll inside it.
 * Deleting the poll nulls the link (the carrier message remains).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table): void {
            $table->uuid('poll_id')->nullable()->after('parent_id');

            $table->foreign('poll_id')
                ->references('id')->on('polls')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table): void {
            $table->dropForeign(['poll_id']);
            $table->dropColumn('poll_id');
        });
    }
};
