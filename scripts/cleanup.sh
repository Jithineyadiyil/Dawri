#!/usr/bin/env bash
# ==============================================================================
# Dawri Sprint 1 — Dead file cleanup (POSIX / CI)
# ==============================================================================
# Run from the Dawri repo root:
#     bash scripts/cleanup.sh
# ==============================================================================

set -euo pipefail

echo
echo "=== Dawri Sprint 1 cleanup ==="
echo

delete() {
    if [[ -e "$1" ]]; then
        rm -f "$1"
        echo "  [deleted] $1"
    else
        echo "  [skipped] $1"
    fi
}

# Stray zero-byte shell-fragment files at backend root
delete 'backend/5000])'
delete "backend/after('status')"
delete "backend/pluck('email')"

# Duplicate class declarations
delete 'backend/app/Http/Controllers/Api/LikecardService.php'
delete 'backend/app/Http/Controllers/Api/LikecardService (1).php'
delete 'backend/app/Http/Controllers/Api/PaymentService.php'

# Misplaced migration inside the controllers folder
delete 'backend/app/Http/Controllers/Api/create_invoices_table.php'

# PATCH_ notes committed as code files
delete 'backend/app/Services/PATCH_BracketAdvancementService.php'
delete 'backend/app/Http/Resources/PATCH_TournamentResource.php'
delete 'frontend/src/app/pages/PATCH_tournaments_leaderboard.ts'

# Unmerged patch stub (has wrong column names, unwired)
delete 'backend/app/Services/TournamentRegistrationService.php'

# Unregistered / dead route files
delete 'backend/routes/admin_routes.php'
delete 'backend/routes/api_dashboard_routes.php'
delete 'backend/routes/api_marketplace.php'
delete 'backend/routes/api_new_routes.php'
delete 'backend/routes/api_tournament_snippet.php'
delete 'backend/routes/api_tournaments.php'

echo
echo "=== Running composer dump-autoload ==="
echo
( cd backend && composer dump-autoload )

echo
echo "=== Cleanup complete ==="
echo "Next: follow steps 2-5 in docs/README_SPRINT1.md"
echo
