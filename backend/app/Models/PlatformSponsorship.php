<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * PlatformSponsorship — a Sponsor's relationship with Dawri-the-platform.
 *
 * Distinct from the per-tournament Sponsorship model. The same Sponsor
 * record (e.g. "Pepsi") can be referenced by both: a Sponsorship for
 * "Riyadh FIFA Cup 2026" AND a PlatformSponsorship for the platform.
 *
 * Public display rules (used by `active()` scope):
 *   1. is_active = true (master switch)
 *   2. starts_at IS NULL OR starts_at <= now
 *   3. ends_at   IS NULL OR ends_at   >= now
 */
class PlatformSponsorship extends Model
{
    use HasUuids;

    public const TIER_TITLE    = 'title';
    public const TIER_STANDARD = 'standard';

    protected $fillable = [
        'sponsor_id',
        'tier',
        'display_order',
        'starts_at',
        'ends_at',
        'is_active',
        'contract_value_sar',
        'internal_notes',
    ];

    protected $casts = [
        'starts_at'          => 'datetime',
        'ends_at'            => 'datetime',
        'is_active'          => 'boolean',
        'display_order'      => 'integer',
        'contract_value_sar' => 'decimal:2',
    ];

    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    /**
     * Currently displayable platform sponsors. Filter on master switch
     * AND validity window.
     */
    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true)
            ->where(function (Builder $q) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function (Builder $q) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            });
    }

    public function scopeOrdered(Builder $q): Builder
    {
        // Title tier first, then by display_order ascending
        return $q->orderByRaw("FIELD(tier, 'title', 'standard')")
            ->orderBy('display_order')
            ->orderBy('created_at');
    }
}
