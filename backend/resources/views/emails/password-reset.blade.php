@extends('emails.layout')
@section('content')
  <h1>Reset Your <em>Password</em></h1>
  <p>Hi <span class="highlight">{{ $user->name }}</span>,</p>
  <p>We received a request to reset the password for your Dawri account. Click the button below to set a new password.</p>

  <a class="btn" href="{{ $resetUrl }}">Reset Password →</a>

  <div class="divider"></div>

  <p class="muted">This link expires in <strong>60 minutes</strong>. If you didn't request a password reset, you can safely ignore this email — your password will not change.</p>

  <p class="muted" style="margin-top:12px;">
    If the button above doesn't work, copy and paste this URL into your browser:<br/>
    <span style="color:#d4af37;word-break:break-all;font-size:12px;">{{ $resetUrl }}</span>
  </p>
@endsection
