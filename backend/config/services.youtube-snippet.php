<?php

/*
|--------------------------------------------------------------------------
| YouTube Live Streaming — config block to merge into config/services.php
|--------------------------------------------------------------------------
|
| Paste this block at the bottom of the returned array (before the closing `];`).
| Then run: php artisan config:clear
|
*/

return [

    // ... existing service blocks (postmark, ses, resend, slack,
    //     likecard, fazercards, wupex, reloadly, jawaker) ...

    'youtube' => [
        'client_id'       => env('YOUTUBE_CLIENT_ID'),
        'client_secret'   => env('YOUTUBE_CLIENT_SECRET'),
        'refresh_token'   => env('YOUTUBE_REFRESH_TOKEN'),
        'channel_id'      => env('YOUTUBE_CHANNEL_ID'),
        'api_base_url'    => env('YOUTUBE_API_BASE_URL',    'https://www.googleapis.com/youtube/v3'),
        'oauth_token_url' => env('YOUTUBE_OAUTH_TOKEN_URL', 'https://oauth2.googleapis.com/token'),
        'default_privacy' => env('YOUTUBE_DEFAULT_PRIVACY', 'public'),
        'enabled'         => (bool) env('YOUTUBE_ENABLED', false),
    ],

];
