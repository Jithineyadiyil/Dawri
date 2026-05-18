<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel'              => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Dawri Digital Goods Distributors (Sprint 5)
    |--------------------------------------------------------------------------
    |
    | Credentials for the 4 distributor adapters. All values default to
    | empty strings — unconfigured adapters are silently skipped by the
    | DistributorRouter, which always falls back to the Likecard stub in
    | dev mode. Populate these via .env once vendor contracts are signed.
    |
    */

    'likecard' => [
        'url'        => env('LIKECARD_URL',        'https://api.like4card.com/v1'),
        'api_key'    => env('LIKECARD_API_KEY',    ''),
        'agent_code' => env('LIKECARD_AGENT_CODE', ''),
    ],

    'fazercards' => [
        'url'     => env('FAZERCARDS_URL',     'https://api.fazercards.com/v1'),
        'api_key' => env('FAZERCARDS_API_KEY', ''),
    ],

    'wupex' => [
        'url'     => env('WUPEX_URL',     'https://api.wupex.com/v1'),
        'api_key' => env('WUPEX_API_KEY', ''),
    ],

    'reloadly' => [
        'auth_url'      => env('RELOADLY_AUTH_URL',      'https://auth.reloadly.com/oauth/token'),
        'url'           => env('RELOADLY_URL',           'https://giftcards.reloadly.com'),
        'client_id'     => env('RELOADLY_CLIENT_ID',     ''),
        'client_secret' => env('RELOADLY_CLIENT_SECRET', ''),
    ],

    'jawaker' => [
        'url'     => env('JAWAKER_URL',     'https://partners.jawaker.com/api/v1'),
        'api_key' => env('JAWAKER_API_KEY', ''),
    ],

    /*
    |--------------------------------------------------------------------------
    | YouTube Live Streaming Integration (Sprint 5 — Tournament Broadcasts)
    |--------------------------------------------------------------------------
    |
    | OAuth 2.0 credentials and channel binding for the Dawri streaming
    | service. Used by YouTubeStreamingService to:
    |   - Refresh access tokens via oauth_token_url
    |   - Create scheduled liveBroadcasts under the bound channel_id
    |   - Bind liveStreams (RTMP ingest URLs) to those broadcasts
    |   - Transition broadcast lifecycle (testing → live → complete)
    |
    | The refresh_token is long-lived; the access_token is fetched on demand
    | and cached for ~55 minutes (max 3600s minus 5min safety window).
    |
    | Set YOUTUBE_ENABLED=false to disable the integration entirely (the
    | service will throw a guarded exception instead of calling the API).
    |
    */

    'youtube' => [
        'client_id'       => env('YOUTUBE_CLIENT_ID'),
        'client_secret'   => env('YOUTUBE_CLIENT_SECRET'),
        'refresh_token'   => env('YOUTUBE_REFRESH_TOKEN'),
        'channel_id'      => env('YOUTUBE_CHANNEL_ID'),
        'api_base_url'    => env('YOUTUBE_API_BASE_URL',    'https://www.googleapis.com/youtube/v3'),
        'oauth_token_url' => env('YOUTUBE_OAUTH_TOKEN_URL', 'https://oauth2.googleapis.com/token'),
        'default_privacy' => env('YOUTUBE_DEFAULT_PRIVACY', 'unlisted'),
        'enabled'         => (bool) env('YOUTUBE_ENABLED', false),
    ],

];
