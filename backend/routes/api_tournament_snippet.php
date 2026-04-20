<?php
// Add these routes to your routes/api.php inside the Route::prefix('v1') group

// ── Public ───────────────────────────────────────────────────────────────────
Route::get('/tournaments',                [TournamentController::class, 'index']);
Route::get('/tournaments/{id}',           [TournamentController::class, 'show']);
Route::get('/tournaments/{id}/leaderboard', [TournamentController::class, 'leaderboard']);

// ── Authenticated ─────────────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::post('/tournaments',                   [TournamentController::class, 'store']);
    Route::post('/tournaments/{id}/register',     [TournamentController::class, 'register']);
    Route::post('/tournaments/{id}/bracket',      [TournamentController::class, 'generateBracket']);

    Route::get('/matches/{id}',                   [MatchController::class, 'show']);
    Route::post('/matches/{id}/result',           [MatchController::class, 'submitResult']);
    Route::post('/matches/{id}/confirm',          [MatchController::class, 'confirmResult']);
    Route::post('/matches/{id}/dispute',          [MatchController::class, 'disputeResult']);
    Route::post('/matches/{id}/moderator-override', [MatchController::class, 'moderatorOverride']);
});
