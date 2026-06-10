<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Phase 4 — a community event.
 *
 * @property string      $id
 * @property string      $community_id
 * @property string      $user_id
 * @property string      $title
 * @property string|null $description
 * @property string|null $location
 * @property \Illuminate\Support\Carbon      $starts_at
 * @property \Illuminate\Support\Carbon|null $ends_at
 * @property bool        $is_cancelled
 */
final class CommunityEvent extends Model
{
    use HasUuids;

    protected $fillable = [
        'community_id',
        'user_id',
        'title',
        'description',
        'location',
        'starts_at',
        'ends_at',
        'is_cancelled',
    ];

    protected $casts = [
        'starts_at'    => 'datetime',
        'ends_at'      => 'datetime',
        'is_cancelled' => 'boolean',
    ];

    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /** @return HasMany<EventRsvp> */
    public function rsvps(): HasMany
    {
        return $this->hasMany(EventRsvp::class, 'event_id');
    }

    /** Whether the event's start time is still in the future. */
    public function isUpcoming(): bool
    {
        return ! $this->is_cancelled && $this->starts_at->isFuture();
    }
}
