<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Repositories\Eloquent\LiveBroadcastRepository;
use App\Services\DistributorRouter;
use App\Services\Distributors\JawakerAdapter;
use App\Services\Distributors\LikecardAdapter;
use App\Services\Distributors\ReloadlyAdapter;
use App\Services\Distributors\WupexAdapter;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

/**
 * Application Service Provider.
 *
 * Sprint 5 additions: singleton bindings for the distributor adapters +
 * router, so each HTTP request reuses a single instance rather than
 * rebuilding the adapter graph on every resolution.
 *
 * Sprint 5 (streaming) addition: bind LiveBroadcastRepositoryInterface
 * so LiveBroadcastController and LiveBroadcastService can resolve it
 * via constructor type-hinting.
 *
 * Critical fix: Schema::defaultStringLength(191) must be set here
 * to prevent MySQL utf8mb4 index length errors on VARCHAR columns.
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register application services.
     */
    public function register(): void
    {
        // Sprint 5: distributor abstraction — register each adapter + router
        // as a singleton so HTTP clients, cached OAuth tokens, and circuit
        // state stay hot within a single request lifecycle.
        $this->app->singleton(LikecardAdapter::class);
        $this->app->singleton(WupexAdapter::class);
        $this->app->singleton(ReloadlyAdapter::class);
        $this->app->singleton(JawakerAdapter::class);
        $this->app->singleton(DistributorRouter::class);

        // Sprint 5 — YouTube Live (Option B): repository binding
        $this->app->bind(LiveBroadcastRepositoryInterface::class, LiveBroadcastRepository::class);
    }

    /**
     * Bootstrap application services.
     */
    public function boot(): void
    {
        // Fix: required for MySQL utf8mb4 with InnoDB on older MySQL/MariaDB builds
        Schema::defaultStringLength(191);
    }
}
