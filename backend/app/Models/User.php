<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        'name', 'nickname', 'email', 'password', 'phone', 'role', 'organizer_tier',
        'avatar', 'status',
        'game_username', 'psn_id', 'pubg_id', 'cod_id', 'steam_id', 'riot_id', 'epic_id', 'xbox_gamertag',
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

    /**
     * Sprint 15 — communities this user belongs to.
     *
     * @return BelongsToMany
     */
    public function communities(): BelongsToMany
    {
        return $this->belongsToMany(Community::class, 'community_members')
            ->withPivot(['role', 'joined_at', 'muted_until', 'banned_at'])
            ->withTimestamps();
    }

    /**
     * Sprint 15 — community messages authored by this user.
     * Aliased to avoid collision with the Notifiable trait's notifications().
     *
     * @return HasMany
     */
    public function communityMessages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    // ── Social: friendships ───────────────────────────────────────────

    /** Friendship rows this user initiated. @return HasMany */
    public function friendshipsSent(): HasMany
    {
        return $this->hasMany(Friendship::class, 'requester_id');
    }

    /** Friendship rows where this user is the recipient. @return HasMany */
    public function friendshipsReceived(): HasMany
    {
        return $this->hasMany(Friendship::class, 'addressee_id');
    }

    /**
     * Accepted friends (either direction), as a User collection.
     *
     * @return \Illuminate\Support\Collection<int, User>
     */
    public function friends(): \Illuminate\Support\Collection
    {
        $rows = Friendship::query()
            ->where('status', Friendship::STATUS_ACCEPTED)
            ->where(function ($q): void {
                $q->where('requester_id', $this->id)
                  ->orWhere('addressee_id', $this->id);
            })
            ->with(['requester', 'addressee'])
            ->get();

        return $rows
            ->map(fn (Friendship $f) => $f->requester_id === $this->id ? $f->addressee : $f->requester)
            ->filter()
            ->values();
    }

    /** Aggregated per-game stats (one row per game the user has played). @return HasMany */
    public function gameStats(): HasMany
    {
        return $this->hasMany(PlayerGameStat::class);
    }

    /** Teams this user owns. @return HasMany */
    public function ownedTeams(): HasMany
    {
        return $this->hasMany(Team::class, 'owner_id');
    }

    /** Team memberships for this user (one row per team). @return HasMany */
    public function teamMemberships(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    /**
     * Teams this user is a member of, as a User-side collection of Team models.
     * @return \Illuminate\Support\Collection<int, Team>
     */
    public function teams(): \Illuminate\Support\Collection
    {
        return $this->teamMemberships()->with('team')->get()
            ->map(fn (TeamMember $m) => $m->team)
            ->filter()
            ->values();
    }

    /** True if the two users are accepted friends. */
    public function isFriendsWith(string $otherUserId): bool
    {
        return Friendship::query()
            ->where('status', Friendship::STATUS_ACCEPTED)
            ->where(function ($q) use ($otherUserId): void {
                $q->where(fn ($qq) => $qq->where('requester_id', $this->id)->where('addressee_id', $otherUserId))
                  ->orWhere(fn ($qq) => $qq->where('requester_id', $otherUserId)->where('addressee_id', $this->id));
            })
            ->exists();
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

    /**
     * Override the default password reset notification so the reset link
     * points to the Angular frontend instead of the Laravel backend URL.
     *
     * The Angular app handles /reset-password?token=...&email=... and calls
     * POST /api/v1/auth/password/reset with the token + new password.
     */
    public function sendPasswordResetNotification(#[\SensitiveParameter] $token): void
    {
        $frontendUrl = env('FRONTEND_URL', 'http://192.168.100.67:4300');
        $url = $frontendUrl . '/reset-password'
             . '?token=' . urlencode($token)
             . '&email=' . urlencode($this->email);

        \Illuminate\Support\Facades\Mail::to($this->email)->queue(
            new \App\Mail\PasswordResetEmail($this, $url)
        );
    }
}
