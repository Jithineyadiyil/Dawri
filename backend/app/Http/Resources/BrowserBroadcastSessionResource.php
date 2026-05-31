<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * API Resource for {@see BrowserBroadcastSession}.
 *
 * Wraps the immutable session DTO into Laravel's standard `data` envelope
 * so the response shape stays consistent with the rest of the Dawri API.
 *
 * @property-read BrowserBroadcastSession $resource
 */
final class BrowserBroadcastSessionResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        /** @var BrowserBroadcastSession $session */
        $session = $this->resource;

        return [
            'broadcast_id' => $session->broadcastId,
            'whip_url'     => $session->whipUrl,
            'whip_token'   => $session->whipToken,
            'playback_url' => $session->playbackUrl,
            'watch_url'    => $session->watchUrl,
            'expires_at'   => $session->expiresAt->format(DATE_ATOM),
            'provider'     => $session->provider,
            'capabilities' => [
                'webcam'             => true,
                'screen'             => true,
                'screen_with_cam'    => true,
                'max_resolution'     => '1080p',
                'max_framerate'      => 30,
                'recommended_bitrate_kbps' => 4500,
            ],
        ];
    }
}
