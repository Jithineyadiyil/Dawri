<?php

/**
 * NEW ROUTES — merge these into your existing routes/api.php
 *
 * Add inside your Route::prefix('v1') group.
 */

use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\PlayerController;

// ══════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES (no auth required)
// Add inside: Route::prefix('v1')->group(function () { ... })
// ══════════════════════════════════════════════════════════════════════

// Leaderboard — public
Route::get('/leaderboard',          [LeaderboardController::class, 'index']);
Route::get('/leaderboard/overall',  [LeaderboardController::class, 'overall']);

// Player profiles — public
Route::get('/players/{id}',         [PlayerController::class, 'show']);
Route::get('/players/{id}/matches', [PlayerController::class, 'matches']);


// ══════════════════════════════════════════════════════════════════════
// PROTECTED ROUTES (auth:sanctum required)
// Add inside: Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () { ... })
// ══════════════════════════════════════════════════════════════════════

// My tournaments
Route::get('/tournaments/my', [PlayerController::class, 'myTournaments']);

// Update gaming profile
Route::put('/profile', [PlayerController::class, 'updateProfile']);

// Tournament unregister (add alongside existing tournament routes)
// Route::delete('/tournaments/{id}/register', [TournamentController::class, 'unregister']);

// Dispute endpoints (add alongside existing match routes)
// Route::post('/disputes',              [DisputeController::class, 'store']);
// Route::put('/disputes/{id}/resolve',  [DisputeController::class, 'resolve']);
// Route::put('/disputes/{id}/assign',   [DisputeController::class, 'assign']);
// Route::put('/disputes/{id}/dismiss',  [DisputeController::class, 'dismiss']);
