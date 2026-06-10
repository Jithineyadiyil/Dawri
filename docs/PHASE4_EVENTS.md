# Phase 4 — Community Events + RSVP

Adds scheduled events to communities. Events are **community-wide** (not
channel-scoped), so they live in a slide-in **Events panel** opened from the
channel header (📅 Events), rather than inline in the feed.

## What it does
- Moderators+ (owner/admin/moderator, or platform admin) create events: title,
  optional description, optional location/link, a start time, and optional end.
- Any member RSVPs **Going / Maybe / Can't go**; re-tapping the same choice
  clears it. Counts show live on each option.
- Moderators+ can Cancel (marks it cancelled, keeps it visible) or Delete an event.
- A "Show past" toggle includes ended events; by default only upcoming/ongoing
  events show, soonest first.

## Backend
- **Migration** `2026_06_10_000002_create_community_events_tables.php` —
  `community_events` + `event_rsvps` (one RSVP per user per event).
- Models `CommunityEvent`, `EventRsvp`.
- Repository `EventRepositoryInterface` + `EventRepository` (events with
  creator + RSVP rows; upcoming-first ordering; optional past).
- Service `EventService` — create/update/cancel/delete (moderator+),
  rsvp (member, toggle-off on re-select).
- `EventResource` (per-status counts + the viewer's `my_status`),
  `StoreEventRequest`, `EventController`.
- Routes in `routes/api.community.php`:
  - `GET/POST /communities/{community}/events`
  - `PATCH/DELETE /events/{event}`, `POST /events/{event}/cancel`,
    `POST /events/{event}/rsvp`
- Binding `EventRepositoryInterface => EventRepository` in `CommunityServiceProvider`.

## Frontend
- `models/community.model.ts` — `CommunityEvent`, `RsvpStatus`.
- `services/community.service.ts` — list/create/rsvp/cancel/delete events.
- `services/community-state.service.ts` — `eventsByCommunity` + `isLoadingEvents`
  and the matching methods.
- `components/event-card/...` — one event with RSVP buttons + counts + admin actions.
- `components/event-create/...` — the create form (datetime-local inputs).
- `components/events-panel/...` — slide-in panel: list, "New event", "Show past".
- `pages/channel-view/...` — a 📅 Events button in the header that opens the panel.

## Apply (depends on Phases 1–3; built on the latest stacked files)
1. Overwrite the files. Shared files build on prior phases:
   - `community.model.ts` = all prior types + event types
   - `community.service.ts` = prior methods + event methods
   - `community-state.service.ts` = everything + event state
   - `channel-view.component.ts` = pinned panel + scroll fix + Events button/panel
2. **Run the migration:** `php artisan migrate`
3. `php artisan optimize:clear` and **restart `php artisan serve`** + reverb + queue.
4. Frontend recompiles; hard-refresh.

## Test
- As an admin/moderator: header → 📅 Events → + New event → fill title + start →
  Create → it appears in the panel.
- RSVP Going/Maybe/Can't go → the count updates and your choice highlights;
  tap it again to clear.
- Cancel an event (shows "cancelled"); Delete removes it.
- "Show past" reveals ended events.
- As a plain member: you can RSVP but not create (no "New event" button).

## Notes
- Events don't broadcast over Reverb yet — the panel loads on open and updates
  from your own actions. Live event/RSVP sync could be a later enhancement.
- `datetime-local` sends local wall-clock time; the API stores it. If you later
  need timezone-aware events across regions, that's a future refinement.
