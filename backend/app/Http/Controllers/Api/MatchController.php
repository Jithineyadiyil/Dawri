<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use App\Services\BracketAdvancementService;
use App\Services\DisputeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function __construct(
        private readonly BracketAdvancementService $advancement,
        private readonly DisputeService $disputes,
    ) {}

    /**
     * GET /api/v1/matches/{id}
     */
    public function show(string $id): JsonResponse
    {
        $match = TournamentMatch::with([
            'participantA.user:id,name,game_username',
            'participantB.user:id,name,game_username',
            'bracket.tournament:id,name,game',
        ])->findOrFail($id);

        return response()->json(['data' => $this->matchArray($match)]);
    }

    /**
     * POST /api/v1/matches/{id}/result
     */
    public function submitResult(Request $request, string $id): JsonResponse
    {
        // Accept both 'winner_id' and 'winner_participant_id' from frontend
        $winnerId = $request->input('winner_id') ?? $request->input('winner_participant_id');

        if (! $winnerId) {
            return response()->json(['message' => 'Winner is required.', 'errors' => ['winner_id' => ['The winner field is required.']]], 422);
        }

        $match = TournamentMatch::findOrFail($id);

        // Allow pending, scheduled, ongoing, or active matches
        if (! in_array($match->status, ['pending', 'scheduled', 'ongoing', 'active'], true)) {
            return response()->json(['message' => 'Match is not in a submittable state. Current status: ' . $match->status], 422);
        }

        // Validate winner is one of the match participants
        if ($winnerId !== $match->participant_a_id && $winnerId !== $match->participant_b_id) {
            return response()->json(['message' => 'Winner must be one of the match participants.'], 422);
        }

        $screenshotPath = null;
        if ($request->hasFile('screenshot')) {
            $screenshotPath = $request->file('screenshot')->store('screenshots', 'public');
        }

        $match->update([
            'winner_id'       => $winnerId,
            'score_a'         => $request->input('score_a'),
            'score_b'         => $request->input('score_b'),
            'status'          => 'submitted',
            'submitted_by'    => $request->user()?->id,
            'screenshot_path' => $screenshotPath,
        ]);

        return response()->json(['data' => $this->matchArray($match->fresh())]);
    }

    /**
     * POST /api/v1/matches/{id}/confirm
     */
    public function confirmResult(Request $request, string $id): JsonResponse
    {
        $match = TournamentMatch::findOrFail($id);

        if ($match->status !== 'submitted') {
            return response()->json(['message' => 'No result to confirm.'], 422);
        }

        if (! $match->winner_id) {
            return response()->json(['message' => 'No winner set.'], 422);
        }

        try {
            $this->advancement->advance($match);

            return response()->json([
                'message' => 'Result confirmed and bracket advanced.',
                'data'    => $this->matchArray($match->fresh()),
            ]);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * POST /api/v1/matches/{id}/dispute
     */
    public function disputeResult(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        try {
            $dispute = $this->disputes->raise(
                $id,
                $request->user()->id,
                $request->input('reason')
            );

            return response()->json([
                'message'    => 'Dispute raised successfully.',
                'dispute_id' => $dispute->id,
            ]);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * POST /api/v1/matches/{id}/moderator-override
     */
    public function moderatorOverride(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'winner_id' => ['required', 'uuid'],
            'reason'    => ['required', 'string', 'max:1000'],
        ]);

        $user = $request->user();
        if (! in_array($user->role, ['admin', 'moderator', 'organizer'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $match = TournamentMatch::findOrFail($id);

        $match->update([
            'winner_id'      => $request->input('winner_id'),
            'status'         => 'completed',
            'moderator_note' => "Override by {$user->name}: " . $request->input('reason'),
        ]);

        try {
            $this->advancement->advance($match);
        } catch (\Throwable $e) {
            logger()->error("Bracket advance failed after override: {$e->getMessage()}");
        }

        return response()->json([
            'message' => 'Match result overridden.',
            'data'    => $this->matchArray($match->fresh()),
        ]);
    }

    private function matchArray(TournamentMatch $m): array
    {
        return [
            'id'              => $m->id,
            'bracket_id'      => $m->bracket_id,
            'round_number'    => $m->round_number,
            'match_number'    => $m->match_number,
            'bracket_section' => $m->bracket_section ?? 'winners',
            'participant_a'   => $m->participantA ? [
                'id'   => $m->participant_a_id,
                'name' => $m->participantA->gamertag ?? $m->participantA->user?->name ?? 'TBD',
            ] : null,
            'participant_b'   => $m->participantB ? [
                'id'   => $m->participant_b_id,
                'name' => $m->participantB->gamertag ?? $m->participantB->user?->name ?? 'TBD',
            ] : null,
            'score_a'          => $m->score_a,
            'score_b'          => $m->score_b,
            'winner_id'        => $m->winner_id,
            'status'           => $m->status,
            'screenshot_path'  => $m->screenshot_path,
            'moderator_note'   => $m->moderator_note,
            'next_match_id'    => $m->next_match_id,
            'dispute_reason'   => $m->moderator_note,
        ];
    }
}
