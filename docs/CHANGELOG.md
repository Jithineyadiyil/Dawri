# Sprint 15 Changelog

## [Sprint 15] — 2026-05-27 — Dawri Community (text only)

### Added
- 8 migrations: `communities`, `channels`, `community_members`, `messages`, `message_reactions`, `message_mentions`, `channel_reads`, `user_presence`
- 7 models with full PHPDoc + soft-delete on `Message`
- 4 repository interfaces + Eloquent implementations
- 6 services: `MessageService`, `CommunityService`, `ChannelService`, `ModerationService`, `ReactionService`, `PresenceService`
- 4 controllers: community / channel / message / moderation
- 5 broadcast events on Reverb presence channels
- `UserMentionedNotification` integrating with Sprint 12 notifications module
- `TournamentObserver` auto-provisioning per-tournament communities on `tournament.created`, archiving on `tournament.completed`
- `CommunityServiceProvider` binding repository contracts to Eloquent implementations
- `GlobalCommunitySeeder` provisioning the platform-wide community + back-filling existing users
- 27 test cases (10 + 4 unit, 5 + 8 feature)
- Full Angular 17 frontend feature module (16 files) with signals-based state, Reverb integration, Discord-style 3-pane UI
- Bilingual EN/AR support via CSS logical properties

### Changed
- `routes/api.php` — append `require __DIR__.'/api.community.php'` inside the `auth:sanctum` group
- `routes/channels.php` — append broadcasting authorization for `community.channel.{id}` + `user.{id}`
- `bootstrap/providers.php` — register `App\Providers\CommunityServiceProvider`
- `app/Models/User.php` — relationships added (see INTEGRATION step 4)
- `app/Models/Tournament.php` — `community()` relationship (see INTEGRATION step 5)
- `app/app.routes.ts` (Angular) — community feature route lazy-loaded under `/community`

### Configuration
- New `.env`: re-uses Sprint 6 Reverb config; no new secrets

### Security
- All endpoints under `auth:sanctum` except broadcasting auth callback (Reverb signs internally)
- Non-members get **404** on tournament communities (not 403) to avoid leaking existence
- Rate limits: 30/min post, 60/min react (per user)
- Soft-delete enforces moderator audit trail; hard-delete reserved for PDPL requests via tinker
- Owner immune from moderation (cannot be banned even by other admins of the community)
- @mention resolution scoped to community members only — no leak of users outside the room

### Compatibility
- Zero breaking changes to existing Sprint 1–14 code
- Uses existing Sanctum auth + notification system
- Compatible with the existing UUID-everywhere convention

### Known limitations
- Mention popover is basic (Sprint 16: arrow-key navigation, member icons in dropdown)
- Voice / video channels not in v1 (Sprint 16)
- Threads not in v1 (`parent_id` column reserved for future use)
- DMs not in v1 (separate sprint)
- Presence sweep is a scheduled job — without it, "online" users never decay (see INTEGRATION step 9)
- Frontend Jest specs deferred to 15b
