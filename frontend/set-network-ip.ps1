# ============================================================
# Dawri — Network Access: swap localhost -> LAN IP
# Run from the frontend folder:  D:\xamp new\htdocs\Dawri\frontend
#
#   powershell -ExecutionPolicy Bypass -File .\set-network-ip.ps1
#
# To REVERT back to localhost for normal dev, run:
#   powershell -ExecutionPolicy Bypass -File .\set-network-ip.ps1 -Revert
# ============================================================

param([switch]$Revert)

$ip = "192.168.100.67"

if ($Revert) {
    $from1 = "http://$ip`:8001"
    $to1   = "http://localhost:8001"
    $from2 = "wsHost: '$ip'"
    $to2   = "wsHost: 'localhost'"
    Write-Host "Reverting $ip -> localhost ..." -ForegroundColor Yellow
} else {
    $from1 = "http://localhost:8001"
    $to1   = "http://$ip`:8001"
    $from2 = "wsHost: 'localhost'"
    $to2   = "wsHost: '$ip'"
    Write-Host "Setting localhost -> $ip ..." -ForegroundColor Cyan
}

# Only touch .ts files under src, skip specs and node_modules
$files = Get-ChildItem -Path ".\src" -Recurse -Filter *.ts |
    Where-Object { $_.FullName -notmatch "node_modules" -and $_.Name -notmatch "\.spec\.ts$" }

$changed = 0
foreach ($f in $files) {
    $content = Get-Content -Raw -LiteralPath $f.FullName
    if ($content -match [regex]::Escape($from1) -or $content -match [regex]::Escape($from2)) {
        $new = $content.Replace($from1, $to1).Replace($from2, $to2)
        if ($new -ne $content) {
            Set-Content -LiteralPath $f.FullName -Value $new -NoNewline
            Write-Host "  updated: $($f.FullName.Replace((Get-Location).Path, '.'))" -ForegroundColor Green
            $changed++
        }
    }
}

Write-Host ""
Write-Host "Done. $changed file(s) updated." -ForegroundColor Cyan
Write-Host "Now restart the Angular dev server so the change is picked up." -ForegroundColor Yellow
