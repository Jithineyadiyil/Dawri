# Sprint 15 — Integration Guide

Step-by-step deployment of this bundle into the existing Dawri repo at
`D:\xamp new\htdocs\dawri\`.

> **Backup first.** `git status` should be clean before you start, or stash your work.

---

---

## 🔴 PRE-FLIGHT — Install Reverb (REQUIRED for real-time)

The original Sprint 15 INTEGRATION instructions assumed Reverb was already wired
from Sprint 6. **Code review confirmed it is NOT installed in the repo.** Without
this step, messages will save and appear on page refresh, but will NOT broadcast
in real time. Other sprints continue to work normally.

```powershell
cd "D:\xamp new\htdocs\dawri\backend"
composer require laravel/reverb
php artisan reverb:install
```

This adds:
- `laravel/reverb` to composer.json
- `config/broadcasting.php` with Reverb defaults
- `config/reverb.php`
- REVERB_* environment variables to .env

Then set in `backend/.env`:

```
BROADCAST_CONNECTION=reverb
```

Start the Reverb daemon in a separate terminal whenever you run the app:

```powershell
php artisan reverb:start
```

(Also install `composer require pusher/pusher-php-server` if `reverb:install` does not pull it.)

## 1. Drop in backend files

Mirror the folder structure exactly:

```
backend/database/migrations/      → 8 migration files
backend/app/Models/               → 7 model files
backend/app/Repositories/Contracts/  → 4 interfaces
backend/app/Repositories/Eloquent/   → 4 implementations
backend/app/Services/             → 6 service files
backend/app/Http/Controllers/Api/ → 4 controllers
backend/app/Http/Resources/       → 4 resources
backend/app/Http/Requests/        → 5 form requests
backend/app/Events/               → 5 events
backend/app/Notifications/        → 1 notification
backend/app/Observers/            → TournamentObserver
backend/app/Providers/            → CommunityServiceProvider
backend/database/seeders/         → GlobalCommunitySeeder
backend/routes/                   → api.community.php + channels.community.php
backend/tests/Unit/               → 2 unit tests
backend/tests/Feature/            → 2 feature tests
```

---

## 2. Register the service provider

Open `backend/bootstrap/providers.php` and add the line:

```php
<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\CommunityServiceProvider::class,  // ← ADD THIS
];
```

---

## 3. Append the routes

Open `backend/routes/api.php`. Find the existing `Route::middleware('auth:sanctum')->group(function () {` block, and add **inside** it (anywhere before the closing `});`):

```php
// Sprint 15 — Dawri Community
require __DIR__ . '/api.community.php';
```

**Create** `backend/routes/channels.php` if it does not exist (it does not in the current Dawri repo):

```php
<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Broadcast;

// Sprint 15 — Dawri Community broadcasting auth
require __DIR__ . '/channels.community.php';
```

Then drop in `channels.community.php` (already created by the bundle in `routes/`).

The new file is auto-loaded by `bootstrap/app.php` if you keep the default Laravel 11 bootstrap. If your bootstrap does not register `withBroadcasting()`, add it:

```php
// bootstrap/app.php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // ...
    )
    ->withBroadcasting(channels: __DIR__ . '/../routes/channels.php')
    // ...
```

---

## 4. User model — relationships

Open `backend/app/Models/User.php` and add inside the class body:

```php
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/** @return BelongsToMany<Community> */
public function communities(): BelongsToMany
{
    return $this->belongsToMany(Community::class, 'community_members')
        ->withPivot(['role', 'joined_at', 'muted_until', 'banned_at'])
        ->withTimestamps();
}

/** @return HasMany<Message> */
public function messages(): HasMany
{
    return $this->hasMany(Message::class);
}
```

Add to the top-of-file `use` statements:

```php
use App\Models\Community;
use App\Models\Message;
```

---

## 5. Tournament model — community relationship

Open `backend/app/Models/Tournament.php` and add:

```php
use App\Models\Community;
use Illuminate\Database\Eloquent\Relations\HasOne;

/** @return HasOne<Community> */
public function community(): HasOne
{
    return $this->hasOne(Community::class)->where('type', 'tournament');
}
```

---

## 6. Run the migrations

```powershell
cd "D:\xamp new\htdocs\dawri\backend"
php artisan migrate
```

Expected output: 8 new tables created.

---

## 7. Seed the global community

```powershell
php artisan db:seed --class=GlobalCommunitySeeder
```

Expected output:
```
Global community: Dawri Community (dawri-community)
Back-filled N users as community members.
```

(N = your current user count.)

---

## 8. Hook tournament registration into community membership

Find your existing `app/Services/TournamentRegistrationService.php` (Sprint 1).
In the method that creates a `TournamentParticipant` (likely `register()` or similar),
inject `CommunityService` and call **after** the participant is saved:

```php
use App\Services\CommunityService;

// In constructor:
public function __construct(
    // ... existing deps ...
    private readonly CommunityService $communityService,
) {}

// In the register / join method, after participant is persisted:
$this->communityService->joinTournamentCommunity($tournament, $user);
```

---

## 9. Schedule the presence sweep

Open `backend/app/Console/Kernel.php` (or `routes/console.php` in Laravel 11)
and add inside the `schedule()` method or the file:

```php
use App\Services\PresenceService;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    app(PresenceService::class)->sweep();
})->everyMinute()->name('community-presence-sweep');
```

Without this, online users will never decay to idle/offline. Optional but recommended.

---

## 10. Clear caches + restart

```powershell
php artisan optimize:clear
```

Verify the routes loaded:
```powershell
php artisan route:list --path=communities
php artisan route:list --path=channels
```

You should see 6+ community routes, 7+ channel routes, plus message routes under `/messages/`.

---

## 11. Run the tests

```powershell
php artisan test --filter=Community
php artisan test --filter=Message
```

All **27 cases should pass** on a clean DB.

---

## 12. Drop in frontend files

Mirror the folder structure:

```
frontend/src/app/features/community/
├── models/community.model.ts
├── services/community.service.ts
├── services/community-state.service.ts
├── services/reverb-connection.service.ts
├── community.routes.ts
├── pages/community-shell/community-shell.component.ts
├── pages/channel-view/channel-view.component.ts
├── pages/community-admin/community-admin.component.ts
├── components/server-sidebar/server-sidebar.component.ts
├── components/channel-list/channel-list.component.ts
├── components/message-list/message-list.component.ts
├── components/message-item/message-item.component.ts
├── components/message-composer/message-composer.component.ts
├── components/member-list/member-list.component.ts
├── components/reaction-picker/reaction-picker.component.ts
└── components/mention-textarea/mention-textarea.component.ts
```

---

## 13. Add the route in app.routes.ts

Open `frontend/src/app/app.routes.ts` and add to the routes array:

```typescript
{
  path: 'community',
  loadChildren: () => import('./features/community/community.routes')
    .then(m => m.COMMUNITY_ROUTES),
  canActivate: [AuthGuard],  // your existing guard
},
```

---

## 14. Install Laravel Echo + Pusher client

```powershell
cd "D:\xamp new\htdocs\dawri\frontend"
npm install laravel-echo pusher-js
```

---

## 15. Add a nav link to /community

Add a "Community" link in your main nav component pointing to `/community`. Active-state styling whatever matches your existing UI.

---

## Smoke test (5 minutes)

1. Start backend (port 8001), Reverb (`php artisan reverb:start`), queue worker (`php artisan queue:work`).
2. Start frontend (`npm start -- --port 4300`).
3. Log in as `admin@dawri.gg`.
4. Click "Community" in the nav → should land on the global Dawri Community with all 7 default channels.
5. Open `#general` → post a message → it appears immediately.
6. Open in a second browser as `player1@dawri.gg` → messages from admin appear in real time.
7. React with 🔥 → both clients update.
8. Edit your message → ✓ "(edited)" appears.
9. Soft-delete → "message removed" placeholder.
10. Create a new tournament via the admin UI → check `/api/v1/communities` returns it as a new community for the organizer.

If any step fails, paste the Laravel log tail + browser console error and I'll diagnose.
