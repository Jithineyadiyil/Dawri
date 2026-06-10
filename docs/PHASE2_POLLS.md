# Phase 2 — Polls

Adds community polls: a member posts a poll into a channel (question + 2–10
options, optional multiple-choice), members vote, results update live with
counts and percentages. Creator or moderators/admins can close or delete.

## Backend (new)
- **Migration** `2026_06_09_000001_create_polls_tables.php` — `polls`,
  `poll_options`, `poll_votes` (one vote per option per user; unique index).
- **Models** `Poll`, `PollOption`, `PollVote`.
- **Repository** `PollRepositoryInterface` + `PollRepository` (eager-loads
  options with `votes_count` and the viewer's votes).
- **Service** `PollService` — create / vote / close / delete.
  - Single-choice: selecting an option replaces the previous; re-clicking clears it.
  - Multiple-choice: each option toggles independently.
  - Voting requires non-banned, non-muted membership; close/delete requires the
    creator, a community moderator, or a platform admin.
- **Controller** `PollController`, request `CreatePollRequest`, resource `PollResource`.
- **Routes** added to `routes/api.community.php`:
  - `GET/POST /channels/{channel}/polls`
  - `POST /polls/{poll}/vote`, `POST /polls/{poll}/close`, `DELETE /polls/{poll}`
- **Binding** `PollRepositoryInterface => PollRepository` in `CommunityServiceProvider`.

## Frontend (new)
- `models/community.model.ts` — `Poll`, `PollOption` types.
- `services/community.service.ts` — `listPolls`, `createPoll`, `votePoll`,
  `closePoll`, `deletePoll`.
- `services/community-state.service.ts` — `pollsByChannel` signal + the
  load/create/vote/close/delete state methods.
- `components/poll-display/poll-display.component.ts` — a poll with live vote
  bars, the viewer's selection highlighted, close/delete for the owner.
- `components/poll-create/poll-create.component.ts` — the create form
  (question, dynamic options, multiple-choice toggle).
- `pages/channel-view/channel-view.component.ts` — a "📊 Poll" button in the
  header that opens the form, and a polls section above the message feed.

## Apply (in order — depends on Phases 1 and 1b)
1. Overwrite the files (mirrors project layout). The shared files
   (`community.model.ts`, `community.service.ts`, `community-state.service.ts`,
   `channel-view.component.ts`) build on Phase 1/1b — apply those first.
2. **Run the migration:** `php artisan migrate`
3. `php artisan optimize:clear` and **restart `php artisan serve`**.
4. Frontend recompiles; hard-refresh.

## Test
- Open a channel → click **📊 Poll** → enter a question + options → Create.
- The poll appears above the feed; click an option to vote; the bar/percent updates.
- Single-choice: voting a second option moves your vote; re-click clears it.
- Toggle "Allow multiple choices" when creating to let users pick several.
- As the creator (or admin): Close locks voting; Delete removes the poll.

## Notes
- Polls are loaded per channel on open (`loadPolls`). They are not yet pushed
  over Reverb in real time — a viewer sees others' votes on their next poll
  action or channel re-open. Live poll broadcasting can be a later enhancement.
