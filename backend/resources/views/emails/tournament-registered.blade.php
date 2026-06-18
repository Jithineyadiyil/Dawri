@extends('emails.layout')
@section('content')
  <h1>You're <em>Registered!</em></h1>
  <p>Hi <span class="highlight">{{ $user->name }}</span>,</p>
  <p>Your registration for the tournament below is confirmed. Good luck!</p>

  <div class="info-box">
    <div class="data-row">
      <span class="data-label">Tournament</span>
      <span class="data-val">{{ $tournament->name }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Game</span>
      <span class="data-val">{{ $tournament->game_label ?? $tournament->game }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Format</span>
      <span class="data-val">{{ $tournament->format_label ?? $tournament->format }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Starts</span>
      <span class="data-val">{{ \Carbon\Carbon::parse($tournament->starts_at)->format('d M Y, H:i') }} (Riyadh time)</span>
    </div>
    @if($tournament->prize_pool)
    <div class="data-row">
      <span class="data-label">Prize pool</span>
      <span class="data-val" style="color:#d4af37;">{{ is_array($tournament->prize_pool) ? collect($tournament->prize_pool)->first()['reward'] ?? '—' : $tournament->prize_pool }}</span>
    </div>
    @endif
  </div>

  <p style="font-size:13px;color:#8a8aa0;">
    Stay tuned — you'll receive a notification when your first match is scheduled.
    Submit results through the platform immediately after each match.
  </p>

  <a class="btn" href="{{ config('app.url') }}/tournaments/{{ $tournament->id }}">View Tournament →</a>

  <div class="divider"></div>
  <p class="muted">If you need to withdraw, you can unregister from the tournament page before brackets are generated.</p>
@endsection
