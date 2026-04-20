<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DigitalCode extends Model
{
    public $incrementing = false;
    protected $keyType   = 'string';

    protected $fillable = ['order_id', 'code_enc', 'code_hash', 'revealed_at', 'expires_at'];

    protected $casts = [
        'revealed_at' => 'datetime',
        'expires_at'  => 'datetime',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($m) => $m->id ??= (string) \Illuminate\Support\Str::uuid());
    }

    public function order(): BelongsTo { return $this->belongsTo(DigitalOrder::class, 'order_id'); }
}
