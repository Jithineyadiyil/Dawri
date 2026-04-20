# Dawri Admin Control Panel

## Install

```bash
cd D:\xamp new\htdocs\dawri\backend

# 1. Copy files
copy /Y backend\app\Models\Company.php app\Models\
copy /Y backend\app\Http\Controllers\Api\AdminController.php app\Http\Controllers\Api\
copy /Y backend\app\Http\Middleware\EnsureAdmin.php app\Http\Middleware\
copy /Y backend\database\migrations\2026_04_05_000020_create_companies_table.php database\migrations\
copy /Y backend\database\seeders\CompanySeeder.php database\seeders\

# 2. Run migration
php artisan migrate

# 3. Seed test data (creates admin@dawri.gg + 5 companies)
php artisan db:seed --class=CompanySeeder

# 4. Copy frontend
cd D:\xamp new\htdocs\dawri\frontend
xcopy /Y frontend\src\app\pages\admin src\app\pages\admin\
```

## Add routes to routes/api.php

Inside your `auth:sanctum` group, add:

```php
use App\Http\Controllers\Api\AdminController;

Route::middleware('admin')->prefix('/admin')->group(static function (): void {
    Route::get('/overview', [AdminController::class, 'overview']);
    Route::get('/companies',       [AdminController::class, 'companies']);
    Route::post('/companies',      [AdminController::class, 'createCompany']);
    Route::get('/companies/{id}',  [AdminController::class, 'showCompany']);
    Route::put('/companies/{id}',  [AdminController::class, 'updateCompany']);
    Route::delete('/companies/{id}', [AdminController::class, 'deleteCompany']);
    Route::get('/subscriptions',              [AdminController::class, 'subscriptions']);
    Route::post('/subscriptions',             [AdminController::class, 'createSubscription']);
    Route::put('/subscriptions/{id}',         [AdminController::class, 'updateSubscription']);
    Route::post('/subscriptions/{id}/cancel', [AdminController::class, 'cancelSubscription']);
    Route::post('/subscriptions/{id}/extend', [AdminController::class, 'extendSubscription']);
    Route::get('/users',       [AdminController::class, 'users']);
    Route::put('/users/{id}',  [AdminController::class, 'updateUser']);
    Route::get('/invoices',               [AdminController::class, 'invoices']);
    Route::put('/invoices/{id}/mark-paid', [AdminController::class, 'markInvoicePaid']);
});
```

## Register middleware in bootstrap/app.php

```php
$middleware->alias([
    'admin'              => \App\Http\Middleware\EnsureAdmin::class,
    'subscription'       => \App\Http\Middleware\CheckSubscription::class,
    'subscription.limit' => \App\Http\Middleware\CheckSubscriptionLimit::class,
]);
```

## Add Angular route in app.routes.ts

```ts
{ path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), canActivate: [authGuard] },
```

## Add to User model $fillable

```php
'company_id'
```

## Test

```bash
# Login as admin
curl -X POST http://127.0.0.1:8001/api/v1/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@dawri.gg\",\"password\":\"password\"}"

# Use token to access admin panel
curl -H "Authorization: Bearer {token}" http://127.0.0.1:8001/api/v1/admin/overview
curl -H "Authorization: Bearer {token}" http://127.0.0.1:8001/api/v1/admin/companies
```

## Admin Credentials
- Email: admin@dawri.gg
- Password: password

## Test Companies Seeded
| Company | Plan | Status |
|---------|------|--------|
| Aramco Gaming League | Enterprise (15,000 SAR) | Active |
| STC Esports | Professional (7,499 SAR) | Active |
| NEOM Gaming Hub | Professional (7,499 SAR) | Active |
| KAUST Student League | Professional (trial) | Trial |
| Mobily Play | Starter (2,499 SAR) | Active |
