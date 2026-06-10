<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Phase 5 — a request to join a community (request-to-join policy).
 *
 * @property string      $id
 * @property string      $community_id
 * @property string      $user_id
 * @property string      $status  pending | approved | denied
 * @property string|null $message
 * @property string|null $decided_by
 * @property \Illuminate\Support\Carbon|null $decided_at
 */
final class CommunityJoinRequest extends Model
{
    use HasUuids;

    public const PENDING  = 'pending';
    public const APPROVED = 'approved';
    public const DENIED   = 'denied';

    protected $fillable = [
        'community_id',
        'user_id',
        'status',
        'message',
        'decided_by',
        'decided_at',
    ];

    protected $casts = [
        'decided_at' => 'datetime',
    ];

    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
