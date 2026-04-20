<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('digital_products', function (Blueprint $table): void {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->string('distributor', 50)->default('likecard');
            $table->string('distributor_product_id', 100)->nullable();
            $table->string('name', 200);
            $table->string('name_ar', 200)->nullable();
            $table->string('brand', 100);
            $table->string('category', 50)->comment('gaming|streaming|shopping|social');
            $table->decimal('face_value', 10, 2);
            $table->string('currency', 3)->default('SAR');
            $table->decimal('our_cost', 10, 2)->nullable();
            $table->decimal('our_price', 10, 2);
            $table->string('region', 10)->default('SA');
            $table->string('image_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['category', 'is_active']);
            $table->index(['brand', 'is_active']);
        });

        Schema::create('digital_orders', function (Blueprint $table): void {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->uuid('product_id');
            $table->foreign('product_id')->references('id')->on('digital_products');
            $table->string('distributor', 50)->default('likecard');
            $table->string('distributor_order_id', 200)->nullable();
            $table->string('idempotency_key', 200)->unique();
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->string('status', 30)->default('pending');
            $table->string('payment_method', 50)->default('wallet');
            $table->string('payment_ref', 200)->nullable();
            $table->timestamp('fulfilled_at')->nullable();
            $table->timestamps();
            $table->index(['user_id', 'status']);
        });

        Schema::create('digital_codes', function (Blueprint $table): void {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->uuid('order_id');
            $table->foreign('order_id')->references('id')->on('digital_orders')->cascadeOnDelete();
            $table->text('code_enc');
            $table->string('code_hash', 64)->nullable();
            $table->timestamp('revealed_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('digital_codes');
        Schema::dropIfExists('digital_orders');
        Schema::dropIfExists('digital_products');
    }
};
