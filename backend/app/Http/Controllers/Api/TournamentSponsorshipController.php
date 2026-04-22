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
    public function __construct(
        private readonly SponsorshipService $service,
        private readonly SponsorLogoService $logoService,
    ) {
    }

    /**
     * Create a new sponsor brand owned by the current organizer (private scope).
     * Admins also use this endpoint; admin-created sponsors still default to
     * 'global' scope via the existing admin SponsorController, not this one.
     *
     * Request: multipart/form-data (to support optional logo upload)
     */
    public function createSponsor(CreateOrganizerSponsorRequest $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();

        // Default slug from name; ensure uniqueness by appending a random suffix.
        $slug = Str::slug($data['name']) . '-' . Str::random(6);

        $sponsor = Sponsor::create([
            'name'               => $data['name'],
            'name_ar'            => $data['name_ar']    ?? null,
            'slug'               => $slug,
            'tagline'            => $data['tagline']    ?? null,
            'tagline_ar'         => $data['tagline_ar'] ?? null,
            'website_url'        => $data['website_url']   ?? null,
            'contact_email'      => $data['contact_email'] ?? null,
            'is_active'          => true,
            // Organizer-created → private. Admins use /admin/sponsors for global.
            'scope'              => Sponsor::SCOPE_PRIVATE,
            'created_by_user_id' => $user?->id,
        ]);

        // Optional logo in the same request
        if ($request->hasFile('logo')) {
            $url = $this->logoService->store($sponsor, $request->file('logo'));
            $sponsor->update(['logo_url' => $url]);
        }

        return response()->json([
            'data'    => new SponsorResource($sponsor->refresh()),
            'message' => 'Sponsor created. It will only appear on your own tournaments until an admin promotes it.',
        ], Response::HTTP_CREATED);
    }

    /**
     * Upload/replace the logo on an existing sponsor.
     *
     * Authorization:
     *   - Admin: any sponsor
     *   - Organizer: only sponsors they created (private scope)
     */
    public function uploadLogo(Request $request, Sponsor $sponsor): JsonResponse
    {
        $user = $request->user();

        $canEdit = $user && (
            $user->role === 'admin'
            || (string) $sponsor->created_by_user_id === (string) $user->id
        );
        if (! $canEdit) {
            throw new AuthorizationException('You may only edit logos on sponsors you created.');
        }

        $request->validate([
            'logo' => ['required', 'file', 'max:2048',
                       'mimetypes:image/png,image/jpeg,image/webp,image/svg+xml'],
        ]);

        $url = $this->logoService->store($sponsor, $request->file('logo'));
        $sponsor->update(['logo_url' => $url]);

        return response()->json(['data' => new SponsorResource($sponsor->refresh())]);
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
     * Returns active sponsors visible to the current user:
     *   - Admin sees every active sponsor
     *   - Organizer sees global sponsors + their own scoped sponsors
     *
     * Includes is_global flag so the UI can flag scoped rows as "Your private sponsor".
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
