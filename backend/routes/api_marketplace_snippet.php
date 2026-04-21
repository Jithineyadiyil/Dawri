<?php

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * Marketplace routes snippet
 *
 * This is NOT a standalone file — it's a drop-in replacement for the
 * existing marketplace routes inside your routes/api.php.
 *
 * Find this block around lines 43 and 83-85 of routes/api.php:
 *     Route::get ('/marketplace/products', [MarketplaceController::class, 'products']);
 *     Route::post('/marketplace/orders',   [MarketplaceController::class, 'placeOrder']);
 *     Route::get ('/marketplace/orders',   [MarketplaceController::class, 'orders']);
 *     Route::post('/marketplace/orders/{id}/reveal', [MarketplaceController::class, 'revealCode']);
 *
 * And verify it matches the block below. Only the topUp route needs its
 * request class updated (now TopUpRequest, validated via FormRequest).
 * No route changes are strictly required — this file is for reference only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

use App\Http\Controllers\Api\MarketplaceController;

// Public — anyone can browse the catalogue
Route::get('/marketplace/products', [MarketplaceController::class, 'products']);

// Authenticated
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/marketplace/orders',             [MarketplaceController::class, 'placeOrder']);
    Route::get ('/marketplace/orders',             [MarketplaceController::class, 'orders']);
    Route::post('/marketplace/orders/{id}/reveal', [MarketplaceController::class, 'revealCode']);

    Route::get ('/wallet',       [MarketplaceController::class, 'wallet']);
    Route::post('/wallet/topup', [MarketplaceController::class, 'topUp']);
});
