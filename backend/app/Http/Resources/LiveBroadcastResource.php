<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\LiveBroadcast;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * LiveBroadcastResource — public-facing representation of a broadcast.
 *
 * IMPORTANT: This resource NEVER returns the RTMP stream key or the raw
 * encrypted column. Reveal-credentials uses a separate, rate-limited
 * endpoint that returns the key once with explicit security headers.
 *
 * @mixin LiveBroadcast
 */
final class LiveBroadcastResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isCreator = $request->user()?->id === $this->created_by;

        return [
            'id'                 => $this->id,
            'tournament_id'      => $this->tournament_id,
            'match_id'           => $this->match_id,
            'title'              => $this->title,
            'description'        => $this->description,
            'privacy'            => $this->privacy,
            'status'             => $this->status,
            'source'             => $this->source,
            'trigger'            => $this->trigger,

            // Public links — safe for all viewers.
            'watch_url'          => $this->watch_url,
            'embed_url'          => $this->embed_url,

            // Ingest URL is fine on its own; the stream KEY is the secret.
            // We surface the URL to the creator so the UI can hint at it,
            // but only the dedicated credentials endpoint returns the key.
            'rtmp_url'           => $isCreator ? $this->rtmp_url : null,

            'scheduled_start_at' => optional($this->scheduled_start_at)?->toIso8601String(),
            'actual_start_at'    => optional($this->actual_start_at)?->toIso8601String(),
            'actual_end_at'      => optional($this->actual_end_at)?->toIso8601String(),

            'created_at'         => optional($this->created_at)?->toIso8601String(),

            // Booleans for the frontend to drive UI without re-parsing status.
            'is_live'            => $this->isLive(),
            'is_terminal'        => $this->isTerminal(),
        ];
    }
}
