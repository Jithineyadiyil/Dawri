<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 12A — inventory-pool table RESET
 *
 * WHY THIS EXISTS
 *   The running database has `code_batches` and `product_codes` tables
 *   with an older schema (batch_number / codes_count / unit_cost columns,
 *   with reserved_order_id instead of reserved_by_order_id, etc.) that
 *   pre-dates the clean Sprint 12A API. The InventoryCodeService expects
 *   the newer column names, so we drop and recreate both tables.
 *
 * SAFE TO RUN because the tables have no real data yet (Sprint 12A was
 * never exercised end-to-end — tests were the first consumer).
 *
 * This migration SUPERSEDES the old `2026_04_22_000004_create_inventory_pool_tables`
 * migration. If Laravel already has that old migration entry in the
 * `migrations` table, leave it — the `dropIfExists` calls make this
 * migration idempotent, and the entry has no runtime effect once run.
 *
 * If you want to be extra clean:
 *
 *   -- Run BEFORE this migration, optional:
 *   DELETE FROM migrations WHERE migration LIKE '%inventory_pool%';
 *
 * Then `php artisan migrate` will produce a clean history.
 *
 * Does NOT touch `digital_products` columns — those were added correctly
 * by earlier migrations and have real default values / backfilled data.
 */
return new class extends Migration
{
    public function up(): void
    {
        // Order matters: product_codes has FK → code_batches, so drop child first.
        Schema::dropIfExists('product_codes');
        Schema::dropIfExists('code_batches');

        // ── code_batches (canonical Sprint 12A schema) ─────────────────
        Schema::create('code_batches', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('product_id');

            $t->string('supplier_name', 120)
                ->comment('e.g. LikeCard, self-import, specific vendor name');
            $t->string('supplier_ref', 200)->nullable()
                ->comment("Supplier's batch reference / PO / invoice number");
            $t->string('source', 30)->default('manual')
                ->comment('manual | csv_upload | webhook');

            $t->unsignedInteger('code_count')->default(0);
            $t->decimal('unit_cost_sar', 10, 2)->nullable()
                ->comment('What Dawri paid per code — used for margin reporting');
            $t->decimal('total_cost_sar', 12, 2)->nullable();

            $t->uuid('uploaded_by_user_id')->nullable();
            $t->text('notes')->nullable();
            $t->timestamps();

            $t->foreign('product_id')->references('id')->on('digital_products')->cascadeOnDelete();
            $t->foreign('uploaded_by_user_id')->references('id')->on('users')->nullOnDelete();
            $t->index(['product_id', 'created_at']);
            $t->index('supplier_name');
        });

        // ── product_codes (canonical Sprint 12A schema) ────────────────
        Schema::create('product_codes', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('product_id');
            $t->uuid('batch_id')->nullable();

            // Encrypted at rest via model cast
            $t->text('code_enc');
            $t->string('code_hash', 64)->unique();

            $t->string('serial_number', 120)->nullable();
            $t->date('expires_at')->nullable();

            // Lifecycle: available → reserved → delivered (terminal)
            //            available → expired (via nightly job)
            //            reserved → available (on payment failure)
            $t->string('status', 20)->default('available');

            $t->uuid('reserved_by_order_id')->nullable();
            $t->timestamp('reserved_at')->nullable();
            $t->timestamp('delivered_at')->nullable();

            $t->timestamps();

            $t->foreign('product_id')->references('id')->on('digital_products')->cascadeOnDelete();
            $t->foreign('batch_id')->references('id')->on('code_batches')->nullOnDelete();

            // Atomic-claim query index:
            //   WHERE product_id=? AND status='available'
            //     AND (expires_at IS NULL OR expires_at > NOW())
            $t->index(['product_id', 'status', 'expires_at'], 'pc_claim_idx');
            $t->index('reserved_by_order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_codes');
        Schema::dropIfExists('code_batches');
    }
};
