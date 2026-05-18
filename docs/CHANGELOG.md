# Changelog

All notable changes to the Live Broadcast module.

---

## [1.0.0] — 2026-05-17

### Added (Sprint 5)

- `live_broadcasts` table with UUID PK, encrypted `stream_key_enc`,
  enum-driven state machine, soft deletes
- `LiveBroadcast` Eloquent model with status/source/trigger constants
- `YouTubeStreamingService` — low-level YouTube Data API v3 client
  - OAuth token refresh + caching (~55min TTL with safety window)
  - `createBroadcast()`, `createStream()`, `bindStreamToBroadcast()`
  - `transition()`, `fetchBroadcast()`, `deleteBroadcast()`
  - Typed error codes via `StreamingException`
- `LiveBroadcastService` — orchestration layer
  - `createForMatch()`, `createForTournament()` (both idempotent)
  - `goLive()`, `complete()`, `cancel()`
  - DB-transactional persistence with YouTube-side rollback on failure
  - Auto-populates `tournament_matches.stream_url` for embed coexistence
- `LiveBroadcastRepository` (Eloquent) + interface
- `LiveBroadcastController` with 7 REST endpoints
- `LiveBroadcastResource` — public-safe serialisation (no stream key)
- `CreateBroadcastRequest` FormRequest with full validation rules
- `AutoCreateBroadcastJob` queued job with exponential backoff
  - Retries transient errors (network, 5xx)
  - Fails fast on auth/quota/policy errors
- Rate-limited (`throttle:5,1`) `/credentials` endpoint with
  `Cache-Control: no-store` response headers
- Angular `LiveBroadcastService` + `BroadcastControlsComponent`
- PHPUnit unit + feature tests with `Http::fake()`
- Full documentation: README, API reference, architecture diagrams

### Configuration

- New `services.youtube.*` config block
- Eight new env vars (`YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`,
  `YOUTUBE_REFRESH_TOKEN`, `YOUTUBE_CHANNEL_ID`, `YOUTUBE_API_BASE_URL`,
  `YOUTUBE_OAUTH_TOKEN_URL`, `YOUTUBE_DEFAULT_PRIVACY`, `YOUTUBE_ENABLED`)

### Coexistence with Option A

- The existing Option A (organizer pastes a Twitch/YouTube URL into
  `tournament_matches.stream_url`) is **unchanged**.
- When Option B (this module) creates a broadcast, the resulting watch
  URL is written to `tournament_matches.stream_url` automatically, so the
  existing `<app-stream-embed>` component renders it without any changes
  to the match view code.
