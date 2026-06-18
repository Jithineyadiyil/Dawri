<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAttachmentRequest;
use App\Http\Resources\MessageResource;
use App\Models\Channel;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Services\AttachmentService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 3 — image attachments. Uploading creates one message carrying the
 * images, returned (and broadcast) like a normal message so it renders inline.
 */
final class AttachmentController extends Controller
{
    public function __construct(
        private readonly AttachmentService $attachments,
        private readonly MessageRepositoryInterface $messages,
    ) {
    }

    /** POST /channels/{channel}/attachments  (multipart: images[], caption?) */
    public function store(UploadAttachmentRequest $request, Channel $channel): JsonResponse
    {
        try {
            $message = $this->attachments->uploadToChannel(
                $channel,
                $request->user(),
                $request->file('images', []),
                $request->input('caption'),
            );
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $full = $this->messages->findById($message->id);
        $full?->load(['author', 'reactions', 'mentions', 'parent.author', 'attachments']);

        return response()->json(
            ['data' => new MessageResource($full ?? $message)],
            Response::HTTP_CREATED,
        );
    }

    /** POST /channels/{channel}/voice  (multipart: audio, duration_ms) */
    public function storeVoice(Request $request, Channel $channel): JsonResponse
    {
        $request->validate([
            'audio'       => ['required', 'file', 'mimetypes:audio/webm,audio/ogg,audio/mpeg,audio/mp4,audio/wav,audio/x-m4a', 'max:10240'],
            'duration_ms' => ['nullable', 'integer', 'min:0', 'max:600000'],
        ]);

        try {
            $message = $this->attachments->uploadVoiceToChannel(
                $channel,
                $request->user(),
                $request->file('audio'),
                (int) $request->input('duration_ms', 0),
            );
        } catch (AuthorizationException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_FORBIDDEN);
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $full = $this->messages->findById($message->id);
        $full?->load(['author', 'reactions', 'mentions', 'parent.author', 'attachments']);

        return response()->json(
            ['data' => new MessageResource($full ?? $message)],
            Response::HTTP_CREATED,
        );
    }
}
