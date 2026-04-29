<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 11 — Marketplace admin panel + distributor credentials management.
 *
 * Two schema changes:
 *
 *   1. New table `distributor_credentials`:
 *      Moves API keys out of .env and into an encrypted-at-rest database
 *      table, so admins can rotate credentials via the UI without a
 *      redeploy. Supports separate sandbox vs production entries per
 *      distributor, with an is_active flag as the master switch.
 *
 *   2. `digital_orders` additions:
 *      - `refunded_at`: when the refund was processed
 *      - `refund_reason`: free text audit field
 *      - `admin_notes`: operator notes visible in admin order view
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('distributor_credentials')) {
            Schema::create('distributor_credentials', function (Blueprint $t) {
                $t->id();
                $t->string('distributor', 50)
                    ->comment('likecard|wupex|reloadly|jawaker');
                $t->string('environment', 20)->default('sandbox')
                    ->comment('sandbox|production');

                // Encrypted via DistributorCredential model cast
                $t->text('api_key')->nullable();
                $t->text('api_secret')->nullable();
                $t->text('client_id')->nullable();
                $t->text('client_secret')->nullable();

                $t->string('base_url', 300)->nullable();

                // Controls whether this credential set is used at runtime.
                // DistributorRouter will fall through to next distributor
                // if the active credentials for a given distributor fail.
                $t->boolean('is_active')->default(false);

                // Audit — which admin last updated these credentials
                // users.id is UUID (users model uses HasUuids trait) — match that type here.
                // foreignId() would create BIGINT and MySQL rejects the FK as "incorrectly formed".
                $t->uuid('updated_by_user_id')->nullable();
                $t->foreign('updated_by_user_id')
                    ->references('id')->on('users')
                    ->nullOnDelete();
                $t->timestamp('last_tested_at')->nullable();
                $t->boolean('last_test_passed')->nullable();
                $t->text('last_test_error')->nullable();

                $t->timestamps();

                $t->unique(['distributor', 'environment']);
                $t->index('is_active');
            });
        }

        Schema::table('digital_orders', function (Blueprint $t) {
            if (! Schema::hasColumn('digital_orders', 'refunded_at')) {
                $t->timestamp('refunded_at')->nullable()->after('fulfilled_at');
            }
            if (! Schema::hasColumn('digital_orders', 'refund_reason')) {
                $t->string('refund_reason', 500)->nullable()->after('refunded_at');
            }
            if (! Schema::hasColumn('digital_orders', 'admin_notes')) {
                $t->text('admin_notes')->nullable()->after('refund_reason');
            }
        });
    }

    public function down(): void
    {
        Schema::table('digital_orders', function (Blueprint $t) {
            foreach (['refunded_at', 'refund_reason', 'admin_notes'] as $col) {
                if (Schema::hasColumn('digital_orders', $col)) {
                    $t->dropColumn($col);
                }
            }
        });

        Schema::dropIfExists('distributor_credentials');
    }
};
