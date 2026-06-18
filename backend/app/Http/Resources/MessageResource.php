<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Message
 */
final class MessageResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $authorId = $request->user()?->id;

        return [
            'id'         => $this->id,
            'channel_id' => $this->channel_id,
            'author'     => [
                'id'        => $this->author?->id,
                'nickname'  => $this->author?->display_name,
                'avatar'    => $this->author?->avatar_url ?? $this->author?->avatar,
                'is_self'   => $authorId !== null && $authorId === $this->user_id,
            ],
            'content'    => $this->deleted_at !== null ? null : $this->content,
            'edited_at'  => $this->edited_at?->toIso8601String(),
            'is_deleted' => $this->deleted_at !== null,
            'is_pinned'  => $this->is_pinned,
            'pinned_at'  => $this->pinned_at?->toIso8601String(),
            'reactions'  => $this->groupReactions(),
            'mentions'   => $this->mentions->pluck('mentioned_user_id')->all(),
            'reply_to'   => $this->replyPreview(),
            'poll'       => $this->relationLoaded('poll') && $this->poll !== null
                ? (new \App\Http\Resources\PollResource($this->poll))->toArray($request)
                : null,
            'event'      => $this->relationLoaded('event') && $this->event !== null
                ? (new \App\Http\Resources\EventResource($this->event))->toArray($request)
                : null,
            'attachments' => $this->relationLoaded('attachments')
                ? $this->attachments->map(fn ($a) => [
                    'id'          => $a->id,
                    'url'         => $a->url,
                    'mime'        => $a->mime,
                    'width'       => $a->width,
                    'height'      => $a->height,
                    'duration_ms' => $a->duration_ms,
                ])->values()->all()
                : [],
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }

    /**
     * Compact preview of the parent message, for "replying to …" UI.
     * Returns null when this message is not a reply.
     *
     * @return array{id:string,author:?string,snippet:?string}|null
     */
    private function replyPreview(): ?array
    {
        if ($this->parent_id === null || ! $this->relationLoaded('parent') || $this->parent === null) {
            return null;
        }

        $parent  = $this->parent;
        $deleted = $parent->deleted_at !== null;
        $content = $deleted ? null : (string) $parent->content;
        $snippet = $content === null ? null : (mb_strlen($content) > 80 ? mb_substr($content, 0, 80) . '…' : $content);

        return [
            'id'      => $parent->id,
            'author'  => $parent->author?->display_name,
            'snippet' => $deleted ? 'message removed' : $snippet,
        ];
    }

    /**
     * Roll up reactions into `[{emoji, count, users:[uuid,...]}]` shape.
     *
     * @return array<int, array{emoji:string,count:int,users:array<int,string>}>
     */
    private function groupReactions(): array
    {
        if (! $this->relationLoaded('reactions') || $this->reactions->isEmpty()) {
            return [];
        }

        return $this->reactions
            ->groupBy('emoji')
            ->map(fn ($group, $emoji) => [
                'emoji' => (string) $emoji,
                'count' => $group->count(),
                'users' => $group->pluck('user_id')->all(),
            ])
            ->values()
            ->all();
    }
}
