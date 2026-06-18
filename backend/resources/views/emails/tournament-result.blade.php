@extends('emails.layout')
@section('content')
  @if($won)
    <h1>🏆 You <em>Won!</em></h1>
    <p>Congratulations <span class="highlight">{{ $user->name }}</span>! You won your match in <strong>{{ $tournament->name }}</strong>.</p>
  @else
    <h1>Match <em>Result</em></h1>
    <p>Hi <span class="highlight">{{ $user->name }}</span>, here's the result of your match in <strong>{{ $tournament->name }}</strong>.</p>
  @endif

  <div class="info-box">
    <div class="data-row">
      <span class="data-label">Tournament</span>
      <span class="data-val">{{ $tournament->name }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Round</span>
      <span class="data-val">Round {{ $match->round_number }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Result</span>
      <span class="data-val" style="color:{{ $won ? '#4ade80' : '#f87171' }}">
        {{ $won ? '✓ Victory' : '✗ Eliminated' }}
      </span>
    </div>
    @if($match->score_a !== null && $match->score_b !== null)
    <div class="data-row">
      <span class="data-label">Score</span>
      <span class="data-val">{{ $match->score_a }} – {{ $match->score_b }}</span>
    </div>
    @endif
  </div>

  @if($won)
    <p>You've advanced to the next round. Check the bracket to see when your next match is scheduled.</p>
  @else
    <p>You played well! Check the leaderboard to see your ranking and stats.</p>
  @endif

  <a class="btn" href="{{ config('app.url') }}/tournaments/{{ $tournament->id }}">View Bracket →</a>
@endsection
