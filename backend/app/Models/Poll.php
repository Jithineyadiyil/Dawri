<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Phase 2 — a poll posted into a community channel.
 *
 * @property string      $id
 * @property string      $channel_id
 * @property string      $user_id
 * @property string      $question
 * @property bool        $is_multiple
 * @property bool        $is_closed
 * @property \Illuminate\Support\Carbon|null $closes_at
 */
final class Poll extends Model
{
    use HasUuids;

    protected $fillable = [
        'channel_id',
        'user_id',
        'question',
        'is_multiple',
        'is_closed',
        'closes_at',
    ];

    protected $casts = [
        'is_multiple' => 'boolean',
        'is_closed'   => 'boolean',
        'closes_at'   => 'datetime',
    ];

    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /** @return HasMany<PollOption> */
    public function options(): HasMany
    {
        return $this->hasMany(PollOption::class)->orderBy('position');
    }

    /** @return HasMany<PollVote> */
    public function votes(): HasMany
    {
        return $this->hasMany(PollVote::class);
    }

    /** Whether voting is currently allowed (not closed, deadline not passed). */
    public function isOpen(): bool
    {
        if ($this->is_closed) {
            return false;
        }

        return $this->closes_at === null || $this->closes_at->isFuture();
    }
}
