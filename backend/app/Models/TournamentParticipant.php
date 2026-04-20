<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * TournamentParticipant — Sprint 3 adds rules_accepted_at.
 */
class TournamentParticipant extends Model
{
    use HasUuids;

    protected $table = 'tournament_participants';

    protected $fillable = [
        'tournament_id', 'user_id', 'seed',
        'wins', 'losses', 'points', 'buchholz',
        'gamertag', 'status', 'rules_accepted_at',
    ];

    protected $casts = [
        'rules_accepted_at' => 'datetime',
        'seed'              => 'integer',
        'wins'              => 'integer',
        'losses'            => 'integer',
        'points'            => 'integer',
        'buchholz'          => 'integer',
    ];

    public function tournament(): BelongsTo { return $this->belongsTo(Tournament::class); }
    public function user(): BelongsTo       { return $this->belongsTo(User::class); }

    public function hasAcceptedRules(): bool { return $this->rules_accepted_at !== null; }
}
