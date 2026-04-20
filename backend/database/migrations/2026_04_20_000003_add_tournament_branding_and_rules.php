<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 3 — Tournament branding, rules, cover images.
 *
 * Adds three concerns with idempotent guards:
 *   1. Company-level brand defaults (colors + font) — set once, inherited
 *      by every tournament owned by the company unless overridden.
 *   2. Tournament-level branding override + cover image + rules.
 *   3. Per-participant rules acceptance timestamp so registration can
 *      require agreement when the tournament has rules.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $t): void {
            if (! Schema::hasColumn('companies', 'primary_color'))    { $t->string('primary_color', 7)->nullable()->after('logo_url'); }
            if (! Schema::hasColumn('companies', 'secondary_color'))  { $t->string('secondary_color', 7)->nullable()->after('primary_color'); }
            if (! Schema::hasColumn('companies', 'accent_color'))     { $t->string('accent_color', 7)->nullable()->after('secondary_color'); }
            if (! Schema::hasColumn('companies', 'background_color')) { $t->string('background_color', 7)->nullable()->after('accent_color'); }
            if (! Schema::hasColumn('companies', 'font_family'))      { $t->string('font_family', 100)->nullable()->after('background_color'); }
            if (! Schema::hasColumn('companies', 'brand_config'))     { $t->json('brand_config')->nullable()->after('font_family'); }
        });

        Schema::table('tournaments', function (Blueprint $t): void {
            if (! Schema::hasColumn('tournaments', 'cover_image_path')) { $t->string('cover_image_path', 500)->nullable()->after('prize_pool'); }
            if (! Schema::hasColumn('tournaments', 'rules'))            { $t->text('rules')->nullable()->after('cover_image_path'); }
            if (! Schema::hasColumn('tournaments', 'company_id')) {
                $t->uuid('company_id')->nullable()->after('organizer_id');
                $t->foreign('company_id')->references('id')->on('companies')->nullOnDelete();
                $t->index('company_id');
            }
            if (! Schema::hasColumn('tournaments', 'brand_override'))   { $t->boolean('brand_override')->default(false)->after('rules'); }
            if (! Schema::hasColumn('tournaments', 'primary_color'))    { $t->string('primary_color', 7)->nullable()->after('brand_override'); }
            if (! Schema::hasColumn('tournaments', 'secondary_color'))  { $t->string('secondary_color', 7)->nullable()->after('primary_color'); }
            if (! Schema::hasColumn('tournaments', 'accent_color'))     { $t->string('accent_color', 7)->nullable()->after('secondary_color'); }
            if (! Schema::hasColumn('tournaments', 'background_color')) { $t->string('background_color', 7)->nullable()->after('accent_color'); }
            if (! Schema::hasColumn('tournaments', 'font_family'))      { $t->string('font_family', 100)->nullable()->after('background_color'); }
            if (! Schema::hasColumn('tournaments', 'logo_url'))         { $t->string('logo_url', 500)->nullable()->after('font_family'); }
        });

        Schema::table('tournament_participants', function (Blueprint $t): void {
            if (! Schema::hasColumn('tournament_participants', 'rules_accepted_at')) {
                $t->timestamp('rules_accepted_at')->nullable()->after('seed');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tournament_participants', function (Blueprint $t): void {
            if (Schema::hasColumn('tournament_participants', 'rules_accepted_at')) {
                $t->dropColumn('rules_accepted_at');
            }
        });
        Schema::table('tournaments', function (Blueprint $t): void {
            if (Schema::hasColumn('tournaments', 'company_id')) {
                $t->dropForeign(['company_id']);
                $t->dropColumn('company_id');
            }
            foreach (['cover_image_path','rules','brand_override','primary_color','secondary_color','accent_color','background_color','font_family','logo_url'] as $col) {
                if (Schema::hasColumn('tournaments', $col)) { $t->dropColumn($col); }
            }
        });
        Schema::table('companies', function (Blueprint $t): void {
            foreach (['primary_color','secondary_color','accent_color','background_color','font_family','brand_config'] as $col) {
                if (Schema::hasColumn('companies', $col)) { $t->dropColumn($col); }
            }
        });
    }
};
