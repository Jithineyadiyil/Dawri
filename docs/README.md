# Dawri — OBS Setup Wizard (Sprint 5 add-on)

Six-step bilingual (EN / AR + RTL) wizard that walks tournament organizers
through configuring **OBS Studio** to push RTMP to a Dawri-managed YouTube
broadcast. Built against the **real codebase** at
github.com/Jithineyadiyil/Dawri @ `1ce9254d`.

## What this module assumes already exists

Everything from the merged Sprint 5 streaming PR:

- `App\Models\LiveBroadcast` with UUID PK, `created_by`, `status`, `source`
- `App\Services\Streaming\LiveBroadcastService` (`goLive`, `complete`, `cancel`)
- `App\Repositories\Eloquent\LiveBroadcastRepository` + interface
- `App\Http\Controllers\Api\LiveBroadcastController` with `credentials()` endpoint
- Routes in `routes/api.streaming.php` (broadcasts/{id}/credentials etc.)
- Frontend `LiveBroadcastService` + `BroadcastControlsComponent` in
  `frontend/src/app/features/streaming/`

## What this module adds

| Layer | What |
|---|---|
| Migration | `broadcast_setup_logs` (UUID FKs to live_broadcasts, tournaments, users) |
| Model | `BroadcastSetupLog` (append-only, `UPDATED_AT = null`) |
| Repository | `BroadcastSetupLogRepository` + interface in `Eloquent/` namespace |
| Service | `App\Services\Streaming\ObsWizardService` (auth, config, log, finishAndGoLive) |
| Controller | `App\Http\Controllers\Api\ObsWizardController` (5 endpoints) |
| Request | `LogWizardEventRequest` |
| Resource | `WizardConfigResource` |
| Frontend | `SetupWizardComponent` standalone (signals, OnPush, bilingual RTL) |
| Frontend | `ObsWizardService` (typed HTTP client) |
| Frontend | `wizard.model.ts` (types mirror Laravel resources exactly) |

## 🚀 Install (one pass)

### Backend

1. Copy backend files preserving the namespace structure:

   ```
   app/Models/BroadcastSetupLog.php
   app/Repositories/Contracts/BroadcastSetupLogRepositoryInterface.php
   app/Repositories/Eloquent/BroadcastSetupLogRepository.php
   app/Services/Streaming/ObsWizardService.php
   app/Http/Controllers/Api/ObsWizardController.php
   app/Http/Requests/LogWizardEventRequest.php
   app/Http/Resources/WizardConfigResource.php
   database/migrations/2026_05_18_120000_create_broadcast_setup_logs_table.php
   tests/Unit/ObsWizardServiceTest.php
   ```

2. Add ONE binding line to `app/Providers/AppServiceProvider.php` inside
   `register()` (see `app/Providers/_WizardBinding.snippet.php`):

   ```php
   $this->app->bind(
       \App\Repositories\Contracts\BroadcastSetupLogRepositoryInterface::class,
       \App\Repositories\Eloquent\BroadcastSetupLogRepository::class
   );
   ```

3. Append the routes from `routes/api.streaming.wizard-snippet.php` into your
   existing `routes/api.streaming.php`. The `$uuid` regex variable is already
   declared there; the snippet reuses it.

4. Run:

   ```bash
   cd backend
   php artisan migrate
   php artisan route:cache
   php artisan test --filter=ObsWizard
   ```

### Frontend

1. Copy frontend files:

   ```
   src/app/features/streaming/setup-wizard/
       wizard.model.ts
       obs-wizard.service.ts
       obs-wizard.service.spec.ts
       setup-wizard.component.ts
   ```

2. Merge both routes from `src/app/wizard.routes-snippet.ts` into your
   existing `app.routes.ts` array — both `/broadcasts/:id/setup-wizard` and
   `/tournaments/:id/setup-wizard` are registered.

3. Add a "Setup Wizard" button to your existing `BroadcastControlsComponent`
   that links to `/broadcasts/{{broadcast.id}}/setup-wizard`. (Optional —
   organizers can also navigate directly.)

## 🔗 API endpoints (added)

| Method | URL | Auth | Purpose |
|---|---|---|---|
| GET  | `/api/v1/broadcasts/{uuid}/setup-wizard/config`     | creator or admin     | Wizard config (no key) |
| POST | `/api/v1/broadcasts/{uuid}/setup-wizard/event`      | creator or admin     | Record analytics event |
| POST | `/api/v1/broadcasts/{uuid}/setup-wizard/finish`     | creator or admin     | Transition to LIVE + log completion |
| GET  | `/api/v1/tournaments/{uuid}/setup-wizard/config`    | organizer/mod/admin  | Tournament-scoped config |
| POST | `/api/v1/tournaments/{uuid}/setup-wizard/event`     | organizer/mod/admin  | Record analytics event |

All five inherit `auth:sanctum` from the parent `routes/api.streaming.php`
group, plus `throttle:60,1` from the wizard sub-group. UUID format is
enforced via `->where()` constraints reusing the existing regex.

## 🔒 Security

- The wizard endpoints **never return the stream key** — it stays on the
  existing rate-limited `GET /broadcasts/{id}/credentials` endpoint (5/min),
  which is what Step 2 of the wizard calls.
- The Step-2 UI flow shows the key with `type="password"` by default and
  requires an explicit "Show" click before plaintext is rendered.
- Server-side metadata sanitisation strips keys named `stream_key`,
  `stream_key_enc`, `token`, `access_token`, `refresh_token`, `password`,
  `secret`, `rtmp_url` before persisting to the analytics table — defence
  in depth against accidental leakage from frontend payloads.
- Authorization in `ObsWizardService` exactly mirrors
  `LiveBroadcastController::authorizeCreator()` and `authorizeOrganizer()` —
  no divergence possible.

## 🧪 Test strategy

| Layer | Tool | Cases |
|---|---|---|
| Service unit | PHPUnit + Mockery | 13 — auth (creator/admin/organizer/moderator/player), config builders for both scopes, log validation, secret sanitisation, finish + go-live |
| Service Angular | Jest | 8 — config (both scopes), error mapping (403/410/429), event posting, finish, platform detection |

## 📋 Deliverable Summary

| Field | Detail |
|---|---|
| **Purpose** | Walk creators/organizers through OBS configuration for a Dawri-managed YouTube broadcast, with copy buttons, encoder presets, troubleshooting, and a one-click Go Live finale that calls the existing `LiveBroadcastService::goLive()`. |
| **Inputs** | URL param `:id` (UUID — broadcast or tournament, scope auto-detected) · Sanctum-authenticated user · User-Agent for OS detection |
| **Outputs** | Wizard UI · rows in `broadcast_setup_logs` · broadcast transitioned to `live` status on finish |
| **Edge Cases** | Tournament without broadcast → "Create broadcast first" banner + CTA · non-creator user → 403 · 410 if broadcast already terminal · 429 if credential reveal hit rate-limit · YouTube transition failure → StreamingException mapped to proper HTTP status · Arabic RTL · clipboard unavailable → textarea fallback |
| **Test Strategy** | PHPUnit unit tests with Mockery (no Laravel kernel) · Jest service tests with `HttpClientTestingModule` |
| **Standards** | PSR-12 · SOLID · `declare(strict_types=1)` · PHPDoc on every public method · Angular Style Guide · `OnPush` · signals + `effect()` + `takeUntilDestroyed` · standalone components · JSDoc |
