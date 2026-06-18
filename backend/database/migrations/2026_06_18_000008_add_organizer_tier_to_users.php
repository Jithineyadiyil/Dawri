<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — Organizer verification tier on the user.
 *
 *   none          → default. Anyone can create tournaments at the basic
 *                   cap (16 participants, free entry only).
 *   verified      → approved organizer. Up to 128 participants, can charge
 *                   entry fees, can attach sponsors.
 *   professional  → top tier. Unlimited, can promote (featured), ticketing.
 *
 * Tier is changed exclusively by ApprovedVerification flow + super-admin.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->enum('organizer_tier', ['none', 'verified', 'professional'])
                ->default('none')
                ->after('role');
            $table->index('organizer_tier');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropIndex(['organizer_tier']);
            $table->dropColumn('organizer_tier');
        });
    }
};
