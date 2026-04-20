<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice {{ $invoice->invoice_number ?? '' }}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'DejaVu Sans', sans-serif; font-size: 13px; color: #1a1a2e; background: #fff; }
    .page { padding: 40px 50px; min-height: 100vh; }

    /* Header */
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #f0a500; padding-bottom: 24px; }
    .brand-name { font-size: 32px; font-weight: 900; color: #0b1022; letter-spacing: 2px; }
    .brand-ar { font-size: 16px; color: #f0a500; margin-top: 2px; }
    .brand-contact { font-size: 11px; color: #6b7280; margin-top: 6px; line-height: 1.6; }
    .invoice-badge { text-align: right; }
    .invoice-title { font-size: 28px; font-weight: 700; color: #f0a500; letter-spacing: 3px; }
    .invoice-number { font-size: 13px; color: #6b7280; margin-top: 4px; }
    .invoice-status { display: inline-block; margin-top: 8px; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; background: #d1fae5; color: #065f46; }

    /* Details Grid */
    .details-grid { display: flex; gap: 0; margin-bottom: 36px; }
    .details-col { flex: 1; }
    .details-col + .details-col { border-left: 1px solid #e5e7eb; padding-left: 30px; margin-left: 30px; }
    .details-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #9ca3af; margin-bottom: 8px; text-transform: uppercase; }
    .details-value { font-size: 13px; color: #1a1a2e; line-height: 1.7; }
    .details-value strong { font-weight: 700; }

    /* Table */
    .table-wrap { margin-bottom: 36px; }
    .table-title { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #9ca3af; text-transform: uppercase; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: #0b1022; }
    thead th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #f0a500; text-transform: uppercase; }
    thead th:last-child { text-align: right; }
    tbody tr { border-bottom: 1px solid #f3f4f6; }
    tbody tr:last-child { border-bottom: none; }
    tbody td { padding: 14px 16px; font-size: 13px; color: #374151; }
    tbody td:last-child { text-align: right; font-weight: 600; }

    /* Totals */
    .totals { display: flex; justify-content: flex-end; margin-bottom: 40px; }
    .totals-box { width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6; }
    .totals-row.total { border-bottom: none; border-top: 2px solid #0b1022; margin-top: 4px; padding-top: 12px; font-size: 16px; font-weight: 700; color: #0b1022; }
    .totals-row.total .total-label { color: #0b1022; }
    .totals-row.total .total-val { color: #f0a500; }

    /* Payment Info */
    .payment-info { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 36px; }
    .payment-info-title { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #9ca3af; text-transform: uppercase; margin-bottom: 10px; }
    .payment-grid { display: flex; gap: 40px; }
    .payment-item label { font-size: 10px; color: #9ca3af; display: block; margin-bottom: 3px; }
    .payment-item span { font-size: 13px; color: #374151; font-weight: 600; }

    /* Footer */
    .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; }
    .footer-text { font-size: 11px; color: #9ca3af; line-height: 1.8; }
    .footer-highlight { color: #f0a500; font-weight: 700; }

    /* Gold accent bar */
    .accent-bar { height: 4px; background: linear-gradient(90deg, #f0a500, #e09400); border-radius: 2px; margin-bottom: 40px; }
  </style>
</head>
<body>
<div class="page">

  <div class="accent-bar"></div>

  <!-- Header -->
  <div class="header">
    <div>
      <div class="brand-name">DAWRI</div>
      <div class="brand-ar">داوري</div>
      <div class="brand-contact">
        billing@dawri.gg &nbsp;·&nbsp; dawri.gg<br>
        VAT: {{ $vat_number }}<br>
        CR: {{ $cr_number }}
      </div>
    </div>
    <div class="invoice-badge">
      <div class="invoice-title">INVOICE</div>
      <div class="invoice-number">{{ $invoice->invoice_number ?? 'N/A' }}</div>
      <div class="invoice-status">{{ strtoupper($invoice->status ?? 'PAID') }}</div>
    </div>
  </div>

  <!-- Details Grid -->
  <div class="details-grid">
    <div class="details-col">
      <div class="details-label">Billed To</div>
      <div class="details-value">
        <strong>{{ $user->name }}</strong><br>
        {{ $user->email }}<br>
        @if($user->phone ?? null) {{ $user->phone }}<br> @endif
        Saudi Arabia
      </div>
    </div>
    <div class="details-col">
      <div class="details-label">Invoice Details</div>
      <div class="details-value">
        <strong>Date:</strong> {{ \Carbon\Carbon::parse($invoice->created_at)->format('d M Y') }}<br>
        <strong>Due Date:</strong> {{ \Carbon\Carbon::parse($invoice->created_at)->format('d M Y') }}<br>
        <strong>Period:</strong>
        {{ \Carbon\Carbon::parse($invoice->period_start)->format('d M Y') }}
        – {{ \Carbon\Carbon::parse($invoice->period_end)->format('d M Y') }}
      </div>
    </div>
    <div class="details-col">
      <div class="details-label">Subscription</div>
      <div class="details-value">
        <strong>Plan:</strong> {{ ucfirst($invoice->plan ?? 'N/A') }}<br>
        <strong>Billing:</strong> Annual<br>
        <strong>Status:</strong> Active
      </div>
    </div>
  </div>

  <!-- Line Items Table -->
  <div class="table-wrap">
    <div class="table-title">Items</div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Plan</th>
          <th>Period</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ $invoice->description ?? ucfirst($invoice->plan ?? 'Subscription') . ' Plan — Annual Subscription' }}</td>
          <td>{{ ucfirst($invoice->plan ?? 'N/A') }}</td>
          <td>
            {{ \Carbon\Carbon::parse($invoice->period_start)->format('M Y') }}
            – {{ \Carbon\Carbon::parse($invoice->period_end)->format('M Y') }}
          </td>
          <td>{{ number_format($subtotal, 2) }} {{ $invoice->currency ?? 'SAR' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Totals -->
  <div class="totals">
    <div class="totals-box">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>{{ number_format($subtotal, 2) }} {{ $invoice->currency ?? 'SAR' }}</span>
      </div>
      <div class="totals-row">
        <span>VAT (15%)</span>
        <span>{{ number_format($vat, 2) }} {{ $invoice->currency ?? 'SAR' }}</span>
      </div>
      <div class="totals-row total">
        <span class="total-label">Total</span>
        <span class="total-val">{{ number_format($total, 2) }} {{ $invoice->currency ?? 'SAR' }}</span>
      </div>
    </div>
  </div>

  <!-- Payment Info -->
  <div class="payment-info">
    <div class="payment-info-title">Payment Information</div>
    <div class="payment-grid">
      <div class="payment-item">
        <label>Payment Method</label>
        <span>{{ ucfirst($invoice->payment_method ?? 'Card') }}</span>
      </div>
      <div class="payment-item">
        <label>Payment Reference</label>
        <span>{{ $invoice->payment_ref ?? 'N/A' }}</span>
      </div>
      <div class="payment-item">
        <label>Paid On</label>
        <span>{{ $invoice->paid_at ? \Carbon\Carbon::parse($invoice->paid_at)->format('d M Y') : \Carbon\Carbon::parse($invoice->created_at)->format('d M Y') }}</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-text">
      Thank you for subscribing to <span class="footer-highlight">Dawri</span> — The GCC Esports Platform<br>
      For billing questions, contact <span class="footer-highlight">billing@dawri.gg</span><br>
      This is a computer-generated invoice and does not require a signature.
    </div>
  </div>

</div>
</body>
</html>
