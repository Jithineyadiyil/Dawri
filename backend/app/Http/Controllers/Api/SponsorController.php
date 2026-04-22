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
 * Admin-only CRUD for sponsors.
 *
 * Routes (mounted under /api/v1/admin):
 *   GET    /sponsors
 *   POST   /sponsors
 *   GET    /sponsors/{sponsor}
 *   PATCH  /sponsors/{sponsor}
 *   DELETE /sponsors/{sponsor}
 */
class SponsorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Sponsor::query()->orderBy('name');

        if ($request->boolean('active_only')) {
            $query->active();
        }

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name',    'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('slug',    'like', "%{$search}%");
            });
        }

        return response()->json([
            'data' => SponsorResource::collection($query->paginate(30)),
        ]);
    }

    public function store(StoreSponsorRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['is_active'] = $data['is_active'] ?? true;

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
        // Soft-delete via is_active; hard delete cascades to sponsorships
        // which we don't want once contracts exist.
        $sponsor->update(['is_active' => false]);
        return response()->json(['message' => 'Sponsor deactivated.']);
    }
}
