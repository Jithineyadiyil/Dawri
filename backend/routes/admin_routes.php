<?php

/**
 * ADMIN ROUTES — add inside your auth:sanctum group in routes/api.php
 *
 * Also register the middleware alias in bootstrap/app.php:
 *   $middleware->alias(['admin' => \App\Http\Middleware\EnsureAdmin::class]);
 */

use App\Http\Controllers\Api\AdminController;

// ── Admin Panel (admin role only) ────────────────────────────────────────
Route::middleware('admin')->prefix('/admin')->group(static function (): void {

    // Platform overview
    Route::get('/overview', [AdminController::class, 'overview']);

    // Companies
    Route::get('/companies',       [AdminController::class, 'companies']);
    Route::post('/companies',      [AdminController::class, 'createCompany']);
    Route::get('/companies/{id}',  [AdminController::class, 'showCompany']);
    Route::put('/companies/{id}',  [AdminController::class, 'updateCompany']);
    Route::delete('/companies/{id}', [AdminController::class, 'deleteCompany']);

    // Subscriptions
    Route::get('/subscriptions',              [AdminController::class, 'subscriptions']);
    Route::post('/subscriptions',             [AdminController::class, 'createSubscription']);
    Route::put('/subscriptions/{id}',         [AdminController::class, 'updateSubscription']);
    Route::post('/subscriptions/{id}/cancel', [AdminController::class, 'cancelSubscription']);
    Route::post('/subscriptions/{id}/extend', [AdminController::class, 'extendSubscription']);

    // Users
    Route::get('/users',       [AdminController::class, 'users']);
    Route::put('/users/{id}',  [AdminController::class, 'updateUser']);

    // Invoices
    Route::get('/invoices',               [AdminController::class, 'invoices']);
    Route::put('/invoices/{id}/mark-paid', [AdminController::class, 'markInvoicePaid']);
});
