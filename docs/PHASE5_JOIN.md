# Phase 5 — Join Flow (invite links + request-to-join)

Adds a join model to communities, which previously were only auto-enrolled
(global) or tournament-bound. Communities now have a **join policy**, shareable
**invite links**, and a **request-to-join** approval flow.

## Concepts
- **join_policy** (new column on communities; default `closed` for existing rows):
  - `open` — anyone with an invite link joins instantly
  - `request` — joining creates a pending request a moderator approves
  - `closed` — invite-only; no open requests (a valid invite still lets someone in)
- **Invite links** — moderators generate tokens (optional expiry / max uses),
  shareable as `/community/join/<token>`. Redeeming joins instantly (open/closed)
  or creates a request (request policy).
- **Request-to-join** — a user requests membership; moderators see pending
  requests and approve (enrolls them) or deny.

## Who can do what
- Set policy, create/revoke invites, view + decide requests → **moderators+**
  (owner/admin/moderator) or platform admin.
- Redeem an invite / request to join → any authenticated user.
- Enrollment reuses the existing `CommunityMemberRepository::attach`.

## Backend
- **Migration** `2026_06_10_000003_create_join_flow_tables.php` — adds
  `join_policy` to communities; creates `community_invites` and
  `community_join_requests` (one request row per user per community).
- Models `CommunityInvite` (`isUsable()`), `CommunityJoinRequest`
  (PENDING/APPROVED/DENIED). Both single-PK → `HasUuids` (the composite-PK
  `community_members` rule does not apply here).
- `JoinService` — createInvite/revokeInvite, redeemInvite, requestJoin,
  approveRequest/denyRequest. No interface/binding needed (auto-resolved; its
  one dependency is already bound).
- `InviteResource`, `JoinRequestResource`, `JoinController`.
- `Community` model: `join_policy` added to `$fillable`.
- `CommunityResource`: exposes `join_policy`.
- Routes (in `routes/api.community.php`):
  - `PATCH /communities/{c}/join-policy`
  - `GET|POST /communities/{c}/invites`, `DELETE /invites/{invite}`
  - `POST /invites/{token}/redeem`  (token path, alphanumeric)
  - `POST /communities/{c}/join`
  - `GET /communities/{c}/join-requests`
  - `POST /join-requests/{r}/approve`, `POST /join-requests/{r}/deny`

## Frontend
- `models/community.model.ts` — `JoinPolicy`, `CommunityInvite`, `JoinRequest`,
  `JoinResult`; `join_policy?` on the Community type.
- `services/community.service.ts` — the 9 join-flow methods.
- `components/join-panel/...` — moderator panel: set policy, generate/copy/revoke
  invites, approve/deny requests. (Self-contained; calls the service directly.)
- `pages/invite-redeem/...` — the `/community/join/:token` redemption page.
- `pages/channel-view/...` — a ⚙️ Join button (moderators only) opening the panel.
- `community.routes.ts` — adds `join/:token` (before the shell route).

## Apply (depends on Phases 1–4; built on the latest stacked files)
1. Overwrite the files. Shared files build forward:
   - `community.model.ts`, `community.service.ts` carry all prior phases.
   - `channel-view.component.ts` = pinned + scroll + Events + the new Join button/panel.
   - `community.routes.ts` adds the redeem route.
2. **Run the migration:** `php artisan migrate`
3. `php artisan optimize:clear`, restart `php artisan serve` + reverb + queue.
4. Frontend recompiles; hard-refresh.

## Test
- As an admin/moderator of a community: header → ⚙️ Join.
  - Set policy to **Open**, click **+ New link**, **Copy** it.
  - Open the link in another account/incognito → it joins instantly and lands
    in the community.
  - Switch policy to **Request to join**. The same link (or POST /join) now
    creates a pending request; the requester sees "Request sent".
  - Back in the panel, the request appears under Pending → **Approve** enrolls
    them, **Deny** rejects.
  - **Revoke** an invite → redeeming it then fails with "invalid or expired".
- As a plain member: no ⚙️ Join button.

## Notes
- Verified by structural inspection, not compiled. First `php artisan migrate`
  and `ng serve` are the real test — paste any error.
- The redeem page assumes the user is logged in (the API requires auth). A
  logged-out user hitting the link will be handled by your existing auth guard /
  redirect; if you want an explicit "log in to join" step, that's a small add.
- No email/notification when a request is approved/denied yet — the member is
  simply enrolled. Notifications could be a later enhancement.
