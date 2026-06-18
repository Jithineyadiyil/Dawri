@extends('emails.layout')
@section('content')
  <h1>Order <em>Confirmed</em></h1>
  <p>Hi <span class="highlight">{{ $user->name }}</span>,</p>
  <p>Your purchase was successful. Your digital codes are ready to use.</p>

  <div class="info-box">
    @foreach($orders as $order)
    <div class="data-row">
      <span class="data-label">{{ $order->product->name ?? 'Product' }}</span>
      <span class="data-val">{{ number_format($order->total_price, 2) }} SAR</span>
    </div>
    @endforeach
    <div class="data-row" style="margin-top:8px;padding-top:12px;border-top:1px solid rgba(212,175,55,.2);">
      <span class="data-label" style="font-weight:700;color:#eaeaf2;">Total Paid</span>
      <span class="data-val" style="color:#d4af37;font-size:16px;">{{ number_format($totalPaid, 2) }} SAR</span>
    </div>
  </div>

  <p>To reveal your codes, visit the <strong>My Orders</strong> tab in the marketplace and click <em>Reveal code</em>.</p>

  <a class="btn" href="{{ config('app.url') }}/marketplace">Go to My Orders →</a>

  <div class="divider"></div>
  <p class="muted">
    Payment method: {{ ucfirst(str_replace('_', ' ', $paymentMethod)) }} ·
    Order ID: {{ $orders[0]->id ?? 'N/A' }}
  </p>
  <p class="muted">All sales are final. Codes are delivered instantly and cannot be refunded once revealed.</p>
@endsection
