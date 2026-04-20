<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function current(Request $request): JsonResponse
    {
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->latest()
            ->first();

        return response()->json([
            'data' => $subscription ? [
                'id'                   => $subscription->id,
                'plan'                 => $subscription->plan,
                'status'               => $subscription->status,
                'current_period_end'   => $subscription->expires_at?->toIso8601String(),
                'cancel_at_period_end' => false,
            ] : null,
        ]);
    }

    public function plans(): JsonResponse
    {
        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($p) => [
                'key'            => $p->key,
                'name'           => $p->name,
                'price_monthly'  => (float) ($p->price ?? 0),
                'price_annually' => (float) ($p->price ?? 0) * 10,
                'currency'       => 'SAR',
                'features'       => $this->buildFeatureList($p),
            ]);

        return response()->json(['data' => $plans]);
    }

    private function buildFeatureList($plan): array
    {
        return match ($plan->key) {
            'free' => [
                'Join unlimited public tournaments',
                'All 4 bracket formats',
                'Receive digital prize rewards',
                'Player ranking & leaderboard',
                'Match history & stats',
            ],
            'starter' => [
                'Everything in Free',
                "Create up to {$plan->limit_tournaments_per_month} tournaments/month",
                "Up to {$plan->limit_max_participants} participants per tournament",
                'Department engagement reports',
                'CSV employee import',
                'Email support',
            ],
            'professional' => [
                'Everything in Starter',
                'Unlimited tournaments',
                "Up to {$plan->limit_max_participants} participants",
                'SAP / Oracle / Workday integration',
                'White label subdomain',
                'Bulk prize distribution',
                'Priority support',
            ],
            'enterprise' => [
                'Everything in Professional',
                "Up to {$plan->limit_max_participants} participants",
                'Dedicated account manager',
                'Custom SLA',
                'SAML 2.0 / OIDC SSO',
                'Advanced analytics',
                'On-site onboarding',
            ],
            default => [],
        };
    }

    public function subscribe(Request $request): JsonResponse
    {
        $request->validate([
            'plan' => ['required', 'string', 'exists:plans,key'],
        ]);

        $user = $request->user();
        $plan = Plan::where('key', $request->input('plan'))->firstOrFail();

        // Cancel existing active subscription
        Subscription::where('user_id', $user->id)
            ->where('status', 'active')
            ->update(['status' => 'cancelled']);

        $subscription = DB::transaction(function () use ($user, $plan) {
            $sub = Subscription::create([
                'user_id'    => $user->id,
                'plan'       => $plan->key,
                'status'     => 'active',
                'starts_at'            => now(),
                'current_period_start' => now(),
                'current_period_end'   => now()->addYear(),
                'expires_at' => now()->addYear(),
            ]);

            // Create invoice for paid plans
            if (($plan->price ?? 0) > 0) {
                $amount = (float) $plan->price;
                $vat    = round($amount * 0.15, 2); // 15% VAT (Saudi)
                $total  = $amount + $vat;

                DB::table('invoices')->insert([
                    'id'              => (string) Str::uuid(),
                    'user_id'         => $user->id,
                    'subscription_id' => (string) $sub->id,
                    'plan'            => $plan->key,
                    'invoice_number'  => 'INV-' . strtoupper(Str::random(8)),
                    'subtotal'        => $amount,
                    'vat_amount'      => $vat,
                    'total'           => $total,
                    'amount'          => $total,
                    'currency'        => 'SAR',
                    'status'          => 'paid',
                    'description'     => "{$plan->name} Plan — Annual Subscription",
                    'invoice_url'     => null,
                    'period_start'    => now(),
                    'period_end'      => now()->addYear(),
                    'paid_at'         => now(),
                    'payment_method'  => 'card',
                    'payment_ref'     => 'DUMMY-' . strtoupper(Str::random(10)),
                    'line_items'      => null,
                    'notes'           => null,
                    'invoice_url'     => null,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }

            return $sub;
        });

        try { $user->forceFill(['subscription_plan' => $plan->key])->save(); } catch (\Throwable) {}

        Log::info("Subscription created: {$plan->key} for user {$user->id}");

        return response()->json([
            'data' => [
                'id'                   => $subscription->id,
                'plan'                 => $subscription->plan,
                'status'               => $subscription->status,
                'current_period_end'   => $subscription->expires_at?->toIso8601String(),
                'cancel_at_period_end' => false,
            ],
        ], 201);
    }

    public function change(Request $request): JsonResponse
    {
        return $this->subscribe($request);
    }

    public function cancel(Request $request): JsonResponse
    {
        $updated = Subscription::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->update(['status' => 'cancelled']);

        if (!$updated) {
            return response()->json(['message' => 'No active subscription found.'], 404);
        }

        return response()->json(['message' => 'Subscription cancelled.']);
    }

    public function invoices(Request $request): JsonResponse
    {
        $invoices = DB::table('invoices')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($inv) => [
                'id'          => $inv->id,
                'amount'      => (float) ($inv->total ?? $inv->amount ?? 0),
                'currency'    => $inv->currency,
                'status'      => $inv->status,
                'description' => $inv->description ?? "{$inv->plan} Plan Subscription",
                'invoice_url' => "http://localhost:8001/api/v1/invoices/{$inv->id}/download",
                'created_at'  => $inv->created_at,
            ]);

        return response()->json(['data' => $invoices]);
    }
}
