# Architecture — Live Broadcast Module

## Component diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│ Angular frontend                                                     │
│                                                                       │
│  BroadcastControlsComponent ──► LiveBroadcastService (HTTP)          │
│  StreamEmbedComponent       ──► reads stream_url from match payload  │
└────────────────────────────────────────┬─────────────────────────────┘
                                          │ HTTPS  (Bearer dawri_token)
┌────────────────────────────────────────▼─────────────────────────────┐
│ Laravel API                                                          │
│                                                                       │
│  routes/api.php ─► LiveBroadcastController                           │
│                          │                                            │
│                          ▼                                            │
│                    LiveBroadcastService ──► LiveBroadcastRepository  │
│                          │                          │                 │
│                          │                          ▼                 │
│                          │                    live_broadcasts (DB)    │
│                          │                                            │
│                          ▼                                            │
│                    YouTubeStreamingService                            │
│                          │                                            │
│                          ▼                                            │
└──────────────────────────┼────────────────────────────────────────────┘
                            │ HTTPS (OAuth Bearer)
                            ▼
                  YouTube Data API v3
```

---

## Create-broadcast sequence

```
Organizer       Angular          Laravel              YouTube
  │  click "Start"  │                │                    │
  ├─────────────────►│                │                    │
  │                  │ POST /matches/{id}/broadcast        │
  │                  ├───────────────►│                    │
  │                  │                │ POST /liveBroadcasts
  │                  │                ├───────────────────►│
  │                  │                │◄── broadcast_id ───┤
  │                  │                │                    │
  │                  │                │ POST /liveStreams  │
  │                  │                ├───────────────────►│
  │                  │                │◄── stream_id, rtmp │
  │                  │                │                    │
  │                  │                │ POST /liveBroadcasts/bind
  │                  │                ├───────────────────►│
  │                  │                │◄── ok ─────────────┤
  │                  │                │                    │
  │                  │                │ DB tx:             │
  │                  │                │   INSERT live_broadcasts
  │                  │                │   UPDATE tournament_matches.stream_url
  │                  │                │                    │
  │                  │◄── LiveBroadcast (status=ready) ────┤
  │◄── shows RTMP creds + "Go live" ──┤                    │
  │                  │                │                    │
  │ paste into OBS, click Stream      │                    │
  │                  │                │                    │
  │ click "Go live"  │                │                    │
  ├─────────────────►│ POST /broadcasts/{id}/go-live       │
  │                  ├───────────────►│                    │
  │                  │                │ POST /transition?live
  │                  │                ├───────────────────►│
  │                  │                │◄── ok ─────────────┤
  │                  │◄── status=live ┤                    │
```

---

## Why these choices?

### Why two services (`YouTubeStreamingService` + `LiveBroadcastService`)?

- `YouTubeStreamingService` is a **pure API client** — no DB knowledge, no
  authorization, no domain rules. Single responsibility: speak HTTP to
  YouTube. Easy to unit-test with `Http::fake()`.
- `LiveBroadcastService` is the **orchestrator** — knows that creating a
  broadcast means "create + create-stream + bind + persist + update match",
  knows the rollback path if step 2 fails, knows how to set
  `tournament_matches.stream_url`.

Splitting them keeps each class small, testable, and replaceable. If
Dawri ever supports Twitch or DLive in addition, you swap the low-level
service without touching the orchestrator.

### Why a separate `live_broadcasts` table?

The existing `tournament_matches.stream_url` is **Option A**: organizer
pastes a Twitch/YouTube URL someone else owns. It needs nothing more
than a string.

**Option B** (this module): Dawri creates the broadcast on Dawri's own
channel. We need to remember the YouTube broadcast ID, the stream ID,
the encrypted stream key, the lifecycle status, and so on. That's
multiple columns + state machine — table.

The two coexist: when Option B succeeds, we write the watch URL into
`tournament_matches.stream_url` so the existing embed component works
without modification.

### Why encrypt the stream key at rest?

The stream key is **equivalent to a password** for the broadcast. Anyone
with the URL + key can hijack the stream. The `'encrypted'` cast uses
Laravel's app key (AES-256-CBC), so a database dump alone doesn't leak it.

### Why `'encrypted'` cast instead of a `vault`-style external KMS?

YAGNI. Laravel's app-key encryption is fine for a single-channel
broadcast secret. If/when Dawri runs on multiple channels per customer
(white-label), revisit with AWS KMS or HashiCorp Vault.

### Why a separate `/credentials` endpoint?

The `LiveBroadcastResource` is returned from list/show/create endpoints
and may be cached by browsers, proxies, or downstream code. Putting the
stream key in there means it ends up in browser history, logs, network
panels.

A dedicated endpoint with `Cache-Control: no-store` + 5/min rate limit +
creator-only access keeps the high-sensitivity payload narrowly scoped.

### Why `'enabled' => false` by default?

Defence in depth. If `.env` is misconfigured during a migration or new
developer setup, the service throws a clean `feature_disabled` error
instead of panicking with a `null` access token deep in HTTP.

### Why does `goLive()` not poll YouTube for stream health?

Reduces complexity. The organizer is in front of OBS — they can see if
the stream is connected. YouTube returns 403 on `transition?live` if no
signal is detected, and that error is bubbled back to the UI cleanly.

If we needed an "automatic go-live when signal detected", a separate
artisan command (`broadcast:auto-transition`) could poll
`/liveBroadcasts?part=status&id=X` and trigger the transition. That's
left as a future enhancement.

---

## Idempotency

`createForMatch()` and `createForTournament()` are idempotent:

- If a non-terminal broadcast exists for the match/tournament, it's
  returned instead of creating a new one.
- Re-running `AutoCreateBroadcastJob` is safe — same protection.

This handles the "user double-clicks the button" case and the "Laravel
queue retries the job" case without duplicate YouTube events.

---

## State machine

```
                  ┌──────────┐
   POST /matches/ │ created  │  (transient — never persisted in practice)
   {id}/broadcast └────┬─────┘
                       │
                       │ stream bound, row saved
                       ▼
                  ┌──────────┐
                  │  ready   │ ◄── organizer can reveal RTMP creds
                  └────┬─────┘
                       │ POST /broadcasts/{id}/go-live
                       ▼
                  ┌──────────┐
                  │   live   │ ◄── viewers can watch
                  └────┬─────┘
                       │ POST /broadcasts/{id}/complete
                       ▼
                  ┌──────────┐
                  │ complete │  (terminal)
                  └──────────┘

  any non-terminal ──DELETE──► ┌────────┐
                               │ failed │ (terminal, soft-deleted)
                               └────────┘
```

---

## Failure modes

| Failure | Where caught | User-visible result |
|---|---|---|
| Refresh token revoked | YouTubeStreamingService | 503 `auth_failed` |
| YouTube quota exhausted | YouTubeStreamingService | 429 `quota_exceeded` |
| Channel not streamable (24h) | YouTubeStreamingService | 422 `channel_not_streamable` |
| Stream create fails after broadcast create | LiveBroadcastService | broadcast deleted via cleanup, 502 returned |
| DB write fails after YouTube succeeds | LiveBroadcastService | DB transaction rolls back; YouTube broadcast orphaned (rare; cleanup job covers) |
| Network timeout to YouTube | Http client | 502 `upstream_error` |
| OAuth response missing access_token | YouTubeStreamingService | 503 `auth_failed` |

---

## Observability

- `Log::warning('YouTube API error', [...])` on every 4xx/5xx from YouTube
- `Log::error('AutoCreateBroadcastJob: streaming failure', [...])` on job failure
- `failure_count` column on `live_broadcasts` for at-a-glance health
- `last_error` column for human-readable last failure reason

Add a Grafana/Datadog metric on:
- count of `status=failed` rows in last 24h
- p95 latency of `YouTubeStreamingService::call`
- rate of 429 responses (quota approaching)
