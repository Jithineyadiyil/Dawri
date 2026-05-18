<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ad_placements', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->string('type', 30); // 'promoted_tournament' | 'in_grid_sponsor' | 'tournament_banner'
            $table->string('title', 200);
            $table->string('title_ar', 200)->nullable();
            $table->text('image_url')->nullable();
            $table->string('link_url', 500)->nullable();
            $table->string('cta_label', 100)->nullable();   // e.g. "Get PSN Cards"
            $table->string('brand_name', 100)->nullable();
            $table->string('brand_color', 20)->nullable();  // hex for accent
            $table->uuid('tournament_id')->nullable();       // for tournament_banner type
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->integer('impression_count')->default(0);
            $table->integer('click_count')->default(0);
            $table->timestamps();

            $table->index(['type', 'is_active']);
            $table->index('tournament_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ad_placements');
    }
};
