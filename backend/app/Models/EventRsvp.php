<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Phase 4 — a member's RSVP to a community event.
 *
 * @property string $id
 * @property string $event_id
 * @property string $user_id
 * @property string $status  going | maybe | declined
 */
final class EventRsvp extends Model
{
    use HasUuids;

    public const GOING    = 'going';
    public const MAYBE    = 'maybe';
    public const DECLINED = 'declined';

    public const STATUSES = [self::GOING, self::MAYBE, self::DECLINED];

    protected $fillable = [
        'event_id',
        'user_id',
        'status',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(CommunityEvent::class, 'event_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
