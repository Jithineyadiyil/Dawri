<?php

/**
 * NEW ROUTES — merge into routes/api.php
 *
 * All inside auth:sanctum middleware group.
 */

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SubscriptionController;

// ══════════════════════════════════════════════════════════════════════
// PROTECTED ROUTES — add inside Route::middleware(['auth:sanctum'])->prefix('v1')
// ══════════════════════════════════════════════════════════════════════

// Dashboard (role-aware)
Route::get('/dashboard', [DashboardController::class, 'index']);

// Subscription management
Route::get('/subscription',            [SubscriptionController::class, 'show']);
Route::get('/subscription/plans',      [SubscriptionController::class, 'plans']);
Route::post('/subscription/subscribe', [SubscriptionController::class, 'subscribe']);
Route::post('/subscription/trial',     [SubscriptionController::class, 'startTrial']);
Route::put('/subscription/change',     [SubscriptionController::class, 'changePlan']);
Route::post('/subscription/cancel',    [SubscriptionController::class, 'cancel']);
Route::get('/subscription/invoices',   [SubscriptionController::class, 'invoices']);
