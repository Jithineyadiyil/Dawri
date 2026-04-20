<?php

// Add inside Route::prefix('v1')->middleware('auth:sanctum') group in routes/api.php
// (products is already public in the current api.php — keep it there)

use App\Http\Controllers\Api\MarketplaceController;

// Public — anyone can browse
Route::get('/marketplace/products', [MarketplaceController::class, 'products']);

// Auth required
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/marketplace/orders',               [MarketplaceController::class, 'placeOrder']);
    Route::get ('/marketplace/orders',               [MarketplaceController::class, 'orders']);
    Route::post('/marketplace/orders/{id}/reveal',   [MarketplaceController::class, 'revealCode']);

    Route::get ('/wallet',        [MarketplaceController::class, 'wallet']);
    Route::post('/wallet/topup',  [MarketplaceController::class, 'topUp']);
});
