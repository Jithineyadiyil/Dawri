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
