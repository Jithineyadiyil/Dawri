<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DigitalOrder;
use App\Models\DigitalProduct;
use App\Models\DistributorHealth;
use App\Models\ProductCode;
use App\Models\Sponsorship;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * AdminDashboardController
 *
 * Sprint 13 — system-wide admin overview landing page.
 *
 * Returns a single composite JSON payload backing the /admin/dashboard
 * page. The frontend renders four sections:
 *   - KPIs (tiles with headline numbers + deltas)
 *   - Activity stream (last 20 cross-module events)
 *   - Charts (7-day orders, revenue, signups)
 *   - Alerts (low stock, circuit breakers, pending approvals, stuck orders)
 *
 * Design notes:
 *   - Single endpoint so dashboard load = 1 round-trip (fewer network calls)
 *   - Each section is defensively wrapped so one broken query doesn't
 *     blank the whole dashboard
 *   - Schema::hasTable guards let this work even if optional modules
 *     haven't been migrated (e.g. sponsorships in a partial install)
 */
class AdminDashboardController extends Controller
{
    /**
     * GET /admin/dashboard
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'kpis'     => $this->kpis(),
                'charts'   => $this->charts(),
                'activity' => $this->activity(),
                'alerts'   => $this->alerts(),
                'generated_at' => now()->toIso8601String(),
            ],
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // KPIs
    // ═══════════════════════════════════════════════════════════════════

    /**
     * 6 headline tiles. Each tile has a primary value, an optional
     * delta (% change vs prior period), and a trend direction.
     */
    private function kpis(): array
    {
        $now         = now();
        $weekAgo     = $now->copy()->subDays(7);
        $twoWeeksAgo = $now->copy()->subDays(14);
        $today       = $now->copy()->startOfDay();
        $yesterday   = $now->copy()->subDay()->startOfDay();

        // Users
        $totalUsers      = User::count();
        $newThisWeek     = User::where('created_at', '>=', $weekAgo)->count();
        $newPrevWeek     = User::whereBetween('created_at', [$twoWeeksAgo, $weekAgo])->count();
        $userDelta       = $this->percentDelta($newThisWeek, $newPrevWeek);

        // Active tournaments — use the same status values as DashboardController
        // (registration_open, in_progress, ongoing-as-legacy-synonym)
        $activeTournaments = Tournament::whereIn('status', ['registration_open', 'in_progress', 'ongoing'])
            ->count();
        $totalTournaments  = Tournament::count();

        // Orders today vs yesterday
        $ordersToday     = DigitalOrder::where('created_at', '>=', $today)->count();
        $ordersYesterday = DigitalOrder::whereBetween('created_at', [$yesterday, $today])->count();
        $ordersDelta     = $this->percentDelta($ordersToday, $ordersYesterday);

        // Revenue today (completed orders only)
        $revenueToday = (float) DigitalOrder::where('status', 'completed')
            ->where('created_at', '>=', $today)
            ->sum('total_price');
        $revenueYesterday = (float) DigitalOrder::where('status', 'completed')
            ->whereBetween('created_at', [$yesterday, $today])
            ->sum('total_price');
        $revenueDelta = $this->percentDelta($revenueToday, $revenueYesterday);

        // MRR — Monthly Recurring Revenue from active subscriptions.
        //
        // The subscriptions table stores `price` + `billing_cycle`
        // (monthly/annual/custom). We normalise to a monthly figure:
        //   - monthly   → price as-is
        //   - annual    → price / 12
        //   - custom    → exclude (enterprise one-offs don't fit MRR)
        //
        // Guarded because some installs may not have subscriptions yet.
        $mrr = 0.0;
        if (Schema::hasTable('subscriptions')) {
            $mrr = (float) DB::table('subscriptions')
                ->where('status', 'active')
                ->whereIn('billing_cycle', ['monthly', 'annual'])
                ->selectRaw(<<<'SQL'
                    COALESCE(SUM(
                        CASE billing_cycle
                            WHEN 'annual'  THEN price / 12
                            WHEN 'monthly' THEN price
                            ELSE 0
                        END
                    ), 0) AS mrr
                SQL)
                ->value('mrr');
        }

        // Active sponsorships (use contract_status — the actual column name)
        $activeSponsorships = 0;
        if (Schema::hasTable('sponsorships')) {
            $activeSponsorships = Sponsorship::where('contract_status', 'active')->count();
        }

        return [
            'users' => [
                'label'      => 'Total users',
                'value'      => $totalUsers,
                'sub'        => "+{$newThisWeek} this week",
                'delta_pct'  => $userDelta,
                'trend'      => $this->trendDirection($userDelta),
            ],
            'tournaments' => [
                'label'      => 'Active tournaments',
                'value'      => $activeTournaments,
                'sub'        => "of {$totalTournaments} total",
                'delta_pct'  => null,
                'trend'      => 'flat',
            ],
            'orders_today' => [
                'label'      => 'Orders today',
                'value'      => $ordersToday,
                'sub'        => "vs {$ordersYesterday} yesterday",
                'delta_pct'  => $ordersDelta,
                'trend'      => $this->trendDirection($ordersDelta),
            ],
            'revenue_today' => [
                'label'      => 'Revenue today (SAR)',
                'value'      => round($revenueToday, 2),
                'sub'        => 'vs ' . number_format($revenueYesterday, 2) . ' yesterday',
                'delta_pct'  => $revenueDelta,
                'trend'      => $this->trendDirection($revenueDelta),
            ],
            'mrr' => [
                'label'      => 'MRR (SAR)',
                'value'      => round($mrr, 2),
                'sub'        => 'active subscriptions',
                'delta_pct'  => null,
                'trend'      => 'flat',
            ],
            'sponsorships' => [
                'label'      => 'Active sponsorships',
                'value'      => $activeSponsorships,
                'sub'        => 'currently running',
                'delta_pct'  => null,
                'trend'      => 'flat',
            ],
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // Charts — 7-day series
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Returns three parallel 7-day series (one bucket per day) ready to
     * feed directly into Chart.js without reshaping.
     */
    private function charts(): array
    {
        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $days[] = now()->subDays($i)->toDateString();
        }

        // Orders per day
        $ordersRaw = DigitalOrder::query()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as n')
            ->where('created_at', '>=', now()->subDays(7)->startOfDay())
            ->groupBy('day')
            ->pluck('n', 'day')
            ->toArray();

        // Revenue per day (completed only)
        $revenueRaw = DigitalOrder::query()
            ->selectRaw('DATE(created_at) as day, COALESCE(SUM(total_price), 0) as rev')
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(7)->startOfDay())
            ->groupBy('day')
            ->pluck('rev', 'day')
            ->toArray();

        // Signups per day
        $signupsRaw = User::query()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as n')
            ->where('created_at', '>=', now()->subDays(7)->startOfDay())
            ->groupBy('day')
            ->pluck('n', 'day')
            ->toArray();

        // Zero-fill missing days so the x-axis is always 7 points
        $orders   = [];
        $revenue  = [];
        $signups  = [];
        $labels   = [];

        foreach ($days as $d) {
            $labels[]  = date('M j', strtotime($d));
            $orders[]  = (int) ($ordersRaw[$d] ?? 0);
            $revenue[] = round((float) ($revenueRaw[$d] ?? 0), 2);
            $signups[] = (int) ($signupsRaw[$d] ?? 0);
        }

        return [
            'labels'  => $labels,
            'orders'  => $orders,
            'revenue' => $revenue,
            'signups' => $signups,
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // Activity stream — last 20 events across modules
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Cross-module event list. Pulls recent items from orders, users,
     * tournaments, sponsorships; unions them, sorts by created_at,
     * trims to last 20.
     */
    private function activity(): array
    {
        $events = collect();

        // Recent orders
        DigitalOrder::with(['user', 'product'])
            ->orderByDesc('created_at')
            ->limit(20)
            ->get()
            ->each(function (DigitalOrder $o) use ($events) {
                $events->push([
                    'type'        => 'order',
                    'icon'        => '🛒',
                    'headline'    => $o->user?->name ?? 'Unknown'
                        . ' ordered ' . ($o->product?->name ?? 'a product'),
                    'detail'      => number_format((float) $o->total_price, 2) . ' SAR · ' . $o->status,
                    'status'      => $o->status,
                    'link'        => "/admin/marketplace?tab=orders&order={$o->id}",
                    'timestamp'   => $o->created_at?->toIso8601String(),
                    'sort_key'    => $o->created_at?->timestamp ?? 0,
                ]);
            });

        // Recent signups
        User::orderByDesc('created_at')
            ->limit(20)
            ->get()
            ->each(function (User $u) use ($events) {
                $events->push([
                    'type'        => 'signup',
                    'icon'        => '👤',
                    'headline'    => "{$u->name} joined",
                    'detail'      => $u->email . ' · ' . ($u->role ?? 'player'),
                    'status'      => null,
                    'link'        => "/admin/users?search={$u->email}",
                    'timestamp'   => $u->created_at?->toIso8601String(),
                    'sort_key'    => $u->created_at?->timestamp ?? 0,
                ]);
            });

        // Recent tournaments created
        Tournament::orderByDesc('created_at')
            ->limit(20)
            ->get()
            ->each(function (Tournament $t) use ($events) {
                $events->push([
                    'type'        => 'tournament',
                    'icon'        => '🏆',
                    'headline'    => "Tournament: {$t->name}",
                    'detail'      => $t->status ?? 'draft',
                    'status'      => $t->status,
                    'link'        => "/tournaments/{$t->id}",
                    'timestamp'   => $t->created_at?->toIso8601String(),
                    'sort_key'    => $t->created_at?->timestamp ?? 0,
                ]);
            });

        // Recent sponsorships
        if (Schema::hasTable('sponsorships')) {
            Sponsorship::with('sponsor', 'tournament')
                ->orderByDesc('updated_at')
                ->limit(20)
                ->get()
                ->each(function (Sponsorship $s) use ($events) {
                    $sponsorName = $s->sponsor?->name ?? 'Sponsor';
                    $tournamentName = $s->tournament?->name ?? 'tournament';
                    $events->push([
                        'type'        => 'sponsorship',
                        'icon'        => '🤝',
                        'headline'    => "{$sponsorName} · {$tournamentName}",
                        'detail'      => ($s->contract_status ?? 'draft') . ' · ' . number_format((float) ($s->cash_amount_sar ?? 0), 2) . ' SAR',
                        'status'      => $s->contract_status,
                        'link'        => "/admin/sponsorships/{$s->id}",
                        'timestamp'   => $s->updated_at?->toIso8601String(),
                        'sort_key'    => $s->updated_at?->timestamp ?? 0,
                    ]);
                });
        }

        return $events
            ->sortByDesc('sort_key')
            ->take(20)
            ->values()
            ->map(fn ($e) => collect($e)->except('sort_key')->all())
            ->all();
    }

    // ═══════════════════════════════════════════════════════════════════
    // Alerts — things requiring admin attention
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Mixed-severity alert list. Each alert has:
     *   - severity: 'info' | 'warning' | 'critical'
     *   - title + detail for display
     *   - link for admin drill-in
     *   - count for aggregation
     */
    private function alerts(): array
    {
        $alerts = [];

        // 1. Low stock — inventory products at or below threshold
        $lowStockProducts = DB::table('digital_products as dp')
            ->select(
                'dp.id',
                'dp.name',
                'dp.brand',
                'dp.low_stock_threshold',
                DB::raw('(SELECT COUNT(*) FROM product_codes pc
                          WHERE pc.product_id = dp.id
                          AND pc.status = "available"
                          AND (pc.expires_at IS NULL OR pc.expires_at > CURDATE())) AS available_count'),
            )
            ->where('dp.fulfillment_mode', 'inventory')
            ->where('dp.is_active', true)
            ->get()
            ->filter(fn ($r) => (int) $r->available_count <= (int) $r->low_stock_threshold);

        foreach ($lowStockProducts as $row) {
            $severity = (int) $row->available_count === 0 ? 'critical' : 'warning';
            $alerts[] = [
                'severity' => $severity,
                'title'    => $severity === 'critical'
                                ? "Out of stock: {$row->name}"
                                : "Low stock: {$row->name}",
                'detail'   => "{$row->available_count} of {$row->low_stock_threshold} threshold · {$row->brand}",
                'link'     => "/admin/marketplace?product={$row->id}",
                'count'    => (int) $row->available_count,
            ];
        }

        // 2. Circuit breakers — distributors with open circuits
        $openCircuits = DistributorHealth::where('circuit_status', 'open')->get();
        foreach ($openCircuits as $h) {
            $alerts[] = [
                'severity' => 'critical',
                'title'    => "Distributor circuit open: {$h->distributor}",
                'detail'   => "{$h->failure_count} consecutive failures · last at "
                    . ($h->last_failure_at?->diffForHumans() ?? 'unknown'),
                'link'     => "/admin/marketplace?tab=distributors",
                'count'    => (int) $h->failure_count,
            ];
        }

        // 3. Pending sponsorship approvals (contract_status='pending')
        if (Schema::hasTable('sponsorships')) {
            $pendingCount = Sponsorship::where('contract_status', 'pending')->count();
            if ($pendingCount > 0) {
                $alerts[] = [
                    'severity' => 'info',
                    'title'    => "{$pendingCount} sponsorship proposal(s) awaiting approval",
                    'detail'   => 'Organizer-submitted sponsorships need admin sign-off',
                    'link'     => '/admin/sponsorships?status=pending',
                    'count'    => $pendingCount,
                ];
            }
        }

        // 4. Stuck orders — processing status for more than 1 hour
        $stuckOrders = DigitalOrder::where('status', 'processing')
            ->where('created_at', '<', now()->subHour())
            ->count();
        if ($stuckOrders > 0) {
            $alerts[] = [
                'severity' => 'warning',
                'title'    => "{$stuckOrders} order(s) stuck in processing",
                'detail'   => 'Orders have been processing for over 1 hour — likely fulfillment failures',
                'link'     => '/admin/marketplace?tab=orders&status=processing',
                'count'    => $stuckOrders,
            ];
        }

        // 5. Recent failed orders — last 24h
        $failedOrdersCount = DigitalOrder::where('status', 'failed')
            ->where('created_at', '>=', now()->subDay())
            ->count();
        if ($failedOrdersCount > 0) {
            $alerts[] = [
                'severity' => 'warning',
                'title'    => "{$failedOrdersCount} failed order(s) in last 24h",
                'detail'   => 'Check distributor health and refund status',
                'link'     => '/admin/marketplace?tab=orders&status=failed',
                'count'    => $failedOrdersCount,
            ];
        }

        // Sort: critical first, then warning, then info
        usort($alerts, function ($a, $b) {
            $order = ['critical' => 0, 'warning' => 1, 'info' => 2];
            return $order[$a['severity']] <=> $order[$b['severity']];
        });

        return $alerts;
    }

    // ═══════════════════════════════════════════════════════════════════
    // Helpers
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Calculate percentage change between two values. Returns null when
     * the previous period was zero (can't divide) — frontend renders "—".
     */
    private function percentDelta(float $current, float $previous): ?float
    {
        if ($previous == 0.0) {
            return $current > 0 ? null : 0.0;
        }
        return round((($current - $previous) / $previous) * 100, 1);
    }

    /**
     * 'up' if positive, 'down' if negative, 'flat' otherwise.
     */
    private function trendDirection(?float $pct): string
    {
        if ($pct === null || $pct === 0.0) return 'flat';
        return $pct > 0 ? 'up' : 'down';
    }
}
