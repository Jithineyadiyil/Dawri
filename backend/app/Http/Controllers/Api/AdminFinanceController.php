<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\User;
use App\Services\FinanceReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

/**
 * AdminFinanceController
 *
 * Sprint 13 — Phase 1 financial reports. Three report types with three
 * delivery channels each (JSON for browser, PDF for print, XLSX for
 * accountant).
 *
 * Endpoints:
 *   GET /admin/finance/revenue          JSON
 *   GET /admin/finance/revenue.pdf      PDF download
 *   GET /admin/finance/revenue.xlsx     Excel download
 *   GET /admin/finance/invoices         JSON (paginated)
 *   GET /admin/finance/invoices.pdf     PDF download
 *   GET /admin/finance/invoices.xlsx    Excel download
 *   GET /admin/finance/vat              JSON
 *   GET /admin/finance/vat.pdf          PDF download
 *   GET /admin/finance/vat.xlsx         Excel download
 *
 * Query params (all endpoints):
 *   from       ISO date (defaults to 30 days ago)
 *   to         ISO date (defaults to today)
 *   sources[]  marketplace|subscriptions|sponsorships (revenue only)
 *   status     paid|draft|overdue|all (invoices only)
 *   search     string (invoices only)
 */
class AdminFinanceController extends Controller
{
    public function __construct(private readonly FinanceReportService $reports)
    {
    }

    /**
     * Authenticate a download request using a token passed in the query
     * string (for browser window.open calls that can't send Authorization
     * headers). Mirrors the InvoiceController::download pattern.
     *
     * Fails with 401/403 via abort() if no valid admin is found.
     *
     * Call once at the top of every PDF/XLSX export method. JSON endpoints
     * don't need this — they're called with XHR which sends the auth header.
     */
    private function ensureAdminFromQueryToken(Request $request): void
    {
        $user = $request->user('sanctum');

        if (! $user) {
            $tokenValue = $request->query('token');
            if ($tokenValue) {
                if (str_contains((string) $tokenValue, '|')) {
                    [$tokenId, $rawToken] = explode('|', (string) $tokenValue, 2);
                    $pat = DB::table('personal_access_tokens')
                        ->where('id', $tokenId)
                        ->where('token', hash('sha256', $rawToken))
                        ->first();
                } else {
                    $pat = DB::table('personal_access_tokens')
                        ->where('token', hash('sha256', (string) $tokenValue))
                        ->first();
                }
                if (!empty($pat)) {
                    $user = User::find($pat->tokenable_id);
                }
            }
        }

        if (! $user) {
            abort(401, 'Unauthenticated.');
        }

        if ($user->role !== 'admin') {
            abort(403, 'Admin access required.');
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // REVENUE
    // ═══════════════════════════════════════════════════════════════════

    public function revenue(Request $request): JsonResponse
    {
        [$from, $to, $sources] = $this->parseRevenueFilters($request);
        $data = $this->reports->revenue($from, $to, $sources);
        return response()->json(['data' => $data]);
    }

    public function revenuePdf(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        [$from, $to, $sources] = $this->parseRevenueFilters($request);
        $data = $this->reports->revenue($from, $to, $sources);

        $pdf = Pdf::loadView('reports.revenue', [
            'report'       => $data,
            'generated_at' => now(),
            'title'        => 'Revenue Report',
        ])->setPaper('a4', 'portrait');

        $filename = sprintf('revenue-%s-to-%s.pdf', $from->toDateString(), $to->toDateString());
        return $pdf->download($filename);
    }

    public function revenueXlsx(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        [$from, $to, $sources] = $this->parseRevenueFilters($request);
        $data = $this->reports->revenue($from, $to, $sources);

        $ss = new Spreadsheet();
        $sheet = $ss->getActiveSheet();
        $sheet->setTitle('Revenue');

        // Header
        $sheet->setCellValue('A1', 'Dawri — Revenue Report');
        $sheet->mergeCells('A1:F1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);

        $sheet->setCellValue('A2', "Period: {$data['period']['from']} to {$data['period']['to']}");
        $sheet->mergeCells('A2:F2');

        $sheet->setCellValue('A3', 'Generated: ' . now()->toDateTimeString());
        $sheet->mergeCells('A3:F3');

        // Totals section
        $sheet->setCellValue('A5', 'Totals by source');
        $sheet->getStyle('A5')->getFont()->setBold(true);
        $sheet->setCellValue('A6', 'Marketplace');   $sheet->setCellValue('B6', $data['totals']['marketplace']);
        $sheet->setCellValue('A7', 'Subscriptions'); $sheet->setCellValue('B7', $data['totals']['subscriptions']);
        $sheet->setCellValue('A8', 'Sponsorships');  $sheet->setCellValue('B8', $data['totals']['sponsorships']);
        $sheet->setCellValue('A9', 'Grand total');   $sheet->setCellValue('B9', $data['totals']['grand_total']);
        $sheet->getStyle('A9:B9')->getFont()->setBold(true);
        $sheet->getStyle('B6:B9')->getNumberFormat()->setFormatCode('#,##0.00');

        // Detail rows
        $headerRow = 11;
        $sheet->setCellValue("A{$headerRow}", 'Source');
        $sheet->setCellValue("B{$headerRow}", 'Period');
        $sheet->setCellValue("C{$headerRow}", 'Count');
        $sheet->setCellValue("D{$headerRow}", 'Gross (SAR)');
        $sheet->setCellValue("E{$headerRow}", 'VAT (SAR)');
        $sheet->setCellValue("F{$headerRow}", 'Net (SAR)');

        $this->styleHeaderRow($sheet, "A{$headerRow}:F{$headerRow}");

        $r = $headerRow + 1;
        foreach ($data['rows'] as $row) {
            $sheet->setCellValue("A{$r}", ucfirst($row['source']));
            $sheet->setCellValue("B{$r}", $row['period_label']);
            $sheet->setCellValue("C{$r}", $row['count']);
            $sheet->setCellValue("D{$r}", $row['gross']);
            $sheet->setCellValue("E{$r}", $row['vat']);
            $sheet->setCellValue("F{$r}", $row['net']);
            $r++;
        }
        $sheet->getStyle("D" . ($headerRow + 1) . ":F{$r}")->getNumberFormat()->setFormatCode('#,##0.00');

        foreach (range('A', 'F') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $filename = sprintf('revenue-%s-to-%s.xlsx', $from->toDateString(), $to->toDateString());
        return $this->streamXlsx($ss, $filename);
    }

    // ═══════════════════════════════════════════════════════════════════
    // INVOICES
    // ═══════════════════════════════════════════════════════════════════

    public function invoices(Request $request): JsonResponse
    {
        $filters = $this->parseInvoiceFilters($request);
        $data = $this->reports->invoiceRegister($filters);
        return response()->json([
            'data'    => $data['data'],
            'meta'    => [
                'total'    => $data['total'],
                'page'     => $data['page'],
                'per_page' => $data['per_page'],
            ],
            'summary' => $data['summary'],
        ]);
    }

    public function invoicesPdf(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        // Fetch ALL matching invoices for PDF — no pagination
        $filters = $this->parseInvoiceFilters($request);
        $filters['per_page'] = 10_000;
        $data = $this->reports->invoiceRegister($filters);

        $pdf = Pdf::loadView('reports.invoices', [
            'rows'         => $data['data'],
            'summary'      => $data['summary'],
            'filters'      => $filters,
            'generated_at' => now(),
            'title'        => 'Invoice Register',
        ])->setPaper('a4', 'landscape');

        $filename = sprintf('invoices-%s.pdf', now()->format('Y-m-d'));
        return $pdf->download($filename);
    }

    public function invoicesXlsx(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        $filters = $this->parseInvoiceFilters($request);
        $filters['per_page'] = 10_000;
        $data = $this->reports->invoiceRegister($filters);

        $ss = new Spreadsheet();
        $sheet = $ss->getActiveSheet();
        $sheet->setTitle('Invoices');

        $sheet->setCellValue('A1', 'Dawri — Invoice Register');
        $sheet->mergeCells('A1:J1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);

        $sheet->setCellValue('A2', 'Generated: ' . now()->toDateTimeString());
        $sheet->mergeCells('A2:J2');

        // Summary
        $sheet->setCellValue('A4', 'Summary');
        $sheet->getStyle('A4')->getFont()->setBold(true);
        $sheet->setCellValue('A5', 'Count');    $sheet->setCellValue('B5', $data['summary']['count']);
        $sheet->setCellValue('A6', 'Subtotal'); $sheet->setCellValue('B6', $data['summary']['subtotal']);
        $sheet->setCellValue('A7', 'VAT');      $sheet->setCellValue('B7', $data['summary']['vat']);
        $sheet->setCellValue('A8', 'Total');    $sheet->setCellValue('B8', $data['summary']['total']);
        $sheet->setCellValue('A9', 'Paid');     $sheet->setCellValue('B9', $data['summary']['paid']);
        $sheet->setCellValue('A10', 'Unpaid');  $sheet->setCellValue('B10', $data['summary']['unpaid']);
        $sheet->getStyle('B6:B10')->getNumberFormat()->setFormatCode('#,##0.00');

        // Headers
        $headerRow = 12;
        $headers = ['Invoice #', 'Customer', 'Email', 'Status', 'Payment method',
                    'Period', 'Subtotal', 'VAT', 'Total', 'Paid at'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValueByColumnAndRow($i + 1, $headerRow, $h);
        }
        $this->styleHeaderRow($sheet, "A{$headerRow}:J{$headerRow}");

        // Rows
        $r = $headerRow + 1;
        foreach ($data['data'] as $inv) {
            $sheet->setCellValue("A{$r}", $inv['invoice_number']);
            $sheet->setCellValue("B{$r}", $inv['user_name']);
            $sheet->setCellValue("C{$r}", $inv['user_email']);
            $sheet->setCellValue("D{$r}", $inv['status']);
            $sheet->setCellValue("E{$r}", $inv['payment_method'] ?? '—');
            $sheet->setCellValue("F{$r}", trim(($inv['period_start'] ?? '') . ' / ' . ($inv['period_end'] ?? ''), ' /'));
            $sheet->setCellValue("G{$r}", $inv['subtotal']);
            $sheet->setCellValue("H{$r}", $inv['vat_amount']);
            $sheet->setCellValue("I{$r}", $inv['total']);
            $sheet->setCellValue("J{$r}", $inv['paid_at'] ? substr($inv['paid_at'], 0, 10) : '—');
            $r++;
        }
        $sheet->getStyle("G" . ($headerRow + 1) . ":I{$r}")->getNumberFormat()->setFormatCode('#,##0.00');

        foreach (range('A', 'J') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $filename = sprintf('invoices-%s.xlsx', now()->format('Y-m-d'));
        return $this->streamXlsx($ss, $filename);
    }

    // ═══════════════════════════════════════════════════════════════════
    // VAT
    // ═══════════════════════════════════════════════════════════════════

    public function vat(Request $request): JsonResponse
    {
        [$from, $to] = $this->parseDateRange($request);
        $data = $this->reports->vatReport($from, $to);
        return response()->json(['data' => $data]);
    }

    public function vatPdf(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        [$from, $to] = $this->parseDateRange($request);
        $data = $this->reports->vatReport($from, $to);

        $pdf = Pdf::loadView('reports.vat', [
            'report'       => $data,
            'generated_at' => now(),
            'title'        => 'VAT Report — Saudi Arabia',
        ])->setPaper('a4', 'portrait');

        $filename = sprintf('vat-%s-to-%s.pdf', $from->toDateString(), $to->toDateString());
        return $pdf->download($filename);
    }

    public function vatXlsx(Request $request): Response
    {
        $this->ensureAdminFromQueryToken($request);

        [$from, $to] = $this->parseDateRange($request);
        $data = $this->reports->vatReport($from, $to);

        $ss = new Spreadsheet();
        $sheet = $ss->getActiveSheet();
        $sheet->setTitle('VAT Report');

        $sheet->setCellValue('A1', 'Dawri — VAT Report (Saudi Arabia, 15%)');
        $sheet->mergeCells('A1:D1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);

        $sheet->setCellValue('A2', "Period: {$data['period']['from']} to {$data['period']['to']}");
        $sheet->mergeCells('A2:D2');

        $sheet->setCellValue('A3', 'Generated: ' . now()->toDateTimeString());
        $sheet->mergeCells('A3:D3');

        // Summary by source
        $sheet->setCellValue('A5', 'Summary by source');
        $sheet->getStyle('A5')->getFont()->setBold(true);
        $sheet->setCellValue('A6', 'Source');     $sheet->setCellValue('B6', 'Gross (SAR)');
        $sheet->setCellValue('C6', 'VAT (SAR)');  $sheet->setCellValue('D6', 'Net (SAR)');
        $this->styleHeaderRow($sheet, 'A6:D6');

        $sheet->setCellValue('A7',  'Invoices (subs)');  $sheet->setCellValue('B7', $data['summary']['invoices_gross']);     $sheet->setCellValue('C7', $data['summary']['invoices_vat']);     $sheet->setCellValue('D7', $data['summary']['invoices_net']);
        $sheet->setCellValue('A8',  'Marketplace');      $sheet->setCellValue('B8', $data['summary']['marketplace_gross']);  $sheet->setCellValue('C8', $data['summary']['marketplace_vat']);  $sheet->setCellValue('D8', $data['summary']['marketplace_net']);
        $sheet->setCellValue('A9',  'Sponsorships');     $sheet->setCellValue('B9', $data['summary']['sponsorships_gross']); $sheet->setCellValue('C9', $data['summary']['sponsorships_vat']); $sheet->setCellValue('D9', $data['summary']['sponsorships_net']);
        $sheet->setCellValue('A10', 'TOTAL');            $sheet->setCellValue('B10', $data['summary']['total_gross']);       $sheet->setCellValue('C10', $data['summary']['total_vat']);       $sheet->setCellValue('D10', $data['summary']['total_net']);
        $sheet->getStyle('A10:D10')->getFont()->setBold(true);
        $sheet->getStyle('B7:D10')->getNumberFormat()->setFormatCode('#,##0.00');

        // Monthly breakdown
        $sheet->setCellValue('A12', 'Monthly breakdown');
        $sheet->getStyle('A12')->getFont()->setBold(true);
        $sheet->setCellValue('A13', 'Month');     $sheet->setCellValue('B13', 'Gross');
        $sheet->setCellValue('C13', 'VAT');       $sheet->setCellValue('D13', 'Net');
        $this->styleHeaderRow($sheet, 'A13:D13');

        $r = 14;
        foreach ($data['monthly'] as $m) {
            $sheet->setCellValue("A{$r}", $m['month']);
            $sheet->setCellValue("B{$r}", $m['gross']);
            $sheet->setCellValue("C{$r}", $m['vat']);
            $sheet->setCellValue("D{$r}", $m['net']);
            $r++;
        }
        $sheet->getStyle("B14:D{$r}")->getNumberFormat()->setFormatCode('#,##0.00');

        foreach (range('A', 'D') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $filename = sprintf('vat-%s-to-%s.xlsx', $from->toDateString(), $to->toDateString());
        return $this->streamXlsx($ss, $filename);
    }

    // ═══════════════════════════════════════════════════════════════════
    // Helpers
    // ═══════════════════════════════════════════════════════════════════

    /**
     * @return array{0: CarbonImmutable, 1: CarbonImmutable}
     */
    private function parseDateRange(Request $request): array
    {
        $from = $request->filled('from')
            ? CarbonImmutable::parse($request->input('from'))
            : CarbonImmutable::now()->subDays(30);
        $to = $request->filled('to')
            ? CarbonImmutable::parse($request->input('to'))
            : CarbonImmutable::now();
        return [$from, $to];
    }

    /**
     * @return array{0: CarbonImmutable, 1: CarbonImmutable, 2: string[]}
     */
    private function parseRevenueFilters(Request $request): array
    {
        [$from, $to] = $this->parseDateRange($request);
        $sources = $request->input('sources', ['marketplace', 'subscriptions', 'sponsorships']);
        if (is_string($sources)) {
            $sources = explode(',', $sources);
        }
        return [$from, $to, (array) $sources];
    }

    private function parseInvoiceFilters(Request $request): array
    {
        return [
            'from'     => $request->input('from'),
            'to'       => $request->input('to'),
            'status'   => $request->input('status', 'all'),
            'search'   => $request->input('search'),
            'page'     => (int) $request->input('page', 1),
            'per_page' => (int) $request->input('per_page', 20),
        ];
    }

    private function styleHeaderRow(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet $sheet, string $range): void
    {
        $sheet->getStyle($range)->applyFromArray([
            'font'    => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
            'fill'    => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFA855F7']],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_LEFT],
        ]);
    }

    private function streamXlsx(Spreadsheet $ss, string $filename): Response
    {
        $writer = new Xlsx($ss);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return response($content, 200, [
            'Content-Type'        => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Content-Length'      => (string) strlen($content),
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // SINGLE INVOICE PDF
    // ═══════════════════════════════════════════════════════════════════

    /**
     * GET /admin/finance/invoices/{id}.pdf
     *
     * Customer-facing professional invoice PDF for a single invoice.
     * Layout includes seller/buyer details, line items, VAT breakdown,
     * totals, and payment status stamp.
     *
     * Auth: ensureAdminFromQueryToken (token-in-query) — for browser
     * window.open downloads.
     */
    public function invoiceSinglePdf(Request $request, string $id): Response
    {
        $this->ensureAdminFromQueryToken($request);

        $invoice = Invoice::with('user')->findOrFail($id);

        // Normalise line_items — may be JSON cast or already an array.
        // Standardise each item to {description, quantity, amount, notes?}.
        $raw = $invoice->line_items ?? [];
        if (is_string($raw)) {
            $raw = json_decode($raw, true) ?: [];
        }
        $lineItems = [];
        foreach ((array) $raw as $item) {
            $lineItems[] = [
                'description' => $item['description'] ?? 'Service',
                'quantity'    => $item['quantity']    ?? 1,
                'amount'      => $item['amount']      ?? $invoice->subtotal,
                'notes'       => $item['notes']       ?? null,
            ];
        }

        // Seller identity — sourced from config; fall back to sensible defaults.
        // When registering for ZATCA VAT, populate config('dawri.seller') with
        // real values to have them flow into every generated invoice.
        $vatRate = (float) config('dawri.vat_rate', 0.15);

        $pdf = Pdf::loadView('reports.invoice-single', [
            'invoice'          => $invoice,
            'lineItems'        => $lineItems,
            'vatRatePct'       => round($vatRate * 100),
            'sellerAddress'    => config('dawri.seller.address',    'Riyadh, Kingdom of Saudi Arabia'),
            'sellerEmail'      => config('dawri.seller.email',      'billing@dawri.gg'),
            'sellerVatNumber'  => config('dawri.seller.vat_number', null),
            'sellerCrNumber'   => config('dawri.seller.cr_number',  null),
            'buyerCompany'     => null,
        ])->setPaper('a4', 'portrait');

        $filename = sprintf('invoice-%s.pdf', $invoice->invoice_number);
        return $pdf->download($filename);
    }
}
