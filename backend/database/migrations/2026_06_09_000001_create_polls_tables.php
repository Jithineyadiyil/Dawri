<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 2 — Community polls.
 *
 * A poll is posted into a channel (like a message), has 2–10 options, and
 * collects one vote per option per user. `is_multiple` allows a user to pick
 * more than one option; otherwise selecting a new option replaces the old.
 * `closes_at` optionally locks voting after a deadline.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('polls', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            $table->uuid('user_id')->comment('Creator');
            $table->string('question', 300);
            $table->boolean('is_multiple')->default(false)
                ->comment('Whether a user may select more than one option');
            $table->boolean('is_closed')->default(false);
            $table->timestamp('closes_at')->nullable()
                ->comment('Optional auto-close deadline');
            $table->timestamps();

            $table->foreign('channel_id')
                ->references('id')->on('channels')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->index(['channel_id', 'created_at'], 'polls_channel_idx');
        });

        Schema::create('poll_options', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('poll_id');
            $table->string('label', 150);
            $table->unsignedSmallInteger('position')->default(0);

            $table->foreign('poll_id')
                ->references('id')->on('polls')
                ->cascadeOnDelete();

            $table->index('poll_id');
        });

        Schema::create('poll_votes', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('poll_id');
            $table->uuid('option_id');
            $table->uuid('user_id');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('poll_id')
                ->references('id')->on('polls')
                ->cascadeOnDelete();

            $table->foreign('option_id')
                ->references('id')->on('poll_options')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            // A user can vote for each distinct option at most once.
            $table->unique(['option_id', 'user_id'], 'poll_votes_unique_idx');
            $table->index(['poll_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poll_votes');
        Schema::dropIfExists('poll_options');
        Schema::dropIfExists('polls');
    }
};
