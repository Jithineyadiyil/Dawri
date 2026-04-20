<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 2 — Match Scheduling & Evidence
 *
 * Adds the columns and tables required for:
 *   • Organizer / player scheduling of a match
 *   • Reschedule proposals that require the opposing player to accept
 *   • Multiple evidence file uploads per match
 *
 * Design decisions:
 *   1. `scheduled_at` already exists on `tournament_matches` from the initial
 *      consolidated migration. We only add `scheduled_by_id` here to record
 *      WHO set the current schedule (organizer vs. player agreement vs.
 *      organizer override after a dispute).
 *   2. Reschedule status enum has 5 states: pending | accepted | rejected |
 *      cancelled | overridden. 'overridden' is used when an organizer/admin
 *      force-accepts or force-rejects, bypassing the other player's consent.
 *   3. Evidence is stored outside the database — only the file path is kept.
 *      Physical files live at storage/app/public/match-evidence/{matchId}/
 */
return new class extends Migration
{
    public function up(): void
    {
        // ── 1. scheduled_by_id column on tournament_matches ───────────────
        if (! Schema::hasColumn('tournament_matches', 'scheduled_by_id')) {
            Schema::table('tournament_matches', function (Blueprint $table): void {
                $table->uuid('scheduled_by_id')
                    ->nullable()
                    ->after('scheduled_at')
                    ->comment('User who set the current schedule');
            });
        }

        // ── 2. match_reschedule_requests table ────────────────────────────
        if (! Schema::hasTable('match_reschedule_requests')) {
            Schema::create('match_reschedule_requests', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->uuid('match_id');
                $table->uuid('requested_by_id');
                $table->timestamp('proposed_at');
                $table->text('reason')->nullable();
                $table->string('status', 20)->default('pending')
                    ->comment('pending | accepted | rejected | cancelled | overridden');
                $table->uuid('responded_by_id')->nullable();
                $table->timestamp('responded_at')->nullable();
                $table->boolean('was_organizer_override')->default(false);
                $table->timestamps();

                $table->foreign('match_id')
                    ->references('id')->on('tournament_matches')
                    ->cascadeOnDelete();
                $table->foreign('requested_by_id')
                    ->references('id')->on('users');
                $table->foreign('responded_by_id')
                    ->references('id')->on('users');

                $table->index(['match_id', 'status']);
                $table->index('requested_by_id');
            });
        }

        // ── 3. match_evidence table ───────────────────────────────────────
        if (! Schema::hasTable('match_evidence')) {
            Schema::create('match_evidence', function (Blueprint $table): void {
                $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
                $table->uuid('match_id');
                $table->uuid('uploaded_by_id');
                $table->string('file_path', 500);
                $table->string('file_type', 10)
                    ->comment('image | video');
                $table->string('file_mime', 100);
                $table->unsignedInteger('file_size')->nullable();
                $table->string('caption', 255)->nullable();
                $table->timestamps();

                $table->foreign('match_id')
                    ->references('id')->on('tournament_matches')
                    ->cascadeOnDelete();
                $table->foreign('uploaded_by_id')
                    ->references('id')->on('users');

                $table->index('match_id');
                $table->index(['match_id', 'uploaded_by_id']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('match_evidence');
        Schema::dropIfExists('match_reschedule_requests');

        if (Schema::hasColumn('tournament_matches', 'scheduled_by_id')) {
            Schema::table('tournament_matches', function (Blueprint $table): void {
                $table->dropColumn('scheduled_by_id');
            });
        }
    }
};
