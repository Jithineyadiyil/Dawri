<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestRescheduleRequest;
use App\Http\Requests\RespondRescheduleRequest;
use App\Http\Requests\ScheduleMatchRequest;
use App\Http\Requests\UploadEvidenceRequest;
use App\Http\Resources\MatchEvidenceResource;
use App\Http\Resources\MatchRescheduleResource;
use App\Models\MatchEvidence;
use App\Models\MatchRescheduleRequest;
use App\Models\BracketPrediction;
use App\Notifications\DisputeRaisedNotification;
use App\Notifications\MatchCompletedNotification;
use App\Notifications\ResultSubmittedNotification;
use App\Models\TournamentMatch;
use App\Services\BracketAdvancementService;
use App\Services\DisputeService;
use App\Services\MatchEvidenceService;
use App\Services\MatchSchedulingService;
use App\Services\StreamUrlService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * MatchController — handles all per-match actions.
 *
 * ── Sprint 1 endpoints (preserved, unchanged behaviour) ─────────────────
 *   GET    /matches/{match}
 *   POST   /matches/{match}/result              — submit result + screenshot
 *   POST   /matches/{match}/confirm             — opponent confirms
 *   POST   /matches/{match}/dispute             — opponent disputes
 *   POST   /matches/{match}/moderator-override  — organizer override
 *
 * ── Sprint 2 endpoints (new) ────────────────────────────────────────────
 *   POST   /matches/{match}/schedule
 *   POST   /matches/{match}/reschedule-requests
 *   GET    /matches/{match}/reschedule-requests
 *   POST   /matches/{match}/reschedule-requests/{id}/respond
 *   DELETE /matches/{match}/reschedule-requests/{id}
 *   POST   /matches/{match}/evidence
 *   GET    /matches/{match}/evidence
 *   DELETE /matches/{match}/evidence/{id}
 */
class MatchController extends Controller
{
    public function __construct(
        private readonly BracketAdvancementService $advancement,
        private readonly DisputeService            $disputes,
        private readonly MatchSchedulingService    $scheduling,
        private readonly MatchEvidenceService      $evidence,
        private readonly StreamUrlService          $streamUrls,
    ) {}

    // ═══════════════════════════════════════════════════════════════════
    // SPRINT 1 ENDPOINTS — unchanged
    // ═══════════════════════════════════════════════════════════════════

    public function show(string $id): JsonResponse
    {
        $match = TournamentMatch::with([
            'participantA.user:id,name,game_username',
            'participantB.user:id,name,game_username',
            'bracket.tournament:id,name,game,organizer_id',
            'pendingReschedule.requestedBy:id,name',
            'evidence.uploadedBy:id,name',
        ])->findOrFail($id);

        return response()->json(['data' => $this->matchArray($match)]);
    }

    public function submitResult(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'winner_id'             => ['nullable', 'string'],
            'winner_participant_id' => ['nullable', 'string'],
            'score_a'               => ['nullable', 'integer', 'min:0', 'max:99'],
            'score_b'               => ['nullable', 'integer', 'min:0', 'max:99'],
            'screenshot'            => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $winnerId = $request->input('winner_id') ?? $request->input('winner_participant_id');
        if (! $winnerId) {
            return response()->json(['message' => 'Winner is required.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $match = TournamentMatch::findOrFail($id);

        if (! in_array($match->status, ['pending', 'scheduled', 'ongoing', 'active', 'disputed'], true)) {
            return response()->json(
                ['message' => "Match cannot be submitted in its current status: {$match->status}."],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        if ($winnerId !== $match->participant_a_id && $winnerId !== $match->participant_b_id) {
            return response()->json(
                ['message' => 'Winner must be one of the match participants.'],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        $screenshotPath = null;
        if ($request->hasFile('screenshot')) {
            $screenshotPath = $request->file('screenshot')->store('screenshots', 'public');
        }

        $match->update([
            'winner_id'              => $winnerId,
            'score_a'                => $request->input('score_a'),
            'score_b'                => $request->input('score_b'),
            'status'                 => 'submitted',
            'submitted_by_id'        => $request->user()?->id,
            'result_screenshot_path' => $screenshotPath,
        ]);

        // Notify opponent to confirm/dispute
        try {
            $submitter = $request->user();
            $opponentId = $match->participant_a_id === ($match->submittedBy?->id ?? null)
                ? $match->participant_b_id
                : $match->participant_a_id;

            $pA = \App\Models\TournamentParticipant::find($match->participant_a_id);
            $pB = \App\Models\TournamentParticipant::find($match->participant_b_id);
            $opponent = $match->participant_a_id === $match->submitted_by_id ? $pB : $pA;
            if ($opponent?->user_id) {
                $opponentUser = \App\Models\User::find($opponent->user_id);
                $tournament   = $match->bracket?->tournament;
                $opponentUser?->notify(new ResultSubmittedNotification(
                    tournamentId:   $tournament?->id ?? '',
                    tournamentName: $tournament?->name ?? '',
                    matchId:        $match->id,
                    matchNumber:    $match->match_number,
                    submitterName:  $submitter->name,
                    scoreA:         (int) ($match->score_a ?? 0),
                    scoreB:         (int) ($match->score_b ?? 0),
                ));
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('ResultSubmitted notify failed: ' . $e->getMessage());
        }

        return response()->json(['data' => $this->matchArray($match->fresh())]);
    }

    public function confirmResult(Request $request, string $id): JsonResponse
    {
        $match = TournamentMatch::findOrFail($id);
        if ($match->status !== 'submitted') {
            return response()->json(['message' => 'No result to confirm.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if (! $match->winner_id) {
            return response()->json(['message' => 'No winner set.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $this->advancement->advance($match);

            // Auto-score bracket predictions for this match
            $this->scorePredictions($match->id, $match->winner_id, $match->round_number ?? 1);

            // Notify both players of result
            $this->notifyMatchCompleted($match);

            return response()->json([
                'message' => 'Result confirmed and bracket advanced.',
                'data'    => $this->matchArray($match->fresh()),
            ]);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /** Notify both participants when a match completes. */
    private function notifyMatchCompleted(\App\Models\TournamentMatch $match): void
    {
        try {
            $tournament = $match->bracket?->tournament;
            if (!$tournament) return;

            $pA = \App\Models\TournamentParticipant::find($match->participant_a_id);
            $pB = \App\Models\TournamentParticipant::find($match->participant_b_id);
            $winner = \App\Models\TournamentParticipant::find($match->winner_id);
            $winnerName = $winner?->user?->name ?? 'Unknown';

            foreach ([$pA, $pB] as $p) {
                if (!$p?->user_id) continue;
                $user = \App\Models\User::find($p->user_id);
                $user?->notify(new MatchCompletedNotification(
                    tournamentId:   $tournament->id,
                    tournamentName: $tournament->name,
                    matchId:        $match->id,
                    matchNumber:    $match->match_number,
                    winnerName:     $winnerName,
                    isWinner:       $match->winner_id === $p->id,
                    scoreA:         (int) ($match->score_a ?? 0),
                    scoreB:         (int) ($match->score_b ?? 0),
                ));
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('MatchCompleted notify failed: ' . $e->getMessage());
        }
    }

    /** Auto-score predictions when a match completes. */
    private function scorePredictions(string $matchId, string $winnerId, int $round): void
    {
        try {
            $points = min(10, $round * 2);
            BracketPrediction::where('match_id', $matchId)
                ->where('predicted_winner_id', $winnerId)
                ->update(['is_correct' => true, 'points_earned' => $points]);
            BracketPrediction::where('match_id', $matchId)
                ->where('predicted_winner_id', '!=', $winnerId)
                ->update(['is_correct' => false, 'points_earned' => 0]);
        } catch (\Throwable $e) {
            logger()->warning('Prediction scoring failed: ' . $e->getMessage());
        }
    }

    public function disputeResult(Request $request, string $id): JsonResponse
    {
        $request->validate(['reason' => ['required', 'string', 'max:1000']]);

        try {
            $dispute = $this->disputes->raise($id, $request->user()->id, $request->input('reason'));

            // Notify organizer + moderator
            try {
                $match      = \App\Models\TournamentMatch::find($id);
                $tournament = $match?->bracket?->tournament;
                if ($tournament) {
                    $notif = new DisputeRaisedNotification(
                        tournamentId:   $tournament->id,
                        tournamentName: $tournament->name,
                        matchId:        $id,
                        matchNumber:    $match->match_number,
                        disputerName:   $request->user()->name,
                        reason:         $request->input('reason'),
                    );
                    $organizer = \App\Models\User::find($tournament->organizer_id);
                    $organizer?->notify($notif);
                    if ($tournament->moderator_id && $tournament->moderator_id !== $tournament->organizer_id) {
                        $moderator = \App\Models\User::find($tournament->moderator_id);
                        $moderator?->notify($notif);
                    }
                }
            } catch (\Throwable $e2) {
                \Illuminate\Support\Facades\Log::warning('DisputeRaised notify failed: ' . $e2->getMessage());
            }

            return response()->json([
                'message'    => 'Dispute raised successfully.',
                'dispute_id' => $dispute->id,
            ]);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function moderatorOverride(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'winner_id' => ['required', 'uuid'],
            'reason'    => ['required', 'string', 'max:1000'],
        ]);

        $user = $request->user();
        if (! $this->isOrganizerOrAdmin($user)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $match    = TournamentMatch::findOrFail($id);
        $winnerId = $request->input('winner_id');
        if ($winnerId !== $match->participant_a_id && $winnerId !== $match->participant_b_id) {
            return response()->json(
                ['message' => 'Winner must be one of the match participants.'],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        $match->update([
            'winner_id'       => $winnerId,
            'status'          => 'completed',
            'dispute_reason'  => "Override by {$user->name}: " . $request->input('reason'),
            'submitted_by_id' => $user->id,
        ]);

        try { $this->advancement->advance($match); } catch (\Throwable $e) { logger()->error($e->getMessage()); }
        $this->scorePredictions($match->id, $winnerId, $match->round_number ?? 1);

        return response()->json([
            'message' => 'Match result overridden.',
            'data'    => $this->matchArray($match->fresh()),
        ]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // SPRINT 2 — SCHEDULING
    // ═══════════════════════════════════════════════════════════════════

    /**
     * POST /api/v1/matches/{match}/schedule
     * Organizer/admin directly sets or updates the match schedule.
     */
    public function schedule(ScheduleMatchRequest $request, string $id): JsonResponse
    {
        $match = TournamentMatch::with('bracket.tournament:id,organizer_id')->findOrFail($id);
        $user  = $request->user();

        if (! $this->canManageMatch($user, $match)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        try {
            $match = $this->scheduling->setSchedule(
                $match,
                Carbon::parse($request->input('scheduled_at')),
                $user,
            );
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'message' => 'Match scheduled.',
            'data'    => [
                'id'              => $match->id,
                'scheduled_at'    => $match->scheduled_at?->toIso8601String(),
                'scheduled_by_id' => $match->scheduled_by_id,
                'status'          => $match->status,
            ],
        ]);
    }

    /**
     * POST /api/v1/matches/{match}/reschedule-requests
     * Participant proposes a new time; opposing player must accept (or organizer overrides).
     */
    public function requestReschedule(RequestRescheduleRequest $request, string $id): JsonResponse
    {
        $match = TournamentMatch::with(['participantA:id,user_id', 'participantB:id,user_id'])
            ->findOrFail($id);
        $user = $request->user();

        if (! $match->isParticipantUser($user->id)) {
            return response()->json(
                ['message' => 'Only participants can propose a reschedule.'],
                Response::HTTP_FORBIDDEN,
            );
        }

        try {
            $req = $this->scheduling->requestReschedule(
                $match,
                $user,
                Carbon::parse($request->input('proposed_at')),
                $request->input('reason'),
            );
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $req->load('requestedBy:id,name');
        return (new MatchRescheduleResource($req))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * GET /api/v1/matches/{match}/reschedule-requests
     * Only visible to participants, organizer, admin.
     */
    public function listReschedules(string $id): JsonResponse
    {
        $match = TournamentMatch::with(['participantA:id,user_id', 'participantB:id,user_id', 'bracket.tournament:id,organizer_id'])
            ->findOrFail($id);

        $user = request()->user();
        if (! $this->canViewMatchDetails($user, $match)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $requests = MatchRescheduleRequest::where('match_id', $id)
            ->with(['requestedBy:id,name', 'respondedBy:id,name'])
            ->orderByDesc('created_at')
            ->get();

        return MatchRescheduleResource::collection($requests)->response();
    }

    /**
     * POST /api/v1/matches/{match}/reschedule-requests/{id}/respond
     * Opposing player accepts/rejects. Organizer can override with ?override=true.
     */
    public function respondReschedule(
        RespondRescheduleRequest $request,
        string $matchId,
        string $requestId,
    ): JsonResponse {
        $match = TournamentMatch::with([
            'participantA:id,user_id', 'participantB:id,user_id',
            'bracket.tournament:id,organizer_id',
        ])->findOrFail($matchId);

        /** @var MatchRescheduleRequest $req */
        $req = MatchRescheduleRequest::where('match_id', $matchId)->findOrFail($requestId);
        $user = $request->user();

        $isOrganizer = $this->canManageMatch($user, $match);
        $isOpponent  = $match->opponentUserId($user->id) === $user->id
                       ? false
                       : $match->isParticipantUser($user->id) && $req->requested_by_id !== $user->id;

        // Organizer override path.
        if ($request->wantsOverride()) {
            if (! $isOrganizer) {
                return response()->json(['message' => 'Only organizers may override.'], Response::HTTP_FORBIDDEN);
            }
            try {
                $req = $this->scheduling->organizerOverride($req, $user, $request->wantsAccept());
            } catch (RuntimeException $e) {
                return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $req->load(['requestedBy:id,name', 'respondedBy:id,name']);
            return (new MatchRescheduleResource($req))->response();
        }

        // Normal path: must be the opposing player.
        if (! $isOpponent) {
            return response()->json(
                ['message' => 'Only the opposing player can respond to this request.'],
                Response::HTTP_FORBIDDEN,
            );
        }

        try {
            $req = $this->scheduling->respondReschedule($req, $user, $request->wantsAccept());
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $req->load(['requestedBy:id,name', 'respondedBy:id,name']);
        return (new MatchRescheduleResource($req))->response();
    }

    /**
     * DELETE /api/v1/matches/{match}/reschedule-requests/{id}
     * Requester cancels their own pending request (or organizer).
     */
    public function cancelReschedule(string $matchId, string $requestId): JsonResponse
    {
        /** @var MatchRescheduleRequest $req */
        $req = MatchRescheduleRequest::where('match_id', $matchId)->findOrFail($requestId);
        $user = request()->user();

        try {
            $this->scheduling->cancelReschedule($req, $user);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Reschedule request cancelled.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // SPRINT 2 — EVIDENCE
    // ═══════════════════════════════════════════════════════════════════

    /**
     * POST /api/v1/matches/{match}/evidence   (multipart/form-data)
     */
    public function uploadEvidence(UploadEvidenceRequest $request, string $id): JsonResponse
    {
        $match = TournamentMatch::with(['participantA:id,user_id', 'participantB:id,user_id'])
            ->findOrFail($id);

        try {
            $ev = $this->evidence->upload(
                $match,
                $request->user(),
                $request->file('file'),
                $request->input('caption'),
            );
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $ev->load('uploadedBy:id,name');
        return (new MatchEvidenceResource($ev))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * GET /api/v1/matches/{match}/evidence
     */
    public function listEvidence(string $id): JsonResponse
    {
        $match = TournamentMatch::with(['participantA:id,user_id', 'participantB:id,user_id', 'bracket.tournament:id,organizer_id'])
            ->findOrFail($id);

        $user = request()->user();
        if (! $this->canViewMatchDetails($user, $match)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $list = MatchEvidence::where('match_id', $id)
            ->with('uploadedBy:id,name')
            ->orderByDesc('created_at')
            ->get();

        return MatchEvidenceResource::collection($list)->response();
    }

    /**
     * DELETE /api/v1/matches/{match}/evidence/{id}
     */
    public function deleteEvidence(string $matchId, string $evId): JsonResponse
    {
        /** @var MatchEvidence $ev */
        $ev = MatchEvidence::where('match_id', $matchId)->findOrFail($evId);

        try {
            $this->evidence->delete($ev, request()->user());
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Evidence deleted.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // STREAM (Option A — embed external Twitch/YouTube streams)
    // ═══════════════════════════════════════════════════════════════════

    /**
     * POST /api/v1/matches/{match}/stream
     *
     * Set the live-stream URL for this match. Accepts Twitch channel URLs
     * and YouTube live/watch URLs; anything else is rejected. The stored
     * value is the canonical normalised URL, not whatever the user pasted.
     *
     * Authorization:
     *   - Organizer of the tournament, or admin → always allowed.
     *   - Either of the two participants → allowed (it's their match).
     *
     * The frontend uses the response to refresh the modal's stream block
     * without reloading the match.
     */
    public function setStream(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'stream_url' => ['required', 'string', 'max:500'],
        ]);

        $match = TournamentMatch::with('bracket.tournament:id,organizer_id')->findOrFail($id);
        $user  = $request->user();

        if (! $this->canModifyStream($user, $match)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $parsed = $this->streamUrls->parse($request->input('stream_url'));
        if ($parsed === null) {
            return response()->json(
                ['message' => 'Stream URL must be a Twitch channel or YouTube live/watch URL.'],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        $match->stream_url = $parsed['canonical_url'];
        $match->save();

        return response()->json([
            'message' => 'Stream URL saved.',
            'data'    => [
                'id'         => $match->id,
                'stream'     => [
                    'provider'      => $parsed['provider'],
                    'identifier'    => $parsed['identifier'],
                    'canonical_url' => $parsed['canonical_url'],
                ],
            ],
        ]);
    }

    /**
     * DELETE /api/v1/matches/{match}/stream
     *
     * Remove the stream URL — useful if the wrong link was set or the
     * stream ended and the embed should be hidden.
     */
    public function clearStream(Request $request, string $id): JsonResponse
    {
        $match = TournamentMatch::with('bracket.tournament:id,organizer_id')->findOrFail($id);
        $user  = $request->user();

        if (! $this->canModifyStream($user, $match)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $match->stream_url = null;
        $match->save();

        return response()->json(['message' => 'Stream URL cleared.']);
    }

    /**
     * Stream-modify ACL: organizer/admin OR either participant.
     */
    private function canModifyStream($user, TournamentMatch $match): bool
    {
        if ($user === null) {
            return false;
        }
        if ($this->canManageMatch($user, $match)) {
            return true;
        }
        return $match->isParticipantUser($user->id);
    }

    // ═══════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Is the user the organizer of the match's parent tournament, or an admin?
     */
    private function canManageMatch($user, TournamentMatch $match): bool
    {
        if ($user === null) {
            return false;
        }
        if (($user->role ?? '') === 'admin') {
            return true;
        }
        $organizerId = $match->bracket?->tournament?->organizer_id;
        return $organizerId !== null && (string) $organizerId === (string) $user->id;
    }

    /**
     * Can the user see schedule/evidence details? Participants + organizer + admin.
     */
    private function canViewMatchDetails($user, TournamentMatch $match): bool
    {
        if ($user === null) {
            return false;
        }
        return $match->isParticipantUser($user->id) || $this->canManageMatch($user, $match);
    }

    private function isOrganizerOrAdmin($user): bool
    {
        return $user !== null && in_array($user->role ?? '', ['admin', 'moderator', 'organizer'], true);
    }

    /**
     * Normalised match payload for clients.
     */
    private function matchArray(TournamentMatch $m): array
    {
        return [
            'id'                     => $m->id,
            'bracket_id'             => $m->bracket_id,
            'round_number'           => $m->round_number,
            'match_number'           => $m->match_number,
            'bracket_section'        => $m->bracket_section ?? 'winners',
            'participant_a'          => $m->participantA ? [
                'id'   => $m->participant_a_id,
                'name' => $m->participantA->gamertag ?? $m->participantA->user?->name ?? 'TBD',
            ] : null,
            'participant_b'          => $m->participantB ? [
                'id'   => $m->participant_b_id,
                'name' => $m->participantB->gamertag ?? $m->participantB->user?->name ?? 'TBD',
            ] : null,
            'score_a'                => $m->score_a,
            'score_b'                => $m->score_b,
            'winner_id'              => $m->winner_id,
            'status'                 => $m->status,
            'scheduled_at'           => $m->scheduled_at?->toIso8601String(),
            'scheduled_by_id'        => $m->scheduled_by_id,
            'result_screenshot_path' => $m->result_screenshot_path,
            'dispute_reason'         => $m->dispute_reason,
            'next_match_id'          => $m->next_match_id,
            'submitted_by_id'        => $m->submitted_by_id,
            'completed_at'           => $m->completed_at?->toIso8601String(),
            'pending_reschedule'     => $m->pendingReschedule->first()
                ? MatchRescheduleResource::make($m->pendingReschedule->first()->load('requestedBy:id,name'))
                : null,
            'evidence_count'         => $m->evidence->count(),
        ];
    }
}
