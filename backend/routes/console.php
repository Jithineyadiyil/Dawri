<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Phase 7 — publish due scheduled community messages every minute.
// Requires the Laravel scheduler to be running (one cron entry, or Windows
// Task Scheduler): * * * * * php artisan schedule:run
Schedule::command('community:publish-scheduled')
    ->everyMinute()
    ->withoutOverlapping();
