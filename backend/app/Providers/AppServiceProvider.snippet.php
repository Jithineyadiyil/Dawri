<?php

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * AppServiceProvider snippet
 *
 * Add the bindings below to your existing app/Providers/AppServiceProvider.php
 * inside the register() method. They register each distributor adapter as a
 * singleton so DistributorRouter can resolve them via constructor injection.
 *
 * Laravel auto-resolves concrete classes without explicit binding, BUT we
 * register them as singletons anyway so each adapter only instantiates once
 * per request — the HTTP client and cached OAuth tokens stay hot.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Add these `use` imports at the top of AppServiceProvider.php:
/*
use App\Services\DistributorRouter;
use App\Services\Distributors\JawakerAdapter;
use App\Services\Distributors\LikecardAdapter;
use App\Services\Distributors\ReloadlyAdapter;
use App\Services\Distributors\WupexAdapter;
*/

// Add these inside register():
/*
$this->app->singleton(LikecardAdapter::class);
$this->app->singleton(WupexAdapter::class);
$this->app->singleton(ReloadlyAdapter::class);
$this->app->singleton(JawakerAdapter::class);
$this->app->singleton(DistributorRouter::class);
*/

// If you also want to bind the old App\Services\LikecardService name for
// any legacy references, add:
/*
$this->app->bind(\App\Services\LikecardService::class, function () {
    // Shim to avoid breaking any existing code that still type-hints the old class
    return new class extends \App\Services\Distributors\LikecardAdapter {};
});
*/
