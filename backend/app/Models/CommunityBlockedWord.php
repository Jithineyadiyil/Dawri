<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Phase 6 — a blocked word for a community's keyword auto-moderation.
 *
 * @property string $id
 * @property string $community_id
 * @property string|null $created_by
 * @property string $word
 * @property string $mode  block | flag
 */
final class CommunityBlockedWord extends Model
{
    use HasUuids;

    public const MODE_BLOCK = 'block';
    public const MODE_FLAG  = 'flag';

    /** Only created_at is tracked. */
    public const UPDATED_AT = null;

    protected $fillable = [
        'community_id',
        'created_by',
        'word',
        'mode',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
