<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdminFinanceController;
use App\Http\Controllers\Api\AdminInventoryController;
use App\Http\Controllers\Api\AdminMarketplaceController;
use App\Http\Controllers\Api\AdminPlatformSponsorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\MarketplaceController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\PlatformSponsorController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\OrganizerSponsorController;
use App\Http\Controllers\Api\SponsorController;
use App\Http\Controllers\Api\SponsorshipController;
use App\Http\Controllers\Api\TournamentSponsorshipController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\TournamentController;
use App\Http\Controllers\Api\WalletController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // ── Auth ────────────────────────────────────────────────────────────
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

    // ── Public reads ────────────────────────────────────────────────────
    Route::get('/games',                     [GameController::class, 'index']);
    Route::get('/games/active',              [GameController::class, 'active']);
    Route::get('/leaderboard',               [LeaderboardController::class, 'index']);
    Route::get('/marketplace/products',      [MarketplaceController::class, 'products']);
    Route::get('/tournaments',               [TournamentController::class, 'index']);
    Route::get('/tournaments/{tournament}',  [TournamentController::class, 'show'])
        ->where('tournament', '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}');
    Route::get('/players/{user}',            [PlayerController::class, 'show']);
    Route::get('/players/{user}/matches',    [PlayerController::class, 'matches']);
    Route::get('/invoices/{id}/download',    [InvoiceController::class, 'download']);

    // Sprint 14: platform sponsors — visible to all visitors
    Route::get('/platform-sponsors', [PlatformSponsorController::class, 'index']);

    // Sprint 13 Phase 1: Finance report downloads — token-in-query auth
    // (handled inside AdminFinanceController::ensureAdminFromQueryToken)
    // Placed outside auth:sanctum group so browser window.open works;
    // controller enforces admin-only access internally.
    Route::get('/admin/finance/revenue.pdf',   [AdminFinanceController::class, 'revenuePdf']);
    Route::get('/admin/finance/revenue.xlsx',  [AdminFinanceController::class, 'revenueXlsx']);
    Route::get('/admin/finance/invoices.pdf',  [AdminFinanceController::class, 'invoicesPdf']);
    Route::get('/admin/finance/invoices.xlsx', [AdminFinanceController::class, 'invoicesXlsx']);
    Route::get('/admin/finance/vat.pdf',       [AdminFinanceController::class, 'vatPdf']);
    Route::get('/admin/finance/vat.xlsx',      [AdminFinanceController::class, 'vatXlsx']);

    // Per-invoice PDF download (customer-facing invoice layout)
    Route::get('/admin/finance/invoices/{id}.pdf', [AdminFinanceController::class, 'invoiceSinglePdf'])
        ->where('id', '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}');

    // Sprint 8: public sponsors display on tournament detail page
    Route::get('/tournaments/{tournament}/sponsorships', [SponsorshipController::class, 'forTournament']);

    // ── Authenticated ──────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Sprint 9: sponsor catalog for organizer dropdowns
        Route::get('/sponsors-catalog', [TournamentSponsorshipController::class, 'sponsorsCatalog']);

        // Sprint 10: organizers create their own sponsor brands (scoped until admin promotes)
        Route::post ('/sponsors',                 [OrganizerSponsorController::class, 'store']);
        Route::patch('/sponsors/{sponsor}',       [OrganizerSponsorController::class, 'update']);
        Route::post ('/sponsors/{sponsor}/logo',  [OrganizerSponsorController::class, 'uploadLogo']);

        // Sprint 10: organizer creates a new sponsor brand (starts as private scope)
        Route::post('/sponsors-create', [TournamentSponsorshipController::class, 'createSponsor']);
        // Sprint 10: upload/replace a logo on a sponsor (own private sponsor or admin)
        Route::post('/sponsors/{sponsor}/logo', [TournamentSponsorshipController::class, 'uploadLogo']);

        // Sprint 9: organizer manages sponsorships on their own tournaments
        Route::get   ('/tournaments/{tournament}/sponsorships/manage',               [TournamentSponsorshipController::class, 'manageIndex']);
        Route::post  ('/tournaments/{tournament}/sponsorships/manage',               [TournamentSponsorshipController::class, 'propose']);
        Route::delete('/tournaments/{tournament}/sponsorships/manage/{sponsorship}', [TournamentSponsorshipController::class, 'withdrawProposal']);

        // Sprint 4: Self-profile endpoints
        Route::get   ('/profile/me',         [ProfileController::class, 'me']);
        Route::patch ('/profile/me',         [ProfileController::class, 'update']);
        Route::post  ('/profile/me/avatar',  [ProfileController::class, 'uploadAvatar']);
        Route::delete('/profile/me/avatar',  [ProfileController::class, 'deleteAvatar']);

        // Tournaments — write
        Route::post  ('/tournaments',                                       [TournamentController::class, 'store']);
        Route::put   ('/tournaments/{tournament}',                          [TournamentController::class, 'update']);
        Route::delete('/tournaments/{tournament}',                          [TournamentController::class, 'destroy']);
        Route::post  ('/tournaments/{tournament}/register',                 [TournamentController::class, 'register']);
        Route::delete('/tournaments/{tournament}/register',                 [TournamentController::class, 'unregister']);
        Route::post  ('/tournaments/{tournament}/generate-bracket',         [TournamentController::class, 'generateBracket']);
        Route::post  ('/tournaments/{tournament}/matches/{matchId}/result', [TournamentController::class, 'submitResult']);

        // Sprint 3: Tournament cover + branding
        Route::post  ('/tournaments/{tournament}/cover', [TournamentController::class, 'uploadCover']);
        Route::delete('/tournaments/{tournament}/cover', [TournamentController::class, 'deleteCover']);
        Route::patch ('/tournaments/{tournament}/brand', [TournamentController::class, 'updateBranding'])
            ->middleware('white_label');

        // Matches — Sprint 1
        Route::get ('/matches/{match}',                    [MatchController::class, 'show']);
        Route::post('/matches/{match}/result',             [MatchController::class, 'submitResult']);
        Route::post('/matches/{match}/confirm',            [MatchController::class, 'confirmResult']);
        Route::post('/matches/{match}/dispute',            [MatchController::class, 'disputeResult']);
        Route::post('/matches/{match}/moderator-override', [MatchController::class, 'moderatorOverride']);

        // Matches — Sprint 2
        Route::post  ('/matches/{match}/schedule',                            [MatchController::class, 'schedule']);
        Route::post  ('/matches/{match}/reschedule-requests',                 [MatchController::class, 'requestReschedule']);
        Route::get   ('/matches/{match}/reschedule-requests',                 [MatchController::class, 'listReschedules']);
        Route::post  ('/matches/{match}/reschedule-requests/{reqId}/respond', [MatchController::class, 'respondReschedule']);
        Route::delete('/matches/{match}/reschedule-requests/{reqId}',         [MatchController::class, 'cancelReschedule']);
        Route::post  ('/matches/{match}/evidence',                            [MatchController::class, 'uploadEvidence']);
        Route::get   ('/matches/{match}/evidence',                            [MatchController::class, 'listEvidence']);
        Route::delete('/matches/{match}/evidence/{evId}',                     [MatchController::class, 'deleteEvidence']);

        // Matches — live streaming (Option A: Twitch/YouTube embed)
        // Organizer/admin OR either participant can set/clear the URL.
        // Anyone with view access sees the embed (handled in show()).
        Route::post  ('/matches/{match}/stream',                              [MatchController::class, 'setStream']);
        Route::delete('/matches/{match}/stream',                              [MatchController::class, 'clearStream']);

        // Sprint 3: Company branding
        Route::get  ('/companies/mine',       [CompanyController::class, 'mine']);
        Route::patch('/companies/mine/brand', [CompanyController::class, 'updateBranding'])
            ->middleware('white_label');
        Route::post ('/companies/mine/logo',  [CompanyController::class, 'uploadLogo'])
            ->middleware('white_label');
        // Sprint 4: Tournament calendar
        Route::get  ('/companies/mine/calendar', [CompanyController::class, 'calendar']);

        // Marketplace
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

        // Admin
        Route::prefix('admin')->middleware('admin')->group(function () {
            Route::get ('/overview',               [AdminController::class, 'overview']);

            // Sprint 13: Domain-focused dashboards (replaces old generic /admin/dashboard)
            Route::get ('/subscriptions/dashboard', [AdminController::class, 'subscriptionsDashboard']);

            // Sprint 14: platform-level sponsorships (Dawri brand sponsors)
            Route::get   ('/platform-sponsorships',                                  [AdminPlatformSponsorController::class, 'index']);
            Route::post  ('/platform-sponsorships',                                  [AdminPlatformSponsorController::class, 'store']);
            Route::put   ('/platform-sponsorships/{platformSponsorship}',            [AdminPlatformSponsorController::class, 'update']);
            Route::delete('/platform-sponsorships/{platformSponsorship}',            [AdminPlatformSponsorController::class, 'destroy']);
            Route::post  ('/platform-sponsorships/{platformSponsorship}/toggle',     [AdminPlatformSponsorController::class, 'toggle']);

            // Sprint 13 Phase 1: Financial reports (revenue, invoices, VAT)
            // JSON endpoints — standard admin auth via header
            Route::prefix('finance')->group(function () {
                Route::get('/revenue',  [AdminFinanceController::class, 'revenue']);
                Route::get('/invoices', [AdminFinanceController::class, 'invoices']);
                Route::get('/vat',      [AdminFinanceController::class, 'vat']);
            });

            Route::get ('/users',                  [AdminController::class, 'users']);
            Route::put ('/users/{user}',           [AdminController::class, 'updateUser']);
            Route::post('/users/{user}/suspend',   [AdminController::class, 'suspendUser']);
            Route::post('/users/{user}/activate',  [AdminController::class, 'activateUser']);
            Route::get ('/companies',              [AdminController::class, 'companies']);
            Route::get ('/plans',                  [AdminController::class, 'plans']);
            Route::put ('/plans/{key}',            [AdminController::class, 'updatePlan']);
            Route::get ('/distributor-health',     [AdminController::class, 'distributorHealth']);

            // Sprint 8: Sponsorship system
            Route::apiResource('sponsors',      SponsorController::class);
            Route::apiResource('sponsorships',  SponsorshipController::class);
            Route::post('sponsorships/{sponsorship}/activate', [SponsorshipController::class, 'activate']);
            Route::post('sponsorships/{sponsorship}/fulfill',  [SponsorshipController::class, 'fulfill']);
            Route::post('sponsorships/{sponsorship}/cancel',   [SponsorshipController::class, 'cancel']);

            // Sprint 9: approve/reject organizer proposals
            Route::post('sponsorships/{sponsorship}/approve',  [SponsorshipController::class, 'approve']);
            Route::post('sponsorships/{sponsorship}/reject',   [SponsorshipController::class, 'reject']);
            Route::get ('sponsorships-pending-count',          [SponsorshipController::class, 'pendingCount']);

            // Sprint 10: promote/demote organizer-created sponsors
            Route::post('sponsors/{sponsor}/promote', [SponsorController::class, 'promote']);
            Route::post('sponsors/{sponsor}/demote',  [SponsorController::class, 'demote']);

            // ─ Sprint 11: Admin Marketplace ─────────────────────────────
            Route::prefix('marketplace')->group(function () {
                // Sprint 13: Marketplace-focused dashboard (lands on /admin/marketplace Dashboard tab)
                Route::get('/dashboard', [AdminMarketplaceController::class, 'dashboard']);

                Route::get('/stats', [AdminMarketplaceController::class, 'stats']);

                Route::get   ('/products',            [AdminMarketplaceController::class, 'productsIndex']);
                Route::post  ('/products',            [AdminMarketplaceController::class, 'productStore']);
                Route::match (['put', 'patch'], '/products/{product}',
                    [AdminMarketplaceController::class, 'productUpdate']);
                Route::delete('/products/{product}',  [AdminMarketplaceController::class, 'productDestroy']);

                Route::get ('/orders',                [AdminMarketplaceController::class, 'ordersIndex']);
                Route::get ('/orders/{order}',        [AdminMarketplaceController::class, 'orderShow']);
                Route::post('/orders/{order}/refund', [AdminMarketplaceController::class, 'orderRefund']);

                Route::get   ('/distributors', [AdminMarketplaceController::class, 'distributorsIndex']);
                Route::put   ('/distributors/{distributor}/credentials',
                    [AdminMarketplaceController::class, 'credentialsUpdate']);
                Route::delete('/distributors/{distributor}/credentials/{credential}',
                    [AdminMarketplaceController::class, 'credentialsDestroy']);

                Route::delete('/distributors/{distributor}/credentials',
                    [AdminMarketplaceController::class, 'credentialsDestroyAll']);

                Route::post('/distributors/{distributor}/test-connection',
                    [AdminMarketplaceController::class, 'testConnection']);

                Route::get ('/products/{product}/inventory',
                    [AdminInventoryController::class, 'show']);
                Route::post('/products/{product}/inventory/upload',
                    [AdminInventoryController::class, 'upload']);
                Route::get ('/products/{product}/inventory/codes',
                    [AdminInventoryController::class, 'codes']);
                Route::post('/products/{product}/fulfillment-mode',
                    [AdminInventoryController::class, 'setFulfillmentMode']);
                Route::post('/products/{product}/auto-hide',
                    [AdminInventoryController::class, 'setAutoHide']);
                Route::get   ('/batches/{batch}',
                    [AdminInventoryController::class, 'batchShow']);
                Route::delete('/batches/{batch}',
                    [AdminInventoryController::class, 'batchDestroy']);
            });
        });
    });
});
