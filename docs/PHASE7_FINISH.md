# Phase 7 (finish) — Event-in-feed, Analytics, Scheduled posts

Three features built against your committed code, plus confirmation that
new-member history already works. Built to mirror your existing patterns
(poll-carrier, admin-controller permission checks, embeddable panels).

## 0. New-member history — ALREADY WORKS (no files)
Verified: `MessageRepository::feed` filters only by channel + cursor with a
membership check; there is no join-date cutoff. New members see all past
messages immediately. Nothing to build.

## 1. Event-in-feed
When a mod creates an event, a carrier message is dropped into the community's
announcements channel (falling back to the first channel) and broadcast live —
mirroring the poll-carrier pattern. The existing event-card renders it inline.

Files:
- migration `2026_06_10_000005_add_event_id_to_messages.php`
- `app/Models/Message.php` — `event_id` fillable + `event()` relation
- `app/Services/EventService.php` — create() now also makes the carrier message
- `app/Http/Resources/MessageResource.php` — exposes `event` (reuses EventResource)
- `app/Repositories/Eloquent/MessageRepository.php` — eager-loads `event.rsvps`
- frontend `models/community.model.ts` — `event?` on Message
- frontend `components/message-item/...` — renders `<app-event-card>` inline

Limitation: RSVPing from the feed card persists, and updates the Events-panel
copy; the in-feed count refreshes on the next message reload (the embedded
event object isn't a live signal). Fine for launch; a reactive refresh is a
later tweak if wanted.

## 2. Analytics / Insights
A new "Insights" tab in the Manage panel (mods+): totals (messages, members,
channels, last-7-days), a 14-day message trend, per-channel counts, and top-5
active members. Backed by grouped aggregate queries (no N+1).

Files:
- `app/Http/Controllers/Api/CommunityAdminController.php` — `analytics()` method
- `routes/api.community.php` — `GET communities/{c}/analytics`
- frontend `services/community.service.ts` — `getAnalytics()`
- frontend `models/community.model.ts` — `CommunityAnalytics`
- frontend `components/community-insights/...` — the panel (embeddable)
- frontend `components/manage-panel/...` — Insights tab added

## 3. Scheduled posts
A 🕐 button in the composer (mods+) opens a panel to schedule a message for a
future time, list pending ones, and cancel them. A per-minute scheduled command
publishes due posts through `MessageService::post` (so sanitising,
word-filtering, and broadcasting apply identically).

Files:
- migration `2026_06_10_000006_create_scheduled_messages_table.php`
- `app/Models/ScheduledMessage.php`
- `app/Console/Commands/PublishScheduledMessages.php` — `community:publish-scheduled`
- `routes/console.php` — schedules the command every minute
- `app/Http/Controllers/Api/ScheduledMessageController.php` — create/list/cancel
- `routes/api.community.php` — `GET/POST channels/{c}/scheduled`, `DELETE scheduled/{id}`
- frontend `services/community.service.ts` — list/schedule/cancel
- frontend `models/community.model.ts` — `ScheduledMessage`
- frontend `components/scheduled-posts/...` — the modal
- frontend `components/message-composer/...` — 🕐 button + modal

### ⚠️ Scheduled posts REQUIRES the Laravel scheduler to be running
The command only fires if `php artisan schedule:run` runs every minute. On
Windows/XAMPP that means a Task Scheduler entry (every minute) running:
`php artisan schedule:run` in the backend dir. Without it, scheduled posts will
sit pending and never publish. (On a Linux server: a cron line
`* * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1`.)
You can test manually any time with: `php artisan community:publish-scheduled`.

## Apply (depends on all prior community phases)
1. Copy all files (mirrors your project layout).
2. **Run migrations:** `php artisan migrate` (adds event_id + scheduled_messages)
3. `php artisan optimize:clear`, restart `php artisan serve` + reverb.
4. Set up the scheduler (Task Scheduler / cron) for scheduled posts to fire.
5. Frontend recompiles; hard-refresh (clear `.angular` if a cache error appears).

## Test
- **Event-in-feed:** create an event (📅 Events → create) → an event card appears
  in the announcements channel feed; RSVP from it works.
- **Insights:** 🛡️ Manage → Insights tab → totals, trend bars, per-channel, top
  members render.
- **Scheduled posts:** composer 🕐 (as mod) → schedule a message 2 min out →
  it's listed as pending → run `php artisan community:publish-scheduled` (or wait
  for the scheduler) → it posts to the channel and leaves the pending list.

## Note
Verified by structural inspection (brace/backtick balance + reference
resolution), not compiled. First `php artisan migrate` + `ng serve` are the real
test — paste any error.
