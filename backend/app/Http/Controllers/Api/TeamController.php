<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Team;
use App\Models\TeamInvite;
use App\Models\TeamMember;
use App\Models\User;
use App\Notifications\TeamInviteNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * TeamController — Dawri 2.0 team management.
 *
 *   Public / browse
 *     GET    /teams                      — list (filters: game, q, recruiting)
 *     GET    /teams/{team}               — show + roster
 *
 *   Owner / captain
 *     POST   /teams                      — create
 *     PATCH  /teams/{team}               — update
 *     DELETE /teams/{team}               — disband (owner)
 *
 *   Roster
 *     POST   /teams/{team}/invites       — invite user { user_id }
 *     DELETE /teams/{team}/members/{user} — kick member
 *     POST   /teams/{team}/members/{user}/promote   — to captain
 *     POST   /teams/{team}/members/{user}/demote    — back to member
 *     POST   /teams/{team}/leave         — leave the team (non-owner)
 *
 *   Invites (invitee side)
 *     GET    /me/team-invites            — my pending invites
 *     POST   /team-invites/{invite}/accept
 *     POST   /team-invites/{invite}/decline
 *
 *   Me
 *     GET    /me/teams                   — teams I'm on
 */
final class TeamController extends Controller
{
    // ── Browse ────────────────────────────────────────────────────────

    public function index(Request $request): JsonResponse
    {
        $data = $request->validate([
            'game'       => ['nullable', 'string', 'max:40'],
            'q'          => ['nullable', 'string', 'max:80'],
            'recruiting' => ['nullable', 'boolean'],
        ]);

        $q = Team::query()->with('owner')->where('is_active', true);
        if (!empty($data['game']))       $q->where('game', $data['game']);
        if (!empty($data['q'])) {
            $needle = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $data['q']) . '%';
            $q->where(function ($w) use ($needle) {
                $w->where('name', 'like', $needle)->orWhere('tag', 'like', $needle);
            });
        }
        if (!empty($data['recruiting'])) $q->where('is_recruiting', true);

        $teams = $q->limit(60)->get();

        // member counts in one query
        $counts = TeamMember::query()
            ->whereIn('team_id', $teams->pluck('id'))
            ->selectRaw('team_id, COUNT(*) as c')
            ->groupBy('team_id')->pluck('c', 'team_id');

        return response()->json([
            'data' => $teams->map(fn (Team $t) => $this->publicTeam($t, $counts[$t->id] ?? 0))->values(),
        ]);
    }

    public function show(Request $request, Team $team): JsonResponse
    {
        $team->load('owner');
        $members = $team->members()->with('user')->orderBy('role')->orderBy('joined_at')->get();
        $me = $request->user();

        return response()->json([
            'data' => array_merge($this->publicTeam($team, $members->count()), [
                'description'   => $team->description,
                'members'       => $members->map(fn (TeamMember $m) => [
                    'id'            => $m->id,
                    'user'          => $this->publicUser($m->user),
                    'role'          => $m->role,
                    'jersey_number' => $m->jersey_number,
                    'joined_at'     => $m->joined_at,
                ])->values(),
                'my_role'       => $team->roleOf($me?->id ?? ''),
                'i_am_owner'    => $team->owner_id === ($me?->id ?? ''),
            ]),
        ]);
    }

    // ── Create / Update / Destroy ─────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:100'],
            'tag'         => ['nullable', 'string', 'max:10'],
            'game'        => ['required', 'string', 'max:40'],
            'region'      => ['nullable', 'string', 'max:80'],
            'description' => ['nullable', 'string', 'max:500'],
            'logo_url'    => ['nullable', 'url', 'max:500'],
        ]);

        $me   = $request->user();
        $slug = $this->uniqueSlug($data['name']);

        $team = Team::create([
            'owner_id' => $me->id,
            'name'     => $data['name'],
            'slug'     => $slug,
            'tag'      => $data['tag'] ?? null,
            'game'     => $data['game'],
            'region'   => $data['region'] ?? null,
            'description' => $data['description'] ?? null,
            'logo_url' => $data['logo_url'] ?? null,
        ]);

        // Owner is also a roster member.
        TeamMember::create([
            'team_id' => $team->id,
            'user_id' => $me->id,
            'role'    => TeamMember::ROLE_OWNER,
            'joined_at' => now(),
        ]);

        // Auto-provision the team chat conversation with the owner inside.
        $this->syncTeamChat($team);

        try {
            app(\App\Services\AchievementService::class)
                ->trigger($me, 'team_created', ['source_id' => $team->id]);
        } catch (\Throwable $e) { /* best-effort */ }

        $team->load('owner');
        return response()->json(['data' => $this->publicTeam($team, 1)], 201);
    }

    /**
     * Ensure a team conversation exists and its participants exactly match
     * the current roster. Idempotent — safe to call after any roster mutation.
     */
    private function syncTeamChat(Team $team): void
    {
        $owner = $team->owner ?? User::find($team->owner_id);
        if (!$owner) return;
        $conv = Conversation::forTeam($team, $owner);

        $rosterIds = $team->members()->pluck('user_id')->all();
        $current   = \DB::table('conversation_participants')->where('conversation_id', $conv->id)->pluck('user_id')->all();

        $toAdd    = array_diff($rosterIds, $current);
        $toRemove = array_diff($current, $rosterIds);

        if ($toAdd) {
            $rows = array_map(fn ($uid) => [
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'conversation_id' => $conv->id, 'user_id' => $uid,
                'joined_at' => now(), 'created_at' => now(), 'updated_at' => now(),
            ], $toAdd);
            \DB::table('conversation_participants')->insertOrIgnore($rows);
        }
        if ($toRemove) {
            \DB::table('conversation_participants')
                ->where('conversation_id', $conv->id)->whereIn('user_id', $toRemove)->delete();
        }
    }

    public function update(Request $request, Team $team): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: true);

        $data = $request->validate([
            'name'          => ['sometimes', 'string', 'max:100'],
            'tag'           => ['sometimes', 'nullable', 'string', 'max:10'],
            'region'        => ['sometimes', 'nullable', 'string', 'max:80'],
            'description'   => ['sometimes', 'nullable', 'string', 'max:500'],
            'logo_url'      => ['sometimes', 'nullable', 'url', 'max:500'],
            'is_recruiting' => ['sometimes', 'boolean'],
        ]);

        $team->fill($data)->save();
        $team->load('owner');
        return response()->json(['data' => $this->publicTeam($team, $team->members()->count())]);
    }

    public function destroy(Request $request, Team $team): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: false);
        $team->delete();   // cascades to members + invites
        return response()->json(['ok' => true]);
    }

    // ── Roster ────────────────────────────────────────────────────────

    public function invite(Request $request, Team $team): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: true);
        $data = $request->validate([
            'user_id' => ['required', 'uuid', 'exists:users,id'],
        ]);

        $userId = $data['user_id'];
        if ($team->hasMember($userId)) {
            throw ValidationException::withMessages(['user_id' => 'Already a team member.']);
        }
        $existingPending = TeamInvite::query()
            ->where('team_id', $team->id)->where('user_id', $userId)->where('status', TeamInvite::STATUS_PENDING)
            ->exists();
        if ($existingPending) {
            throw ValidationException::withMessages(['user_id' => 'Invite already pending for this user.']);
        }

        $me     = $request->user();
        $invite = TeamInvite::create([
            'team_id'    => $team->id,
            'user_id'    => $userId,
            'invited_by' => $me->id,
            'status'     => TeamInvite::STATUS_PENDING,
        ]);

        $target = User::find($userId);
        $target?->notify(new TeamInviteNotification(
            $invite->id, $team->id, $team->name, $team->tag, $me->display_name, $me->avatar_url,
        ));

        return response()->json(['data' => $this->publicInvite($invite->load('team'))], 201);
    }

    public function kickMember(Request $request, Team $team, User $user): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: true);
        if ($team->owner_id === $user->id) {
            throw ValidationException::withMessages(['user' => 'Cannot remove the owner.']);
        }
        $team->members()->where('user_id', $user->id)->delete();
        $this->syncTeamChat($team);
        return response()->json(['ok' => true]);
    }

    public function promoteMember(Request $request, Team $team, User $user): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: false);
        $m = $team->members()->where('user_id', $user->id)->first();
        abort_if(!$m, 404, 'Not a member.');
        $m->update(['role' => TeamMember::ROLE_CAPTAIN]);
        return response()->json(['ok' => true]);
    }

    public function demoteMember(Request $request, Team $team, User $user): JsonResponse
    {
        $this->assertCanManage($request, $team, captainOk: false);
        $m = $team->members()->where('user_id', $user->id)->first();
        abort_if(!$m, 404, 'Not a member.');
        abort_if($m->role === TeamMember::ROLE_OWNER, 422, 'Cannot demote owner.');
        $m->update(['role' => TeamMember::ROLE_MEMBER]);
        return response()->json(['ok' => true]);
    }

    public function leave(Request $request, Team $team): JsonResponse
    {
        $me = $request->user();
        if ($team->owner_id === $me->id) {
            throw ValidationException::withMessages(['team' => 'Owners cannot leave — transfer or disband first.']);
        }
        $team->members()->where('user_id', $me->id)->delete();
        $this->syncTeamChat($team);
        return response()->json(['ok' => true]);
    }

    // ── Invitee side ──────────────────────────────────────────────────

    public function myInvites(Request $request): JsonResponse
    {
        $rows = TeamInvite::query()
            ->where('user_id', $request->user()->id)
            ->where('status', TeamInvite::STATUS_PENDING)
            ->with(['team.owner', 'inviter'])
            ->latest()
            ->get();

        return response()->json(['data' => $rows->map(fn ($r) => $this->publicInvite($r))->values()]);
    }

    public function acceptInvite(Request $request, TeamInvite $invite): JsonResponse
    {
        $me = $request->user();
        abort_if($invite->user_id !== $me->id, 403, 'Not your invite.');
        abort_if($invite->status !== TeamInvite::STATUS_PENDING, 409, 'Invite no longer pending.');

        $invite->update(['status' => TeamInvite::STATUS_ACCEPTED, 'decided_at' => now()]);

        // Add to roster (idempotent).
        TeamMember::firstOrCreate(
            ['team_id' => $invite->team_id, 'user_id' => $me->id],
            ['role' => TeamMember::ROLE_MEMBER, 'joined_at' => now()],
        );

        $team = $invite->team;
        if ($team) $this->syncTeamChat($team);

        try {
            app(\App\Services\AchievementService::class)
                ->trigger($me, 'team_joined', ['source_id' => $invite->team_id]);
        } catch (\Throwable $e) { /* best-effort */ }

        return response()->json(['data' => $this->publicInvite($invite->load('team'))]);
    }

    public function declineInvite(Request $request, TeamInvite $invite): JsonResponse
    {
        abort_if($invite->user_id !== $request->user()->id, 403, 'Not your invite.');
        $invite->update(['status' => TeamInvite::STATUS_DECLINED, 'decided_at' => now()]);
        return response()->json(['ok' => true]);
    }

    public function myTeams(Request $request): JsonResponse
    {
        $me = $request->user();
        $rows = TeamMember::query()
            ->where('user_id', $me->id)
            ->with('team.owner')
            ->get();

        return response()->json([
            'data' => $rows->filter(fn ($m) => $m->team !== null)->map(function (TeamMember $m) {
                return array_merge(
                    $this->publicTeam($m->team, $m->team->members()->count()),
                    ['my_role' => $m->role],
                );
            })->values(),
        ]);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    private function assertCanManage(Request $request, Team $team, bool $captainOk): void
    {
        $me   = $request->user();
        $role = $team->roleOf($me->id);
        $allowed = $captainOk
            ? in_array($role, [TeamMember::ROLE_OWNER, TeamMember::ROLE_CAPTAIN], true)
            : $role === TeamMember::ROLE_OWNER;
        abort_unless($allowed, 403, 'Insufficient team role.');
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: Str::random(8);
        $slug = $base;
        $i = 0;
        while (Team::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$i);
        }
        return $slug;
    }

    /** @return array<string, mixed> */
    private function publicTeam(Team $t, int $memberCount): array
    {
        return [
            'id'            => $t->id,
            'name'          => $t->name,
            'slug'          => $t->slug,
            'tag'           => $t->tag,
            'logo_url'      => $t->logo_url,
            'region'        => $t->region,
            'game'          => $t->game,
            'is_active'     => $t->is_active,
            'is_recruiting' => $t->is_recruiting,
            'member_count'  => $memberCount,
            'owner'         => $t->owner ? $this->publicUser($t->owner) : null,
            'created_at'    => $t->created_at,
        ];
    }

    /** @return array<string, mixed> */
    private function publicInvite(TeamInvite $i): array
    {
        $team = $i->team;
        return [
            'id'         => $i->id,
            'status'     => $i->status,
            'created_at' => $i->created_at,
            'team'       => $team ? [
                'id'   => $team->id,
                'name' => $team->name,
                'tag'  => $team->tag,
                'logo_url' => $team->logo_url,
                'game' => $team->game,
            ] : null,
            'inviter'    => $i->relationLoaded('inviter') && $i->inviter
                ? $this->publicUser($i->inviter) : null,
        ];
    }

    /** @return array<string, mixed> */
    private function publicUser(User $u): array
    {
        return [
            'id'           => $u->id,
            'name'         => $u->name,
            'nickname'     => $u->nickname,
            'display_name' => $u->display_name,
            'avatar_url'   => $u->avatar_url,
        ];
    }
}
