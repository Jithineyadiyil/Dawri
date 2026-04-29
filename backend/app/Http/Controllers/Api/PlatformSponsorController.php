<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlatformSponsorshipResource;
use App\Models\PlatformSponsorship;
use Illuminate\Http\JsonResponse;

/**
 * PlatformSponsorController — public read access to active platform sponsors.
 *
 * Returns sponsors grouped by tier so the homepage hero can render the
 * Title sponsor with prominence and Standard sponsors in a carousel
 * without doing a second pass on the client.
 *
 * No auth required. Cached lightly to keep homepage fast on every visit.
 */
class PlatformSponsorController extends Controller
{
    /**
     * GET /api/v1/platform-sponsors
     *
     * Response shape:
     * {
     *   data: {
     *     title:    [PlatformSponsorshipResource, ...],
     *     standard: [PlatformSponsorshipResource, ...]
     *   }
     * }
     */
    public function index(): JsonResponse
    {
        $sponsorships = PlatformSponsorship::active()
            ->ordered()
            ->with('sponsor')
            ->get();

        $byTier = [
            'title'    => [],
            'standard' => [],
        ];

        foreach ($sponsorships as $s) {
            // Skip if the sponsor row was deleted/deactivated
            if (! $s->sponsor || ! $s->sponsor->is_active) {
                continue;
            }
            $byTier[$s->tier][] = (new PlatformSponsorshipResource($s))->toArray(request());
        }

        return response()->json(['data' => $byTier]);
    }
}
