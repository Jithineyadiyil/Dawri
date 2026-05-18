# Dawri — YouTube Live Streaming Module (Sprint 5, Option B)

Dawri-managed YouTube broadcasts: backend creates the broadcast via the
YouTube Data API v3, returns RTMP credentials to the organizer, and tracks
the full lifecycle. Coexists with the existing "paste a Twitch/YouTube URL"
flow (Option A) — that one is untouched.

---

## What ships in this module

| Layer | Files |
|---|---|
| Migration | `live_broadcasts` table (UUID PK, encrypted stream key) |
| Model | `LiveBroadcast` (HasUuids, encrypted cast, soft-deletes) |
| Service | `YouTubeStreamingService` (low-level API), `LiveBroadcastService` (orchestration) |
| Repository | `LiveBroadcastRepositoryInterface` + `LiveBroadcastRepository` |
| HTTP | `LiveBroadcastController`, `CreateBroadcastRequest`, `LiveBroadcastResource` |
| Job | `AutoCreateBroadcastJob` (for featured tournaments) |
| Exception | `StreamingException` (typed error codes → HTTP statuses) |
| Frontend | `LiveBroadcastService`, `BroadcastControlsComponent`, model interfaces |
| Tests | `YouTubeStreamingServiceTest` (Unit), `LiveBroadcastApiTest` (Feature) |

---

## Install — backend

1. **Copy files** into the Dawri backend, mirroring paths exactly.

2. **Append the `youtube` block** to `config/services.php` (see
   `backend/config/services.youtube-snippet.php`). Then:
   ```bash
   php artisan config:clear
   ```

3. **Add env variables** to `backend/.env` (see `backend/.env.streaming-additions`):
   ```dotenv
   YOUTUBE_CLIENT_ID=...
   YOUTUBE_CLIENT_SECRET="..."
   YOUTUBE_REFRESH_TOKEN="..."
   YOUTUBE_CHANNEL_ID=UC...
   YOUTUBE_ENABLED=true
   ```

4. **Register the repository binding** in `app/Providers/AppServiceProvider.php`:
   ```php
   $this->app->bind(
       \App\Repositories\Contracts\LiveBroadcastRepositoryInterface::class,
       \App\Repositories\Eloquent\LiveBroadcastRepository::class,
   );
   ```

5. **Merge the routes** from `backend/routes/api.routes-snippet.php` into
   the existing `routes/api.php` inside the `auth:sanctum` group.

6. **Run the migration**:
   ```bash
   php artisan migrate
   ```

7. **Verify**:
   ```bash
   php artisan tinker
   >>> config('services.youtube.enabled')   // true
   >>> Schema::hasTable('live_broadcasts')  // true
   ```

---

## Install — frontend

1. **Copy files** into `frontend/src/app/features/streaming/`.

2. **Use the component** anywhere a match is displayed (e.g. the match
   modal). The component is standalone — just import it:

   ```typescript
   import { BroadcastControlsComponent } from './features/streaming/broadcast-controls.component';

   @Component({
     standalone: true,
     imports: [BroadcastControlsComponent /* + others */],
     template: `
       <dawri-broadcast-controls
         [matchId]="match.id"
         [defaultTitle]="'Quarterfinal 3 — ' + match.title"
         (broadcastChanged)="onBroadcastChanged($event)"
       />
     `,
   })
   export class MatchModalComponent { /* … */ }
   ```

3. The existing `<app-stream-embed>` component already handles the watch
   side — no changes needed. When a broadcast goes live, the matching
   `tournament_matches.stream_url` is populated automatically, so the
   embed appears for all viewers.

---

## Auto-trigger (featured tournaments)

Dispatch `AutoCreateBroadcastJob` from wherever you schedule matches:

```php
use App\Jobs\AutoCreateBroadcastJob;

if ($tournament->is_featured && $match->scheduled_at) {
    AutoCreateBroadcastJob::dispatch($match->id)
        ->delay($match->scheduled_at->subMinutes(15));
}
```

The job is idempotent — re-running returns the existing broadcast.

---

## Security notes

- **Stream key is encrypted at rest** via the Eloquent `encrypted` cast.
- **API Resource never returns the stream key** — only the dedicated
  `/credentials` endpoint, which is rate-limited (5/min/user) and sends
  `Cache-Control: no-store`.
- **Client Secret + Refresh Token** must live in `.env`, never in code.
- **Refresh token** is long-lived. If leaked: revoke at
  `myaccount.google.com/permissions` and regenerate via OAuth Playground.

---

## Running tests

```bash
cd backend
php artisan test --filter=YouTubeStreamingServiceTest
php artisan test --filter=LiveBroadcastApiTest
```

Both suites mock the YouTube HTTP layer with `Http::fake()`, so they run
offline and don't consume real quota.

---

## YouTube quota notes

YouTube's free quota is 10,000 units/day. Per broadcast:

| Action | Cost (units) |
|---|---|
| Create broadcast | 50 |
| Create stream | 50 |
| Bind stream | 50 |
| Transition to live | 50 |
| Transition to complete | 50 |
| **Total per broadcast** | **~250** |

= ~40 broadcasts/day on the free tier. For more, apply for an audit at
[Google API Console](https://console.cloud.google.com/iam-admin/quotas).

---

## Files in this drop

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/LiveBroadcastController.php
│   │   ├── Requests/CreateBroadcastRequest.php
│   │   └── Resources/LiveBroadcastResource.php
│   ├── Jobs/AutoCreateBroadcastJob.php
│   ├── Models/LiveBroadcast.php
│   ├── Providers/_ServiceProviderBinding.snippet.php
│   ├── Repositories/
│   │   ├── Contracts/LiveBroadcastRepositoryInterface.php
│   │   └── Eloquent/LiveBroadcastRepository.php
│   └── Services/Streaming/
│       ├── DTOs/BroadcastDetails.php
│       ├── Exceptions/StreamingException.php
│       ├── LiveBroadcastService.php
│       └── YouTubeStreamingService.php
├── config/services.youtube-snippet.php
├── database/migrations/2026_05_17_120000_create_live_broadcasts_table.php
├── routes/api.routes-snippet.php
├── tests/
│   ├── Unit/YouTubeStreamingServiceTest.php
│   └── Feature/LiveBroadcastApiTest.php
└── .env.streaming-additions

frontend/
└── src/app/features/streaming/
    ├── broadcast-controls.component.ts
    ├── live-broadcast.model.ts
    └── live-broadcast.service.ts

docs/
├── README.md          (this file)
├── API.md
├── ARCHITECTURE.md
└── CHANGELOG.md
```
