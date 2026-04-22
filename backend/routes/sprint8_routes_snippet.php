<?php

/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  Sprint 8 — Sponsorship routes
 *
 *  Add these imports at the top of routes/api.php (if not already present):
 * ═══════════════════════════════════════════════════════════════════════════
 */

// use App\Http\Controllers\Api\SponsorController;
// use App\Http\Controllers\Api\SponsorshipController;

/*
 * ─────────────────────────────────────────────────────────────────────────
 *  PUBLIC route: anyone viewing a tournament page can see active sponsors.
 *  Paste inside the main v1 group, alongside other public tournament reads.
 * ─────────────────────────────────────────────────────────────────────────
 */

// Route::get(
//     '/tournaments/{tournament}/sponsorships',
//     [SponsorshipController::class, 'forTournament']
// );

/*
 * ─────────────────────────────────────────────────────────────────────────
 *  ADMIN routes: all under the existing /admin prefix + 'admin' middleware.
 *  Paste inside the existing admin group block.
 * ─────────────────────────────────────────────────────────────────────────
 */

// // Sponsors CRUD
// Route::apiResource('sponsors', SponsorController::class);
//
// // Sponsorships CRUD + state transitions
// Route::apiResource('sponsorships', SponsorshipController::class);
// Route::post('sponsorships/{sponsorship}/activate',  [SponsorshipController::class, 'activate']);
// Route::post('sponsorships/{sponsorship}/fulfill',   [SponsorshipController::class, 'fulfill']);
// Route::post('sponsorships/{sponsorship}/cancel',    [SponsorshipController::class, 'cancel']);

/*
 * Resulting URL table:
 *
 * PUBLIC
 *   GET    /api/v1/tournaments/{tournament}/sponsorships
 *
 * ADMIN
 *   GET    /api/v1/admin/sponsors
 *   POST   /api/v1/admin/sponsors
 *   GET    /api/v1/admin/sponsors/{sponsor}
 *   PATCH  /api/v1/admin/sponsors/{sponsor}
 *   DELETE /api/v1/admin/sponsors/{sponsor}
 *
 *   GET    /api/v1/admin/sponsorships
 *   POST   /api/v1/admin/sponsorships
 *   GET    /api/v1/admin/sponsorships/{sponsorship}
 *   PATCH  /api/v1/admin/sponsorships/{sponsorship}
 *   DELETE /api/v1/admin/sponsorships/{sponsorship}
 *   POST   /api/v1/admin/sponsorships/{sponsorship}/activate
 *   POST   /api/v1/admin/sponsorships/{sponsorship}/fulfill
 *   POST   /api/v1/admin/sponsorships/{sponsorship}/cancel
 */
