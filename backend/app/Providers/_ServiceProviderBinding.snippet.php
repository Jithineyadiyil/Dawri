<?php

/*
|--------------------------------------------------------------------------
| Streaming Module — Service Container Bindings
|--------------------------------------------------------------------------
|
| Add this binding to the existing AppServiceProvider::register() method
| (or wherever the project already binds TournamentRepositoryInterface).
|
| Location: backend/app/Providers/AppServiceProvider.php
|
*/

use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Repositories\Eloquent\LiveBroadcastRepository;

/**
 * Add this line inside register():
 *
 *   $this->app->bind(LiveBroadcastRepositoryInterface::class, LiveBroadcastRepository::class);
 *
 * No binding is needed for YouTubeStreamingService or LiveBroadcastService —
 * Laravel auto-resolves them via constructor type-hinting.
 */
