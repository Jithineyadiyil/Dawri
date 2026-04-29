@extends('reports.layout')

@section('content')
    <div class="meta">
        <span class="kv"><span class="kv-label">Period:</span> <span class="kv-value">{{ $report['period']['from'] }} → {{ $report['period']['to'] }}</span></span>
        <span class="kv"><span class="kv-label">Days:</span> <span class="kv-value">{{ $report['period']['days'] }}</span></span>
    </div>

    <h2>Totals by source</h2>
    <table>
        <thead>
            <tr>
                <th>Source</th>
                <th class="r">Revenue (SAR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Marketplace</td>
                <td class="r mono">{{ number_format($report['totals']['marketplace'], 2) }}</td>
            </tr>
            <tr>
                <td>Subscriptions</td>
                <td class="r mono">{{ number_format($report['totals']['subscriptions'], 2) }}</td>
            </tr>
            <tr>
                <td>Sponsorships</td>
                <td class="r mono">{{ number_format($report['totals']['sponsorships'], 2) }}</td>
            </tr>
            <tr class="total-row">
                <td>GRAND TOTAL</td>
                <td class="r mono">{{ number_format($report['totals']['grand_total'], 2) }}</td>
            </tr>
        </tbody>
    </table>

    <h2>Detail by source &amp; month</h2>
    <table>
        <thead>
            <tr>
                <th>Source</th>
                <th>Period</th>
                <th class="r">Count</th>
                <th class="r">Gross</th>
                <th class="r">VAT (15%)</th>
                <th class="r">Net</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['rows'] as $row)
                <tr>
                    <td>{{ ucfirst($row['source']) }}</td>
                    <td>{{ $row['period_label'] }}</td>
                    <td class="r mono">{{ $row['count'] }}</td>
                    <td class="r mono">{{ number_format($row['gross'], 2) }}</td>
                    <td class="r mono muted">{{ number_format($row['vat'], 2) }}</td>
                    <td class="r mono">{{ number_format($row['net'], 2) }}</td>
                </tr>
            @empty
                <tr><td colspan="6" class="muted" style="text-align:center;padding:20pt">No revenue in this period.</td></tr>
            @endforelse
        </tbody>
    </table>
@endsection
