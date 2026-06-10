# Phase 6b — Act on flagged messages (View + Remove)

Adds moderator actions to flagged-message audit entries: **View message**
(jump to it in its channel, briefly highlighted) and **Remove message**
(soft-delete it for everyone). Builds on Phase 6.

## What changed
- A flag audit entry now stores the **message_id** (previously only the word +
  channel), so the log can link back to the actual message.
- In the Admin → Audit log tab, flagged entries show **View message** and
  **Remove message** buttons.
- View jumps to the message: switches channel if needed, scrolls to it, and
  flashes it red for ~2s.
- Remove calls the existing message soft-delete (moderators are already allowed
  to delete any message), and marks the entry "removed ✓".

## Files
Backend (1):
- `app/Services/MessageService.php` — flag is now recorded AFTER the message is
  created (so the id is known); meta includes `message_id`. Block still rejects
  up-front.

Frontend (4):
- `services/community-state.service.ts` — `flashedMessageId` signal,
  `flashMessage()`, `deleteMessageById()`. (Carries all prior phases + presence
  + postError.)
- `components/message-item/message-item.component.ts` — `[id]="'msg-'+id"` on
  the message, a `.flash` highlight, `isFlashed()`. (Includes the green-frame fix.)
- `components/admin-panel/admin-panel.component.ts` — View/Remove buttons,
  `jumpToMessage` output, `messageIdOf/view/remove`.
- `pages/channel-view/channel-view.component.ts` — `onJumpToMessage()` (navigate
  + scroll + flash), wired to the admin panel's output.

## Apply (depends on Phase 6)
1. Overwrite the 5 files (they're the canonical stacked versions).
2. No new migration — but the message_id only appears on NEW flags after this is
   applied. Old flag entries won't have View/Remove (no message_id stored).
3. `php artisan optimize:clear`, restart serve; frontend recompiles; hard-refresh.

## Test
1. Add a "flag" word; send a message containing it.
2. Admin → Audit log → the new "message flagged" entry now has **View message**
   and **Remove message**.
3. View → panel closes, the channel scrolls to the message, it flashes red.
4. Remove → confirm → the message becomes "message removed" in the feed; the
   entry shows "removed ✓".

## Notes
- Old flagged entries (from before this change) have no message_id, so they show
  no buttons. Only new flags are actionable. This is expected.
- Verified by inspection, not compiled — paste any ng/php error.
