<?php
declare(strict_types=1);
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BracketPrediction;
use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

/**
 * Challonge-inspired features:
 *  1. Shuffle Seeds
 *  2. Participant Substitution
 *  3. Bracket Predictions (submit / view / leaderboard / score)
 */
class ChallongeFeatureController extends Controller
{
    // ── 1. Shuffle Seeds ─────────────────────────────────────────────────────

    public function shuffleSeeds(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if ($tournament->organizer_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }
        if ($tournament->brackets()->exists()) {
            return response()->json(['message' => 'Cannot shuffle seeds after the bracket has been generated.'], 422);
        }

        DB::transaction(function () use ($tournament) {
            $participants = $tournament->participants()->get()->shuffle();
            foreach ($participants as $i => $p) {
                $p->update(['seed' => $i + 1]);
            }
        });

        $participants = $tournament->participants()->orderBy('seed')->with('user:id,name,avatar_url')->get()
            ->map(fn($p) => [
                'id'        => $p->id,
                'seed'      => $p->seed,
                'name'      => $p->user?->name ?? $p->guest_name ?? '—',
                'avatar_url'=> $p->user?->avatar_url,
            ]);

        return response()->json(['message' => 'Seeds shuffled successfully.', 'participants' => $participants]);
    }

    // ── 2. Participant Substitution ───────────────────────────────────────────

    public function substitute(Request $request, string $id, string $participantId): JsonResponse
    {
        $tournament  = Tournament::findOrFail($id);
        $participant = TournamentParticipant::where('tournament_id', $id)->where('id', $participantId)->firstOrFail();

        if ($tournament->organizer_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate([
            'new_user_id'      => ['nullable','uuid','exists:users,id'],
            'new_display_name' => ['nullable','string','max:100'],
        ]);

        if (empty($data['new_user_id']) && empty($data['new_display_name'])) {
            return response()->json(['message' => 'Provide new_user_id or new_display_name.'], 422);
        }

        if (!empty($data['new_user_id'])) {
            $alreadyIn = $tournament->participants()
                ->where('user_id', $data['new_user_id'])
                ->where('id', '!=', $participantId)
                ->exists();
            if ($alreadyIn) {
                return response()->json(['message' => 'This player is already in the tournament.'], 422);
            }
            $participant->update(['user_id' => $data['new_user_id']]);
            $name = User::find($data['new_user_id'])?->name ?? 'Unknown';
        } else {
            $participant->update(['guest_name' => $data['new_display_name']]);
            $name = $data['new_display_name'];
        }

        return response()->json(['message' => "Substituted with {$name}.", 'participant_id' => $participant->id]);
    }

    // ── 3. Submit Prediction ─────────────────────────────────────────────────

    public function submitPrediction(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $data = $request->validate([
            'match_id'            => ['required','uuid'],
            'predicted_winner_id' => ['required','uuid'],
        ]);

        $match = $tournament->matches()->where('id', $data['match_id'])->firstOrFail();
        if (in_array($match->status, ['completed','walkover'])) {
            return response()->json(['message' => 'Match already completed.'], 422);
        }

        $prediction = BracketPrediction::updateOrCreate(
            ['user_id' => $request->user()->id, 'match_id' => $data['match_id']],
            ['tournament_id' => $id, 'predicted_winner_id' => $data['predicted_winner_id'], 'is_correct' => null, 'points_earned' => 0]
        );

        return response()->json(['data' => $prediction], Response::HTTP_CREATED);
    }

    // ── 4. My Predictions ────────────────────────────────────────────────────

    public function myPredictions(Request $request, string $id): JsonResponse
    {
        $predictions = BracketPrediction::where('tournament_id', $id)
            ->where('user_id', $request->user()->id)
            ->get()
            ->keyBy('match_id');

        return response()->json(['data' => $predictions]);
    }

    // ── 5. Prediction Leaderboard ─────────────────────────────────────────────

    public function predictionLeaderboard(string $id): JsonResponse
    {
        $rows = BracketPrediction::where('tournament_id', $id)
            ->select(
                'user_id',
                DB::raw('SUM(points_earned) as total_points'),
                DB::raw('SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_count'),
                DB::raw('COUNT(*) as total_predictions')
            )
            ->groupBy('user_id')
            ->orderByDesc('total_points')
            ->orderByDesc('correct_count')
            ->orderByDesc('total_predictions')
            ->with('user:id,name,avatar_url')
            ->limit(50)->get()
            ->map(fn($p) => [
                'user_id'          => $p->user_id,
                'name'             => $p->user?->name ?? '—',
                'avatar_url'       => $p->user?->avatar_url,
                'total_points'     => (int) $p->total_points,
                'correct_count'    => (int) $p->correct_count,
                'total_predictions'=> (int) $p->total_predictions,
            ]);

        return response()->json(['data' => $rows]);
    }

    // ── 6. Score Predictions (after match completes) ──────────────────────────

    public function scorePredictions(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        if ($tournament->organizer_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate([
            'match_id'  => ['required','uuid'],
            'winner_id' => ['required','uuid'],
        ]);

        $match  = $tournament->matches()->where('id', $data['match_id'])->firstOrFail();
        $points = min(10, ($match->round_number ?? 1) * 2);

        DB::transaction(function () use ($data, $points) {
            BracketPrediction::where('match_id', $data['match_id'])
                ->where('predicted_winner_id', $data['winner_id'])
                ->update(['is_correct' => true, 'points_earned' => $points]);
            BracketPrediction::where('match_id', $data['match_id'])
                ->where('predicted_winner_id', '!=', $data['winner_id'])
                ->update(['is_correct' => false, 'points_earned' => 0]);
        });

        return response()->json(['message' => 'Predictions scored.', 'points_per_correct' => $points]);
    }
}
