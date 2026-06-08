# Sprint 15 — API Reference

Base URL: `http://localhost:8001/api/v1`
All endpoints require `Authorization: Bearer {sanctum_token}` unless marked **public**.

## Communities

| Method | URL | Body | Returns |
|---|---|---|---|
| GET | `/communities` | — | `{ data: Community[] }` — communities the user belongs to |
| GET | `/communities/{slug}` | — | `{ data: Community }` (404 if non-member) |
| GET | `/communities/{community}/members?search=` | — | `{ data: Member[], presence: {userId: {status, last_seen_at}} }` |
| POST | `/communities/{community}/leave` | — | `{ message }` (403 on global) |
| POST | `/communities/{community}/moderate` | `{ action, user_id, minutes?, reason? }` | `{ data: Member }` |

`action` ∈ `mute` (requires `minutes`), `unmute`, `ban` (requires `reason`), `unban`.
`minutes` ∈ `[5, 30, 60, 240, 1440, 10080]`.

## Channels

| Method | URL | Body | Returns |
|---|---|---|---|
| GET | `/communities/{community}/channels` | — | `{ data: Channel[] }` with `unread_count` |
| POST | `/communities/{community}/channels` | `{ name, topic?, type?, position? }` | `{ data: Channel }` (admin/owner) |
| PATCH | `/channels/{channel}` | partial Channel | `{ data: Channel }` |
| DELETE | `/channels/{channel}` | — | archives (soft) |
| POST | `/channels/{channel}/mark-read` | `{ last_message_id? }` | — |

`name` must match `/^[a-z0-9][a-z0-9\-]*[a-z0-9]$/` (lowercase, hyphens).
`type` ∈ `text`, `announcement`.

## Messages

| Method | URL | Body | Returns |
|---|---|---|---|
| GET | `/channels/{channel}/messages?cursor=&limit=50` | — | `{ data: Message[], next_cursor, prev_cursor }` |
| GET | `/channels/{channel}/messages/pinned` | — | `{ data: Message[] }` |
| POST | `/channels/{channel}/messages` | `{ content }` | `{ data: Message }` · **30/min** |
| PATCH | `/messages/{message}` | `{ content }` | `{ data: Message }` (author only, ≤15 min) |
| DELETE | `/messages/{message}` | — | `{ message }` (author or moderator) |
| POST | `/messages/{message}/pin` | — | `{ data: Message }` (moderator) |
| DELETE | `/messages/{message}/pin` | — | `{ data: Message }` |
| POST | `/messages/{message}/reactions` | `{ emoji }` | `{ message }` · **60/min** |
| DELETE | `/messages/{message}/reactions/{emoji}` | — | `{ message }` |

`content` is 1–4000 chars. Empty / whitespace-only is rejected.

## Resources

### Community
```json
{
  "id": "uuid",
  "type": "global|tournament",
  "tournament_id": "uuid|null",
  "name": "string",
  "slug": "string",
  "description": "string|null",
  "icon_url": "string|null",
  "is_active": true,
  "is_archived": false,
  "archived_at": "iso8601|null",
  "channels": [Channel],
  "member_count": 1234,
  "created_at": "iso8601"
}
```

### Channel
```json
{
  "id": "uuid",
  "community_id": "uuid",
  "name": "general",
  "topic": "Welcome to Dawri",
  "type": "text|announcement",
  "position": 0,
  "is_archived": false,
  "unread_count": 12
}
```

### Message
```json
{
  "id": "uuid",
  "channel_id": "uuid",
  "author": {
    "id": "uuid|null",
    "nickname": "shadow_fox",
    "avatar": "url|null",
    "is_self": true
  },
  "content": "string|null",
  "edited_at": "iso8601|null",
  "is_deleted": false,
  "is_pinned": false,
  "pinned_at": "iso8601|null",
  "reactions": [{ "emoji": "🔥", "count": 3, "users": ["uuid", "uuid", "uuid"] }],
  "mentions": ["uuid"],
  "created_at": "iso8601"
}
```

## Broadcasting

Connect via Laravel Echo with the Reverb driver. Subscribe presence channels:

```ts
echo.join(`community.channel.${channelId}`)
  .listen('.message.posted',  (e) => /* { message: Message } */)
  .listen('.message.edited',  (e) => /* { message: Message } */)
  .listen('.message.deleted', (e) => /* { channel_id, message_id, deleted_by_moderator } */)
  .listen('.reaction.added',  (e) => /* { channel_id, message_id, user_id, emoji } */)
  .listen('.reaction.removed',(e) => /* same shape */);
```

User-private channels for moderation:
```ts
echo.private(`user.${userId}`)
  .listen('.moderation.muted',  (e) => /* { community_id, muted_until, reason } */)
  .listen('.moderation.banned', (e) => /* { community_id, reason } */);
```

## Errors

Standard JSON envelope:
```json
{ "message": "human readable", "errors": { "field": ["..."] } }
```

| Status | When |
|---|---|
| 401 | No / invalid Sanctum token |
| 403 | Member not in community · muted · banned · announcement-only channel |
| 404 | Community not visible to caller (we intentionally hide tournament rooms from non-members) |
| 422 | FormRequest validation failure |
| 429 | Rate limit (30/min post, 60/min react) |
