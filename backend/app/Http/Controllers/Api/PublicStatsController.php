<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PublicStatsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

/**
 * PublicStatsController — read-only public stats for marketing surfaces.
 *
 * GET /api/v1/stats/public
 *
 * Response shape:
 * {
 *   data: {
 *     tournaments_completed: int,
 *     tournaments_active: int,
 *     registered_players: int,
 *     total_prize_distributed_sar: int,
 *     active_partners: int,
 *     generated_at: ISO8601 string
 *   }
 * }
 *
 * No auth. Cached server-side for 5 minutes — stats don't need to be
 * second-fresh and the prize_pool aggregation walks JSON across many rows.
 */
class PublicStatsController extends Controller
{
    public function __construct(
        private readonly PublicStatsService $stats,
    ) {}

    public function index(): JsonResponse
    {
        $data = Cache::remember(
            'public_stats_v1',
            now()->addMinutes(5),
            fn () => $this->stats->collect(),
        );

        return response()->json(['data' => $data]);
    }
}
