# ═══════════════════════════════════════════════════════════════════════════
# Dawri — Palette v3 hex sweep (PowerShell, Windows)
# ═══════════════════════════════════════════════════════════════════════════
#
# This script patches the 10 component files that hardcode #f0a500 / #00e5ff
# instead of using the var(--gold) / var(--cyan) tokens from styles.scss.
#
# Run from PowerShell (NOT cmd.exe):
#   cd "D:\xamp new\htdocs\Dawri"
#   powershell -ExecutionPolicy Bypass -File palette_v3_sweep.ps1
#
# The script is IDEMPOTENT — running it twice produces the same result.
# No file is modified unless it actually contains one of the old hex values.
# ═══════════════════════════════════════════════════════════════════════════

$root = "frontend\src\app\pages"

$replacements = @{
    '#f0a500' = '#a855f7'   # gold → violet
    '#00e5ff' = '#fbbf24'   # cyan → amber
    # Common alpha variants
    'rgba(240,165,0,' = 'rgba(168,85,247,'
    'rgba(240, 165, 0,' = 'rgba(168, 85, 247,'
    'rgba(0,229,255,' = 'rgba(251,191,36,'
    'rgba(0, 229, 255,' = 'rgba(251, 191, 36,'
}

$targets = @(
    "admin\admin.component.ts",
    "admin\games\admin-games.component.scss",
    "dashboard\dashboard.component.ts",
    "home\home.component.scss",
    "home\home.component.ts",
    "leaderboard\leaderboard.component.scss",
    "profile\profile.component.ts",
    "subscription\subscription.component.scss",
    "subscription\subscription.component.ts",
    "tournaments\create-tournament.component.scss",
    "tournaments\tournament-detail.component.scss"
)

$modified = 0
$scanned = 0

foreach ($rel in $targets) {
    $path = Join-Path $root $rel
    if (-not (Test-Path $path)) {
        Write-Host "  skip (not found): $rel" -ForegroundColor DarkYellow
        continue
    }
    $scanned++
    $content = Get-Content -Path $path -Raw
    $original = $content

    foreach ($old in $replacements.Keys) {
        $content = $content.Replace($old, $replacements[$old])
    }

    if ($content -ne $original) {
        Set-Content -Path $path -Value $content -NoNewline
        Write-Host "  patched: $rel" -ForegroundColor Green
        $modified++
    } else {
        Write-Host "  unchanged: $rel" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Palette v3 sweep complete" -ForegroundColor Cyan
Write-Host "  Scanned:  $scanned files"
Write-Host "  Modified: $modified files"
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Restart ng serve (Ctrl+C, then ng serve)"
Write-Host "  2. Hard-refresh browser (Ctrl+Shift+F5)"
Write-Host "  3. Visit each page to confirm the palette landed"
