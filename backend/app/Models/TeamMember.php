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
 * @property 'owner'|'captain'|'member' $role
 * @property string|null $jersey_number
 * @property \Illuminate\Support\Carbon $joined_at
 */
final class TeamMember extends Model
{
    use HasUuids;

    public const ROLE_OWNER   = 'owner';
    public const ROLE_CAPTAIN = 'captain';
    public const ROLE_MEMBER  = 'member';

    protected $fillable = ['team_id', 'user_id', 'role', 'jersey_number', 'joined_at'];

    protected $casts = [
        'joined_at' => 'datetime',
    ];

    /** @return BelongsTo<Team, TeamMember> */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /** @return BelongsTo<User, TeamMember> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
