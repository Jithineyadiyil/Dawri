<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Represents a match dispute raised by a player.
 *
 * @property string $id
 * @property string $match_id
 * @property string $raised_by
 * @property string $reason
 * @property string|null $evidence_path
 * @property string $status
 * @property string|null $assigned_to
 * @property string|null $resolved_by
 * @property string|null $resolution
 * @property \Carbon\Carbon|null $resolved_at
 */
class Dispute extends Model
{
    use HasUuids;

    /** @var string */
    protected $table = 'disputes';

    /** @var list<string> */
    protected $fillable = [
        'match_id', 'raised_by', 'reason', 'evidence_path',
        'status', 'assigned_to', 'resolved_by', 'resolution', 'resolved_at',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    public function match(): BelongsTo
    {
        return $this->belongsTo(TournamentMatch::class, 'match_id');
    }

    public function raiser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'raised_by');
    }

    public function moderator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function resolver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    public function isOpen(): bool
    {
        return in_array($this->status, ['open', 'under_review'], true);
    }
}
