<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * CodeBatch — a shipment of pre-purchased codes for one product.
 *
 * A batch is the unit of upload + reconciliation. Admins see the batch
 * list on the product's inventory drawer and can tell at a glance:
 * "LikeCard sent me 50 Apple Pay 50 SAR codes on 2026-04-15, I've
 * delivered 37, 13 still available."
 *
 * Batches CASCADE delete their child codes — but deletion is blocked
 * in AdminInventoryController if any code has already been delivered
 * (audit trail protection).
 *
 * @property string       $id
 * @property string       $product_id
 * @property string       $supplier_name
 * @property string|null  $supplier_ref
 * @property string       $source         manual|csv_upload|webhook
 * @property int          $code_count
 * @property float|null   $unit_cost_sar
 * @property float|null   $total_cost_sar
 * @property string|null  $uploaded_by_user_id
 * @property string|null  $notes
 */
class CodeBatch extends Model
{
    use HasUuids;

    public const SOURCE_MANUAL     = 'manual';
    public const SOURCE_CSV_UPLOAD = 'csv_upload';
    public const SOURCE_WEBHOOK    = 'webhook';
    public const SOURCES = [self::SOURCE_MANUAL, self::SOURCE_CSV_UPLOAD, self::SOURCE_WEBHOOK];

    protected $fillable = [
        'product_id',
        'supplier_name',
        'supplier_ref',
        'source',
        'code_count',
        'unit_cost_sar',
        'total_cost_sar',
        'uploaded_by_user_id',
        'notes',
    ];

    protected $casts = [
        'code_count'     => 'integer',
        'unit_cost_sar'  => 'decimal:2',
        'total_cost_sar' => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(DigitalProduct::class, 'product_id');
    }

    public function codes(): HasMany
    {
        return $this->hasMany(ProductCode::class, 'batch_id');
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_user_id');
    }
}
