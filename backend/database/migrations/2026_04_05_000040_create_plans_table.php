<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

/**
 * Stores subscription plans in the database so admin can edit pricing,
 * features, and limits at runtime without code deployment.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', static function (Blueprint $table): void {
            $table->string('key', 30)->primary()->comment('free, starter, professional, enterprise');
            $table->string('name', 100);
            $table->string('name_ar', 100);
            $table->string('type', 10)->default('b2b')->comment('b2c or b2b');
            $table->decimal('price', 10, 2)->nullable()->comment('Monthly price in SAR, null=custom');
            $table->string('billing', 20)->default('monthly');
            $table->string('description', 500)->nullable();
            $table->string('description_ar', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);

            // Limits
            $table->integer('limit_tournaments_per_month')->default(0)->comment('-1 = unlimited');
            $table->integer('limit_max_participants')->default(0);
            $table->integer('limit_max_employees')->default(0);
            $table->integer('limit_moderators')->default(0);

            // Features (boolean flags)
            $table->boolean('feat_create_tournaments')->default(false);
            $table->boolean('feat_hr_csv_import')->default(false);
            $table->boolean('feat_hr_api_integration')->default(false);
            $table->boolean('feat_white_label')->default(false);
            $table->boolean('feat_bulk_prizes')->default(false);
            $table->boolean('feat_engagement_reports')->default(false);
            $table->boolean('feat_advanced_analytics')->default(false);
            $table->boolean('feat_sso_saml')->default(false);
            $table->boolean('feat_dedicated_manager')->default(false);
            $table->boolean('feat_custom_sla')->default(false);

            $table->timestamps();

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });

        // Seed default plans
        DB::table('plans')->insert([
            [
                'key' => 'free', 'name' => 'Free', 'name_ar' => 'مجاني',
                'type' => 'b2c', 'price' => 0, 'billing' => 'forever', 'sort_order' => 1,
                'description' => 'For individual players who want to compete.',
                'description_ar' => 'للاعبين الأفراد الذين يريدون المنافسة.',
                'is_active' => true,
                'limit_tournaments_per_month' => 0, 'limit_max_participants' => 0,
                'limit_max_employees' => 0, 'limit_moderators' => 0,
                'feat_create_tournaments' => false, 'feat_hr_csv_import' => false,
                'feat_hr_api_integration' => false, 'feat_white_label' => false,
                'feat_bulk_prizes' => false, 'feat_engagement_reports' => false,
                'feat_advanced_analytics' => false, 'feat_sso_saml' => false,
                'feat_dedicated_manager' => false, 'feat_custom_sla' => false,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'key' => 'starter', 'name' => 'Starter', 'name_ar' => 'المبتدئ',
                'type' => 'b2b', 'price' => 2499, 'billing' => 'monthly', 'sort_order' => 2,
                'description' => 'For small companies running engagement events.',
                'description_ar' => 'للشركات الصغيرة التي تنظم فعاليات تفاعلية.',
                'is_active' => true,
                'limit_tournaments_per_month' => 10, 'limit_max_participants' => 64,
                'limit_max_employees' => 200, 'limit_moderators' => 2,
                'feat_create_tournaments' => true, 'feat_hr_csv_import' => true,
                'feat_hr_api_integration' => false, 'feat_white_label' => false,
                'feat_bulk_prizes' => false, 'feat_engagement_reports' => true,
                'feat_advanced_analytics' => false, 'feat_sso_saml' => false,
                'feat_dedicated_manager' => false, 'feat_custom_sla' => false,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'key' => 'professional', 'name' => 'Professional', 'name_ar' => 'المحترف',
                'type' => 'b2b', 'price' => 7499, 'billing' => 'monthly', 'sort_order' => 3,
                'description' => 'For HR teams running regular engagement programs.',
                'description_ar' => 'لفرق الموارد البشرية التي تدير برامج تفاعل منتظمة.',
                'is_active' => true,
                'limit_tournaments_per_month' => -1, 'limit_max_participants' => 256,
                'limit_max_employees' => 1000, 'limit_moderators' => 10,
                'feat_create_tournaments' => true, 'feat_hr_csv_import' => true,
                'feat_hr_api_integration' => true, 'feat_white_label' => true,
                'feat_bulk_prizes' => true, 'feat_engagement_reports' => true,
                'feat_advanced_analytics' => true, 'feat_sso_saml' => false,
                'feat_dedicated_manager' => false, 'feat_custom_sla' => false,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'key' => 'enterprise', 'name' => 'Enterprise', 'name_ar' => 'المؤسسي',
                'type' => 'b2b', 'price' => null, 'billing' => 'custom', 'sort_order' => 4,
                'description' => 'For large enterprises and multi-location companies.',
                'description_ar' => 'للمؤسسات الكبيرة والشركات متعددة المواقع.',
                'is_active' => true,
                'limit_tournaments_per_month' => -1, 'limit_max_participants' => 512,
                'limit_max_employees' => -1, 'limit_moderators' => -1,
                'feat_create_tournaments' => true, 'feat_hr_csv_import' => true,
                'feat_hr_api_integration' => true, 'feat_white_label' => true,
                'feat_bulk_prizes' => true, 'feat_engagement_reports' => true,
                'feat_advanced_analytics' => true, 'feat_sso_saml' => true,
                'feat_dedicated_manager' => true, 'feat_custom_sla' => true,
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
