<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Sponsor — a brand/company that can back tournaments.
 *
 * Ownership & visibility (Sprint 10):
 *   - Admin-created sponsors have `is_global = true` and are visible to
 *     every organizer in their catalog dropdowns.
 *   - Organizer-created sponsors have `is_global = false` and are only
 *     visible to their creator (and admins) until an admin promotes them.
 *
 * Use the `visibleTo()` scope to filter lists by the current user.
 */
class Sponsor extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name', 'name_ar', 'slug', 'tagline', 'tagline_ar',
        'logo_url', 'website_url',
        'contact_name', 'contact_email', 'contact_phone',
        'company_id', 'is_active',
        // Sprint 10
        'created_by_user_id', 'is_global',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_global' => 'boolean',
    ];

    // ── Relationships ─────────────────────────────────────────────────

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function sponsorships(): HasMany
    {
        return $this->hasMany(Sponsorship::class);
    }

    public function activeTournaments(): BelongsToMany
    {
        return $this->belongsToMany(Tournament::class, 'sponsorships')
            ->withPivot(['placement_type', 'contribution_type', 'cash_amount_sar', 'contract_status'])
            ->wherePivot('contract_status', 'active')
            ->withTimestamps();
    }

    // ── Scopes ────────────────────────────────────────────────────────

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Filter sponsors visible to a given user.
     *   - Admin sees every sponsor (no filter applied).
     *   - Organizer sees global sponsors + any they created themselves.
     *   - Anyone else: global only.
     */
    public function scopeVisibleTo(Builder $query, ?User $user): Builder
    {
        if ($user && $user->role === 'admin') {
            return $query;
        }

        if ($user && $user->role === 'organizer') {
            return $query->where(function (Builder $q) use ($user) {
                $q->where('is_global', true)
                  ->orWhere('created_by_user_id', $user->id);
            });
        }

        return $query->where('is_global', true);
    }
}
