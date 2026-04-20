<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bracket extends Model
{
    use HasUuids;

    protected $fillable = [
        'tournament_id', 'format', 'status', 'total_rounds', 'current_round',
        'participant_count', 'bye_count', 'winner_participant_id',
        'metadata', 'generated_at', 'completed_at',
    ];

    protected $casts = [
        'generated_at'  => 'datetime',
        'completed_at'  => 'datetime',
        'metadata'      => 'array',
    ];

    public function tournament(): BelongsTo { return $this->belongsTo(Tournament::class); }
    public function matches(): HasMany      { return $this->hasMany(TournamentMatch::class)->orderBy('round_number')->orderBy('match_number'); }
}
