<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChannelRequest;
use App\Http\Requests\UpdateChannelRequest;
use App\Http\Resources\ChannelResource;
use App\Models\Channel;
use App\Models\Community;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Services\ChannelService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sprint 15 — channel CRUD + read tracking.
 */
final class ChannelController extends Controller
{
    public function __construct(
        private readonly ChannelService $channels,
        private readonly ChannelRepositoryInterface $channelRepo,
        private readonly MessageRepositoryInterface $messages,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * GET /api/v1/communities/{community}/channels
     * Returns channels with `unread_count` for the current user.
     */
    public function index(Request $request, Community $community): JsonResponse
    {
        $userId = $request->user()->id;

        if (! $this->members->isMember($community->id, $userId)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        $channels = $this->channelRepo->listForCommunity($community->id);

        // Attach unread counts in one query rather than N
        $lastReads = \DB::table('channel_reads')
            ->where('user_id', $userId)
            ->whereIn('channel_id', $channels->pluck('id'))
            ->pluck('last_read_at', 'channel_id');

        foreach ($channels as $channel) {
            $lastReadAt = $lastReads[$channel->id] ?? null;
            $channel->unread_count = $lastReadAt === null
                ? $this->messages->countSince($channel->id, null)
                : \DB::table('messages')
                    ->where('channel_id', $channel->id)
                    ->whereNull('deleted_at')
                    ->where('created_at', '>', $lastReadAt)
                    ->count();
        }

        return response()->json(['data' => ChannelResource::collection($channels)]);
    }

    /**
     * POST /api/v1/communities/{community}/channels
     */
    public function store(StoreChannelRequest $request, Community $community): JsonResponse
    {
        try {
            $channel = $this->channels->create($community, $request->user(), $request->validated());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new ChannelResource($channel)], Response::HTTP_CREATED);
    }

    /**
     * PATCH /api/v1/channels/{channel}
     */
    public function update(UpdateChannelRequest $request, Channel $channel): JsonResponse
    {
        try {
            $updated = $this->channels->update($channel, $request->user(), $request->validated());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new ChannelResource($updated)]);
    }

    /**
     * DELETE /api/v1/channels/{channel}  — archive (soft) rather than hard delete
     */
    public function destroy(Request $request, Channel $channel): JsonResponse
    {
        try {
            $this->channels->archive($channel, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Channel archived.']);
    }

    /**
     * POST /api/v1/channels/{channel}/mark-read
     * Body: { last_message_id?: uuid }
     */
    public function markRead(Request $request, Channel $channel): JsonResponse
    {
        $userId = $request->user()->id;

        if (! $this->members->isMember($channel->community_id, $userId)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        $lastMessageId = $request->input('last_message_id');

        \DB::table('channel_reads')->upsert([
            [
                'user_id'              => $userId,
                'channel_id'           => $channel->id,
                'last_read_message_id' => $lastMessageId,
                'last_read_at'         => now(),
            ],
        ], ['user_id', 'channel_id'], ['last_read_message_id', 'last_read_at']);

        return response()->json(['message' => 'OK']);
    }
}
