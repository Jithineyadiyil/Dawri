<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CommunityMember
 *
 * Pivot-with-attributes backed by the `community_members` table, whose
 * primary key is the composite (community_id, user_id). It is modelled as a
 * full Eloquent Model (not a Pivot) because moderation logic queries it
 * directly — e.g. "is this user muted right now?".
 *
 * IMPORTANT — key configuration:
 * This table has NO surrogate `id` column. It must therefore NOT use the
 * HasUuids trait (which generates a UUID for the primary key on insert) and
 * `$primaryKey` must never be null. A null key name makes Eloquent's
 * attribute-fill loop call setAttribute() with a single argument, throwing
 * ArgumentCountError on every insert. We expose `community_id` as the key
 * name purely to satisfy Eloquent's machinery; uniqueness is enforced by the
 * composite PK at the database level, and writes go through
 * `updateOrCreate([community_id, user_id], ...)` which keys on both columns.
 *
 * @property string                               $community_id
 * @property string                               $user_id
 * @property 'owner'|'admin'|'moderator'|'member' $role
 * @property \Illuminate\Support\Carbon           $joined_at
 * @property \Illuminate\Support\Carbon|null      $muted_until
 * @property \Illuminate\Support\Carbon|null      $banned_at
 * @property string|null                          $ban_reason
 * @property string|null                          $banned_by
 *
 * @property-read Community $community
 * @property-read User      $user
 */
final class CommunityMember extends Model
{
    /**
     * No auto-incrementing key — the PK is a composite of two string UUIDs.
     */
    public $incrementing = false;

    /**
     * Eloquent needs a string key name; the composite PK is enforced in the DB.
     *
     * @var string
     */
    protected $keyType = 'string';

    public $timestamps = true;

    protected $table = 'community_members';

    /**
     * Eloquent requires a non-null key name. We point it at `community_id`
     * to keep the framework's single-key assumptions satisfied; actual row
     * identity is the (community_id, user_id) composite enforced by the
     * migration. Never set this to null — doing so breaks attribute filling.
     *
     * @var string
     */
    protected $primaryKey = 'community_id';

    public const ROLE_OWNER     = 'owner';
    public const ROLE_ADMIN     = 'admin';
    public const ROLE_MODERATOR = 'moderator';
    public const ROLE_MEMBER    = 'member';

    /** @var list<string> */
    protected $fillable = [
        'community_id',
        'user_id',
        'role',
        'joined_at',
        'muted_until',
        'banned_at',
        'ban_reason',
        'banned_by',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'joined_at'   => 'datetime',
        'muted_until' => 'datetime',
        'banned_at'   => 'datetime',
    ];

    /** @return BelongsTo<Community, CommunityMember> */
    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    /** @return BelongsTo<User, CommunityMember> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Whether the member is currently banned.
     */
    public function isBanned(): bool
    {
        return $this->banned_at !== null;
    }

    /**
     * Whether the member is muted and the mute window has not yet expired.
     */
    public function isMuted(): bool
    {
        return $this->muted_until !== null && $this->muted_until->isFuture();
    }

    /**
     * Whether the member holds a moderation-capable role.
     */
    public function canModerate(): bool
    {
        return in_array($this->role, [self::ROLE_OWNER, self::ROLE_ADMIN, self::ROLE_MODERATOR], true);
    }

    /**
     * Whether the member can manage the community (owner/admin only).
     */
    public function canManage(): bool
    {
        return in_array($this->role, [self::ROLE_OWNER, self::ROLE_ADMIN], true);
    }
}
