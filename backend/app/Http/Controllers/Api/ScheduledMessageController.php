<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\ScheduledMessage;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 7 — scheduled posts (moderator+). Create, list, and cancel messages
 * queued to publish to a channel at a future time. Publishing itself is done by
 * the community:publish-scheduled command.
 */
final class ScheduledMessageController extends Controller
{
    public function __construct(
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /** GET /api/v1/channels/{channel}/scheduled  — pending scheduled posts. */
    public function index(Request $request, Channel $channel): JsonResponse
    {
        if (! $this->canManage($channel, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $rows = ScheduledMessage::query()
            ->where('channel_id', $channel->id)
            ->whereNull('posted_at')
            ->whereNull('cancelled_at')
            ->orderBy('scheduled_for')
            ->get()
            ->map(fn (ScheduledMessage $m) => $this->shape($m))
            ->all();

        return response()->json(['data' => $rows]);
    }

    /**
     * POST /api/v1/channels/{channel}/scheduled
     * Body: { content, scheduled_for (ISO 8601, future) }
     */
    public function store(Request $request, Channel $channel): JsonResponse
    {
        if (! $this->canManage($channel, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $validated = $request->validate([
            'content'       => ['required', 'string', 'min:1', 'max:4000'],
            'scheduled_for' => ['required', 'date', 'after:now'],
        ]);

        $scheduled = ScheduledMessage::create([
            'channel_id'    => $channel->id,
            'user_id'       => $request->user()->id,
            'content'       => trim($validated['content']),
            'scheduled_for' => Carbon::parse($validated['scheduled_for']),
        ]);

        return response()->json(['data' => $this->shape($scheduled)], Response::HTTP_CREATED);
    }

    /** DELETE /api/v1/scheduled/{scheduled}  — cancel a pending scheduled post. */
    public function destroy(Request $request, ScheduledMessage $scheduled): JsonResponse
    {
        $channel = Channel::find($scheduled->channel_id);
        if ($channel === null || ! $this->canManage($channel, $request->user())) {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        if (! $scheduled->isPending()) {
            return response()->json(['message' => 'Already posted or cancelled.'], Response::HTTP_CONFLICT);
        }

        $scheduled->update(['cancelled_at' => now()]);

        return response()->json(['message' => 'Cancelled.']);
    }

    /** @return array<string, mixed> */
    private function shape(ScheduledMessage $m): array
    {
        return [
            'id'            => $m->id,
            'channel_id'    => $m->channel_id,
            'content'       => $m->content,
            'scheduled_for' => $m->scheduled_for->toIso8601String(),
            'created_at'    => $m->created_at?->toIso8601String(),
        ];
    }

    private function canManage(Channel $channel, $user): bool
    {
        if ($user->role === 'admin') {
            return true;
        }
        $member = $this->members->find($channel->community_id, $user->id);

        return $member !== null && $member->canModerate();
    }
}
