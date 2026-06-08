# Sprint 15 Architecture

## Data flow — posting a message

```
Browser
  │
  │  POST /api/v1/channels/{id}/messages   { content }
  ▼
Routes (api.community.php)
  │  throttle: 30/min · auth:sanctum
  ▼
MessageController::store
  │  validates SendMessageRequest
  ▼
MessageService::post                              ← business logic lives here
  ├─ assertCanPost (member?, banned?, muted?, announcement?)
  ├─ sanitize content
  ├─ extract @mentions  (regex → User::query)
  ├─ DB::transaction
  │   ├─ MessageRepository::create
  │   └─ MessageMention::insert (bulk)
  └─ DB::afterCommit
      ├─ broadcast(MessagePosted) → Reverb presence channel
      └─ Notification::send(UserMentionedNotification) → DB channel
                                                    (Sprint 12 inbox)
```

Key principles:

- **Service is the only writer.** Controllers do auth + delegation only.
- **Repository handles data access.** Pure query logic. Easily mocked in tests.
- **`DB::afterCommit` for side-effects.** A rollback can never leak a notification or broadcast.
- **`->toOthers()` on broadcasts.** The poster's own client already shows the optimistic update; Reverb skips them.

---

## Database schema

```
communities                        channels
  id (uuid PK)                       id (uuid PK)
  type (global|tournament)           community_id (FK → communities)
  tournament_id (FK nullable)        name, topic, type, position
  name, slug (unique), description   is_archived
  is_active, archived_at
                                   messages
community_members                    id (uuid PK)
  community_id ─┐                    channel_id (FK → channels)
  user_id      ─┘ composite PK       user_id (FK → users)
  role (owner|admin|mod|member)      parent_id (FK → messages, future threads)
  muted_until, banned_at             content, edited_at
                                     deleted_at, deleted_by (soft delete)
                                     is_pinned, pinned_at, pinned_by

message_reactions                  message_mentions
  id (uuid PK)                       id (uuid PK)
  message_id (FK)                    message_id (FK)
  user_id (FK)                       mentioned_user_id (FK)
  emoji
  UNIQUE(message_id, user_id, emoji) UNIQUE(message_id, mentioned_user_id)

channel_reads                      user_presence
  user_id ─┐                         user_id (PK)
  channel_id ─┘ composite PK         status (online|idle|offline)
  last_read_message_id               last_seen_at
  last_read_at
```

Key indexes:
- `messages_channel_feed_idx (channel_id, deleted_at, created_at)` — supports the main feed query
- `mentions_unique_idx (message_id, mentioned_user_id)` — supports inbox
- `community_members.user_id, banned_at` — supports "communities I belong to" listing

---

## Broadcasting channels

| Channel | Type | Purpose | Auth |
|---|---|---|---|
| `community.channel.{channelId}` | Presence | New / edited / deleted messages + reactions for this text channel | Member of channel's community + not banned |
| `user.{userId}` | Private | Mute / ban events targeting this user | `$user->id === $userId` |

Events fired:

| Event | Channel | Wire name |
|---|---|---|
| `MessagePosted` | `community.channel.{id}` | `message.posted` |
| `MessageEdited` | `community.channel.{id}` | `message.edited` |
| `MessageDeleted` | `community.channel.{id}` | `message.deleted` |
| `ReactionAdded` | `community.channel.{id}` | `reaction.added` |
| `ReactionRemoved` | `community.channel.{id}` | `reaction.removed` |
| `UserMutedInCommunity` | `user.{id}` | `moderation.muted` |
| `UserBannedFromCommunity` | `user.{id}` | `moderation.banned` |

---

## Authorization matrix

|                                | Member | Moderator | Admin | Owner |
|--------------------------------|:------:|:---------:|:-----:|:-----:|
| Post in text channel           | ✅     | ✅        | ✅    | ✅    |
| Post in announcement channel   | ❌     | ✅        | ✅    | ✅    |
| Edit own message (≤15 min)     | ✅     | ✅        | ✅    | ✅    |
| Delete own message             | ✅     | ✅        | ✅    | ✅    |
| Delete any message             | ❌     | ✅        | ✅    | ✅    |
| Pin / unpin message            | ❌     | ✅        | ✅    | ✅    |
| Mute member                    | ❌     | ✅        | ✅    | ✅    |
| Ban member                     | ❌     | ✅        | ✅    | ✅    |
| Mute / ban moderator           | ❌     | ❌        | ✅    | ✅    |
| Create / edit / archive channel| ❌     | ❌        | ✅    | ✅    |
| Be modded (target of action)   | ✅     | ❌ by mod | ❌ by mod | ❌ |

Owners are immune from moderation by anyone except the platform admin (system role).

---

## Tournament integration

`TournamentObserver` (registered in `CommunityServiceProvider::boot`):

```
Tournament::created    → CommunityService::ensureTournamentCommunity
                          ├─ creates community (type=tournament, tournament_id=t.id)
                          ├─ creates 3 default channels (#general, #matches, #rules)
                          └─ adds organizer as 'owner'

Tournament::updated    → if status === 'completed'
                          → CommunityService::archiveTournamentCommunity
                              ├─ archived_at = now()
                              └─ is_active = false
```

When a user registers for a tournament (existing `TournamentRegistrationService`), call:
```php
$communityService->joinTournamentCommunity($tournament, $user);
```
See INTEGRATION.md step 8 for the exact hook point.

---

## State management (frontend)

```
ReverbConnectionService               CommunityStateService (Angular signals)
  init() once after login              ├─ communities[]
  subscribeToChannel(id)               ├─ channelsByCommunity{}
  on event → state.onMessagePosted()   ├─ messagesByChannel{}
                                        ├─ membersByCommunity{}
                                        └─ presenceByUser{}
                                                │
                       ┌────────────────────────┴────────────────────────┐
                       ▼                                                 ▼
              CommunityShellComponent                      ChannelViewComponent
              (3-pane layout)                              (message panel)
                       │                                                 │
                       ▼                                                 ▼
              ServerSidebar · ChannelList                MessageList · MessageComposer · MemberList
```

All components are **standalone** with `OnPush` change detection. Mutations go through the state service which updates signals; the templates re-render automatically.
