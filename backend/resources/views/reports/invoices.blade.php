@extends('reports.layout')

@section('content')
    <div class="meta">
        @if (!empty($filters['from']) || !empty($filters['to']))
            <span class="kv"><span class="kv-label">Date range:</span>
                <span class="kv-value">{{ $filters['from'] ?? '—' }} → {{ $filters['to'] ?? '—' }}</span>
            </span>
        @endif
        @if (!empty($filters['status']) && $filters['status'] !== 'all')
            <span class="kv"><span class="kv-label">Status:</span>
                <span class="kv-value">{{ $filters['status'] }}</span>
            </span>
        @endif
        @if (!empty($filters['search']))
            <span class="kv"><span class="kv-label">Search:</span>
                <span class="kv-value">"{{ $filters['search'] }}"</span>
            </span>
        @endif
    </div>

    <h2>Summary</h2>
    <table>
        <tbody>
            <tr>
                <td><strong>Total invoices</strong></td>
                <td class="r mono">{{ $summary['count'] }}</td>
                <td><strong>Subtotal</strong></td>
                <td class="r mono">{{ number_format($summary['subtotal'], 2) }} SAR</td>
            </tr>
            <tr>
                <td><strong>Paid</strong></td>
                <td class="r mono">{{ number_format($summary['paid'], 2) }} SAR</td>
                <td><strong>VAT</strong></td>
                <td class="r mono">{{ number_format($summary['vat'], 2) }} SAR</td>
            </tr>
            <tr>
                <td><strong>Unpaid</strong></td>
                <td class="r mono">{{ number_format($summary['unpaid'], 2) }} SAR</td>
                <td><strong>Grand total</strong></td>
                <td class="r mono">{{ number_format($summary['total'], 2) }} SAR</td>
            </tr>
        </tbody>
    </table>

    <h2>Invoices</h2>
    <table>
        <thead>
            <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Period</th>
                <th class="r">Subtotal</th>
                <th class="r">VAT</th>
                <th class="r">Total</th>
                <th>Paid</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($rows as $inv)
                <tr>
                    <td class="mono">{{ $inv['invoice_number'] }}</td>
                    <td>
                        {{ $inv['user_name'] }}
                        <div class="muted" style="font-size:8pt">{{ $inv['user_email'] }}</div>
                    </td>
                    <td>{{ ucfirst($inv['status']) }}</td>
                    <td class="mono muted" style="font-size:8pt">
                        {{ $inv['period_start'] ?? '—' }}<br>→ {{ $inv['period_end'] ?? '—' }}
                    </td>
                    <td class="r mono">{{ number_format($inv['subtotal'], 2) }}</td>
                    <td class="r mono muted">{{ number_format($inv['vat_amount'], 2) }}</td>
                    <td class="r mono"><strong>{{ number_format($inv['total'], 2) }}</strong></td>
                    <td class="mono muted" style="font-size:8pt">
                        {{ $inv['paid_at'] ? substr($inv['paid_at'], 0, 10) : '—' }}
                    </td>
                </tr>
            @empty
                <tr><td colspan="8" class="muted" style="text-align:center;padding:20pt">No invoices match the filters.</td></tr>
            @endforelse
        </tbody>
    </table>
@endsection
