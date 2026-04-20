<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\MarketplaceController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\TournamentController;
use App\Http\Controllers\Api\WalletController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Dawri Platform
| Base: http://localhost:8001/api/v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ── Auth (public) ─────────────────────────────────────────────────────
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login',    [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get ('/me',         [AuthController::class, 'me']);
            Route::post('/logout',     [AuthController::class, 'logout']);
            Route::post('/otp/send',   [AuthController::class, 'sendOtp']);
            Route::post('/otp/verify', [AuthController::class, 'verifyOtp']);
        });
    });

    // ── Games / Leaderboard / Marketplace / Tournaments / Players (public) ──
    Route::get('/games',                 [GameController::class, 'index']);
    Route::get('/games/active',          [GameController::class, 'active']);
    Route::get('/leaderboard',           [LeaderboardController::class, 'index']);
    Route::get('/marketplace/products',  [MarketplaceController::class, 'products']);
    Route::get('/tournaments',           [TournamentController::class, 'index']);
    Route::get('/tournaments/{tournament}', [TournamentController::class, 'show']);
    Route::get('/players/{user}',            [PlayerController::class, 'show']);
    Route::get('/players/{user}/matches',    [PlayerController::class, 'matches']);
    Route::get('/invoices/{id}/download',    [InvoiceController::class, 'download']);

    // ── Authenticated ─────────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Tournaments — write
        Route::post  ('/tournaments',                                       [TournamentController::class, 'store']);
        Route::put   ('/tournaments/{tournament}',                          [TournamentController::class, 'update']);
        Route::delete('/tournaments/{tournament}',                          [TournamentController::class, 'destroy']);
        Route::post  ('/tournaments/{tournament}/register',                 [TournamentController::class, 'register']);
        Route::post  ('/tournaments/{tournament}/generate-bracket',         [TournamentController::class, 'generateBracket']);
        Route::post  ('/tournaments/{tournament}/matches/{matchId}/result', [TournamentController::class, 'submitResult']);

        // ── Matches — Sprint 1 (result lifecycle) ─────────────────────────
        Route::get ('/matches/{match}',                    [MatchController::class, 'show']);
        Route::post('/matches/{match}/result',             [MatchController::class, 'submitResult']);
        Route::post('/matches/{match}/confirm',            [MatchController::class, 'confirmResult']);
        Route::post('/matches/{match}/dispute',            [MatchController::class, 'disputeResult']);
        Route::post('/matches/{match}/moderator-override', [MatchController::class, 'moderatorOverride']);

        // ── Matches — Sprint 2 (scheduling) ───────────────────────────────
        Route::post  ('/matches/{match}/schedule',                         [MatchController::class, 'schedule']);
        Route::post  ('/matches/{match}/reschedule-requests',              [MatchController::class, 'requestReschedule']);
        Route::get   ('/matches/{match}/reschedule-requests',              [MatchController::class, 'listReschedules']);
        Route::post  ('/matches/{match}/reschedule-requests/{reqId}/respond', [MatchController::class, 'respondReschedule']);
        Route::delete('/matches/{match}/reschedule-requests/{reqId}',      [MatchController::class, 'cancelReschedule']);

        // ── Matches — Sprint 2 (evidence) ─────────────────────────────────
        Route::post  ('/matches/{match}/evidence',           [MatchController::class, 'uploadEvidence']);
        Route::get   ('/matches/{match}/evidence',           [MatchController::class, 'listEvidence']);
        Route::delete('/matches/{match}/evidence/{evId}',    [MatchController::class, 'deleteEvidence']);

        // Marketplace — orders
        Route::post('/marketplace/orders',             [MarketplaceController::class, 'placeOrder']);
        Route::get ('/marketplace/orders',             [MarketplaceController::class, 'orders']);
        Route::post('/marketplace/orders/{id}/reveal', [MarketplaceController::class, 'revealCode']);

        // Wallet
        Route::get ('/wallet',              [WalletController::class, 'balance']);
        Route::post('/wallet/topup',        [WalletController::class, 'topUp']);
        Route::get ('/wallet/transactions', [WalletController::class, 'transactions']);

        // Subscription
        Route::get   ('/subscription/plans',    [SubscriptionController::class, 'plans']);
        Route::get   ('/subscription',          [SubscriptionController::class, 'current']);
        Route::post  ('/subscription',          [SubscriptionController::class, 'subscribe']);
        Route::put   ('/subscription',          [SubscriptionController::class, 'change']);
        Route::delete('/subscription',          [SubscriptionController::class, 'cancel']);
        Route::get   ('/subscription/invoices', [SubscriptionController::class, 'invoices']);

        // ── Admin ──────────────────────────────────────────────────────────
        Route::prefix('admin')->middleware('admin')->group(function () {
            Route::get ('/overview',               [AdminController::class, 'overview']);
            Route::get ('/users',                  [AdminController::class, 'users']);
            Route::put ('/users/{user}',           [AdminController::class, 'updateUser']);
            Route::post('/users/{user}/suspend',   [AdminController::class, 'suspendUser']);
            Route::post('/users/{user}/activate',  [AdminController::class, 'activateUser']);
            Route::get ('/companies',              [AdminController::class, 'companies']);
            Route::get ('/plans',                  [AdminController::class, 'plans']);
            Route::put ('/plans/{key}',            [AdminController::class, 'updatePlan']);
            Route::get ('/distributor-health',     [AdminController::class, 'distributorHealth']);
        });
    });
});
