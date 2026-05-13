<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            $table->boolean('has_bronze_match')->default(false)->after('swiss_rounds');
            $table->string('description', 500)->nullable()->after('rules');
        });

        Schema::create('bracket_predictions', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->uuid('tournament_id');
            $table->uuid('user_id');
            $table->uuid('match_id');
            $table->uuid('predicted_winner_id');
            $table->boolean('is_correct')->nullable();
            $table->integer('points_earned')->default(0);
            $table->timestamps();
            $table->unique(['user_id', 'match_id']);
            $table->index(['tournament_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            $table->dropColumn(['has_bronze_match', 'description']);
        });
        Schema::dropIfExists('bracket_predictions');
    }
};
