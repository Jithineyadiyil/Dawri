<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuditEntryResource;
use App\Http\Resources\BlockedWordResource;
use App\Models\Community;
use App\Models\CommunityBlockedWord;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Services\AuditService;
use App\Services\WordFilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 6 — admin & safety: rules, keyword blocklist, audit log.
 */
final class CommunityAdminController extends Controller
{
    public function __construct(
        private readonly AuditService $audit,
        private readonly WordFilterService $wordFilter,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    // ── Rules ────────────────────────────────────────────────────────────────

    /** GET /communities/{community}/rules  (any member) */
    public function getRules(Request $request, Community $community): JsonResponse
    {
        if (! $this->members->isMember($community->id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => ['rules' => $community->rules]]);
    }

    /** PUT /communities/{community}/rules  (moderator+)  Body: { rules } */
    public function setRules(Request $request, Community $community): JsonResponse
    {
        $request->validate(['rules' => ['nullable', 'string', 'max:10000']]);

        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Only community moderators can do that.'], Response::HTTP_FORBIDDEN);
        }

        $community->update(['rules' => $request->input('rules')]);
        $this->audit->record($community->id, $request->user()->id, 'rules_updated');

        return response()->json(['data' => ['rules' => $community->rules]]);
    }

    // ── Blocked words ──────────────────────────────────────────────────────────

    /** GET /communities/{community}/blocked-words  (moderator+) */
    public function listWords(Request $request, Community $community): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $words = CommunityBlockedWord::where('community_id', $community->id)
            ->orderBy('word')
            ->get();

        return response()->json(['data' => BlockedWordResource::collection($words)]);
    }

    /** POST /communities/{community}/blocked-words  Body: { word, mode? } */
    public function addWord(Request $request, Community $community): JsonResponse
    {
        $request->validate([
            'word' => ['required', 'string', 'min:1', 'max:100'],
            'mode' => ['nullable', 'in:block,flag'],
        ]);

        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $word = mb_strtolower(trim($request->string('word')->toString()));

        $entry = CommunityBlockedWord::updateOrCreate(
            ['community_id' => $community->id, 'word' => $word],
            ['mode' => $request->input('mode', CommunityBlockedWord::MODE_BLOCK), 'created_by' => $request->user()->id],
        );

        $this->wordFilter->forget($community->id);
        $this->audit->record($community->id, $request->user()->id, 'word_added', null, ['word' => $word]);

        return response()->json(['data' => new BlockedWordResource($entry)], Response::HTTP_CREATED);
    }

    /** DELETE /communities/{community}/blocked-words/{word} */
    public function removeWord(Request $request, Community $community, CommunityBlockedWord $word): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        // Guard: the word must belong to this community.
        if ($word->community_id !== $community->id) {
            return response()->json(['message' => 'Not found.'], Response::HTTP_NOT_FOUND);
        }

        $term = $word->word;
        $word->delete();
        $this->wordFilter->forget($community->id);
        $this->audit->record($community->id, $request->user()->id, 'word_removed', null, ['word' => $term]);

        return response()->json(['message' => 'Removed.']);
    }

    // ── Audit log ──────────────────────────────────────────────────────────────

    /** GET /communities/{community}/audit-log  (moderator+) */
    public function auditLog(Request $request, Community $community): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'data' => AuditEntryResource::collection($this->audit->recent($community->id)),
        ]);
    }

    /**
     * GET /communities/{community}/analytics  (moderator+)
     *
     * Activity overview: totals, 14-day message trend, per-channel message
     * counts, and the most active members. All scoped to this community and
     * computed with grouped aggregate queries (no per-row N+1).
     */
    public function analytics(Request $request, Community $community): JsonResponse
    {
        if (! $this->canManage($community->id, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $channelIds = DB::table('channels')->where('community_id', $community->id)->pluck('id');

        $baseMessages = DB::table('messages')
            ->whereIn('channel_id', $channelIds)
            ->whereNull('deleted_at');

        $totalMessages = (clone $baseMessages)->count();
        $totalMembers  = DB::table('community_members')->where('community_id', $community->id)->count();
        $totalChannels = $channelIds->count();

        // 14-day daily message trend (oldest → newest).
        $since = now()->subDays(13)->startOfDay();
        $rawTrend = (clone $baseMessages)
            ->where('created_at', '>=', $since)
            ->selectRaw('DATE(created_at) as d, COUNT(*) as c')
            ->groupBy('d')
            ->pluck('c', 'd');

        $trend = [];
        for ($i = 13; $i >= 0; $i--) {
            $day = now()->subDays($i)->toDateString();
            $trend[] = ['date' => $day, 'count' => (int) ($rawTrend[$day] ?? 0)];
        }

        // Per-channel message counts (joined to channel names).
        $perChannel = (clone $baseMessages)
            ->join('channels', 'channels.id', '=', 'messages.channel_id')
            ->selectRaw('channels.name as name, COUNT(*) as c')
            ->groupBy('channels.id', 'channels.name')
            ->orderByDesc('c')
            ->get()
            ->map(fn ($r) => ['channel' => $r->name, 'count' => (int) $r->c])
            ->all();

        // Top 5 most active members by message count.
        $topMembers = (clone $baseMessages)
            ->join('users', 'users.id', '=', 'messages.user_id')
            ->selectRaw('users.id as id, COALESCE(users.nickname, users.name) as name, COUNT(*) as c')
            ->groupBy('users.id', 'users.nickname', 'users.name')
            ->orderByDesc('c')
            ->limit(5)
            ->get()
            ->map(fn ($r) => ['id' => $r->id, 'name' => $r->name, 'count' => (int) $r->c])
            ->all();

        $messagesLast7 = (clone $baseMessages)->where('created_at', '>=', now()->subDays(7))->count();

        return response()->json([
            'data' => [
                'totals' => [
                    'messages'        => $totalMessages,
                    'members'         => $totalMembers,
                    'channels'        => $totalChannels,
                    'messages_last_7' => $messagesLast7,
                ],
                'trend'       => $trend,
                'per_channel' => $perChannel,
                'top_members' => $topMembers,
            ],
        ]);
    }

    // ── Helper ───────────────────────────────────────────────────────────────

    private function canManage(string $communityId, $user): bool
    {
        if ($user->role === 'admin') {
            return true;
        }
        $member = $this->members->find($communityId, $user->id);

        return $member !== null && $member->canModerate();
    }
}
