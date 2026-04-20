<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 4 — Adds nickname to users. `avatar` column already exists.
 *
 *   nickname  : 3-30 chars, alphanumeric + underscore, unique when set
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('users') && ! Schema::hasColumn('users', 'nickname')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->string('nickname', 30)->nullable()->after('name');
                $table->index('nickname');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'nickname')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->dropIndex(['nickname']);
                $table->dropColumn('nickname');
            });
        }
    }
};
