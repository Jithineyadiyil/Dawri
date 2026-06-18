<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('key', 80)->unique();        // e.g. 'first_win', 'streak_5'
            $t->string('name', 120);
            $t->string('name_ar', 120)->nullable();
            $t->text('description');
            $t->text('description_ar')->nullable();
            $t->string('icon', 60)->default('trophy'); // lucide-icon key
            $t->enum('tier', ['bronze','silver','gold','platinum'])->default('bronze');
            $t->enum('category', ['tournament','match','streak','social','team','marketplace','milestone'])->default('milestone');
            $t->unsignedInteger('xp_reward')->default(50);
            $t->boolean('is_secret')->default(false);
            $t->unsignedInteger('sort_order')->default(0);
            $t->timestamps();
        });

        Schema::create('user_achievements', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('user_id');
            $t->uuid('achievement_id');
            $t->unsignedInteger('progress')->default(0);
            $t->unsignedInteger('threshold')->default(1);
            $t->timestamp('unlocked_at')->nullable();
            $t->timestamps();

            $t->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $t->foreign('achievement_id')->references('id')->on('achievements')->cascadeOnDelete();
            $t->unique(['user_id', 'achievement_id']);
            $t->index(['user_id', 'unlocked_at']);
        });

        Schema::create('user_xp', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('user_id')->unique();
            $t->unsignedBigInteger('total_xp')->default(0);
            $t->unsignedInteger('level')->default(1);
            $t->timestamps();

            $t->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });

        Schema::create('xp_events', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->uuid('user_id');
            $t->string('source', 60);        // 'achievement','match_win','tournament_win','daily','manual'
            $t->string('source_id', 80)->nullable();
            $t->integer('amount');
            $t->string('note', 200)->nullable();
            $t->timestamps();

            $t->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $t->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('xp_events');
        Schema::dropIfExists('user_xp');
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('achievements');
    }
};
