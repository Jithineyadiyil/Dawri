# Sprint 10 — Organizer-created Sponsors

Organizers can now create their own sponsor brand entries (with logo upload + website + contact info) directly from their tournament's "Manage Sponsors" section. No admin intervention required to use them on their own tournaments.

## Scope model (Option B)

- **Admin-created** sponsors are `is_global = true` — visible to every organizer in their catalog dropdown
- **Organizer-created** sponsors are `is_global = false` — visible ONLY to their creator (plus admins) until an admin promotes them
- **Admin can "Promote"** a scoped sponsor from `/admin/sponsors` → it becomes global and appears in everyone's catalog

## What's in this delivery

### Backend (10 files)
- `database/migrations/2026_04_22_000002_add_scoped_sponsors_columns.php` — NEW — adds `created_by_user_id` + `is_global` columns, backfills existing rows as global
- `app/Models/Sponsor.php` — REPLACES — adds `createdBy()` relation + `visibleTo()` scope
- `app/Http/Requests/StoreOrganizerSponsorRequest.php` — NEW — validation for organizer create
- `app/Http/Controllers/Api/OrganizerSponsorController.php` — NEW — create, update, uploadLogo
- `app/Http/Controllers/Api/SponsorController.php` — REPLACES — adds `promote()` + `demote()` methods, cleans up a leftover broken method from the old repo
- `app/Http/Controllers/Api/SponsorshipController.php` — REPLACES (unchanged from Sprint 9) — kept for dependency completeness
- `app/Http/Controllers/Api/TournamentSponsorshipController.php` — REPLACES — catalog filters by visibility scope
- `app/Http/Resources/SponsorResource.php` — REPLACES — exposes `is_global` publicly + admin-only `created_by_user_id`
- `app/Services/SponsorshipService.php` — REPLACES (unchanged from Sprint 9) — kept for dependency completeness
- `routes/api.php` — REPLACES — 5 new routes

### Frontend (6 files)
- `shared/tournament-sponsors-manage/*.{ts,html,scss}` — REPLACES — adds "+ Create new sponsor" button, modal with file upload, "Private" pill for scoped sponsors in the dropdown
- `pages/admin/admin-sponsors.component.*` — REPLACES — adds Visibility column (Global/Private badge), Promote button on scoped rows

## Install

1. Extract the ZIP into `D:\xamp new\htdocs\Dawri\`
2. Run the migration:
   ```cmd
   cd /D "D:\xamp new\htdocs\Dawri\backend"
   php artisan migrate
   ```
3. Ensure the public storage symlink exists (probably already done for marketplace avatars):
   ```cmd
   php artisan storage:link
   ```
4. Refresh Laravel:
   ```cmd
   composer dump-autoload
   php artisan optimize:clear
   ```
5. Restart Angular dev server (needed because new files exist):
   ```cmd
   REM in your ng serve window
   Ctrl+C
   ng serve --port=4300
   ```

## New API endpoints

### Organizer-facing (authenticated, role ∈ {admin, organizer})
- `POST /api/v1/sponsors` — create a new sponsor brand
  - Admin → is_global=true (goes to global catalog)
  - Organizer → is_global=false (scoped to their tournaments only)
- `PATCH /api/v1/sponsors/{sponsor}` — update own sponsor (or any if admin)
- `POST /api/v1/sponsors/{sponsor}/logo` — multipart file upload (PNG/JPG/SVG/WebP, 2 MB max)

### Admin-facing (new under /admin)
- `POST /api/v1/admin/sponsors/{sponsor}/promote` — flip is_global=true
- `POST /api/v1/admin/sponsors/{sponsor}/demote` — flip is_global=false (requires a creator)

## Logo upload internals

- Stored in `storage/app/public/sponsor-logos/{sponsor-uuid}.{ext}`
- Public URL served via `/storage/sponsor-logos/...` (requires `storage:link`)
- When a sponsor's logo is replaced, the previous file is deleted to avoid orphans
- Both client-side and server-side validate file type + size

## Permission matrix (updated)

| Who | Create sponsor brand | Own sponsor visible | Edit own sponsor | Promote to global | Create deal |
|---|:---:|:---:|:---:|:---:|:---:|
| Admin | ✅ (is_global=true) | Everyone | ✅ | ✅ | ✅ (any state) |
| Organizer | ✅ (is_global=false, scoped) | Self + admin only | ✅ | ❌ | ✅ (as `pending`) |
| Player | ❌ | — | ❌ | ❌ | ❌ |

## The organizer journey

1. Organizer navigates to their tournament detail page
2. Scrolls to "🤝 Tournament Sponsors" section → clicks **+ Propose sponsor**
3. In the sponsor dropdown → sees global sponsors (Red Bull, Logitech, etc.) + any they've created
4. Their own sponsors show `(private)` suffix so they know those aren't in global catalog yet
5. If the brand isn't listed → clicks **+ Create new sponsor** next to the field label
6. Modal opens: fills name, website, uploads logo, etc. → Save
7. Sponsor is created instantly, logo uploaded, auto-selected in the deal form
8. Organizer fills deal details, submits → deal goes to admin for approval
9. Admin reviews in `/admin/sponsors`:
   - On the **Sponsors** tab: can click **Promote** on the new brand to make it available to all organizers
   - On the **Deals** tab: can approve the deal proposal (Sprint 9 flow unchanged)

## Commit

```cmd
cd /D "D:\xamp new\htdocs\Dawri"
git add -A
git commit -m "feat(sprint10): organizer-created sponsors with logo upload and admin promotion"
git push
```
