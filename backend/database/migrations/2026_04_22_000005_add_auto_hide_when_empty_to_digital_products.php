<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 12A follow-up — adds the `auto_hide_when_empty` column.
 *
 * Default value TRUE preserves existing Sprint 12A behaviour (auto-hide
 * when inventory pool drops to zero). Admins can opt out per product.
 *
 * Safe to run after migration 2026_04_22_000004 — checks for column
 * existence and no-ops if already present.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('digital_products', 'auto_hide_when_empty')) {
            return;
        }

        Schema::table('digital_products', function (Blueprint $t) {
            $t->boolean('auto_hide_when_empty')
                ->default(true)
                ->after('low_stock_threshold')
                ->comment('Inventory-mode only: auto-hide product when pool empty');
        });
    }

    public function down(): void
    {
        Schema::table('digital_products', function (Blueprint $t) {
            if (Schema::hasColumn('digital_products', 'auto_hide_when_empty')) {
                $t->dropColumn('auto_hide_when_empty');
            }
        });
    }
};
