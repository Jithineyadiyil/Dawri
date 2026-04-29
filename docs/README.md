# Sprint 11 Phase 1 — Admin Marketplace Panel + Distributor Credentials

An admin-facing control panel over the existing marketplace module, plus a UI-managed distributor credentials system (keys encrypted in DB instead of `.env`).

## What this ships

### New capabilities (admin-only)
- **Products tab** — CRUD over `digital_products` with search, filter by brand/category/distributor, margin calculation
- **Orders tab** — paginated order queue with filters, drill-in drawer with full details, one-click refund (wallet credit + audit trail)
- **Distributors tab** — per-distributor card showing circuit breaker health, active credentials, last-test status; admin can add/edit/delete credentials for each distributor across sandbox + production environments
- **Overview stats** — total orders, completed, failed, gross revenue at the top of the page
- **Credentials management** — API keys encrypted at rest via Laravel's `encrypted` cast, revealed on-demand in the UI, "one active per distributor" enforced automatically

### Tech debt cleanup baked in
- Removed the duplicate `Route::post('sponsors/{sponsor}/promote', ...)` entry in `routes/api.php` that referenced a non-existent `promoteToGlobal` method

### NOT in this ship (planned for Phase 2)
- External "vendor" role with self-service product listings
- Vendor-submitted products approval workflow
- Revenue share tracking
- The `DELETE_THESE_FILES` orphan cleanup (3 orphan PHP files) — safer to do separately since they're independent of this work

## File map

### Backend (7 files)

| ZIP path | Destination |
|---|---|
| `backend/database/migrations/2026_04_22_000003_create_distributor_credentials_and_order_refund_columns.php` | Same path (NEW) |
| `backend/app/Models/DistributorCredential.php` | Same (NEW) |
| `backend/app/Http/Controllers/Api/AdminMarketplaceController.php` | Same (NEW) |
| `backend/app/Http/Requests/StoreDigitalProductRequest.php` | Same (NEW) |
| `backend/app/Http/Requests/UpdateDistributorCredentialRequest.php` | Same (NEW) |
| `backend/app/Http/Resources/AdminOrderResource.php` | Same (NEW) |
| `backend/app/Http/Resources/DistributorCredentialResource.php` | Same (NEW) |
| `backend/routes/api.php` | Same (REPLACES — adds import + 12 new routes + fixes duplicate promote route bug) |

### Frontend (5 files)

| ZIP path | Destination |
|---|---|
| `frontend/src/app/pages/admin/marketplace/admin-marketplace.component.ts` | Same (NEW) |
| `frontend/src/app/pages/admin/marketplace/admin-marketplace.component.html` | Same (NEW) |
| `frontend/src/app/pages/admin/marketplace/admin-marketplace.component.scss` | Same (NEW) |
| `frontend/src/app/app.routes.ts` | Same (REPLACES — adds `/admin/marketplace` route before `/admin`) |
| `frontend/src/app/pages/admin/admin.component.ts` | Same (REPLACES — adds "🛒 Marketplace" tab link) |

## Install

1. Extract ZIP into `D:\xamp new\htdocs\Dawri\`
2. Run the migration:
   ```cmd
   cd /D "D:\xamp new\htdocs\Dawri\backend"
   php artisan migrate
   ```
   This adds:
   - New `distributor_credentials` table
   - 3 new columns on `digital_orders` (`refunded_at`, `refund_reason`, `admin_notes`)
3. Refresh Laravel:
   ```cmd
   composer dump-autoload
   php artisan optimize:clear
   ```
4. Restart Apache in XAMPP (to flush Opcache)
5. Restart Angular dev server (new files in `src/app/pages/admin/marketplace/` need a full restart):
   ```cmd
   ng serve --port=4300
   ```

## API endpoints added

All under `/api/v1/admin/marketplace` — require admin role via middleware:

```
GET    /stats                                              Overview counters + 7-day trend
GET    /products                                           Paginated, filterable product list
POST   /products                                           Create new product
PATCH  /products/{product}                                 Update product
DELETE /products/{product}                                 Deactivate (soft-delete)

GET    /orders                                             Paginated order queue with filters
GET    /orders/{order}                                     Drill-in with full detail
POST   /orders/{order}/refund                              Refund (wallet credit + audit)

GET    /distributors                                       List all 4 with health + credentials
PUT    /distributors/{distributor}/credentials             Upsert credentials for a distributor+env
DELETE /distributors/{distributor}/credentials/{credential} Remove a credential set
```

## How credentials work

Before Sprint 11, distributor API keys lived in `.env`:
```env
LIKECARD_API_KEY=sk-...
WUPEX_API_KEY=wpx_...
RELOADLY_CLIENT_ID=...
RELOADLY_CLIENT_SECRET=...
```

That meant every key rotation required editing the server's `.env` file and restarting Apache.

Sprint 11 moves them to `distributor_credentials` table, with each value encrypted at rest using Laravel's `encrypted` cast (AES-256-CBC, tied to `APP_KEY`):

- Admin pastes the new key in the UI
- Value is encrypted and stored
- When an adapter needs a key, it calls `DistributorCredential::forActive('likecard')` and gets back a model with auto-decrypted accessors
- Rotation takes seconds, no restart required

**IMPORTANT (Phase 2):** the 4 existing adapters (`LikecardAdapter`, `WupexAdapter`, `ReloadlyAdapter`, `JawakerAdapter`) still read from `env()` — they need to be updated to prefer `DistributorCredential::forActive(...)` with fallback to `env()` for backward compatibility. Shipping that change in this phase would tangle too many concerns. For Phase 1, the UI works but the keys it saves are ignored at runtime until the adapters are updated.

This is a deliberate trade-off: you can test and validate the UI first, then migrate adapter reads in a follow-up that's pure renaming with no new surface area.

## Permission model (unchanged — admin only)

| Route | Who can use |
|---|---|
| `/api/v1/admin/marketplace/*` | Admin only (enforced by `admin` middleware) |

The admin middleware checks `user.role === 'admin'`. Players, organizers, and vendors (when added in Phase 2) cannot access any of these endpoints.

## Testing checklist

After install, test as `admin@dawri.gg / password`:

1. Nav to `/admin` → click new **🛒 Marketplace** tab → loads `/admin/marketplace`
2. **Products tab**:
   - Table lists 98 seeded products with margin column populated
   - Filter by category → list narrows
   - Click Edit on any row → modal opens with pre-filled form → change name → Save → table refreshes
   - Click Deactivate → product flips to inactive (greyed out in table)
3. **Orders tab**:
   - Table lists recent orders (paginated if >30)
   - Click any row → right-side drawer slides in with full detail
   - For a completed order, the Refund section appears → enter reason → click Refund → status flips to `refunded`, user's wallet is credited
4. **Distributors tab**:
   - 4 distributor cards render with circuit breaker dots
   - Click "+ Add credentials" on any → modal opens
   - Enter `api_key`, `base_url`, check Active → Save → credentials row appears masked (`sk-****1234`)
   - Click Edit → secrets come through redacted as dots → click "Reveal" to expose → modify → Save

## Commit

```cmd
cd /D "D:\xamp new\htdocs\Dawri"
git add -A
git commit -m "feat(sprint11): admin marketplace panel + distributor credentials (Phase 1)"
git push
```

## What's next (Phase 2 preview)

Now that admin can see and manage the marketplace, Phase 2 adds external vendors:

- New `vendor` role alongside `admin`/`organizer`/`player`
- Vendor signup + dashboard
- Vendor-submitted products with admin approval workflow
- Revenue split schema (platform cut vs vendor cut)
- Updated `DistributorRouter` that prefers `DistributorCredential::forActive()` over `env()`

Let me know when you're ready to tackle that, and whether Phase 2 should wait until you've validated Phase 1 in production.
