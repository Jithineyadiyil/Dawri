<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Message;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Collection;

interface MessageRepositoryInterface
{
    public function findById(string $id): ?Message;

    /**
     * Cursor-paginated feed of messages in a channel, newest first.
     * Cursor-based (not page-based) so infinite scroll never duplicates.
     *
     * @return CursorPaginator<Message>
     */
    public function feed(string $channelId, ?string $cursor = null, int $limit = 50): CursorPaginator;

    /** @return Collection<int, Message> */
    public function pinned(string $channelId): Collection;

    public function create(array $attributes): Message;

    public function update(Message $message, array $attributes): Message;

    public function softDelete(Message $message, string $deletedByUserId): bool;

    public function countSince(string $channelId, ?string $sinceMessageId): int;
}
