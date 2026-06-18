<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Team — Dawri 2.0 persistent gaming team.
 *
 * @property string $id
 * @property string $owner_id
 * @property string $name
 * @property string $slug
 * @property string|null $tag
 * @property string|null $logo_url
 * @property string|null $region
 * @property string $game
 * @property string|null $description
 * @property bool $is_active
 * @property bool $is_recruiting
 *
 * @property-read User $owner
 */
final class Team extends Model
{
    use HasUuids;

    protected $fillable = [
        'owner_id', 'name', 'slug', 'tag', 'logo_url', 'region', 'game', 'description',
        'is_active', 'is_recruiting',
    ];

    protected $casts = [
        'is_active'     => 'boolean',
        'is_recruiting' => 'boolean',
    ];

    /** @return BelongsTo<User, Team> */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /** @return HasMany<TeamMember> */
    public function members(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    /** @return HasMany<TeamInvite> */
    public function invites(): HasMany
    {
        return $this->hasMany(TeamInvite::class);
    }

    /** Resolve {team} param by id (UUID) OR slug — nicer URLs. */
    public function resolveRouteBinding($value, $field = null): ?\Illuminate\Database\Eloquent\Model
    {
        if ($field) return parent::resolveRouteBinding($value, $field);
        return $this->newQuery()->where('id', $value)->orWhere('slug', $value)->first();
    }

    /** True if the user is a (non-removed) member of this team. */
    public function hasMember(string $userId): bool
    {
        return $this->members()->where('user_id', $userId)->exists();
    }

    /** Role of a user in this team, or null. */
    public function roleOf(string $userId): ?string
    {
        return $this->members()->where('user_id', $userId)->value('role');
    }
}
