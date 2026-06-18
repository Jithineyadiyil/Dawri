@extends('emails.layout')
@section('content')
  <h1>🎉 Prize <em>Awarded!</em></h1>
  <p>Congratulations <span class="highlight">{{ $user->name }}</span>!</p>
  <p>
    You finished <strong style="color:#d4af37;">{{ $placement }}</strong> in
    <strong>{{ $tournament->name }}</strong> and your prize has been credited.
  </p>

  <div class="info-box">
    <div class="data-row">
      <span class="data-label">Tournament</span>
      <span class="data-val">{{ $tournament->name }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Placement</span>
      <span class="data-val" style="color:#d4af37;">{{ $placement }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Prize</span>
      <span class="data-val" style="color:#4ade80;font-size:16px;">{{ $prize }}</span>
    </div>
  </div>

  <p>
    Your prize {{ Str::contains($prize, 'SAR') ? 'has been added to your wallet balance' : 'will be delivered to your account within 24 hours' }}.
    Check your marketplace orders or wallet for details.
  </p>

  <a class="btn" href="{{ config('app.url') }}/dashboard">Go to Dashboard →</a>

  <div class="divider"></div>
  <p class="muted">Thank you for competing on Dawri. See you at the next tournament!</p>
@endsection
