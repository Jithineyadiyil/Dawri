/**
 * Live Broadcast — TypeScript interfaces mirroring the Laravel API.
 *
 * Backed by:
 *   - app/Models/LiveBroadcast.php
 *   - app/Http/Resources/LiveBroadcastResource.php
 *
 * Note: stream_key is INTENTIONALLY absent from `LiveBroadcast` — it only
 * appears in the response of `getCredentials()`, where it's a transient
 * value the UI shows once and then forgets.
 */

export type BroadcastStatus = 'created' | 'ready' | 'live' | 'complete' | 'failed';
export type BroadcastPrivacy = 'public' | 'unlisted' | 'private';
export type BroadcastSource = 'obs' | 'browser' | 'rtmp';
export type BroadcastTrigger = 'manual' | 'auto';

export interface LiveBroadcast {
  id: string;
  tournament_id: string | null;
  match_id: string | null;
  title: string;
  description: string | null;
  privacy: BroadcastPrivacy;
  status: BroadcastStatus;
  source: BroadcastSource;
  trigger: BroadcastTrigger;

  watch_url: string | null;
  embed_url: string | null;
  rtmp_url: string | null;          // visible only to the creator

  scheduled_start_at: string | null;
  actual_start_at: string | null;
  actual_end_at: string | null;
  created_at: string | null;

  is_live: boolean;
  is_terminal: boolean;
}

export interface CreateBroadcastPayload {
  title: string;
  description?: string;
  privacy?: BroadcastPrivacy;
  source?: BroadcastSource;
  scheduled_start_at?: string;
}

/**
 * Credential response from GET /broadcasts/{id}/credentials.
 * The UI must treat `stream_key` as one-time-display (clipboard copy + hide).
 */
export interface BroadcastCredentials {
  rtmp_url: string;
  stream_key: string;
  instructions: {
    obs: string;
    go_live: string;
  };
}

/**
 * Server error envelope from the streaming endpoints.
 * Codes mirror StreamingException constants.
 */
export interface StreamingError {
  code:
    | 'auth_failed'
    | 'quota_exceeded'
    | 'channel_not_streamable'
    | 'broadcast_not_found'
    | 'invalid_transition'
    | 'stream_bind_failed'
    | 'feature_disabled'
    | 'broadcast_terminal'
    | 'upstream_error';
  message: string;
}
