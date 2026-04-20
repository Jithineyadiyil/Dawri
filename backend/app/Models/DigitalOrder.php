<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DigitalOrder extends Model
{
    public $incrementing = false;
    protected $keyType   = 'string';

    protected $fillable = [
        'user_id', 'product_id', 'distributor', 'distributor_order_id',
        'idempotency_key', 'quantity', 'unit_price', 'total_price',
        'status', 'payment_method', 'payment_ref', 'fulfilled_at',
    ];

    protected $casts = [
        'unit_price'   => 'float',
        'total_price'  => 'float',
        'quantity'     => 'integer',
        'fulfilled_at' => 'datetime',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($m) => $m->id ??= (string) \Illuminate\Support\Str::uuid());
    }

    public function user(): BelongsTo    { return $this->belongsTo(User::class); }
    public function product(): BelongsTo { return $this->belongsTo(DigitalProduct::class, 'product_id'); }
    public function code(): HasOne       { return $this->hasOne(DigitalCode::class, 'order_id'); }
}
