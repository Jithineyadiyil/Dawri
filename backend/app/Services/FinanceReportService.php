<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\DigitalOrder;
use App\Models\Invoice;
use App\Models\Sponsorship;
use App\Models\Subscription;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

/**
 * FinanceReportService
 *
 * Consolidates all financial reporting queries used by the /admin/finance
 * reports page. Each method returns a structured array ready for JSON
 * response, PDF rendering, or Excel export.
 *
 * Saudi VAT is modelled at 15% (standard rate effective July 2020).
 * Where invoices carry an explicit `vat_amount` we use that figure;
 * where we have only gross totals (e.g. marketplace orders) we derive
 * VAT by dividing out at 115/15 = 7.6667x.
 *
 * All periods are inclusive of start date, inclusive of end date.
 */
class FinanceReportService
{
    private const VAT_RATE = 0.15;

    // ═══════════════════════════════════════════════════════════════════
    // REVENUE REPORT
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Revenue summary across all income sources for a date range.
     *
     * @param  CarbonImmutable  $from
     * @param  CarbonImmutable  $to
     * @param  string[]  $sources  Any of: marketplace, subscriptions, sponsorships
     * @return array{
     *   period: array{from: string, to: string, days: int},
     *   totals: array{marketplace: float, subscriptions: float, sponsorships: float, grand_total: float},
     *   rows: array<int, array{source: string, period_label: string, count: int, gross: float, vat: float, net: float}>,
     *   daily_series: array{labels: string[], marketplace: float[], subscriptions: float[], sponsorships: float[]}
     * }
     */
    public function revenue(CarbonImmutable $from, CarbonImmutable $to, array $sources): array
    {
        $sources = array_values(array_intersect(['marketplace', 'subscriptions', 'sponsorships'], $sources));
        if (empty($sources)) {
            $sources = ['marketplace', 'subscriptions', 'sponsorships'];
        }

        $fromDt = $from->startOfDay();
        $toDt   = $to->endOfDay();

        $totals = [
            'marketplace'   => 0.0,
            'subscriptions' => 0.0,
            'sponsorships'  => 0.0,
            'grand_total'   => 0.0,
        ];

        $rows = [];
        $monthKey = fn ($date) => (new \DateTime($date))->format('Y-m');

        // ─ Marketplace ────────────────────────────────────────────────
        if (in_array('marketplace', $sources, true)) {
            $marketplace = DigitalOrder::query()
                ->where('status', 'completed')
                ->whereBetween('fulfilled_at', [$fromDt, $toDt])
                ->selectRaw(<<<'SQL'
                    DATE_FORMAT(fulfilled_at, '%Y-%m') AS period,
                    COUNT(*) AS count,
                    COALESCE(SUM(total_price), 0) AS gross
                SQL)
                ->groupBy('period')
                ->orderBy('period')
                ->get();

            foreach ($marketplace as $m) {
                $gross = (float) $m->gross;
                $vat   = round($gross * (self::VAT_RATE / (1 + self::VAT_RATE)), 2); // extract VAT from VAT-inclusive total
                $rows[] = [
                    'source'       => 'marketplace',
                    'period_label' => $m->period,
                    'count'        => (int) $m->count,
                    'gross'        => round($gross, 2),
                    'vat'          => $vat,
                    'net'          => round($gross - $vat, 2),
                ];
                $totals['marketplace'] += $gross;
            }
        }

        // ─ Subscriptions (invoices paid in window) ────────────────────
        if (in_array('subscriptions', $sources, true) && Schema::hasTable('invoices')) {
            $subs = Invoice::query()
                ->where('status', 'paid')
                ->whereBetween('paid_at', [$fromDt, $toDt])
                ->selectRaw(<<<'SQL'
                    DATE_FORMAT(paid_at, '%Y-%m') AS period,
                    COUNT(*) AS count,
                    COALESCE(SUM(subtotal), 0) AS net,
                    COALESCE(SUM(vat_amount), 0) AS vat,
                    COALESCE(SUM(total), 0) AS gross
                SQL)
                ->groupBy('period')
                ->orderBy('period')
                ->get();

            foreach ($subs as $s) {
                $rows[] = [
                    'source'       => 'subscriptions',
                    'period_label' => $s->period,
                    'count'        => (int) $s->count,
                    'gross'        => round((float) $s->gross, 2),
                    'vat'          => round((float) $s->vat, 2),
                    'net'          => round((float) $s->net, 2),
                ];
                $totals['subscriptions'] += (float) $s->gross;
            }
        }

        // ─ Sponsorships (active + fulfilled contracts in window) ──────
        if (in_array('sponsorships', $sources, true) && Schema::hasTable('sponsorships')) {
            $sponsorships = Sponsorship::query()
                ->whereIn('contract_status', ['active', 'fulfilled'])
                ->where('contribution_type', 'cash')
                ->whereBetween('activated_at', [$fromDt, $toDt])
                ->selectRaw(<<<'SQL'
                    DATE_FORMAT(activated_at, '%Y-%m') AS period,
                    COUNT(*) AS count,
                    COALESCE(SUM(cash_amount_sar), 0) AS gross
                SQL)
                ->groupBy('period')
                ->orderBy('period')
                ->get();

            foreach ($sponsorships as $sp) {
                $gross = (float) $sp->gross;
                $vat   = round($gross * (self::VAT_RATE / (1 + self::VAT_RATE)), 2);
                $rows[] = [
                    'source'       => 'sponsorships',
                    'period_label' => $sp->period,
                    'count'        => (int) $sp->count,
                    'gross'        => round($gross, 2),
                    'vat'          => $vat,
                    'net'          => round($gross - $vat, 2),
                ];
                $totals['sponsorships'] += $gross;
            }
        }

        $totals['grand_total'] = round(
            $totals['marketplace'] + $totals['subscriptions'] + $totals['sponsorships'],
            2,
        );
        $totals['marketplace']   = round($totals['marketplace'], 2);
        $totals['subscriptions'] = round($totals['subscriptions'], 2);
        $totals['sponsorships']  = round($totals['sponsorships'], 2);

        // ─ Daily series (for charts) ──────────────────────────────────
        $dailySeries = $this->dailySeries($from, $to, $sources);

        return [
            'period' => [
                'from' => $from->toDateString(),
                'to'   => $to->toDateString(),
                'days' => $from->diffInDays($to) + 1,
            ],
            'totals'       => $totals,
            'rows'         => $rows,
            'daily_series' => $dailySeries,
        ];
    }

    /**
     * Daily revenue buckets across the date range, parallel arrays for
     * chart rendering. Skipped sources return all-zeros arrays.
     */
    private function dailySeries(CarbonImmutable $from, CarbonImmutable $to, array $sources): array
    {
        $labels = [];
        $cursor = $from;
        while ($cursor->lessThanOrEqualTo($to)) {
            $labels[] = $cursor->toDateString();
            $cursor = $cursor->addDay();
        }

        $fillZeros = fn () => array_fill(0, count($labels), 0.0);
        $marketplace   = $fillZeros();
        $subscriptions = $fillZeros();
        $sponsorships  = $fillZeros();

        $dayIndex = array_flip($labels);

        if (in_array('marketplace', $sources, true)) {
            $raw = DigitalOrder::query()
                ->where('status', 'completed')
                ->whereBetween('fulfilled_at', [$from->startOfDay(), $to->endOfDay()])
                ->selectRaw('DATE(fulfilled_at) AS d, COALESCE(SUM(total_price), 0) AS v')
                ->groupBy('d')->pluck('v', 'd')->toArray();
            foreach ($raw as $d => $v) {
                if (isset($dayIndex[$d])) {
                    $marketplace[$dayIndex[$d]] = round((float) $v, 2);
                }
            }
        }

        if (in_array('subscriptions', $sources, true) && Schema::hasTable('invoices')) {
            $raw = Invoice::query()
                ->where('status', 'paid')
                ->whereBetween('paid_at', [$from->startOfDay(), $to->endOfDay()])
                ->selectRaw('DATE(paid_at) AS d, COALESCE(SUM(total), 0) AS v')
                ->groupBy('d')->pluck('v', 'd')->toArray();
            foreach ($raw as $d => $v) {
                if (isset($dayIndex[$d])) {
                    $subscriptions[$dayIndex[$d]] = round((float) $v, 2);
                }
            }
        }

        if (in_array('sponsorships', $sources, true) && Schema::hasTable('sponsorships')) {
            $raw = Sponsorship::query()
                ->whereIn('contract_status', ['active', 'fulfilled'])
                ->where('contribution_type', 'cash')
                ->whereBetween('activated_at', [$from->startOfDay(), $to->endOfDay()])
                ->selectRaw('DATE(activated_at) AS d, COALESCE(SUM(cash_amount_sar), 0) AS v')
                ->groupBy('d')->pluck('v', 'd')->toArray();
            foreach ($raw as $d => $v) {
                if (isset($dayIndex[$d])) {
                    $sponsorships[$dayIndex[$d]] = round((float) $v, 2);
                }
            }
        }

        // Format labels for display (e.g. "Apr 23")
        $displayLabels = array_map(fn ($d) => date('M j', strtotime($d)), $labels);

        return [
            'labels'        => $displayLabels,
            'marketplace'   => $marketplace,
            'subscriptions' => $subscriptions,
            'sponsorships'  => $sponsorships,
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // INVOICE REGISTER
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Paginated list of invoices with optional filters.
     *
     * @param  array{from?: string, to?: string, status?: string, search?: string, per_page?: int}  $filters
     * @return array{data: Collection, total: int, page: int, per_page: int, summary: array}
     */
    public function invoiceRegister(array $filters = []): array
    {
        if (! Schema::hasTable('invoices')) {
            return [
                'data' => collect(),
                'total' => 0, 'page' => 1, 'per_page' => 20,
                'summary' => ['count' => 0, 'subtotal' => 0, 'vat' => 0, 'total' => 0, 'paid' => 0, 'unpaid' => 0],
            ];
        }

        // Shared filter application — called twice: once for the paginated
        // list query, once for the summary aggregate. We can't clone the
        // list query because its `orderBy` clause conflicts with the
        // aggregate SELECT in MySQL strict mode (ONLY_FULL_GROUP_BY).
        $applyFilters = function ($q) use ($filters) {
            if (!empty($filters['from'])) {
                $q->where('created_at', '>=', (new CarbonImmutable($filters['from']))->startOfDay());
            }
            if (!empty($filters['to'])) {
                $q->where('created_at', '<=', (new CarbonImmutable($filters['to']))->endOfDay());
            }
            if (!empty($filters['status']) && $filters['status'] !== 'all') {
                $q->where('status', $filters['status']);
            }
            if (!empty($filters['search'])) {
                $s = $filters['search'];
                $q->where(function ($inner) use ($s) {
                    $inner->where('invoice_number', 'like', "%{$s}%")
                          ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$s}%")
                                                           ->orWhere('email', 'like', "%{$s}%"));
                });
            }
        };

        // List query — with eager-load, ordering, pagination
        $listQuery = Invoice::query()->with('user:id,name,email')->orderByDesc('created_at');
        $applyFilters($listQuery);

        $perPage = (int) ($filters['per_page'] ?? 20);
        $page    = (int) ($filters['page'] ?? 1);
        $paginated = $listQuery->paginate($perPage, ['*'], 'page', $page);

        // Summary query — fresh base, same filters, no ordering
        $summaryQuery = Invoice::query();
        $applyFilters($summaryQuery);

        $summary = $summaryQuery->selectRaw(<<<'SQL'
            COUNT(*) AS cnt,
            COALESCE(SUM(subtotal), 0)   AS subtotal,
            COALESCE(SUM(vat_amount), 0) AS vat,
            COALESCE(SUM(total), 0)      AS total,
            COALESCE(SUM(CASE WHEN status = 'paid'   THEN total ELSE 0 END), 0) AS paid,
            COALESCE(SUM(CASE WHEN status <> 'paid'  THEN total ELSE 0 END), 0) AS unpaid
        SQL)->first();

        return [
            'data'     => collect($paginated->items())->map(fn ($inv) => [
                'id'             => $inv->id,
                'invoice_number' => $inv->invoice_number,
                'user_name'      => $inv->user?->name ?? 'Unknown',
                'user_email'     => $inv->user?->email ?? '',
                'subtotal'       => round((float) $inv->subtotal, 2),
                'vat_amount'     => round((float) $inv->vat_amount, 2),
                'total'          => round((float) $inv->total, 2),
                'currency'       => $inv->currency ?? 'SAR',
                'status'         => $inv->status,
                'payment_method' => $inv->payment_method,
                'period_start'   => $inv->period_start?->toDateString(),
                'period_end'     => $inv->period_end?->toDateString(),
                'paid_at'        => $inv->paid_at?->toIso8601String(),
                'created_at'     => $inv->created_at?->toIso8601String(),
            ]),
            'total'    => $paginated->total(),
            'page'     => $paginated->currentPage(),
            'per_page' => $paginated->perPage(),
            'summary'  => [
                'count'    => (int)   ($summary->cnt ?? 0),
                'subtotal' => round((float) ($summary->subtotal ?? 0), 2),
                'vat'      => round((float) ($summary->vat ?? 0), 2),
                'total'    => round((float) ($summary->total ?? 0), 2),
                'paid'     => round((float) ($summary->paid ?? 0), 2),
                'unpaid'   => round((float) ($summary->unpaid ?? 0), 2),
            ],
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // VAT REPORT (ZATCA-oriented)
    // ═══════════════════════════════════════════════════════════════════

    /**
     * VAT breakdown for a given period, summarised by month.
     *
     * Returns output VAT (VAT charged to customers) for inclusion in
     * the ZATCA (Saudi Zakat, Tax and Customs Authority) VAT return.
     *
     * @return array{
     *   period: array{from: string, to: string},
     *   summary: array{
     *     invoices_gross: float, invoices_vat: float, invoices_net: float,
     *     marketplace_gross: float, marketplace_vat: float, marketplace_net: float,
     *     sponsorships_gross: float, sponsorships_vat: float, sponsorships_net: float,
     *     total_gross: float, total_vat: float, total_net: float
     *   },
     *   monthly: array<int, array{month: string, gross: float, vat: float, net: float}>,
     *   invoice_lines: array<int, array>
     * }
     */
    public function vatReport(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $fromDt = $from->startOfDay();
        $toDt   = $to->endOfDay();

        // Invoices with explicit VAT breakdown
        $invSum = ['gross' => 0.0, 'vat' => 0.0, 'net' => 0.0];
        $invoiceLines = [];
        if (Schema::hasTable('invoices')) {
            $invoices = Invoice::query()
                ->where('status', 'paid')
                ->whereBetween('paid_at', [$fromDt, $toDt])
                ->with('user:id,name,email')
                ->orderBy('paid_at')
                ->get();

            foreach ($invoices as $inv) {
                $invSum['gross'] += (float) $inv->total;
                $invSum['vat']   += (float) $inv->vat_amount;
                $invSum['net']   += (float) $inv->subtotal;

                $invoiceLines[] = [
                    'invoice_number' => $inv->invoice_number,
                    'customer'       => $inv->user?->name ?? 'Unknown',
                    'paid_at'        => $inv->paid_at?->toDateString(),
                    'net'            => round((float) $inv->subtotal, 2),
                    'vat'            => round((float) $inv->vat_amount, 2),
                    'gross'          => round((float) $inv->total, 2),
                ];
            }
        }

        // Marketplace — derive VAT from VAT-inclusive totals
        $mpTotal = (float) DigitalOrder::where('status', 'completed')
            ->whereBetween('fulfilled_at', [$fromDt, $toDt])
            ->sum('total_price');
        $mpVat = round($mpTotal * (self::VAT_RATE / (1 + self::VAT_RATE)), 2);
        $mpNet = round($mpTotal - $mpVat, 2);

        // Sponsorships
        $spTotal = 0.0;
        if (Schema::hasTable('sponsorships')) {
            $spTotal = (float) Sponsorship::query()
                ->whereIn('contract_status', ['active', 'fulfilled'])
                ->where('contribution_type', 'cash')
                ->whereBetween('activated_at', [$fromDt, $toDt])
                ->sum('cash_amount_sar');
        }
        $spVat = round($spTotal * (self::VAT_RATE / (1 + self::VAT_RATE)), 2);
        $spNet = round($spTotal - $spVat, 2);

        // Monthly rollup (combines all sources)
        $monthlyMap = [];
        $addToMonth = function ($dateStr, $gross, $vat, $net) use (&$monthlyMap) {
            $m = substr($dateStr, 0, 7);
            if (!isset($monthlyMap[$m])) {
                $monthlyMap[$m] = ['month' => $m, 'gross' => 0.0, 'vat' => 0.0, 'net' => 0.0];
            }
            $monthlyMap[$m]['gross'] += $gross;
            $monthlyMap[$m]['vat']   += $vat;
            $monthlyMap[$m]['net']   += $net;
        };

        if (Schema::hasTable('invoices')) {
            foreach (Invoice::where('status', 'paid')
                ->whereBetween('paid_at', [$fromDt, $toDt])
                ->selectRaw("DATE_FORMAT(paid_at, '%Y-%m') as m, SUM(total) g, SUM(vat_amount) v, SUM(subtotal) n")
                ->groupBy('m')->get() as $r) {
                $addToMonth($r->m . '-01', (float) $r->g, (float) $r->v, (float) $r->n);
            }
        }

        foreach (DigitalOrder::where('status', 'completed')
            ->whereBetween('fulfilled_at', [$fromDt, $toDt])
            ->selectRaw("DATE_FORMAT(fulfilled_at, '%Y-%m') as m, SUM(total_price) g")
            ->groupBy('m')->get() as $r) {
            $g = (float) $r->g;
            $v = round($g * (self::VAT_RATE / (1 + self::VAT_RATE)), 2);
            $addToMonth($r->m . '-01', $g, $v, round($g - $v, 2));
        }

        if (Schema::hasTable('sponsorships')) {
            foreach (Sponsorship::query()
                ->whereIn('contract_status', ['active', 'fulfilled'])
                ->where('contribution_type', 'cash')
                ->whereBetween('activated_at', [$fromDt, $toDt])
                ->selectRaw("DATE_FORMAT(activated_at, '%Y-%m') as m, SUM(cash_amount_sar) g")
                ->groupBy('m')->get() as $r) {
                $g = (float) $r->g;
                $v = round($g * (self::VAT_RATE / (1 + self::VAT_RATE)), 2);
                $addToMonth($r->m . '-01', $g, $v, round($g - $v, 2));
            }
        }

        $monthly = array_values($monthlyMap);
        usort($monthly, fn ($a, $b) => strcmp($a['month'], $b['month']));
        $monthly = array_map(fn ($m) => [
            'month' => $m['month'],
            'gross' => round($m['gross'], 2),
            'vat'   => round($m['vat'], 2),
            'net'   => round($m['net'], 2),
        ], $monthly);

        return [
            'period'  => ['from' => $from->toDateString(), 'to' => $to->toDateString()],
            'summary' => [
                'invoices_gross'     => round($invSum['gross'], 2),
                'invoices_vat'       => round($invSum['vat'], 2),
                'invoices_net'       => round($invSum['net'], 2),
                'marketplace_gross'  => round($mpTotal, 2),
                'marketplace_vat'    => $mpVat,
                'marketplace_net'    => $mpNet,
                'sponsorships_gross' => round($spTotal, 2),
                'sponsorships_vat'   => $spVat,
                'sponsorships_net'   => $spNet,
                'total_gross'        => round($invSum['gross'] + $mpTotal + $spTotal, 2),
                'total_vat'          => round($invSum['vat'] + $mpVat + $spVat, 2),
                'total_net'          => round($invSum['net'] + $mpNet + $spNet, 2),
            ],
            'monthly'       => $monthly,
            'invoice_lines' => $invoiceLines,
            'vat_rate'      => self::VAT_RATE,
        ];
    }
}
