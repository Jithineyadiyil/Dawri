<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Laravel defaults
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('password_reset_tokens');

        // Dawri tables (reverse dependency order)
        Schema::dropIfExists('distributor_health');
        Schema::dropIfExists('digital_codes');
        Schema::dropIfExists('digital_orders');
        Schema::dropIfExists('digital_products');
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('wallets');
        Schema::dropIfExists('tournament_matches');
        Schema::dropIfExists('brackets');
        Schema::dropIfExists('tournament_participants');
        Schema::dropIfExists('tournaments');
        Schema::dropIfExists('users');

        // ── Users ──────────────────────────────────────────────────────────
        Schema::create('users', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('name');
            $t->string('email')->unique();
            $t->string('phone', 20)->unique()->nullable();
            $t->string('password');
            $t->enum('role', ['admin', 'organizer', 'player', 'moderator'])->default('player');
            $t->boolean('phone_verified')->default(false);
            $t->boolean('active')->default(true);
            $t->timestamp('email_verified_at')->nullable();
            $t->rememberToken();
            $t->timestamps();
        });

        // ── Laravel defaults ───────────────────────────────────────────────
        Schema::create('personal_access_tokens', function (Blueprint $t) {
            $t->id();
            $t->string('tokenable_type');
            $t->string('tokenable_id', 36); // UUID-compatible
            $t->index(['tokenable_type', 'tokenable_id']);
            $t->string('name');
            $t->string('token', 64)->unique();
            $t->text('abilities')->nullable();
            $t->timestamp('last_used_at')->nullable();
            $t->timestamp('expires_at')->nullable();
            $t->timestamps();
        });

        Schema::create('cache',       function (Blueprint $t) { $t->string('key')->primary(); $t->mediumText('value'); $t->integer('expiration'); });
        Schema::create('cache_locks', function (Blueprint $t) { $t->string('key')->primary(); $t->string('owner'); $t->integer('expiration'); });
        Schema::create('sessions',    function (Blueprint $t) { $t->string('id')->primary(); $t->string('user_id', 36)->nullable()->index(); $t->string('ip_address', 45)->nullable(); $t->text('user_agent')->nullable(); $t->longText('payload'); $t->integer('last_activity')->index(); });
        Schema::create('jobs',        function (Blueprint $t) { $t->id(); $t->string('queue')->index(); $t->longText('payload'); $t->unsignedTinyInteger('attempts'); $t->unsignedInteger('reserved_at')->nullable(); $t->unsignedInteger('available_at'); $t->unsignedInteger('created_at'); });
        Schema::create('job_batches', function (Blueprint $t) { $t->string('id')->primary(); $t->string('name'); $t->integer('total_jobs'); $t->integer('pending_jobs'); $t->integer('failed_jobs'); $t->longText('failed_job_ids'); $t->mediumText('options')->nullable(); $t->integer('cancelled_at')->nullable(); $t->integer('created_at'); $t->integer('finished_at')->nullable(); });
        Schema::create('failed_jobs', function (Blueprint $t) { $t->id(); $t->string('uuid')->unique(); $t->text('connection'); $t->text('queue'); $t->longText('payload'); $t->longText('exception'); $t->timestamp('failed_at')->useCurrent(); });
        Schema::create('password_reset_tokens', function (Blueprint $t) { $t->string('email')->primary(); $t->string('token'); $t->timestamp('created_at')->nullable(); });

        // ── Tournaments ────────────────────────────────────────────────────
        Schema::create('tournaments', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('name', 150);
            $t->string('name_ar', 150)->nullable();
            $t->string('game', 50);
            $t->enum('format', ['single_elimination', 'double_elimination', 'round_robin', 'swiss']);
            $t->unsignedSmallInteger('max_participants')->default(16);
            $t->unsignedTinyInteger('swiss_rounds')->nullable();
            $t->timestamp('registration_closes_at')->nullable();
            $t->timestamp('starts_at')->nullable();
            $t->string('timezone', 50)->default('Asia/Riyadh');
            $t->boolean('is_public')->default(true);
            $t->unsignedInteger('entry_fee_sar')->default(0);
            $t->json('prize_pool')->nullable();
            $t->uuid('organizer_id');
            $t->uuid('moderator_id')->nullable();
            $t->softDeletes();
            $t->timestamps();
            $t->foreign('organizer_id')->references('id')->on('users')->onDelete('cascade');
            $t->foreign('moderator_id')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('tournament_participants', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('tournament_id');
            $t->uuid('user_id');
            $t->unsignedSmallInteger('seed')->default(0);
            $t->unsignedSmallInteger('wins')->default(0);
            $t->unsignedSmallInteger('losses')->default(0);
            $t->unsignedSmallInteger('points')->default(0);
            $t->unsignedSmallInteger('buchholz')->default(0);
            $t->boolean('is_eliminated')->default(false);
            $t->timestamp('registered_at')->nullable();
            $t->timestamps();
            $t->unique(['tournament_id', 'user_id']);
            $t->foreign('tournament_id')->references('id')->on('tournaments')->onDelete('cascade');
            $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('brackets', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('tournament_id')->unique();
            $t->string('format', 30);
            $t->string('status', 20)->default('generated');
            $t->unsignedTinyInteger('total_rounds')->default(1);
            $t->unsignedTinyInteger('current_round')->default(1);
            $t->unsignedSmallInteger('participant_count')->default(0);
            $t->unsignedSmallInteger('bye_count')->default(0);
            $t->uuid('winner_participant_id')->nullable();
            $t->json('metadata')->nullable();
            $t->timestamp('generated_at')->nullable();
            $t->timestamp('completed_at')->nullable();
            $t->timestamps();
            $t->foreign('tournament_id')->references('id')->on('tournaments')->onDelete('cascade');
        });

        Schema::create('tournament_matches', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('bracket_id');
            $t->unsignedTinyInteger('round_number');
            $t->unsignedSmallInteger('match_number');
            $t->string('bracket_section', 30)->default('winners');
            $t->uuid('participant_a_id')->nullable();
            $t->uuid('participant_b_id')->nullable();
            $t->boolean('participant_a_is_bye')->default(false);
            $t->boolean('participant_b_is_bye')->default(false);
            $t->uuid('winner_id')->nullable();
            $t->uuid('loser_id')->nullable();
            $t->unsignedTinyInteger('score_a')->nullable();
            $t->unsignedTinyInteger('score_b')->nullable();
            $t->enum('status', ['pending','scheduled','ongoing','submitted','confirmed','disputed','completed','walkover'])->default('pending');
            $t->uuid('next_match_id')->nullable();
            $t->uuid('loser_next_match_id')->nullable();
            $t->string('result_screenshot_path')->nullable();
            $t->uuid('submitted_by_id')->nullable();
            $t->text('dispute_reason')->nullable();
            $t->timestamp('scheduled_at')->nullable();
            $t->timestamp('completed_at')->nullable();
            $t->timestamps();
            $t->foreign('bracket_id')->references('id')->on('brackets')->onDelete('cascade');
        });

        // ── Wallets ────────────────────────────────────────────────────────
        Schema::create('wallets', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('user_id')->unique();
            $t->decimal('balance', 12, 2)->default(0);
            $t->string('currency', 3)->default('SAR');
            $t->timestamps();
            $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('wallet_transactions', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('wallet_id');
            $t->enum('type', ['credit', 'debit']);
            $t->decimal('amount', 12, 2);
            $t->decimal('balance_after', 12, 2);
            $t->string('reference', 100)->nullable();
            $t->string('description', 200)->nullable();
            $t->string('status', 20)->default('completed');
            $t->timestamps();
            $t->foreign('wallet_id')->references('id')->on('wallets')->onDelete('cascade');
        });

        // ── Digital store ──────────────────────────────────────────────────
        Schema::create('digital_products', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('distributor', 50);
            $t->string('distributor_id', 100);
            $t->string('name', 200);
            $t->string('name_ar', 200)->nullable();
            $t->string('brand', 100)->nullable();
            $t->string('category', 50)->nullable();
            $t->decimal('face_value', 10, 2)->nullable();
            $t->string('currency', 3)->nullable();
            $t->decimal('our_cost', 10, 2)->nullable();
            $t->decimal('our_price', 10, 2)->nullable();
            $t->decimal('margin_pct', 5, 2)->nullable();
            $t->string('region', 10)->nullable();
            $t->text('image_url')->nullable();
            $t->boolean('is_active')->default(true);
            $t->timestamp('last_synced_at')->nullable();
            $t->timestamps();
        });

        Schema::create('digital_orders', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('user_id');
            $t->uuid('product_id');
            $t->string('distributor', 50);
            $t->string('distributor_order_id', 200)->nullable();
            $t->string('idempotency_key', 200)->unique();
            $t->unsignedTinyInteger('quantity')->default(1);
            $t->decimal('unit_price', 10, 2);
            $t->decimal('total_price', 10, 2);
            $t->string('status', 30)->default('pending');
            $t->string('payment_ref', 200)->nullable();
            $t->timestamp('fulfilled_at')->nullable();
            $t->timestamps();
            $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $t->foreign('product_id')->references('id')->on('digital_products')->onDelete('cascade');
        });

        Schema::create('digital_codes', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('order_id');
            $t->text('code_enc');
            $t->string('code_hash', 64)->nullable();
            $t->timestamp('revealed_at')->nullable();
            $t->timestamp('expires_at')->nullable();
            $t->timestamps();
            $t->foreign('order_id')->references('id')->on('digital_orders')->onDelete('cascade');
        });

        // ── Distributor health ─────────────────────────────────────────────
        Schema::create('distributor_health', function (Blueprint $t) {
            $t->string('distributor', 50)->primary();
            $t->boolean('is_active')->default(true);
            $t->timestamp('last_success_at')->nullable();
            $t->timestamp('last_failure_at')->nullable();
            $t->unsignedSmallInteger('failure_count')->default(0);
            $t->string('circuit_status', 20)->default('closed');
            $t->timestamp('updated_at')->nullable();
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Schema::dropIfExists('distributor_health');
        Schema::dropIfExists('digital_codes');
        Schema::dropIfExists('digital_orders');
        Schema::dropIfExists('digital_products');
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('wallets');
        Schema::dropIfExists('tournament_matches');
        Schema::dropIfExists('brackets');
        Schema::dropIfExists('tournament_participants');
        Schema::dropIfExists('tournaments');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('users');
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
};
