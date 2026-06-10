<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Phase 2 — a single selectable option within a poll.
 *
 * @property string $id
 * @property string $poll_id
 * @property string $label
 * @property int    $position
 */
final class PollOption extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'poll_id',
        'label',
        'position',
    ];

    protected $casts = [
        'position' => 'integer',
    ];

    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    /** @return HasMany<PollVote> */
    public function votes(): HasMany
    {
        return $this->hasMany(PollVote::class, 'option_id');
    }
}
