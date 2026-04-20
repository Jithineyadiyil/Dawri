<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * MatchRescheduleRequest — a proposed new scheduled_at for a match.
 *
 * Lifecycle:
 *
 *     pending  ──(opposing player accepts)──→   accepted
 *              ──(opposing player rejects)──→   rejected
 *              ──(requester cancels)─────────→   cancelled
 *              ──(organizer overrides yes)──→   overridden  (was_organizer_override=true, accepted schedule)
 *              ──(organizer overrides no)───→   overridden  (was_organizer_override=true, schedule unchanged)
 *
 * When the terminal status is `accepted` OR `overridden` with the intent to
 * accept, the TournamentMatch.scheduled_at is updated to proposed_at, and
 * scheduled_by_id is set to the accepting/overriding user.
 *
 * @property string      $id
 * @property string      $match_id
 * @property string      $requested_by_id
 * @property \Carbon\CarbonImmutable $proposed_at
 * @property string|null $reason
 * @property string      $status
 * @property string|null $responded_by_id
 * @property \Carbon\CarbonImmutable|null $responded_at
 * @property bool        $was_organizer_override
 */
class MatchRescheduleRequest extends Model
{
    use HasUuids;

    protected $table = 'match_reschedule_requests';

    public const STATUS_PENDING    = 'pending';
    public const STATUS_ACCEPTED   = 'accepted';
    public const STATUS_REJECTED   = 'rejected';
    public const STATUS_CANCELLED  = 'cancelled';
    public const STATUS_OVERRIDDEN = 'overridden';

    public const TERMINAL_STATUSES = [
        self::STATUS_ACCEPTED,
        self::STATUS_REJECTED,
        self::STATUS_CANCELLED,
        self::STATUS_OVERRIDDEN,
    ];

    protected $fillable = [
        'match_id', 'requested_by_id', 'proposed_at', 'reason',
        'status', 'responded_by_id', 'responded_at', 'was_organizer_override',
    ];

    protected $casts = [
        'proposed_at'            => 'datetime',
        'responded_at'           => 'datetime',
        'was_organizer_override' => 'boolean',
    ];

    // ── Relations ────────────────────────────────────────────────────────

    public function match(): BelongsTo
    {
        return $this->belongsTo(TournamentMatch::class, 'match_id');
    }

    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by_id');
    }

    public function respondedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by_id');
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isTerminal(): bool
    {
        return in_array($this->status, self::TERMINAL_STATUSES, true);
    }
}
