<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Lifetime aggregate stats per player per game.
 *
 * @property string $id
 * @property string $user_id
 * @property string $game
 * @property int $total_wins
 * @property int $total_losses
 * @property int $total_tournaments
 * @property int $total_points
 * @property int $matches_played
 * @property float $win_rate
 */
class PlayerStat extends Model
{
    use HasUuids;

    /** @var string */
    protected $table = 'player_stats';

    /** @var list<string> */
    protected $fillable = [
        'user_id', 'game', 'total_wins', 'total_losses',
        'total_tournaments', 'total_points', 'matches_played', 'win_rate',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'total_wins'         => 'integer',
        'total_losses'       => 'integer',
        'total_tournaments'  => 'integer',
        'total_points'       => 'integer',
        'matches_played'     => 'integer',
        'win_rate'           => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
