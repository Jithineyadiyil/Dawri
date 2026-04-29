<?php
/* -----------------------------------------------------------------
 |  Sprint 12A+ — Auto-hide toggle route
 | -----------------------------------------------------------------
 |
 |  Add this ONE additional route inside the same admin marketplace
 |  route group where Sprint 12A routes were pasted. Place it near
 |  the other fulfillment-mode route for consistency.
 */

Route::post('products/{product}/auto-hide',
    [AdminInventoryController::class, 'setAutoHide'])
    ->name('inventory.auto_hide');
