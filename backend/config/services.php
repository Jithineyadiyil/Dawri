<?php

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
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
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

];
