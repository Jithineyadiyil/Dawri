<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Social routes — friends (Phase 1), then DMs & challenges.
|--------------------------------------------------------------------------
| Required inside the existing `Route::prefix("v1")` + `auth:sanctum`
| group in routes/api.php. All routes inherit the v1 prefix and auth.
*/

use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\ChallengeController;
use App\Http\Controllers\Api\DirectMessageController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\OrganizerVerificationController;
use App\Http\Controllers\Api\PlayerDiscoveryController;
use App\Http\Controllers\Api\PlayerProfileController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Support\Facades\Route;

// ── Player profiles + discovery (Dawri 2.0) ───────────────────────────
Route::get('/players',               [PlayerDiscoveryController::class, 'index']);
Route::get('/players/{user}/full',   [PlayerProfileController::class, 'show'])->whereUuid('user');
Route::get('/me/profile',            [PlayerProfileController::class, 'me']);
Route::patch('/me/gaming-ids',       [PlayerProfileController::class, 'updateGamingIds']);

// ── Organizer verification (apply + my status) ────────────────────────
Route::get('/me/organizer-status',         [OrganizerVerificationController::class, 'status']);
Route::post('/me/organizer-verification',  [OrganizerVerificationController::class, 'apply']);

// ── Teams (Dawri 2.0) ─────────────────────────────────────────────────
Route::get   ('/teams',                                  [TeamController::class, 'index']);
Route::post  ('/teams',                                  [TeamController::class, 'store']);
Route::get   ('/teams/{team}',                           [TeamController::class, 'show']);
Route::patch ('/teams/{team}',                           [TeamController::class, 'update']);
Route::delete('/teams/{team}',                           [TeamController::class, 'destroy']);

Route::post  ('/teams/{team}/invites',                   [TeamController::class, 'invite'])->whereUuid('team');
Route::post  ('/teams/{team}/leave',                     [TeamController::class, 'leave'])->whereUuid('team');
Route::delete('/teams/{team}/members/{user}',            [TeamController::class, 'kickMember'])->whereUuid('team')->whereUuid('user');
Route::post  ('/teams/{team}/members/{user}/promote',    [TeamController::class, 'promoteMember'])->whereUuid('team')->whereUuid('user');
Route::post  ('/teams/{team}/members/{user}/demote',     [TeamController::class, 'demoteMember'])->whereUuid('team')->whereUuid('user');

Route::get ('/me/team-invites',                          [TeamController::class, 'myInvites']);
Route::post('/team-invites/{invite}/accept',             [TeamController::class, 'acceptInvite'])->whereUuid('invite');
Route::post('/team-invites/{invite}/decline',            [TeamController::class, 'declineInvite'])->whereUuid('invite');
Route::get ('/me/teams',                                 [TeamController::class, 'myTeams']);


// ── Achievements + XP ─────────────────────────────────────────────────
Route::get('/achievements',                       [AchievementController::class, 'index']);
Route::get('/me/achievements',                    [AchievementController::class, 'mine']);
Route::get('/users/{user}/achievements',          [AchievementController::class, 'forUser'])->whereUuid('user');

Route::prefix('friends')->group(function (): void {
    Route::get('/',                 [FriendController::class, 'index']);
    Route::get('/requests',         [FriendController::class, 'requests']);
    Route::get('/sent',             [FriendController::class, 'sent']);
    Route::get('/status/{user}',    [FriendController::class, 'status'])->whereUuid('user');

    Route::post('/',                [FriendController::class, 'store']);
    Route::post('/{friendship}/accept',  [FriendController::class, 'accept'])->whereUuid('friendship');
    Route::post('/{friendship}/decline', [FriendController::class, 'decline'])->whereUuid('friendship');

    Route::delete('/{user}',        [FriendController::class, 'destroy'])->whereUuid('user');
});

// ── Direct messages (private chat between friends) ────────────────────
Route::prefix('dm')->group(function (): void {
    Route::get('/',                          [DirectMessageController::class, 'index']);
    Route::get('/unread-count',              [DirectMessageController::class, 'unreadTotal']);
    Route::get('/with/{user}',               [DirectMessageController::class, 'with'])->whereUuid('user');
    Route::post('/with/{user}',              [DirectMessageController::class, 'send'])->whereUuid('user');
    Route::post('/with/{user}/voice',        [DirectMessageController::class, 'sendVoice'])->whereUuid('user');
    Route::get('/{conversation}/messages',   [DirectMessageController::class, 'messages'])->whereUuid('conversation');
    Route::post('/{conversation}/read',      [DirectMessageController::class, 'markRead'])->whereUuid('conversation');
    Route::post('/{conversation}/send',      [DirectMessageController::class, 'sendToConversation'])->whereUuid('conversation');
});

// ── Challenges (friendly 1v1) ─────────────────────────────────────────
Route::prefix('challenges')->group(function (): void {
    Route::get('/',                       [ChallengeController::class, 'index']);
    Route::post('/',                      [ChallengeController::class, 'store']);
    Route::post('/{challenge}/accept',    [ChallengeController::class, 'accept'])->whereUuid('challenge');
    Route::post('/{challenge}/decline',   [ChallengeController::class, 'decline'])->whereUuid('challenge');
    Route::post('/{challenge}/cancel',    [ChallengeController::class, 'cancel'])->whereUuid('challenge');
    Route::post('/{challenge}/result',    [ChallengeController::class, 'reportResult'])->whereUuid('challenge');
    Route::post('/{challenge}/confirm',   [ChallengeController::class, 'confirm'])->whereUuid('challenge');
});
