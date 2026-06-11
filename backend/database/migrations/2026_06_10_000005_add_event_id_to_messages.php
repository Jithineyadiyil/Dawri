<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 7 — event-in-feed. Adds a nullable event_id to messages so a community
 * event can ride the same inline "carrier message" path that polls use, making
 * it appear in the chronological channel feed and broadcast live.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('messages', 'event_id')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table): void {
            $table->uuid('event_id')->nullable()->after('poll_id')
                ->comment('Carrier message for a community event (Phase 7)');
            $table->index('event_id');

            $table->foreign('event_id')
                ->references('id')->on('community_events')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('messages', 'event_id')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table): void {
            $table->dropForeign(['event_id']);
            $table->dropIndex(['event_id']);
            $table->dropColumn('event_id');
        });
    }
};
