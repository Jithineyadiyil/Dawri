<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSponsorshipRequest;
use App\Http\Resources\SponsorshipResource;
use App\Models\Sponsorship;
use App\Models\Tournament;
use App\Services\SponsorshipService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * SponsorshipController.
 *
 * Admin routes (under /api/v1/admin/sponsorships):
 *   GET    /                 — list, filter by tournament_id or sponsor_id
 *   POST   /                 — create new
 *   GET    /{sponsorship}    — show
 *   PATCH  /{sponsorship}    — update metadata (notes, amounts)
 *   POST   /{sponsorship}/activate
 *   POST   /{sponsorship}/fulfill
 *   POST   /{sponsorship}/cancel
 *   DELETE /{sponsorship}    — deletes draft only; active/fulfilled must cancel
 *
 * Public route:
 *   GET /tournaments/{tournament}/sponsorships  — active sponsorships for display
 */
class SponsorshipController extends Controller
{
    public function __construct(private readonly SponsorshipService $service)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $q = Sponsorship::query()->with('sponsor')->latest();

        if ($tid = $request->string('tournament_id')->toString()) {
            $q->where('tournament_id', $tid);
        }
        if ($sid = $request->string('sponsor_id')->toString()) {
            $q->where('sponsor_id', $sid);
        }
        if ($status = $request->string('status')->toString()) {
            $q->where('contract_status', $status);
        }

        return response()->json([
            'data' => SponsorshipResource::collection($q->paginate(30)),
        ]);
    }

    public function store(StoreSponsorshipRequest $request): JsonResponse
    {
        try {
            $sponsorship = $this->service->create($request->validated(), $request->user());
        } catch (InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'data' => new SponsorshipResource($sponsorship->load('sponsor')),
        ], Response::HTTP_CREATED);
    }

    public function show(Sponsorship $sponsorship): JsonResponse
    {
        return response()->json([
            'data' => new SponsorshipResource($sponsorship->load('sponsor')),
        ]);
    }

    public function update(Request $request, Sponsorship $sponsorship): JsonResponse
    {
        $data = $request->validate([
            'cash_amount_sar'        => ['nullable', 'numeric', 'min:0'],
            'in_kind_description'    => ['nullable', 'string', 'max:500'],
            'in_kind_description_ar' => ['nullable', 'string', 'max:500'],
            'in_kind_value_sar'      => ['nullable', 'numeric', 'min:0'],
            'notes'                  => ['nullable', 'string', 'max:2000'],
        ]);

        $sponsorship->update($data);
        return response()->json(['data' => new SponsorshipResource($sponsorship->refresh()->load('sponsor'))]);
    }

    public function activate(Sponsorship $sponsorship): JsonResponse
    {
        try {
            $this->service->activate($sponsorship);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['data' => new SponsorshipResource($sponsorship->refresh()->load('sponsor'))]);
    }

    public function fulfill(Sponsorship $sponsorship): JsonResponse
    {
        try {
            $this->service->fulfill($sponsorship);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['data' => new SponsorshipResource($sponsorship->refresh()->load('sponsor'))]);
    }

    public function cancel(Request $request, Sponsorship $sponsorship): JsonResponse
    {
        $reason = $request->string('reason')->toString() ?: null;
        $this->service->cancel($sponsorship, $reason);
        return response()->json(['data' => new SponsorshipResource($sponsorship->refresh()->load('sponsor'))]);
    }

    public function destroy(Sponsorship $sponsorship): JsonResponse
    {
        if ($sponsorship->contract_status !== 'draft') {
            return response()->json([
                'message' => 'Only draft sponsorships can be deleted. Use cancel for active ones.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $sponsorship->delete();
        return response()->json(['message' => 'Sponsorship deleted.']);
    }

    /**
     * Public: active sponsorships on a tournament, formatted for display.
     * Used by the tournament detail page to render logos + prize pool.
     */
    public function forTournament(Tournament $tournament): JsonResponse
    {
        return response()->json([
            'data' => $this->service->summarizeForTournament($tournament),
        ]);
    }
}
