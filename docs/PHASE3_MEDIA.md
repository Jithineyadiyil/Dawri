# Phase 3 — Media / image sharing

Adds image sharing in community channels. Uploading images creates one message
that carries them, so they appear **inline in the feed** in time order (same
approach as inline polls) and ride the existing broadcast + pagination.

## How it works
- A 📎 button in the composer opens the OS file picker (multiple allowed).
- Selected images show as a preview strip above the input; you can remove any
  before sending, and optionally add a caption (text).
- On send, the images upload as one message. It renders inline: a single image
  shows large; multiple show in a grid. Clicking an image opens a full-screen
  lightbox.
- Storage mirrors AvatarService: files go to the `public` disk under
  `attachments/{channel_id}/{uuid}.{ext}`.

## Backend
- **Migration** `2026_06_10_000001_create_message_attachments_table.php`.
- `app/Models/MessageAttachment.php` — with a `url` accessor (public disk URL).
- `app/Models/Message.php` — adds `attachments()` (built on the Phase 2b model,
  keeps poll + parent + replies).
- `app/Services/AttachmentService.php` — validates (≤8MB each, ≤10 images,
  jpg/png/webp/gif, confirms real image bytes), stores files, reads dimensions,
  creates the carrier message, and broadcasts it.
- `app/Http/Requests/UploadAttachmentRequest.php`, `AttachmentController.php`.
- `app/Http/Resources/MessageResource.php` — embeds `attachments` (built on
  Phase 2b, keeps reply_to + poll).
- `app/Repositories/Eloquent/MessageRepository.php` — feed eager-loads
  `attachments`.
- Route `POST /channels/{channel}/attachments` (multipart) + import added to
  `routes/api.community.php`.

## Frontend
- `models/community.model.ts` — `MessageAttachment` type + `Message.attachments`.
- `services/community.service.ts` — `uploadImages(channelId, files, caption?)`
  via FormData.
- `services/community-state.service.ts` — `uploadImages(...)` + `isUploading`.
- `components/message-composer/...` — 📎 picker, preview strip, image-or-text send.
- `components/message-item/...` — inline attachment grid + lightbox wiring.
- `components/image-lightbox/...` — new full-screen viewer.

## Apply (depends on Phases 1, 1b, 2, 2b — and the latest poll fixes)
1. Overwrite the files. The shared files build on the prior phases
   (message-item = redesign + replies + threads + inline poll + images;
   composer = reply banner + poll + image picker; resource/repo/model stacked).
2. **Run the migration:** `php artisan migrate`
3. **Ensure the storage symlink exists** (once): `php artisan storage:link`
4. `php artisan optimize:clear` and **restart** `php artisan serve` + reverb + queue.
5. Frontend recompiles; hard-refresh.

## Test
- Click 📎 → pick one image → it previews → Send → it appears inline; click it
  to open full-size.
- Pick several images → they show as a grid in one message.
- Add a caption with the images → text shows above the grid.
- Remove a queued image (✕ on the preview) before sending.
- Reject paths: a >8MB file or a non-image is refused by the server.

## Notes
- Uploads broadcast live (others see the images appear), like normal messages.
- Max 8MB/image, 10 images per message (tunable in AttachmentService).
