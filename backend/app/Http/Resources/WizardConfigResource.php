<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * WizardConfigResource
 *
 * Wraps the ObsWizardService::configForXxx() array in the canonical
 * `{ "data": { ... } }` envelope used by every other Dawri API endpoint.
 *
 * Security note:
 *   This resource NEVER includes the RTMP stream key. The wizard fetches
 *   credentials via the existing rate-limited endpoint
 *   GET /broadcasts/{id}/credentials — that response has its own
 *   `Cache-Control: no-store` headers.
 *
 * @package App\Http\Resources
 *
 * @property-read array<string,mixed> $resource
 */
class WizardConfigResource extends JsonResource
{
    /** @var string|null */
    public static $wrap = null;

    /**
     * @return array<string,mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var array<string,mixed> $r */
        $r = (array) $this->resource;

        return [
            'scope'                => (string)  ($r['scope']             ?? 'broadcast'),
            'broadcast_id'         =>           ($r['broadcast_id']      ?? null),
            'broadcast_status'     =>           ($r['broadcast_status']  ?? null),
            'broadcast_source'     =>           ($r['broadcast_source']  ?? null),
            'has_broadcast'        => (bool)    ($r['has_broadcast']     ?? false),
            'is_live'              => (bool)    ($r['is_live']           ?? false),
            'is_terminal'          => (bool)    ($r['is_terminal']       ?? false),
            'tournament_id'        =>           ($r['tournament_id']     ?? null),
            'tournament_name'      => (string)  ($r['tournament_name']   ?? ''),
            'watch_url'            =>           ($r['watch_url']         ?? null),
            'embed_url'            =>           ($r['embed_url']         ?? null),
            'credentials_url'      =>           ($r['credentials_url']   ?? null),
            'go_live_url'          =>           ($r['go_live_url']       ?? null),
            'create_broadcast_url' =>           ($r['create_broadcast_url'] ?? null),
            'download_links'       => (array)   ($r['download_links']    ?? []),
            'encoder_profiles'     => (array)   ($r['encoder_profiles']  ?? []),
            'default_profile'      => (string)  ($r['default_profile']   ?? 'pc_high'),
            'troubleshooting'      => (array)   ($r['troubleshooting']   ?? []),
            'already_completed'    => (bool)    ($r['already_completed'] ?? false),
        ];
    }
}
