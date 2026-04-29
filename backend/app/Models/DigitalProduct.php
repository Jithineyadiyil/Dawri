<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * DigitalProduct model.
 *
 * Sprint 5:  base marketplace product.
 * Sprint 12A: fulfillment_mode + low_stock_threshold + inventory relations.
 * Sprint 12A+: auto_hide_when_empty (per-product opt-out of auto-hide).
 *
 * @property string $id
 * @property string $distributor
 * @property string $fulfillment_mode      'api' | 'inventory'
 * @property int    $low_stock_threshold
 * @property bool   $auto_hide_when_empty  Inventory-mode only
 * @property bool   $is_active
 */
class DigitalProduct extends Model
{
    use HasFactory;

    /** Fulfillment modes — constants for type safety + validator reuse. */
    public const MODE_API       = 'api';
    public const MODE_INVENTORY = 'inventory';
    public const MODES          = [self::MODE_API, self::MODE_INVENTORY];

    public $incrementing = false;
    protected $keyType   = 'string';

    protected $fillable = [
        'distributor', 'distributor_product_id', 'name', 'name_ar',
        'brand', 'category', 'face_value', 'currency',
        'our_cost', 'our_price', 'region', 'image_url',
        'is_active', 'sort_order',
        // Sprint 12A
        'fulfillment_mode', 'low_stock_threshold', 'auto_hide_when_empty',
    ];

    protected $casts = [
        'face_value'           => 'float',
        'our_cost'             => 'float',
        'our_price'            => 'float',
        'is_active'            => 'boolean',
        'sort_order'           => 'integer',
        'low_stock_threshold'  => 'integer',
        'auto_hide_when_empty' => 'boolean',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($m) => $m->id ??= (string) Str::uuid());
    }

    public function orders(): HasMany
    {
        return $this->hasMany(DigitalOrder::class, 'product_id');
    }

    // ── Sprint 12A — inventory relationships ──────────────────────────

    public function codes(): HasMany
    {
        return $this->hasMany(ProductCode::class, 'product_id');
    }

    public function batches(): HasMany
    {
        return $this->hasMany(CodeBatch::class, 'product_id');
    }

    public function isInventoryMode(): bool
    {
        return $this->fulfillment_mode === self::MODE_INVENTORY;
    }

    /**
     * Whether this product should be hidden when its pool is empty.
     * Only meaningful for inventory-mode products.
     */
    public function shouldAutoHide(): bool
    {
        return $this->isInventoryMode()
            && (bool) ($this->auto_hide_when_empty ?? true);
    }
}
