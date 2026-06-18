@extends('emails.layout')
@section('content')
  <h1>Welcome to <em>Dawri</em></h1>
  <p>Hi <span class="highlight">{{ $user->name }}</span>,</p>
  <p>
    Your account has been created successfully. You can now join tournaments,
    compete against players across Saudi Arabia and the GCC, and win prizes.
  </p>

  <div class="info-box">
    <p>📧 Account: <strong>{{ $user->email }}</strong></p>
  </div>

  <p>Here's what you can do right now:</p>
  <ul style="padding-left:20px;color:#c0c0d0;line-height:2;font-size:14px;">
    <li>Browse and join open tournaments</li>
    <li>Check the leaderboard to see the top players</li>
    <li>Visit the marketplace for digital rewards</li>
  </ul>

  <a class="btn" href="{{ config('app.url') }}/tournaments">Browse Tournaments →</a>

  <div class="divider"></div>
  <p class="muted">
    Questions? Reply to this email or visit
    <a href="{{ config('app.url') }}/contact" style="color:#d4af37;">dawri.com/contact</a>
  </p>
@endsection
