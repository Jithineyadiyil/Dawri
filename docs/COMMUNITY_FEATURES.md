# Sprint 15+ — Community Feature Completion

Adds the six missing/incomplete community capabilities identified in the audit.
All changes integrate with the existing repository/service/signal architecture.

## What was added

### 1. Moderation (mute / unmute / ban / unban / kick / promote-demote)
Previously the backend supported mute/ban only, and **no** moderation UI existed.

**Backend (new):**
- `ModerationService::kick()` — removes a membership (detach); user may rejoin.
- `ModerationService::setRole()` — promote/demote between admin/moderator/member
  (owner role is immutable here). Owner/platform-admin only.
- `CommunityModerationController` — dispatches the new `kick` and `set_role` actions
  (kick returns a message, not a member, since the row is deleted).
- `ModerateUserRequest` — validates the new actions and a `role` field.

**Frontend (new UI):**
- `member-list.component.ts` — per-member action menu (⋯) with mute (duration
  submenu), unmute, ban (prompts for reason), unban, kick (confirm), and role
  changes. Actions are **gated by the viewer's permissions** mirroring the
  server rules, so no dead buttons appear.
- `community-state.service.ts` — `moderate()` posts the action and refreshes the
  member list.
- `community.service.ts` — `moderate()` payload type widened for the new actions.

> Note: the member-list shows only non-banned members (the API filters banned
> users out). "Unban" therefore appears only if a banned member is present in
> the list; a dedicated "banned users" view is a future enhancement.

### 2. @-mentions with autocomplete
The `mention-textarea` component already existed but was **orphaned** — the
composer used a plain `<textarea>`. Now the composer uses `app-mention-textarea`,
so typing `@` surfaces member autocomplete and Enter sends (Shift+Enter newlines).

### 3. Pin / unpin + pinned panel
Backend pin/unpin/pinned were ready but unused.
- `message-item.component.ts` — a Pin/Unpin action (author or moderator/admin).
- `community-state.service.ts` — `togglePin()` and `loadPinned()`.
- `channel-view.component.ts` — a collapsible pinned-messages panel in the header,
  loaded when a channel opens.

### 4. Add-reaction picker (per message)
Previously only existing reactions could be toggled. `message-item` now has a
quick emoji picker (😀﹢) to add a new reaction.

### 5. Mark-as-read (clear unread badges)
The unread badge rendered but never cleared. `channel-view` now calls
`markChannelRead()` when a channel opens; `community-state.service` posts to the
`markRead` endpoint and zeroes the badge locally.

### 6. Channel editing (rename / topic)
Admin could create/archive but not edit. `community-admin.component.ts` now has
inline Edit (name + topic) per channel via the existing `updateChannel` endpoint.

## Files

**Backend** (place under `backend/`):
- `app/Services/ModerationService.php` (overwrite)
- `app/Http/Controllers/Api/CommunityModerationController.php` (overwrite)
- `app/Http/Requests/ModerateUserRequest.php` (overwrite)

**Frontend** (place under `frontend/`):
- `src/app/features/community/services/community-state.service.ts` (overwrite)
- `src/app/features/community/services/community.service.ts` (overwrite)
- `src/app/features/community/components/member-list/member-list.component.ts` (overwrite)
- `src/app/features/community/components/message-item/message-item.component.ts` (overwrite)
- `src/app/features/community/components/message-composer/message-composer.component.ts` (overwrite)
- `src/app/features/community/pages/channel-view/channel-view.component.ts` (overwrite)
- `src/app/features/community/pages/community-admin/community-admin.component.ts` (overwrite)

The mention-textarea and reaction-picker components were already present and are
unchanged (now wired in).

## After applying
- Backend: `php artisan optimize:clear`
- Frontend: the dev server recompiles automatically; hard-refresh the browser.

## Test checklist
- As admin/owner: open the member list, use the ⋯ menu to mute (try a duration),
  ban (enter a reason), kick, and change a member's role. Confirm the list updates.
- Type `@` in the composer and confirm member autocomplete appears.
- Pin a message; confirm 📌 shows and the header pinned panel lists it; unpin.
- Click the 😀﹢ on a message and add a reaction; confirm the count updates.
- Open a channel with an unread badge; confirm the badge clears.
- In `/community/admin`, edit a channel's name/topic and save; confirm it persists.

---

# Visual Redesign — "Arena" look

All community screens were restyled into a distinct visual identity, separate
from the rest of the Dawri app (which uses Saudi-green + antique-gold), so the
community reads as its own *place* — closer to a gaming/esports arena.

## Design language
- **Surfaces:** deep near-black (`#07070d` → `#0d0d17` → `#16161f`) — darker than
  the main app, dimmer "arena floor" feel.
- **Signature accent:** electric lime `#00ffa3` — used for active channels, the
  server-rail spine, unread badges, online dots, focus rings, and the primary
  Send button. This is the one bold move; everything else stays disciplined.
- **Gold `#d4af37`** is reserved for the global Dawri Community bubble and
  owner/special states, tying the look back to the Dawri brand.
- **Type:** `Anton` (Dawri's display face) for headers/community names in
  uppercase; `JetBrains Mono` for channel names, timestamps, section labels and
  action buttons — giving it a "HUD / terminal" character; `Archivo` for body.
- **Signature element:** a thin lime spine down the server rail's outer edge,
  plus a lime selection pill and glow on the active server/channel.

## Restyled files (all in this bundle)
- `pages/community-shell` — arena frame + the lime spine
- `components/server-sidebar` — neon-ring bubbles, selection pill
- `components/channel-list` — mono channel names, active lime bar + glow
- `pages/channel-view` — Anton header, mono topic, restyled pinned panel
- `components/message-item` — squared avatars, lime reaction counts, hover bar
- `components/message-composer` + `components/mention-textarea` — arena input + lime focus
- `components/message-list` — arena surfaces
- `components/member-list` — mono role labels, lime online dots, restyled moderation menu
- `pages/community-admin` — Anton heading, arena surfaces

The redesign is **styling only** — no template or logic changed, so all the new
features (moderation, mentions, pinning, reactions, mark-read, channel editing)
work exactly the same, just in the new look.

> The accent is scoped per-component (Angular view encapsulation), so the lime
> tokens are defined inline in each component rather than in a shared file.

---

# Fix — Admin page was unreachable + added a link

The `/community/admin` page existed but two things prevented its use:

1. **Route shadowing:** `admin` was declared after the `:slug` wildcard, so
   Angular matched "admin" as a community slug and the admin page never loaded.
   Fixed in `community.routes.ts` — `admin` is now declared *before* `:slug`
   and nested inside the shell (so it renders with the sidebars).

2. **No link:** added a gear (⚙) link in the channel-list header, visible only
   to platform admins, that routes to `/community/admin`.

**File added:** `frontend/src/app/features/community/community.routes.ts`
**File updated:** `components/channel-list/channel-list.component.ts`

## Where things live (quick reference)
- **Add / edit / archive channels:** `/community/admin` (admins only — use the
  ⚙ in the channel-list header). Each community has a create-channel box plus
  inline edit and archive per channel.
- **Joining communities:** automatic — the global Dawri Community includes every
  user; tournament communities include the organizer (owner) and participants
  who register. There is no manual "join" button by design.
- **Tournament communities not showing:** they only appear for the organizer or
  registered participants. Tournaments created *before* the community feature
  existed have no community yet — backfill with:
  `App\Models\Tournament::cursor()->each(fn($t)=>app(App\Services\CommunityService::class)->ensureTournamentCommunity($t));`
