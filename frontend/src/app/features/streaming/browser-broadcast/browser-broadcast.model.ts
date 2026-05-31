/**
 * @fileoverview TypeScript types for the browser-broadcast feature.
 *
 * These mirror the Laravel API Resource shapes returned by:
 *   POST   /api/v1/broadcasts/{id}/browser-session
 *   DELETE /api/v1/broadcasts/{id}/browser-session
 *
 * Keep these definitions in sync with
 *   backend/app/Http/Resources/BrowserBroadcastSessionResource.php
 */

/**
 * Streamer-facing browser-broadcast session.
 *
 * Returned by the backend after the streamer clicks "Go Live from Browser".
 * Contains everything the browser needs to publish via WHIP — but nothing
 * sensitive (no Mux secrets, no YouTube OAuth tokens).
 */
export interface BrowserBroadcastSession {
  readonly broadcast_id: string;

  /** Full WHIP ingest URL (HTTPS). */
  readonly whip_url: string;

  /**
   * Bearer token for WHIP authentication.
   * `null` when the provider embeds auth in the URL (Mux's pattern).
   */
  readonly whip_token: string | null;

  /** HLS playback URL for in-Dawri preview (low-latency). */
  readonly playback_url: string;

  /** Public YouTube watch URL. */
  readonly watch_url: string;

  /** ISO 8601 timestamp; sessions must be opened before this. */
  readonly expires_at: string;

  /** Bridge provider name ("mux", "ffmpeg", ...). For diagnostics. */
  readonly provider: string;

  readonly capabilities: BrowserBroadcastCapabilities;
}

export interface BrowserBroadcastCapabilities {
  readonly webcam: boolean;
  readonly screen: boolean;
  readonly screen_with_cam: boolean;
  readonly max_resolution: '720p' | '1080p';
  readonly max_framerate: number;
  readonly recommended_bitrate_kbps: number;
}

/** What the streamer wants to capture and send. */
export type CaptureMode = 'webcam' | 'screen' | 'screen_with_cam';

/** Internal state machine for the broadcast component. */
export type BroadcastState =
  | 'idle'           // No session, no media.
  | 'requesting'     // Asking backend for a session.
  | 'capturing'      // Got permission, showing preview.
  | 'publishing'     // WHIP handshake in flight.
  | 'live'           // Browser is streaming.
  | 'stopping'       // Tearing down.
  | 'error';         // Recoverable error; user can retry.

/** A user-facing error shown by the UI. */
export interface BroadcastError {
  readonly code: string;
  readonly message: string;
  readonly retryable: boolean;
}

/**
 * Request payload for opening a session.
 * All fields optional — backend has sensible defaults.
 */
export interface CreateSessionPayload {
  capture_mode?: CaptureMode;
  preferred_resolution?: '720p' | '1080p';
}
