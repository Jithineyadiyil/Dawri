<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Community
 *
 * Represents either the global "Dawri Community" (type=global) or a
 * per-tournament private room (type=tournament). The discriminator
 * drives membership and lifecycle rules.
 *
 * @property string                       $id
 * @property 'global'|'tournament'        $type
 * @property string|null                  $tournament_id
 * @property string                       $name
 * @property string                       $slug
 * @property string|null                  $description
 * @property string|null                  $icon_url
 * @property bool                         $is_active
 * @property \Illuminate\Support\Carbon|null $archived_at
 * @property \Illuminate\Support\Carbon   $created_at
 * @property \Illuminate\Support\Carbon   $updated_at
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Channel>         $channels
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User>            $members
 * @property-read Tournament|null                                                $tournament
 */
final class Community extends Model
{
    use HasFactory;
    use HasUuids;

    public const TYPE_GLOBAL     = 'global';
    public const TYPE_TOURNAMENT = 'tournament';

    public const GLOBAL_SLUG = 'dawri-community';

    /** @var list<string> */
    protected $fillable = [
        'type',
        'tournament_id',
        'name',
        'slug',
        'description',
        'icon_url',
        'is_active',
        'archived_at',
        'join_policy',
        'rules',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'is_active'   => 'boolean',
        'archived_at' => 'datetime',
    ];

    /** @return HasMany<Channel> */
    public function channels(): HasMany
    {
        return $this->hasMany(Channel::class)->orderBy('position');
    }

    /** @return BelongsTo<Tournament, Community> */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /** @return BelongsToMany<User> */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'community_members')
            ->withPivot(['role', 'joined_at', 'muted_until', 'banned_at', 'ban_reason'])
            ->withTimestamps();
    }

    /** @return HasMany<CommunityMember> */
    public function memberships(): HasMany
    {
        return $this->hasMany(CommunityMember::class);
    }

    public function isGlobal(): bool
    {
        return $this->type === self::TYPE_GLOBAL;
    }

    public function isTournamentRoom(): bool
    {
        return $this->type === self::TYPE_TOURNAMENT;
    }

    public function isArchived(): bool
    {
        return $this->archived_at !== null;
    }
}
