# Dawri Sprint 5 — Marketplace Overhaul + Palette v3 Sweep

## What this ships

Fixes for **every issue found** in the marketplace audit (bugs 1-6,
missing features 7-12, hygiene 13-16), **distributor abstraction** with
failover and circuit breaker, and a **palette v3 sweep** across the
whole app.

### Bugs resolved

| # | Issue | Fix |
|---|-------|-----|
| 1 | Duplicate `LikecardService.php` files | See `DELETE_THESE_FILES/` |
| 2 | Orphan `routes/api_marketplace.php` | See `DELETE_THESE_FILES/` |
| 3 | Wikipedia brand logos (flaky hotlinks) | Local SVGs in `frontend/public/brands/` |
| 4 | N sequential HTTP requests on checkout | Single batched `items[]` endpoint |
| 5 | No refund on distributor failure | `PaymentService::refund()` + auto-trigger |
| 6 | `APP_KEY` rotation could brick codes | `key_version` column + migration |

### Missing features added

| # | Feature | Where |
|---|---------|-------|
| 7 | Jawaker adapter | `app/Services/Distributors/JawakerAdapter.php` |
| 8 | WUPEX/Reloadly failover + circuit breaker | `DistributorRouter` + `DistributorHealth` |
| 9 | Bilingual names in cart/orders | `DigitalOrderResource` + HTML |
| 10 | Order email/SMS | `OrderConfirmationNotification` |
| 11 | Idempotency on checkout | `idempotency_key` on `PlaceOrderRequest` |
| 12 | Real charge on top-up | `PaymentService::charge()` wired into `topUp()` |

### Hygiene improvements

- 13: `Product` interface now declares `distributor`
- 14: Status labels moved to readonly map (not rebuilt per call)
- 15: `revealCode` response properly typed (no more `as any`)
- 16: Sandbox card payments auto-approved in dev (noted with env guard)

### Palette v3 sweep

- `styles.scss` — `--gold` and `--cyan` variable NAMES preserved but VALUES
  now point to violet (`#a855f7`) and amber (`#fbbf24`). This propagates to
  every component that uses `var(--gold)` / `var(--cyan)` without needing
  per-file edits.
- `palette_v3_sweep.ps1` — patches 11 component files that hardcode
  `#f0a500` / `#00e5ff` as hex literals (not var references), so they
  pick up the new colors too.

---

## Install

### Step 1 — Delete orphan files (bugs 1-2)

```cmd
cd /D "D:\xamp new\htdocs\Dawri\backend"
del "app\Http\Controllers\Api\LikecardService.php"
del "app\Http\Controllers\Api\LikecardService (1).php"
del "routes\api_marketplace.php"
```

(See `DELETE_THESE_FILES/README.md` for the "why" on each.)

### Step 2 — Drop in new backend files

```
backend/app/Contracts/DistributorInterface.php
backend/app/Services/DistributorRouter.php
backend/app/Services/PaymentService.php
backend/app/Services/Distributors/LikecardAdapter.php
backend/app/Services/Distributors/WupexAdapter.php
backend/app/Services/Distributors/ReloadlyAdapter.php
backend/app/Services/Distributors/JawakerAdapter.php
backend/app/Models/DistributorHealth.php
backend/app/Notifications/OrderConfirmationNotification.php
backend/app/Http/Requests/PlaceOrderRequest.php
backend/app/Http/Requests/TopUpRequest.php
backend/app/Http/Resources/DigitalProductResource.php
backend/app/Http/Resources/DigitalOrderResource.php
backend/app/Http/Controllers/Api/MarketplaceController.php   [REPLACE]
backend/database/migrations/2026_04_21_000001_add_key_version_to_digital_codes.php
```

### Step 3 — Run the migration

```cmd
cd backend
php artisan migrate
```

### Step 4 — Add distributor config to `config/services.php`

Add these keys — leave empty strings for now, fill in real credentials when
you get them:

```php
'likecard' => [
    'url'        => env('LIKECARD_URL',        'https://api.like4card.com/v1'),
    'api_key'    => env('LIKECARD_API_KEY',    ''),
    'agent_code' => env('LIKECARD_AGENT_CODE', ''),
],
'wupex' => [
    'url'     => env('WUPEX_URL',     'https://api.wupex.com/v1'),
    'api_key' => env('WUPEX_API_KEY', ''),
],
'reloadly' => [
    'auth_url'      => env('RELOADLY_AUTH_URL',      'https://auth.reloadly.com/oauth/token'),
    'url'           => env('RELOADLY_URL',           'https://giftcards.reloadly.com'),
    'client_id'     => env('RELOADLY_CLIENT_ID',     ''),
    'client_secret' => env('RELOADLY_CLIENT_SECRET', ''),
],
'jawaker' => [
    'url'     => env('JAWAKER_URL',     'https://partners.jawaker.com/api/v1'),
    'api_key' => env('JAWAKER_API_KEY', ''),
],
```

### Step 5 — Drop in frontend files

```
frontend/src/styles.scss                                     [REPLACE]
frontend/src/app/core/services/api.service.ts                [REPLACE]
frontend/src/app/pages/marketplace/marketplace.component.ts  [REPLACE]
frontend/src/app/pages/marketplace/marketplace.component.html [REPLACE]
frontend/src/app/pages/marketplace/marketplace.component.scss [REPLACE]
frontend/public/brands/                                      [ADD 24 SVGs]
```

### Step 6 — Run the palette sweep script

```powershell
cd "D:\xamp new\htdocs\Dawri"
powershell -ExecutionPolicy Bypass -File palette_v3_sweep.ps1
```

### Step 7 — Restart and test

```cmd
cd frontend
REM Ctrl+C the current ng serve, then:
ng serve
```

Hard-refresh the browser (`Ctrl+Shift+F5`). The app should now be violet/amber
end-to-end. Marketplace should show local SVG brand logos, batched checkout
should work, and top-up should require a card entry first.

---

## Verification smoke tests

### 1. Batched checkout

```cmd
curl -X POST http://localhost:8001/api/v1/marketplace/orders ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"items\":[{\"product_id\":\"abc\",\"qty\":2}],\"payment_method\":\"wallet\",\"idempotency_key\":\"test-123\"}"
```

Expected: single 201 response with 2 orders in `data[]` and
`summary: { total_lines: 2, completed: 2, failed: 0 }`.

### 2. Idempotency

Re-run the same curl command immediately with the same `idempotency_key`.
Expected: 200 with `idempotent: true` — no duplicate orders created.

### 3. Top-up now requires charge

```cmd
curl -X POST http://localhost:8001/api/v1/wallet/topup ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"amount\":100,\"payment_method\":\"card\"}"
```

Expected in dev: 200 with new balance. Expected in prod without gateway
config: 402 with "Card payment gateway not configured."

### 4. Circuit breaker

```sql
SELECT * FROM distributor_health;
```

After 3 failed distributor attempts in a row, the row for that distributor
should have `circuit_status = 'open'`. After 5 minutes, it flips to
`half-open` on the next attempt.

---

## Known limitations

- **Distributor adapters are stubs** — WUPEX, Reloadly, and Jawaker return
  "not configured" until you fill in credentials. The Likecard adapter
  falls back to a deterministic STUB response in dev mode so the full flow
  can be tested without real credentials.
- **SMS is logged, not sent** — `OrderConfirmationNotification::toSms()`
  writes to `storage/logs/laravel.log`. Wire up Unifonic/Taqnyat in
  `App\Broadcasting\SmsChannel` to go live.
- **Card payment in sandbox auto-approves** — controlled by
  `app()->environment()` check. Production deploys need a real gateway
  integration (Moyasar / Tap / HyperPay).

---

## 📋 Deliverable Summary

| Field         | Detail |
|---|---|
| Purpose       | Marketplace overhaul + palette v3 sweep |
| Inputs        | Cart items, payment method, idempotency key |
| Outputs       | Digital order rows with encrypted codes; wallet charges/refunds |
| Edge Cases    | Distributor failure after charge → refund; double-click retry → idempotent; APP_KEY rotation → key_version column |
| Test Strategy | PHPUnit (service + feature tests in /tests) · Manual smoke tests above |
| Standards     | PSR-12 · SOLID · Angular Style Guide · strict types · FormRequest validation |
