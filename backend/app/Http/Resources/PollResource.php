<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Poll
 *
 * Shapes a poll with per-option vote counts, the total, and which options the
 * current viewer has voted for (so the UI can highlight their selection).
 */
final class PollResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $userId = $request->user()?->id;

        // Option ids the current user has voted for.
        $myVotes = [];
        if ($userId !== null && $this->relationLoaded('votes')) {
            $myVotes = $this->votes
                ->where('user_id', $userId)
                ->pluck('option_id')
                ->all();
        }

        $options = $this->relationLoaded('options')
            ? $this->options->map(fn ($opt) => [
                'id'    => $opt->id,
                'label' => $opt->label,
                'votes' => (int) ($opt->votes_count ?? $opt->votes()->count()),
                'voted' => in_array($opt->id, $myVotes, true),
            ])->values()->all()
            : [];

        $total = array_sum(array_column($options, 'votes'));

        return [
            'id'          => $this->id,
            'channel_id'  => $this->channel_id,
            'question'    => $this->question,
            'is_multiple' => $this->is_multiple,
            'is_open'     => $this->isOpen(),
            'closes_at'   => $this->closes_at?->toIso8601String(),
            'author'      => [
                'id'       => $this->author?->id,
                'nickname' => $this->author?->display_name,
            ],
            'options'      => $options,
            'total_votes'  => $total,
            'created_at'   => $this->created_at->toIso8601String(),
        ];
    }
}
