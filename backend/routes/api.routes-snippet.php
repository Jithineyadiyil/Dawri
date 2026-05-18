<?php

/*
|--------------------------------------------------------------------------
| Live Broadcasts — YouTube Live (Option B) — Sprint 5
|--------------------------------------------------------------------------
|
| Add these routes inside the existing `Route::middleware('auth:sanctum')`
| block in routes/api.php, near the other tournament/match routes.
|
| Add this `use` line at the top of routes/api.php:
|
|     use App\Http\Controllers\Api\LiveBroadcastController;
|
| Then merge the block below into the authenticated group.
|
*/

use App\Http\Controllers\Api\LiveBroadcastController;
use Illuminate\Support\Facades\Route;

const UUID_REGEX = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

Route::middleware('auth:sanctum')->group(function () {

    // Create
    Route::post('/matches/{match}/broadcast',          [LiveBroadcastController::class, 'createForMatch'])
        ->where('match', UUID_REGEX);
    Route::post('/tournaments/{tournament}/broadcast', [LiveBroadcastController::class, 'createForTournament'])
        ->where('tournament', UUID_REGEX);

    // Read
    Route::get('/broadcasts/{broadcast}', [LiveBroadcastController::class, 'show'])
        ->where('broadcast', UUID_REGEX);

    // State transitions
    Route::post('/broadcasts/{broadcast}/go-live',  [LiveBroadcastController::class, 'goLive'])
        ->where('broadcast', UUID_REGEX);
    Route::post('/broadcasts/{broadcast}/complete', [LiveBroadcastController::class, 'complete'])
        ->where('broadcast', UUID_REGEX);

    // Cancel
    Route::delete('/broadcasts/{broadcast}', [LiveBroadcastController::class, 'destroy'])
        ->where('broadcast', UUID_REGEX);

    // Reveal RTMP credentials — RATE LIMITED (5 requests / minute / user)
    // to discourage credential-stealing replay attacks.
    Route::middleware('throttle:5,1')->group(function () {
        Route::get('/broadcasts/{broadcast}/credentials', [LiveBroadcastController::class, 'credentials'])
            ->where('broadcast', UUID_REGEX);
    });
});
