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
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Dawri Platform
| Base URL: http://localhost:8001/api/v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ── Auth (public) ─────────────────────────────────────────────────────────
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login',    [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout',     [AuthController::class, 'logout']);
            Route::post('/otp/send',   [AuthController::class, 'sendOtp']);
            Route::post('/otp/verify', [AuthController::class, 'verifyOtp']);
        });
    });

    // ── Games (public) ────────────────────────────────────────────────────────
    Route::get('/games',        [GameController::class, 'index']);
    Route::get('/games/active', [GameController::class, 'active']);

    // ── Leaderboard (public) ──────────────────────────────────────────────────
    Route::get('/leaderboard', [LeaderboardController::class, 'index']);

    // ── Marketplace products (public) ─────────────────────────────────────────
    Route::get('/marketplace/products', [MarketplaceController::class, 'products']);

    // ── Tournaments (public read) ─────────────────────────────────────────────
    Route::get('/tournaments',              [TournamentController::class, 'index']);
    Route::get('/tournaments/{tournament}', [TournamentController::class, 'show']);

    // ── Players (public profiles) ─────────────────────────────────────────────
    Route::get('/players/{user}',         [PlayerController::class, 'show']);
    Route::get('/players/{user}/matches', [PlayerController::class, 'matches']);

    // ── Invoice PDF download (auth via token query param) ─────────────────────
    Route::get('/invoices/{id}/download', [InvoiceController::class, 'download']);

    // ── Authenticated ─────────────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Tournaments — write
        Route::post  ('/tournaments',                                       [TournamentController::class, 'store']);
        Route::put   ('/tournaments/{tournament}',                          [TournamentController::class, 'update']);
        Route::delete('/tournaments/{tournament}',                          [TournamentController::class, 'destroy']);
        Route::post  ('/tournaments/{tournament}/register',                 [TournamentController::class, 'register']);
        Route::post  ('/tournaments/{tournament}/generate-bracket',         [TournamentController::class, 'generateBracket']);
        Route::post  ('/tournaments/{tournament}/matches/{matchId}/result', [TournamentController::class, 'submitResult']);

        // Matches
        Route::post('/matches/{match}/result',  [MatchController::class, 'submitResult']);
        Route::post('/matches/{match}/confirm', [MatchController::class, 'confirm']);
        Route::post('/matches/{match}/dispute', [MatchController::class, 'dispute']);

        // Marketplace — orders
        Route::post('/marketplace/orders',                [MarketplaceController::class, 'placeOrder']);
        Route::get ('/marketplace/orders',                [MarketplaceController::class, 'orders']);
        Route::post('/marketplace/orders/{id}/reveal',    [MarketplaceController::class, 'revealCode']);

        // Wallet — handled by MarketplaceController
        Route::get ('/wallet',       [MarketplaceController::class, 'wallet']);
        Route::post('/wallet/topup', [MarketplaceController::class, 'topUp']);

        // Subscription
        Route::get   ('/subscription/plans',    [SubscriptionController::class, 'plans']);
        Route::get   ('/subscription',          [SubscriptionController::class, 'current']);
        Route::post  ('/subscription',          [SubscriptionController::class, 'subscribe']);
        Route::put   ('/subscription',          [SubscriptionController::class, 'change']);
        Route::delete('/subscription',          [SubscriptionController::class, 'cancel']);
        Route::get   ('/subscription/invoices', [SubscriptionController::class, 'invoices']);

        // ── Admin ─────────────────────────────────────────────────────────────
        Route::prefix('admin')->group(function () {

            // Overview / stats
            Route::get('/overview', [AdminController::class, 'overview']);

            // Plans & pricing
            Route::get('/plans',       [AdminController::class, 'plans']);
            Route::put('/plans/{key}', [AdminController::class, 'updatePlan']);

            // Companies
            Route::get   ('/companies',      [AdminController::class, 'companies']);
            Route::post  ('/companies',      [AdminController::class, 'createCompany']);
            Route::put   ('/companies/{id}', [AdminController::class, 'updateCompany']);
            Route::delete('/companies/{id}', [AdminController::class, 'deleteCompany']);

            // Subscriptions
            Route::get ('/subscriptions',             [AdminController::class, 'subscriptions']);
            Route::post('/subscriptions',             [AdminController::class, 'createSubscription']);
            Route::put ('/subscriptions/{id}',        [AdminController::class, 'updateSubscription']);
            Route::post('/subscriptions/{id}/cancel', [AdminController::class, 'cancelSubscription']);
            Route::post('/subscriptions/{id}/extend', [AdminController::class, 'extendSubscription']);

            // Users
            Route::get('/users',      [AdminController::class, 'users']);
            Route::put('/users/{id}', [AdminController::class, 'updateUser']);

            // Invoices
            Route::get('/invoices',                [AdminController::class, 'invoices']);
            Route::put('/invoices/{id}/mark-paid', [AdminController::class, 'markInvoicePaid']);

            // Games CRUD
            Route::post  ('/games',               [GameController::class, 'store']);
            Route::put   ('/games/{game}',        [GameController::class, 'update']);
            Route::patch ('/games/{game}/toggle', [GameController::class, 'toggle']);
            Route::delete('/games/{game}',        [GameController::class, 'destroy']);
        });
    });
});
