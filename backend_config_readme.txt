Add to config/services.php:

    'youtube' => [
        'client_id'     => env('YOUTUBE_CLIENT_ID'),
        'client_secret' => env('YOUTUBE_CLIENT_SECRET'),
        'refresh_token' => env('YOUTUBE_REFRESH_TOKEN'),
    ],

Add to .env:

    YOUTUBE_CLIENT_ID=your_google_oauth_client_id
    YOUTUBE_CLIENT_SECRET=your_google_oauth_client_secret
    YOUTUBE_REFRESH_TOKEN=your_refresh_token

HOW TO GET CREDENTIALS:
  1. Go to https://console.cloud.google.com
  2. Create project → Enable "YouTube Data API v3"
  3. Credentials → Create OAuth 2.0 Client ID → Desktop App
  4. Download JSON → note client_id and client_secret
  5. Run: php artisan youtube:authorize  (see YouTubeAuthCommand)
     OR use Google OAuth Playground: https://developers.google.com/oauthplayground
     - Scope: https://www.googleapis.com/auth/youtube
     - Get refresh_token → paste in .env
