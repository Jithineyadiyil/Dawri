<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Creates a proper disputes table to replace inline dispute handling.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disputes', static function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('match_id');
            $table->uuid('raised_by')->comment('User who raised the dispute');
            $table->text('reason');
            $table->string('evidence_path', 500)->nullable()->comment('Screenshot / proof file path');
            $table->string('status', 20)->default('open')->comment('open, under_review, resolved, dismissed');
            $table->uuid('assigned_to')->nullable()->comment('Moderator assigned to resolve');
            $table->uuid('resolved_by')->nullable();
            $table->text('resolution')->nullable();
            $table->dateTime('resolved_at')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('tournament_matches')->cascadeOnDelete();
            $table->foreign('raised_by')->references('id')->on('users');
            $table->foreign('assigned_to')->references('id')->on('users')->nullOnDelete();
            $table->foreign('resolved_by')->references('id')->on('users')->nullOnDelete();
            $table->index(['status', 'created_at']);

            $table->engine  = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disputes');
    }
};
