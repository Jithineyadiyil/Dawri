<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tournament extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'tournaments';

    protected $fillable = [
        'name', 'name_ar', 'game', 'format', 'max_participants',
        'swiss_rounds', 'registration_closes_at', 'starts_at', 'timezone',
        'is_public', 'entry_fee_sar', 'prize_pool', 'organizer_id',
        'moderator_id', 'status', 'tier', 'company_id',
    ];

    protected $casts = [
        'max_participants'       => 'integer',
        'swiss_rounds'           => 'integer',
        'is_public'              => 'boolean',
        'entry_fee_sar'          => 'integer',
        'prize_pool'             => 'array',
        'registration_closes_at' => 'datetime',
        'starts_at'              => 'datetime',
    ];

    protected $attributes = [
        'status'        => 'registration_open',
        'is_public'     => true,
        'entry_fee_sar' => 0,
        'tier'          => 'standard',
    ];

    // ── Relationships ─────────────────────────────────────────────────

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function moderator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'moderator_id');
    }

    public function participants(): HasMany
    {
        return $this->hasMany(TournamentParticipant::class);
    }

    public function bracket(): HasOne
    {
        return $this->hasOne(Bracket::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * All matches via: tournaments → brackets.tournament_id → tournament_matches.bracket_id
     */
    public function matches(): HasManyThrough
    {
        return $this->hasManyThrough(
            TournamentMatch::class,
            Bracket::class,
            'tournament_id', // FK on brackets pointing to tournaments
            'bracket_id',    // FK on tournament_matches pointing to brackets
            'id',            // PK on tournaments
            'id',            // PK on brackets
        );
    }

    // ── Helpers ────────────────────────────────────────────────────────

    public function isRegistrationOpen(): bool
    {
        return $this->status === 'registration_open';
    }

    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
}
