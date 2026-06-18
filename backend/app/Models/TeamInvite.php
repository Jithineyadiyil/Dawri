<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $team_id
 * @property string $user_id
 * @property string $invited_by
 * @property 'pending'|'accepted'|'declined'|'cancelled' $status
 * @property \Illuminate\Support\Carbon|null $decided_at
 */
final class TeamInvite extends Model
{
    use HasUuids;

    public const STATUS_PENDING   = 'pending';
    public const STATUS_ACCEPTED  = 'accepted';
    public const STATUS_DECLINED  = 'declined';
    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = ['team_id', 'user_id', 'invited_by', 'status', 'decided_at'];

    protected $casts = [
        'decided_at' => 'datetime',
    ];

    /** @return BelongsTo<Team, TeamInvite> */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /** @return BelongsTo<User, TeamInvite> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<User, TeamInvite> */
    public function inviter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by');
    }
}
