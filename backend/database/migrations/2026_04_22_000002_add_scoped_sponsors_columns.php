<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 10 — Organizer-created sponsors.
 *
 * Adds ownership + visibility columns to the sponsors table:
 *
 *   - created_by_user_id: nullable UUID FK to users. Tracks which user
 *     (organizer or admin) created this sponsor. NULL for rows from the
 *     SponsorSeeder and other system-created entries.
 *
 *   - is_global: boolean flag. TRUE means the sponsor is part of the
 *     platform-wide catalog and every organizer can use it. FALSE means
 *     the sponsor was created by an organizer and is only visible to
 *     that organizer (and admins) until an admin promotes it.
 *
 * All existing rows are backfilled with is_global = true so the seeded
 * 8 sponsors remain globally available.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sponsors', function (Blueprint $t) {
            $t->uuid('created_by_user_id')->nullable()->after('company_id');
            $t->boolean('is_global')->default(true)->after('created_by_user_id');

            $t->index('created_by_user_id');
            $t->index('is_global');
        });

        // FK conditionally — matches the pattern used in Sprint 8's migration
        if (Schema::hasTable('users')) {
            Schema::table('sponsors', function (Blueprint $t) {
                $t->foreign('created_by_user_id')
                    ->references('id')->on('users')
                    ->nullOnDelete();
            });
        }

        // Backfill existing rows as globally visible (they're all admin-seeded)
        DB::table('sponsors')->update(['is_global' => true]);
    }

    public function down(): void
    {
        Schema::table('sponsors', function (Blueprint $t) {
            if (Schema::hasColumn('sponsors', 'created_by_user_id')) {
                try { $t->dropForeign(['created_by_user_id']); } catch (\Throwable $e) {}
                $t->dropColumn('created_by_user_id');
            }
            if (Schema::hasColumn('sponsors', 'is_global')) {
                $t->dropColumn('is_global');
            }
        });
    }
};
