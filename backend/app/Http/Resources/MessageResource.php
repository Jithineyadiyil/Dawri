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
                'nickname'  => $this->author?->nickname,
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
            'created_at' => $this->created_at->toIso8601String(),
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
