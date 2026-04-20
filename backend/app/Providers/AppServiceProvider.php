<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

/**
 * Application Service Provider.
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
        //
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
