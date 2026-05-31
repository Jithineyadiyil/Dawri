# API Reference — Browser Broadcast

All endpoints prefixed with `/api/v1`. Auth via Sanctum Bearer token in
`Authorization: Bearer {token}` (the `dawri_token` from `localStorage`).

## `POST /broadcasts/{broadcast}/browser-session`

Open a browser-broadcast session.

### Auth
Required. Caller must be admin or the tournament organizer.

### Path parameters
| Name | Type | Description |
|---|---|---|
| `broadcast` | UUID | LiveBroadcast row ID |

### Request body (all optional)
```json
{
  "capture_mode": "webcam",
  "preferred_resolution": "720p"
}
```

| Field | Type | Values | Notes |
|---|---|---|---|
| `capture_mode` | string | `webcam` \| `screen` \| `screen_with_cam` | Hint only — frontend chooses what it sends. |
| `preferred_resolution` | string | `720p` \| `1080p` | Hint only. Mux negotiates the actual resolution from the WebRTC offer. |

### Response — 201 Created
```json
{
  "data": {
    "broadcast_id": "01234567-89ab-cdef-0123-456789abcdef",
    "whip_url":     "https://global-live.mux.com/api/v1/whip/sk-abc-123",
    "whip_token":   null,
    "playback_url": "https://stream.mux.com/pb-xyz.m3u8",
    "watch_url":    "https://www.youtube.com/watch?v=Yt-vid-123",
    "expires_at":   "2026-05-20T14:05:00+00:00",
    "provider":     "mux",
    "capabilities": {
      "webcam": true,
      "screen": true,
      "screen_with_cam": true,
      "max_resolution": "1080p",
      "max_framerate": 30,
      "recommended_bitrate_kbps": 4500
    }
  }
}
```

### Error responses

| Status | Cause |
|---|---|
| `401` | No / invalid Sanctum token |
| `403` | Caller is not admin and not the tournament organizer |
| `404` | Broadcast UUID not found |
| `409` | YouTube broadcast cannot be provisioned for this LiveBroadcast |
| `422` | Validation failure (e.g. `capture_mode=invalid`) |
| `429` | Mux quota exceeded |
| `502` | Mux rejected the request (bad token or upstream error) |
| `503` | Mux is unreachable |

---

## `DELETE /broadcasts/{broadcast}/browser-session`

Close the browser-broadcast session.

### Auth
Required. Caller must be admin or the tournament organizer.

### Response — 204 No Content

No body.

### Error responses

| Status | Cause |
|---|---|
| `401` / `403` / `404` | Same as POST |
| `502` / `503` | Mux cleanup failed but the local state was reset anyway |

---

## `POST /webhooks/mux`  (public, signed)

Mux webhook receiver. **Not for direct human consumption.**

### Auth
None — proven by `Mux-Signature` HMAC header.

### Request body
Whatever Mux sends. We care about `type` and `object.id`.

### Response
- `204 No Content` — handled (or harmlessly ignored as orphan)
- `401 Unauthorized` — `Mux-Signature` missing, malformed, or wrong
- `204` even for unknown event types (forward-compatibility)

### Handled events
| Event | Effect |
|---|---|
| `video.live_stream.active` | Set `live_broadcasts.status` = `live` |
| `video.live_stream.idle` | Set status = `ready` |
| `video.live_stream.disconnected` | Set status = `reconnecting` |
| `video.live_stream.recording.ready` | (No status change; future: trigger VOD ingest) |

---

## TypeScript types (frontend)

See `frontend/src/app/features/streaming/browser-broadcast/browser-broadcast.model.ts`.

## PHP types (backend)

- DTO: `App\Services\Streaming\DTOs\BrowserBroadcastSession`
- Resource: `App\Http\Resources\BrowserBroadcastSessionResource`
- Exceptions: `App\Services\Streaming\Exceptions\StreamingBridgeException`
