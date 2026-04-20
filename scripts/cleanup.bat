@echo off
REM ==============================================================================
REM Dawri Sprint 1 — Dead file cleanup (Windows / XAMPP)
REM ==============================================================================
REM Run this from the Dawri repo root:
REM     cd "D:\xamp new\htdocs\dawri"
REM     scripts\cleanup.bat
REM
REM This removes every stray, duplicate, and patch-stub file identified in the
REM Sprint 1 code review. See docs/README_SPRINT1.md for the rationale behind
REM each deletion.
REM
REM Each delete is guarded with an existence check so the script is idempotent.
REM ==============================================================================

setlocal enabledelayedexpansion

echo.
echo === Dawri Sprint 1 cleanup ===
echo.

REM ── Stray zero-byte shell-fragment files at backend root ─────────────────────
call :delete "backend\5000])"
call :delete "backend\after('status')"
call :delete "backend\pluck('email')"

REM ── Duplicate class declarations (composer duplicate-class warnings) ─────────
call :delete "backend\app\Http\Controllers\Api\LikecardService.php"
call :delete "backend\app\Http\Controllers\Api\LikecardService (1).php"
call :delete "backend\app\Http\Controllers\Api\PaymentService.php"

REM ── Misplaced migration in the controllers folder ────────────────────────────
call :delete "backend\app\Http\Controllers\Api\create_invoices_table.php"

REM ── PATCH_ notes committed as code files ─────────────────────────────────────
call :delete "backend\app\Services\PATCH_BracketAdvancementService.php"
call :delete "backend\app\Http\Resources\PATCH_TournamentResource.php"
call :delete "frontend\src\app\pages\PATCH_tournaments_leaderboard.ts"

REM ── Unmerged patch stub (has wrong column names, unwired) ────────────────────
call :delete "backend\app\Services\TournamentRegistrationService.php"

REM ── Unregistered/dead route files ────────────────────────────────────────────
call :delete "backend\routes\admin_routes.php"
call :delete "backend\routes\api_dashboard_routes.php"
call :delete "backend\routes\api_marketplace.php"
call :delete "backend\routes\api_new_routes.php"
call :delete "backend\routes\api_tournament_snippet.php"
call :delete "backend\routes\api_tournaments.php"

echo.
echo === Running composer dump-autoload to refresh the autoload map ===
echo.

pushd backend
composer dump-autoload
popd

echo.
echo === Cleanup complete ===
echo Next: follow steps 2-5 in docs\README_SPRINT1.md
echo.

endlocal
exit /b 0

:delete
if exist "%~1" (
    del /F /Q "%~1"
    echo   [deleted] %~1
) else (
    echo   [skipped] %~1
)
exit /b 0
