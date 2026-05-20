<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration: broadcast_setup_logs
 *
 * Append-only analytics table for the OBS Setup Wizard. Records every
 * user interaction so the platform team can see where organizers drop off
 * (e.g. "60% complete step 3 but only 40% reach step 5 — encoder UI is too
 * complex").
 *
 * Foreign-key types match the real schema:
 *   - live_broadcasts.id is UUID  → broadcast_id is UUID (nullable until step 1)
 *   - tournaments.id     is UUID  → tournament_id is UUID (nullable)
 *   - users.id           is UUID  → user_id is UUID
 *
 * The wizard can be entered either:
 *   - from a tournament context (no broadcast yet)        → tournament_id set, broadcast_id null
 *   - from an existing broadcast                          → broadcast_id set, tournament_id may be null
 * At least one of the two must be set — enforced via a CHECK constraint.
 *
 * @author Dawri Engineering — Sprint 5 wizard module
 */
return new class extends Migration
{
    /**
     * Run the migration.
     */
    public function up(): void
    {
        Schema::create('broadcast_setup_logs', static function (Blueprint $table): void {
            $table->uuid('id')->primary();

            // Polymorphic-ish: at least one of these MUST be set.
            $table->uuid('broadcast_id')->nullable();
            $table->uuid('tournament_id')->nullable();
            $table->uuid('user_id');

            $table->foreign('broadcast_id')
                ->references('id')->on('live_broadcasts')
                ->cascadeOnDelete();
            $table->foreign('tournament_id')
                ->references('id')->on('tournaments')
                ->cascadeOnDelete();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->string('event', 40)
                ->comment('wizard_opened, step_viewed, step_completed, rtmp_copied, key_copied, stream_verified, wizard_completed, wizard_abandoned, error_encountered');
            $table->unsignedTinyInteger('step_number')->nullable()->comment('1..6');
            $table->string('platform', 20)->nullable()->comment('windows | macos | linux | unknown');
            $table->string('source', 20)->nullable()->comment('LiveBroadcast::SOURCE_* | null');
            $table->json('metadata')->nullable()->comment('Free-form payload — secret-shaped keys stripped service-side');
            $table->ipAddress('ip_address')->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->index(['broadcast_id', 'created_at'],  'idx_setup_logs_broadcast');
            $table->index(['tournament_id', 'created_at'], 'idx_setup_logs_tournament');
            $table->index(['user_id', 'created_at'],       'idx_setup_logs_user');
            $table->index(['event', 'created_at'],         'idx_setup_logs_event');
        });

        // Enforce "at least one scope" rule. Done with raw SQL because
        // Laravel's schema builder doesn't expose CHECK constraints
        // cleanly across MySQL versions.
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            try {
                Schema::getConnection()->statement(
                    'ALTER TABLE broadcast_setup_logs '
                    . 'ADD CONSTRAINT chk_setup_logs_scope '
                    . 'CHECK (broadcast_id IS NOT NULL OR tournament_id IS NOT NULL)'
                );
            } catch (\Throwable $e) {
                // MySQL < 8.0.16 ignores CHECK constraints — non-fatal.
            }
        }
    }

    /**
     * Reverse the migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('broadcast_setup_logs');
    }
};
