<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Sponsorship — one sponsor backing one tournament.
 *
 * Rich pivot: carries the placement tier, contribution type, monetary amount,
 * and lifecycle state. See the migration doc for the semantics of each enum.
 *
 * Business rule: `cash_amount_sar` counts toward the tournament's total
 * sponsored prize pool only when `contract_status === 'active'`.
 */
class Sponsorship extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'tournament_id', 'sponsor_id',
        'placement_type', 'contribution_type',
        'cash_amount_sar', 'in_kind_description', 'in_kind_description_ar', 'in_kind_value_sar',
        'contract_status',
        'notes', 'created_by_user_id',
        'activated_at', 'fulfilled_at',
    ];

    protected $casts = [
        'cash_amount_sar'    => 'decimal:2',
        'in_kind_value_sar'  => 'decimal:2',
        'activated_at'       => 'datetime',
        'fulfilled_at'       => 'datetime',
    ];

    // ── Relationships ─────────────────────────────────────────────────

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    // ── Scopes ────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('contract_status', 'active');
    }

    public function scopeByPlacement($query, string $placement)
    {
        return $query->where('placement_type', $placement);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    /** Total monetary value (cash + in-kind estimated value) in SAR. */
    public function totalValueSar(): float
    {
        return (float) $this->cash_amount_sar + (float) ($this->in_kind_value_sar ?? 0);
    }
}
