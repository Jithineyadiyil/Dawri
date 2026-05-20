<?php

/*
|--------------------------------------------------------------------------
| Service Container Binding — OBS Setup Wizard
|--------------------------------------------------------------------------
|
| The repository binding for LiveBroadcastRepositoryInterface already
| exists in your AppServiceProvider::register() (added in the streaming
| Sprint 5 PR).
|
| Add ONE more line just below it to bind the wizard's log repository:
|
*/

use App\Repositories\Contracts\BroadcastSetupLogRepositoryInterface;
use App\Repositories\Eloquent\BroadcastSetupLogRepository;

// Inside AppServiceProvider::register():
$this->app->bind(
    BroadcastSetupLogRepositoryInterface::class,
    BroadcastSetupLogRepository::class
);
