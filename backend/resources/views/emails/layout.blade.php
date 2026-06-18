<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{{ $subject ?? 'Dawri Platform' }}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#0a0a12; font-family:'Helvetica Neue',Arial,sans-serif; color:#eaeaf2; -webkit-text-size-adjust:100%; }
    .wrapper { max-width:600px; margin:0 auto; padding:32px 16px; }

    /* Header */
    .header { text-align:center; padding:40px 0 32px; border-bottom:1px solid rgba(212,175,55,.2); }
    .header-logo { font-size:28px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; color:#d4af37; text-decoration:none; }
    .header-logo span { color:#eaeaf2; }
    .header-ar { font-size:13px; color:#8a8aa0; margin-top:4px; direction:rtl; }

    /* Body */
    .body { background:#10101c; border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:40px 36px; margin:28px 0; }
    h1 { font-size:26px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; color:#fff; margin-bottom:16px; }
    h1 em { font-style:normal; color:#d4af37; }
    p { font-size:15px; line-height:1.7; color:#c0c0d0; margin-bottom:16px; }
    p:last-child { margin-bottom:0; }
    .highlight { color:#d4af37; font-weight:700; }
    .muted { color:#6b7280; font-size:13px; }

    /* CTA button */
    .btn { display:inline-block; padding:14px 32px; background:#d4af37; color:#1a1100; font-weight:700; font-size:14px; letter-spacing:.06em; text-transform:uppercase; text-decoration:none; border-radius:8px; margin:24px 0 8px; }
    .btn:hover { background:#e8c965; }

    /* Info box */
    .info-box { background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.2); border-radius:8px; padding:16px 20px; margin:20px 0; }
    .info-box p { margin:0; font-size:14px; }

    /* Data rows */
    .data-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.06); font-size:14px; }
    .data-row:last-child { border-bottom:none; }
    .data-label { color:#8a8aa0; }
    .data-val { color:#eaeaf2; font-weight:600; }

    /* Divider */
    .divider { height:1px; background:rgba(255,255,255,.08); margin:24px 0; }

    /* Footer */
    .footer { text-align:center; padding:24px 0 8px; font-size:12px; color:#4b5563; line-height:1.8; }
    .footer a { color:#6b7280; text-decoration:none; }
    .footer a:hover { color:#d4af37; }

    /* Responsive */
    @media (max-width:480px) { .body { padding:28px 20px; } }
  </style>
</head>
<body>
<div class="wrapper">

  <div class="header">
    <a class="header-logo" href="{{ config('app.url') }}">
      DAWRI <span>·</span> داوري
    </a>
    <div class="header-ar">منصة البطولات الرياضية الإلكترونية</div>
  </div>

  <div class="body">
    @yield('content')
  </div>

  <div class="footer">
    <p>© {{ date('Y') }} Dawri Platform · Saudi Arabia &amp; GCC</p>
    <p style="margin-top:6px;">
      <a href="{{ config('app.url') }}">dawri.com</a> ·
      <a href="{{ config('app.url') }}/contact">Contact</a> ·
      <a href="{{ config('app.url') }}/privacy">Privacy</a>
    </p>
    <p style="margin-top:10px;color:#374151;">
      You received this email because you have an account on Dawri Platform.<br/>
      If you didn't request this, you can safely ignore this email.
    </p>
  </div>

</div>
</body>
</html>
