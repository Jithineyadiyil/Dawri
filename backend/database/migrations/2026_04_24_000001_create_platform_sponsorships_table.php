<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 14: platform-level sponsorships.
 *
 * Sponsors of Dawri-the-platform (not tied to any specific tournament).
 * Reuses the existing `sponsors` table — same Pepsi/Mobily/etc. records
 * can simultaneously sponsor a tournament AND the platform.
 *
 * Tier model:
 *   - title    → headline brand, large hero placement
 *   - standard → carousel placement
 *
 * Activation window:
 *   starts_at / ends_at — soft activation window. NULL on either side
 *   means open-ended in that direction. is_active is the master kill
 *   switch; when false, the sponsorship is hidden regardless of dates.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('platform_sponsorships', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('sponsor_id');
            $t->enum('tier', ['title', 'standard'])->default('standard');
            $t->integer('display_order')->default(0)
                ->comment('Lower number = earlier placement within tier');

            $t->timestamp('starts_at')->nullable();
            $t->timestamp('ends_at')->nullable();
            $t->boolean('is_active')->default(true);

            $t->decimal('contract_value_sar', 12, 2)->nullable()
                ->comment('Internal note for finance reporting; never shown publicly');
            $t->text('internal_notes')->nullable();

            $t->timestamps();

            $t->index(['is_active', 'tier']);
            $t->index('display_order');
            $t->foreign('sponsor_id')->references('id')->on('sponsors')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('platform_sponsorships');
    }
};
