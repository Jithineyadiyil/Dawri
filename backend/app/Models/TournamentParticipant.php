<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Canonical TournamentParticipant model.
 *
 * Merges fields from both v1 (gamertag, string status) and v2 (buchholz,
 * is_eliminated) into a single, definitive model. The string 'status' from
 * v1 is replaced by the boolean 'is_eliminated' from v2, plus an explicit
 * 'status' enum column for registration state (registered, waitlisted, withdrawn).
 *
 * @property string $id
 * @property string $tournament_id
 * @property string $user_id
 * @property string|null $gamertag
 * @property int $seed
 * @property int $wins
 * @property int $losses
 * @property int $points
 * @property float $buchholz
 * @property bool $is_eliminated
 * @property string $status
 * @property \Carbon\Carbon|null $registered_at
 */
class TournamentParticipant extends Model
{
    use HasUuids;

    /** @var string */
    protected $table = 'tournament_participants';

    /** @var bool */
    public $timestamps = false;

    /** @var list<string> */
    protected $fillable = [
        'tournament_id',
        'user_id',
        'gamertag',
        'seed',
        'wins',
        'losses',
        'points',
        'buchholz',
        'is_eliminated',
        'status',
        'registered_at',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'seed'          => 'integer',
        'wins'          => 'integer',
        'losses'        => 'integer',
        'points'        => 'integer',
        'buchholz'      => 'float',
        'is_eliminated' => 'boolean',
        'registered_at' => 'datetime',
    ];

    /** @var array<string, mixed> */
    protected $attributes = [
        'seed'          => 0,
        'wins'          => 0,
        'losses'        => 0,
        'points'        => 0,
        'buchholz'      => 0.0,
        'is_eliminated' => false,
        'status'        => 'registered',
    ];

    // ── Relationships ─────────────────────────────────────────────────────

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function matchesAsA(): HasMany
    {
        return $this->hasMany(TournamentMatch::class, 'participant_a_id');
    }

    public function matchesAsB(): HasMany
    {
        return $this->hasMany(TournamentMatch::class, 'participant_b_id');
    }

    // ── Helpers ────────────────────────────────────────────────────────────

    /**
     * Display name: gamertag if set, otherwise user name.
     */
    public function displayName(): string
    {
        return $this->gamertag ?: ($this->user?->name ?? 'Unknown');
    }

    /**
     * Win rate as a percentage (0–100).
     */
    public function winRate(): float
    {
        $total = $this->wins + $this->losses;

        return $total > 0 ? round(($this->wins / $total) * 100, 1) : 0.0;
    }
}
