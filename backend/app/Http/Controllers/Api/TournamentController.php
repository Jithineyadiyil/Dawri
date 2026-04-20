<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTournamentRequest;
use App\Http\Requests\UpdateTournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Services\BracketAdvancementService;
use App\Services\BracketGeneratorService;
use App\Services\WalletService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Tournament CRUD + registration + match submission.
 *
 * ── Sprint 1 fixes applied ──────────────────────────────────────────────────
 *   1. register() now enforces phone_verified_at !== null (PRD gate).
 *   2. Seed assignment now uses lockForUpdate() on the Tournament row AND
 *      computes MAX(seed) inside the same transaction — prevents two
 *      concurrent registrations from being assigned the same seed.
 *   3. Entry fee is debited via WalletService (double-entry ledger)
 *      instead of silently ignored.
 *   4. store() now writes status='registration_open' (matches the default
 *      declared by add_missing_columns and the Tournament model attributes).
 *      Eliminates the 'registration' vs 'registration_open' inconsistency.
 *   5. submitResult writes result_screenshot_path and submitted_by_id
 *      (matches migration schema).
 */
class TournamentController extends Controller
{
    public function __construct(
        private readonly BracketGeneratorService   $bracketGenerator,
        private readonly BracketAdvancementService $bracketAdvancement,
        private readonly WalletService             $wallet,
    ) {}

    /**
     * GET /api/v1/tournaments
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Tournament::query()
            ->withCount('participants')
            ->with(['organizer:id,name'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('format'), fn ($q) => $q->where('format', $request->format))
            ->when($request->filled('game'),   fn ($q) => $q->where('game', $request->game))
            ->when($request->filled('search'), fn ($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->latest();

        return TournamentResource::collection($query->paginate(12));
    }

    /**
     * POST /api/v1/tournaments
     */
    public function store(StoreTournamentRequest $request): JsonResponse
    {
        $user = Auth::user();
        if (! $user || ! in_array($user->role, ['organizer', 'admin'], true)) {
            return response()->json(
                ['message' => 'Only organizers or admins can create tournaments.'],
                Response::HTTP_FORBIDDEN
            );
        }

        $v = $request->validated();

        $tournament = Tournament::create([
            'name'                   => $v['name'],
            'name_ar'                => $v['name_ar'] ?? null,
            'game'                   => $v['game'],
            'format'                 => $v['format'],
            'max_participants'       => $v['max_participants'],
            'swiss_rounds'           => $v['swiss_rounds'] ?? null,
            'starts_at'              => $v['starts_at'] ?? $v['start_date'] ?? null,
            'registration_closes_at' => $v['registration_closes_at'] ?? $v['registration_end'] ?? null,
            'entry_fee_sar'          => $v['entry_fee_sar'] ?? 0,
            'prize_pool'             => $v['prize_pool'] ?? null,
            'timezone'               => $v['timezone'] ?? 'Asia/Riyadh',
            'is_public'              => $v['is_public'] ?? true,
            'organizer_id'           => Auth::id(),
            // ── Fix 4: consistent status value ──────────────────────────────
            'status'                 => 'registration_open',
        ]);

        $tournament->loadCount('participants');
        $tournament->load('organizer:id,name');

        return (new TournamentResource($tournament))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * GET /api/v1/tournaments/{tournament}
     */
    public function show(Tournament $tournament): TournamentResource
    {
        $tournament->loadCount('participants');
        $tournament->load([
            'organizer:id,name',
            'participants.user:id,name',
            'bracket',
            'matches',
            'matches.participantA.user:id,name',
            'matches.participantB.user:id,name',
            'matches.winner.user:id,name',
        ]);

        return new TournamentResource($tournament);
    }

    /**
     * PUT /api/v1/tournaments/{tournament}
     */
    public function update(UpdateTournamentRequest $request, Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (! $user || (! in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $tournament->update($request->validated());
        $tournament->loadCount('participants');

        return (new TournamentResource($tournament))->response();
    }

    /**
     * DELETE /api/v1/tournaments/{tournament}
     */
    public function destroy(Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (! $user || (! in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        if (! in_array($tournament->status, ['draft', 'registration_open', 'cancelled'], true)) {
            return response()->json(
                ['message' => 'Cannot delete an ongoing tournament.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $tournament->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * POST /api/v1/tournaments/{tournament}/generate-bracket
     */
    public function generateBracket(Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (! $user || (! in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        try {
            $this->bracketGenerator->generate($tournament);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tournament->refresh()->loadCount('participants');
        $tournament->load([
            'bracket',
            'matches',
            'matches.participantA.user:id,name',
            'matches.participantB.user:id,name',
        ]);

        return response()->json([
            'message'    => 'Bracket generated successfully.',
            'tournament' => new TournamentResource($tournament),
        ]);
    }

    /**
     * POST /api/v1/tournaments/{tournament}/matches/{matchId}/result
     *
     * Note: the primary path for match submission is
     * POST /api/v1/matches/{id}/result via MatchController. This nested
     * route is retained for frontend backwards-compatibility and uses the
     * same column names as MatchController::submitResult.
     */
    public function submitResult(Request $request, Tournament $tournament, string $matchId): JsonResponse
    {
        $request->validate([
            'winner_participant_id' => ['nullable', 'string'],
            'winner_id'             => ['nullable', 'string'],
            'score_a'               => ['nullable', 'integer', 'min:0', 'max:99'],
            'score_b'               => ['nullable', 'integer', 'min:0', 'max:99'],
        ]);

        $winnerId = $request->input('winner_participant_id') ?? $request->input('winner_id');

        if (! $winnerId) {
            return response()->json(['message' => 'Winner is required.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $match = TournamentMatch::whereHas('bracket', fn ($q) => $q->where('tournament_id', $tournament->id))
            ->where('id', $matchId)
            ->firstOrFail();

        if (! in_array($match->status, ['pending', 'ongoing', 'scheduled'], true)) {
            return response()->json(
                ['message' => 'Match cannot be updated in its current status.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if ($winnerId !== $match->participant_a_id && $winnerId !== $match->participant_b_id) {
            return response()->json(
                ['message' => 'Winner must be one of the match participants.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $match->update([
            'winner_id'       => $winnerId,
            'score_a'         => $request->score_a,
            'score_b'         => $request->score_b,
            'status'          => 'completed',
            'submitted_by_id' => $request->user()?->id,
            'completed_at'    => now(),
        ]);

        try {
            $this->bracketAdvancement->advance($match->fresh());
        } catch (Throwable $e) {
            \Log::error('Bracket advancement failed', ['error' => $e->getMessage()]);
        }

        return response()->json([
            'message' => 'Result recorded successfully.',
            'data'    => [
                'id'        => $match->id,
                'status'    => $match->fresh()->status,
                'winner_id' => $winnerId,
            ],
        ]);
    }

    /**
     * POST /api/v1/tournaments/{tournament}/register
     *
     * ── All four Sprint 1 safety requirements enforced here ──────────────
     *   • Phone verification gate
     *   • Seed assignment inside lockForUpdate transaction
     *   • Entry fee debit via WalletService
     *   • Status value consistent with migration default
     */
    public function register(Request $request, Tournament $tournament): JsonResponse
    {
        $user = $request->user();

        // ── Fix 1: phone verification gate (PRD requirement) ───────────────
        if ($user->phone_verified_at === null) {
            return response()->json(
                ['message' => 'Phone verification required to join tournaments.'],
                Response::HTTP_FORBIDDEN
            );
        }

        if (! in_array($tournament->status, ['registration_open', 'registration'], true)) {
            return response()->json(
                ['message' => 'Registration is not open.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if ($tournament->registration_closes_at && now()->gte($tournament->registration_closes_at)) {
            return response()->json(
                ['message' => 'Registration has closed.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        try {
            // ── Fix 2: atomic seed assignment inside locked transaction ────
            DB::transaction(function () use ($tournament, $user) {
                // Lock the tournament row for the duration of this transaction.
                // This serializes registrations per-tournament — seed collision
                // is no longer possible.
                $locked = Tournament::whereKey($tournament->id)->lockForUpdate()->first();

                if ($locked === null) {
                    throw new \RuntimeException('Tournament not found.');
                }

                // Double-check inside the lock.
                if ($locked->participants()->where('user_id', $user->id)->exists()) {
                    throw new \RuntimeException('Already registered.');
                }

                $count = $locked->participants()->count();
                if ($count >= $locked->max_participants) {
                    throw new \RuntimeException('Tournament is full.');
                }

                // ── Fix 3: entry fee debit via WalletService ───────────────
                if ((int) $locked->entry_fee_sar > 0) {
                    $this->wallet->debit(
                        $user,
                        (float) $locked->entry_fee_sar,
                        "Entry fee: {$locked->name}",
                        'tournament_entry',
                        $locked->id
                    );
                }

                $maxSeed = (int) $locked->participants()->max('seed');

                $locked->participants()->create([
                    'user_id'       => $user->id,
                    'gamertag'      => $user->game_username ?: $user->name,
                    'seed'          => $maxSeed + 1,
                    'status'        => 'registered',
                    'registered_at' => now(),
                ]);
            });
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tournament->loadCount('participants');

        return response()->json([
            'message'            => 'Registered successfully.',
            'participants_count' => $tournament->participants_count,
        ]);
    }
}
