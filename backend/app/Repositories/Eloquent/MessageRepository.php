<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Cursor;

final class MessageRepository implements MessageRepositoryInterface
{
    public function __construct(private readonly Message $model)
    {
    }

    public function findById(string $id): ?Message
    {
        return $this->model->find($id);
    }

    public function feed(string $channelId, ?string $cursor = null, int $limit = 50): CursorPaginator
    {
        $cursorObj = $cursor ? Cursor::fromEncoded($cursor) : null;

        return $this->model->visible()
            ->where('channel_id', $channelId)
            ->with([
                'author:id,nickname,avatar,role',
                'reactions:id,message_id,user_id,emoji',
                'mentions:id,message_id,mentioned_user_id',
            ])
            ->orderByDesc('created_at')
            ->orderByDesc('id') // tie-breaker for stable cursor
            ->cursorPaginate($limit, ['*'], 'cursor', $cursorObj);
    }

    public function pinned(string $channelId): Collection
    {
        return $this->model->visible()
            ->where('channel_id', $channelId)
            ->where('is_pinned', true)
            ->with('author:id,nickname,avatar')
            ->orderByDesc('pinned_at')
            ->get();
    }

    public function create(array $attributes): Message
    {
        return $this->model->create($attributes);
    }

    public function update(Message $message, array $attributes): Message
    {
        $message->fill($attributes)->save();
        return $message->fresh(['author', 'reactions', 'mentions']);
    }

    public function softDelete(Message $message, string $deletedByUserId): bool
    {
        $message->deleted_by = $deletedByUserId;
        $message->save();
        return (bool) $message->delete();
    }

    public function countSince(string $channelId, ?string $sinceMessageId): int
    {
        $query = $this->model->visible()->where('channel_id', $channelId);

        if ($sinceMessageId !== null) {
            $since = $this->model->find($sinceMessageId);
            if ($since !== null) {
                $query->where('created_at', '>', $since->created_at);
            }
        }

        return $query->count();
    }
}
