<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\TournamentRegistered;
use App\Notifications\BracketGeneratedNotification;
use App\Notifications\TournamentRegisteredNotification;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\UpdateTournamentBrandingRequest;
use App\Http\Requests\UploadCoverRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Services\BrandingService;
use App\Services\CoverImageService;
use App\Services\OrganizerCapsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * TournamentController — Sprint 3 additions:
 *   • POST   /tournaments/{id}/cover            — upload cover image
 *   • DELETE /tournaments/{id}/cover            — remove cover
 *   • PATCH  /tournaments/{id}/brand            — override brand (plan-gated)
 *
 * Also extends `store()` to accept rules/cover/brand on creation, and
 * `register()` to require rules acceptance when rules exist.
 */
class TournamentController extends Controller
{
    public function __construct(
        private readonly CoverImageService    $covers,
        private readonly BrandingService      $branding,
        private readonly OrganizerCapsService $caps,
    ) {}

    // ── List / Show ─────────────────────────────────────────────────────

    public function index(Request $request): JsonResponse
    {
        $query = Tournament::query()
            ->with(['organizer:id,name', 'company:id,name,logo_url,primary_color,secondary_color,font_family'])
            ->withCount('participants')
            ->where('is_public', true);

        if ($request->filled('game'))   { $query->where('game',   $request->input('game')); }
        if ($request->filled('format')) { $query->where('format', $request->input('format')); }
        if ($request->filled('status')) { $query->where('status', $request->input('status')); }
        if ($request->filled('search')) {
            $s = $request->input('search');
            $query->where(fn ($q) => $q->where('name', 'like', "%{$s}%")->orWhere('name_ar', 'like', "%{$s}%"));
        }

        $results = $query->orderByDesc('created_at')->paginate(24);

        return TournamentResource::collection($results)->response();
    }

    public function show(string $id): JsonResponse
    {
        $t = Tournament::with([
            'organizer:id,name,company_id',
            'organizer.company',
            'company',
            'participants.user:id,name',
            'matches.participantA.user:id,name',
            'matches.participantB.user:id,name',
            'matches.winner.user:id,name',
            'bracket',
        ])->findOrFail($id);

        return (new TournamentResource($t))->response();
    }

    // ── Create / Update / Destroy ───────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'                   => ['required', 'string', 'max:150'],
            'name_ar'                => ['nullable', 'string', 'max:150'],
            'game'                   => ['required', 'string', 'max:50'],
            'format'                 => ['required', 'in:single_elimination,double_elimination,round_robin,swiss,group_knockout'],
            'platform'               => ['nullable', 'in:psn,xbox,pc,mobile,cross'],
            'max_participants'       => ['required', 'integer', 'min:2', 'max:512'],
            'swiss_rounds'           => ['nullable', 'integer', 'min:1', 'max:15'],
            'registration_closes_at' => ['required', 'date'],
            'starts_at'              => ['required', 'date', 'after:registration_closes_at'],
            'timezone'               => ['nullable', 'string', 'max:50'],
            'is_public'              => ['sometimes', 'boolean'],
            'entry_fee_sar'          => ['nullable', 'integer', 'min:0'],
            'prize_pool'             => ['nullable', 'array'],
            'rules'                  => ['nullable', 'string', 'max:10000'],
        ]);

        $user = $request->user();

        // Enforce organizer-tier caps (participants, entry fee).
        $capErrors = $this->caps->validate($user, $data);
        if ($capErrors !== []) {
            throw \Illuminate\Validation\ValidationException::withMessages($capErrors);
        }

        $data['organizer_id'] = $user->id;
        $data['company_id']   = $user->company_id;
        $data['status']       = 'registration_open';

        $tournament = Tournament::create($data);

        return (new TournamentResource($tournament->fresh(['organizer:id,name', 'company'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);

        $data = $request->validate([
            'name'             => ['sometimes', 'string', 'max:150'],
            'name_ar'          => ['nullable', 'string', 'max:150'],
            'rules'            => ['nullable', 'string', 'max:10000'],
            'max_participants' => ['sometimes', 'integer', 'min:2', 'max:512'],
            'entry_fee_sar'    => ['sometimes', 'integer', 'min:0'],
            'prize_pool'       => ['nullable', 'array'],
        ]);

        $tournament->update($data);
        return (new TournamentResource($tournament->fresh()))->response();
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);
        $tournament->delete();
        return response()->json(['message' => 'Tournament deleted.']);
    }

    // ── Registration (rules-aware) ──────────────────────────────────────

    public function register(Request $request, string $id): JsonResponse
    {
        $data = $request->validate([
            'accept_rules' => ['nullable', 'boolean'],
        ]);

        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        $tournament = Tournament::findOrFail($id);

        // Bug #4: Also check registration_closes_at timestamp, not just status
        if (! $tournament->isRegistrationOpen()) {
            return response()->json(['message' => 'Registration is closed.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if ($tournament->registration_closes_at && now()->isAfter($tournament->registration_closes_at)) {
            return response()->json(['message' => 'Registration deadline has passed.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Bug #24: Check for duplicate FIRST (before full check — better UX)
        if ($tournament->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already registered.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($tournament->hasRules() && empty($data['accept_rules'])) {
            return response()->json([
                'message'        => 'You must accept the tournament rules to register.',
                'rules_required' => true,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Bug #2+1: Lock the tournament row inside a transaction to prevent race
        // conditions on max_participants and seed assignment.
        try {
            $participant = DB::transaction(function () use ($tournament, $user, $data) {
                // Write lock — blocks concurrent registrations until this one completes
                $locked = Tournament::lockForUpdate()->findOrFail($tournament->id);

                $count = $locked->participants()->count();
                if ($count >= (int) $locked->max_participants) {
                    throw new \RuntimeException('Tournament is full.');
                }

                // max(seed) + 1 is race-safe — no two registrations get the same seed
                $nextSeed = ($locked->participants()->max('seed') ?? 0) + 1;

                return TournamentParticipant::create([
                    'tournament_id'     => $locked->id,
                    'user_id'           => $user->id,
                    'seed'              => $nextSeed,
                    'status'            => 'registered',
                    'rules_accepted_at' => ! empty($data['accept_rules']) ? now() : null,
                ]);
            });
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Notify player of successful registration
        try {
            $count = $participant->tournament->participants()->count();
            $user->notify(new TournamentRegisteredNotification(
                tournamentId:     $tournament->id,
                tournamentName:   $tournament->name,
                format:           $tournament->format,
                startsAt:         $tournament->starts_at?->format('d M Y H:i') ?? 'TBD',
                participantCount: $count,
                maxParticipants:  $tournament->max_participants,
            ));
            // Also send email confirmation
            Mail::to($user->email)->queue(new TournamentRegistered($user, $tournament));
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('TournamentRegistered notify failed: ' . $e->getMessage());
        }

        return response()->json([
            'message'            => 'Registered!',
            'participants_count' => $tournament->participants()->count(),
            'participant_id'     => $participant->id,
        ], Response::HTTP_CREATED);
    }

    /**
     * POST /tournaments/{id}/register-team  { team_id }
     *
     * Team-tournament registration. Only the team's owner or a captain can
     * register their team. The team takes ONE participant slot (not one per
     * player) — tournament_participants.team_id is set, user_id is null.
     */
    public function registerTeam(Request $request, string $id): JsonResponse
    {
        $data = $request->validate([
            'team_id' => ['required', 'uuid', 'exists:teams,id'],
        ]);

        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthenticated.'], Response::HTTP_UNAUTHORIZED);

        $tournament = Tournament::findOrFail($id);
        if (!$tournament->isRegistrationOpen()) return response()->json(['message' => 'Registration is closed.'], 422);
        if ($tournament->registration_closes_at && now()->isAfter($tournament->registration_closes_at)) {
            return response()->json(['message' => 'Registration deadline has passed.'], 422);
        }

        $team = \App\Models\Team::findOrFail($data['team_id']);
        if ($team->game !== $tournament->game) {
            return response()->json(['message' => "This team plays {$team->game}; tournament is {$tournament->game}."], 422);
        }
        $role = $team->roleOf($user->id);
        if (!in_array($role, [\App\Models\TeamMember::ROLE_OWNER, \App\Models\TeamMember::ROLE_CAPTAIN], true)) {
            return response()->json(['message' => 'Only the team owner or a captain can register the team.'], 403);
        }
        if ($tournament->participants()->where('team_id', $team->id)->exists()) {
            return response()->json(['message' => 'Team already registered.'], 422);
        }

        $participant = DB::transaction(function () use ($tournament, $team) {
            $locked = Tournament::lockForUpdate()->findOrFail($tournament->id);
            $count  = $locked->participants()->count();
            if ($count >= (int) $locked->max_participants) {
                throw new RuntimeException('Tournament is full.');
            }
            return TournamentParticipant::create([
                'tournament_id' => $locked->id,
                'team_id'       => $team->id,
                'user_id'       => null,
                'gamertag'      => $team->tag ?? $team->name,
                'seed'          => $count + 1,
                'status'        => 'confirmed',
                'registered_at' => now(),
            ]);
        });

        return response()->json([
            'message'        => 'Team registered.',
            'participant_id' => $participant->id,
        ], 201);
    }


    public function unregister(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], Response::HTTP_UNAUTHORIZED);
        }
        $tournament = Tournament::findOrFail($id);

        if (! $tournament->isRegistrationOpen()) {
            return response()->json(
                ['message' => 'Registration is closed — you cannot withdraw after it closes.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $deleted = $tournament->participants()
            ->where('user_id', $user->id)
            ->delete();

        if (! $deleted) {
            return response()->json(['message' => 'You are not registered for this tournament.'], 404);
        }

        return response()->json([
            'message'            => 'You have been unregistered.',
            'participants_count' => $tournament->participants()->count(),
        ]);
    }

    // ── Sprint 3: Cover image ──────────────────────────────────────────

    public function uploadCover(UploadCoverRequest $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);

        try {
            $tournament = $this->covers->upload($tournament, $request->file('file'));
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'message'         => 'Cover image uploaded.',
            'cover_image_url' => $tournament->cover_image_url,
        ]);
    }

    public function deleteCover(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);
        $this->covers->remove($tournament);
        return response()->json(['message' => 'Cover removed.']);
    }

    // ── Sprint 3: Branding override (plan-gated by route middleware) ───

    public function updateBranding(UpdateTournamentBrandingRequest $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);

        $tournament->update($request->only([
            'brand_override',
            'primary_color', 'secondary_color', 'accent_color',
            'background_color', 'font_family', 'logo_url',
        ]));

        return response()->json([
            'message' => 'Branding updated.',
            'brand'   => $this->branding->forTournament($tournament->fresh()),
        ]);
    }

    // ── Helpers ────────────────────────────────────────────────────────

    private function authorizeOrganizer(Request $request, Tournament $tournament): void
    {
        $user = $request->user();
        if (! $user || ($user->role !== 'admin' && (string) $tournament->organizer_id !== (string) $user->id)) {
            abort(Response::HTTP_FORBIDDEN, 'You can only modify your own tournaments.');
        }
    }

    // ── Result submission (preserved from Sprint 1) ────────────────────

    public function submitResult(Request $request, string $tournamentId, string $matchId): JsonResponse
    {
        // Delegates to MatchController which handles the actual logic.
        return app(MatchController::class)->submitResult($request, $matchId);
    }

    public function generateBracket(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::with('bracket')->findOrFail($id);
        $this->authorizeOrganizer($request, $tournament);

        // Bug #23: Prevent regeneration — once generated, the bracket is immutable.
        // Regenerating would silently delete all match history and results.
        if ($tournament->bracket !== null) {
            return response()->json([
                'message' => 'Bracket has already been generated for this tournament. It cannot be regenerated.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Must have at least 2 registered participants
        $participantCount = $tournament->participants()->count();
        if ($participantCount < 2) {
            return response()->json([
                'message' => 'At least 2 registered participants are required to generate a bracket.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $service = app(\App\Services\BracketGeneratorService::class);
        $service->generate($tournament);

        return response()->json([
            'message'    => 'Bracket generated successfully.',
            'tournament' => new TournamentResource($tournament->fresh(['bracket', 'matches'])),
        ]);
    }
}
