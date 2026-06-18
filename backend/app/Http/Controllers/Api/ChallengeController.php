<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use App\Notifications\ChallengeNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * ChallengeController — friendly 1v1 challenges between friends.
 *
 *   GET    /challenges                  — my challenges (grouped)
 *   POST   /challenges                  — create  { opponent_id, game, message?, scheduled_at? }
 *   POST   /challenges/{challenge}/accept
 *   POST   /challenges/{challenge}/decline
 *   POST   /challenges/{challenge}/cancel
 *   POST   /challenges/{challenge}/result  { challenger_score, opponent_score, winner_id }
 *   POST   /challenges/{challenge}/confirm
 */
final class ChallengeController extends Controller
{
    private const GAMES = [
        'ea_fc25'     => 'EA FC 25',
        'pubg_mobile' => 'PUBG Mobile',
        'cod_mobile'  => 'Call of Duty Mobile',
    ];

    /** GET /challenges — everything involving me, split into buckets. */
    public function index(Request $request): JsonResponse
    {
        $me = $request->user();

        $myTeamIds = \DB::table('team_members')->where('user_id', $me->id)->pluck('team_id');

        $all = Challenge::query()
            ->where(function ($q) use ($me, $myTeamIds): void {
                $q->where('challenger_id', $me->id)
                  ->orWhere('opponent_id', $me->id)
                  ->orWhereIn('challenger_team_id', $myTeamIds)
                  ->orWhereIn('opponent_team_id', $myTeamIds);
            })
            ->with(['challenger', 'opponent', 'challengerTeam', 'opponentTeam'])
            ->latest()
            ->get();

        $map = fn (Challenge $c) => $this->publicChallenge($c, $me->id);

        return response()->json([
            'incoming' => $all->filter(fn ($c) => $c->status === Challenge::STATUS_PENDING && $c->opponent_id === $me->id)->map($map)->values(),
            'sent'     => $all->filter(fn ($c) => $c->status === Challenge::STATUS_PENDING && $c->challenger_id === $me->id)->map($map)->values(),
            'active'   => $all->filter(fn ($c) => $c->status === Challenge::STATUS_ACCEPTED)->map($map)->values(),
            'history'  => $all->filter(fn ($c) => in_array($c->status, [Challenge::STATUS_COMPLETED, Challenge::STATUS_DECLINED, Challenge::STATUS_CANCELLED], true))->map($map)->values(),
        ]);
    }

    /**
     * POST /challenges — issue a challenge.
     *
     * Two shapes:
     *   PLAYER vs PLAYER:   { opponent_id }
     *   TEAM   vs TEAM:     { challenger_team_id, opponent_team_id }
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'opponent_id'         => ['required_without:opponent_team_id', 'nullable', 'uuid', 'exists:users,id'],
            'challenger_team_id'  => ['required_with:opponent_team_id', 'nullable', 'uuid', 'exists:teams,id'],
            'opponent_team_id'    => ['required_with:challenger_team_id', 'nullable', 'uuid', 'exists:teams,id'],
            'game'                => ['required', Rule::in(array_keys(self::GAMES))],
            'message'             => ['nullable', 'string', 'max:500'],
            'scheduled_at'        => ['nullable', 'date'],
        ]);

        $me = $request->user();
        $isTeam = !empty($data['challenger_team_id']);

        return $isTeam
            ? $this->storeTeamChallenge($me, $data)
            : $this->storePlayerChallenge($me, $data);
    }

    /** Player-vs-player challenge (friends only). */
    private function storePlayerChallenge(User $me, array $data): JsonResponse
    {
        $opponent = User::findOrFail($data['opponent_id']);
        if ($opponent->id === $me->id) {
            throw ValidationException::withMessages(['opponent_id' => 'You cannot challenge yourself.']);
        }
        if (! $me->isFriendsWith($opponent->id)) {
            throw ValidationException::withMessages(['opponent_id' => 'You can only challenge friends.']);
        }

        $open = Challenge::query()
            ->whereIn('status', [Challenge::STATUS_PENDING, Challenge::STATUS_ACCEPTED])
            ->whereNull('challenger_team_id')
            ->where(function ($q) use ($me, $opponent): void {
                $q->where(fn ($qq) => $qq->where('challenger_id', $me->id)->where('opponent_id', $opponent->id))
                  ->orWhere(fn ($qq) => $qq->where('challenger_id', $opponent->id)->where('opponent_id', $me->id));
            })->exists();
        if ($open) {
            throw ValidationException::withMessages(['opponent_id' => 'You already have an open challenge with this player.']);
        }

        $challenge = Challenge::create([
            'challenger_id' => $me->id,
            'opponent_id'   => $opponent->id,
            'game'          => $data['game'],
            'message'       => $data['message'] ?? null,
            'scheduled_at'  => $data['scheduled_at'] ?? null,
            'status'        => Challenge::STATUS_PENDING,
        ]);
        $this->notify($opponent, 'received', $challenge, $me);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent']), $me->id)], 201);
    }

    /** Team-vs-team challenge. Caller must be owner/captain of challenger team. */
    private function storeTeamChallenge(User $me, array $data): JsonResponse
    {
        $challengerTeam = Team::findOrFail($data['challenger_team_id']);
        $opponentTeam   = Team::findOrFail($data['opponent_team_id']);

        if ($challengerTeam->id === $opponentTeam->id) {
            throw ValidationException::withMessages(['opponent_team_id' => 'A team cannot challenge itself.']);
        }
        if ($challengerTeam->game !== $opponentTeam->game) {
            throw ValidationException::withMessages(['opponent_team_id' => 'Both teams must play the same game.']);
        }
        if ($challengerTeam->game !== $data['game']) {
            throw ValidationException::withMessages(['game' => 'Game must match the teams.']);
        }

        $myRole = $challengerTeam->roleOf($me->id);
        if (!in_array($myRole, [TeamMember::ROLE_OWNER, TeamMember::ROLE_CAPTAIN], true)) {
            throw ValidationException::withMessages(['challenger_team_id' => 'Only the team owner or a captain can issue challenges.']);
        }

        // Block duplicate open team challenges between the same pair.
        $open = Challenge::query()
            ->whereIn('status', [Challenge::STATUS_PENDING, Challenge::STATUS_ACCEPTED])
            ->whereNotNull('challenger_team_id')
            ->where(function ($q) use ($challengerTeam, $opponentTeam): void {
                $q->where(fn ($qq) => $qq->where('challenger_team_id', $challengerTeam->id)->where('opponent_team_id', $opponentTeam->id))
                  ->orWhere(fn ($qq) => $qq->where('challenger_team_id', $opponentTeam->id)->where('opponent_team_id', $challengerTeam->id));
            })->exists();
        if ($open) {
            throw ValidationException::withMessages(['opponent_team_id' => 'There is already an open challenge between these teams.']);
        }

        // Opponent representative = the opponent team's owner (whoever can respond).
        $opponentOwner = User::find($opponentTeam->owner_id);

        $challenge = Challenge::create([
            'challenger_id'      => $me->id,
            'opponent_id'        => $opponentTeam->owner_id,
            'challenger_team_id' => $challengerTeam->id,
            'opponent_team_id'   => $opponentTeam->id,
            'game'               => $data['game'],
            'message'            => $data['message'] ?? null,
            'scheduled_at'       => $data['scheduled_at'] ?? null,
            'status'             => Challenge::STATUS_PENDING,
        ]);
        if ($opponentOwner) {
            $this->notify($opponentOwner, 'received', $challenge, $me);
        }

        return response()->json([
            'data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent', 'challengerTeam', 'opponentTeam']), $me->id),
        ], 201);
    }

    public function accept(Request $request, Challenge $challenge): JsonResponse
    {
        $me = $request->user();
        $this->assertOpponentPending($challenge, $me->id);
        $challenge->update(['status' => Challenge::STATUS_ACCEPTED]);
        $this->notify($challenge->challenger, 'accepted', $challenge, $me);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent']), $me->id)]);
    }

    public function decline(Request $request, Challenge $challenge): JsonResponse
    {
        $me = $request->user();
        $this->assertOpponentPending($challenge, $me->id);
        $challenge->update(['status' => Challenge::STATUS_DECLINED]);
        $this->notify($challenge->challenger, 'declined', $challenge, $me);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent']), $me->id)]);
    }

    public function cancel(Request $request, Challenge $challenge): JsonResponse
    {
        $me = $request->user();
        abort_if($challenge->challenger_id !== $me->id, 403, 'Only the challenger can cancel.');
        abort_if($challenge->status !== Challenge::STATUS_PENDING, 409, 'Challenge can no longer be cancelled.');
        $challenge->update(['status' => Challenge::STATUS_CANCELLED]);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent']), $me->id)]);
    }

    /** POST /challenges/{challenge}/result — report scores + winner. */
    public function reportResult(Request $request, Challenge $challenge): JsonResponse
    {
        $me = $request->user();
        abort_unless($this->canActOn($challenge, $me), 403);
        abort_if($challenge->status !== Challenge::STATUS_ACCEPTED, 409, 'Result can only be reported on an accepted challenge.');

        if ($challenge->isTeamChallenge()) {
            $data = $request->validate([
                'challenger_score' => ['required', 'integer', 'min:0', 'max:999'],
                'opponent_score'   => ['required', 'integer', 'min:0', 'max:999'],
                'winner_team_id'   => ['required', 'uuid', Rule::in([$challenge->challenger_team_id, $challenge->opponent_team_id])],
            ]);
            $challenge->update([
                'challenger_score'   => $data['challenger_score'],
                'opponent_score'     => $data['opponent_score'],
                'winner_team_id'     => $data['winner_team_id'],
                'result_reported_by' => $me->id,
            ]);
        } else {
            $data = $request->validate([
                'challenger_score' => ['required', 'integer', 'min:0', 'max:999'],
                'opponent_score'   => ['required', 'integer', 'min:0', 'max:999'],
                'winner_id'        => ['required', 'uuid', Rule::in([$challenge->challenger_id, $challenge->opponent_id])],
            ]);
            $challenge->update([
                'challenger_score'   => $data['challenger_score'],
                'opponent_score'     => $data['opponent_score'],
                'winner_id'          => $data['winner_id'],
                'result_reported_by' => $me->id,
            ]);
        }

        $other = $challenge->challenger_id === $me->id ? $challenge->opponent : $challenge->challenger;
        if ($other) $this->notify($other, 'result', $challenge, $me);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent', 'challengerTeam', 'opponentTeam']), $me->id)]);
    }

    /** POST /challenges/{challenge}/confirm — the OTHER side confirms → completed. */
    public function confirm(Request $request, Challenge $challenge): JsonResponse
    {
        $me = $request->user();
        abort_unless($this->canActOn($challenge, $me), 403);
        abort_if($challenge->status !== Challenge::STATUS_ACCEPTED, 409, 'Nothing to confirm.');
        abort_if($challenge->result_reported_by === null, 409, 'No result has been reported yet.');

        // For team challenges: ensure I'm on the OTHER team than the reporter.
        if ($challenge->isTeamChallenge()) {
            $reporterTeamId = $challenge->challengerTeam?->roleOf($challenge->result_reported_by) !== null
                ? $challenge->challenger_team_id : $challenge->opponent_team_id;
            $myTeamId = $challenge->challengerTeam?->roleOf($me->id) !== null
                ? $challenge->challenger_team_id : $challenge->opponent_team_id;
            abort_if($myTeamId === $reporterTeamId, 403, 'The other team must confirm the result.');
        } else {
            abort_if($challenge->result_reported_by === $me->id, 403, 'The other player must confirm the result.');
        }

        $challenge->update(['status' => Challenge::STATUS_COMPLETED, 'completed_at' => now()]);

        $reporter = User::find($challenge->result_reported_by);
        if ($reporter) $this->notify($reporter, 'completed', $challenge, $me);

        return response()->json(['data' => $this->publicChallenge($challenge->fresh(['challenger', 'opponent', 'challengerTeam', 'opponentTeam']), $me->id)]);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    private function assertOpponentPending(Challenge $challenge, string $meId): void
    {
        abort_if($challenge->opponent_id !== $meId, 403, 'Not your challenge to answer.');
        abort_if($challenge->status !== Challenge::STATUS_PENDING, 409, 'Challenge is no longer pending.');
    }

    private function notify(User $to, string $kind, Challenge $c, User $from): void
    {
        $to->notify(new ChallengeNotification(
            $kind, $c->id, $from->id, $from->display_name, $from->avatar_url, self::GAMES[$c->game] ?? $c->game,
        ));
    }

    /**
     * Can $user act on $challenge (report result, confirm)?
     * For player challenges: must be one of the two players.
     * For team challenges: must be captain/owner of either team.
     */
    private function canActOn(Challenge $c, User $user): bool
    {
        if (!$c->isTeamChallenge()) {
            return $c->hasParticipant($user->id);
        }
        foreach ([$c->challengerTeam, $c->opponentTeam] as $team) {
            if (!$team) continue;
            $role = $team->roleOf($user->id);
            if (in_array($role, [TeamMember::ROLE_OWNER, TeamMember::ROLE_CAPTAIN], true)) return true;
        }
        return false;
    }

    /** @return array<string, mixed> */
    private function publicChallenge(Challenge $c, string $meId): array
    {
        $isTeam = $c->isTeamChallenge();
        // For team challenges: "I am challenger side" if I'm in challenger team.
        $iAmChallenger = $isTeam
            ? ($c->challengerTeam?->roleOf($meId) !== null)
            : $c->challenger_id === $meId;
        $opponent = $iAmChallenger ? $c->opponent : $c->challenger;

        $myWon = null;
        if ($isTeam && $c->winner_team_id) {
            $myTeamId = $iAmChallenger ? $c->challenger_team_id : $c->opponent_team_id;
            $myWon = $c->winner_team_id === $myTeamId;
        } elseif ($c->winner_id) {
            $myWon = $c->winner_id === $meId;
        }

        return [
            'id'              => $c->id,
            'kind'            => $isTeam ? 'team' : 'player',
            'game'            => $c->game,
            'game_label'      => self::GAMES[$c->game] ?? $c->game,
            'message'         => $c->message,
            'status'          => $c->status,
            'scheduled_at'    => $c->scheduled_at,
            'i_am_challenger' => $iAmChallenger,
            'opponent'        => $this->publicUser($opponent),
            'challenger'      => $this->publicUser($c->challenger),
            'challenger_team' => $c->challengerTeam ? $this->publicTeam($c->challengerTeam) : null,
            'opponent_team'   => $c->opponentTeam ? $this->publicTeam($c->opponentTeam) : null,
            'my_score'        => $iAmChallenger ? $c->challenger_score : $c->opponent_score,
            'their_score'     => $iAmChallenger ? $c->opponent_score : $c->challenger_score,
            'challenger_score'=> $c->challenger_score,
            'opponent_score'  => $c->opponent_score,
            'winner_id'       => $c->winner_id,
            'winner_team_id'  => $c->winner_team_id,
            'i_won'           => $myWon,
            'result_reported' => $c->result_reported_by !== null,
            'i_reported'      => $c->result_reported_by === $meId,
            'can_confirm'     => $c->status === Challenge::STATUS_ACCEPTED && $c->result_reported_by !== null && $c->result_reported_by !== $meId,
            'created_at'      => $c->created_at,
        ];
    }

    /** @return array<string, mixed> */
    private function publicTeam(Team $t): array
    {
        return ['id' => $t->id, 'name' => $t->name, 'slug' => $t->slug, 'tag' => $t->tag, 'logo_url' => $t->logo_url];
    }

    /** @return array<string, mixed>|null */
    private function publicUser(?User $u): ?array
    {
        if ($u === null) return null;
        return $this->publicUserInner($u);
    }

    /** @return array<string, mixed> */
    private function publicUserInner(User $u): array
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
