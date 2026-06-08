<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Channel;
use App\Models\Message;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Services\MessageService;
use App\Services\ReactionService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sprint 15 — message CRUD + reactions + pins.
 *
 * Rate-limited at the route level: post 30/min, react 60/min.
 */
final class MessageController extends Controller
{
    public function __construct(
        private readonly MessageService $messages,
        private readonly ReactionService $reactions,
        private readonly MessageRepositoryInterface $messageRepo,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * GET /api/v1/channels/{channel}/messages?cursor=...&limit=50
     * Cursor-paginated, newest first.
     */
    public function index(Request $request, Channel $channel): JsonResponse
    {
        if (! $this->members->isMember($channel->community_id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        $cursor = $request->query('cursor');
        $limit  = min((int) $request->query('limit', 50), 100);

        $page = $this->messageRepo->feed($channel->id, is_string($cursor) ? $cursor : null, $limit);

        return response()->json([
            'data'        => MessageResource::collection($page->items()),
            'next_cursor' => $page->nextCursor()?->encode(),
            'prev_cursor' => $page->previousCursor()?->encode(),
        ]);
    }

    /**
     * GET /api/v1/channels/{channel}/messages/pinned
     */
    public function pinned(Request $request, Channel $channel): JsonResponse
    {
        if (! $this->members->isMember($channel->community_id, $request->user()->id)) {
            return response()->json(['message' => 'Not a member.'], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'data' => MessageResource::collection($this->messageRepo->pinned($channel->id)),
        ]);
    }

    /**
     * POST /api/v1/channels/{channel}/messages
     */
    public function store(SendMessageRequest $request, Channel $channel): JsonResponse
    {
        try {
            $msg = $this->messages->post($channel, $request->user(), $request->string('content')->toString());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new MessageResource($msg)], Response::HTTP_CREATED);
    }

    /**
     * PATCH /api/v1/messages/{message}
     */
    public function update(UpdateMessageRequest $request, Message $message): JsonResponse
    {
        try {
            $msg = $this->messages->edit($message, $request->user(), $request->string('content')->toString());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new MessageResource($msg)]);
    }

    /**
     * DELETE /api/v1/messages/{message}
     */
    public function destroy(Request $request, Message $message): JsonResponse
    {
        try {
            $this->messages->delete($message, $request->user());
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'Deleted.']);
    }

    /**
     * POST /api/v1/messages/{message}/pin   — moderators only
     * DELETE /api/v1/messages/{message}/pin — moderators only
     */
    public function pin(Request $request, Message $message): JsonResponse
    {
        return $this->setPinned($request, $message, true);
    }

    public function unpin(Request $request, Message $message): JsonResponse
    {
        return $this->setPinned($request, $message, false);
    }

    /**
     * POST /api/v1/messages/{message}/reactions
     * Body: { emoji: "🔥" }
     */
    public function react(Request $request, Message $message): JsonResponse
    {
        $validated = $request->validate([
            'emoji' => ['required', 'string', 'min:1', 'max:16'],
        ]);

        try {
            $this->reactions->react($message, $request->user(), $validated['emoji']);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['message' => 'OK'], Response::HTTP_CREATED);
    }

    /**
     * DELETE /api/v1/messages/{message}/reactions/{emoji}
     */
    public function unreact(Request $request, Message $message, string $emoji): JsonResponse
    {
        $this->reactions->unreact($message, $request->user(), $emoji);
        return response()->json(['message' => 'OK']);
    }

    private function setPinned(Request $request, Message $message, bool $pinned): JsonResponse
    {
        try {
            $msg = $this->messages->setPinned($message, $request->user(), $pinned);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['data' => new MessageResource($msg)]);
    }
}
