# Dawri — Sprint 1 Fix Bundle

**Scope.** Resolves the highest-impact bugs found during the real-code review of the `main` branch on 20 Apr 2026. Every fix has been driven by reading the actual source — no speculation. See **Fix inventory** below for file-by-file rationale.

---

## 1. Pre-flight check

Confirm you're on the intended commit and your working tree is clean:

```cmd
cd "D:\xamp new\htdocs\dawri"
git status
git log --oneline -1
```

Expected: `15d96803 main` with no uncommitted changes. If dirty, commit or stash first — the cleanup script deletes files.

Back up the database before running migrations:

```cmd
cd "D:\xamp new\htdocs\dawri\backend"
mysqldump -u root dawri > ..\backup_pre_sprint1.sql
```

---

## 2. Drop files into place

The bundle mirrors the repo's directory layout. From the bundle root:

```cmd
REM Backend PHP files — each one is a full-file replacement
xcopy /Y /I backend\app\Http\Controllers\Api\MatchController.php        "D:\xamp new\htdocs\dawri\backend\app\Http\Controllers\Api\"
xcopy /Y /I backend\app\Http\Controllers\Api\TournamentController.php   "D:\xamp new\htdocs\dawri\backend\app\Http\Controllers\Api\"
xcopy /Y /I backend\app\Http\Controllers\Api\SubscriptionController.php "D:\xamp new\htdocs\dawri\backend\app\Http\Controllers\Api\"
xcopy /Y /I backend\app\Services\BracketAdvancementService.php          "D:\xamp new\htdocs\dawri\backend\app\Services\"
xcopy /Y /I backend\routes\api.php                                      "D:\xamp new\htdocs\dawri\backend\routes\"
xcopy /Y /I backend\bootstrap\app.php                                   "D:\xamp new\htdocs\dawri\backend\bootstrap\"
xcopy /Y /I backend\database\seeders\DatabaseSeeder.php                 "D:\xamp new\htdocs\dawri\backend\database\seeders\"

REM New migration — copied, not overwritten
xcopy /Y /I backend\database\migrations\2026_04_20_000001_add_phone_verified_at_to_users.php "D:\xamp new\htdocs\dawri\backend\database\migrations\"

REM Cleanup scripts
xcopy /Y /I scripts\cleanup.bat "D:\xamp new\htdocs\dawri\scripts\"
```

---

## 3. Delete dead and duplicate files

This is non-negotiable — several of the duplicate files declare the same PHP class twice and will cause `composer dump-autoload` to emit duplicate-class warnings (or crash at runtime in classmap-optimized builds).

```cmd
cd "D:\xamp new\htdocs\dawri"
scripts\cleanup.bat
```

The script is idempotent (safe to re-run) and prints `[skipped]` for anything already gone.

---

## 4. Migrate and reseed

```cmd
cd "D:\xamp new\htdocs\dawri\backend"

REM Apply the phone_verified_at migration (safe — uses Schema::hasColumn guards)
php artisan migrate

REM Reseed with corrected field names and wallet balances in the right column
php artisan db:seed --class=DatabaseSeeder
```

Expected output from the migration:

```
  2026_04_20_000001_add_phone_verified_at_to_users ............... DONE
```

If you want a fully clean slate (**destroys all data**):

```cmd
php artisan migrate:fresh --seed
```

---

## 5. Smoke test — login and tournament register

Start the backend:

```cmd
php artisan serve --port=8001
```

From another terminal, confirm the login that was previously 422'ing now succeeds:

```cmd
curl -X POST http://localhost:8001/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@dawri.gg\",\"password\":\"password\"}"
```

Expected: `200 OK` with `{ "data": { "user": {...}, "token": "1|..." } }`.

Save the token and confirm the previously-404 `/auth/me` now responds:

```cmd
set TOKEN=<paste token here>
curl http://localhost:8001/api/v1/auth/me -H "Authorization: Bearer %TOKEN%"
```

Expected: `200 OK` with the user object.

Confirm the subscription revenue-leak gate:

```cmd
curl -X POST http://localhost:8001/api/v1/subscription ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"plan\":\"enterprise\"}"
```

Expected: `422 Unprocessable Entity` with `"Payment verification failed…"`.

With a valid-looking reference:

```cmd
curl -X POST http://localhost:8001/api/v1/subscription ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"plan\":\"starter\",\"payment_method\":\"card\",\"payment_reference\":\"pay_testref12345\"}"
```

Expected: `201 Created`. (Stub verification — see SubscriptionController @todo for production.)

---

## 6. Schedule the auto-confirm command

The command is now registered in `bootstrap/app.php` but the OS scheduler still needs to call `schedule:run` every minute.

**Dev (Windows terminal):**

```cmd
php artisan schedule:work
```

Leave that terminal running alongside `artisan serve`.

**Production (Linux cron):**

```
* * * * * cd /path/to/backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## Fix inventory

| # | File | Bug fixed |
|---|------|-----------|
| 1 | `backend/database/migrations/2026_04_20_000001_add_phone_verified_at_to_users.php` | **NEW** — adds `phone_verified_at` timestamp to `users` (backfills from legacy `phone_verified` bool). Every consumer in the codebase references this column; without it, `AuthController::verifyOtp()` and `TournamentSeeder` SQL-errored. |
| 2 | `backend/app/Http/Controllers/Api/MatchController.php` | Column-name drift corrected: `screenshot_path` → `result_screenshot_path`, `submitted_by` → `submitted_by_id`, `moderator_note` → `dispute_reason`. Every `POST /matches/{id}/result` was SQL-erroring. Added score range validation and screenshot MIME/size limits. |
| 3 | `backend/app/Http/Controllers/Api/TournamentController.php` | (a) Phone-verification gate on registration (PRD §5.7 requirement). (b) Seed race condition closed via `lockForUpdate` on the Tournament row with the count query inside the transaction. (c) Entry fee now debits via `WalletService` instead of being silently ignored. (d) Consistent `status='registration_open'` default matching the migration. |
| 4 | `backend/app/Http/Controllers/Api/SubscriptionController.php` | **REVENUE LEAK** closed: paid plans now require `payment_reference`. Previously any authenticated user could `POST /subscription { plan:"enterprise" }` and immediately activate Enterprise features (White Label, SAML, HR Integration) with no payment. Verification is a stub (accepts `pay_*` references ≥12 chars) — wire `@todo` in the controller to your real gateway. |
| 5 | `backend/app/Services/BracketAdvancementService.php` | `RankingService` is now injected and called on tournament completion. Previously `PATCH_BracketAdvancementService.php` described this hook in comments but the real service never called it — so `player_rankings` stayed empty and the leaderboard showed no data forever. |
| 6 | `backend/routes/api.php` | Registered `GET /auth/me` (frontend calls it on every session restore — was 404). Routed `/wallet`, `/wallet/topup`, `/wallet/transactions` to `WalletController` (was all pointing at `MarketplaceController` and `/wallet/transactions` was not even registered). Registered match sub-routes (`show`, `moderator-override`) and admin routes that were declared in `AdminController` but unreachable. |
| 7 | `backend/bootstrap/app.php` | `AutoConfirmMatchesCommand` now runs hourly via `withSchedule`. Previously the command existed on disk but was never scheduled, so submitted matches stayed `submitted` indefinitely. |
| 8 | `backend/database/seeders/DatabaseSeeder.php` | (a) Uses `phone_verified_at` instead of the silently-dropped `phone_verified` (which wasn't in `$fillable`). (b) Sets `users.wallet_balance` directly — matches the runtime code path in `MarketplaceController` and `WalletService`. (c) Seeds an `admin@dawri.gg` account that memory said should exist but was missing from the original seeder. (d) Uses `updateOrCreate` so re-running the seeder is idempotent. |
| 9 | `scripts/cleanup.bat` + `cleanup.sh` | Deletes 15 dead/duplicate files (see below). |

### Files deleted by `cleanup.bat`

**Stray shell-fragment zero-byte files** — Windows command-line redirect artifacts:
- `backend/5000])`
- `backend/after('status')`
- `backend/pluck('email')`

**Duplicate class declarations** — three files declare `App\Services\LikecardService`, two declare `App\Services\PaymentService`. PSR-4 picks one; classmap-optimized builds emit duplicate-class warnings:
- `backend/app/Http/Controllers/Api/LikecardService.php`
- `backend/app/Http/Controllers/Api/LikecardService (1).php`  *(Windows download duplicate)*
- `backend/app/Http/Controllers/Api/PaymentService.php`

**Misplaced migration** — a migration class sitting in the controllers directory, never run by Artisan:
- `backend/app/Http/Controllers/Api/create_invoices_table.php`

**Documentation pretending to be code** — `PATCH_` files that are really instructions:
- `backend/app/Services/PATCH_BracketAdvancementService.php`
- `backend/app/Http/Resources/PATCH_TournamentResource.php`
- `frontend/src/app/pages/PATCH_tournaments_leaderboard.ts`

**Unmerged patch stub** — describes itself as "copy these methods into your existing TournamentService", but also uses wrong column names (`entry_fee` not `entry_fee_sar`) so it would SQL-error if wired:
- `backend/app/Services/TournamentRegistrationService.php`

**Unregistered route files** — `bootstrap/app.php` only loads `api.php`, `web.php`, `console.php`. These six files look authoritative but are dead:
- `backend/routes/admin_routes.php`
- `backend/routes/api_dashboard_routes.php`
- `backend/routes/api_marketplace.php`
- `backend/routes/api_new_routes.php`
- `backend/routes/api_tournament_snippet.php`
- `backend/routes/api_tournaments.php`

---

## Known deferrals (Sprint 2)

These were flagged by the review but intentionally **not** addressed in this bundle — they require broader refactors than a single sprint should absorb.

- **Parallel wallet systems.** `users.wallet_balance` (used by `MarketplaceController`, `PaymentService`, `WalletService`) and the `wallets`/`wallet_transactions`/`WalletLedger` trio are both present. This bundle unifies the *runtime* code path on `users.wallet_balance` via the seeder fix and the WalletController routing, but doesn't drop the `wallets` table. Sprint 2 should decide: migrate all consumers to `wallets` + `wallet_transactions` (proper double-entry), or drop the `wallets` table outright.
- **Real payment gateway integration.** `SubscriptionController::verifyPaymentReference()` is a stub. Sprint 2 should integrate Moyasar / Tap Payments / HyperPay and replace the stub.
- **Real SMS provider.** `AuthController::sendOtp()` still logs OTPs instead of dispatching via Unifonic/Taqnyat. Sprint 2 should create `UnifonicService` + `TaqnyatService` with failover.
- **Dispute evidence uploads, waitlist, unregister/refund, player profile page.** All flagged in the Player review spreadsheet from the prior session.

---

## If something breaks

Restore from the pre-sprint backup:

```cmd
cd "D:\xamp new\htdocs\dawri"
mysql -u root dawri < backup_pre_sprint1.sql
git checkout backend\app backend\routes backend\bootstrap backend\database\seeders
git clean -fd backend\database\migrations\2026_04_20_000001_add_phone_verified_at_to_users.php
```

Then paste the failing `curl` response or the `laravel.log` tail into chat and we'll diagnose.
