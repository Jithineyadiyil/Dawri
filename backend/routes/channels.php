<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
| Loaded by bootstrap/app.php via withRouting(channels: ...). This in turn
| pulls in the Sprint 15 community channel authorization definitions
| (community presence channels + per-user private channels).
*/

require __DIR__ . '/channels.community.php';
require __DIR__ . '/channels.social.php';
