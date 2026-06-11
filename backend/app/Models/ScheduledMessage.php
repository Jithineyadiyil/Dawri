<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Phase 7 — a message queued to post to a channel at a future time.
 *
 * Single UUID primary key, so HasUuids is safe (unlike composite-PK models).
 *
 * @property string       $id
 * @property string       $channel_id
 * @property string       $user_id
 * @property string       $content
 * @property \Carbon\Carbon      $scheduled_for
 * @property \Carbon\Carbon|null $posted_at
 * @property string|null         $posted_message_id
 * @property \Carbon\Carbon|null $cancelled_at
 * @property string|null         $error
 */
final class ScheduledMessage extends Model
{
    use HasUuids;

    protected $fillable = [
        'channel_id',
        'user_id',
        'content',
        'scheduled_for',
        'posted_at',
        'posted_message_id',
        'cancelled_at',
        'error',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'scheduled_for' => 'datetime',
        'posted_at'     => 'datetime',
        'cancelled_at'  => 'datetime',
    ];

    /** @return BelongsTo<Channel, ScheduledMessage> */
    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }

    /** @return BelongsTo<User, ScheduledMessage> */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /** True once published. */
    public function isPosted(): bool
    {
        return $this->posted_at !== null;
    }

    /** True if cancelled before it published. */
    public function isCancelled(): bool
    {
        return $this->cancelled_at !== null;
    }

    /** Still waiting to be published. */
    public function isPending(): bool
    {
        return $this->posted_at === null && $this->cancelled_at === null;
    }
}
