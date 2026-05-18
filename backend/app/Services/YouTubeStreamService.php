<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * YouTubeStreamService
 *
 * Manages YouTube Live Events for Dawri tournaments using the
 * YouTube Data API v3 with OAuth 2.0 (Service Account or OAuth token).
 *
 * SETUP REQUIRED (one-time):
 *   1. Go to console.cloud.google.com
 *   2. Create project "Dawri"
 *   3. Enable "YouTube Data API v3"
 *   4. Create OAuth 2.0 credentials → Desktop App
 *   5. Authorize with your Dawri YouTube channel account
 *   6. Store the refresh token in .env as YOUTUBE_REFRESH_TOKEN
 *   7. Store client_id + client_secret in .env
 *
 * ENV VARIABLES NEEDED:
 *   YOUTUBE_CLIENT_ID=
 *   YOUTUBE_CLIENT_SECRET=
 *   YOUTUBE_REFRESH_TOKEN=
 *
 * RTMP INGESTION URL (constant for YouTube):
 *   rtmp://a.rtmp.youtube.com/live2/{stream_key}
 *
 * STREAM KEY FORMAT:
 *   YouTube returns a key like: xxxx-xxxx-xxxx-xxxx-xxxx
 *   The organizer pastes this into PS5/OBS.
 */
class YouTubeStreamService
{
    private const TOKEN_URL  = 'https://oauth2.googleapis.com/token';
    private const API_BASE   = 'https://www.googleapis.com/youtube/v3';
    private const RTMP_URL   = 'rtmp://a.rtmp.youtube.com/live2';

    /** Get a fresh access token using the stored refresh token */
    private function accessToken(): string
    {
        $response = Http::post(self::TOKEN_URL, [
            'client_id'     => config('services.youtube.client_id'),
            'client_secret' => config('services.youtube.client_secret'),
            'refresh_token' => config('services.youtube.refresh_token'),
            'grant_type'    => 'refresh_token',
        ]);

        if ($response->failed()) {
            Log::error('YouTube token refresh failed', $response->json());
            throw new \RuntimeException('YouTube authentication failed. Check YOUTUBE_* env variables.');
        }

        return $response->json('access_token');
    }

    /**
     * Create a YouTube Live Broadcast + LiveStream for a tournament.
     *
     * Returns:
     *   broadcast_id  → YouTube broadcast/watch ID
     *   stream_key    → RTMP key for PS5/OBS
     *   watch_url     → youtube.com/watch?v=broadcast_id (embed this)
     *   rtmp_url      → rtmp://a.rtmp.youtube.com/live2 (constant)
     */
    public function createLiveEvent(
        string $tournamentName,
        string $scheduledAt,
        string $description = ''
    ): array {
        $token = $this->accessToken();

        // 1. Create the broadcast
        $broadcastResp = Http::withToken($token)->post(self::API_BASE . '/liveBroadcasts?part=id,snippet,status,contentDetails', [
            'snippet' => [
                'title'              => $tournamentName . ' — Dawri Esports',
                'description'        => $description ?: "Live tournament stream on Dawri platform. Watch and support your favourite players!",
                'scheduledStartTime' => date('c', strtotime($scheduledAt)),
            ],
            'status' => [
                'privacyStatus'           => 'public',
                'selfDeclaredMadeForKids' => false,
            ],
            'contentDetails' => [
                'enableAutoStart' => true,   // auto-starts when stream is detected
                'enableAutoStop'  => true,   // auto-ends when stream stops
                'enableDvr'       => true,   // allows rewinding
                'recordFromStart' => true,   // saves VOD automatically
            ],
        ]);

        if ($broadcastResp->failed()) {
            Log::error('YouTube broadcast creation failed', $broadcastResp->json());
            throw new \RuntimeException('Could not create YouTube broadcast: ' . ($broadcastResp->json('error.message') ?? 'Unknown error'));
        }

        $broadcastId = $broadcastResp->json('id');

        // 2. Create the live stream (ingestion point)
        $streamResp = Http::withToken($token)->post(self::API_BASE . '/liveStreams?part=id,snippet,cdn,status', [
            'snippet' => [
                'title' => $tournamentName . ' — Stream',
            ],
            'cdn' => [
                'frameRate'     => '60fps',
                'ingestionType' => 'rtmp',
                'resolution'    => '1080p',
            ],
        ]);

        if ($streamResp->failed()) {
            Log::error('YouTube liveStream creation failed', $streamResp->json());
            throw new \RuntimeException('Could not create YouTube stream ingestion point.');
        }

        $streamId  = $streamResp->json('id');
        $streamKey = $streamResp->json('cdn.ingestionInfo.streamName');

        // 3. Bind stream to broadcast
        Http::withToken($token)->post(self::API_BASE . "/liveBroadcasts/bind?id={$broadcastId}&part=id&streamId={$streamId}");

        return [
            'broadcast_id' => $broadcastId,
            'stream_id'    => $streamId,
            'stream_key'   => $streamKey,
            'watch_url'    => "https://www.youtube.com/watch?v={$broadcastId}",
            'rtmp_url'     => self::RTMP_URL,
            'embed_url'    => "https://www.youtube.com/embed/{$broadcastId}",
        ];
    }

    /** End a broadcast (transitions to "complete" status) */
    public function endBroadcast(string $broadcastId): void
    {
        try {
            $token = $this->accessToken();
            Http::withToken($token)->post(self::API_BASE . "/liveBroadcasts/transition?broadcastStatus=complete&id={$broadcastId}&part=status");
        } catch (\Throwable $e) {
            Log::warning("Could not end broadcast {$broadcastId}: " . $e->getMessage());
        }
    }

    /** Check broadcast status (created | ready | live | complete | revoked) */
    public function broadcastStatus(string $broadcastId): string
    {
        try {
            $token = $this->accessToken();
            $resp = Http::withToken($token)->get(self::API_BASE . '/liveBroadcasts', [
                'part' => 'status',
                'id'   => $broadcastId,
            ]);
            return $resp->json('items.0.status.lifeCycleStatus') ?? 'unknown';
        } catch (\Throwable $e) {
            return 'unknown';
        }
    }

    /** Return the constant RTMP ingestion base URL */
    public static function rtmpUrl(): string
    {
        return self::RTMP_URL;
    }
}
