# Sprint 15 — Dawri Community

**One platform-wide "Dawri Community" + auto-provisioned per-tournament rooms.**
Text-only chat (voice deferred to Sprint 16), real-time via Laravel Reverb.

---

## What's in this bundle

```
sprint15-dawri-community/
├── backend/
│   ├── app/
│   │   ├── Events/                       5 broadcast events (Reverb)
│   │   ├── Http/Controllers/Api/         4 controllers
│   │   ├── Http/Requests/                5 FormRequests
│   │   ├── Http/Resources/               4 API resources
│   │   ├── Models/                       7 models
│   │   ├── Notifications/                1 mention notification
│   │   ├── Observers/                    TournamentObserver (auto-create rooms)
│   │   ├── Providers/                    CommunityServiceProvider
│   │   ├── Repositories/Contracts/       4 interfaces
│   │   ├── Repositories/Eloquent/        4 implementations
│   │   └── Services/                     6 services
│   ├── database/
│   │   ├── migrations/                   8 migrations (UUID PKs, FKs cascaded)
│   │   └── seeders/                      GlobalCommunitySeeder
│   ├── routes/
│   │   ├── api.community.php             append into routes/api.php
│   │   └── channels.community.php        append into routes/channels.php
│   ├── tests/Unit/                       2 service unit tests
│   ├── tests/Feature/                    2 API feature tests
│   └── .env.sprint15-additions           env vars to append
├── frontend/src/app/features/community/
│   ├── models/                           community.model.ts (TS types)
│   ├── services/                         3 services (HTTP, state, Reverb)
│   ├── pages/                            3 pages (shell, channel-view, admin)
│   ├── components/                       8 components
│   └── community.routes.ts               lazy route config
└── docs/                                 README, ARCHITECTURE, API, CHANGELOG, INTEGRATION
```

**Total: 77 files** (60 backend, 17 frontend, 5 docs).

---

## Quick start

1. **Read** [`INTEGRATION.md`](INTEGRATION.md) — step-by-step deployment into the existing Dawri repo.
2. **Architecture overview**: [`ARCHITECTURE.md`](ARCHITECTURE.md).
3. **API reference**: [`API.md`](API.md).

---

## Feature summary

| Capability | Status | Notes |
|---|---|---|
| Global "Dawri Community" server | ✅ | One per platform, everyone joins automatically |
| Per-tournament rooms | ✅ | Auto-created on `tournament.created`, archived on completion |
| Text channels (admin-creatable) | ✅ | `text` + `announcement` types |
| Real-time messaging via Reverb | ✅ | Presence channels per text channel |
| Emoji reactions | ✅ | Unicode only in v1 |
| @mentions + notifications | ✅ | Routed via Sprint 12 notifications module |
| Edit / soft-delete own messages | ✅ | 15-minute grace window for edits |
| Moderation: mute / ban / message-delete | ✅ | 6 mute durations (5 m → 1 wk) |
| Pinned messages | ✅ | Moderators only |
| Member list + presence | ✅ | Online / idle / offline; sweep job needed |
| Bilingual EN/AR (RTL) | ✅ | CSS uses logical properties throughout |
| Voice / video channels | ❌ | Sprint 16 |
| Threads | ❌ | Sprint 16 (`parent_id` reserved on `messages`) |
| Direct messages | ❌ | Separate sprint — different UX |

---

## Rate limits

| Action | Limit | Where |
|---|---|---|
| Post message | 30 / min / user | `routes/api.community.php` throttle middleware |
| React / unreact | 60 / min / user | same |
| Reactions per user per message | 10 hard cap | `ReactionService::MAX_REACTIONS_PER_USER_PER_MESSAGE` |
| Message length | 4000 chars | `Message::MAX_LENGTH` + `SendMessageRequest` |
| Self-edit grace window | 15 minutes | `Message::SELF_EDIT_WINDOW_MINUTES` |

---

## Test strategy

Run from `backend/`:

```bash
php artisan test --filter=MessageServiceTest      # 10 unit cases
php artisan test --filter=CommunityServiceTest    # 4 unit cases
php artisan test --filter=CommunityApiTest        # 5 feature cases
php artisan test --filter=MessageApiTest          # 8 feature cases
php artisan test --filter=Community               # all Sprint 15
```

Total: **27 test cases**.

Frontend smoke tests covered manually in v1; Jest specs to be added in 15b.

---

## Notable decisions

- **UUID PKs throughout** — matches existing Dawri convention (Sprint 6 onwards)
- **Soft-delete on `messages`** — moderator audit trail; hard-delete reserved for PDPL right-to-be-forgotten requests via tinker only
- **Denormalized `message_mentions` table** — efficient inbox queries + notification fan-out
- **Cursor pagination on message feed** — stable infinite scroll; no missed messages during pagination
- **Per-channel presence channels** — `community.channel.{id}` scopes the Reverb fan-out, so subscribing to 200 channels does not flood the client
- **Author edit grace window: 15 min** — Discord's pattern; balances correction with audit integrity
- **Per-user private channels for moderation events** — never broadcast mute/ban to the whole channel feed
