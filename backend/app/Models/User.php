<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasUuids, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'role',
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

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
