# Sprint 7 — Contact & Privacy Pages

## What's in this delivery

- **ContactComponent** — `/contact` route, public
- **PrivacyComponent** — `/privacy` route, public
- **Updated footer** — 3 `href="#"` placeholders replaced with real `routerLink` bindings; also added Leaderboard link to the Platform column
- **Updated app.routes.ts** — two new lazy-loaded routes registered

8 files total. Zero backend changes, zero schema changes, no package.json updates. All files follow your existing standalone Angular 17 + `OnPush` + ReactiveFormsModule + palette-v3 patterns.

## Why these pages

Your footer was referencing `Contact` and `Privacy` with `href="#"` — which means clicking them reloaded the homepage with a `#` fragment. Not broken exactly, but not right. For a platform operating in Saudi Arabia (PDPL-regulated), the Privacy page is a compliance requirement before you can launch publicly.

## File map

| File you save | Destination |
|---|---|
| `frontend/src/app/pages/contact/contact.component.ts` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\contact\contact.component.ts` (NEW) |
| `frontend/src/app/pages/contact/contact.component.html` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\contact\contact.component.html` (NEW) |
| `frontend/src/app/pages/contact/contact.component.scss` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\contact\contact.component.scss` (NEW) |
| `frontend/src/app/pages/privacy/privacy.component.ts` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\privacy\privacy.component.ts` (NEW) |
| `frontend/src/app/pages/privacy/privacy.component.html` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\privacy\privacy.component.html` (NEW) |
| `frontend/src/app/pages/privacy/privacy.component.scss` | `D:\xamp new\htdocs\Dawri\frontend\src\app\pages\privacy\privacy.component.scss` (NEW) |
| `frontend/src/app/shared/components/footer/footer.component.html` | `D:\xamp new\htdocs\Dawri\frontend\src\app\shared\components\footer\footer.component.html` (REPLACE) |
| `frontend/src/app/app.routes.ts` | `D:\xamp new\htdocs\Dawri\frontend\src\app\app.routes.ts` (REPLACE) |

You need to create `pages/contact/` and `pages/privacy/` directories first — they don't exist yet.

## Install

```cmd
cd /D "D:\xamp new\htdocs\Dawri\frontend\src\app\pages"
mkdir contact
mkdir privacy
```

Then drop the files into their destinations. No build-time change needed — the routes are lazy-loaded, Angular picks them up from the updated `app.routes.ts` automatically.

```cmd
REM If ng serve is running, it will hot-reload.
REM If not:
cd /D "D:\xamp new\htdocs\Dawri\frontend"
ng serve --port=4300
```

## What to verify in the browser

Navigate to:
- `/contact` — hero with gradient title, form on the left, contact info on the right
- `/privacy` — hero, sticky TOC on the left, 12 sections of content on the right
- Any page's footer — Contact and Privacy links now navigate properly (no more `#`)

## Contact page features

- **Reactive form** with 4 fields: name, email, subject (7 options), message (10–1000 chars)
- **Live character counter** on the message textarea
- **Client-side validation** — errors show in red on touch/dirty
- **Simulated submit** — 700ms delay, then success toast and form reset
- **Sidebar info card** with bilingual contact details (email, phone, address, hours)
- **Social chips** — Twitter, Instagram, LinkedIn, Discord
- **Links to Privacy** in the form's fine-print

The backend endpoint (`POST /api/v1/contact`) is not yet implemented. There's a TODO comment in `onSubmit()` marking the Sprint 8 replacement. For now the form is UX-complete but messages aren't persisted.

## Privacy page features

- **Sticky Table of Contents** — 12 sections, click to smooth-scroll
- **PDPL-aware content** — covers all 7 Saudi Personal Data Protection Law rights
- **Bilingual title + last-updated date** (English + Arabic)
- **DPO contact card** with mailto, physical address, and SDAIA complaint pathway
- **Honest scope notes** — Dawri's actual data flows (tournaments, wallet, HR integrations, payment gateways) referenced correctly

## Caveats

- **Privacy content is a reasonable baseline, not legal advice.** Have counsel review before production launch.
- **All contact details are placeholders** — `+966 55 000 0000`, `support@dawri.gg`, `King Fahd Road, Al Olaya, Riyadh 12211`. Update to real coordinates when known. Edit `contact.component.ts` → `company` object.
- **Social URLs are placeholders** — `twitter.com/dawri_gg`, etc. Replace with real handles.
- **About page still placeholder** (`href="#"` in footer). Scope was Contact + Privacy only; let me know if you want About too.
- **No i18n switcher yet.** Pages are English-primary with Arabic accents. If/when you add a proper `@ngx-translate/core` or `@angular/localize` setup, this page will need refactoring.

## Commit

```cmd
cd /D "D:\xamp new\htdocs\Dawri"
git add -A
git commit -m "feat(sprint7): add /contact and /privacy pages; fix footer links"
git push
```
