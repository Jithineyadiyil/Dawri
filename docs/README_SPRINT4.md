# Dawri Sprint 4 — Player Profiles

Adds an editable profile page for every player and propagates nicknames +
avatars through tournament brackets and leaderboards.

---

## What's in the bundle

### Backend (8 files)

```
backend/database/migrations/
  └── 2026_04_20_000004_add_nickname_to_users.php            [NEW]

backend/app/Models/
  └── User.php                                               [extended]
       • nickname column added to $fillable
       • avatar_url accessor (handles URL or storage path)
       • display_name accessor (nickname > name fallback)
       • $appends = ['avatar_url', 'display_name']

backend/app/Services/
  └── AvatarService.php                                      [NEW]
       • Upload/remove avatar on 'public' disk
       • Auto-cleanup of old files on replace
       • Ignores external URLs (won't try to delete them)

backend/app/Http/Requests/
  ├── UpdateProfileRequest.php                               [NEW]
  └── UploadAvatarRequest.php                                [NEW]

backend/app/Http/Resources/
  ├── ProfileResource.php                                    [NEW — self]
  └── TournamentResource.php                                 [EXTENDED]
       • Every participant reference now includes display_name + avatar_url
         (list, match participant_a/participant_b/winner, organizer)

backend/app/Http/Controllers/Api/
  └── ProfileController.php                                  [NEW]

backend/routes/
  └── api.php                                                [EXTENDED]
```

### Frontend (5 files + 1 updated routes)

```
frontend/src/app/pages/profile/
  ├── my-profile.component.ts                                [NEW]
  ├── my-profile.component.html                              [NEW]
  └── my-profile.component.scss                              [NEW]

frontend/src/app/pages/tournaments/
  ├── tournament-detail.component.html                       [EXTENDED]
  │    • Bracket cards: avatar circle + display_name (not real name)
  │    • Leaderboard: avatar + display_name
  │    • Match modal player labels use display_name
  │    • Result-submission radios use display_name
  └── tournament-detail.component.scss                       [EXTENDED]
       • Styles for .b-match__avatar and .leaderboard__avatar
       • Gold gradient placeholders for users with no photo

frontend/src/app/
  └── app.routes.ts                                          [UPDATED]
       • Adds /profile → MyProfileComponent (canActivate: authGuard)
       • Leaves /players/:id pointing to the existing ProfileComponent
```

---

## Install order

From the Dawri root on Windows:

```cmd
cd /D "D:\xamp new\htdocs\Dawri"

REM ── Backend ───────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\backend\app\Models\User.php                   backend\app\Models\
xcopy /Y /I <bundle>\backend\app\Services\AvatarService.php        backend\app\Services\
xcopy /Y /I <bundle>\backend\app\Http\Requests\*.php               backend\app\Http\Requests\
xcopy /Y /I <bundle>\backend\app\Http\Resources\*.php              backend\app\Http\Resources\
xcopy /Y /I <bundle>\backend\app\Http\Controllers\Api\ProfileController.php backend\app\Http\Controllers\Api\
xcopy /Y /I <bundle>\backend\database\migrations\*.php             backend\database\migrations\
xcopy /Y /I <bundle>\backend\routes\api.php                        backend\routes\

REM ── Frontend ──────────────────────────────────────────────────────────
xcopy /Y /I <bundle>\frontend\src\app\pages\profile\*.*            frontend\src\app\pages\profile\
xcopy /Y /I <bundle>\frontend\src\app\pages\tournaments\tournament-detail.component.* frontend\src\app\pages\tournaments\
xcopy /Y /I <bundle>\frontend\src\app\app.routes.ts                frontend\src\app\

REM ── Apply DB changes ─────────────────────────────────────────────────
cd backend
php artisan migrate
```

No new middleware aliases or package installs required.

---

## API reference

### Self profile (authenticated)

| Method | Route                  | Body / Returns                                    |
|--------|------------------------|---------------------------------------------------|
| GET    | `/profile/me`          | Returns `{ data: ProfileResource }`               |
| PATCH  | `/profile/me`          | `{ name?, nickname?, bio?, country?, city?, psn_id?, pubg_id?, cod_id? }` — only send dirty fields |
| POST   | `/profile/me/avatar`   | multipart: `file` (JPG/PNG/WEBP, ≤2MB)            |
| DELETE | `/profile/me/avatar`   | —                                                 |

### Validation rules

- `nickname`: 3–30 chars, `^[A-Za-z0-9_]+$`, **globally unique** (when set)
  - If taken, API returns 422 with `errors.nickname`
- `bio`: max 500 chars
- `name`: 2–100 chars, required

### Response shape

`ProfileResource.toArray()` includes: `id`, `name`, `nickname`,
`display_name`, `email`, `phone`, `role`, `avatar_url`, `bio`,
`country`, `city`, `game_username`, `psn_id`, `pubg_id`, `cod_id`,
`preferred_games`, `status`, `subscription_plan`, `company_id`,
`created_at`.

`display_name` is computed server-side as `nickname ?: name` so the
frontend never has to pick — just render `display_name` everywhere.

### Tournament participants now carry identity fields

Every participant reference returned by `GET /tournaments/{id}` now
includes:

```json
{
  "id": "...",
  "user_id": "...",
  "name": "Faisal Al-Ghamdi",
  "display_name": "dawri_king",
  "nickname": "dawri_king",
  "avatar_url": "http://localhost:8001/storage/avatars/{user_id}/{uuid}.jpg"
}
```

This applies to the `participants[]` array AND to every match's
`participant_a`, `participant_b`, and `winner` fields.

---

## Smoke test

```cmd
REM 1. Fetch current profile
curl http://localhost:8001/api/v1/profile/me ^
  -H "Authorization: Bearer %TOKEN%"

REM 2. Set a nickname
curl -X PATCH http://localhost:8001/api/v1/profile/me ^
  -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"nickname\":\"dawri_king\",\"bio\":\"EA FC 25 enthusiast.\"}"

REM 3. Try to take an already-taken nickname (expect 422)
curl -X PATCH http://localhost:8001/api/v1/profile/me ^
  -H "Authorization: Bearer %OTHER_TOKEN%" -H "Content-Type: application/json" ^
  -d "{\"nickname\":\"dawri_king\"}"

REM 4. Upload an avatar
curl -X POST http://localhost:8001/api/v1/profile/me/avatar ^
  -H "Authorization: Bearer %TOKEN%" ^
  -F "file=@C:\path\to\photo.jpg"

REM 5. View any tournament as that player is a participant — their nickname
REM    and photo should now be shown on the bracket and leaderboard.
```

---

## UI behavior

**`/profile`** (authenticated users only):
- Sticky avatar card on the left with circular 180×180 photo or gold letter placeholder
- File-picker upload triggers immediate POST to `/profile/me/avatar` (no save-button needed for photo)
- Right side has four cards: Identity / Location / Game Handles / Account
- Nickname input renders with an `@` prefix for gamer-tag styling
- Save button is disabled unless the form is dirty; only dirty fields are PATCHed
- Unique-nickname conflicts surface inline below the input
- Real name is shown below the display name if they differ

**Bracket cards** (all participants):
- 22×22 circular avatar appears before the name, stops the text from pushing the layout when names are long
- If the user has no avatar, a gold-gradient placeholder with their initial is shown
- BYEs stay as italic "BYE" text (no avatar)

**Leaderboard**:
- 32×32 avatar circle inline with the name
- Same placeholder fallback

**Match modal** (score submission + match details):
- Player labels use `display_name` so nicknames show throughout

---

## Known / deferred

- The existing `/players/:id` component (public view) still uses real name + avatar fields from wherever it sourced them. This bundle doesn't touch that file — if you want public player profiles to also show nicknames, add `display_name` + `avatar_url` to that component using the data already exposed on `User`.
- `api.service.ts` isn't centralizing the profile calls — `MyProfileComponent` hits HttpClient directly for brevity. You can lift them into `ApiService` later (snippet in the original patch guide).
- Nickname is currently case-sensitive and unique globally. If you want case-insensitive uniqueness, normalize it to lowercase in `UpdateProfileRequest::prepareForValidation()` before the `Rule::unique` check runs.
