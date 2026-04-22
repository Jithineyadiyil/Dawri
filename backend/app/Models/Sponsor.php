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
 * Sponsor — a brand/company that can back tournaments.
 *
 * Sponsors are independent entities. They MAY be linked to a Company record
 * (when a Dawri enterprise customer is also sponsoring) but don't have to be
 * (e.g. a global brand with no tournament-hosting activity of its own).
 *
 * Managed by Dawri staff through /admin; not self-serve in Sprint 8.
 */
class Sponsor extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name', 'name_ar', 'slug', 'tagline', 'tagline_ar',
        'logo_url', 'website_url',
        'contact_name', 'contact_email', 'contact_phone',
        'company_id', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ── Relationships ─────────────────────────────────────────────────

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function sponsorships(): HasMany
    {
        return $this->hasMany(Sponsorship::class);
    }

    /** Tournaments this sponsor is actively backing. */
    public function activeTournaments(): BelongsToMany
    {
        return $this->belongsToMany(Tournament::class, 'sponsorships')
            ->withPivot(['placement_type', 'contribution_type', 'cash_amount_sar', 'contract_status'])
            ->wherePivot('contract_status', 'active')
            ->withTimestamps();
    }

    // ── Scopes ────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
