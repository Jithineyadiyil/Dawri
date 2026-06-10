# Phase 2b — Inline polls (Discord-style)

Revises Phase 2 so polls live **in the message flow** instead of a separate
section:
- The "create poll" trigger (📊) moves into the **message composer**, next to
  the emoji button.
- A created poll appears **inline in the chronological feed**, rendered inside a
  carrier message — so it sits in time order with the conversation and rides
  the existing real-time broadcast + pagination.

## How it works
When a poll is created, the backend also creates a normal message linked to it
(`messages.poll_id`), broadcasts that message over Reverb, and the message feed
renders the poll inside that message via the existing `poll-display` component.

## Backend
- **Migration** `2026_06_09_000002_add_poll_id_to_messages.php` — nullable
  `poll_id` FK on `messages` (nulls on poll delete).
- `app/Models/Message.php` — `poll_id` fillable + `poll()` relation.
- `app/Services/PollService.php` — `create()` now also creates a carrier
  message and broadcasts it (so the poll appears live in the feed).
- `app/Http/Resources/MessageResource.php` — embeds the poll (`poll` key) when
  the message carries one.
- `app/Repositories/Eloquent/MessageRepository.php` — feed query eager-loads
  the poll, its options (with vote counts), and votes.

## Frontend
- `models/community.model.ts` — `Message.poll`.
- `components/message-composer/message-composer.component.ts` — 📊 poll trigger
  that opens the create form above the composer.
- `components/message-item/message-item.component.ts` — renders `poll-display`
  inline when the message has a poll.
- `pages/channel-view/channel-view.component.ts` — removes the old separate
  polls section and header poll button (now redundant).

## Apply (depends on Phases 1, 1b, 2 already applied)
1. Overwrite the files. Phase 2b's shared files build on the prior phases:
   - `message-item` = redesign + replies + threads + inline poll
   - `message-composer` = redesign + reply banner + poll trigger
   - `channel-view` = pinned panel, with poll section removed
   - `community.model.ts` = all prior types + `Message.poll`
   - Phase 2's `poll-display`, `poll-create`, and state-service poll methods are
     still required (keep them from Phase 2).
2. **Run the migration:** `php artisan migrate`
3. `php artisan optimize:clear` and **restart `php artisan serve`** + reverb + queue.
4. Frontend recompiles; hard-refresh.

## Test
- In the composer, click 📊 → fill question + options → Create.
- The poll appears as a message in the feed, in time order.
- Vote on it; bars update. Other users see it appear live (carrier message
  broadcasts over Reverb).
- The old header "📊 Poll" button and the separate polls strip are gone.

## Note
Polls still don't broadcast *vote* updates live (only the poll's creation
broadcasts). A voter sees their own vote immediately; others see updated tallies
on their next interaction or channel re-open. Live vote sync is a later option.
