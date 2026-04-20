<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Subscription and billing tables for the Dawri SaaS platform.
 *
 * - subscriptions: Active plan assignment per user/organization
 * - invoices: Billing history and payment records
 * - subscription_usage: Monthly usage tracking for limit enforcement
 */
return new class extends Migration
{
    public function up(): void
    {
        // ── Subscriptions ─────────────────────────────────────────────────
        Schema::create('subscriptions', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->comment('The account owner / org admin');
            $table->string('plan', 30)->default('free')->comment('free, starter, professional, enterprise');
            $table->string('status', 20)->default('active')->comment('active, trial, past_due, cancelled, expired');
            $table->decimal('price', 10, 2)->default(0)->comment('Current billing amount in SAR');
            $table->string('billing_cycle', 10)->default('monthly')->comment('monthly, annual, custom');
            $table->dateTime('trial_ends_at')->nullable();
            $table->dateTime('current_period_start');
            $table->dateTime('current_period_end');
            $table->dateTime('cancelled_at')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->string('payment_method', 30)->nullable()->comment('mada, stc_pay, credit_card, bank_transfer');
            $table->string('payment_ref', 200)->nullable();
            $table->json('metadata')->nullable()->comment('Custom enterprise terms, discount info, etc.');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->index(['user_id', 'status']);
            $table->index('plan');

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Invoices ──────────────────────────────────────────────────────
        Schema::create('invoices', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('subscription_id');
            $table->uuid('user_id');
            $table->string('invoice_number', 50)->unique()->comment('e.g. INV-2026-00001');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('vat_amount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('currency', 3)->default('SAR');
            $table->string('status', 20)->default('pending')->comment('pending, paid, failed, refunded');
            $table->dateTime('period_start');
            $table->dateTime('period_end');
            $table->dateTime('paid_at')->nullable();
            $table->string('payment_method', 30)->nullable();
            $table->string('payment_ref', 200)->nullable();
            $table->json('line_items')->nullable()->comment('JSON breakdown of charges');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('subscription_id')->references('id')->on('subscriptions')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->index(['user_id', 'status']);

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Usage Tracking ────────────────────────────────────────────────
        Schema::create('subscription_usage', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('subscription_id');
            $table->string('metric', 50)->comment('tournaments_created, employees_added, etc.');
            $table->integer('count')->default(0);
            $table->string('period', 7)->comment('YYYY-MM format');
            $table->timestamps();

            $table->foreign('subscription_id')->references('id')->on('subscriptions')->cascadeOnDelete();
            $table->unique(['subscription_id', 'metric', 'period'], 'usage_unique');

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // ── Add subscription_plan to users ────────────────────────────────
        Schema::table('users', static function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'subscription_plan')) {
                $table->string('subscription_plan', 30)->default('free');
            }
            if (! Schema::hasColumn('users', 'organization_name')) {
                $table->string('organization_name', 200)->nullable();
            }
            if (! Schema::hasColumn('users', 'organization_name_ar')) {
                $table->string('organization_name_ar', 200)->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_usage');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('subscriptions');

        Schema::table('users', static function (Blueprint $table): void {
            $cols = ['subscription_plan', 'organization_name', 'organization_name_ar'];
            foreach ($cols as $c) {
                if (Schema::hasColumn('users', $c)) {
                    $table->dropColumn($c);
                }
            }
        });
    }
};
