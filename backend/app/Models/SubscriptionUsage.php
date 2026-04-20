<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubscriptionUsage extends Model
{
    use HasUuids;

    protected $table = 'subscription_usage';

    protected $fillable = ['subscription_id', 'metric', 'count', 'period'];

    protected $casts = ['count' => 'integer'];

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}
