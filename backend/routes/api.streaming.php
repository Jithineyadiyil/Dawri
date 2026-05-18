<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Streaming Routes (Sprint 5 — YouTube Live, Option B)
|--------------------------------------------------------------------------
|
| Pulled in by `routes/api.php` via `require` inside the existing
| `Route::prefix('v1')->group(... auth:sanctum group ...)` block.
|
| Because `require` preserves the calling scope, every route declared here
| inherits the parent group's `prefix('v1')` and `middleware('auth:sanctum')`.
|
| Do NOT wrap these in another `Route::prefix(...)` or `Route::middleware(...)`
| — the parent group already provides them.
|
*/

use App\Http\Controllers\Api\LiveBroadcastController;
use Illuminate\Support\Facades\Route;

$uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

// ── Create ───────────────────────────────────────────────────────────
Route::post('/matches/{match}/broadcast',          [LiveBroadcastController::class, 'createForMatch'])
    ->where('match', $uuid);

Route::post('/tournaments/{tournament}/broadcast', [LiveBroadcastController::class, 'createForTournament'])
    ->where('tournament', $uuid);

// ── Read ─────────────────────────────────────────────────────────────
Route::get('/broadcasts/{broadcast}', [LiveBroadcastController::class, 'show'])
    ->where('broadcast', $uuid);

// ── State transitions ────────────────────────────────────────────────
Route::post('/broadcasts/{broadcast}/go-live',  [LiveBroadcastController::class, 'goLive'])
    ->where('broadcast', $uuid);

Route::post('/broadcasts/{broadcast}/complete', [LiveBroadcastController::class, 'complete'])
    ->where('broadcast', $uuid);

// ── Cancel ───────────────────────────────────────────────────────────
Route::delete('/broadcasts/{broadcast}', [LiveBroadcastController::class, 'destroy'])
    ->where('broadcast', $uuid);

// ── Reveal RTMP credentials (rate-limited — 5/min/user) ─────────────
Route::middleware('throttle:5,1')->group(function () use ($uuid): void {
    Route::get('/broadcasts/{broadcast}/credentials', [LiveBroadcastController::class, 'credentials'])
        ->where('broadcast', $uuid);
});
