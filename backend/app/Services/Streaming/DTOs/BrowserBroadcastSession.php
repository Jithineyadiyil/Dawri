<?php

declare(strict_types=1);

namespace App\Services\Streaming\DTOs;

use DateTimeImmutable;

/**
 * Immutable streamer-facing session record.
 *
 * This DTO is what the frontend receives after calling
 * `POST /api/v1/broadcasts/{id}/browser-session`. It contains
 * everything the browser needs to begin pushing media via WHIP
 * and nothing the streamer should not see (no Mux API keys,
 * no YouTube stream key, no internal IDs beyond the broadcast UUID).
 */
final class BrowserBroadcastSession
{
    /**
     * @param string            $broadcastId UUID of the originating LiveBroadcast.
     * @param string            $whipUrl     Full WHIP ingest URL (HTTPS).
     * @param string|null       $whipToken   Bearer token for WHIP auth (null if URL-embedded).
     * @param string            $playbackUrl HLS playback URL for in-Dawri preview / fallback.
     * @param string            $watchUrl    Public YouTube watch URL.
     * @param DateTimeImmutable $expiresAt   When the session token expires.
     * @param string            $provider    Bridge provider name ("mux", "ffmpeg", ...).
     */
    public function __construct(
        public readonly string $broadcastId,
        public readonly string $whipUrl,
        public readonly ?string $whipToken,
        public readonly string $playbackUrl,
        public readonly string $watchUrl,
        public readonly DateTimeImmutable $expiresAt,
        public readonly string $provider,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'broadcast_id' => $this->broadcastId,
            'whip_url'     => $this->whipUrl,
            'whip_token'   => $this->whipToken,
            'playback_url' => $this->playbackUrl,
            'watch_url'    => $this->watchUrl,
            'expires_at'   => $this->expiresAt->format(DATE_ATOM),
            'provider'     => $this->provider,
        ];
    }
}
