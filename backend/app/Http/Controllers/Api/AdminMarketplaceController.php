<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDigitalProductRequest;
use App\Http\Requests\UpdateDistributorCredentialRequest;
use App\Http\Resources\AdminOrderResource;
use App\Http\Resources\DistributorCredentialResource;
use App\Models\DigitalOrder;
use App\Models\DigitalProduct;
use App\Models\DistributorCredential;
use App\Models\DistributorHealth;
use App\Models\ProductCode;
use App\Services\InventoryCodeService;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * AdminMarketplaceController
 *
 * Sprint 12A+ detail-modal polish:
 *   - orderShow returns distributor_order_id, admin_notes, idempotency_key,
 *     delivered code info (masked), and linked inventory ProductCode (if any)
 *   - orderRefund accepts optional void_code param — when true and the
 *     order has an inventory-sourced ProductCode, mark the code as
 *     expired so it can't be re-counted in stock rollups
 */
class AdminMarketplaceController extends Controller
{
    public function __construct(private readonly PaymentService $payments)
    {
    }

    // ═══════════════════════════════════════════════════════════════════
    // STATS
    // ═══════════════════════════════════════════════════════════════════

    public function stats(): JsonResponse
    {
        $totals = DB::table('digital_orders')
            ->selectRaw('
                COUNT(*)                                           AS total_orders,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END)  AS completed,
                SUM(CASE WHEN status = "failed"    THEN 1 ELSE 0 END)  AS failed,
                SUM(CASE WHEN status = "refunded"  THEN 1 ELSE 0 END)  AS refunded,
                SUM(CASE WHEN status = "completed" THEN total_price ELSE 0 END) AS gross_revenue
            ')
            ->first();

        $daily = DB::table('digital_orders')
            ->selectRaw('DATE(created_at) AS day, COUNT(*) AS orders, SUM(total_price) AS revenue')
            ->where('created_at', '>=', now()->subDays(7)->startOfDay())
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        $topProducts = DB::table('digital_orders')
            ->selectRaw('product_id, COUNT(*) AS order_count, SUM(total_price) AS revenue')
            ->where('status', 'completed')
            ->groupBy('product_id')
            ->orderByDesc('order_count')
            ->limit(5)
            ->get()
            ->map(function ($row) {
                $product = DigitalProduct::find($row->product_id);
                return [
                    'product_id'  => $row->product_id,
                    'name'        => $product?->name ?? 'Deleted product',
                    'brand'       => $product?->brand,
                    'order_count' => (int) $row->order_count,
                    'revenue'     => (float) $row->revenue,
                ];
            });

        return response()->json([
            'data' => [
                'totals' => [
                    'total_orders'  => (int) ($totals->total_orders ?? 0),
                    'completed'     => (int) ($totals->completed ?? 0),
                    'failed'        => (int) ($totals->failed ?? 0),
                    'refunded'      => (int) ($totals->refunded ?? 0),
                    'gross_revenue' => (float) ($totals->gross_revenue ?? 0),
                ],
                'daily_last_7_days' => $daily,
                'top_products'      => $topProducts,
            ],
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // DASHBOARD — Sprint 13
    // ═══════════════════════════════════════════════════════════════════

    /**
     * GET /admin/marketplace/dashboard
     *
     * Focused dashboard payload for the marketplace admin landing tab.
     * Returns KPIs, 7-day order + revenue series, top-selling products,
     * distributor health summary, and alerts — all scoped to digital
     * storefront operations (no subscription/tournament noise).
     *
     * Response shape:
     * {
     *   data: {
     *     kpis: {
     *       orders_today, orders_week, orders_month,
     *       revenue_today, revenue_month,
     *       completed_30d, failed_30d, refunded_30d
     *     },
     *     charts: { labels: string[], orders: int[], revenue: float[] },
     *     top_products: [ {id, name, brand, units_sold, revenue} ],
     *     distributor_summary: [ {distributor, circuit_status,
     *       failure_count, last_failure, product_count, available_codes} ],
     *     alerts: [ {severity, title, detail, link, count} ],
     *     generated_at: ISO8601
     *   }
     * }
     */
    public function dashboard(): JsonResponse
    {
        $now    = now();
        $today  = $now->copy()->startOfDay();
        $week   = $now->copy()->subDays(7)->startOfDay();
        $month  = $now->copy()->startOfMonth();
        $d30    = $now->copy()->subDays(30)->startOfDay();

        // ── KPIs ────────────────────────────────────────────────────
        $kpis = [
            'orders_today' => (int) DigitalOrder::where('created_at', '>=', $today)->count(),
            'orders_week'  => (int) DigitalOrder::where('created_at', '>=', $week)->count(),
            'orders_month' => (int) DigitalOrder::where('created_at', '>=', $month)->count(),

            'revenue_today' => (float) DigitalOrder::where('status', 'completed')
                ->where('created_at', '>=', $today)->sum('total_price'),
            'revenue_month' => (float) DigitalOrder::where('status', 'completed')
                ->where('created_at', '>=', $month)->sum('total_price'),

            'completed_30d' => (int) DigitalOrder::where('status', 'completed')
                ->where('created_at', '>=', $d30)->count(),
            'failed_30d'    => (int) DigitalOrder::where('status', 'failed')
                ->where('created_at', '>=', $d30)->count(),
            'refunded_30d'  => (int) DigitalOrder::where('status', 'refunded')
                ->where('created_at', '>=', $d30)->count(),
        ];

        // ── 7-day charts (zero-filled) ─────────────────────────────
        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $days[] = $now->copy()->subDays($i)->toDateString();
        }

        $ordersRaw = DigitalOrder::query()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as n')
            ->where('created_at', '>=', $now->copy()->subDays(7)->startOfDay())
            ->groupBy('day')->pluck('n', 'day')->toArray();

        $revenueRaw = DigitalOrder::query()
            ->selectRaw('DATE(created_at) as day, COALESCE(SUM(total_price), 0) as rev')
            ->where('status', 'completed')
            ->where('created_at', '>=', $now->copy()->subDays(7)->startOfDay())
            ->groupBy('day')->pluck('rev', 'day')->toArray();

        $labels = $orders = $revenue = [];
        foreach ($days as $d) {
            $labels[]  = date('M j', strtotime($d));
            $orders[]  = (int) ($ordersRaw[$d] ?? 0);
            $revenue[] = round((float) ($revenueRaw[$d] ?? 0), 2);
        }

        // ── Top-selling products (last 30 days, completed only) ─────
        $topProducts = DigitalOrder::query()
            ->where('status', 'completed')
            ->where('created_at', '>=', $d30)
            ->select(
                'product_id',
                DB::raw('SUM(quantity) as units_sold'),
                DB::raw('SUM(total_price) as revenue'),
            )
            ->groupBy('product_id')
            ->orderByDesc('revenue')
            ->limit(10)
            ->with('product:id,name,brand')
            ->get()
            ->map(fn ($row) => [
                'id'         => $row->product_id,
                'name'       => $row->product?->name ?? 'Unknown',
                'brand'      => $row->product?->brand ?? '—',
                'units_sold' => (int) $row->units_sold,
                'revenue'    => round((float) $row->revenue, 2),
            ])
            ->values()
            ->all();

        // ── Distributor summary ─────────────────────────────────────
        $distributorNames   = ['likecard', 'wupex', 'reloadly', 'jawaker'];
        $distributorSummary = [];

        foreach ($distributorNames as $name) {
            $health = DistributorHealth::find($name);
            $productCount = DigitalProduct::where('distributor', $name)->count();

            $availableCodes = ProductCode::query()
                ->join('digital_products', 'digital_products.id', '=', 'product_codes.product_id')
                ->where('digital_products.distributor', $name)
                ->where('product_codes.status', 'available')
                ->where(function ($q) {
                    $q->whereNull('product_codes.expires_at')
                      ->orWhere('product_codes.expires_at', '>', now());
                })
                ->count();

            $distributorSummary[] = [
                'distributor'     => $name,
                'circuit_status'  => $health?->circuit_status ?? 'closed',
                'failure_count'   => (int) ($health?->failure_count ?? 0),
                'last_failure'    => $health?->last_failure_at?->toIso8601String(),
                'product_count'   => $productCount,
                'available_codes' => $availableCodes,
            ];
        }

        // ── Alerts ──────────────────────────────────────────────────
        $alerts = [];

        // Low stock — inventory products at or below threshold
        $lowStock = DB::table('digital_products as dp')
            ->select(
                'dp.id', 'dp.name', 'dp.brand', 'dp.low_stock_threshold',
                DB::raw('(SELECT COUNT(*) FROM product_codes pc
                          WHERE pc.product_id = dp.id
                          AND pc.status = "available"
                          AND (pc.expires_at IS NULL OR pc.expires_at > CURDATE())) AS avail'),
            )
            ->where('dp.fulfillment_mode', 'inventory')
            ->where('dp.is_active', true)
            ->get()
            ->filter(fn ($r) => (int) $r->avail <= (int) $r->low_stock_threshold);

        foreach ($lowStock as $row) {
            $severity = (int) $row->avail === 0 ? 'critical' : 'warning';
            $alerts[] = [
                'severity' => $severity,
                'title'    => $severity === 'critical'
                                ? "Out of stock: {$row->name}"
                                : "Low stock: {$row->name}",
                'detail'   => "{$row->avail} of {$row->low_stock_threshold} threshold · {$row->brand}",
                'link'     => '/admin/marketplace',
                'count'    => (int) $row->avail,
            ];
        }

        // Open circuits
        $openCircuits = DistributorHealth::where('circuit_status', 'open')->get();
        foreach ($openCircuits as $h) {
            $alerts[] = [
                'severity' => 'critical',
                'title'    => "Circuit open: {$h->distributor}",
                'detail'   => "{$h->failure_count} consecutive failures",
                'link'     => '/admin/marketplace',
                'count'    => (int) $h->failure_count,
            ];
        }

        // Stuck processing
        $stuck = DigitalOrder::where('status', 'processing')
            ->where('created_at', '<', now()->subHour())->count();
        if ($stuck > 0) {
            $alerts[] = [
                'severity' => 'warning',
                'title'    => "{$stuck} order(s) stuck in processing",
                'detail'   => 'Orders stuck for over 1 hour — likely fulfillment failure',
                'link'     => '/admin/marketplace',
                'count'    => $stuck,
            ];
        }

        // Failed orders in last 24h
        $failed24h = DigitalOrder::where('status', 'failed')
            ->where('created_at', '>=', now()->subDay())->count();
        if ($failed24h > 0) {
            $alerts[] = [
                'severity' => 'warning',
                'title'    => "{$failed24h} failed order(s) in last 24h",
                'detail'   => 'Check distributor health and refund status',
                'link'     => '/admin/marketplace',
                'count'    => $failed24h,
            ];
        }

        // Sort: critical first, then warning, then info
        usort($alerts, function ($a, $b) {
            $order = ['critical' => 0, 'warning' => 1, 'info' => 2];
            return $order[$a['severity']] <=> $order[$b['severity']];
        });

        return response()->json([
            'data' => [
                'kpis'                => $kpis,
                'charts'              => [
                    'labels'  => $labels,
                    'orders'  => $orders,
                    'revenue' => $revenue,
                ],
                'top_products'        => $topProducts,
                'distributor_summary' => $distributorSummary,
                'alerts'              => $alerts,
                'generated_at'        => $now->toIso8601String(),
            ],
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // PRODUCTS CRUD
    // ═══════════════════════════════════════════════════════════════════

    public function productsIndex(Request $request): JsonResponse
    {
        $query = DigitalProduct::query()->orderBy('sort_order')->orderBy('name');

        if ($b = $request->string('brand')->toString())    $query->where('brand', $b);
        if ($c = $request->string('category')->toString()) $query->where('category', $c);
        if ($d = $request->string('distributor')->toString()) $query->where('distributor', $d);
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }
        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name',    'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('brand',   'like', "%{$search}%");
            });
        }

        $perPage = (int) min(max($request->integer('per_page', 30), 1), 1000);
        $products = $query->paginate($perPage);

        $products->getCollection()->transform(function (DigitalProduct $p) {
            $margin = $p->our_cost && $p->our_cost > 0
                ? round((($p->our_price - $p->our_cost) / $p->our_price) * 100, 2)
                : null;

            return [
                'id'                     => $p->id,
                'distributor'            => $p->distributor,
                'distributor_product_id' => $p->distributor_product_id,
                'name'                   => $p->name,
                'name_ar'                => $p->name_ar,
                'brand'                  => $p->brand,
                'category'               => $p->category,
                'face_value'             => (float) $p->face_value,
                'currency'               => $p->currency,
                'our_cost'               => $p->our_cost !== null ? (float) $p->our_cost : null,
                'our_price'              => (float) $p->our_price,
                'margin_pct'             => $margin,
                'region'                 => $p->region,
                'image_url'              => $p->image_url,
                'is_active'              => (bool) $p->is_active,
                'sort_order'             => (int) $p->sort_order,
                'fulfillment_mode'       => $p->fulfillment_mode ?? 'api',
                'low_stock_threshold'    => (int) ($p->low_stock_threshold ?? 5),
                'auto_hide_when_empty'   => (bool) ($p->auto_hide_when_empty ?? true),
                'created_at'             => $p->created_at?->toIso8601String(),
            ];
        });

        return response()->json($products);
    }

    public function productStore(StoreDigitalProductRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['id'] ??= (string) Str::uuid();
        if (! array_key_exists('distributor_id', $data) && isset($data['distributor'])) {
            $data['distributor_id'] = $data['distributor'];
        }
        $product = DigitalProduct::create($data);
        return response()->json([
            'data'    => $product->fresh(),
            'message' => 'Product created.',
        ], Response::HTTP_CREATED);
    }

    public function productUpdate(StoreDigitalProductRequest $request, DigitalProduct $product): JsonResponse
    {
        $data = $request->validated();
        if (array_key_exists('distributor', $data)) {
            $data['distributor_id'] = $data['distributor'];
        }
        $product->update($data);
        return response()->json([
            'data'    => $product->fresh(),
            'message' => 'Product updated.',
        ]);
    }

    public function productDestroy(DigitalProduct $product): JsonResponse
    {
        $product->update(['is_active' => false]);
        return response()->json(['message' => 'Product deactivated.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // ORDERS — read + refund
    // ═══════════════════════════════════════════════════════════════════

    public function ordersIndex(Request $request): JsonResponse
    {
        $query = DigitalOrder::with(['user', 'product'])
            ->orderByDesc('created_at');

        if ($s = $request->string('status')->toString()) $query->where('status', $s);
        if ($u = $request->string('user_id')->toString()) $query->where('user_id', $u);
        if ($p = $request->string('product_id')->toString()) $query->where('product_id', $p);
        if ($d = $request->string('distributor')->toString()) $query->where('distributor', $d);

        if ($from = $request->string('from')->toString()) $query->where('created_at', '>=', $from);
        if ($to   = $request->string('to')->toString())   $query->where('created_at', '<=', $to);

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', fn ($u) => $u
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%"))
                  ->orWhereHas('product', fn ($p) => $p->where('name', 'like', "%{$search}%"));
            });
        }

        $perPage = (int) min(max($request->integer('per_page', 30), 1), 1000);
        $orders = $query->paginate($perPage);
        $orders->setCollection(AdminOrderResource::collection($orders->getCollection())->collection);

        return response()->json($orders);
    }

    /**
     * GET /admin/marketplace/orders/{order}
     *
     * Sprint 12A+ — richer payload than the list view. Includes:
     *   - distributor_order_id, idempotency_key, admin_notes
     *   - Delivered code details (masked + revealed_at)
     *   - Linked inventory ProductCode (if the order was inventory-sourced)
     *
     * Returns a flat custom shape so the admin modal has everything it
     * needs in one request; the list view still uses AdminOrderResource.
     */
    public function orderShow(DigitalOrder $order): JsonResponse
    {
        $order->load(['user', 'product', 'code']);

        return response()->json([
            'data' => $this->orderDetailPayload($order),
        ]);
    }

    /**
     * POST /admin/marketplace/orders/{order}/refund
     *
     * Sprint 12A+: accepts `void_code` (bool, optional, default false).
     * When true AND the order has a linked inventory ProductCode, the
     * code's status is flipped to `expired` so it won't appear in
     * available-stock counts again. For API-sourced orders the flag
     * is ignored (noted in admin_notes).
     */
    public function orderRefund(Request $request, DigitalOrder $order): JsonResponse
    {
        $data = $request->validate([
            'reason'     => ['required', 'string', 'min:3', 'max:500'],
            'notes'      => ['nullable', 'string', 'max:2000'],
            'void_code'  => ['sometimes', 'boolean'],
        ]);

        if ($order->status === 'refunded') {
            $order->load(['user', 'product', 'code']);
            return response()->json([
                'data'    => $this->orderDetailPayload($order),
                'message' => 'Order is already refunded.',
            ]);
        }

        if (! in_array($order->status, ['completed', 'failed'], true)) {
            return response()->json([
                'message' => "Only completed or failed orders can be refunded. Current status: {$order->status}.",
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $voidRequested  = (bool) ($data['void_code'] ?? false);
        $voidedCodeNote = null;

        try {
            DB::transaction(function () use ($order, $data, $request, $voidRequested, &$voidedCodeNote) {
                $this->payments->refund($order);

                if ($voidRequested) {
                    $productCode = ProductCode::where('reserved_by_order_id', $order->id)->first();
                    if ($productCode && $productCode->status === ProductCode::STATUS_DELIVERED) {
                        $productCode->update(['status' => ProductCode::STATUS_EXPIRED]);
                        $voidedCodeNote = "Inventory code {$productCode->id} voided (marked expired).";
                    } else {
                        $voidedCodeNote = 'Void requested but no eligible inventory code found (API-sourced or already voided).';
                    }
                }

                $auditLine = '[' . now()->toDateTimeString() . ' by '
                    . ($request->user()?->name ?? 'admin') . '] '
                    . ($data['notes'] ?? '');
                if ($voidedCodeNote) {
                    $auditLine .= "\n  > {$voidedCodeNote}";
                }

                $order->update([
                    'status'        => 'refunded',
                    'refunded_at'   => now(),
                    'refund_reason' => $data['reason'],
                    'admin_notes'   => trim(($order->admin_notes ? $order->admin_notes . "\n\n" : '') . $auditLine),
                ]);
            });
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Refund failed: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $order->refresh()->load(['user', 'product', 'code']);

        return response()->json([
            'data'    => $this->orderDetailPayload($order),
            'message' => 'Order refunded.' . ($voidedCodeNote ? ' ' . $voidedCodeNote : ''),
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // DISTRIBUTORS
    // ═══════════════════════════════════════════════════════════════════

    public function distributorsIndex(InventoryCodeService $inventory): JsonResponse
    {
        $stockSummary = $inventory->summaryByDistributor();

        $rows = [];
        foreach (DistributorCredential::SUPPORTED as $key) {
            $health       = DistributorHealth::find($key);
            $credentials  = DistributorCredential::where('distributor', $key)->get();
            $activeCred   = $credentials->firstWhere('is_active', true);
            $productCount = DigitalProduct::where('distributor', $key)->where('is_active', true)->count();

            $credentialInfo = null;
            if ($activeCred) {
                $credentialInfo = [
                    'api_key_masked'    => $this->maskKey($activeCred->api_key),
                    'has_secret'        => !empty($activeCred->api_secret),
                    'has_client_id'     => !empty($activeCred->client_id),
                    'has_client_secret' => !empty($activeCred->client_secret),
                    'environment'       => $activeCred->environment ?? 'production',
                    'updated_at'        => $activeCred->updated_at?->toIso8601String(),
                ];
            }

            $rows[] = [
                'distributor'      => $key,
                'display_name'     => ucfirst($key),
                'product_count'    => $productCount,
                'health' => $health ? [
                    'is_active'       => (bool) $health->is_active,
                    'circuit_status'  => $health->circuit_status,
                    'failure_count'   => (int) $health->failure_count,
                    'last_success_at' => $health->last_success_at?->toIso8601String(),
                    'last_failure_at' => $health->last_failure_at?->toIso8601String(),
                ] : null,
                'credentials'      => DistributorCredentialResource::collection($credentials),
                'has_active_creds' => $activeCred !== null,
                'stock_summary'    => $stockSummary[$key] ?? [
                    'inventory_products' => 0,
                    'available_codes'    => 0,
                    'delivered_30d'      => 0,
                ],
                'credential_info'  => $credentialInfo,
            ];
        }

        return response()->json(['data' => $rows]);
    }

    public function credentialsUpdate(
        UpdateDistributorCredentialRequest $request,
        string $distributor,
    ): JsonResponse {
        if (! in_array($distributor, DistributorCredential::SUPPORTED, true)) {
            return response()->json(['message' => 'Unknown distributor.'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->validated();
        $env  = $data['environment'] ?? 'production';

        $creds = DistributorCredential::firstOrNew([
            'distributor' => $distributor,
            'environment' => $env,
        ]);

        foreach (['api_key', 'api_secret', 'client_id', 'client_secret'] as $field) {
            if (! empty($data[$field] ?? null)) {
                $creds->{$field} = $data[$field];
            }
        }
        if (array_key_exists('base_url', $data))  $creds->base_url  = $data['base_url'];
        if (array_key_exists('is_active', $data)) $creds->is_active = (bool) $data['is_active'];
        $creds->updated_by_user_id = $request->user()?->id;
        $creds->save();

        if ($creds->is_active) {
            DistributorCredential::where('distributor', $distributor)
                ->where('id', '!=', $creds->id)
                ->update(['is_active' => false]);
        }

        return response()->json([
            'data'    => new DistributorCredentialResource($creds->fresh()->load('updatedBy')),
            'message' => 'Credentials saved.',
        ]);
    }

    public function credentialsDestroy(string $distributor, DistributorCredential $credential): JsonResponse
    {
        if ($credential->distributor !== $distributor) {
            return response()->json(['message' => 'Credential does not belong to this distributor.'],
                Response::HTTP_NOT_FOUND);
        }
        $credential->delete();
        return response()->json(['message' => 'Credentials deleted.']);
    }

    public function credentialsDestroyAll(string $distributor): JsonResponse
    {
        if (! in_array($distributor, DistributorCredential::SUPPORTED, true)) {
            return response()->json(['message' => 'Unknown distributor.'], Response::HTTP_NOT_FOUND);
        }
        $count = DistributorCredential::where('distributor', $distributor)->delete();
        return response()->json([
            'message' => "Removed {$count} credential row(s).",
            'data'    => ['distributor' => $distributor, 'removed_count' => $count],
        ]);
    }

    public function testConnection(string $distributor): JsonResponse
    {
        if (! in_array($distributor, DistributorCredential::SUPPORTED, true)) {
            return response()->json(['message' => 'Unknown distributor.'], Response::HTTP_NOT_FOUND);
        }

        $cred = DistributorCredential::where('distributor', $distributor)
            ->where('is_active', true)
            ->first();

        if (! $cred) {
            return response()->json([
                'data' => [
                    'success'    => false,
                    'message'    => 'No active credentials configured.',
                    'checked_at' => now()->toIso8601String(),
                ],
            ]);
        }

        $requirements = [
            'likecard' => ['api_key'],
            'wupex'    => ['api_key', 'api_secret'],
            'reloadly' => ['client_id', 'client_secret'],
            'jawaker'  => ['api_key'],
        ];

        $missing = [];
        foreach ($requirements[$distributor] ?? ['api_key'] as $field) {
            if (empty($cred->{$field})) {
                $missing[] = $field;
            }
        }

        if (! empty($missing)) {
            return response()->json([
                'data' => [
                    'success'    => false,
                    'message'    => 'Missing required fields: ' . implode(', ', $missing),
                    'checked_at' => now()->toIso8601String(),
                ],
            ]);
        }

        return response()->json([
            'data' => [
                'success'    => true,
                'message'    => sprintf(
                    '%s credentials valid. Required fields (%s) present. Live API ping will be added in Sprint 12B.',
                    ucfirst($distributor),
                    implode(', ', $requirements[$distributor] ?? ['api_key'])
                ),
                'checked_at' => now()->toIso8601String(),
            ],
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Build the rich order detail payload. Used by orderShow and orderRefund.
     */
    private function orderDetailPayload(DigitalOrder $order): array
    {
        // Plain DigitalCode (Sprint 5) — reveals to the user via a separate endpoint.
        // Admin view shows masked + revealed status only.
        $codePayload = null;
        if ($order->code) {
            $raw = null;
            try {
                // Most models expose decrypted value via `code` accessor.
                // Fall back to code_enc if not.
                $raw = $order->code->code ?? $order->code->code_enc ?? null;
            } catch (Throwable) {
                $raw = null;
            }
            $codePayload = [
                'id'          => $order->code->id,
                'masked'      => $this->maskCode($raw),
                'full'        => $raw, // admin-only; frontend gates display behind a "show" toggle
                'revealed_at' => $order->code->revealed_at?->toIso8601String(),
                'created_at'  => $order->code->created_at?->toIso8601String(),
                'expires_at'  => $order->code->expires_at?->toIso8601String(),
            ];
        }

        // Linked inventory ProductCode (Sprint 12A). Only present for
        // inventory-mode orders.
        $inventoryCodePayload = null;
        $productCode = ProductCode::where('reserved_by_order_id', $order->id)->first();
        if ($productCode) {
            $inventoryCodePayload = [
                'id'            => $productCode->id,
                'batch_id'      => $productCode->batch_id,
                'serial_number' => $productCode->serial_number,
                'status'        => $productCode->status,
                'delivered_at'  => $productCode->delivered_at?->toIso8601String(),
                'reserved_at'   => $productCode->reserved_at?->toIso8601String(),
                'expires_at'    => $productCode->expires_at?->toIso8601String(),
                'can_void'      => $productCode->status === ProductCode::STATUS_DELIVERED,
            ];
        }

        return [
            'id'                   => $order->id,
            'user_id'              => $order->user_id,
            'user_name'            => $order->user?->name,
            'user_email'           => $order->user?->email,
            'product_id'           => $order->product_id,
            'product_name'         => $order->product?->name,
            'product_brand'        => $order->product?->brand,
            'distributor'          => $order->distributor,
            'distributor_order_id' => $order->distributor_order_id,
            'idempotency_key'      => $order->idempotency_key ?? null,
            'quantity'             => (int) $order->quantity,
            'unit_price'           => (float) $order->unit_price,
            'total_price'          => (float) $order->total_price,
            'status'               => $order->status,
            'payment_method'       => $order->payment_method,
            'payment_ref'          => $order->payment_ref,
            'fulfilled_at'         => $order->fulfilled_at?->toIso8601String(),
            'refunded_at'          => $order->refunded_at?->toIso8601String(),
            'refund_reason'        => $order->refund_reason,
            'admin_notes'          => $order->admin_notes,
            'created_at'           => $order->created_at?->toIso8601String(),
            'code'                 => $codePayload,
            'inventory_code'       => $inventoryCodePayload,
        ];
    }

    /**
     * Mask a delivered code: shows first 4 + last 4 chars. Empty/null → '—'.
     */
    private function maskCode(?string $code): string
    {
        if (! $code) {
            return '—';
        }
        $len = strlen($code);
        if ($len <= 8) {
            return str_repeat('•', $len);
        }
        return substr($code, 0, 4) . str_repeat('•', max(4, $len - 8)) . substr($code, -4);
    }

    private function maskKey(?string $key): string
    {
        if (! $key) {
            return '—';
        }
        $len = strlen($key);
        if ($len <= 8) {
            return str_repeat('•', $len);
        }
        return substr($key, 0, 4) . '•••••' . substr($key, -4);
    }
}
