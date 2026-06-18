<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Channel;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * AttachmentService — handles image uploads attached to community messages.
 *
 * Mirrors AvatarService: stores on the 'public' disk, validates size and
 * extension, and lays files out under a per-channel folder:
 *   storage/app/public/attachments/{channel_id}/{uuid}.{ext}
 *
 * Uploading creates a single carrier message that holds the images, so the
 * images appear inline in the chronological feed (same approach as inline
 * polls). The carrier message is broadcast so other clients see it live.
 */
final class AttachmentService
{
    public const MAX_MB        = 8;
    public const MAX_PER_MSG   = 10;
    public const ALLOWED       = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    public function __construct(
        private readonly MessageRepositoryInterface $messages,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * Upload one or more images as a single message in a channel.
     *
     * @param array<int, UploadedFile> $files
     *
     * @throws AuthorizationException|RuntimeException
     */
    public function uploadToChannel(
        Channel $channel,
        User $author,
        array $files,
        ?string $caption = null,
    ): Message {
        $this->assertCanPost($channel, $author);

        $files = array_values(array_filter($files));
        if (count($files) === 0) {
            throw new RuntimeException('No image provided.');
        }
        if (count($files) > self::MAX_PER_MSG) {
            throw new RuntimeException('You can attach up to ' . self::MAX_PER_MSG . ' images.');
        }

        // Validate every file before writing anything.
        foreach ($files as $file) {
            $this->assertValidImage($file);
        }

        return DB::transaction(function () use ($channel, $author, $files, $caption) {
            $message = Message::create([
                'channel_id' => $channel->id,
                'user_id'    => $author->id,
                'content'    => $caption !== null ? trim($caption) : '',
            ]);

            foreach ($files as $i => $file) {
                $this->storeOne($message, $channel, $file, $i);
            }

            // Broadcast after commit so other clients see the images live,
            // exactly like a normal message.
            DB::afterCommit(function () use ($message): void {
                $fresh = $this->messages->findById($message->id);
                if ($fresh !== null) {
                    $fresh->load(['author', 'reactions', 'mentions', 'parent.author', 'attachments']);
                    broadcast(new \App\Events\MessagePosted($fresh))->toOthers();
                }
            });

            return $message->fresh(['author', 'attachments']);
        });
    }

    public const VOICE_MAX_MB = 10;
    public const VOICE_ALLOWED = ['webm', 'ogg', 'mp3', 'mpeg', 'm4a', 'mp4', 'wav'];

    /**
     * Upload a single voice note as a carrier message in a channel.
     *
     * @throws AuthorizationException|RuntimeException
     */
    public function uploadVoiceToChannel(
        Channel $channel,
        User $author,
        ?UploadedFile $file,
        int $durationMs,
    ): Message {
        $this->assertCanPost($channel, $author);

        if ($file === null) {
            throw new RuntimeException('No audio provided.');
        }
        if ($file->getSize() > self::VOICE_MAX_MB * 1024 * 1024) {
            throw new RuntimeException('Voice note must be under ' . self::VOICE_MAX_MB . 'MB.');
        }
        $ext = strtolower($file->getClientOriginalExtension() ?: ($file->extension() ?: 'webm'));
        if (! in_array($ext, self::VOICE_ALLOWED, true)) {
            throw new RuntimeException('Unsupported audio format.');
        }

        return DB::transaction(function () use ($channel, $author, $file, $ext, $durationMs) {
            $message = Message::create([
                'channel_id' => $channel->id,
                'user_id'    => $author->id,
                'content'    => '',
            ]);

            $filename = Str::uuid()->toString() . '.' . $ext;
            $path     = $file->storeAs("voice/{$channel->id}", $filename, 'public');

            MessageAttachment::create([
                'message_id'  => $message->id,
                'path'        => $path,
                'mime'        => $file->getClientMimeType() ?: 'audio/webm',
                'size'        => $file->getSize() ?: 0,
                'duration_ms' => max(0, $durationMs),
                'position'    => 0,
            ]);

            DB::afterCommit(function () use ($message): void {
                $fresh = $this->messages->findById($message->id);
                if ($fresh !== null) {
                    $fresh->load(['author', 'reactions', 'mentions', 'parent.author', 'attachments']);
                    broadcast(new \App\Events\MessagePosted($fresh))->toOthers();
                }
            });

            return $message->fresh(['author', 'attachments']);
        });
    }

    /** Store a single image file and create its attachment row. */
    private function storeOne(Message $message, Channel $channel, UploadedFile $file, int $position): void
    {
        $ext      = strtolower($file->getClientOriginalExtension() ?: $file->extension());
        $filename = Str::uuid()->toString() . '.' . $ext;
        $path     = $file->storeAs("attachments/{$channel->id}", $filename, 'public');

        [$width, $height] = $this->dimensions($file);

        MessageAttachment::create([
            'message_id' => $message->id,
            'path'       => $path,
            'mime'       => $file->getClientMimeType() ?: ('image/' . $ext),
            'size'       => $file->getSize() ?: 0,
            'width'      => $width,
            'height'     => $height,
            'position'   => $position,
        ]);
    }

    /** @return array{0:?int,1:?int} [width, height] or [null, null] if unreadable. */
    private function dimensions(UploadedFile $file): array
    {
        try {
            $info = @getimagesize($file->getRealPath());
            if (is_array($info)) {
                return [(int) $info[0], (int) $info[1]];
            }
        } catch (\Throwable) {
            // ignore — dimensions are best-effort
        }

        return [null, null];
    }

    /** @throws RuntimeException */
    private function assertValidImage(UploadedFile $file): void
    {
        if ($file->getSize() > self::MAX_MB * 1024 * 1024) {
            throw new RuntimeException('Each image must be under ' . self::MAX_MB . 'MB.');
        }

        $ext = strtolower($file->getClientOriginalExtension() ?: $file->extension());
        if (! in_array($ext, self::ALLOWED, true)) {
            throw new RuntimeException('Images must be JPG, PNG, WEBP, or GIF.');
        }

        // Defence in depth: confirm the bytes are actually an image.
        $info = @getimagesize($file->getRealPath());
        if ($info === false) {
            throw new RuntimeException('That file does not appear to be a valid image.');
        }
    }

    /**
     * Posting permission mirrors MessageService: must be a non-banned,
     * non-muted member of the channel's community.
     *
     * @throws AuthorizationException
     */
    private function assertCanPost(Channel $channel, User $user): void
    {
        $member = $this->members->find($channel->community_id, $user->id);

        if ($member === null) {
            throw new AuthorizationException('You are not a member of this community.');
        }
        if ($member->isBanned()) {
            throw new AuthorizationException('You are banned from this community.');
        }
        if ($member->isMuted()) {
            throw new AuthorizationException('You are muted in this community.');
        }
    }
}
