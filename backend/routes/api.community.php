<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Sprint 15 — Dawri Community routes
|--------------------------------------------------------------------------
| Required inside the existing `Route::prefix("v1")` + `auth:sanctum` group
| in routes/api.php like so:
|
|     Route::middleware("auth:sanctum")->group(function () {
|         // ... existing routes ...
|         require __DIR__ . "/api.community.php";
|     });
|
| All routes inherit the v1 prefix and auth:sanctum middleware.
*/

use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\CommunityModerationController;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Support\Facades\Route;

$uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

Route::prefix('communities')->group(function () use ($uuid): void {
    Route::get('/', [CommunityController::class, 'index']);
    Route::get('/{slug}', [CommunityController::class, 'show']);

    Route::prefix('{community}')->whereUuid('community')->group(function (): void {
        Route::get('members', [CommunityController::class, 'members']);
        Route::post('leave',  [CommunityController::class, 'leave']);
        Route::post('moderate', CommunityModerationController::class);

        Route::get('channels',  [ChannelController::class, 'index']);
        Route::post('channels', [ChannelController::class, 'store']);
    });
});

Route::prefix('channels/{channel}')->whereUuid('channel')->group(function (): void {
    Route::patch('/',           [ChannelController::class, 'update']);
    Route::delete('/',          [ChannelController::class, 'destroy']);
    Route::post('mark-read',    [ChannelController::class, 'markRead']);

    Route::get('messages',           [MessageController::class, 'index']);
    Route::get('messages/pinned',    [MessageController::class, 'pinned']);

    // Post 30/min/user — abuse mitigation
    Route::middleware('throttle:30,1')->group(function (): void {
        Route::post('messages', [MessageController::class, 'store']);
    });
});

Route::prefix('messages/{message}')->whereUuid('message')->group(function (): void {
    Route::patch('/',   [MessageController::class, 'update']);
    Route::delete('/',  [MessageController::class, 'destroy']);
    Route::post('pin',  [MessageController::class, 'pin']);
    Route::delete('pin',[MessageController::class, 'unpin']);

    // Reactions 60/min/user
    Route::middleware('throttle:60,1')->group(function (): void {
        Route::post('reactions',           [MessageController::class, 'react']);
        Route::delete('reactions/{emoji}', [MessageController::class, 'unreact']);
    });
});
