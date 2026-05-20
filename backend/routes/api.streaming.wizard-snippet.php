<?php

/*
|--------------------------------------------------------------------------
| OBS Setup Wizard Routes
|--------------------------------------------------------------------------
|
| APPEND the block below to your existing routes/api.streaming.php.
|
| The file is already `require`-d from routes/api.php inside the
| `Route::prefix('v1')->middleware('auth:sanctum')` group, so the wizard
| routes inherit that prefix + middleware automatically.
|
| The `$uuid` regex variable is already declared at the top of
| routes/api.streaming.php — we reuse it here.
|
*/

use App\Http\Controllers\Api\ObsWizardController;
use Illuminate\Support\Facades\Route;

// ────────────────────────── Broadcast scope ──────────────────────────
Route::middleware('throttle:60,1')->group(function () use ($uuid): void {
    Route::get('/broadcasts/{broadcast}/setup-wizard/config',
        [ObsWizardController::class, 'configForBroadcast'])->where('broadcast', $uuid);

    Route::post('/broadcasts/{broadcast}/setup-wizard/event',
        [ObsWizardController::class, 'logEventForBroadcast'])->where('broadcast', $uuid);

    Route::post('/broadcasts/{broadcast}/setup-wizard/finish',
        [ObsWizardController::class, 'finish'])->where('broadcast', $uuid);
});

// ────────────────────────── Tournament scope ─────────────────────────
Route::middleware('throttle:60,1')->group(function () use ($uuid): void {
    Route::get('/tournaments/{tournament}/setup-wizard/config',
        [ObsWizardController::class, 'configForTournament'])->where('tournament', $uuid);

    Route::post('/tournaments/{tournament}/setup-wizard/event',
        [ObsWizardController::class, 'logEventForTournament'])->where('tournament', $uuid);
});
