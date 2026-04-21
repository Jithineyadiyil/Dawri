<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

/**
 * User model — Sprint 4 adds:
 *   • nickname (gamer tag, shown on tournament matches/leaderboards)
 *   • avatar_url accessor (handles both URL and stored-path forms)
 *   • display_name helper (returns nickname if set, otherwise name)
 *
 * Sprint 5 adds:
 *   • HasFactory trait — enables User::factory() for PHPUnit tests
 *     (fixes "Call to undefined method User::factory()" in PaymentServiceTest,
 *     BrandingTest, MatchSchedulingTest, MarketplaceApiTest)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    protected $fillable = [
        'name', 'nickname', 'email', 'password', 'phone', 'role',
        'avatar', 'status',
        'game_username', 'psn_id', 'pubg_id', 'cod_id',
        'preferred_games', 'bio', 'country', 'city',
        'subscription_plan', 'organization_name', 'organization_name_ar',
        'company_id', 'phone_verified_at',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'password'          => 'hashed',
        'preferred_games'   => 'array',
    ];

    protected $attributes = [
        'role'              => 'player',
        'subscription_plan' => 'free',
        'status'            => 'active',
    ];

    /** @var array<int, string> */
    protected $appends = ['avatar_url', 'display_name'];

    // ── Relationships ─────────────────────────────────────────────────

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function organizedTournaments(): HasMany
    {
        return $this->hasMany(Tournament::class, 'organizer_id');
    }

    public function participations(): HasMany
    {
        return $this->hasMany(TournamentParticipant::class);
    }

    public function rankings(): HasMany
    {
        return $this->hasMany(PlayerRanking::class);
    }

    public function stats(): HasMany
    {
        return $this->hasMany(PlayerStat::class);
    }

    // ── Accessors ─────────────────────────────────────────────────────

    /**
     * Returns a usable avatar URL. Handles three storage forms:
     *   • full URL (http/https)       → returned as-is
     *   • storage path (e.g. "avatars/abc.jpg") → prefixed with Storage::url()
     *   • null / empty                → null
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: function (): ?string {
                $value = $this->avatar;
                if (empty($value)) { return null; }
                if (preg_match('#^https?://#i', (string) $value)) { return (string) $value; }
                return Storage::disk('public')->url($value);
            },
        );
    }

    /**
     * Preferred display name for UI: nickname if set and non-empty, else real name.
     */
    protected function displayName(): Attribute
    {
        return Attribute::make(
            get: fn (): string => ! empty($this->nickname) ? (string) $this->nickname : (string) ($this->name ?? '—'),
        );
    }
}
