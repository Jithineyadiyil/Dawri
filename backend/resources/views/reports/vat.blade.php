@extends('reports.layout')

@section('content')
    <div class="meta">
        <span class="kv"><span class="kv-label">Period:</span>
            <span class="kv-value">{{ $report['period']['from'] }} → {{ $report['period']['to'] }}</span>
        </span>
        <span class="kv"><span class="kv-label">VAT rate:</span>
            <span class="kv-value">{{ ($report['vat_rate'] * 100) }}%</span>
        </span>
        <span class="kv"><span class="kv-label">Jurisdiction:</span>
            <span class="kv-value">Saudi Arabia (ZATCA)</span>
        </span>
    </div>

    <h2>Summary by source</h2>
    <table>
        <thead>
            <tr>
                <th>Source</th>
                <th class="r">Gross (SAR)</th>
                <th class="r">VAT (SAR)</th>
                <th class="r">Net (SAR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Invoices (subscriptions)</td>
                <td class="r mono">{{ number_format($report['summary']['invoices_gross'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['invoices_vat'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['invoices_net'], 2) }}</td>
            </tr>
            <tr>
                <td>Marketplace (digital orders)</td>
                <td class="r mono">{{ number_format($report['summary']['marketplace_gross'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['marketplace_vat'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['marketplace_net'], 2) }}</td>
            </tr>
            <tr>
                <td>Sponsorships (cash contributions)</td>
                <td class="r mono">{{ number_format($report['summary']['sponsorships_gross'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['sponsorships_vat'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['sponsorships_net'], 2) }}</td>
            </tr>
            <tr class="total-row">
                <td>TOTAL OUTPUT VAT</td>
                <td class="r mono">{{ number_format($report['summary']['total_gross'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['total_vat'], 2) }}</td>
                <td class="r mono">{{ number_format($report['summary']['total_net'], 2) }}</td>
            </tr>
        </tbody>
    </table>

    <h2>Monthly breakdown</h2>
    <table>
        <thead>
            <tr>
                <th>Month</th>
                <th class="r">Gross</th>
                <th class="r">VAT</th>
                <th class="r">Net</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['monthly'] as $m)
                <tr>
                    <td class="mono">{{ $m['month'] }}</td>
                    <td class="r mono">{{ number_format($m['gross'], 2) }}</td>
                    <td class="r mono">{{ number_format($m['vat'], 2) }}</td>
                    <td class="r mono">{{ number_format($m['net'], 2) }}</td>
                </tr>
            @empty
                <tr><td colspan="4" class="muted" style="text-align:center;padding:20pt">No VAT-bearing activity in this period.</td></tr>
            @endforelse
        </tbody>
    </table>

    @if (!empty($report['invoice_lines']))
        <h2>Invoice-level detail</h2>
        <table>
            <thead>
                <tr>
                    <th>Invoice #</th>
                    <th>Customer</th>
                    <th>Paid</th>
                    <th class="r">Net</th>
                    <th class="r">VAT</th>
                    <th class="r">Gross</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($report['invoice_lines'] as $line)
                    <tr>
                        <td class="mono">{{ $line['invoice_number'] }}</td>
                        <td>{{ $line['customer'] }}</td>
                        <td class="mono muted" style="font-size:8pt">{{ $line['paid_at'] }}</td>
                        <td class="r mono">{{ number_format($line['net'], 2) }}</td>
                        <td class="r mono">{{ number_format($line['vat'], 2) }}</td>
                        <td class="r mono">{{ number_format($line['gross'], 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <p class="muted" style="font-size:8pt;margin-top:16pt">
        VAT on marketplace and sponsorship rows is derived from VAT-inclusive totals
        using the reverse calculation: VAT = gross × (15 / 115). Invoice VAT uses the
        explicit <code>vat_amount</code> column recorded at invoice creation.
    </p>
@endsection
