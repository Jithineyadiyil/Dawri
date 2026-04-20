# Dawri Sprint 3 — Tournament Branding, Rules & Cover Images

Three interconnected features delivered in one sprint:

1. **Tournaments page redesign** — listing grid with game-art covers, filter chips, hover animations, skeleton loader, empty states. Detail page gets a cover-image hero banner. Create form is reorganized into 6 numbered sections.
2. **Rules & Conditions** — organizers can attach plain-text rules to any tournament. Players see them on the detail page in an expandable section, and must tick an "I accept" checkbox before the backend will register them.
3. **Per-company + per-tournament branding** — companies on Professional/Enterprise plans can set brand defaults (primary/secondary/accent/background colors + font + logo) that automatically apply to every tournament they run. Organizers can override per-tournament when that's helpful.

Plan gate: branding endpoints require the `white_label` middleware, which accepts Professional + Enterprise subscribers. Admins always pass.

---

## File inventory

### Backend (13 files)

```
backend/database/migrations/
  └── 2026_04_20_000003_add_tournament_branding_and_rules.php     [NEW]

backend/app/Models/
  ├── Company.php                  [extended — brand columns + relations]
  ├── Tournament.php               [extended — cover/rules/brand/company_id]
  └── TournamentParticipant.php    [extended — rules_accepted_at]

backend/app/Services/
  ├── BrandingService.php          [NEW — resolves platform → company → tournament]
  └── CoverImageService.php        [NEW — upload/remove with cleanup]

backend/app/Http/Middleware/
  └── RequiresWhiteLabel.php       [NEW — plan gate for brand endpoints]

backend/app/Http/Requests/
  ├── UploadCoverRequest.php                 [NEW]
  ├── UpdateTournamentBrandingRequest.php    [NEW — hex + font whitelist validation]
  └── UpdateCompanyBrandingRequest.php       [NEW]

backend/app/Http/Resources/
  ├── TournamentResource.php       [extended — brand{}, rules, cover_image_url]
  └── CompanyBrandingResource.php  [NEW]

backend/app/Http/Controllers/Api/
  ├── TournamentController.php     [extended — cover/brand endpoints, rules-aware register]
  └── CompanyController.php        [NEW — mine / brand / logo]

backend/routes/
  └── api.php                      [extended — full replacement]

backend/tests/Feature/
  └── BrandingTest.php             [NEW — 4 cases covering resolution + plan gate]
```

### Frontend (10 files)

```
frontend/src/app/core/services/
  ├── api.service.ts               [extended — BrandPayload, CompanyBranding, 8 new methods]
  └── branding.service.ts          [NEW — applies brand to --gold/--cyan/--bg CSS vars at runtime]

frontend/src/app/pages/tournaments/
  ├── tournaments.component.ts     [NEW LAYOUT — hero, filter chips, search]
  ├── tournaments.component.html   [NEW LAYOUT]
  ├── tournaments.component.scss   [NEW — game-art card backgrounds, stagger entry]
  ├── tournament-detail.component.ts    [extended — BrandingService injection + rules modal]
  ├── tournament-detail.component.html  [extended — hero banner + rules section + rules modal]
  ├── tournament-detail.component.scss  [extended — Sprint 2 preserved, Sprint 3 appended]
  ├── create-tournament.component.ts    [NEW LAYOUT — 6 sections, rules, cover, branding]
  ├── create-tournament.component.html  [NEW LAYOUT]
  └── create-tournament.component.scss  [NEW LAYOUT]

frontend/src/app/pages/settings/company-branding/
  ├── company-branding.component.ts    [NEW — live-preview settings page]
  ├── company-branding.component.html  [NEW]
  └── company-branding.component.scss  [NEW]
```

### Docs (1)

```
docs/
  └── README_SPRINT3.md            [this file]
```

---

## Install order

From the Dawri root on Windows:

```cmd
cd /D "D:\xamp new\htdocs\Dawri"

REM ── Backend ───────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\backend\app\Models\*.php                    backend\app\Models\
xcopy /Y /I <bundle>\backend\app\Services\*.php                  backend\app\Services\
xcopy /Y /I <bundle>\backend\app\Http\Middleware\*.php           backend\app\Http\Middleware\
xcopy /Y /I <bundle>\backend\app\Http\Requests\*.php             backend\app\Http\Requests\
xcopy /Y /I <bundle>\backend\app\Http\Resources\*.php            backend\app\Http\Resources\
xcopy /Y /I <bundle>\backend\app\Http\Controllers\Api\*.php      backend\app\Http\Controllers\Api\
xcopy /Y /I <bundle>\backend\database\migrations\*.php           backend\database\migrations\
xcopy /Y /I <bundle>\backend\routes\api.php                      backend\routes\
xcopy /Y /I <bundle>\backend\tests\Feature\BrandingTest.php      backend\tests\Feature\

REM ── Frontend ──────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\frontend\src\app\core\services\*.ts                       frontend\src\app\core\services\
xcopy /Y /I <bundle>\frontend\src\app\pages\tournaments\*.*                    frontend\src\app\pages\tournaments\
mkdir frontend\src\app\pages\settings\company-branding
xcopy /Y /I <bundle>\frontend\src\app\pages\settings\company-branding\*.*      frontend\src\app\pages\settings\company-branding\
```

## Required Laravel config — register the middleware alias

Edit `backend/bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'admin'        => \App\Http\Middleware\AdminMiddleware::class,
        'white_label'  => \App\Http\Middleware\RequiresWhiteLabel::class,   // ← add this
    ]);
})
```

## Required Angular routing — add the settings route

In `frontend/src/app/app.routes.ts` (or wherever you register routes):

```typescript
{
  path: 'settings/company-branding',
  loadComponent: () =>
    import('./pages/settings/company-branding/company-branding.component')
      .then(m => m.CompanyBrandingComponent),
  canActivate: [authGuard],   // whatever your auth guard is named
},
{
  path: 'tournaments/create',
  loadComponent: () =>
    import('./pages/tournaments/create-tournament.component')
      .then(m => m.CreateTournamentComponent),
  canActivate: [authGuard],
},
```

## Run

```cmd
cd backend
php artisan migrate
php artisan storage:link    (if you haven't already)
php artisan serve --port=8001
```

Frontend auto-reloads with `ng serve`.

---

## API reference

### Tournament cover & branding

| Method | Route                                    | Who | Body |
|--------|------------------------------------------|-----|------|
| POST   | `/tournaments/{id}/cover`                | Organizer | multipart: `file` (image, ≤5MB) |
| DELETE | `/tournaments/{id}/cover`                | Organizer | — |
| PATCH  | `/tournaments/{id}/brand`                | Organizer + white-label plan | `{ brand_override, primary_color, secondary_color, accent_color, background_color, font_family, logo_url }` (all optional) |

### Company branding

| Method | Route                                    | Who | Body |
|--------|------------------------------------------|-----|------|
| GET    | `/companies/mine`                        | Any authenticated user with a company_id | — |
| PATCH  | `/companies/mine/brand`                  | Company member + white-label plan | `{ primary_color, secondary_color, accent_color, background_color, font_family }` |
| POST   | `/companies/mine/logo`                   | Company member + white-label plan | multipart: `file` (image or SVG, ≤2MB) |

### Extended registration

| Method | Route                                    | Body |
|--------|------------------------------------------|------|
| POST   | `/tournaments/{id}/register`             | `{ "accept_rules": true }` — required if the tournament has rules; returns 422 otherwise |

### Extended GET /tournaments/{id}

Response now includes:

```json
{
  "cover_image_url": "http://localhost:8001/storage/tournament-covers/{uuid}/{uuid}.jpg",
  "logo_url": null,
  "rules": "1. Be respectful.\n2. …",
  "has_rules": true,
  "brand_override": false,
  "brand": {
    "primary_color": "#f0a500",
    "secondary_color": "#00e5ff",
    "accent_color": "#22c55e",
    "background_color": "#0b1022",
    "font_family": "Bebas Neue, Rajdhani, sans-serif",
    "logo_url": null,
    "source": "platform"
  },
  "company": {
    "id": "…",
    "name": "…",
    "logo_url": "…"
  },
  "my_participant": {
    "id": "…",
    "rules_accepted_at": "2026-04-20T17:30:00Z"
  }
}
```

The frontend `BrandingService.apply(brand)` consumes the `brand` field and writes it to the document's CSS custom properties (`--gold`, `--cyan`, `--bg`, `--fh`, etc.), re-theming the page for the duration of the visit.

---

## Smoke test

```cmd
REM 1. As organizer, create a tournament with rules
curl -X POST http://localhost:8001/api/v1/tournaments ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Cup\",\"game\":\"ea_fc25\",\"format\":\"single_elimination\",\"max_participants\":8,\"registration_closes_at\":\"2026-05-01T00:00:00Z\",\"starts_at\":\"2026-05-02T00:00:00Z\",\"rules\":\"1. Be fair.\n2. Play clean.\"}"

REM 2. Upload a cover image
curl -X POST http://localhost:8001/api/v1/tournaments/%TID%/cover ^
  -H "Authorization: Bearer %TOKEN%" -F "file=@C:\path\to\cover.jpg"

REM 3. Try to set a brand override as free-plan organizer (expect 403)
curl -X PATCH http://localhost:8001/api/v1/tournaments/%TID%/brand ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"brand_override\":true,\"primary_color\":\"#ff00aa\"}"

REM Expected: { "message": "White-label branding is available on Professional and Enterprise plans.", "required_plans": ["professional","enterprise"] }

REM 4. As player, try to register without accepting rules (expect 422)
curl -X POST http://localhost:8001/api/v1/tournaments/%TID%/register ^
  -H "Authorization: Bearer %PLAYER_TOKEN%" -H "Content-Type: application/json" ^
  -d "{}"

REM Expected: { "message": "You must accept the tournament rules to register.", "rules_required": true }

REM 5. Register with acceptance (expect 201)
curl -X POST http://localhost:8001/api/v1/tournaments/%TID%/register ^
  -H "Authorization: Bearer %PLAYER_TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"accept_rules\":true}"
```

## Run the tests

```cmd
cd backend
php artisan test --filter=BrandingTest
```

Four cases:
- Platform defaults when no plan
- Company brand applied when plan qualifies
- Tournament override wins when enabled
- Endpoint returns 403 for free-plan organizer

---

## UI walkthrough

**1. Listing page** (`/tournaments`)
- Hero title with gradient text, CTA on the right
- Search bar + game chips (with emoji) + format/status chips
- Grid of cards with game-art backgrounds; hovering lifts a card, the CTA chip turns gold
- Live status dot on each card — green pulse for open, red pulse for live
- Skeleton shimmer while loading; illustrated empty state when filters match nothing

**2. Detail page** (`/tournaments/{id}`)
- Hero banner at the top showing the cover image (or game-art gradient if no cover)
- Company logo badge top-right if the tournament's company has a logo
- Tournament brand applied to the whole page via CSS vars — page colors shift to the organizer's palette
- 📜 Rules & Conditions section below the meta strip (collapsible, shows accepted timestamp if you're registered)
- Register button opens a modal with the full rules and a checkbox — can't continue until ticked
- Everything from Sprint 1 (bracket with gold winner paths) and Sprint 2 (match modal with schedule/reschedule/evidence) preserved intact

**3. Create form** (`/tournaments/create`)
- Six numbered sections: Basics → Schedule & Capacity → Rules & Conditions → Cover Image → Branding → Prizes
- Rules section is an 8-row textarea with placeholder showing a sample
- Cover upload shows a dashed drop zone; once chosen, shows a preview with an ✕ remove button
- Branding section is locked for free-plan organizers with a 🔒 badge and an Upgrade CTA
- For eligible plans: toggle switch unlocks color pickers + font dropdown + a live preview swatch row

**4. Company branding settings** (`/settings/company-branding`)
- Two-column layout: form on the left, live preview on the right
- Colors are paired (color picker + hex text input)
- Logo uploader as a companion to the company header
- As you change values, the entire Claude UI previews the brand in real-time (document-level CSS vars)
- Leaving the page resets colors to platform defaults

---

## Known limitations / deferred

- Text-rich rule editing is plain text — Markdown/WYSIWYG is a future enhancement
- Logo URL field in the tournament brand-override is expected to be a full URL; there's no dedicated upload endpoint yet (the company logo has one, per the common case)
- `background_color` is exposed in both company and tournament branding but the SCSS mostly uses `--bg` for surfaces rather than the page body — on a branded page it shifts the mock card and preview panel but not the full page chrome. This is deliberate for readability; if you want full-bleed background override, add `body { background: var(--bg); }` to the global stylesheet
- Route guards are assumed to exist; you'll need to wire in your existing `authGuard` on the new routes
- `frontend-design` styling principles were followed but the listing page doesn't yet use real game-specific photography — it uses CSS gradients. Drop in actual 1920×1080 covers in `public/game-art/{game}.jpg` to upgrade, and reference them in `.game-bg--ea_fc25 { background-image: url('/game-art/ea_fc25.jpg'); }`
