<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Social — friendships.
 *
 * A single row models the relationship between two users. `requester_id`
 * is the user who sent the request; `addressee_id` is the recipient.
 * Status starts 'pending' and becomes 'accepted' once the addressee
 * accepts. A declined request is deleted (not stored).
 *
 * Friendship is symmetric: "my friends" is the union of rows where I am
 * the requester OR the addressee and status = 'accepted'. Application
 * code guarantees at most ONE row exists per unordered pair.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('friendships', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('requester_id');
            $table->uuid('addressee_id');
            $table->enum('status', ['pending', 'accepted'])->default('pending');
            $table->timestamps();

            $table->unique(['requester_id', 'addressee_id']);

            $table->foreign('requester_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            $table->foreign('addressee_id')
                ->references('id')->on('users')
                ->cascadeOnDelete();

            // Fast lookups for "incoming requests" and "my friends".
            $table->index(['addressee_id', 'status']);
            $table->index(['requester_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('friendships');
    }
};
