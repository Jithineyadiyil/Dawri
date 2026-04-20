<?php
declare(strict_types=1);
namespace App\Models;
use Illuminate\Database\Eloquent\{Model, Factories\HasFactory};
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class WalletLedger extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['wallet_id','amount','type','reference_id','description','created_at'];
    protected $casts = ['amount'=>'float','created_at'=>'datetime'];
    protected static function boot(): void {
        parent::boot();
        static::creating(fn($m) => $m->id ??= Str::uuid()->toString());
    }
    public function wallet(): BelongsTo { return $this->belongsTo(Wallet::class); }
}
