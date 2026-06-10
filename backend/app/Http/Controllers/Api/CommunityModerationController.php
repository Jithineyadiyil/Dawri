<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ModerateUserRequest;
use App\Http\Resources\CommunityMemberResource;
use App\Models\Community;
use App\Models\User;
use App\Services\ModerationService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sprint 15 — moderation actions on community members.
 *
 * Single endpoint with action dispatch keeps the moderation UI simple
 * (one button posts {action: ban, user_id, reason} vs four separate routes).
 */
final class CommunityModerationController extends Controller
{
    public function __construct(
        private readonly ModerationService $moderation,
    ) {
    }

    /**
     * POST /api/v1/communities/{community}/moderate
     * Body: { action: 'mute'|'unmute'|'ban'|'unban', user_id: uuid, minutes?: int, reason?: string }
     */
    public function __invoke(ModerateUserRequest $request, Community $community): JsonResponse
    {
        $target = User::findOrFail($request->input('user_id'));
        $actor  = $request->user();

        try {
            // Kick removes the membership row entirely — no member to return.
            if ($request->input('action') === 'kick') {
                $this->moderation->kick($community, $actor, $target);

                return response()->json(['message' => 'Member removed.']);
            }

            $member = match ($request->input('action')) {
                'mute'     => $this->moderation->mute($community, $actor, $target, (int) $request->input('minutes', 60), $request->input('reason')),
                'unmute'   => $this->moderation->unmute($community, $actor, $target),
                'ban'      => $this->moderation->ban($community, $actor, $target, (string) $request->input('reason')),
                'unban'    => $this->moderation->unban($community, $actor, $target),
                'set_role' => $this->moderation->setRole($community, $actor, $target, (string) $request->input('role')),
            };
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new CommunityMemberResource($member)]);
    }
}
