<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TournamentMatch extends Model
{
    use HasUuids;

    protected $table = 'tournament_matches';

    protected $fillable = [
        'bracket_id', 'round_number', 'match_number', 'bracket_section',
        'participant_a_id', 'participant_b_id',
        'participant_a_is_bye', 'participant_b_is_bye',
        'winner_id', 'loser_id', 'score_a', 'score_b',
        'status', 'next_match_id', 'loser_next_match_id',
        'result_screenshot_path', 'submitted_by_id',
        'dispute_reason', 'scheduled_at', 'completed_at',
    ];

    protected $casts = [
        'participant_a_is_bye' => 'boolean',
        'participant_b_is_bye' => 'boolean',
        'scheduled_at'         => 'datetime',
        'completed_at'         => 'datetime',
    ];

    public function bracket(): BelongsTo      { return $this->belongsTo(Bracket::class); }
    public function participantA(): BelongsTo { return $this->belongsTo(TournamentParticipant::class, 'participant_a_id'); }
    public function participantB(): BelongsTo { return $this->belongsTo(TournamentParticipant::class, 'participant_b_id'); }
    public function winner(): BelongsTo       { return $this->belongsTo(TournamentParticipant::class, 'winner_id'); }
}
