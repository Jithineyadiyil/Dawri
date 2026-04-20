# Dawri Sprint 2 — Match Scheduling & Evidence

Adds three interconnected flows to the match workflow:

1. **Schedule management** — organizer/admin can set or change the match time directly; the previous schedule is overwritten and the old status (e.g. `pending`) transitions to `scheduled`.
2. **Reschedule requests** — a participant proposes a new time; the opposing player must accept or reject. Organizer/admin can override the dual-acceptance rule.
3. **Evidence uploads** — participants and organizers attach screenshots (JPG/PNG/WEBP, ≤5MB) or video clips (MP4/WEBM, ≤50MB) to a match, visible to both players and the organizer. Gated behind the match being scheduled.

## Install order

This bundle mirrors the repo layout. Install from the Dawri root:

```cmd
cd /D "D:\xamp new\htdocs\Dawri"

REM ── Backend ───────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\backend\app\Models\*.php                             backend\app\Models\
xcopy /Y /I <bundle>\backend\app\Http\Controllers\Api\*.php               backend\app\Http\Controllers\Api\
xcopy /Y /I <bundle>\backend\app\Http\Requests\*.php                      backend\app\Http\Requests\
xcopy /Y /I <bundle>\backend\app\Http\Resources\*.php                     backend\app\Http\Resources\
xcopy /Y /I <bundle>\backend\app\Services\*.php                           backend\app\Services\
xcopy /Y /I <bundle>\backend\database\migrations\*.php                    backend\database\migrations\
xcopy /Y /I <bundle>\backend\routes\api.php                               backend\routes\
xcopy /Y /I <bundle>\backend\tests\Feature\MatchSchedulingTest.php        backend\tests\Feature\

REM ── Frontend ──────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\frontend\src\app\core\services\api.service.ts                    frontend\src\app\core\services\
xcopy /Y /I <bundle>\frontend\src\app\pages\tournaments\tournament-detail.component.* frontend\src\app\pages\tournaments\
```

Replace `<bundle>` with the directory where you extracted the zip.

## Run

```cmd
cd backend
php artisan migrate
php artisan storage:link
php artisan serve --port=8001
```

`storage:link` must be run once on every fresh clone so the `/storage` URLs resolve. If `storage/app/public` is already linked, Artisan will just say *"The [public/storage] link already exists."* — safe to ignore.

Angular dev server auto-reloads. If not running:

```cmd
cd frontend
ng serve --port=4300
```

## API reference

All endpoints are authenticated via `auth:sanctum`. Base URL: `http://localhost:8001/api/v1`.

### Scheduling

| Method | Route                                                          | Who        | Body                                    |
|--------|----------------------------------------------------------------|------------|-----------------------------------------|
| POST   | `/matches/{match}/schedule`                                    | organizer, admin | `{ "scheduled_at": "2026-04-25T19:00:00Z" }` |
| POST   | `/matches/{match}/reschedule-requests`                         | participant | `{ "proposed_at": "...", "reason": "…" }` |
| GET    | `/matches/{match}/reschedule-requests`                         | participant, organizer, admin | — |
| POST   | `/matches/{match}/reschedule-requests/{reqId}/respond`         | opposing player, or organizer with `override=true` | `{ "action": "accept" | "reject", "override": true }` |
| DELETE | `/matches/{match}/reschedule-requests/{reqId}`                 | requester, organizer | — |

**Reschedule status transitions**: `pending` → `accepted` / `rejected` / `cancelled` / `overridden`. When the final status is `accepted` (or `overridden` with accept intent), `tournament_matches.scheduled_at` is updated atomically in the same transaction.

### Evidence

| Method | Route                                        | Who | Body |
|--------|----------------------------------------------|-----|------|
| POST   | `/matches/{match}/evidence`                  | participant, organizer, admin | multipart: `file` (required), `caption` (optional, max 255) |
| GET    | `/matches/{match}/evidence`                  | participant, organizer, admin | — |
| DELETE | `/matches/{match}/evidence/{evId}`           | uploader, organizer, admin | — |

**Rules enforced in `MatchEvidenceService`:**
- Match must have `scheduled_at` set.
- Match cannot be `completed` or `walkover`.
- Per-user-per-match cap of 10 files.
- Image ≤5MB (JPG/PNG/WEBP), video ≤50MB (MP4/WEBM).

## Smoke test (curl)

Assuming you've logged in and have a bearer token in `%TOKEN%` and a scheduled match id in `%MID%`:

```cmd
REM 1. Organizer sets a schedule
curl -X POST http://localhost:8001/api/v1/matches/%MID%/schedule ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"scheduled_at\":\"2026-04-25T19:00:00Z\"}"

REM 2. Player proposes a new time
curl -X POST http://localhost:8001/api/v1/matches/%MID%/reschedule-requests ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"proposed_at\":\"2026-04-26T20:00:00Z\",\"reason\":\"Exam clash\"}"

REM 3. Opposing player accepts  (get reqId from the response above)
curl -X POST http://localhost:8001/api/v1/matches/%MID%/reschedule-requests/%REQID%/respond ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"action\":\"accept\"}"

REM 4. Upload a screenshot
curl -X POST http://localhost:8001/api/v1/matches/%MID%/evidence ^
  -H "Authorization: Bearer %TOKEN%" ^
  -F "file=@C:\path\to\proof.png" ^
  -F "caption=Final score screen"

REM 5. List evidence
curl http://localhost:8001/api/v1/matches/%MID%/evidence ^
  -H "Authorization: Bearer %TOKEN%"
```

Expected responses: 200/201 on success, 403 on authorization failures, 422 on validation failures (including the gating rules).

## Run the feature tests

```cmd
cd backend
php artisan test --filter=MatchSchedulingTest
```

Seven cases cover: organizer scheduling, non-participant blocked from proposing, full accept happy path, own-request-rejection guard, organizer override, upload blocked pre-schedule, upload cap enforcement.

## What the UI looks like

Click any clickable match in the bracket to open the modal. New sections appear inside the modal, above the existing result-submission form:

- **🕐 Schedule** — shows `Thursday, 25 Apr 2026 at 19:00`. Organizer sees a **Change** button that opens a `<input type="datetime-local">`.
- **↻ Reschedule Requests** — if the opposing player has a pending request, it appears in a gold-tinted card pulsing gently, with **Accept** / **Reject** buttons. If you have a pending request of your own, it shows in a cyan-tinted card with a **Cancel request** button. Organizers see an additional purple override panel with **Force Accept** / **Force Reject**. A collapsible "History" section shows all past requests with their final status.
- **📎 Evidence** — drag-and-drop-ish upload area with file name preview, optional caption, thumbnail grid of uploaded images and "▶ Open video" tiles for clips. Hovering an evidence item reveals the delete × button (shown only to the uploader, organizer, or admin).

## Files in this bundle (19 total)

### Backend (15)

```
backend/database/migrations/
  └── 2026_04_20_000002_add_match_scheduling_and_evidence.php   [NEW — idempotent]

backend/app/Models/
  ├── TournamentMatch.php                  [extended — relations + helpers]
  ├── MatchRescheduleRequest.php           [NEW]
  └── MatchEvidence.php                    [NEW]

backend/app/Services/
  ├── MatchSchedulingService.php           [NEW]
  └── MatchEvidenceService.php             [NEW]

backend/app/Http/Requests/
  ├── ScheduleMatchRequest.php             [NEW]
  ├── RequestRescheduleRequest.php         [NEW]
  ├── RespondRescheduleRequest.php         [NEW]
  └── UploadEvidenceRequest.php            [NEW]

backend/app/Http/Resources/
  ├── MatchRescheduleResource.php          [NEW]
  └── MatchEvidenceResource.php            [NEW]

backend/app/Http/Controllers/Api/
  └── MatchController.php                  [extended — full replacement]

backend/routes/
  └── api.php                              [extended — full replacement]

backend/tests/Feature/
  └── MatchSchedulingTest.php              [NEW — 7 cases]
```

### Frontend (4)

```
frontend/src/app/core/services/
  └── api.service.ts                       [extended — full replacement, 8 new methods]

frontend/src/app/pages/tournaments/
  ├── tournament-detail.component.ts       [extended — Sprint 2 signals + handlers]
  ├── tournament-detail.component.html     [extended — Schedule/Reschedule/Evidence sections]
  └── tournament-detail.component.scss     [extended — Sprint 1 polish + Sprint 2 styles]
```

## Troubleshooting

**"Evidence can only be uploaded after the match is scheduled"** — expected. Set a schedule first via the organizer UI or `POST /schedule`.

**Uploaded files show a broken image icon** — run `php artisan storage:link` once.

**Reschedule button doesn't appear** — the user isn't identified as a participant. The frontend resolves participant identity via `tournament.participants[].user_id`, so make sure the tournament response includes the participants array. (`getTournament()` does by default.)

**Browser's native datetime picker is white-on-white** — the SCSS applies `color-scheme: dark` to the inputs so they match the theme, but some browsers need the page itself to declare `:root { color-scheme: dark; }` in global styles to fully respect it.

## Not in this bundle (deferred)

- Email/SMS notifications when a reschedule request arrives or is answered (Sprint 3, once the real SMS provider is wired per prior deferral list)
- Video thumbnail generation (currently displays a generic "▶ Open video" tile — could use a poster frame via ffmpeg on upload)
- Reschedule request auto-expiry (currently stays pending indefinitely until resolved)
- Per-match upload quota across all users (currently only per-user cap)
