# Tournament Module — Dawri Platform

## Backend files to copy

| Source | Destination in your project |
|---|---|
| `backend/app/Http/Controllers/Api/TournamentController.php` | `app/Http/Controllers/Api/` |
| `backend/app/Http/Controllers/Api/MatchController.php` | `app/Http/Controllers/Api/` |
| `backend/app/Http/Requests/*.php` | `app/Http/Requests/` |
| `backend/app/Http/Resources/*.php` | `app/Http/Resources/` |
| `backend/app/Services/BracketGeneratorService.php` | `app/Services/` |
| `backend/app/Services/BracketAdvancementService.php` | `app/Services/` |
| `backend/routes/api_tournament_snippet.php` | Merge into your `routes/api.php` |

## Frontend files to copy

| Source | Destination in your project |
|---|---|
| `frontend/src/app/shared/models/tournament.model.ts` | `src/app/shared/models/` |
| `frontend/src/app/core/services/tournament.service.ts` | `src/app/core/services/` |
| `frontend/src/app/pages/tournaments/*.ts` | `src/app/pages/tournaments/` |
| `frontend/src/app/pages/tournaments/*.html` | `src/app/pages/tournaments/` |
| `frontend/src/app/pages/tournaments/*.scss` | `src/app/pages/tournaments/` |

## Features

**Backend:**
- All 4 bracket formats: Single Elimination, Double Elimination, Round Robin, Swiss System
- Auto bye assignment and seeding
- Bracket advancement after each confirmed match result
- Match result submission with optional screenshot upload
- Dispute flow with moderator override
- Leaderboard sorted by wins, points, buchholz score
- Full FormRequest validation on every endpoint
- API Resources wrapping all responses

**Frontend:**
- Tournament list with game/format/open-only filters and live search
- Full bracket viewer with round-by-round column layout
- Match result modal — submit, confirm, dispute
- Leaderboard tab
- Prize pool tab
- Champion banner on completed tournaments
