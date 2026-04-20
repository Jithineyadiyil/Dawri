<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Marketplace tables — idempotent create-or-patch.
 *
 * ── Why this file exists ─────────────────────────────────────────────────
 *   The initial consolidated migration `2026_01_01_000001_create_dawri_tables`
 *   already creates `digital_products`, `digital_orders`, and `digital_codes`.
 *   This migration originally did a second CREATE TABLE for the same tables,
 *   which collided on any database where the initial migration had already
 *   run → "Base table or view already exists: 1050".
 *
 *   The two schemas differed in runtime-important ways — the initial version
 *   used `distributor_id` but the runtime code (MarketplaceController,
 *   DigitalProduct model) uses `distributor_product_id` and `sort_order`.
 *   This migration now:
 *     • CREATEs each table only when it's genuinely missing, using the
 *       current (newer) schema.
 *     • ALTERs each existing table to add only the columns + indexes that
 *       the runtime code depends on, without touching columns that the
 *       old schema already provides.
 *
 *   Safe to run on: fresh installs, installs with the initial migration
 *   already applied, and installs that previously failed on this migration.
 */
return new class extends Migration
{
    public function up(): void
    {
        $this->upsertDigitalProducts();
        $this->upsertDigitalOrders();
        $this->upsertDigitalCodes();
    }

    public function down(): void
    {
        // down() intentionally a no-op. The initial consolidated migration
        // owns these tables for rollback purposes; a destructive drop here
        // would break its rollback contract.
    }

    // ──────────────────────────────────────────────────────────────────────

    private function upsertDigitalProducts(): void
    {
        if (! Schema::hasTable('digital_products')) {
            Schema::create('digital_products', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->string('distributor', 50)->default('likecard');
                $table->string('distributor_product_id', 100)->nullable();
                $table->string('name', 200);
                $table->string('name_ar', 200)->nullable();
                $table->string('brand', 100);
                $table->string('category', 50)->comment('gaming|streaming|shopping|social');
                $table->decimal('face_value', 10, 2);
                $table->string('currency', 3)->default('SAR');
                $table->decimal('our_cost', 10, 2)->nullable();
                $table->decimal('our_price', 10, 2);
                $table->string('region', 10)->default('SA');
                $table->string('image_url', 500)->nullable();
                $table->boolean('is_active')->default(true);
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
                $table->index(['category', 'is_active']);
                $table->index(['brand', 'is_active']);
            });

            return;
        }

        // Table exists from the initial migration. Patch missing columns
        // (distributor_product_id, sort_order) and indexes, without touching
        // existing columns that the old schema already provides.
        Schema::table('digital_products', function (Blueprint $table): void {
            if (! Schema::hasColumn('digital_products', 'distributor_product_id')) {
                $table->string('distributor_product_id', 100)->nullable()->after('distributor');
            }

            if (! Schema::hasColumn('digital_products', 'sort_order')) {
                $table->unsignedInteger('sort_order')->default(0)->after('is_active');
            }
        });

        // Backfill distributor_product_id from the old `distributor_id` column,
        // if the old column exists and the new one is still empty.
        if (Schema::hasColumn('digital_products', 'distributor_id')) {
            DB::statement(
                'UPDATE digital_products
                 SET    distributor_product_id = distributor_id
                 WHERE  distributor_product_id IS NULL
                   AND  distributor_id IS NOT NULL'
            );
        }

        // Add query-path indexes if missing. Wrapped in a try because MySQL
        // has no IF NOT EXISTS on CREATE INDEX before 8.0.29 and the index
        // name collision check needs different SQL per server version.
        $this->safeCreateIndex('digital_products', 'digital_products_category_is_active_index', ['category', 'is_active']);
        $this->safeCreateIndex('digital_products', 'digital_products_brand_is_active_index',    ['brand', 'is_active']);
    }

    private function upsertDigitalOrders(): void
    {
        if (! Schema::hasTable('digital_orders')) {
            Schema::create('digital_orders', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->uuid('user_id');
                $table->uuid('product_id');
                $table->string('distributor', 50)->default('likecard');
                $table->string('distributor_order_id', 200)->nullable();
                $table->string('idempotency_key', 200)->unique();
                $table->unsignedInteger('quantity')->default(1);
                $table->decimal('unit_price', 10, 2);
                $table->decimal('total_price', 10, 2);
                $table->string('status', 30)->default('pending');
                $table->string('payment_method', 50)->default('wallet');
                $table->string('payment_ref', 200)->nullable();
                $table->timestamp('fulfilled_at')->nullable();
                $table->timestamps();
                $table->index(['user_id', 'status']);
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->foreign('product_id')->references('id')->on('digital_products');
            });

            return;
        }

        Schema::table('digital_orders', function (Blueprint $table): void {
            if (! Schema::hasColumn('digital_orders', 'payment_method')) {
                $table->string('payment_method', 50)->default('wallet');
            }

            if (! Schema::hasColumn('digital_orders', 'payment_ref')) {
                $table->string('payment_ref', 200)->nullable();
            }

            if (! Schema::hasColumn('digital_orders', 'idempotency_key')) {
                $table->string('idempotency_key', 200)->nullable();
            }

            if (! Schema::hasColumn('digital_orders', 'fulfilled_at')) {
                $table->timestamp('fulfilled_at')->nullable();
            }
        });

        $this->safeCreateIndex('digital_orders', 'digital_orders_user_id_status_index', ['user_id', 'status']);
    }

    private function upsertDigitalCodes(): void
    {
        if (! Schema::hasTable('digital_codes')) {
            Schema::create('digital_codes', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->uuid('order_id');
                $table->text('code_enc');
                $table->string('code_hash', 64)->nullable();
                $table->timestamp('revealed_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();
                $table->foreign('order_id')->references('id')->on('digital_orders')->cascadeOnDelete();
            });

            return;
        }

        Schema::table('digital_codes', function (Blueprint $table): void {
            if (! Schema::hasColumn('digital_codes', 'expires_at')) {
                $table->timestamp('expires_at')->nullable();
            }

            if (! Schema::hasColumn('digital_codes', 'code_hash')) {
                $table->string('code_hash', 64)->nullable();
            }
        });
    }

    /**
     * Create an index if it doesn't already exist.
     * MySQL prior to 8.0.29 lacks IF NOT EXISTS for CREATE INDEX, so we
     * check the information_schema first.
     */
    private function safeCreateIndex(string $table, string $indexName, array $columns): void
    {
        $exists = DB::selectOne(
            'SELECT COUNT(*) AS c
             FROM   information_schema.statistics
             WHERE  table_schema = DATABASE()
               AND  table_name   = ?
               AND  index_name   = ?',
            [$table, $indexName]
        );

        if ((int) $exists->c > 0) {
            return;
        }

        $cols = implode(',', array_map(fn ($c) => "`{$c}`", $columns));
        DB::statement("CREATE INDEX `{$indexName}` ON `{$table}` ({$cols})");
    }
};
