# Sprint 15 — Code Review Findings & Fixes

This document records a post-build review performed against the actual Dawri
repository (latest commit `205699a6`). It confirms what is safe and what was
corrected before final delivery.

## Safety verdict: Copy-pasting cannot delete existing code

| Concern | Result |
|---|---|
| File path collisions | ✅ Zero — all 76 new files land on new paths |
| Database table collisions | ✅ Zero — `communities`, `channels`, `messages`, `message_reactions`, `message_mentions`, `community_members`, `channel_reads`, `user_presence` are all new |
| Model class collisions (`Channel`, `Message`) | ✅ Don't exist yet in `app/Models/` |
| Controller class collisions | ✅ None |
| Route URI collisions (`/communities`, `/channels/{}`, `/messages/{}`) | ✅ None registered |
| Existing `User::communities()` / `User::messages()` | ✅ Don't exist — safe to add |
| Existing `Tournament::community()` | ✅ Doesn't exist — safe to add |
| User UUID convention | ✅ Confirmed — `HasUuids` trait on User |
| Tournament UUID convention | ✅ Confirmed — `HasUuids` trait on Tournament |
| User has `nickname`, `avatar`, `role` columns | ✅ All present in `$fillable` |
| Tournament has `organizer_id`, `status`, `name` | ✅ All present |

**Conclusion:** None of the 76 new files will overwrite or remove any existing code.
The 5 manual edits documented in INTEGRATION.md are pure additions (one-line
`require`/`use` statements + new method bodies on User and Tournament models).

## Bugs found and fixed in this review

### 🔴 Fix 1 — `$user->isAdmin()` method does not exist

**Files affected (now patched):**
- `backend/app/Services/ChannelService.php`
- `backend/app/Services/ModerationService.php`
- `backend/database/seeders/GlobalCommunitySeeder.php`

**Problem:** Three call sites used `$actor->isAdmin()` to grant platform admins a
bypass over community moderation rules. The User model does not define that
method. While I had wrapped it in `method_exists()` guards, this meant platform
admins would silently lose their bypass — a real authorisation bug.

**Fix applied:** Replaced all three call sites with the canonical pattern used
in the existing `EnsureAdmin` middleware:

```php
if ($actor->role === 'admin') {
    return; // platform admin bypass
}
```

### 🔴 Fix 2 — Reverb is not actually installed in the repo

**Problem:** The Sprint 15 design assumed Laravel Reverb was already wired from
Sprint 6. Confirmed in code review that it is not:
- No `laravel/reverb` in composer.json
- No `config/broadcasting.php`
- No `routes/channels.php`
- No `Broadcast::channel()` calls anywhere in the codebase

**Impact:** Without Reverb, messages will save and load correctly, but they will
not broadcast in real time. Users would need to refresh to see new messages.
No existing feature breaks.

**Fix applied:** INTEGRATION.md now has a PRE-FLIGHT section with the exact
commands to install Reverb (`composer require laravel/reverb` + `php artisan
reverb:install`) before deploying the rest of Sprint 15.

### 🟠 Fix 3 — Tournament has no factory

**File affected (now patched):**
- `backend/tests/Unit/CommunityServiceTest.php`

**Problem:** `database/factories/TournamentFactory.php` does not exist and the
Tournament model does not use the `HasFactory` trait. Tests calling
`Tournament::factory()->create(...)` would error.

**Fix applied:** Rewrote the test to construct Tournament instances directly via
`Tournament::create([...])` with the minimum required fields (`id`, `name`,
`organizer_id`, `status`). If your tournaments table has additional NOT NULL
columns, extend the `makeTournament()` helper.

### 🟠 Fix 4 — `routes/channels.php` does not exist

**Problem:** INTEGRATION step 3 said "append to channels.php" but the file is
not present in the repo (Sprint 6 never created it).

**Fix applied:** INTEGRATION.md now instructs creation of `routes/channels.php`
with a `require __DIR__ . '/channels.community.php';` line, plus a note about
adding `withBroadcasting(channels: ...)` to `bootstrap/app.php` if the default
Laravel 11 bootstrap was modified.

## Items intentionally left as-is

- **`messages` and `channels` table names** — generic-looking, but our Eloquent
  models map to them explicitly via `$table` property where needed, and no
  existing table uses these names. Safe.
- **Soft-delete on messages** — deliberate for moderator audit trail.
- **No Tournament factory created** — out of scope for Sprint 15. The single
  test that needed one has been rewritten.

## Recommended verification commands after copy-paste

```powershell
cd "D:\xamp new\htdocs\dawri\backend"

# 1. Confirm nothing in the existing codebase changed
git status                          # should show only NEW files added

# 2. Confirm migrations are ordered correctly
php artisan migrate --pretend       # should list 8 new tables to create

# 3. Run migrations
php artisan migrate

# 4. Seed the global community
php artisan db:seed --class=GlobalCommunitySeeder

# 5. Run the Sprint 15 test suite
php artisan test --filter=Community
php artisan test --filter=Message

# 6. Verify routes registered (should show ~15 new routes)
php artisan route:list --path=communities
php artisan route:list --path=channels
php artisan route:list --path=messages
```

If any step produces an error, paste the output and we'll diagnose. The most
likely failure mode is a missing column on `tournaments` for the test fixture —
in which case add it to the `makeTournament()` helper.

---

Prepared as part of Sprint 15 quality gate. Review confidence: high.
