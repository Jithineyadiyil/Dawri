<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        @page { margin: 1.5cm 1.2cm; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 10pt; color: #222; }
        h1   { font-size: 18pt; margin: 0 0 4pt; color: #a855f7; font-weight: bold; }
        h2   { font-size: 12pt; margin: 20pt 0 6pt; color: #333; border-bottom: 1pt solid #ccc; padding-bottom: 3pt; }
        .sub { color: #666; font-size: 9pt; margin: 0 0 12pt; }
        .meta { margin-bottom: 12pt; font-size: 9pt; color: #555; }
        table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 12pt; }
        th    { background: #a855f7; color: #fff; padding: 5pt 6pt; text-align: left; font-weight: bold; }
        td    { padding: 4pt 6pt; border-bottom: 1pt solid #eee; }
        .r    { text-align: right; }
        .mono { font-family: DejaVu Sans Mono, monospace; }
        .total-row td { font-weight: bold; background: #f5f0ff; }
        .muted { color: #888; }
        .footer { position: fixed; bottom: 0.3cm; left: 0; right: 0; text-align: center;
                  font-size: 8pt; color: #aaa; }
        .kv { display: inline-block; margin-right: 16pt; }
        .kv-label { color: #888; }
        .kv-value { font-weight: bold; }
    </style>
</head>
<body>
    <h1>Dawri</h1>
    <p class="sub">{{ $title }}</p>

    @yield('content')

    <div class="footer">
        Generated {{ $generated_at->format('Y-m-d H:i') }} · Dawri Platform · Confidential
    </div>
</body>
</html>
