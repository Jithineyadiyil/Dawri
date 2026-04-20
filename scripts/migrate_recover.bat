@echo off
REM ==============================================================================
REM Dawri Sprint 1 — Migration recovery (self-locating version)
REM ==============================================================================
REM Works regardless of which folder you launch it from.
REM Auto-detects backend\artisan by checking:
REM   1. <script-dir>\..\backend\artisan      (if script is at dawri\scripts\)
REM   2. <current-dir>\backend\artisan        (if cwd is the repo root)
REM   3. <current-dir>\artisan                (if cwd is the backend folder)
REM   4. Prompts for a path if none of the above match
REM ==============================================================================

setlocal enabledelayedexpansion

set "BACKEND="

REM ── Candidate 1: one level up from the script, plus \backend ─────────────
if exist "%~dp0..\backend\artisan" (
    set "BACKEND=%~dp0..\backend"
    goto :found
)

REM ── Candidate 2: current dir + \backend ──────────────────────────────────
if exist "%CD%\backend\artisan" (
    set "BACKEND=%CD%\backend"
    goto :found
)

REM ── Candidate 3: current dir IS the backend ──────────────────────────────
if exist "%CD%\artisan" (
    set "BACKEND=%CD%"
    goto :found
)

REM ── None found — prompt ──────────────────────────────────────────────────
echo.
echo === Dawri Sprint 1 — Migration recovery ===
echo.
echo Could not auto-detect your Laravel backend folder.
echo.
echo The script looked for an `artisan` file in:
echo   "%~dp0..\backend"
echo   "%CD%\backend"
echo   "%CD%"
echo.
echo Please paste the full path to your backend folder (the one containing
echo `artisan`, e.g. D:\xamp new\htdocs\dawri\backend):
echo.
set /p "BACKEND=Backend path: "

if not exist "%BACKEND%\artisan" (
    echo.
    echo ERROR: No `artisan` file found in "%BACKEND%".
    echo Aborting — fix the path or run the inline commands from README_V2_ADDENDUM.md
    echo.
    pause
    exit /b 1
)

:found
echo.
echo === Dawri Sprint 1 — Migration recovery ===
echo.
echo Using backend: %BACKEND%
echo.

pushd "%BACKEND%"

echo Step 1 of 4: Clearing caches...
call php artisan config:clear
call php artisan cache:clear

echo.
echo Step 2 of 4: Current migration status...
call php artisan migrate:status

echo.
echo --------------------------------------------------------------
echo   Review the status above. Anything marked `Pending` will run.
echo   Press any key to apply the pending migrations, or Ctrl+C to abort.
echo --------------------------------------------------------------
pause >nul

echo.
echo Step 3 of 4: Running pending migrations...
call php artisan migrate --force

echo.
echo Step 4 of 4: Verifying schema...
call php artisan tinker --execute="echo 'digital_products.distributor_product_id: ' . (Schema::hasColumn('digital_products','distributor_product_id')?'YES':'NO') . PHP_EOL; echo 'digital_products.sort_order:          ' . (Schema::hasColumn('digital_products','sort_order')?'YES':'NO') . PHP_EOL; echo 'users.phone_verified_at:              ' . (Schema::hasColumn('users','phone_verified_at')?'YES':'NO') . PHP_EOL; echo 'invoices table:                        ' . (Schema::hasTable('invoices')?'YES':'NO') . PHP_EOL; echo 'invoices.invoice_number:               ' . (Schema::hasColumn('invoices','invoice_number')?'YES':'NO') . PHP_EOL;"

echo.
echo === Recovery complete ===
echo.
echo Next step: seed the database
echo   php artisan db:seed --class=DatabaseSeeder
echo.

popd
endlocal
pause
exit /b 0
