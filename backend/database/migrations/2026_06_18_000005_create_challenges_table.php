<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Social — friendly 1v1 challenges (lightweight).
 *
 * A challenger invites an opponent (a friend) to a match in a game. Flow:
 *   pending  → opponent accepts/declines (or challenger cancels)
 *   accepted → either side reports a result (scores + winner)
 *            → the other side confirms → completed
 *
 * Standalone — NOT wired into the tournament bracket / stats pipeline.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('challenges', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('challenger_id');
            $table->uuid('opponent_id');
            $table->string('game', 40);                       // ea_fc25 | pubg_mobile | cod_mobile
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'accepted', 'declined', 'cancelled', 'completed'])
                ->default('pending');
            $table->timestamp('scheduled_at')->nullable();

            // Result (lightweight)
            $table->unsignedSmallInteger('challenger_score')->nullable();
            $table->unsignedSmallInteger('opponent_score')->nullable();
            $table->uuid('winner_id')->nullable();
            $table->uuid('result_reported_by')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            $table->foreign('challenger_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('opponent_id')->references('id')->on('users')->cascadeOnDelete();

            $table->index(['opponent_id', 'status']);
            $table->index(['challenger_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
