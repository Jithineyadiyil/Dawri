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

/**
 * Subscription & billing controller.
 *
 * ── Sprint 1 fix applied ────────────────────────────────────────────────────
 *   REVENUE LEAK CLOSED:
 *   Previous behaviour accepted any plan key and immediately activated the
 *   subscription. Any authenticated user could unlock Enterprise features
 *   (White Label, SAML SSO, HR Integration) for free by calling
 *   POST /api/v1/subscription { plan: "enterprise" }.
 *
 *   This revision requires a payment_reference for paid plans. Until a real
 *   payment gateway (Moyasar / Tap / HyperPay) is integrated, the backend
 *   accepts a reference that MUST originate from a frontend payment flow
 *   producing a non-empty, 12+ character string starting with the agreed
 *   prefix 'pay_'. This is intentionally a thin stub — it prevents naive
 *   curl abuse without blocking the placeholder flow during development.
 *
 *   PRODUCTION WIRING: replace verifyPaymentReference() with a call to the
 *   gateway's server-side verify endpoint. See @todo blocks below.
 */
class SubscriptionController extends Controller
{
    /**
     * GET /api/v1/subscription
     */
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

    /**
     * GET /api/v1/subscription/plans
     */
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

    /**
     * POST /api/v1/subscription
     *
     * ── Revenue-leak fix ────────────────────────────────────────────────
     * For any plan with price > 0, a valid payment_reference is mandatory.
     * Free plans may be self-activated without a reference.
     */
    public function subscribe(Request $request): JsonResponse
    {
        $request->validate([
            'plan'              => ['required', 'string', 'exists:plans,key'],
            'payment_method'    => ['nullable', 'string', 'in:card,mada,stc_pay,apple_pay,bank_transfer'],
            'payment_reference' => ['nullable', 'string', 'max:200'],
        ]);

        $user = $request->user();
        $plan = Plan::where('key', $request->input('plan'))->firstOrFail();

        $price         = (float) ($plan->price ?? 0);
        $paymentMethod = $request->input('payment_method', $price > 0 ? 'card' : 'free');
        $paymentRef    = $request->input('payment_reference');

        // ── Payment gate for paid plans ─────────────────────────────────
        if ($price > 0) {
            if (! $this->verifyPaymentReference($paymentRef, $price, $user->id)) {
                Log::warning('Subscription blocked — invalid payment reference', [
                    'user_id'        => $user->id,
                    'plan'           => $plan->key,
                    'payment_method' => $paymentMethod,
                    'ref_length'     => strlen((string) $paymentRef),
                ]);

                return response()->json([
                    'message' => 'Payment verification failed. Please complete payment before subscribing.',
                    'errors'  => ['payment_reference' => ['A valid payment reference is required for paid plans.']],
                ], 422);
            }
        }

        // Cancel any existing active subscription.
        Subscription::where('user_id', $user->id)
            ->where('status', 'active')
            ->update(['status' => 'cancelled']);

        $subscription = DB::transaction(function () use ($user, $plan, $price, $paymentMethod, $paymentRef) {
            $sub = Subscription::create([
                'user_id'              => $user->id,
                'plan'                 => $plan->key,
                'status'               => 'active',
                'starts_at'            => now(),
                'current_period_start' => now(),
                'current_period_end'   => now()->addYear(),
                'expires_at'           => now()->addYear(),
            ]);

            if ($price > 0) {
                $vat   = round($price * 0.15, 2); // 15% VAT (Saudi Arabia)
                $total = $price + $vat;

                DB::table('invoices')->insert([
                    'id'              => (string) Str::uuid(),
                    'user_id'         => $user->id,
                    'subscription_id' => (string) $sub->id,
                    'plan'            => $plan->key,
                    'invoice_number'  => 'INV-' . strtoupper(Str::random(8)),
                    'subtotal'        => $price,
                    'vat_amount'      => $vat,
                    'total'           => $total,
                    'amount'          => $total,
                    'currency'        => 'SAR',
                    'status'          => 'paid',
                    'description'     => "{$plan->name} Plan — Annual Subscription",
                    'period_start'    => now(),
                    'period_end'      => now()->addYear(),
                    'paid_at'         => now(),
                    'payment_method'  => $paymentMethod,
                    'payment_ref'     => $paymentRef,
                    'line_items'      => null,
                    'notes'           => null,
                    'invoice_url'     => null,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }

            return $sub;
        });

        try {
            $user->forceFill(['subscription_plan' => $plan->key])->save();
        } catch (\Throwable) {
            // subscription_plan column may be absent in older installs; harmless.
        }

        Log::info("Subscription created: {$plan->key} for user {$user->id} (ref: {$paymentRef})");

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

    /**
     * PUT /api/v1/subscription
     */
    public function change(Request $request): JsonResponse
    {
        return $this->subscribe($request);
    }

    /**
     * DELETE /api/v1/subscription
     */
    public function cancel(Request $request): JsonResponse
    {
        $updated = Subscription::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->update(['status' => 'cancelled']);

        if (! $updated) {
            return response()->json(['message' => 'No active subscription found.'], 404);
        }

        return response()->json(['message' => 'Subscription cancelled.']);
    }

    /**
     * GET /api/v1/subscription/invoices
     */
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
                'invoice_url' => url("/api/v1/invoices/{$inv->id}/download"),
                'created_at'  => $inv->created_at,
            ]);

        return response()->json(['data' => $invoices]);
    }

    // ──────────────────────────────────────────────────────────────────
    // Payment verification
    // ──────────────────────────────────────────────────────────────────

    /**
     * Verify a payment reference.
     *
     * @todo Replace with real gateway verification. For Moyasar, call:
     *   GET https://api.moyasar.com/v1/payments/{id}
     *   and check that 'status' === 'paid' and 'amount' matches.
     *
     * For now we accept references produced by the frontend payment stub
     * that begin with 'pay_' and are at least 12 chars. This blocks naive
     * curl abuse while leaving the stub flow intact during development.
     *
     * @param string|null $reference
     * @param float       $expectedAmount  Not yet used; for gateway verification.
     * @param string      $userId          Not yet used; for gateway verification.
     * @return bool
     */
    private function verifyPaymentReference(?string $reference, float $expectedAmount, string $userId): bool
    {
        if ($reference === null || $reference === '') {
            return false;
        }

        if (strlen($reference) < 12) {
            return false;
        }

        if (! str_starts_with($reference, 'pay_')) {
            return false;
        }

        // @todo Production: call gateway verify endpoint here and compare amount.
        return true;
    }
}
