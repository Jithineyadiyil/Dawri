<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        @page { margin: 1.5cm 1.4cm; }
        body  { font-family: DejaVu Sans, sans-serif; font-size: 10pt; color: #1f2937; line-height: 1.4; }

        /* ─ Header band ─ */
        .header { border-bottom: 3pt solid #a855f7; padding-bottom: 14pt; margin-bottom: 18pt; }
        .header-row { width: 100%; }
        .header-row .brand { display: inline-block; vertical-align: top; width: 48%; }
        .header-row .meta  { display: inline-block; vertical-align: top; width: 50%; text-align: right; }
        .brand-name  { font-size: 26pt; font-weight: bold; color: #a855f7; letter-spacing: 1pt; }
        .brand-tag   { font-size: 9pt; color: #6b7280; margin-top: 2pt; }
        .inv-label   { font-size: 18pt; font-weight: bold; color: #1f2937; letter-spacing: 2pt; }
        .inv-number  { font-size: 11pt; color: #6b7280; margin-top: 3pt; font-family: DejaVu Sans Mono, monospace; }

        /* ─ Status stamp ─ */
        .stamp {
            display: inline-block; padding: 4pt 12pt; border-radius: 3pt;
            font-weight: bold; font-size: 10pt; letter-spacing: 1.5pt;
            margin-top: 6pt; text-transform: uppercase;
        }
        .stamp-paid      { background: #d1fae5; color: #065f46; border: 1.5pt solid #065f46; }
        .stamp-draft     { background: #f3f4f6; color: #374151; border: 1.5pt solid #374151; }
        .stamp-overdue   { background: #fee2e2; color: #991b1b; border: 1.5pt solid #991b1b; }
        .stamp-cancelled { background: #f3f4f6; color: #6b7280; border: 1.5pt solid #6b7280; }

        /* ─ Parties ─ */
        .parties { width: 100%; margin-bottom: 18pt; }
        .party { display: inline-block; vertical-align: top; width: 49%; }
        .party h3 { font-size: 9pt; color: #6b7280; text-transform: uppercase; letter-spacing: 1pt;
                    margin: 0 0 4pt 0; font-weight: bold; }
        .party-body { font-size: 10pt; line-height: 1.5; }
        .party-body .name { font-weight: bold; color: #1f2937; }
        .party-body .line { color: #4b5563; }

        /* ─ Dates row ─ */
        .dates { border-top: 1pt solid #e5e7eb; border-bottom: 1pt solid #e5e7eb;
                 padding: 10pt 0; margin-bottom: 18pt; }
        .date-cell { display: inline-block; vertical-align: top; width: 32%; padding: 0 1%; }
        .date-label { font-size: 8pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8pt; }
        .date-value { font-size: 11pt; color: #1f2937; font-weight: bold; margin-top: 3pt; }

        /* ─ Line items table ─ */
        table.lines { width: 100%; border-collapse: collapse; margin-bottom: 12pt; }
        table.lines th { background: #a855f7; color: #fff; padding: 8pt 10pt;
                         text-align: left; font-weight: bold; font-size: 9pt;
                         letter-spacing: 0.5pt; text-transform: uppercase; }
        table.lines th.r { text-align: right; }
        table.lines td { padding: 10pt; border-bottom: 1pt solid #e5e7eb; font-size: 10pt; }
        table.lines td.r { text-align: right; font-family: DejaVu Sans Mono, monospace; }

        /* ─ Totals block ─ */
        .totals-wrap { text-align: right; margin-top: 10pt; }
        .totals { display: inline-block; width: 45%; }
        .tot-row { padding: 4pt 0; border-bottom: 1pt solid #f3f4f6; }
        .tot-row span.label { display: inline-block; width: 50%; text-align: right; color: #6b7280;
                              padding-right: 12pt; font-size: 10pt; }
        .tot-row span.value { display: inline-block; width: 45%; text-align: right;
                              font-family: DejaVu Sans Mono, monospace; color: #1f2937; font-size: 10pt; }
        .tot-grand { border-top: 2pt solid #1f2937; border-bottom: 2pt solid #1f2937; margin-top: 4pt; }
        .tot-grand span.label { color: #1f2937; font-weight: bold; font-size: 12pt; }
        .tot-grand span.value { color: #a855f7; font-weight: bold; font-size: 13pt; }

        /* ─ Payment details ─ */
        .payment-details { margin-top: 24pt; padding: 12pt 14pt;
                           background: #f9fafb; border-left: 3pt solid #a855f7;
                           border-radius: 3pt; }
        .payment-details h3 { margin: 0 0 6pt 0; font-size: 10pt;
                              color: #1f2937; text-transform: uppercase;
                              letter-spacing: 1pt; }
        .payment-details p { margin: 3pt 0; font-size: 10pt; color: #4b5563; }

        /* ─ Footer ─ */
        .footer { position: fixed; bottom: 0.5cm; left: 1.4cm; right: 1.4cm;
                  text-align: center; font-size: 8pt; color: #9ca3af;
                  border-top: 1pt solid #e5e7eb; padding-top: 6pt; }
        .notes { margin-top: 30pt; font-size: 8pt; color: #9ca3af; line-height: 1.6; }
    </style>
</head>
<body>
    {{-- ────────── HEADER ────────── --}}
    <div class="header">
        <div class="header-row">
            <div class="brand">
                <div class="brand-name">DAWRI</div>
                <div class="brand-tag">داوري · Esports Platform</div>
            </div>
            <div class="meta">
                <div class="inv-label">INVOICE</div>
                <div class="inv-number">{{ $invoice->invoice_number }}</div>
                <div class="stamp stamp-{{ $invoice->status }}">{{ $invoice->status }}</div>
            </div>
        </div>
    </div>

    {{-- ────────── FROM / TO ────────── --}}
    <div class="parties">
        <div class="party">
            <h3>From</h3>
            <div class="party-body">
                <div class="name">Dawri Platform</div>
                <div class="line">{{ $sellerAddress ?? 'Riyadh, Kingdom of Saudi Arabia' }}</div>
                <div class="line">{{ $sellerEmail ?? 'billing@dawri.gg' }}</div>
                @if (!empty($sellerVatNumber))
                    <div class="line">VAT Reg. No.: {{ $sellerVatNumber }}</div>
                @endif
                @if (!empty($sellerCrNumber))
                    <div class="line">CR No.: {{ $sellerCrNumber }}</div>
                @endif
            </div>
        </div>
        <div class="party">
            <h3>Bill to</h3>
            <div class="party-body">
                <div class="name">{{ $invoice->user?->name ?? 'Customer' }}</div>
                <div class="line">{{ $invoice->user?->email ?? '' }}</div>
                @if (!empty($invoice->user?->phone))
                    <div class="line">{{ $invoice->user->phone }}</div>
                @endif
                @if (!empty($buyerCompany))
                    <div class="line">{{ $buyerCompany }}</div>
                @endif
            </div>
        </div>
    </div>

    {{-- ────────── DATES ────────── --}}
    <div class="dates">
        <div class="date-cell">
            <div class="date-label">Issue date</div>
            <div class="date-value">{{ optional($invoice->created_at)->format('M j, Y') }}</div>
        </div>
        <div class="date-cell">
            <div class="date-label">Service period</div>
            <div class="date-value">
                {{ optional($invoice->period_start)->format('M j, Y') }}
                → {{ optional($invoice->period_end)->format('M j, Y') }}
            </div>
        </div>
        <div class="date-cell">
            <div class="date-label">{{ $invoice->status === 'paid' ? 'Paid on' : 'Due by' }}</div>
            <div class="date-value">
                @if ($invoice->status === 'paid')
                    {{ optional($invoice->paid_at)->format('M j, Y') }}
                @else
                    {{ optional($invoice->period_end ?? $invoice->created_at)->format('M j, Y') }}
                @endif
            </div>
        </div>
    </div>

    {{-- ────────── LINE ITEMS ────────── --}}
    <table class="lines">
        <thead>
            <tr>
                <th style="width: 65%">Description</th>
                <th class="r" style="width: 12%">Qty</th>
                <th class="r" style="width: 23%">Amount (SAR)</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($lineItems as $item)
                <tr>
                    <td>
                        <strong>{{ $item['description'] ?? 'Service' }}</strong>
                        @if (!empty($item['notes']))
                            <br><span style="color:#6b7280;font-size:9pt">{{ $item['notes'] }}</span>
                        @endif
                    </td>
                    <td class="r">{{ $item['quantity'] ?? 1 }}</td>
                    <td class="r">{{ number_format((float) ($item['amount'] ?? 0), 2) }}</td>
                </tr>
            @empty
                <tr>
                    <td>Subscription service</td>
                    <td class="r">1</td>
                    <td class="r">{{ number_format((float) $invoice->subtotal, 2) }}</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{-- ────────── TOTALS ────────── --}}
    <div class="totals-wrap">
        <div class="totals">
            <div class="tot-row">
                <span class="label">Subtotal (pre-VAT)</span>
                <span class="value">{{ number_format((float) $invoice->subtotal, 2) }} SAR</span>
            </div>
            <div class="tot-row">
                <span class="label">VAT ({{ $vatRatePct }}%)</span>
                <span class="value">{{ number_format((float) $invoice->vat_amount, 2) }} SAR</span>
            </div>
            <div class="tot-row tot-grand">
                <span class="label">TOTAL</span>
                <span class="value">{{ number_format((float) $invoice->total, 2) }} {{ $invoice->currency ?? 'SAR' }}</span>
            </div>
        </div>
    </div>

    {{-- ────────── PAYMENT DETAILS ────────── --}}
    @if ($invoice->status === 'paid')
        <div class="payment-details">
            <h3>✓ Payment Received</h3>
            <p><strong>Method:</strong> {{ ucwords(str_replace('_', ' ', $invoice->payment_method ?? 'N/A')) }}</p>
            <p><strong>Date:</strong> {{ optional($invoice->paid_at)->format('F j, Y \a\t H:i') }}</p>
            @if (!empty($invoice->payment_ref))
                <p><strong>Reference:</strong> <span style="font-family: DejaVu Sans Mono, monospace">{{ $invoice->payment_ref }}</span></p>
            @endif
        </div>
    @else
        <div class="payment-details">
            <h3>Payment Due</h3>
            <p>Please remit {{ number_format((float) $invoice->total, 2) }} {{ $invoice->currency ?? 'SAR' }}
               by the due date above.</p>
            <p style="font-size:9pt;color:#6b7280">Payment methods: Mada · STC Pay · Credit Card · Bank Transfer</p>
        </div>
    @endif

    {{-- ────────── NOTES ────────── --}}
    <div class="notes">
        <p>This is a computer-generated invoice. No signature required.</p>
        @if ($invoice->status === 'paid')
            <p>Thank you for your business. Reach out to {{ $sellerEmail ?? 'billing@dawri.gg' }} with any billing questions.</p>
        @endif
    </div>

    <div class="footer">
        Dawri · Generated {{ now()->format('Y-m-d H:i') }} · {{ $invoice->invoice_number }}
    </div>
</body>
</html>
