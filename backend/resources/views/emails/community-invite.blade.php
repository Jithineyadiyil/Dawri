@extends('emails.layout')
@section('content')
  <h1>You're <em>Invited!</em></h1>
  <p>Hi there,</p>
  <p>
    <span class="highlight">{{ $inviterName }}</span> has invited you to join the
    <strong>{{ $communityName }}</strong> community on Dawri.
  </p>

  <div class="info-box">
    <div class="data-row">
      <span class="data-label">Community</span>
      <span class="data-val">{{ $communityName }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Invited by</span>
      <span class="data-val">{{ $inviterName }}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Invite expires</span>
      <span class="data-val">{{ $expiresAt ?? '7 days from now' }}</span>
    </div>
  </div>

  <p>Click the button below to accept the invitation and join the community.</p>

  <a class="btn" href="{{ $inviteUrl }}">Join Community →</a>

  <div class="divider"></div>
  <p class="muted">
    This invite link is single-use and expires in 7 days.
    If you don't have a Dawri account, you'll be asked to create one first.
  </p>
@endsection
