<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| services.php — Mux + YouTube additions  (Sprint 6, May 2026)
|--------------------------------------------------------------------------
| Append the entries below to your existing
|   D:\xamp new\htdocs\Dawri\backend\config\services.php
|
| All values come from the .env to keep secrets out of source control.
*/

return [

    // ... existing entries ...

    /*
    |--------------------------------------------------------------------------
    | Mux Live Streaming
    |--------------------------------------------------------------------------
    |
    | Sign up at https://www.mux.com and create an Access Token in
    | Settings → API Access. Copy the Token ID and Token Secret into .env.
    |
    | While developing on XAMPP locally, leave MUX_TEST_MODE=true — all
    | live streams created will be free test streams that never bill.
    | Flip to false only when you go to production.
    |
    | Webhook secret: configured in Mux dashboard under Settings → Webhooks.
    | Point webhooks at https://your-public-host/api/v1/webhooks/mux
    | (use ngrok for local development).
    */
    'mux' => [
        'token_id'        => env('MUX_TOKEN_ID'),
        'token_secret'    => env('MUX_TOKEN_SECRET'),
        'webhook_secret'  => env('MUX_WEBHOOK_SECRET'),
        'test_mode'       => env('MUX_TEST_MODE', true),
        'timeout'         => env('MUX_HTTP_TIMEOUT', 10),
        'session_ttl'     => env('MUX_SESSION_TTL', 300),
        'whip_base_url'   => env('MUX_WHIP_BASE_URL', 'https://global-live.mux.com/api/v1/whip'),
    ],

    /*
    |--------------------------------------------------------------------------
    | YouTube (existing — augmented)
    |--------------------------------------------------------------------------
    |
    | The `rtmp_url` value is the destination Cloudflare/Mux/ffmpeg push
    | to when simulcasting Dawri broadcasts to YouTube. It is a global
    | constant (https://support.google.com/youtube/answer/9854440) but is
    | exposed via config so test environments can point elsewhere.
    */
    'youtube' => [
        // ... existing entries (client_id, client_secret, refresh_token, channel_id) ...
        'rtmp_url' => env('YOUTUBE_RTMP_URL', 'rtmp://a.rtmp.youtube.com/live2'),
    ],
];
