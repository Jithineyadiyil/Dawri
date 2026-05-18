<?php

declare(strict_types=1);

namespace App\Services\Streaming\DTOs;

/**
 * BroadcastDetails — immutable value object representing a YouTube Live
 * broadcast as returned by the Data API v3.
 *
 * Used to pass structured data between YouTubeStreamingService and
 * LiveBroadcastService without leaking raw HTTP response arrays.
 */
final class BroadcastDetails
{
    public function __construct(
        public readonly string $broadcastId,
        public readonly ?string $streamId,
        public readonly string $channelId,
        public readonly string $title,
        public readonly string $privacy,
        public readonly ?string $rtmpUrl,
        public readonly ?string $streamKey,
        public readonly string $watchUrl,
        public readonly string $embedUrl,
        public readonly ?string $scheduledStartIso,
    ) {}

    /**
     * Build a watch URL from a video ID.
     */
    public static function watchUrlFor(string $videoId): string
    {
        return 'https://www.youtube.com/watch?v=' . $videoId;
    }

    /**
     * Build an embed URL from a video ID. The frontend uses this directly
     * as the iframe src attribute.
     */
    public static function embedUrlFor(string $videoId): string
    {
        return 'https://www.youtube.com/embed/' . $videoId . '?autoplay=1';
    }
}
