# Dawri CHANGELOG

## Sprint 5 — 2026-04-21

### Added
- `DistributorInterface` contract (`app/Contracts/`)
- 4 distributor adapters: Likecard, WUPEX, Reloadly, Jawaker
- `DistributorRouter` with priority-ordered failover + 3-strike circuit breaker
- `DistributorHealth` Eloquent model for persistent circuit state
- `PaymentService::refund()` method with sandbox goodwill path
- `PlaceOrderRequest` FormRequest with batch `items[]` support + idempotency_key
- `TopUpRequest` FormRequest with 10-10,000 SAR range validation
- `DigitalProductResource` API Resource (local SVG brand logos)
- `DigitalOrderResource` API Resource (bilingual name_ar)
- `OrderConfirmationNotification` (email + SMS stub channel)
- 24 local SVG brand logos in `frontend/public/brands/`
- Migration: `digital_codes.key_version` for APP_KEY rotation safety
- PHPUnit tests: `DistributorRouterTest`, `PaymentServiceTest`, `MarketplaceApiTest`
- `palette_v3_sweep.ps1` — Windows PowerShell script for hex-value palette migration

### Changed
- `MarketplaceController` fully rewritten: batch checkout, idempotency dedup,
  auto-refund on distributor failure-after-charge, FormRequest validation,
  API Resources, PaymentService integration
- `PaymentService`: card/mada/stc_pay auto-approve in `local/testing/development`
  environments via `app()->environment()` check; wallet charge now wrapped in
  a transaction with row-lock to prevent concurrent deduction races
- `styles.scss` palette tokens — `--gold` now `#a855f7` (violet), `--cyan` now
  `#fbbf24` (amber). Variable NAMES preserved so component SCSS doesn't need
  per-file edits
- Frontend `MarketplaceComponent`:
  - Checkout now sends single batched request (was N sequential)
  - Stable `idempotency_key` generated per checkout attempt
  - `Product` interface declares `distributor`
  - `statusLabel` refactored from per-call object allocation to readonly map
  - `revealCode` response properly typed (removed `as any`)
- `api.service.ts`: added `placeOrderBatch()`, extended `topUpWallet()`
  signature with optional `idempotencyKey`

### Removed
- `app/Http/Controllers/Api/LikecardService.php` (orphan, wrong namespace)
- `app/Http/Controllers/Api/LikecardService (1).php` (duplicate)
- `routes/api_marketplace.php` (unintegrated paste buffer)
- Wikipedia Commons brand logo URLs (replaced with local SVGs)

### Security
- APP_KEY rotation support via `key_version` column on `digital_codes`
- Wallet charge now uses `SELECT ... FOR UPDATE` row lock to prevent
  concurrent-deduction TOCTOU race
- Idempotency key prevents duplicate-order attacks from fast double-click
  or network-retry edge cases
- Sandbox-approval gates explicitly bound to `local/testing/development`
  environments — production requires real gateway configuration to charge

---

## Sprint 4 — 2026-04-20

### Added
- Player profiles page (`/profile`) with nickname + avatar upload
- `User::avatar_url` and `User::display_name` Eloquent accessors
- Role-aware company tournament calendar (`/calendar`)
- `TestPlayerAvatarsSeeder` for seeding demo player avatars + nicknames
- Nav avatar integration (syncs instantly on profile save)

### Fixed
- Leaderboard: avatars never rendered (raw `avatar` column vs. `avatar_url` accessor mismatch)
- Leaderboard: nicknames didn't propagate — now uses User model hydration
- Leaderboard: loss-count double-count risk via two-subquery UNION fan-out
