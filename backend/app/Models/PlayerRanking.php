<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Stores per-game, per-season ranking data for each player.
 *
 * @property string $id
 * @property string $user_id
 * @property string $game
 * @property string|null $season_id
 * @property int $total_points
 * @property int $wins
 * @property int $losses
 * @property int $tournaments_played
 * @property float $win_rate
 * @property int $rank_position
 */
class PlayerRanking extends Model
{
    use HasUuids;

    /** @var string */
    protected $table = 'player_rankings';

    /** @var list<string> */
    protected $fillable = [
        'user_id',
        'game',
        'season_id',
        'total_points',
        'wins',
        'losses',
        'tournaments_played',
        'win_rate',
        'rank_position',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'total_points'       => 'integer',
        'wins'               => 'integer',
        'losses'             => 'integer',
        'tournaments_played' => 'integer',
        'win_rate'           => 'float',
        'rank_position'      => 'integer',
    ];

    /** @var array<string, mixed> */
    protected $attributes = [
        'total_points'       => 0,
        'wins'               => 0,
        'losses'             => 0,
        'tournaments_played' => 0,
        'win_rate'           => 0.0,
        'rank_position'      => 0,
    ];

    // ── Relationships ─────────────────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }
}
