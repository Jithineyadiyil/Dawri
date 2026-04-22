# Sprint 9 — Organizer-proposed Sponsorships

Lets tournament organizers propose sponsorship deals on their own tournaments. Admin reviews and approves/rejects.

## What's in this delivery

### Backend (5 files)
- `SponsorshipService.php` — REPLACES: adds `createAsProposal()`, `approve()`, `reject()` + tightens placement guard
- `SponsorshipController.php` — REPLACES: adds `approve()`, `reject()`, `pendingCount()` methods
- `TournamentSponsorshipController.php` — NEW: organizer-facing endpoints
- `ProposeSponsorshipRequest.php` — NEW: FormRequest for organizer proposals
- `routes/api.php` — REPLACES: adds 6 new routes

### Frontend (9 files)
- `tournament-sponsors-manage.component.{ts,html,scss}` — NEW: embedded organizer widget
- `tournament-detail.component.{ts,html}` — REPLACES: imports + embeds the manage widget
- `admin-sponsors.component.{ts,html,scss}` — REPLACES: adds Approve/Reject buttons + pending badge
- `admin.component.ts` — REPLACES: keeps Sponsors tab link (unchanged from Sprint 8)

## File map

| ZIP path | Save to |
|---|---|
| `backend/app/Services/SponsorshipService.php` | `backend\app\Services\SponsorshipService.php` (REPLACE) |
| `backend/app/Http/Controllers/Api/SponsorshipController.php` | `backend\app\Http\Controllers\Api\SponsorshipController.php` (REPLACE) |
| `backend/app/Http/Controllers/Api/TournamentSponsorshipController.php` | `backend\app\Http\Controllers\Api\TournamentSponsorshipController.php` (NEW) |
| `backend/app/Http/Requests/ProposeSponsorshipRequest.php` | `backend\app\Http\Requests\ProposeSponsorshipRequest.php` (NEW) |
| `backend/routes/api.php` | `backend\routes\api.php` (REPLACE) |
| `frontend/src/app/shared/tournament-sponsors-manage/*` | `frontend\src\app\shared\tournament-sponsors-manage\` (NEW directory, 3 files) |
| `frontend/src/app/pages/tournaments/tournament-detail.component.*` | `frontend\src\app\pages\tournaments\` (REPLACE 2 files) |
| `frontend/src/app/pages/admin/admin-sponsors.component.*` | `frontend\src\app\pages\admin\` (REPLACE 3 files) |
| `frontend/src/app/pages/admin/admin.component.ts` | `frontend\src\app\pages\admin\admin.component.ts` (REPLACE) |

## Install

```cmd
cd /D "D:\xamp new\htdocs\Dawri\frontend\src\app\shared"
mkdir tournament-sponsors-manage
```

Then copy files per the map. No migration required — we reuse the existing `pending` enum value that was already in the schema but never wired.

```cmd
cd /D "D:\xamp new\htdocs\Dawri\backend"
composer dump-autoload
php artisan optimize:clear
```

## New API endpoints

### Organizer-facing (authenticated — organizer of the tournament OR admin)
- `GET /api/v1/sponsors-catalog` — read-only sponsor directory for dropdowns
- `GET /api/v1/tournaments/{t}/sponsorships/manage` — full list (incl. drafts/pending) for the tournament
- `POST /api/v1/tournaments/{t}/sponsorships/manage` — propose a new deal (starts in `pending`)
- `DELETE /api/v1/tournaments/{t}/sponsorships/manage/{id}` — withdraw a pending proposal

### Admin-facing (new, under /admin)
- `POST /api/v1/admin/sponsorships/{id}/approve` — pending → active
- `POST /api/v1/admin/sponsorships/{id}/reject` — pending → cancelled with "Rejected by admin" note
- `GET  /api/v1/admin/sponsorships-pending-count` — dashboard badge data

## The full flow — what organizers see

1. **Organizer logs in** (e.g. `organizer@dawri.gg / password`)
2. Navigates to their own tournament's detail page
3. New **"Tournament Sponsors"** section appears below the public sponsors widget — **only visible to them and admins**
4. Clicks **+ Propose sponsor**
5. Picks a sponsor from the catalog (read-only list), sets placement + contribution + amount
6. Clicks **Submit for approval** → deal saves with `contract_status='pending'`
7. Row shows in their list with "Awaiting approval" badge
8. They can click **Withdraw** on their own pending proposal at any time

## The full flow — what admins see

1. Admin logs in (`admin@dawri.gg`)
2. Goes to `/admin/sponsors` (or clicks the 🤝 Sponsors tab in `/admin`)
3. On the **Deals** tab, a **pulsing amber badge** shows the pending count
4. Pending rows appear with **Approve** / **Reject** buttons
5. Click **Approve** → confirms → flips to active → immediately goes public on tournament page
6. Click **Reject** → confirms → flips to cancelled with "Rejected by admin" in notes

## Permission model summary

| Who | Create sponsor (brand) | Create deal | Activate deal | Approve deal | Reject deal |
|---|---|---|---|---|---|
| Admin | ✅ | ✅ (any state) | ✅ | ✅ | ✅ |
| Organizer | ❌ | ✅ (as `pending`, on own tournaments only) | ❌ | ❌ | ❌ |
| Player | ❌ | ❌ | ❌ | ❌ | ❌ |

Organizers can only propose — they cannot unilaterally activate. Admin retains full control over what goes public.

## Business rule guards

The service enforces these even when organizers are the caller:

- Sponsor must exist and be active
- Tournament must exist
- Only one title sponsor per tournament (across all non-terminal states — pending included)
- Only one presenting sponsor per tournament (same rule)
- Unlimited supporting sponsors
- Cash contribution must have amount > 0
- In-kind contribution must have description
- Logo-only contribution must not have cash or description

All API responses return 422 with a clear message if any guard fails.

## Pending state in the lifecycle

```
        organizer proposes
               │
               ▼
        ┌─────────────┐
        │   pending   │
        └──────┬──────┘
               │
       ┌───────┴────────┐
       │                │
  admin approve   admin reject
       │                │
       ▼                ▼
  ┌──────────┐    ┌────────────┐
  │  active  │    │ cancelled  │
  └────┬─────┘    └────────────┘
       │
  admin fulfill
       │
       ▼
  ┌────────────┐
  │ fulfilled  │
  └────────────┘
```

Admin-created deals still start as `draft` and skip the pending step (admins trust themselves).

## Commit

```cmd
cd /D "D:\xamp new\htdocs\Dawri"
git add -A
git commit -m "feat(sprint9): organizer-proposed sponsorships with admin approval"
git push
```
