<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Phase 6 — a single audit-log entry for a community.
 *
 * @property string      $id
 * @property string      $community_id
 * @property string|null $actor_id
 * @property string|null $target_user_id
 * @property string      $action
 * @property array|null  $meta
 */
final class CommunityAuditEntry extends Model
{
    use HasUuids;

    protected $table = 'community_audit_log';

    /** Only created_at is tracked (append-only log). */
    public const UPDATED_AT = null;

    protected $fillable = [
        'community_id',
        'actor_id',
        'target_user_id',
        'action',
        'meta',
    ];

    protected $casts = [
        'meta'       => 'array',
        'created_at' => 'datetime',
    ];

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function targetUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'target_user_id');
    }
}
