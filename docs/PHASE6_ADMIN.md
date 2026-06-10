# Phase 6 — Admin & Safety (rules + audit log + keyword auto-moderation)

Three sub-features, deliverable together but independently debuggable.

## Part A — Community rules
- `rules` text column on communities. A 📜 Rules button (any member) opens a
  read-only modal; mods edit rules in the Admin panel. Edits are audited.

## Part B — Audit log
- `community_audit_log` table + `CommunityAuditEntry` model + `AuditService`.
- Hooked into `ModerationService`: mute/unmute/ban/unban now write entries.
- Also records: rules updates, blocked-word add/remove, and flagged messages.
- Viewable in the Admin panel → Audit log tab (mods+).

## Part C — Keyword auto-moderation
- `community_blocked_words` table + `CommunityBlockedWord` model +
  `WordFilterService` (cached 30s; case-insensitive; word-boundary match for
  Latin terms, substring for phrases / Arabic).
- Hooked into `MessageService::post`:
  - `block` mode → message rejected (422; the composer shows a red banner).
  - `flag` mode → message allowed but logged to the audit log.
- Managed in the Admin panel → Blocked words tab (mods+); cache busts on change.

## Backend files
- Migration `2026_06_10_000004_create_admin_safety_tables.php` (rules column +
  2 tables).
- Models: `CommunityAuditEntry`, `CommunityBlockedWord`.
- Services: `AuditService`, `WordFilterService`.
- Modified (surgical): `MessageService` (word-filter + flag-audit hook),
  `ModerationService` (audit hooks on mute/unmute/ban/unban).
- `CommunityAdminController` + `AuditEntryResource`, `BlockedWordResource`.
- `Community` model (`rules` fillable) + `CommunityResource` (`rules` exposed).
- Routes in `routes/api.community.php`:
  - `GET|PUT /communities/{c}/rules`
  - `GET|POST /communities/{c}/blocked-words`, `DELETE …/blocked-words/{word}`
  - `GET /communities/{c}/audit-log`

## Frontend files
- `models/community.model.ts` — `BlockedWord`, `AuditEntry`, `WordMode`,
  `rules?` on Community.
- `services/community.service.ts` — 6 admin methods.
- `services/community-state.service.ts` — `postError` signal + post() error
  handling (carries all prior phases + presence).
- `components/admin-panel/...` — 🛡️ Admin panel (Rules / Blocked words / Audit tabs), mods+.
- `components/rules-modal/...` — 📜 read-only rules for members.
- `components/message-composer/...` — red banner when a message is blocked.
- `pages/channel-view/...` — 📜 Rules (all) + 🛡️ Admin (mods) buttons.

## Apply (depends on Phases 1–5; built on the latest stacked files)
1. Overwrite the files. Shared ones carry everything forward:
   - `community.model.ts`, `community.service.ts`, `community-state.service.ts`,
     `channel-view.component.ts`, `message-composer.component.ts`,
     `MessageService.php`, `ModerationService.php`, `Community.php`,
     `CommunityResource.php`, `routes/api.community.php`.
2. **Run the migration:** `php artisan migrate`
3. `php artisan optimize:clear`, restart `php artisan serve` + reverb + queue.
4. Frontend recompiles; hard-refresh.

## Test
- **Rules:** 🛡️ Admin → Rules → type rules → Save. Then 📜 Rules (as any member)
  shows them.
- **Blocked words:** Admin → Blocked words → add "spam" (block) → in a channel,
  send a message containing "spam" → it's rejected with a red banner. Add a
  "flag" word → sending it succeeds but appears in the Audit log as "message
  flagged".
- **Audit log:** mute/ban a member (member-list menu) → Admin → Audit log shows
  the action, who did it, and to whom.

## Notes
- Verified by structural inspection, not compiled. First `php artisan migrate`
  + `ng serve` are the real test — paste any error.
- Word matching is intentionally simple. It won't catch deliberate evasion
  (l33t-speak, spacing like "s p a m"). That's a known limitation; a stronger
  normalizer could be a later enhancement.
- The blocked-message banner persists until dismissed or the user sends again;
  the typed text is cleared optimistically, so a blocked user must retype. If
  you'd rather preserve their text on block, that's a small composer tweak.
