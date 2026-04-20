<?php

/**
 * Tournament Routes — drop this into your routes/api.php inside the v1 group.
 *
 * Route prefix: /api/v1
 * All routes require Sanctum auth except the public index/show.
 */

use App\Http\Controllers\Api\TournamentController;
use Illuminate\Support\Facades\Route;

// ── Public ────────────────────────────────────────────────────────────────────
Route::prefix('tournaments')->group(function (): void {

    Route::get('/',                  [TournamentController::class, 'index'])->name('tournaments.index');
    Route::get('/{tournament}',      [TournamentController::class, 'show'])->name('tournaments.show');

    // ── Authenticated ─────────────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function (): void {

        Route::post('/',                                    [TournamentController::class, 'store'])->name('tournaments.store');
        Route::put('/{tournament}',                         [TournamentController::class, 'update'])->name('tournaments.update');
        Route::delete('/{tournament}',                      [TournamentController::class, 'destroy'])->name('tournaments.destroy');

        Route::post('/{tournament}/generate-bracket',       [TournamentController::class, 'generateBracket'])->name('tournaments.generateBracket');
        Route::post('/{tournament}/register',               [TournamentController::class, 'register'])->name('tournaments.register');
        Route::post('/{tournament}/matches/{matchId}/result',[TournamentController::class, 'submitResult'])->name('tournaments.submitResult');
    });
});
