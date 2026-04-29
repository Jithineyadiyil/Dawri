<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * ProductCode — one physical gift card code in the inventory pool.
 *
 * Security:
 *   - `code_enc` is encrypted at rest via Laravel's `encrypted` cast.
 *     MySQL read-only access cannot see plaintext.
 *   - `code_hash` = SHA-256 of plaintext, used for deduplication on upload
 *     (never search by plaintext). Unique index prevents the same code
 *     being inserted twice even across separate batches.
 *
 * State machine:
 *
 *     available ──(reserve)──> reserved ──(deliver)──> delivered
 *         │                        │
 *         │                        └──(release)──> available
 *         │
 *         └──(expire)──> expired
 *
 * Delivered is terminal. Expired rows stay in the DB for audit but are
 * never re-served.
 *
 * @property string              $id
 * @property string              $product_id
 * @property string|null         $batch_id
 * @property string              $code_enc            Plaintext after cast
 * @property string              $code_hash           SHA-256 of plaintext
 * @property string|null         $serial_number
 * @property \Carbon\Carbon|null $expires_at
 * @property string              $status
 * @property string|null         $reserved_by_order_id
 * @property \Carbon\Carbon|null $reserved_at
 * @property \Carbon\Carbon|null $delivered_at
 */
class ProductCode extends Model
{
    use HasUuids;

    public const STATUS_AVAILABLE = 'available';
    public const STATUS_RESERVED  = 'reserved';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_EXPIRED   = 'expired';

    public const STATUSES = [
        self::STATUS_AVAILABLE,
        self::STATUS_RESERVED,
        self::STATUS_DELIVERED,
        self::STATUS_EXPIRED,
    ];

    protected $fillable = [
        'product_id',
        'batch_id',
        'code_enc',
        'code_hash',
        'serial_number',
        'expires_at',
        'status',
        'reserved_by_order_id',
        'reserved_at',
        'delivered_at',
    ];

    protected $casts = [
        'code_enc'     => 'encrypted',
        'expires_at'   => 'date',
        'reserved_at'  => 'datetime',
        'delivered_at' => 'datetime',
    ];

    // Never serialise the encrypted blob or hash accidentally.
    // Controllers reveal the plain code only on explicit admin request.
    protected $hidden = ['code_enc', 'code_hash'];

    /** SHA-256 hash used for deduplication on upload. */
    public static function hashCode(string $plain): string
    {
        return hash('sha256', trim($plain));
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(DigitalProduct::class, 'product_id');
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(CodeBatch::class, 'batch_id');
    }

    /**
     * Scope: codes that can be claimed right now.
     * Excludes expired (by date) and non-available statuses.
     */
    public function scopeClaimable($q)
    {
        return $q->where('status', self::STATUS_AVAILABLE)
            ->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now()->toDateString());
            });
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }

    /** Masked view — first 4 + last 4 — for admin lists. */
    public function maskedCode(): string
    {
        $plain = (string) ($this->code_enc ?? '');
        $len   = strlen($plain);
        if ($len <= 8) {
            return str_repeat('•', max(0, $len));
        }
        return substr($plain, 0, 4) . str_repeat('•', $len - 8) . substr($plain, -4);
    }
}
