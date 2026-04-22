<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 8 — Sponsorship tables.
 *
 * Two tables:
 *   - sponsors: a brand/company that can sponsor tournaments. May or may not
 *     be linked to an existing Dawri Company account. Dawri staff manages
 *     these rows via the admin panel.
 *   - sponsorships: M2M-like pivot that attaches a sponsor to a specific
 *     tournament, records what they contributed (cash, in-kind, or pure
 *     logo placement), and tracks fulfillment state.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sponsors', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('name', 120);
            $t->string('name_ar', 120)->nullable();
            $t->string('slug', 140)->unique();
            $t->text('tagline')->nullable();
            $t->text('tagline_ar')->nullable();
            $t->string('logo_url', 500)->nullable();
            $t->string('website_url', 300)->nullable();
            $t->string('contact_name', 120)->nullable();
            $t->string('contact_email', 180)->nullable();
            $t->string('contact_phone', 40)->nullable();

            // Optional FK to companies table. Null for external sponsors
            // (e.g. a global brand that doesn't run tournaments themselves).
            $t->uuid('company_id')->nullable();

            $t->boolean('is_active')->default(true);
            $t->timestamps();

            $t->index('is_active');
            $t->index('company_id');
            // FK is added conditionally below so the migration works even
            // if the companies table isn't present on every environment.
        });

        // Only add the FK if the companies table actually exists.
        if (Schema::hasTable('companies')) {
            Schema::table('sponsors', function (Blueprint $t) {
                $t->foreign('company_id')
                    ->references('id')->on('companies')
                    ->nullOnDelete();
            });
        }

        Schema::create('sponsorships', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('tournament_id');
            $t->uuid('sponsor_id');

            /*
             * placement_type — where the sponsor's brand appears and how
             * prominent it is. Also implies relative cost in the pricing
             * sheet Dawri gives to inbound partnership inquiries.
             *   title     — "Red Bull Dawri Cup" (single headline sponsor)
             *   presenting— "Presented by Logitech" (one per tournament)
             *   supporting— grid of smaller logos in bracket sidebar
             */
            $t->enum('placement_type', ['title', 'presenting', 'supporting'])
                ->default('supporting');

            /*
             * contribution_type — what the sponsor actually gave:
             *   cash    — SAR dollars that flow into prize pool
             *   in_kind — physical/digital goods (PSN cards, chairs, merch)
             *   logo    — non-monetary; pure brand awareness exposure
             */
            $t->enum('contribution_type', ['cash', 'in_kind', 'logo'])
                ->default('cash');

            $t->decimal('cash_amount_sar', 12, 2)->default(0);
            $t->text('in_kind_description')->nullable();
            $t->text('in_kind_description_ar')->nullable();
            $t->decimal('in_kind_value_sar', 12, 2)->nullable();

            /*
             * contract_status — lifecycle of the agreement. Only 'active'
             * sponsorships render on tournament pages and count toward
             * the prize pool.
             */
            $t->enum('contract_status', ['draft', 'pending', 'active', 'fulfilled', 'cancelled'])
                ->default('draft');

            $t->text('notes')->nullable();
            $t->uuid('created_by_user_id')->nullable(); // admin who set up the deal
            $t->timestamp('activated_at')->nullable();
            $t->timestamp('fulfilled_at')->nullable();
            $t->timestamps();

            $t->foreign('tournament_id')
                ->references('id')->on('tournaments')
                ->cascadeOnDelete();
            $t->foreign('sponsor_id')
                ->references('id')->on('sponsors')
                ->cascadeOnDelete();

            // One sponsor can't hold the title slot twice on the same tourney
            $t->unique(['tournament_id', 'sponsor_id', 'placement_type'], 'unique_tourney_sponsor_placement');

            $t->index(['tournament_id', 'contract_status']);
            $t->index('sponsor_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sponsorships');
        Schema::dropIfExists('sponsors');
    }
};
