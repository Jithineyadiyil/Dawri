# Dawri Sprint 1 — v2 Addendum (Migration Conflict Fix)

This addendum fixes two duplicate-`CREATE TABLE` migrations that caused your `php artisan migrate` run to fail with:

```
SQLSTATE[42S01]: Base table or view already exists: 1050
Table 'digital_products' already exists
```

## What was wrong

Four tables were being created twice:

| Table | First migration | Second migration |
|-------|-----------------|------------------|
| `digital_products` | `2026_01_01_000001_create_dawri_tables` (old schema: `distributor_id`, `margin_pct`, no `sort_order`) | `2026_04_08_create_marketplace_tables` (new schema: `distributor_product_id`, `sort_order`, indexes) |
| `digital_orders` | same pair | same pair |
| `digital_codes` | same pair | same pair |
| `invoices` | `2026_04_05_000010_create_subscription_tables` (full schema) | `2026_04_09_101222_create_invoices_table` (simplified — missing invoice_number, VAT, period, payment_method) |

The runtime code (`MarketplaceController`, `SubscriptionController`) uses fields from the **newer** schemas. So I rewrote the two conflicting migrations to be idempotent: they now detect existing tables and patch only the missing columns, instead of crashing.

## Files in this addendum

| File | Action |
|------|--------|
| `backend/database/migrations/2026_04_08_create_marketplace_tables.php` | **Replace** — now create-or-patch |
| `backend/database/migrations/2026_04_09_101222_create_invoices_table.php` | **Replace** — now create-or-patch |
| `scripts/migrate_recover.bat` | **New** — unstick a stalled migration run |

## Install

From the bundle root, running on your Windows machine:

```cmd
cd "D:\xamp new\htdocs\dawri"

REM Drop the two replacement migrations into place
xcopy /Y /I backend\database\migrations\2026_04_08_create_marketplace_tables.php   "D:\xamp new\htdocs\dawri\backend\database\migrations\"
xcopy /Y /I backend\database\migrations\2026_04_09_101222_create_invoices_table.php "D:\xamp new\htdocs\dawri\backend\database\migrations\"

REM Drop the recovery script
xcopy /Y /I scripts\migrate_recover.bat "D:\xamp new\htdocs\dawri\scripts\"
```

## Run the recovery

```cmd
scripts\migrate_recover.bat
```

The script will:
1. Clear Laravel's config cache (so the new migration code is picked up fresh)
2. Print the current migration status (shows which are Pending vs Ran)
3. Pause — review the status table, then press any key to continue
4. Run `php artisan migrate` against the now-idempotent migrations
5. Verify the schema has all the expected columns (`phone_verified_at`, `distributor_product_id`, `sort_order`, etc.)

Expected output at the end:

```
digital_products has distributor_product_id: YES
digital_products has sort_order: YES
users has phone_verified_at: YES
invoices exists: YES
```

## Then seed

```cmd
cd backend
php artisan db:seed --class=DatabaseSeeder
```

## Why idempotent?

The two rewritten migrations use `Schema::hasTable()` and `Schema::hasColumn()` guards throughout. That means:

- On a **fresh install** (no tables): they `CREATE TABLE` with the new, correct schema.
- On your **current install** (tables already created by the initial migration): they `ALTER TABLE` to add the missing columns and indexes, leaving existing columns and data untouched.
- On a **re-run** (e.g., after `migrate:rollback` then `migrate` again): they skip work that's already done.

The `digital_products` rewrite also **backfills** `distributor_product_id` from the old `distributor_id` column when both are present, so existing seeded products continue to work with the new code path in `MarketplaceController::products()`.

## If the recovery still fails

The most likely remaining cause would be that another CREATE collides further down the migration chain. Run:

```cmd
cd backend
php artisan migrate:status
```

and paste the full output here. We'll spot the next conflict and patch it the same way.
