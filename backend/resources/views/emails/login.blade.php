@extends('emails.layout')
@section('content')
  <h1>New <em>Sign-In</em> Detected</h1>
  <p>Hi <span class="highlight">{{ $user->name }}</span>,</p>
  <p>We noticed a new sign-in to your Dawri account.</p>

  <div class="info-box">
    <div class="data-row">
      <span class="data-label">Time</span>
      <span class="data-val">{{ $loginAt }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">IP Address</span>
      <span class="data-val">{{ $ipAddress }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Device</span>
      <span class="data-val">{{ $userAgent }}</span>
    </div>
  </div>

  <p>If this was you, no action is needed. If you didn't sign in, secure your account immediately.</p>

  <a class="btn" href="{{ config('app.url') }}/auth">Secure My Account →</a>

  <div class="divider"></div>
  <p class="muted">
    An OTP has also been sent to your registered mobile number for verification.
    For your security, we send this notification for every new sign-in.
  </p>
@endsection
