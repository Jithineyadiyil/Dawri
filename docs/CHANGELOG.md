# Changelog

## [Sprint 5 wizard add-on] — 2026-05-18

Built against `Jithineyadiyil/Dawri @ 1ce9254d` after a full ground-truth
read of the merged Sprint 5 streaming PR.

### Added

**Backend**
- `App\Services\Streaming\ObsWizardService` — wizard business logic with two
  config builders (broadcast scope + tournament scope, both with
  authorization mirrored exactly from `LiveBroadcastController`).
- `App\Http\Controllers\Api\ObsWizardController` — 5 endpoints, UUID-safe
  route-model binding.
- `App\Http\Requests\LogWizardEventRequest` + `WizardConfigResource`.
- `App\Models\BroadcastSetupLog` — UUID PK, `UPDATED_AT = null`, append-only.
- Migration `2026_05_18_120000_create_broadcast_setup_logs_table` with
  UUID FKs to `live_broadcasts`, `tournaments`, `users` (matches the real
  schema — no bigint/UUID mismatches this time).
- `App\Repositories\Eloquent\BroadcastSetupLogRepository` (correct
  namespace this time — alongside `LiveBroadcastRepository`).
- PHPUnit unit tests with Mockery (13 cases — no Laravel kernel needed).

**Frontend**
- `SetupWizardComponent` standalone — signals, OnPush, bilingual EN/AR with
  RTL, six steps, broadcast-status polling on Step 6.
- `ObsWizardService` typed HTTP client that auto-detects scope.
- `wizard.model.ts` with types mirroring Laravel resources exactly.
- Route snippet for both `/broadcasts/:id/setup-wizard` and
  `/tournaments/:id/setup-wizard`.
- Jest tests (8 cases) including 429 rate-limit + 410 terminal-broadcast
  error mappings.

### Integration with existing Sprint 5 streaming module

- **Reuses** the existing `GET /broadcasts/{id}/credentials` endpoint for
  RTMP/key reveal (no duplication — wizard Step 2 calls
  `LiveBroadcastService.getCredentials()` from frontend).
- **Reuses** `LiveBroadcastService::goLive()` for the wizard's final-step
  transition (`POST /broadcasts/{id}/setup-wizard/finish` is a thin wrapper
  that adds analytics logging around the existing service call).
- **Reuses** `LiveBroadcastService.get()` from frontend for status polling
  on Step 6 (no duplicate `GET /status` endpoint).

### Decisions documented

- **Scope auto-detection**: route URL prefix (`/broadcasts/` vs
  `/tournaments/`) drives the scope signal in the component; the component
  is a single shared standalone.
- **Auto-call on finish**: per user direction — one-flow experience.
- **Analytics kept**: `broadcast_setup_logs` table for funnel tracking
  with composite indexes on (broadcast_id, created_at),
  (tournament_id, created_at), (user_id, created_at), (event, created_at).
- **CHECK constraint** on (broadcast_id OR tournament_id IS NOT NULL) —
  emitted via raw SQL post-create, with try/catch fallback for MySQL <8.0.16.

### Pending (deferred)

- Cypress E2E spec (UI fully covered by Jest component tests; E2E left for
  a future sprint when the test infra is wired in CI).
- Funnel analytics dashboard reading from `broadcast_setup_logs`.
- Sprint 5b admin endpoint for `recentForBroadcast()` / `recentForTournament()`.
