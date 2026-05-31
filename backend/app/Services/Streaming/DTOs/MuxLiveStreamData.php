<?php

declare(strict_types=1);

namespace App\Services\Streaming\DTOs;

/**
 * Typed projection of a Mux Live Stream API response.
 *
 * Mux returns deeply nested arrays; this DTO keeps the rest of the codebase
 * from coupling to that shape. If Mux changes its API, only
 * {@see self::fromMuxResponse()} needs to be touched.
 *
 * @see https://docs.mux.com/api-reference#tag/live-streams
 */
final class MuxLiveStreamData
{
    /**
     * @param string $id            Mux live stream UUID.
     * @param string $streamKey     RTMP/WHIP stream key (treat as a password).
     * @param string $playbackId    Public playback ID for HLS URL composition.
     * @param string $status        Mux lifecycle status (idle / active / disabled).
     * @param string $latencyMode   "low" | "reduced" | "standard".
     * @param bool   $isTest        True iff this stream is in Mux's free test mode.
     */
    public function __construct(
        public readonly string $id,
        public readonly string $streamKey,
        public readonly string $playbackId,
        public readonly string $status,
        public readonly string $latencyMode,
        public readonly bool $isTest,
    ) {}

    /**
     * Build from a raw Mux API response payload.
     *
     * @param array<string, mixed> $payload The `data` envelope from Mux.
     *
     * @return self
     */
    public static function fromMuxResponse(array $payload): self
    {
        /** @var array<int, array{id: string, policy: string}> $playbackIds */
        $playbackIds = $payload['playback_ids'] ?? [];
        $publicPlayback = collect($playbackIds)
            ->firstWhere('policy', 'public')['id'] ?? '';

        return new self(
            id:          (string) ($payload['id'] ?? ''),
            streamKey:   (string) ($payload['stream_key'] ?? ''),
            playbackId:  $publicPlayback,
            status:      (string) ($payload['status'] ?? 'idle'),
            latencyMode: (string) ($payload['latency_mode'] ?? 'standard'),
            isTest:      (bool)   ($payload['test'] ?? false),
        );
    }

    /**
     * Compose the public HLS playback URL.
     *
     * @return string e.g. https://stream.mux.com/{playback_id}.m3u8
     */
    public function hlsPlaybackUrl(): string
    {
        return sprintf('https://stream.mux.com/%s.m3u8', $this->playbackId);
    }
}
