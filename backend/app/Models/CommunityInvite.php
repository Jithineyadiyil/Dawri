<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Phase 5 — a shareable invite link for a community.
 *
 * @property string      $id
 * @property string      $community_id
 * @property string      $created_by
 * @property string      $token
 * @property int|null    $max_uses
 * @property int         $uses
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property bool        $is_revoked
 */
final class CommunityInvite extends Model
{
    use HasUuids;

    protected $fillable = [
        'community_id',
        'created_by',
        'token',
        'max_uses',
        'uses',
        'expires_at',
        'is_revoked',
    ];

    protected $casts = [
        'max_uses'   => 'integer',
        'uses'       => 'integer',
        'expires_at' => 'datetime',
        'is_revoked' => 'boolean',
    ];

    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** Whether this invite can still be used right now. */
    public function isUsable(): bool
    {
        if ($this->is_revoked) {
            return false;
        }
        if ($this->expires_at !== null && $this->expires_at->isPast()) {
            return false;
        }
        if ($this->max_uses !== null && $this->uses >= $this->max_uses) {
            return false;
        }

        return true;
    }
}
