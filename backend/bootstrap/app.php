<?php

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

/**
 * ── Sprint 1 fix applied ────────────────────────────────────────────────────
 *   AutoConfirmMatchesCommand is now scheduled hourly. PRD §6.2 requires
 *   auto-confirmation of submitted match results after 24 hours if the
 *   opponent does not respond. Without this schedule, matches stay in
 *   'submitted' state indefinitely.
 *
 *   To make the scheduler actually run in production, add this to the
 *   server's crontab (run once):
 *
 *     * * * * * cd /path/to/backend && php artisan schedule:run >> /dev/null 2>&1
 *
 *   On Windows dev via XAMPP, run once per terminal session:
 *     php artisan schedule:work
 */
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web:      __DIR__.'/../routes/web.php',
        api:      __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health:   '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        $middleware->alias([
            'admin'              => \App\Http\Middleware\EnsureAdmin::class,
            'subscription'       => \App\Http\Middleware\CheckSubscription::class,
            'subscription.limit' => \App\Http\Middleware\CheckSubscriptionLimit::class,
        ]);
    })
    ->withSchedule(function (Schedule $schedule): void {
        // Auto-confirm matches whose opponent has not responded within 24h.
        $schedule->command('matches:auto-confirm')
            ->hourly()
            ->withoutOverlapping()
            ->runInBackground();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
