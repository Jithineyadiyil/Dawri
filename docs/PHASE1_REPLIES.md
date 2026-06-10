# Community Roadmap — Phase 1: Replies

Adds reply-to-message (the `messages.parent_id` column already existed but was
unused). Also folds in the earlier `display_name` fixes for the message feed so
authors without a nickname show their real name (and adds `name` to the feed's
eager-load so the accessor can compute).

## Backend
- `app/Http/Requests/SendMessageRequest.php` — accepts optional `parent_id`.
- `app/Services/MessageService.php` — `post()` takes an optional `$parentId`,
  validates the parent is in the same channel, stores it, and eager-loads
  `parent.author` for the preview.
- `app/Http/Controllers/Api/MessageController.php` — passes `parent_id` through.
- `app/Models/Message.php` — `parent()` and `replies()` relations.
- `app/Http/Resources/MessageResource.php` — adds a compact `reply_to`
  preview `{id, author, snippet}`; also switches author name to `display_name`.
- `app/Repositories/Eloquent/MessageRepository.php` — feed + pinned queries
  eager-load `name` and `parent.author`.

## Frontend
- `models/community.model.ts` — `Message.reply_to`.
- `services/community.service.ts` — `post()` sends `parent_id`.
- `services/community-state.service.ts` — `replyingTo` signal +
  `setReplyTo`/`clearReplyTo`; `post()` sends the parent and clears after send.
- `components/message-item/message-item.component.ts` — a "Reply" button and a
  reply-reference line above messages that are replies.
- `components/message-composer/message-composer.component.ts` — a "Replying to …"
  banner with a cancel button above the input.

## Apply
1. Overwrite the 11 files (mirrors project layout).
2. Backend: `php artisan optimize:clear` and **restart `php artisan serve`**.
3. Frontend recompiles; hard-refresh.

## Test
- Hover a message → click **Reply** → the composer shows "Replying to X".
- Send → the new message shows a "↳ X: …" reference above it.
- Cancel the reply via the ✕ in the banner.
- Replying across channels is rejected by the server (same-channel only).

No migration needed — `parent_id` already exists in the messages table.
