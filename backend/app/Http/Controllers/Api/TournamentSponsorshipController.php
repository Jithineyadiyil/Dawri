<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProposeSponsorshipRequest;
use App\Http\Resources\SponsorResource;
use App\Http\Resources\SponsorshipResource;
use App\Models\Sponsor;
use App\Models\Sponsorship;
use App\Models\Tournament;
use App\Services\SponsorshipService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

/**
 * TournamentSponsorshipController
 *
 * Organizer-facing endpoints for managing sponsorships on their OWN tournaments.
 * Admins can also use these (they bypass the ownership guard).
 *
 * Routes (mounted under /api/v1/tournaments/{tournament}/sponsorships, auth required):
 *   GET    /manage     — full list including drafts/pending (organizer view)
 *   POST   /manage     — propose a new deal (starts in 'pending' state)
 *   DELETE /manage/{sponsorship} — cancel a pending deal (only if you created it)
 *
 *   GET    /sponsors-catalog — read-only sponsor directory for organizer dropdowns
 *
 * Separate from the public /tournaments/{tournament}/sponsorships (read-only
 * active-sponsors summary) and from /admin/sponsorships/* (admin CRUD).
 */
class TournamentSponsorshipController extends Controller
{
    public function __construct(private readonly SponsorshipService $service)
    {
    }

    /**
     * List ALL sponsorships on a tournament (including drafts + pending).
     * Organizer of the tournament or admin only.
     */
    public function manageIndex(Request $request, Tournament $tournament): JsonResponse
    {
        $this->authorizeTournament($request, $tournament);

        $rows = Sponsorship::with('sponsor')
            ->where('tournament_id', $tournament->id)
            ->whereIn('contract_status', ['draft', 'pending', 'active', 'fulfilled'])
            ->latest()
            ->get();

        return response()->json([
            'data' => SponsorshipResource::collection($rows),
        ]);
    }

    /**
     * Organizer proposes a new sponsorship deal on their tournament.
     * Creates in 'pending' state — admin must approve before it goes public.
     */
    public function propose(ProposeSponsorshipRequest $request, Tournament $tournament): JsonResponse
    {
        $this->authorizeTournament($request, $tournament);

        $data = $request->validated();
        $data['tournament_id'] = $tournament->id; // force — ignore any id in body

        try {
            $sponsorship = $this->service->createAsProposal($data, $request->user());
        } catch (InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'data'    => new SponsorshipResource($sponsorship->load('sponsor')),
            'message' => 'Sponsorship proposal submitted. An admin will review it shortly.',
        ], Response::HTTP_CREATED);
    }

    /**
     * Organizer cancels their own pending proposal. Only pending deals can
     * be cancelled this way — active/fulfilled deals require admin action.
     */
    public function withdrawProposal(Request $request, Tournament $tournament, Sponsorship $sponsorship): JsonResponse
    {
        $this->authorizeTournament($request, $tournament);

        if ($sponsorship->tournament_id !== $tournament->id) {
            return response()->json(['message' => 'Sponsorship does not belong to this tournament.'],
                Response::HTTP_NOT_FOUND);
        }

        if ($sponsorship->contract_status !== 'pending') {
            return response()->json([
                'message' => 'Only pending proposals can be withdrawn. Contact an admin to cancel active deals.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->service->cancel($sponsorship, 'Withdrawn by organizer');

        return response()->json(['message' => 'Proposal withdrawn.']);
    }

    /**
     * Read-only sponsor catalog for organizer dropdowns.
     *
     * Sprint 10 — returns active sponsors visible to the current user:
     *   - Admin: every active sponsor
     *   - Organizer: global sponsors + their own scoped sponsors
     *
     * Includes is_global so the UI can flag scoped rows as "(private)".
     */
    public function sponsorsCatalog(Request $request): JsonResponse
    {
        if (! $this->userIsOrganizerOrAdmin($request)) {
            throw new AuthorizationException('Only organizers and admins may view the sponsor catalog.');
        }

        $sponsors = Sponsor::active()
            ->visibleTo($request->user())
            ->orderBy('name')
            ->get(['id', 'name', 'name_ar', 'slug', 'tagline', 'logo_url', 'website_url', 'is_active', 'is_global', 'created_by_user_id']);

        return response()->json([
            'data' => SponsorResource::collection($sponsors),
        ]);
    }

    // ── Ownership guards ──────────────────────────────────────────────

    /**
     * Allow if current user is admin OR organizer of this tournament.
     */
    private function authorizeTournament(Request $request, Tournament $tournament): void
    {
        $user = $request->user();
        if (! $user) {
            throw new AuthorizationException('Authentication required.');
        }
        if ($user->role === 'admin') {
            return;
        }
        if ($user->role === 'organizer' && (string) $tournament->organizer_id === (string) $user->id) {
            return;
        }
        throw new AuthorizationException('You may only manage sponsorships on tournaments you organize.');
    }

    private function userIsOrganizerOrAdmin(Request $request): bool
    {
        $role = $request->user()?->role;
        return in_array($role, ['admin', 'organizer'], true);
    }
}
