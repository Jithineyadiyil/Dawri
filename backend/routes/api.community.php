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
use App\Http\Controllers\Api\AttachmentController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\JoinController;
use App\Http\Controllers\Api\CommunityAdminController;
use App\Http\Controllers\Api\PollController;
use App\Http\Controllers\Api\ScheduledMessageController;
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

        // Community events
        Route::get('events',  [EventController::class, 'index']);
        Route::post('events', [EventController::class, 'store']);

        // Join flow
        Route::patch('join-policy',     [JoinController::class, 'setPolicy']);
        Route::get('invites',           [JoinController::class, 'invites']);
        Route::post('invites',          [JoinController::class, 'createInvite']);
        Route::post('join',             [JoinController::class, 'requestJoin']);
        Route::get('join-requests',     [JoinController::class, 'pendingRequests']);

        // Admin & safety (Phase 6)
        Route::get('rules',  [CommunityAdminController::class, 'getRules']);
        Route::put('rules',  [CommunityAdminController::class, 'setRules']);
        Route::get('blocked-words',  [CommunityAdminController::class, 'listWords']);
        Route::post('blocked-words', [CommunityAdminController::class, 'addWord']);
        Route::delete('blocked-words/{word}', [CommunityAdminController::class, 'removeWord'])->whereUuid('word');
        Route::get('audit-log', [CommunityAdminController::class, 'auditLog']);
        Route::get('analytics', [CommunityAdminController::class, 'analytics']);
    });
});

// Invite redemption — token in the path (not a UUID).
Route::post('invites/{token}/redeem', [JoinController::class, 'redeem'])
    ->where('token', '[A-Za-z0-9]+');

// Invite + join-request management (UUID-scoped).
Route::delete('invites/{invite}', [JoinController::class, 'revokeInvite'])->whereUuid('invite');
Route::prefix('join-requests/{joinRequest}')->whereUuid('joinRequest')->group(function (): void {
    Route::post('approve', [JoinController::class, 'approve']);
    Route::post('deny',    [JoinController::class, 'deny']);
});

// Event-scoped actions
Route::prefix('events/{event}')->whereUuid('event')->group(function (): void {
    Route::patch('/',       [EventController::class, 'update']);
    Route::delete('/',      [EventController::class, 'destroy']);
    Route::post('cancel',   [EventController::class, 'cancel']);
    Route::post('rsvp',     [EventController::class, 'rsvp']);
});

Route::prefix('channels/{channel}')->whereUuid('channel')->group(function (): void {
    Route::patch('/',           [ChannelController::class, 'update']);
    Route::delete('/',          [ChannelController::class, 'destroy']);
    Route::post('mark-read',    [ChannelController::class, 'markRead']);

    Route::get('messages',           [MessageController::class, 'index']);
    Route::get('messages/pinned',    [MessageController::class, 'pinned']);

    // Polls within a channel
    Route::get('polls',  [PollController::class, 'index']);
    Route::post('polls', [PollController::class, 'store']);

    // Scheduled posts within a channel (moderator+)
    Route::get('scheduled',  [ScheduledMessageController::class, 'index']);
    Route::post('scheduled', [ScheduledMessageController::class, 'store']);

    // Image attachments (upload creates a carrier message). Rate-limited.
    Route::middleware('throttle:20,1')->group(function (): void {
        Route::post('attachments', [AttachmentController::class, 'store']);
    });

    // Post 30/min/user — abuse mitigation
    Route::middleware('throttle:30,1')->group(function (): void {
        Route::post('messages', [MessageController::class, 'store']);
    });
});

Route::prefix('polls/{poll}')->whereUuid('poll')->group(function (): void {
    Route::post('vote',  [PollController::class, 'vote']);
    Route::post('close', [PollController::class, 'close']);
    Route::delete('/',   [PollController::class, 'destroy']);
});

Route::delete('scheduled/{scheduled}', [ScheduledMessageController::class, 'destroy'])->whereUuid('scheduled');

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
