# AdminMarketplaceController patches for distributor card enhancements

Two changes to your existing `app/Http/Controllers/Api/AdminMarketplaceController.php`:

1. **Replace** the `distributorsIndex()` method
2. **Add** new `testConnection()` method + `maskKey()` helper

The method signatures + imports are shown below — paste them into the
existing class.

---

## Imports — add at top of file (if not already present)

```php
use App\Models\DistributorCredential;
use App\Services\InventoryCodeService;
use Illuminate\Support\Facades\DB;
```

---

## 1. Replace `distributorsIndex()` with this version

Find your current `distributorsIndex` method and replace it entirely.
Signature changes to accept the `InventoryCodeService` via method injection
(Laravel resolves this automatically for controller methods).

```php
/**
 * GET /admin/marketplace/distributors
 *
 * Enhanced in Sprint 12A+: includes per-distributor stock roll-up
 * (inventory products, available codes, delivered last 30d) and
 * credential metadata (masked API key, which fields are populated,
 * last updated timestamp).
 */
public function distributorsIndex(InventoryCodeService $inventory): JsonResponse
{
    $distributors = ['likecard', 'wupex', 'reloadly', 'jawaker'];

    $productCounts = DB::table('digital_products')
        ->select('distributor', DB::raw('COUNT(*) as n'))
        ->groupBy('distributor')
        ->pluck('n', 'distributor')
        ->toArray();

    $stockSummary = $inventory->summaryByDistributor();

    $data = [];
    foreach ($distributors as $key) {
        $activeCred = DistributorCredential::where('distributor', $key)
            ->where('is_active', true)
            ->first();
        $allCreds = DistributorCredential::where('distributor', $key)->get();

        $credentialInfo = null;
        if ($activeCred) {
            $credentialInfo = [
                'api_key_masked'    => $this->maskKey($activeCred->api_key),
                'has_secret'        => !empty($activeCred->api_secret),
                'has_client_id'     => !empty($activeCred->client_id),
                'has_client_secret' => !empty($activeCred->client_secret),
                'updated_at'        => $activeCred->updated_at?->toIso8601String(),
            ];
        }

        $data[] = [
            'distributor'      => $key,
            'display_name'     => ucfirst($key),
            'product_count'    => (int) ($productCounts[$key] ?? 0),
            'health'           => null,
            'credentials'      => $allCreds->toArray(),
            'has_active_creds' => $activeCred !== null,
            'stock_summary'    => $stockSummary[$key] ?? [
                'inventory_products' => 0,
                'available_codes'    => 0,
                'delivered_30d'      => 0,
            ],
            'credential_info'  => $credentialInfo,
        ];
    }

    return response()->json(['data' => $data]);
}
```

---

## 2. Add these two new methods anywhere in the class

```php
/**
 * POST /admin/marketplace/distributors/{distributor}/test-connection
 *
 * Sprint 12A: validates that credentials for the distributor exist
 * and have all required fields populated. Does NOT yet make a real HTTP
 * call to the distributor's API — that depends on the adapter refactor
 * (reading creds from DB instead of .env) coming in Sprint 12B.
 *
 * Always returns 200 — the success/failure state is in the response body.
 */
public function testConnection(string $distributor): JsonResponse
{
    $knownDistributors = ['likecard', 'wupex', 'reloadly', 'jawaker'];
    if (!in_array($distributor, $knownDistributors, true)) {
        return response()->json(['message' => 'Unknown distributor'], 404);
    }

    $cred = DistributorCredential::where('distributor', $distributor)
        ->where('is_active', true)
        ->first();

    if (!$cred) {
        return response()->json([
            'data' => [
                'success'    => false,
                'message'    => 'No active credentials configured.',
                'checked_at' => now()->toIso8601String(),
            ],
        ]);
    }

    // Required credential fields per distributor
    $requirements = [
        'likecard' => ['api_key'],
        'wupex'    => ['api_key', 'api_secret'],
        'reloadly' => ['client_id', 'client_secret'],
        'jawaker'  => ['api_key'],
    ];

    $missing = [];
    foreach ($requirements[$distributor] as $field) {
        if (empty($cred->{$field})) {
            $missing[] = $field;
        }
    }

    if (!empty($missing)) {
        return response()->json([
            'data' => [
                'success'    => false,
                'message'    => 'Missing required fields: ' . implode(', ', $missing),
                'checked_at' => now()->toIso8601String(),
            ],
        ]);
    }

    // All required fields present. Sprint 12B will add a real HTTP ping here.
    return response()->json([
        'data' => [
            'success'    => true,
            'message'    => sprintf(
                '%s credentials valid. Required fields (%s) present. Live API ping will be added in Sprint 12B.',
                ucfirst($distributor),
                implode(', ', $requirements[$distributor])
            ),
            'checked_at' => now()->toIso8601String(),
        ],
    ]);
}

/**
 * Mask an API key for display (first 4 + last 4 chars visible).
 */
private function maskKey(?string $key): string
{
    if (!$key) {
        return '—';
    }
    $len = strlen($key);
    if ($len <= 8) {
        return str_repeat('•', $len);
    }
    return substr($key, 0, 4) . '•••••' . substr($key, -4);
}
```

---

## 3. Route addition

In `routes/api.php`, inside the admin marketplace group, add:

```php
Route::post('distributors/{distributor}/test-connection',
    [AdminMarketplaceController::class, 'testConnection'])
    ->name('distributors.test');
```

Place it near the other distributor routes.

---

## 4. Clear caches

```bash
cd D:\xamp new\htdocs\Dawri\backend
php artisan route:clear
composer dump-autoload
```

Restart Apache.

---

## Verify

```bash
# Route should appear:
php artisan route:list --path=admin/marketplace/distributors
```

Expected:
```
GET    admin/marketplace/distributors
PUT    admin/marketplace/distributors/{distributor}/credentials
DELETE admin/marketplace/distributors/{distributor}/credentials
POST   admin/marketplace/distributors/{distributor}/test-connection  ← NEW
```

Test the endpoint directly:
```bash
curl -X GET http://localhost:8001/api/v1/admin/marketplace/distributors ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response should now include `stock_summary` and `credential_info` on each
distributor object.
