<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PlayerGameStat — aggregated per-game stats for one user.
 *
 * One row per (user_id, game). Updated by listeners on match/tournament
 * completion and by the `dawri:backfill-stats` command for existing data.
 *
 * @property string $id
 * @property string $user_id
 * @property string $game
 * @property int $matches_played
 * @property int $wins
 * @property int $losses
 * @property int $draws
 * @property int $tournaments_played
 * @property int $tournaments_won
 * @property int $mvp_count
 * @property int $current_win_streak
 * @property int $best_win_streak
 * @property \Illuminate\Support\Carbon|null $last_match_at
 */
final class PlayerGameStat extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'game',
        'matches_played', 'wins', 'losses', 'draws',
        'tournaments_played', 'tournaments_won', 'mvp_count',
        'current_win_streak', 'best_win_streak',
        'last_match_at',
    ];

    protected $casts = [
        'last_match_at' => 'datetime',
    ];

    /** Derived win rate as a percentage (0–100). */
    public function getWinRateAttribute(): float
    {
        if ($this->matches_played === 0) return 0.0;
        return round(($this->wins / $this->matches_played) * 100, 1);
    }

    /** @return BelongsTo<User, PlayerGameStat> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
