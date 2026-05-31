# Changelog — Dawri Streaming Module

## [Sprint 6] – 2026-05-20 — Browser Broadcast

### Added
- `POST /api/v1/broadcasts/{broadcast}/browser-session` — open a one-click browser broadcast
- `DELETE /api/v1/broadcasts/{broadcast}/browser-session` — clean up the session
- `POST /api/v1/webhooks/mux` — receives Mux events to keep `live_broadcasts.status` synced
- Pluggable bridge architecture (`StreamingBridgeInterface`) — Mux today, ffmpeg/Cloudflare later without app-code changes
- `MuxClient` — typed wrapper for the Mux Video API
- `MuxBridge` — Mux Live implementation of the bridge
- `BrowserBroadcastService` — orchestration with admin/organizer authorization
- Angular `BrowserBroadcastComponent` (standalone, OnPush, signals) with three capture modes: webcam, screen, screen + cam PIP
- `WhipClient` — minimal IETF WHIP publisher for WebRTC ingest
- `MediaCaptureService` — getUserMedia/getDisplayMedia + canvas-based PIP composition
- `SourcePickerComponent` — bilingual-aware (LTR + RTL) capture-mode picker
- Database migration: `bridge_provider`, `mux_stream_id`, `mux_playback_id`, `mux_simulcast_target_id`, `whip_url` on `live_broadcasts`
- 18 PHPUnit cases (`MuxClient`, `MuxBridge`, `BrowserBroadcastService`, `BrowserBroadcastApi`)
- 11 Jest cases (`WhipClient`, `BrowserBroadcastComponent`)

### Changed
- `live_broadcasts` table extended with 5 new columns (all nullable, additive)
- `LiveBroadcastRepository` gains `findByMuxStreamId()` for webhook lookups
- `LiveBroadcast` model `$fillable` extended

### Configuration
- New `.env` variables: `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, `MUX_WEBHOOK_SECRET`, `MUX_TEST_MODE`, `MUX_WHIP_BASE_URL`, `MUX_HTTP_TIMEOUT`, `MUX_SESSION_TTL`, `YOUTUBE_RTMP_URL`
- New service-provider registration: `App\Providers\StreamingBridgeServiceProvider`

### Compatibility
- Sprint 5 OBS broadcast path is **completely unchanged** — both modes coexist
- New mode toggle in `broadcast-controls.component` lets users pick OBS or Browser per broadcast

### Security
- All endpoints behind `auth:sanctum` except the webhook (HMAC-SHA256 signed)
- Service-layer authorization rejects players (brand safety on Dawri's official YouTube channel)
- Webhook secret missing ⇒ all webhooks rejected (deny-by-default)
- Single-broadcast Mux stream keys; rotated each session

### Known limitations
- Browser capture quality is bandwidth-bound — for high-fidelity game capture, OBS is still the recommended path
- Mux test mode (free, default) has a 10-minute per-stream cap; plenty for development but not for full matches
- Webhook URL must be publicly reachable — local development requires ngrok or similar
- Production cost is non-zero (~$3/match for 2-hour matches via Mux); `FfmpegBridge` is the recommended migration path post-MVP
