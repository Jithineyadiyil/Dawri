<?php
declare(strict_types=1);
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTournamentRequest;
use App\Http\Requests\UpdateTournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Services\BracketGeneratorService;
use App\Services\BracketAdvancementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TournamentController extends Controller
{
    public function __construct(
        private readonly BracketGeneratorService   $bracketGenerator,
        private readonly BracketAdvancementService $bracketAdvancement,
    ) {}

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

    public function store(StoreTournamentRequest $request): JsonResponse
    {
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['organizer', 'admin'], true)) {
            return response()->json(['message' => 'Only organizers or admins can create tournaments.'], Response::HTTP_FORBIDDEN);
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
            'status'                 => 'registration',
        ]);

        $tournament->loadCount('participants');
        $tournament->load('organizer:id,name');
        return (new TournamentResource($tournament))->response()->setStatusCode(Response::HTTP_CREATED);
    }

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

    public function update(UpdateTournamentRequest $request, Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $tournament->update($request->validated());
        $tournament->loadCount('participants');
        return (new TournamentResource($tournament))->response();
    }

    public function destroy(Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }
        if (!in_array($tournament->status, ['draft', 'registration', 'cancelled'], true)) {
            return response()->json(['message' => 'Cannot delete an ongoing tournament.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $tournament->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function generateBracket(Tournament $tournament): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->role, ['admin'], true) && (string) $tournament->organizer_id !== (string) $user->id)) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        try {
            $this->bracketGenerator->generate($tournament);
        } catch (\Throwable $e) {
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
     * Submit match result.
     * Accepts winner_participant_id OR winner_id (both map to winner_id on the match).
     */
    public function submitResult(Request $request, Tournament $tournament, string $matchId): JsonResponse
    {
        $request->validate([
            'winner_participant_id' => ['nullable', 'string'],
            'winner_id'             => ['nullable', 'string'],
            'score_a'               => ['nullable', 'integer', 'min:0'],
            'score_b'               => ['nullable', 'integer', 'min:0'],
        ]);

        // Accept either field name from frontend
        $winnerId = $request->input('winner_participant_id')
            ?? $request->input('winner_id');

        if (!$winnerId) {
            return response()->json(['message' => 'Winner is required.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Find match by UUID (hasManyThrough)
        $match = TournamentMatch::whereHas('bracket', fn ($q) => $q->where('tournament_id', $tournament->id))
            ->where('id', $matchId)
            ->firstOrFail();

        if (!in_array($match->status, ['pending', 'ongoing', 'scheduled'], true)) {
            return response()->json(['message' => 'Match cannot be updated in its current status.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $match->update([
            'winner_id'    => $winnerId,
            'score_a'      => $request->score_a,
            'score_b'      => $request->score_b,
            'status'       => 'completed',
            'completed_at' => now(),
        ]);

        try {
            $this->bracketAdvancement->advance($match->fresh());
        } catch (\Throwable $e) {
            // Advancement failure shouldn't roll back the result
            \Illuminate\Support\Facades\Log::error('Bracket advancement failed', ['error' => $e->getMessage()]);
        }

        return response()->json(['message' => 'Result recorded successfully.', 'data' => [
            'id'        => $match->id,
            'status'    => $match->fresh()->status,
            'winner_id' => $winnerId,
        ]]);
    }

    public function register(Tournament $tournament): JsonResponse
    {
        if (!in_array($tournament->status, ['registration', 'registration_open'], true)) {
            return response()->json(['message' => 'Registration is not open.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Check registration close date
        if ($tournament->registration_closes_at && now()->gte($tournament->registration_closes_at)) {
            return response()->json(['message' => 'Registration has closed.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $userId = Auth::id();
        if ($tournament->participants()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Already registered.'], Response::HTTP_CONFLICT);
        }

        if ($tournament->participants()->count() >= $tournament->max_participants) {
            return response()->json(['message' => 'Tournament is full.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $maxSeed = $tournament->participants()->max('seed') ?? 0;
        $tournament->participants()->create([
            'user_id' => $userId,
            'seed'    => $maxSeed + 1,
            'status'  => 'registered',
        ]);

        $tournament->loadCount('participants');
        return response()->json([
            'message'            => 'Registered successfully.',
            'participants_count' => $tournament->participants_count,
        ]);
    }
}
