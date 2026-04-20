<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Creates the companies (organizations) table and links users/subscriptions to companies.
 * Dawri admin manages companies; each company has users, subscriptions, and tournaments.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name', 200);
            $table->string('name_ar', 200)->nullable();
            $table->string('domain', 100)->nullable()->comment('e.g. aramco.com');
            $table->string('industry', 100)->nullable();
            $table->string('country', 2)->default('SA');
            $table->string('city', 100)->nullable();
            $table->string('logo_url', 500)->nullable();
            $table->string('contact_name', 100)->nullable();
            $table->string('contact_email', 200)->nullable();
            $table->string('contact_phone', 30)->nullable();
            $table->integer('employee_count')->default(0)->comment('Licensed employee seats');
            $table->string('cr_number', 50)->nullable()->comment('Saudi Commercial Registration');
            $table->string('status', 20)->default('active')->comment('active, suspended, churned, trial');
            $table->text('notes')->nullable()->comment('Internal admin notes');
            $table->timestamps();

            $table->index('status');
            $table->index('name');

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // Link users to companies
        Schema::table('users', static function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'company_id')) {
                $table->uuid('company_id')->nullable();
                $table->foreign('company_id')->references('id')->on('companies')->nullOnDelete();
                $table->index('company_id');
            }
        });

        // Link subscriptions to companies
        Schema::table('subscriptions', static function (Blueprint $table): void {
            if (! Schema::hasColumn('subscriptions', 'company_id')) {
                $table->uuid('company_id')->nullable();
                $table->foreign('company_id')->references('id')->on('companies')->nullOnDelete();
                $table->index('company_id');
            }
        });

        // Link tournaments to companies
        Schema::table('tournaments', static function (Blueprint $table): void {
            if (! Schema::hasColumn('tournaments', 'company_id')) {
                $table->uuid('company_id')->nullable();
                $table->index('company_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tournaments', static function (Blueprint $table): void {
            if (Schema::hasColumn('tournaments', 'company_id')) $table->dropColumn('company_id');
        });
        Schema::table('subscriptions', static function (Blueprint $table): void {
            if (Schema::hasColumn('subscriptions', 'company_id')) {
                $table->dropForeign(['company_id']);
                $table->dropColumn('company_id');
            }
        });
        Schema::table('users', static function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'company_id')) {
                $table->dropForeign(['company_id']);
                $table->dropColumn('company_id');
            }
        });
        Schema::dropIfExists('companies');
    }
};
