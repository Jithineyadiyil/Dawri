<?php
/* -----------------------------------------------------------------
 |  Sprint 12A — Inventory pool routes
 | -----------------------------------------------------------------
 |
 |  PASTE the following block inside your existing admin marketplace
 |  route group in `routes/api.php`. Example group looks like:
 |
 |      Route::middleware(['auth:sanctum', 'role:admin'])
 |          ->prefix('v1/admin/marketplace')
 |          ->name('admin.marketplace.')
 |          ->group(function () {
 |              // ... Sprint 11 routes already here ...
 |
 |              // ↓ PASTE SPRINT 12A ROUTES HERE ↓
 |          });
 |
 |  The routes use UUID product / batch identifiers.
 |  Add the import at the top of routes/api.php:
 |
 |      use App\Http\Controllers\Api\AdminInventoryController;
 */

// ── Inventory pool endpoints ─────────────────────────────────────────
Route::get('products/{product}/inventory',
    [AdminInventoryController::class, 'show'])
    ->name('inventory.show');

Route::post('products/{product}/inventory/upload',
    [AdminInventoryController::class, 'upload'])
    ->name('inventory.upload');

Route::get('products/{product}/inventory/codes',
    [AdminInventoryController::class, 'codes'])
    ->name('inventory.codes');

Route::post('products/{product}/fulfillment-mode',
    [AdminInventoryController::class, 'setFulfillmentMode'])
    ->name('inventory.mode');

Route::get('batches/{batch}',
    [AdminInventoryController::class, 'batchShow'])
    ->name('inventory.batch.show');

Route::delete('batches/{batch}',
    [AdminInventoryController::class, 'batchDestroy'])
    ->name('inventory.batch.destroy');
