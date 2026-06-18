<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Challenge — a friendly 1v1 challenge between two users.
 *
 * @property string $id
 * @property string $challenger_id
 * @property string $opponent_id
 * @property string $game
 * @property string|null $message
 * @property 'pending'|'accepted'|'declined'|'cancelled'|'completed' $status
 * @property \Illuminate\Support\Carbon|null $scheduled_at
 * @property int|null $challenger_score
 * @property int|null $opponent_score
 * @property string|null $winner_id
 * @property string|null $result_reported_by
 *
 * @property-read User $challenger
 * @property-read User $opponent
 */
final class Challenge extends Model
{
    use HasUuids;

    public const STATUS_PENDING   = 'pending';
    public const STATUS_ACCEPTED  = 'accepted';
    public const STATUS_DECLINED  = 'declined';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'challenger_id', 'opponent_id',
        'challenger_team_id', 'opponent_team_id',
        'game', 'message', 'status', 'scheduled_at',
        'challenger_score', 'opponent_score',
        'winner_id', 'winner_team_id',
        'result_reported_by', 'completed_at',
    ];

    protected $casts = [
        'scheduled_at'     => 'datetime',
        'completed_at'     => 'datetime',
        'challenger_score' => 'integer',
        'opponent_score'   => 'integer',
    ];

    /** @return BelongsTo<User, Challenge> */
    public function challenger(): BelongsTo
    {
        return $this->belongsTo(User::class, 'challenger_id');
    }

    /** @return BelongsTo<User, Challenge> */
    public function opponent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'opponent_id');
    }

    public function hasParticipant(string $userId): bool
    {
        return $this->challenger_id === $userId || $this->opponent_id === $userId;
    }

    /** True if this is a team-vs-team challenge (vs player-vs-player). */
    public function isTeamChallenge(): bool
    {
        return $this->challenger_team_id !== null && $this->opponent_team_id !== null;
    }

    /** @return BelongsTo<Team, Challenge> */
    public function challengerTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'challenger_team_id');
    }

    /** @return BelongsTo<Team, Challenge> */
    public function opponentTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'opponent_team_id');
    }
}
