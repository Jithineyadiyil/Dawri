<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasUuids;

    protected $table = 'subscriptions';

    protected $fillable = [
        'user_id', 'plan', 'status', 'price', 'billing_cycle',
        'trial_ends_at', 'current_period_start', 'current_period_end',
        'cancelled_at', 'expires_at', 'payment_method', 'payment_ref', 'metadata',
    ];

    protected $casts = [
        'price'                => 'float',
        'trial_ends_at'        => 'datetime',
        'current_period_start' => 'datetime',
        'current_period_end'   => 'datetime',
        'cancelled_at'         => 'datetime',
        'expires_at'           => 'datetime',
        'metadata'             => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function usage(): HasMany
    {
        return $this->hasMany(SubscriptionUsage::class);
    }

    // ── Status helpers ────────────────────────────────────────────────

    public function isActive(): bool
    {
        return in_array($this->status, ['active', 'trial'], true);
    }

    public function onTrial(): bool
    {
        return $this->status === 'trial'
            && $this->trial_ends_at !== null
            && $this->trial_ends_at->isFuture();
    }

    public function isCancelled(): bool
    {
        return $this->cancelled_at !== null;
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired'
            || ($this->current_period_end !== null && $this->current_period_end->isPast());
    }

    // ── Plan helpers ──────────────────────────────────────────────────

    public function planConfig(): array
    {
        return config("plans.plans.{$this->plan}", config('plans.plans.free'));
    }

    public function hasFeature(string $feature): bool
    {
        return (bool) ($this->planConfig()['features'][$feature] ?? false);
    }

    public function getLimit(string $key): int
    {
        return (int) ($this->planConfig()['limits'][$key] ?? 0);
    }

    public function isUnlimited(string $key): bool
    {
        return $this->getLimit($key) === -1;
    }

    /**
     * Check if a usage metric is within the plan limit for the current month.
     */
    public function withinLimit(string $metric): bool
    {
        $limit = $this->getLimit($metric);
        if ($limit === -1) return true; // Unlimited
        if ($limit === 0)  return false;

        $period = now()->format('Y-m');
        $used = $this->usage()
            ->where('metric', $metric)
            ->where('period', $period)
            ->value('count') ?? 0;

        return $used < $limit;
    }

    /**
     * Increment usage for a metric in the current month.
     */
    public function incrementUsage(string $metric, int $amount = 1): void
    {
        $period = now()->format('Y-m');

        SubscriptionUsage::updateOrCreate(
            [
                'subscription_id' => $this->id,
                'metric'          => $metric,
                'period'          => $period,
            ],
            []
        )->increment('count', $amount);
    }
}
