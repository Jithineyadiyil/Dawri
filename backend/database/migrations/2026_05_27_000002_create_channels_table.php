<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 15 — Channels within communities (text channels only in v1).
 *
 * A channel belongs to exactly one community and is the unit of message
 * organization. Type "announcement" means only moderators+ can post.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('channels', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('community_id');
            $table->string('name', 80)->comment('Channel slug without # prefix (e.g. "general", "ea-fc-25")');
            $table->string('topic', 250)->nullable()->comment('Short description shown in channel header');
            $table->enum('type', ['text', 'announcement'])->default('text')
                ->comment('text = anyone can post · announcement = moderators+ only');
            $table->unsignedInteger('position')->default(0)
                ->comment('Sort order in the channel sidebar (ascending)');
            $table->boolean('is_archived')->default(false);
            $table->timestamps();

            $table->foreign('community_id')
                ->references('id')->on('communities')
                ->cascadeOnDelete();

            $table->unique(['community_id', 'name'], 'channels_community_name_unique');
            $table->index(['community_id', 'is_archived', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('channels');
    }
};
