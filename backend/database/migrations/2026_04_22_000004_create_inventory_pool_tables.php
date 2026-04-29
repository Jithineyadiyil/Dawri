<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 12A — Inventory-pool fulfillment mode.
 *
 * Three schema changes:
 *
 *   1. digital_products additions:
 *      - fulfillment_mode ENUM('api','inventory')  default 'api'
 *      - low_stock_threshold INT                   default 5
 *
 *      Existing 98 products remain on 'api' mode. Admins flip individual
 *      products to 'inventory' via the edit modal when they're ready to
 *      pre-load codes.
 *
 *   2. code_batches (new):
 *      Tracks shipments of pre-purchased codes. One row per upload event.
 *      Enables reconciliation ("how many codes did LikeCard send on 2026-04-20?")
 *      and gives admins an audit trail independent of the per-code rows.
 *
 *   3. product_codes (new):
 *      One row per physical/encrypted code. Status lifecycle:
 *        available  →  reserved  →  delivered    (happy path)
 *                                   ↘  expired   (expiry cron)
 *                                   ↘  revoked   (admin removed bad code)
 *
 *      code_hash is a SHA-256 of the plaintext, indexed UNIQUE. Prevents
 *      accidental re-upload of the same code across batches.
 *
 *      Index on (product_id, status) is the hot path for claiming codes —
 *      the atomic `SELECT ... FOR UPDATE LIMIT 1 WHERE product_id=? AND
 *      status='available'` query at order time.
 */
return new class extends Migration
{
    public function up(): void
    {
        // ── digital_products: mode + threshold ────────────────────────
        Schema::table('digital_products', function (Blueprint $t) {
            if (! Schema::hasColumn('digital_products', 'fulfillment_mode')) {
                $t->enum('fulfillment_mode', ['api', 'inventory'])
                    ->default('api')
                    ->after('distributor')
                    ->comment('api: live distributor call | inventory: pre-loaded code pool');
            }
            if (! Schema::hasColumn('digital_products', 'low_stock_threshold')) {
                $t->unsignedInteger('low_stock_threshold')
                    ->default(5)
                    ->after('fulfillment_mode');
            }
            if (! Schema::hasColumn('digital_products', 'auto_hide_when_empty')) {
                $t->boolean('auto_hide_when_empty')
                    ->default(true)
                    ->after('low_stock_threshold');
            }
        });

        // ── code_batches ──────────────────────────────────────────────
        if (! Schema::hasTable('code_batches')) {
            Schema::create('code_batches', function (Blueprint $t) {
                $t->uuid('id')->primary();
                $t->uuid('product_id');
                $t->foreign('product_id')
                    ->references('id')->on('digital_products')
                    ->cascadeOnDelete();

                $t->enum('source', ['manual_paste', 'manual_csv', 'webhook', 'api'])
                    ->default('manual_paste');

                // Distributor's identifier for the shipment (e.g. LikeCard PO number)
                $t->string('supplier_ref', 100)->nullable();
                // Admin's internal batch tag
                $t->string('batch_number', 50)->nullable();

                $t->unsignedInteger('codes_count')->default(0);
                $t->unsignedInteger('duplicates_skipped')->default(0);
                $t->decimal('unit_cost', 10, 2)->nullable()
                    ->comment('Our cost per code in SAR');

                $t->uuid('uploaded_by_user_id')->nullable();
                $t->foreign('uploaded_by_user_id')
                    ->references('id')->on('users')
                    ->nullOnDelete();

                $t->text('notes')->nullable();
                $t->timestamp('expires_at')->nullable();
                $t->timestamps();

                $t->index(['product_id', 'created_at']);
            });
        }

        // ── product_codes ─────────────────────────────────────────────
        if (! Schema::hasTable('product_codes')) {
            Schema::create('product_codes', function (Blueprint $t) {
                $t->uuid('id')->primary();

                $t->uuid('product_id');
                $t->foreign('product_id')
                    ->references('id')->on('digital_products')
                    ->cascadeOnDelete();

                $t->uuid('batch_id');
                $t->foreign('batch_id')
                    ->references('id')->on('code_batches')
                    ->cascadeOnDelete();

                $t->text('code_enc');                       // AES-256 encrypted
                $t->string('code_hash', 64)->unique();      // SHA-256 for dedup
                $t->string('serial_number', 100)->nullable(); // card serial if distinct from code

                $t->enum('status', ['available', 'reserved', 'delivered', 'expired', 'revoked'])
                    ->default('available');

                // When status=reserved or delivered, which order claimed it?
                $t->uuid('reserved_for_order_id')->nullable();
                // Not a FK — digital_orders uses uuid id but we want to preserve
                // history even if an order row is deleted (which it shouldn't be).

                $t->timestamp('reserved_at')->nullable();
                $t->timestamp('delivered_at')->nullable();
                $t->timestamp('expires_at')->nullable();
                $t->timestamp('revoked_at')->nullable();
                $t->string('revoked_reason', 255)->nullable();

                $t->timestamps();

                // Critical hot path — claimCode() runs this exact lookup:
                $t->index(['product_id', 'status'], 'idx_pc_product_status');
                $t->index('expires_at');
                $t->index('reserved_for_order_id');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('product_codes');
        Schema::dropIfExists('code_batches');

        Schema::table('digital_products', function (Blueprint $t) {
            foreach (['auto_hide_when_empty', 'low_stock_threshold', 'fulfillment_mode'] as $col) {
                if (Schema::hasColumn('digital_products', $col)) {
                    $t->dropColumn($col);
                }
            }
        });
    }
};
