# Installation — Browser Broadcast Module

Step-by-step for `D:\xamp new\htdocs\Dawri\`.

## Prerequisites

- Sprint 5 (YouTube broadcasting) already installed and working
- Existing `live_broadcasts` table with `youtube_video_id` + `youtube_stream_key` columns
- Existing `LiveBroadcastService::ensureProvisioned()` method
- Existing `LiveBroadcastRepositoryInterface` + Eloquent implementation
- Mux account (see `SETUP_MUX.md`)

## Step 1 — Copy files into your project

Mirror the ZIP structure into `D:\xamp new\htdocs\Dawri\`:

```
backend/app/Services/Streaming/...       →  app/Services/Streaming/...
backend/app/Http/Controllers/Api/...     →  app/Http/Controllers/Api/...
backend/app/Http/Requests/...            →  app/Http/Requests/...
backend/app/Http/Resources/...           →  app/Http/Resources/...
backend/app/Providers/...                →  app/Providers/...
backend/database/migrations/...          →  database/migrations/...
backend/tests/...                        →  tests/...
frontend/src/app/features/streaming/...  →  frontend/src/app/features/streaming/...
```

Do **not** copy `*.PATCH_INSTRUCTIONS.*` files into the project — those
are guidance for the next step.

## Step 2 — Append `.env` block

Open `D:\xamp new\htdocs\Dawri\backend\.env` and append the contents of
`backend/.env.browser-broadcast-additions` from the ZIP.

Then:

```cmd
cd D:\xamp new\htdocs\Dawri\backend
php artisan config:clear
```

## Step 3 — Merge config into `services.php`

Open `D:\xamp new\htdocs\Dawri\backend\config\services.php` and merge the
new `mux` and `youtube.rtmp_url` entries from `config/services.streaming.php`
into your existing array.

## Step 4 — Apply repository + model patches

Open `backend/app/Repositories_PATCH_INSTRUCTIONS.php` from the ZIP. Apply
the three small additions:

1. `LiveBroadcastRepositoryInterface::findByMuxStreamId()` — interface declaration
2. `LiveBroadcastRepository::findByMuxStreamId()` — Eloquent implementation
3. `LiveBroadcast::$fillable` — add the five new column names

Delete `Repositories_PATCH_INSTRUCTIONS.php` after applying (it's a
guidance file, not real code).

## Step 5 — Register the service provider

Open `D:\xamp new\htdocs\Dawri\backend\bootstrap\providers.php` (Laravel 11)
and add:

```php
App\Providers\StreamingBridgeServiceProvider::class,
```

## Step 6 — Wire the routes

Open `D:\xamp new\htdocs\Dawri\backend\routes\api.streaming.php` and append
the contents of the ZIP's version of the same file (the new
`broadcasts/{broadcast}/browser-session` routes).

Then open `routes/api.php` and add the **public** Mux webhook route
**outside** the `auth:sanctum` group:

```php
Route::prefix('v1')->group(function () {
    // Public — Mux signs its own requests via HMAC
    Route::post('webhooks/mux',
        \App\Http\Controllers\Api\Webhooks\MuxWebhookController::class
    )->name('webhooks.mux');

    Route::middleware('auth:sanctum')->group(function () {
        require __DIR__ . '/api.streaming.php';
        // ...existing auth'd routes...
    });
});
```

## Step 7 — Run the migration

```cmd
cd D:\xamp new\htdocs\Dawri\backend
php artisan migrate
```

Expected output:

```
2026_05_20_140000_add_browser_fields_to_live_broadcasts ... DONE
```

## Step 8 — Verify with the test suite

```cmd
php artisan test --filter=Mux
php artisan test --filter=BrowserBroadcast
```

All 25 cases should be green. If `MuxBridgeTest` complains about
`LiveBroadcast` constructor — make sure step 4 added the new columns
to `$fillable`.

## Step 9 — Wire the Angular component

Open `frontend/src/app/features/streaming/broadcast-controls/broadcast-controls.component.ts`
and apply the patches from `PATCH_INSTRUCTIONS.md.ts` (mode toggle +
import of `BrowserBroadcastComponent`).

Restart the Angular dev server:

```cmd
cd D:\xamp new\htdocs\Dawri\frontend
ng serve --port=4300
```

## Step 10 — Sign up for Mux and add credentials

Follow `SETUP_MUX.md` to:

1. Create the Mux account
2. Generate API tokens
3. Put them in `.env`
4. Configure the webhook via ngrok

## Step 11 — Smoke test end-to-end

1. Log in as `admin@dawri.gg` (password `password`)
2. Open a tournament with an existing broadcast
3. Click the new **🌐 Browser (Quick)** mode toggle
4. Pick **Webcam & Mic**
5. Grant permission when the browser prompts
6. Preview should appear
7. Click **🔴 Go Live**
8. Watch Dawri's YouTube channel — you should be live within ~6 seconds

## Step 12 — Run Jest tests (frontend)

```cmd
cd D:\xamp new\htdocs\Dawri\frontend
npm test -- --testPathPattern=browser-broadcast
```

## Rollback

If anything goes wrong:

```cmd
cd D:\xamp new\htdocs\Dawri\backend
php artisan migrate:rollback --step=1
```

Remove the registered provider from `bootstrap/providers.php` and the
new routes from `api.streaming.php` and `api.php`. The old OBS path
keeps working completely untouched.

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| 500 on `POST /browser-session` | Provider not registered | Step 5 |
| 422 on every request | FormRequest missing | Confirm `CreateBrowserSessionRequest.php` is in `app/Http/Requests/` |
| `BindingResolutionException` for `StreamingBridgeInterface` | Service provider not registered | Step 5 |
| Migration error: column already exists | Re-running migration | `php artisan migrate:rollback` first |
| Browser prompt never appears | Page is over HTTP not HTTPS | Browser media APIs require HTTPS (localhost is exempt — test on `http://localhost:4300`, not your LAN IP) |
| WHIP returns 401 | Wrong MUX token or stream expired | Regenerate stream by reloading the page; verify `php artisan config:clear` ran after `.env` change |
| Webhook never fires | ngrok URL stale | Re-run `ngrok http 8001` and update the Mux dashboard URL |
