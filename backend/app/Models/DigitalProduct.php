<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DigitalProduct extends Model
{
    public $incrementing = false;
    protected $keyType   = 'string';

    protected $fillable = [
        'distributor', 'distributor_product_id', 'name', 'name_ar',
        'brand', 'category', 'face_value', 'currency',
        'our_cost', 'our_price', 'region', 'image_url',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'face_value' => 'float',
        'our_cost'   => 'float',
        'our_price'  => 'float',
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($m) => $m->id ??= (string) \Illuminate\Support\Str::uuid());
    }

    public function orders(): HasMany
    {
        return $this->hasMany(DigitalOrder::class, 'product_id');
    }
}
