<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlatformSponsorship;
use App\Models\Sponsor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * AdminPlatformSponsorController — admin-only CRUD on platform sponsorships.
 *
 * Routes mounted under /admin/platform-sponsorships and protected by the
 * admin middleware (auth:sanctum + admin role).
 *
 * Internal fields (contract_value_sar, internal_notes) are exposed here
 * but never on public endpoints.
 */
class AdminPlatformSponsorController extends Controller
{
    /**
     * GET /admin/platform-sponsorships
     */
    public function index(): JsonResponse
    {
        $rows = PlatformSponsorship::with('sponsor:id,name,name_ar,slug,logo_url,website_url,is_active')
            ->orderByRaw("FIELD(tier, 'title', 'standard')")
            ->orderBy('display_order')
            ->orderBy('created_at')
            ->get()
            ->map(fn ($s) => [
                'id'                 => $s->id,
                'sponsor_id'         => $s->sponsor_id,
                'sponsor_name'       => $s->sponsor?->name,
                'sponsor_logo'       => $s->sponsor?->logo_url,
                'sponsor_active'     => (bool) ($s->sponsor?->is_active ?? false),
                'tier'               => $s->tier,
                'display_order'      => $s->display_order,
                'starts_at'          => $s->starts_at?->toIso8601String(),
                'ends_at'            => $s->ends_at?->toIso8601String(),
                'is_active'          => $s->is_active,
                'is_currently_live'  => $this->isLive($s),
                'contract_value_sar' => $s->contract_value_sar,
                'internal_notes'     => $s->internal_notes,
                'created_at'         => $s->created_at?->toIso8601String(),
            ]);

        // Surface the catalog of available sponsors so the admin UI can
        // show a dropdown without a second request.
        $catalog = Sponsor::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'name_ar', 'slug', 'logo_url'])
            ->all();

        return response()->json([
            'data'    => $rows,
            'catalog' => $catalog,
        ]);
    }

    /**
     * POST /admin/platform-sponsorships
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'sponsor_id'         => ['required', 'uuid', 'exists:sponsors,id'],
            'tier'               => ['required', Rule::in(['title', 'standard'])],
            'display_order'      => ['nullable', 'integer', 'min:0'],
            'starts_at'          => ['nullable', 'date'],
            'ends_at'            => ['nullable', 'date', 'after_or_equal:starts_at'],
            'is_active'          => ['boolean'],
            'contract_value_sar' => ['nullable', 'numeric', 'min:0'],
            'internal_notes'     => ['nullable', 'string', 'max:2000'],
        ]);

        // Title tier is exclusive — only one allowed at a time. If the
        // admin creates a new title sponsor, demote any existing title to
        // standard rather than rejecting the request (less friction).
        if (($validated['tier'] ?? 'standard') === 'title') {
            PlatformSponsorship::where('tier', 'title')
                ->update(['tier' => 'standard']);
        }

        $row = PlatformSponsorship::create(array_merge(
            ['display_order' => 0, 'is_active' => true],
            $validated,
        ));

        return response()->json(['data' => $row->fresh('sponsor')], 201);
    }

    /**
     * PUT /admin/platform-sponsorships/{platformSponsorship}
     */
    public function update(Request $request, PlatformSponsorship $platformSponsorship): JsonResponse
    {
        $validated = $request->validate([
            'tier'               => ['sometimes', Rule::in(['title', 'standard'])],
            'display_order'      => ['sometimes', 'nullable', 'integer', 'min:0'],
            'starts_at'          => ['sometimes', 'nullable', 'date'],
            'ends_at'            => ['sometimes', 'nullable', 'date', 'after_or_equal:starts_at'],
            'is_active'          => ['sometimes', 'boolean'],
            'contract_value_sar' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'internal_notes'     => ['sometimes', 'nullable', 'string', 'max:2000'],
        ]);

        // Title-exclusivity guard: if upgrading to title, demote others
        if (($validated['tier'] ?? null) === 'title' && $platformSponsorship->tier !== 'title') {
            PlatformSponsorship::where('tier', 'title')
                ->where('id', '!=', $platformSponsorship->id)
                ->update(['tier' => 'standard']);
        }

        $platformSponsorship->update($validated);

        return response()->json(['data' => $platformSponsorship->fresh('sponsor')]);
    }

    /**
     * DELETE /admin/platform-sponsorships/{platformSponsorship}
     */
    public function destroy(PlatformSponsorship $platformSponsorship): JsonResponse
    {
        $platformSponsorship->delete();
        return response()->json(['message' => 'Platform sponsorship removed.']);
    }

    /**
     * POST /admin/platform-sponsorships/{platformSponsorship}/toggle
     *
     * Quick activate/deactivate without sending a full payload. Useful
     * for "pause this sponsor temporarily" without losing the contract
     * data.
     */
    public function toggle(PlatformSponsorship $platformSponsorship): JsonResponse
    {
        $platformSponsorship->update(['is_active' => ! $platformSponsorship->is_active]);
        return response()->json(['data' => $platformSponsorship->fresh('sponsor')]);
    }

    /**
     * Whether a sponsorship is currently visible to the public — i.e.
     * passes both the master kill switch AND the start/end window check.
     */
    private function isLive(PlatformSponsorship $s): bool
    {
        if (! $s->is_active) return false;
        if ($s->starts_at && $s->starts_at->gt(now())) return false;
        if ($s->ends_at   && $s->ends_at->lt(now()))   return false;
        return true;
    }
}
