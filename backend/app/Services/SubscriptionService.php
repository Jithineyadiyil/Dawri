<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Invoice;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use RuntimeException;

/**
 * Manages the full subscription lifecycle for B2B clients.
 */
class SubscriptionService
{
    /**
     * Create or activate a subscription for a user.
     */
    public function subscribe(string $userId, string $plan, ?string $paymentMethod = null): Subscription
    {
        $planConfig = config("plans.plans.{$plan}");
        if (! $planConfig) {
            throw new RuntimeException("Invalid plan: {$plan}");
        }

        if ($planConfig['price'] === null) {
            throw new RuntimeException('Enterprise plan requires custom pricing. Contact sales.');
        }

        return DB::transaction(function () use ($userId, $plan, $planConfig, $paymentMethod) {
            // Cancel any existing active subscription
            Subscription::where('user_id', $userId)
                ->whereIn('status', ['active', 'trial'])
                ->update(['status' => 'cancelled', 'cancelled_at' => now()]);

            $now = now();
            $periodEnd = $now->copy()->addMonth();

            $subscription = Subscription::create([
                'user_id'              => $userId,
                'plan'                 => $plan,
                'status'               => 'active',
                'price'                => $planConfig['price'],
                'billing_cycle'        => $planConfig['billing'] ?? 'monthly',
                'current_period_start' => $now,
                'current_period_end'   => $periodEnd,
                'payment_method'       => $paymentMethod,
            ]);

            // Update user's plan field
            User::where('id', $userId)->update(['subscription_plan' => $plan]);

            // Generate invoice
            $this->createInvoice($subscription);

            Log::info("Subscription created: {$plan} for user {$userId}");

            return $subscription;
        });
    }

    /**
     * Start a free trial on the trial plan (Professional features).
     */
    public function startTrial(string $userId): Subscription
    {
        $existing = Subscription::where('user_id', $userId)
            ->where('status', 'trial')
            ->first();

        if ($existing) {
            throw new RuntimeException('You have already used your free trial.');
        }

        $trialPlan = config('plans.trial_plan', 'professional');
        $trialDays = config('plans.trial_days', 14);

        return DB::transaction(function () use ($userId, $trialPlan, $trialDays) {
            $now = now();

            $subscription = Subscription::create([
                'user_id'              => $userId,
                'plan'                 => $trialPlan,
                'status'               => 'trial',
                'price'                => 0,
                'billing_cycle'        => 'monthly',
                'trial_ends_at'        => $now->copy()->addDays($trialDays),
                'current_period_start' => $now,
                'current_period_end'   => $now->copy()->addDays($trialDays),
            ]);

            User::where('id', $userId)->update(['subscription_plan' => $trialPlan]);

            return $subscription;
        });
    }

    /**
     * Upgrade or downgrade to a different plan.
     */
    public function changePlan(string $userId, string $newPlan): Subscription
    {
        $planConfig = config("plans.plans.{$newPlan}");
        if (! $planConfig || $planConfig['price'] === null) {
            throw new RuntimeException("Cannot switch to plan: {$newPlan}");
        }

        $current = $this->getActive($userId);
        if (! $current) {
            return $this->subscribe($userId, $newPlan);
        }

        if ($current->plan === $newPlan) {
            throw new RuntimeException('You are already on this plan.');
        }

        return DB::transaction(function () use ($current, $newPlan, $planConfig, $userId) {
            $current->update([
                'plan'  => $newPlan,
                'price' => $planConfig['price'],
            ]);

            User::where('id', $userId)->update(['subscription_plan' => $newPlan]);

            // Prorated invoice for upgrade
            $daysLeft = now()->diffInDays($current->current_period_end);
            $totalDays = $current->current_period_start->diffInDays($current->current_period_end);
            if ($totalDays > 0 && $daysLeft > 0) {
                $proratedAmount = round(($planConfig['price'] / $totalDays) * $daysLeft, 2);
                $this->createInvoice($current, $proratedAmount, 'Plan change (prorated)');
            }

            Log::info("Plan changed to {$newPlan} for user {$userId}");

            return $current->fresh();
        });
    }

    /**
     * Cancel a subscription at period end.
     */
    public function cancel(string $userId): Subscription
    {
        $sub = $this->getActive($userId);
        if (! $sub) {
            throw new RuntimeException('No active subscription to cancel.');
        }

        $sub->update([
            'cancelled_at' => now(),
            'expires_at'   => $sub->current_period_end,
        ]);

        Log::info("Subscription cancelled for user {$userId}, expires at {$sub->current_period_end}");

        return $sub;
    }

    /**
     * Immediately expire and downgrade to free.
     */
    public function cancelImmediately(string $userId): void
    {
        DB::transaction(function () use ($userId) {
            Subscription::where('user_id', $userId)
                ->whereIn('status', ['active', 'trial'])
                ->update([
                    'status'       => 'cancelled',
                    'cancelled_at' => now(),
                    'expires_at'   => now(),
                ]);

            User::where('id', $userId)->update(['subscription_plan' => 'free']);
        });
    }

    /**
     * Renew a subscription for a new billing period.
     */
    public function renew(string $subscriptionId): Subscription
    {
        $sub = Subscription::findOrFail($subscriptionId);

        if ($sub->isCancelled()) {
            throw new RuntimeException('Cannot renew a cancelled subscription.');
        }

        $sub->update([
            'current_period_start' => now(),
            'current_period_end'   => now()->addMonth(),
            'status'               => 'active',
        ]);

        $this->createInvoice($sub);

        return $sub;
    }

    /**
     * Get the active subscription for a user.
     */
    public function getActive(string $userId): ?Subscription
    {
        return Subscription::where('user_id', $userId)
            ->whereIn('status', ['active', 'trial'])
            ->latest()
            ->first();
    }

    /**
     * Check if user can perform an action based on plan limits.
     */
    public function canPerform(string $userId, string $feature): bool
    {
        $sub = $this->getActive($userId);
        if (! $sub) {
            // Check free plan features
            return (bool) config("plans.plans.free.features.{$feature}", false);
        }

        return $sub->hasFeature($feature);
    }

    /**
     * Check if user is within a usage limit.
     */
    public function withinLimit(string $userId, string $metric): bool
    {
        $sub = $this->getActive($userId);
        if (! $sub) return false;

        return $sub->withinLimit($metric);
    }

    // ── Private ───────────────────────────────────────────────────────

    private function createInvoice(Subscription $sub, ?float $amount = null, ?string $note = null): Invoice
    {
        $subtotal = $amount ?? $sub->price;
        $vatRate  = (float) config('plans.vat_rate', 0.15);
        $vat      = round($subtotal * $vatRate, 2);

        return Invoice::create([
            'subscription_id' => $sub->id,
            'user_id'         => $sub->user_id,
            'invoice_number'  => Invoice::nextNumber(),
            'subtotal'        => $subtotal,
            'vat_amount'      => $vat,
            'total'           => round($subtotal + $vat, 2),
            'currency'        => 'SAR',
            'status'          => 'pending',
            'period_start'    => $sub->current_period_start,
            'period_end'      => $sub->current_period_end,
            'line_items'      => [
                [
                    'description' => config("plans.plans.{$sub->plan}.name", $sub->plan) . ' Plan',
                    'amount'      => $subtotal,
                ],
            ],
            'notes' => $note,
        ]);
    }
}
