# Sprint 5 Streaming — Route Registration Fix

The test failures are all 404s because the routes I shipped earlier were in
`routes/api.routes-snippet.php`, which Laravel 11 **does not auto-load**.
Laravel only loads `routes/api.php`.

This patch is two changes:

1. Replace the unused snippet file with a clean `routes/api.streaming.php`
2. Add **one** `require` line inside the existing `auth:sanctum` group in
   `routes/api.php`

---

## Step 1 — Drop in the new routes file

Copy `backend/routes/api.streaming.php` from this ZIP to:

```
D:\xamp new\htdocs\Dawri\backend\routes\api.streaming.php
```

You can delete `routes/api.routes-snippet.php` now — it's the unloaded one.

---

## Step 2 — Patch `routes/api.php`

Open `D:\xamp new\htdocs\Dawri\backend\routes\api.php`.

You want to add **one line** near **line 76**, inside the existing
`Route::middleware('auth:sanctum')->group(function () {` block.

### Before (existing, line 76)

```php
    // ── Authenticated ──────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Sprint 9: sponsor catalog for organizer dropdowns
```

### After (add the require line)

```php
    // ── Authenticated ──────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        // Sprint 5 — YouTube Live (Option B) routes
        require __DIR__ . '/api.streaming.php';

        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Sprint 9: sponsor catalog for organizer dropdowns
```

**Why `require` works**: PHP's `require` runs the included file in the
caller's scope, so the route definitions in `api.streaming.php` inherit
the `Route::prefix('v1')` and `Route::middleware('auth:sanctum')` groups
that are active at that point in `api.php`.

This is the same pattern Laravel uses internally to split monster route
files.

---

## Step 3 — Clear caches

```powershell
cd "D:\xamp new\htdocs\Dawri\backend"
php artisan route:clear
php artisan config:clear
```

---

## Step 4 — Verify routes are registered

```powershell
php artisan route:list --path=broadcast
```

Expected output (you should see 7 routes):

```
  POST       api/v1/matches/{match}/broadcast .............. createForMatch
  POST       api/v1/tournaments/{tournament}/broadcast ..... createForTournament
  GET|HEAD   api/v1/broadcasts/{broadcast} ................. show
  POST       api/v1/broadcasts/{broadcast}/go-live ......... goLive
  POST       api/v1/broadcasts/{broadcast}/complete ........ complete
  DELETE     api/v1/broadcasts/{broadcast} ................. destroy
  GET|HEAD   api/v1/broadcasts/{broadcast}/credentials ..... credentials
```

If you see **0** routes — the `require` line didn't land inside the
prefix('v1') + auth:sanctum group. Re-read step 2.

---

## Step 5 — Re-run the tests

```powershell
php artisan test --filter=LiveBroadcastApiTest
```

All 9 should pass. If any still fail, send me the new output — the 404s
are gone and any remaining failures will point at real logic bugs.
