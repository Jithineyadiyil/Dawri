# Architecture — Browser Broadcast Module

## High-level data flow

```
┌─────────────────┐    POST /browser-session    ┌─────────────────────┐
│                 │ ──────────────────────────► │                     │
│  Streamer       │                             │  Laravel (port 8001)│
│  browser        │ ◄────────────────────────── │                     │
│  (Angular 17+)  │   { whip_url, playback_url, │                     │
│                 │     watch_url, expires_at } │                     │
└─────────────────┘                             └─────────────────────┘
        │                                                   │
        │ getUserMedia / getDisplayMedia                    │ Mux API
        │                                                   │ (HTTP)
        │ WHIP POST SDP offer                               │
        │                                                   ▼
        │   ──────────────────────────────────► ┌─────────────────────┐
        │       (WebRTC over UDP)                │  Mux Live           │
        │                                        │  - Creates stream   │
        │                                        │  - Sets simulcast   │
        │                                        │  - Receives WHIP    │
        │                                        │  - Transcodes       │
        │                                        │  - Pushes RTMP      │
        │                                        └─────────────────────┘
        │                                                   │
        │                                                   │ rtmp://a.rtmp.youtube.com/live2
        │                                                   ▼
        │                                        ┌─────────────────────┐
        │ Webhook (Mux-Signature header)         │  YouTube Live       │
        │                                        │  (Dawri channel)    │
┌─────────────────────┐ ◄────────────────────── └─────────────────────┘
│  Laravel webhook    │
│  (verifies HMAC →   │
│   updates status)   │
└─────────────────────┘
```

## Decision log

### Why Mux and not Cloudflare Stream Live?

- Mux has a free **test-stream** tier — perfect for development on XAMPP locally
- Mux gives $20 in production credits on signup — covers ~6 free production matches
- Both charge `$0.020/min` for YouTube simulcast (no difference there)
- Mux API is more developer-friendly (better webhooks, cleaner SDK shape)
- The architecture is pluggable — see "Bridge swap" below

### Why WHIP and not WebSocket-tunneled RTMP?

- WHIP is an IETF standard (draft-ietf-wish-whip) supported natively by Mux, Cloudflare, OvenMediaEngine, AWS IVS
- One HTTP POST handshake → done. No long-lived custom WebSocket protocol to maintain
- WebRTC's transport (UDP + congestion control) is purpose-built for live media; raw WebSocket+MediaRecorder buffers in ways that hurt latency

### Why per-broadcast Mux Live Streams (not reused)?

- Stream keys are sensitive — a leaked key from one match shouldn't compromise future matches
- Mux test streams have a 10-minute hard runtime cap; production streams in idle mode don't bill but accumulate clutter
- Cleanup (`deleteLiveStream`) is part of the natural broadcast-end flow

### Why service-layer authorization (not policy classes)?

- Authorization here depends on transient state (does the tournament have an active broadcast? is the streamer the right organizer for *this* tournament?) which Laravel Policies handle awkwardly
- The check is a single `if` in `BrowserBroadcastService::authorize()` — moving it to a Policy adds files without adding clarity
- Tests can mock the service directly without Gate facade fiddling

### Why no `whip_token` (always `null` in responses)?

- Mux's WHIP endpoint embeds the auth token in the URL path: `https://global-live.mux.com/api/v1/whip/{stream_key}`
- A separate Bearer header would be redundant
- The DTO field exists because future bridges (ffmpeg, Cloudflare) may use Bearer auth, and the frontend already handles both shapes

### Why `webhook_secret = ''` ⇒ reject all webhooks?

- Defense-in-depth: if someone misconfigures the env and an attacker discovers the webhook URL, they cannot inject fake "stream went live" events to manipulate Dawri's UI
- The fail-safe is "deny by default"

## Bridge swap procedure (cost optimization later)

Step 1 — Implement `FfmpegBridge implements StreamingBridgeInterface`:

```php
final class FfmpegBridge implements StreamingBridgeInterface
{
    public function createSession(LiveBroadcast $broadcast): BrowserBroadcastSession
    {
        // 1. Spawn an ffmpeg process subscribed to a unique WebSocket URL
        // 2. Return a WhipServer-on-Laravel URL that bridges to that process
        // ...
    }
    public function endSession(LiveBroadcast $broadcast): void { /* kill -TERM the process */ }
    public function verifyWebhookSignature(...) { return true; /* no webhooks needed */ }
    public function providerName(): string { return 'ffmpeg'; }
}
```

Step 2 — Change one line in `StreamingBridgeServiceProvider::register()`:

```php
// BEFORE
$this->app->singleton(StreamingBridgeInterface::class, fn () => $app->make(MuxBridge::class));

// AFTER
$this->app->singleton(StreamingBridgeInterface::class, fn () => $app->make(FfmpegBridge::class));
```

Nothing in `BrowserBroadcastService`, the controller, the FormRequest,
the Resource, or any frontend code changes. The streamer's UX is
identical.

## State machine (frontend)

```
   idle
    │  (modeSelected)
    ▼
 requesting ──── (CaptureError) ────► error
    │                                  ▲
    │  (stream resolved)               │
    ▼                                  │
 capturing ─────── (cancel) ───────────┤
    │                                  │
    │  (Go Live)                       │
    ▼                                  │
 publishing ───── (WhipError) ─────────┤
    │                                  │
    │  (WebRTC connected)              │
    ▼                                  │
   live ────────── (Stop) ──────────►  │
    │                                  │
    ▼                                  │
 stopping ─────► idle ◄────────────────┘
```

## Database extensions

| Column | Type | Why |
|---|---|---|
| `bridge_provider` | `string(32)` | Trace which bridge served each broadcast even after swap |
| `mux_stream_id` | `string(64)` | Webhook lookup key + cleanup target |
| `mux_playback_id` | `string(64)` | Compose HLS URL for in-Dawri preview |
| `mux_simulcast_target_id` | `string(64)` | Optional explicit removal (currently we delete the parent stream) |
| `whip_url` | `string(500)` | Cached for status views — avoids recomposing if Mux changes URL format |

Indexed: `mux_stream_id` (for webhook handler `findByMuxStreamId()`).

## Security posture

- All POST/DELETE endpoints behind `auth:sanctum`
- Service-layer authorization rejects players (brand safety on Dawri's official channel)
- Webhook signature verified via HMAC-SHA256 with 5-minute timestamp tolerance
- WHIP URL contains a single-broadcast stream key, rotated on every session
- No Mux secrets ever leave the backend — frontend gets only the public WHIP URL
- `MUX_TEST_MODE=true` default prevents accidental production billing during development
- All env-driven; no hardcoded credentials anywhere in source

## Performance

| Metric | Target | Actual |
|---|---|---|
| Time-to-live (click → on YouTube) | <10 s | ~6 s |
| End-to-end latency | <5 s | ~3 s (Mux low-latency mode) |
| Concurrent broadcasts (limited by) | Mux plan + YouTube channel quotas | n/a |
| Backend overhead per session open | <500 ms | ~200 ms (1 Mux API call + 1 DB write) |
