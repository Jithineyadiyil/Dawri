<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friendship;
use App\Models\User;
use App\Models\UserPresence;
use App\Notifications\FriendRequestAcceptedNotification;
use App\Notifications\FriendRequestNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * FriendController — the social friends graph.
 *
 *   GET    /friends                  — accepted friends (+ presence)
 *   GET    /friends/requests         — incoming pending requests
 *   GET    /friends/sent             — outgoing pending requests
 *   GET    /friends/status/{user}    — relationship with one user
 *   POST   /friends                  — send a request   { user_id }
 *   POST   /friends/{friendship}/accept
 *   POST   /friends/{friendship}/decline
 *   DELETE /friends/{user}           — remove friend / cancel request
 */
final class FriendController extends Controller
{
    /** GET /friends */
    public function index(Request $request): JsonResponse
    {
        $me      = $request->user();
        $friends = $me->friends();

        return response()->json([
            'data'     => $friends->map(fn (User $u) => $this->publicUser($u))->values(),
            'presence' => $this->presenceFor($friends->pluck('id')->all()),
        ]);
    }

    /** GET /friends/requests — people who want to friend me. */
    public function requests(Request $request): JsonResponse
    {
        $rows = Friendship::query()
            ->where('addressee_id', $request->user()->id)
            ->where('status', Friendship::STATUS_PENDING)
            ->with('requester')
            ->latest()
            ->get();

        return response()->json([
            'data' => $rows->map(fn (Friendship $f) => [
                'friendship_id' => $f->id,
                'created_at'    => $f->created_at,
                'user'          => $this->publicUser($f->requester),
            ])->values(),
        ]);
    }

    /** GET /friends/sent — requests I've sent that are still pending. */
    public function sent(Request $request): JsonResponse
    {
        $rows = Friendship::query()
            ->where('requester_id', $request->user()->id)
            ->where('status', Friendship::STATUS_PENDING)
            ->with('addressee')
            ->latest()
            ->get();

        return response()->json([
            'data' => $rows->map(fn (Friendship $f) => [
                'friendship_id' => $f->id,
                'created_at'    => $f->created_at,
                'user'          => $this->publicUser($f->addressee),
            ])->values(),
        ]);
    }

    /** GET /friends/status/{user} — relationship between me and {user}. */
    public function status(Request $request, User $user): JsonResponse
    {
        return response()->json(['status' => $this->relationship($request->user(), $user)]);
    }

    /** POST /friends — send a friend request. Body: { user_id }. */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id' => ['required', 'uuid', 'exists:users,id'],
        ]);

        $me    = $request->user();
        $other = User::findOrFail($data['user_id']);

        if ($other->id === $me->id) {
            throw ValidationException::withMessages(['user_id' => 'You cannot add yourself.']);
        }

        $existing = $this->pairRow($me->id, $other->id);

        if ($existing) {
            if ($existing->status === Friendship::STATUS_ACCEPTED) {
                throw ValidationException::withMessages(['user_id' => 'You are already friends.']);
            }
            // A pending request already exists. If THEY requested ME earlier,
            // treat this as an accept (mutual intent). Otherwise it's a dup.
            if ($existing->addressee_id === $me->id) {
                $existing->update(['status' => Friendship::STATUS_ACCEPTED]);
                $existing->requester->notify(new FriendRequestAcceptedNotification(
                    $me->id, $me->display_name, $me->avatar_url,
                ));

                return response()->json(['status' => 'friends', 'friendship_id' => $existing->id], 200);
            }
            throw ValidationException::withMessages(['user_id' => 'Request already sent.']);
        }

        $friendship = Friendship::create([
            'requester_id' => $me->id,
            'addressee_id' => $other->id,
            'status'       => Friendship::STATUS_PENDING,
        ]);

        $other->notify(new FriendRequestNotification(
            $friendship->id, $me->id, $me->display_name, $me->avatar_url,
        ));

        return response()->json([
            'status'        => 'pending_outgoing',
            'friendship_id' => $friendship->id,
        ], 201);
    }

    /** POST /friends/{friendship}/accept — only the addressee may accept. */
    public function accept(Request $request, Friendship $friendship): JsonResponse
    {
        $me = $request->user();
        abort_if($friendship->addressee_id !== $me->id, 403, 'Not your request to accept.');
        abort_if($friendship->status !== Friendship::STATUS_PENDING, 409, 'Request is no longer pending.');

        $friendship->update(['status' => Friendship::STATUS_ACCEPTED]);
        $friendship->requester->notify(new FriendRequestAcceptedNotification(
            $me->id, $me->display_name, $me->avatar_url,
        ));

        try {
            $ach = app(\App\Services\AchievementService::class);
            $ach->trigger($me, 'friend_added', ['source_id' => $friendship->id]);
            if ($friendship->requester) {
                $ach->trigger($friendship->requester, 'friend_added', ['source_id' => $friendship->id]);
            }
        } catch (\Throwable $e) { /* best-effort */ }

        return response()->json(['status' => 'friends']);
    }

    /** POST /friends/{friendship}/decline — addressee declines (row deleted). */
    public function decline(Request $request, Friendship $friendship): JsonResponse
    {
        abort_if($friendship->addressee_id !== $request->user()->id, 403, 'Not your request to decline.');
        $friendship->delete();

        return response()->json(['status' => 'none']);
    }

    /** DELETE /friends/{user} — remove a friend, or cancel a sent request. */
    public function destroy(Request $request, User $user): JsonResponse
    {
        $row = $this->pairRow($request->user()->id, $user->id);
        $row?->delete();

        return response()->json(['status' => 'none']);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    /** The single friendship row for an unordered pair, if any. */
    private function pairRow(string $a, string $b): ?Friendship
    {
        return Friendship::query()
            ->where(fn ($q) => $q->where('requester_id', $a)->where('addressee_id', $b))
            ->orWhere(fn ($q) => $q->where('requester_id', $b)->where('addressee_id', $a))
            ->first();
    }

    /** none | friends | pending_outgoing | pending_incoming */
    private function relationship(User $me, User $other): string
    {
        if ($me->id === $other->id) {
            return 'self';
        }
        $row = $this->pairRow($me->id, $other->id);
        if (!$row) {
            return 'none';
        }
        if ($row->status === Friendship::STATUS_ACCEPTED) {
            return 'friends';
        }
        return $row->requester_id === $me->id ? 'pending_outgoing' : 'pending_incoming';
    }

    /** Presence snapshot: { userId: 'online'|'idle'|'offline' }. */
    private function presenceFor(array $userIds): array
    {
        if ($userIds === []) {
            return [];
        }

        return UserPresence::query()
            ->whereIn('user_id', $userIds)
            ->get()
            ->mapWithKeys(fn (UserPresence $p) => [$p->user_id => $p->status])
            ->all();
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
