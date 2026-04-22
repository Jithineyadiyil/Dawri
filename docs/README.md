# Sprint 8 — Sponsorship System

Shape A: sponsored prize pools, admin-managed, supporting cash + in-kind + logo-only contributions.

## What's in this delivery

**Backend (14 files):**
- Migration: `sponsors` + `sponsorships` tables
- Models: `Sponsor`, `Sponsorship` (with relationships + scopes)
- Service: `SponsorshipService` — domain logic with business-rule guards
- FormRequests: `StoreSponsorRequest`, `StoreSponsorshipRequest`
- Resources: `SponsorResource`, `SponsorshipResource` (admin-only field gating)
- Controllers: `SponsorController` (CRUD), `SponsorshipController` (CRUD + lifecycle + public summary)
- Seeder: 8 real brand sponsors (Red Bull, Logitech, Razer, HyperX, STC, Mobily, Zain, AlUla)
- Factory: `SponsorFactory` for tests
- 13 PHPUnit tests covering every business rule
- Route snippet file to paste

**Frontend (8 files):**
- `TournamentSponsorsComponent` — drop-in widget for tournament detail pages (TS + HTML + SCSS)
- `AdminSponsorsComponent` — /admin/sponsors page with Sponsors tab + Deals tab (TS + HTML + SCSS)
- Routes snippet + integration snippet files

## File map

| File in ZIP | Destination |
|---|---|
| `backend/database/migrations/2026_04_22_000001_*.php` | `D:\xamp new\htdocs\Dawri\backend\database\migrations\` (NEW) |
| `backend/app/Models/Sponsor.php` | `D:\xamp new\htdocs\Dawri\backend\app\Models\Sponsor.php` (NEW) |
| `backend/app/Models/Sponsorship.php` | `D:\xamp new\htdocs\Dawri\backend\app\Models\Sponsorship.php` (NEW) |
| `backend/app/Services/SponsorshipService.php` | `...\backend\app\Services\SponsorshipService.php` (NEW) |
| `backend/app/Http/Requests/StoreSponsorRequest.php` | `...\backend\app\Http\Requests\` (NEW) |
| `backend/app/Http/Requests/StoreSponsorshipRequest.php` | `...\backend\app\Http\Requests\` (NEW) |
| `backend/app/Http/Resources/SponsorResource.php` | `...\backend\app\Http\Resources\` (NEW) |
| `backend/app/Http/Resources/SponsorshipResource.php` | `...\backend\app\Http\Resources\` (NEW) |
| `backend/app/Http/Controllers/Api/SponsorController.php` | `...\backend\app\Http\Controllers\Api\` (NEW) |
| `backend/app/Http/Controllers/Api/SponsorshipController.php` | `...\backend\app\Http\Controllers\Api\` (NEW) |
| `backend/database/seeders/SponsorSeeder.php` | `...\backend\database\seeders\SponsorSeeder.php` (NEW) |
| `backend/database/factories/SponsorFactory.php` | `...\backend\database\factories\SponsorFactory.php` (NEW) |
| `backend/tests/Unit/SponsorshipServiceTest.php` | `...\backend\tests\Unit\SponsorshipServiceTest.php` (NEW) |
| `frontend/src/app/shared/tournament-sponsors/*` | `...\frontend\src\app\shared\tournament-sponsors\` (NEW directory) |
| `frontend/src/app/pages/admin/admin-sponsors.component.*` | `...\frontend\src\app\pages\admin\` (3 NEW files) |

**Instructions in (need manual edits, NOT straight drops):**
- `backend/routes/sprint8_routes_snippet.php` — paste routes into `api.php`
- `frontend/src/app/app_routes_snippet.txt` — paste route into `app.routes.ts`
- `frontend/src/app/pages/tournaments/tournament_detail_integration_snippet.txt` — embed widget

## Install

### 1. Drop the files
Extract the ZIP, copy files per the map above. Create the two new directories first:

```cmd
cd /D "D:\xamp new\htdocs\Dawri\frontend\src\app"
mkdir shared\tournament-sponsors
```

### 2. Wire up backend routes
Open `D:\xamp new\htdocs\Dawri\backend\routes\api.php`. Add the imports and paste the route definitions per the comments in `sprint8_routes_snippet.php`. Then:

```cmd
cd /D "D:\xamp new\htdocs\Dawri\backend"
composer dump-autoload
```

### 3. Run the migration
```cmd
php artisan migrate
```

Expected: two new tables `sponsors` + `sponsorships` created.

### 4. Seed sample data
```cmd
php artisan db:seed --class=SponsorSeeder
```

Expected: `Seeded 8 sponsors.`

### 5. Wire up frontend route
Open `D:\xamp new\htdocs\Dawri\frontend\src\app\app.routes.ts`. Paste the route from `app_routes_snippet.txt` into the routes array, near the existing `/admin` route.

### 6. Embed the widget in tournament detail
Follow the snippet in `tournament_detail_integration_snippet.txt`. Two changes:
- Import `TournamentSponsorsComponent` in `tournament-detail.component.ts`
- Add `<app-tournament-sponsors [tournamentId]="tournament.id" />` to the HTML

The widget auto-hides if a tournament has no sponsors, so it's safe to add unconditionally.

### 7. Run tests
```cmd
cd /D "D:\xamp new\htdocs\Dawri\backend"
php artisan test --filter=SponsorshipServiceTest
```

Expected: 13 passing tests covering create, activate, fulfill, cancel, summarize + all business rule guards.

## Try it end-to-end

1. Navigate to `http://localhost:4300/admin/sponsors`
2. **Sponsors tab** — you'll see 8 seeded brands
3. Click **Deals tab** → **+ New deal**
4. Pick a tournament + a sponsor, set placement to "Title", contribution to "Cash", amount 50000
5. Click **Save deal** — it creates as draft
6. Click **Activate** on the row — status flips to active
7. Navigate to that tournament's detail page — sponsor logo + 50,000 SAR prize pool render
8. Back to admin, click **Fulfill** → state transitions to fulfilled

## Architecture decisions — why this is what it is

**Two tables, not one**
A sponsor is a reusable brand; a sponsorship is the deal. Red Bull may sponsor 10 tournaments in a year — one sponsor row, ten sponsorship rows.

**Placement + Contribution are orthogonal**
`placement_type` (title/presenting/supporting) controls where the brand appears. `contribution_type` (cash/in_kind/logo) controls what they gave. A sponsor can hold the title slot with pure logo-only exposure (no money) — still valid, just no prize pool impact.

**State machine**: `draft → active → fulfilled`
- Draft: internal only, not visible to players
- Active: public on tournament page, counts toward prize pool
- Fulfilled: payment received, goods delivered, archived
- Cancelled: terminal sad state, kept for audit

Only active sponsorships contribute to `total_pool_sar`. This matters because a sponsor promising 50K SAR that you haven't activated yet shouldn't show as part of the advertised prize pool.

**Admin-only authZ at every write endpoint**
FormRequest `authorize()` methods check `$this->user()?->role === 'admin'`. No self-serve sponsor signup in Sprint 8. That's Sprint 9+.

**UUIDs everywhere**
Matches the rest of Dawri's schema. Both models use `HasUuids` trait.

**Companies FK is conditional**
The migration only adds `sponsors.company_id → companies.id` if the `companies` table exists. Keeps migration safe on fresh environments that haven't run the white-label migration yet.

## Gaps / things explicitly out of scope

- **Sponsor self-signup portal** — Sprint 9 candidate if/when demand warrants it
- **Payment collection** — the cash_amount_sar field is recorded, not charged. Actual transfer of funds happens out of band (invoice → wire transfer → manual reconciliation). If you want to auto-invoice sponsors, wire it into the existing `Invoice` model next sprint.
- **Prize pool distribution to winners** — the sponsorship creates the advertised pool, but actual winner payouts still go through the existing wallet/tournament-completion flow. Not my concern in Sprint 8.
- **Public sponsor directory** — e.g. `/sponsors` listing page. Not built; could add in 30 min if you want it.
- **Sponsor branding takeover on tournament pages** — e.g. "Red Bull Dawri Cup" with full Red Bull color palette overriding Dawri's. Deliberately excluded. Brand takeovers require asset approvals and are a Phase 2 feature.

## Commit

```cmd
cd /D "D:\xamp new\htdocs\Dawri"
git add -A
git commit -m "feat(sprint8): sponsorship system (sponsored prize pools, admin-managed)"
git push
```
