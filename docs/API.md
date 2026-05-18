# Live Broadcast API Reference

Base URL: `http://localhost:8001/api/v1`
Auth: `Bearer <dawri_token>` (Sanctum) on all endpoints

---

## POST /matches/{match}/broadcast

Create a new broadcast for a tournament match. Idempotent: if an active
broadcast exists for the match, returns it.

**Auth**: tournament organizer, moderator, or admin
**Path**: `match` — UUID of `tournament_matches.id`

### Request

```json
{
  "title": "EA FC 25 — Quarterfinal 3",
  "description": "Player A vs Player B",
  "privacy": "public",
  "source": "obs",
  "scheduled_start_at": "2026-05-17T16:00:00Z"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string(3-100) | yes | YouTube hard-limits to 100 chars |
| `description` | string(0-5000) | no | YouTube limit |
| `privacy` | enum | no | `public` (default) / `unlisted` / `private` |
| `source` | enum | no | `obs` (default) / `browser` / `rtmp` |
| `scheduled_start_at` | ISO 8601 | no | Defaults to `now + 5min` |

### Response (201 Created)

```json
{
  "data": {
    "id": "9b1c...",
    "tournament_id": "...",
    "match_id": "...",
    "title": "EA FC 25 — Quarterfinal 3",
    "privacy": "public",
    "status": "ready",
    "source": "obs",
    "trigger": "manual",
    "watch_url":  "https://www.youtube.com/watch?v=BCAST_xyz",
    "embed_url":  "https://www.youtube.com/embed/BCAST_xyz?autoplay=1",
    "rtmp_url":   "rtmp://a.rtmp.youtube.com/live2",
    "scheduled_start_at": "2026-05-17T16:00:00+00:00",
    "actual_start_at":    null,
    "actual_end_at":      null,
    "created_at":         "2026-05-17T15:45:12+00:00",
    "is_live":            false,
    "is_terminal":        false
  }
}
```

### Error codes

| HTTP | Body code | When |
|---|---|---|
| 401 | — | Not authenticated |
| 403 | — | Not the organizer/moderator/admin |
| 404 | — | Match not found |
| 422 | (validation) | Invalid title/privacy/etc. |
| 422 | `channel_not_streamable` | Channel live-streaming not enabled (24h wait) |
| 429 | `quota_exceeded` | YouTube daily quota exhausted |
| 502 | `upstream_error` | Other YouTube API failure |
| 503 | `auth_failed` | OAuth refresh failed (rotate creds) |
| 503 | `feature_disabled` | `YOUTUBE_ENABLED=false` |

---

## POST /tournaments/{tournament}/broadcast

Same as above, but creates a tournament-level broadcast (not tied to a
specific match). Useful for opening ceremonies, finals, etc.

---

## GET /broadcasts/{broadcast}

Fetch a single broadcast.

**Auth**: any authenticated user
**Response**: same shape as the create response.
**Note**: `rtmp_url` is only populated for the creator.

---

## POST /broadcasts/{broadcast}/go-live

Transition the broadcast from `ready` to `live`. The organizer must
already be pushing video to the RTMP endpoint — YouTube returns 403 if
no signal is detected.

**Auth**: broadcast creator or admin

### Response (200)

```json
{
  "data": { "id": "...", "status": "live", "is_live": true, ... }
}
```

---

## POST /broadcasts/{broadcast}/complete

End the broadcast and finalise the archive video on the channel.

**Auth**: broadcast creator or admin
**Response**: broadcast object with `status: "complete"`

---

## DELETE /broadcasts/{broadcast}

Cancel a pre-live broadcast and delete the YouTube event. Once `live`, use
`/complete` instead — this endpoint returns 422.

**Auth**: broadcast creator or admin

### Response (200)

```json
{ "data": { "cancelled": true } }
```

---

## GET /broadcasts/{broadcast}/credentials

Reveal the RTMP URL + stream key so the organizer can configure OBS.

**Auth**: broadcast creator only
**Rate limit**: 5 requests/minute/user
**Headers returned**: `Cache-Control: no-store, no-cache, must-revalidate`

### Response (200)

```json
{
  "data": {
    "rtmp_url":   "rtmp://a.rtmp.youtube.com/live2",
    "stream_key": "aaaa-bbbb-cccc-dddd-eeee",
    "instructions": {
      "obs":     "OBS → Settings → Stream → ...",
      "go_live": "After you start streaming in OBS, click \"Go Live\"."
    }
  }
}
```

### Error codes

| HTTP | When |
|---|---|
| 403 | Not the creator |
| 410 | Broadcast already terminal |
| 429 | Rate limit exceeded |
