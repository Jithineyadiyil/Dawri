<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * TournamentMatch — represents a single match in a bracket.
 *
 * Sprint 2 extensions:
 *   • `scheduled_by_id` — records WHO set the current schedule
 *   • `rescheduleRequests()` — all reschedule proposals for this match
 *   • `pendingReschedule()` — convenience: the single pending request if any
 *   • `evidence()` — all uploaded evidence files (screenshots / videos)
 *   • isParticipant() — helper for authorization checks
 *
 * @property string      $id
 * @property string      $bracket_id
 * @property int         $round_number
 * @property int         $match_number
 * @property string      $bracket_section
 * @property string|null $participant_a_id
 * @property string|null $participant_b_id
 * @property bool        $participant_a_is_bye
 * @property bool        $participant_b_is_bye
 * @property string|null $winner_id
 * @property string|null $loser_id
 * @property int|null    $score_a
 * @property int|null    $score_b
 * @property string      $status
 * @property string|null $next_match_id
 * @property string|null $loser_next_match_id
 * @property string|null $result_screenshot_path
 * @property string|null $submitted_by_id
 * @property string|null $dispute_reason
 * @property \Carbon\CarbonImmutable|null $scheduled_at
 * @property string|null $scheduled_by_id
 * @property \Carbon\CarbonImmutable|null $completed_at
 */
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
        'dispute_reason',
        'scheduled_at', 'scheduled_by_id',
        'completed_at',
        // Live streaming (Option A): canonical Twitch/YouTube URL.
        'stream_url',
    ];

    protected $casts = [
        'participant_a_is_bye' => 'boolean',
        'participant_b_is_bye' => 'boolean',
        'scheduled_at'         => 'datetime',
        'completed_at'         => 'datetime',
    ];

    // ── Relations ────────────────────────────────────────────────────────
    public function bracket(): BelongsTo      { return $this->belongsTo(Bracket::class); }
    public function participantA(): BelongsTo { return $this->belongsTo(TournamentParticipant::class, 'participant_a_id'); }
    public function participantB(): BelongsTo { return $this->belongsTo(TournamentParticipant::class, 'participant_b_id'); }
    public function winner(): BelongsTo       { return $this->belongsTo(TournamentParticipant::class, 'winner_id'); }

    /**
     * All reschedule requests ever made for this match (any status).
     */
    public function rescheduleRequests(): HasMany
    {
        return $this->hasMany(MatchRescheduleRequest::class, 'match_id')
            ->orderByDesc('created_at');
    }

    /**
     * The currently-pending reschedule request (should be at most one).
     *
     * @return HasMany<MatchRescheduleRequest>
     */
    public function pendingReschedule(): HasMany
    {
        return $this->hasMany(MatchRescheduleRequest::class, 'match_id')
            ->where('status', 'pending');
    }

    /**
     * Uploaded evidence (screenshots, video clips) for this match.
     */
    public function evidence(): HasMany
    {
        return $this->hasMany(MatchEvidence::class, 'match_id')
            ->orderByDesc('created_at');
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    /**
     * Returns true if the given user is one of the two match participants
     * (i.e. the user owns either participant_a or participant_b).
     *
     * IMPORTANT: participant_*_id is a TournamentParticipant.id, not a User.id.
     * We therefore need to check against the linked user, not the participant pk.
     */
    public function isParticipantUser(string $userId): bool
    {
        $this->loadMissing(['participantA:id,user_id', 'participantB:id,user_id']);

        return $this->participantA?->user_id === $userId
            || $this->participantB?->user_id === $userId;
    }

    /**
     * Returns the participant ID (NOT user ID) for the given user, or null
     * if the user isn't a participant in this match.
     */
    public function participantIdForUser(string $userId): ?string
    {
        $this->loadMissing(['participantA:id,user_id', 'participantB:id,user_id']);

        if ($this->participantA?->user_id === $userId) { return $this->participant_a_id; }
        if ($this->participantB?->user_id === $userId) { return $this->participant_b_id; }

        return null;
    }

    /**
     * Returns the OTHER participant's user_id, or null if the user isn't
     * in this match (or their opponent doesn't exist — BYE, etc.).
     */
    public function opponentUserId(string $userId): ?string
    {
        $this->loadMissing(['participantA:id,user_id', 'participantB:id,user_id']);

        if ($this->participantA?->user_id === $userId) { return $this->participantB?->user_id; }
        if ($this->participantB?->user_id === $userId) { return $this->participantA?->user_id; }

        return null;
    }
}
