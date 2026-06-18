<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\UserXp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class AchievementController extends Controller
{
    /** GET /api/v1/achievements — catalog (public, secret ones omitted unless owned) */
    public function index(Request $request): JsonResponse
    {
        $query = Achievement::orderBy('sort_order');
        if (! $request->user()) {
            $query->where('is_secret', false);
        }
        return response()->json(['data' => $query->get()]);
    }

    /** GET /api/v1/users/{user}/achievements */
    public function forUser(User $user): JsonResponse
    {
        $rows = UserAchievement::with('achievement')
            ->where('user_id', $user->id)
            ->orderByDesc('unlocked_at')
            ->get();

        $xp = UserXp::firstOrCreate(['user_id' => $user->id], ['total_xp' => 0, 'level' => 1]);

        return response()->json([
            'data' => [
                'unlocked' => $rows->whereNotNull('unlocked_at')->values()->map(fn ($r) => $this->serializeRow($r)),
                'in_progress' => $rows->whereNull('unlocked_at')->values()->map(fn ($r) => $this->serializeRow($r)),
                'xp' => [
                    'total'      => $xp->total_xp,
                    'level'      => $xp->level,
                    'next_at'    => $xp->xpForNextLevel(),
                    'current_at' => $xp->xpForCurrentLevel(),
                ],
            ],
        ]);
    }

    /** GET /api/v1/me/achievements */
    public function mine(Request $request): JsonResponse
    {
        return $this->forUser($request->user());
    }

    private function serializeRow(UserAchievement $r): array
    {
        $a = $r->achievement;
        return [
            'key'         => $a->key,
            'name'        => $a->name,
            'name_ar'     => $a->name_ar,
            'description' => $a->description,
            'icon'        => $a->icon,
            'tier'        => $a->tier,
            'category'    => $a->category,
            'xp_reward'   => $a->xp_reward,
            'progress'    => $r->progress,
            'threshold'   => $r->threshold,
            'unlocked_at' => $r->unlocked_at?->toIso8601String(),
        ];
    }
}
