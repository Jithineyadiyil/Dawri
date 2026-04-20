# Dawri — Tournament Module Fix Package

## What's in this ZIP

| File | What it fixes |
|---|---|
| `backend/app/Services/BracketGeneratorService.php` | **Was missing from disk** — caused `BindingResolutionException` on every tournament route |
| `backend/app/Services/BracketAdvancementService.php` | **Was missing from disk** — same issue |
| `backend/app/Http/Controllers/Api/TournamentController.php` | Added `withCount('participants')`, correct eager-loading, `generateBracket`, `submitResult`, `register` endpoints |
| `backend/app/Http/Resources/TournamentResource.php` | Added `game_label`, `format_label`, `status_label`; N+1 fix in `matchArray()` |
| `backend/app/Http/Requests/StoreTournamentRequest.php` | Full validation for tournament creation |
| `backend/app/Http/Requests/UpdateTournamentRequest.php` | Full validation for tournament update |
| `backend/routes/api_tournaments.php` | Correct route definitions (use this as reference) |
| `backend/app/Providers/AppServiceProvider.php` | `Schema::defaultStringLength(191)` boot fix |
| `frontend/src/app/core/services/api.service.ts` | Correct base URL `localhost:8001`, all endpoints, full TypeScript interfaces |

---

## Deployment Steps

### 1 — Copy service files (most critical)
```bash
cd D:\xamp new\htdocs\dawri\backend

copy "path\to\zip\backend\app\Services\BracketGeneratorService.php"   app\Services\
copy "path\to\zip\backend\app\Services\BracketAdvancementService.php" app\Services\

# Verify they exist:
dir app\Services\
```
You should see both files. If this directory was empty before — that was the root cause of every 500 error.

### 2 — Copy all other backend files
```bash
copy "backend\app\Http\Controllers\Api\TournamentController.php"  app\Http\Controllers\Api\
copy "backend\app\Http\Resources\TournamentResource.php"          app\Http\Resources\
copy "backend\app\Http\Requests\StoreTournamentRequest.php"       app\Http\Requests\
copy "backend\app\Http\Requests\UpdateTournamentRequest.php"      app\Http\Requests\
copy "backend\app\Providers\AppServiceProvider.php"               app\Providers\
```

### 3 — Verify routes/api.php matches these routes
Open `routes/api.php` and confirm your `/api/v1` group contains:
```
GET    /tournaments
GET    /tournaments/{tournament}
POST   /tournaments
PUT    /tournaments/{tournament}
DELETE /tournaments/{tournament}
POST   /tournaments/{tournament}/generate-bracket
POST   /tournaments/{tournament}/register
POST   /tournaments/{tournament}/matches/{matchId}/result
```
If not, merge from `backend/routes/api_tournaments.php`.

### 4 — Clear Laravel caches
```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan optimize:clear
```

### 5 — Verify migrations have required columns
The `tournament_matches` table must have these columns:
- `prev_match1_id` (nullable FK → tournament_matches.id)
- `prev_match2_id` (nullable FK → tournament_matches.id)
- `bracket_side` (varchar: winners/losers/grand_final)
- `winner_id` (nullable FK → tournament_participants.id)
- `score1`, `score2` (nullable integer)
- `screenshot_url` (nullable text)

If any are missing, run a new migration to add them.

### 6 — Test with curl
```bash
# Should return JSON with data array (not 500):
curl http://localhost:8001/api/v1/tournaments

# Check logs if still failing:
tail -30 storage/logs/laravel.log
```

### 7 — Copy Angular service
```bash
copy "frontend\src\app\core\services\api.service.ts"  ..\frontend\src\app\core\services\
```

### 8 — Rebuild Angular
```bash
cd D:\xamp new\htdocs\dawri\frontend
ng serve --port 4300
```

---

## Quick Diagnostic Checklist

If you still see errors after deploying:

- [ ] `dir app\Services\` shows both service files
- [ ] `php artisan route:list | findstr tournament` shows all 8 routes
- [ ] `curl http://localhost:8001/api/v1/tournaments` returns `{"data":[...]}`
- [ ] `tail -30 storage/logs/laravel.log` shows no exceptions
- [ ] Angular console shows no 404s on `localhost:8001/api/v1/tournaments`
