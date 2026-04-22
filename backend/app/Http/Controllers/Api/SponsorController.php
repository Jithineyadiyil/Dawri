<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSponsorRequest;
use App\Http\Resources\SponsorResource;
use App\Models\Sponsor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

/**
 * Admin CRUD for sponsors.
 *
 * Routes (mounted under /api/v1/admin):
 *   GET    /sponsors
 *   POST   /sponsors
 *   GET    /sponsors/{sponsor}
 *   PATCH  /sponsors/{sponsor}
 *   DELETE /sponsors/{sponsor}
 *   POST   /sponsors/{sponsor}/promote   (Sprint 10 — scoped → global)
 *   POST   /sponsors/{sponsor}/demote    (Sprint 10 — global → scoped)
 */
class SponsorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Sponsor::query()->orderBy('name');

        if ($request->boolean('active_only')) {
            $query->active();
        }

        // Sprint 10: admin can filter to see only global or only scoped sponsors
        if ($request->filled('scope')) {
            $scope = $request->string('scope')->toString();
            if ($scope === 'global') $query->where('is_global', true);
            if ($scope === 'scoped') $query->where('is_global', false);
        }

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'data' => SponsorResource::collection($query->paginate(30)),
        ]);
    }

    public function store(StoreSponsorRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug']      = $data['slug'] ?? Str::slug($data['name']);
        $data['is_active'] = $data['is_active'] ?? true;
        // Admin-created sponsors are globally visible by default.
        $data['is_global']          = true;
        $data['created_by_user_id'] = $request->user()?->id;

        $sponsor = Sponsor::create($data);

        return response()->json([
            'data' => new SponsorResource($sponsor),
        ], Response::HTTP_CREATED);
    }

    public function show(Sponsor $sponsor): JsonResponse
    {
        return response()->json(['data' => new SponsorResource($sponsor)]);
    }

    public function update(StoreSponsorRequest $request, Sponsor $sponsor): JsonResponse
    {
        $sponsor->update($request->validated());
        return response()->json(['data' => new SponsorResource($sponsor->refresh())]);
    }

    public function destroy(Sponsor $sponsor): JsonResponse
    {
        // Soft-delete via is_active. Hard delete would cascade to sponsorships.
        $sponsor->update(['is_active' => false]);
        return response()->json(['message' => 'Sponsor deactivated.']);
    }

    /**
     * Sprint 10: promote a scoped (organizer-created) sponsor to global.
     * Idempotent — already-global sponsors return unchanged.
     */
    public function promote(Sponsor $sponsor): JsonResponse
    {
        if (! $sponsor->is_global) {
            $sponsor->update(['is_global' => true]);
        }
        return response()->json([
            'data'    => new SponsorResource($sponsor->refresh()),
            'message' => 'Sponsor promoted to global catalog.',
        ]);
    }

    /**
     * Sprint 10: demote a global sponsor back to scoped (requires a creator).
     */
    public function demote(Sponsor $sponsor): JsonResponse
    {
        if (! $sponsor->created_by_user_id) {
            return response()->json([
                'message' => 'Cannot demote — this sponsor has no creator on record.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $sponsor->update(['is_global' => false]);
        return response()->json([
            'data'    => new SponsorResource($sponsor->refresh()),
            'message' => 'Sponsor demoted to scoped visibility.',
        ]);
    }
}
