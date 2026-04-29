# routes/api.php — one-line patch

## Add the import

At top of `routes/api.php`, add:

```php
use App\Http\Controllers\Api\AdminDashboardController;
```

## Add the route

Inside the admin middleware group in `routes/api.php` (the block starting
`Route::prefix('admin')->middleware('admin')->group(function () {`),
add this line near the `overview` route:

```php
Route::get('/dashboard', [AdminDashboardController::class, 'index']);
```

Place it right after the existing `overview` route for logical grouping.

That's the entire backend wiring.

## Clear caches

```cmd
cd "D:\xamp new\htdocs\Dawri\backend"
php artisan route:clear
composer dump-autoload
```

Restart Apache.

## Verify the route registered

```cmd
php artisan route:list --path=admin/dashboard
```

Expected:
```
GET|HEAD  api/v1/admin/dashboard
```

## Verify the endpoint works

```cmd
curl -X GET http://localhost:8001/api/v1/admin/dashboard ^
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Expected: a big JSON blob with `data.kpis`, `data.charts`, `data.activity`,
`data.alerts`, `data.generated_at`.
