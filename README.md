# Sprint 14 — Platform Sponsors (Full Bundle)

Complete platform-level sponsorship system for Dawri. Sponsors of
Dawri-the-platform appear on the homepage, footer (all public pages),
dedicated `/sponsors` showcase page, and tournament list.

Two tiers:
- **Title** — exclusive, large hero placement (only one allowed at a time)
- **Standard** — carousel placement (multiple allowed)

## Files in this bundle (20 files)

### Backend (6 files)

| File | Action |
|---|---|
| `backend/database/migrations/2026_04_24_000001_create_platform_sponsorships_table.php` | NEW migration |
| `backend/app/Models/PlatformSponsorship.php` | NEW model |
| `backend/app/Http/Resources/PlatformSponsorshipResource.php` | NEW |
| `backend/app/Http/Controllers/Api/PlatformSponsorController.php` | NEW (public) |
| `backend/app/Http/Controllers/Api/AdminPlatformSponsorController.php` | NEW (admin CRUD) |
| `backend/routes/api.php` | REPLACE — adds 6 routes |

### Frontend — sponsor system foundation (8 files)

| File | Action |
|---|---|
| `frontend/src/app/components/platform-sponsors-strip/platform-sponsor.service.ts` | NEW — shared data service |
| `frontend/src/app/components/platform-sponsors-strip/platform-sponsors-strip.component.ts` | NEW — reusable strip with 3 variants |
| `frontend/src/app/pages/sponsors/sponsors.component.ts` | NEW — public `/sponsors` page |
| `frontend/src/app/pages/admin/platform-sponsors/admin-platform-sponsors.component.ts` | NEW — admin CRUD |
| `frontend/src/app/pages/admin/platform-sponsors/admin-platform-sponsors.component.html` | NEW |
| `frontend/src/app/pages/admin/platform-sponsors/admin-platform-sponsors.component.scss` | NEW |
| `frontend/src/app/app.routes.ts` | REPLACE — adds `/sponsors` and `/admin/platform-sponsors` |
| `frontend/src/app/pages/admin/admin.component.ts` | REPLACE — adds `🎯 Platform Sponsors` nav tab |

### Frontend — page integrations (6 files)

| File | Action |
|---|---|
| `frontend/src/app/components/footer/footer.component.ts` | REPLACE — adds strip + Partners link |
| `frontend/src/app/components/footer/footer.component.html` | REPLACE — renders footer-variant strip |
| `frontend/src/app/pages/home/home.component.ts` | REPLACE — adds strip import |
| `frontend/src/app/pages/home/home.component.html` | REPLACE — renders hero-variant strip |
| `frontend/src/app/pages/tournaments/tournaments.component.ts` | REPLACE — adds strip import |
| `frontend/src/app/pages/tournaments/tournaments.component.html` | REPLACE — renders compact-variant strip |

## Deploy

### Step 1 — Backend

1. Drop all 6 backend files into their respective folders
2. Run the migration:

```cmd
cd "D:\xamp new\htdocs\Dawri\backend"
php artisan migrate
```

3. Clear caches + restart Apache:

```cmd
php artisan route:clear
composer dump-autoload
```

4. Verify routes registered:

```cmd
php artisan route:list --path=platform-sponsor
php artisan route:list --path=admin/platform-sponsorships
```

Should show 1 public route + 5 admin routes.

### Step 2 — Frontend

1. Drop all 14 frontend files into their respective folders. Create new folders as needed:
   - `frontend/src/app/components/platform-sponsors-strip/` (new folder)
   - `frontend/src/app/pages/sponsors/` (new folder)
   - `frontend/src/app/pages/admin/platform-sponsors/` (new folder)

2. Replace existing files:
   - `app.routes.ts`
   - `pages/admin/admin.component.ts`
   - `components/footer/footer.component.ts` and `.html`
   - `pages/home/home.component.ts` and `.html`
   - `pages/tournaments/tournaments.component.ts` and `.html`

3. `ng serve` hot-reloads — no restart needed.

## Verify

### Admin
1. Log in as admin → click `🎯 Platform Sponsors` nav tab
2. Empty state appears with "Add platform sponsor" CTA
3. Click button → modal opens with sponsor dropdown (lists existing sponsors)
4. Pick a sponsor (need at least one in `/admin/sponsors` first), set tier=title, save
5. Sponsor appears in the table with status pill

### Public
1. **Homepage** — "PRESENTED BY" hero strip appears between hero section and games
2. **Tournament list (`/tournaments`)** — compact strip below the grid
3. **All public pages** — small grayscale logos in the footer
4. **Footer** — "Partners" link in Company column → links to `/sponsors`
5. **`/sponsors`** — full showcase page with title sponsor card + standard grid

If no active sponsors exist, all strips silently render nothing — no empty placeholders.

## ⚠️ Path assumptions to verify

The integration imports use these relative paths:

- Footer: `../platform-sponsors-strip/platform-sponsors-strip.component`
  (assumes footer at `app/components/footer/`, sibling to platform-sponsors-strip)
- Home: `../../components/platform-sponsors-strip/platform-sponsors-strip.component`
  (assumes home at `app/pages/home/`)
- Tournaments: same as home

If `ng serve` complains "Cannot find module ...", paste the error and I'll fix the path.

## Architecture decisions

- **Reuses existing `sponsors` table** — no duplicate sponsor data. Same Pepsi can sponsor a tournament AND the platform.
- **Tiered storage in `tier` enum** — cleaner than `is_title boolean + is_standard boolean`
- **Title-tier exclusivity enforced by controller** — when you create/promote a title sponsor, any existing title auto-demotes to standard
- **Time window + master kill switch** — `is_active` is paused state. `starts_at`/`ends_at` is the contract window. Both must pass for public display
- **`contract_value_sar` and `internal_notes` never exposed publicly** — separate Resource for public API
- **Strip auto-hides** — `@if (allCount() > 0)` wrapping renders nothing when no sponsors active

## End-to-end test

```
1. php artisan migrate        → creates platform_sponsorships table
2. ng serve                   → frontend reloads
3. /admin/platform-sponsors   → "Add platform sponsor"
4. Pick sponsor, tier=title   → save
5. Visit /                    → "PRESENTED BY" hero strip visible
6. Visit /tournaments         → compact strip below grid
7. Footer (any page)          → tiny grayscale logo
8. Visit /sponsors            → full showcase page
```

## Phase 2 ideas (not built)

- Bulk reorder UI — drag-and-drop within tier (manually edit `display_order` for now)
- Sponsor click tracking — count outbound clicks per sponsor for ROI reports
- Multi-language tagline display based on user locale (Arabic taglines exist in DB but UI shows English only currently)
- Sponsorship expiration alerts — email admin 7 days before `ends_at` so they can renew

---

Prepared: April 2026
Sprint: 14 (Platform Sponsors)
