<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dawri 2.0 — Organizer verification application records.
 *
 * One row per user request. A user may have at most ONE pending row at a
 * time (enforced in application code). On approval, the user's
 * organizer_tier is updated and the row is marked approved.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('organizer_verification_requests', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->enum('requested_tier', ['verified', 'professional'])->default('verified');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            // KYC payload — kept lightweight (no doc uploads in v1, just text).
            $table->string('legal_name', 150);
            $table->string('organization_name', 150)->nullable();
            $table->string('country', 80);
            $table->string('city', 80)->nullable();
            $table->string('website', 255)->nullable();
            $table->string('phone', 40)->nullable();
            $table->text('reason')->nullable();

            // Decision
            $table->uuid('decided_by')->nullable();
            $table->timestamp('decided_at')->nullable();
            $table->text('decision_note')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('decided_by')->references('id')->on('users')->nullOnDelete();

            $table->index(['user_id', 'status']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizer_verification_requests');
    }
};
