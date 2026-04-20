<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Invoices table — idempotent create-or-patch.
 *
 * ── Why this file exists ─────────────────────────────────────────────────
 *   Migration `2026_04_05_000010_create_subscription_tables` already creates
 *   the `invoices` table with the authoritative schema (invoice_number,
 *   subtotal, vat_amount, total, period_start, period_end, paid_at,
 *   payment_method, payment_ref, line_items, notes).
 *
 *   This file previously did a second, simpler CREATE TABLE, which collided
 *   with "Base table or view already exists" on any DB where the subscription
 *   migration had already run.
 *
 *   The fix: detect the table and patch missing columns that the later
 *   SubscriptionController code may depend on (e.g. invoice_url, amount,
 *   description), rather than re-creating.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('invoices')) {
            // Subscriptions migration didn't run yet — create with the full schema.
            Schema::create('invoices', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->uuid('user_id');
                $table->string('subscription_id', 36)->nullable();
                $table->string('plan', 30)->nullable();
                $table->string('invoice_number', 50)->nullable()->unique();
                $table->decimal('subtotal', 10, 2)->default(0);
                $table->decimal('vat_amount', 10, 2)->default(0);
                $table->decimal('total', 10, 2)->default(0);
                $table->decimal('amount', 10, 2)->default(0);
                $table->string('currency', 3)->default('SAR');
                $table->string('status', 20)->default('paid');
                $table->string('description', 255)->nullable();
                $table->string('invoice_url', 500)->nullable();
                $table->dateTime('period_start')->nullable();
                $table->dateTime('period_end')->nullable();
                $table->dateTime('paid_at')->nullable();
                $table->string('payment_method', 30)->nullable();
                $table->string('payment_ref', 200)->nullable();
                $table->json('line_items')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->index(['user_id', 'status']);
            });

            return;
        }

        // Table exists from the subscription migration. Patch only what's
        // missing for the SubscriptionController compatibility shim.
        Schema::table('invoices', function (Blueprint $table): void {
            if (! Schema::hasColumn('invoices', 'amount')) {
                $table->decimal('amount', 10, 2)->default(0)->after('total');
            }

            if (! Schema::hasColumn('invoices', 'description')) {
                $table->string('description', 255)->nullable();
            }

            if (! Schema::hasColumn('invoices', 'invoice_url')) {
                $table->string('invoice_url', 500)->nullable();
            }

            if (! Schema::hasColumn('invoices', 'plan')) {
                $table->string('plan', 30)->nullable();
            }
        });

        // Backfill: for any existing invoices where amount=0 but total>0,
        // mirror total into amount so existing SubscriptionController reads
        // match what it wrote.
        DB::statement(
            'UPDATE invoices
             SET    amount = total
             WHERE  (amount IS NULL OR amount = 0)
               AND  total > 0'
        );
    }

    public function down(): void
    {
        // Intentionally empty — the subscription migration owns invoices rollback.
    }
};
