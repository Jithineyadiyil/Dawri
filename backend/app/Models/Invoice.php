<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasUuids;

    protected $table = 'invoices';

    protected $fillable = [
        'subscription_id', 'user_id', 'invoice_number', 'subtotal',
        'vat_amount', 'total', 'currency', 'status', 'period_start',
        'period_end', 'paid_at', 'payment_method', 'payment_ref',
        'line_items', 'notes',
    ];

    protected $casts = [
        'subtotal'     => 'float',
        'vat_amount'   => 'float',
        'total'        => 'float',
        'period_start' => 'datetime',
        'period_end'   => 'datetime',
        'paid_at'      => 'datetime',
        'line_items'   => 'array',
    ];

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    /**
     * Generate next invoice number.
     */
    public static function nextNumber(): string
    {
        $year = now()->year;
        $last = static::where('invoice_number', 'like', "INV-{$year}-%")
            ->orderByDesc('invoice_number')
            ->value('invoice_number');

        $seq = $last ? ((int) substr($last, -5)) + 1 : 1;

        return sprintf('INV-%d-%05d', $year, $seq);
    }
}
