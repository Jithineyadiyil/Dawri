<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| BROWSER-BROADCAST ROUTE ADDITIONS  (Sprint 6 — May 2026)
|--------------------------------------------------------------------------
| These lines MUST be appended to your existing
|   D:\xamp new\htdocs\Dawri\backend\routes\api.streaming.php
|
| The file is already `require`d from routes/api.php inside the
| `Route::prefix('v1')->middleware('auth:sanctum')` group, so the routes
| below inherit that prefix/middleware automatically.
|
| The webhook route is registered OUTSIDE the auth:sanctum group because
| Mux is an unauthenticated caller — it proves itself via the
| Mux-Signature HMAC header, not Sanctum tokens.
*/

use App\Http\Controllers\Api\BrowserBroadcastController;
use App\Http\Controllers\Api\Webhooks\MuxWebhookController;
use Illuminate\Support\Facades\Route;

// ── Authenticated browser-broadcast endpoints (inside auth:sanctum) ─────
Route::prefix('broadcasts/{broadcast}')
    ->whereUuid('broadcast')
    ->group(function (): void {
        Route::post('browser-session', [BrowserBroadcastController::class, 'store'])
            ->name('broadcasts.browser-session.store');

        Route::delete('browser-session', [BrowserBroadcastController::class, 'destroy'])
            ->name('broadcasts.browser-session.destroy');
    });

/*
|--------------------------------------------------------------------------
| MUX WEBHOOK — must be registered OUTSIDE auth:sanctum group
|--------------------------------------------------------------------------
| Append this to routes/api.php directly (NOT inside the auth group).
| Add it ABOVE the existing `Route::middleware('auth:sanctum')->group(...)`
| block, like so:
|
|     Route::prefix('v1')->group(function () {
|         // PUBLIC routes (no auth) — webhooks live here
|         Route::post('webhooks/mux', \App\Http\Controllers\Api\Webhooks\MuxWebhookController::class)
|              ->name('webhooks.mux');
|
|         // Then the existing auth:sanctum group...
|         Route::middleware('auth:sanctum')->group(function () {
|             require __DIR__ . '/api.streaming.php';
|             // ...
|         });
|     });
*/
