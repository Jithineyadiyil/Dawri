<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * PaymentService
 *
 * Sprint 5 enhancements:
 *   - Added refund() method to support rollback when distributor fulfillment
 *     fails AFTER a successful charge (bug 5).
 *   - Added chargeCardSandbox() that accepts dev-mode approvals so the card
 *     payment path can complete end-to-end in dev without a live gateway.
 *   - Top-up charges now route through charge() instead of directly
 *     incrementing wallet balance (bug 12).
 *
 * Supported methods:
 *   wallet  — live, decrements user.wallet_balance in a transaction
 *   card    — SANDBOX-OK in non-production; TODO: Moyasar/Tap in prod
 *   mada    — same as card path
 *   stc_pay — stub; logs and refuses unless DEV
 */
final class PaymentService
{
    /**
     * Process payment for an order.
     *
     * @return array{success:bool,message:string,redirect_url:?string,payment_ref:?string}
     */
    public function charge(User $user, float $amount, string $method, string $reference): array
    {
        if ($amount <= 0) {
            return ['success' => false, 'message' => 'Invalid amount.', 'redirect_url' => null, 'payment_ref' => null];
        }

        return match ($method) {
            'wallet'  => $this->chargeWallet($user, $amount, $reference),
            'card'    => $this->chargeCardOrMada($user, $amount, $reference, 'card'),
            'mada'    => $this->chargeCardOrMada($user, $amount, $reference, 'mada'),
            'stc_pay' => $this->chargeStcPay($user, $amount, $reference),
            default   => [
                'success'      => false,
                'message'      => "Unknown payment method: {$method}",
                'redirect_url' => null,
                'payment_ref'  => null,
            ],
        };
    }

    /**
     * Refund a previously charged payment.
     *
     * Wallet refunds are immediate; gateway refunds in production would
     * call the gateway's refund API. In sandbox, this logs and credits the
     * wallet as goodwill.
     *
     * @return array{success:bool,message:string}
     */
    public function refund(User $user, float $amount, string $method, string $originalReference): array
    {
        if ($amount <= 0) {
            return ['success' => false, 'message' => 'Invalid refund amount.'];
        }

        Log::info('PaymentService::refund', [
            'user'      => $user->id,
            'amount'    => $amount,
            'method'    => $method,
            'reference' => $originalReference,
        ]);

        // Wallet — direct credit
        if ($method === 'wallet') {
            DB::table('users')->where('id', $user->id)->increment('wallet_balance', $amount);
            return ['success' => true, 'message' => 'Wallet refunded.'];
        }

        // Card / Mada / STC Pay — in production, call gateway refund API.
        // In sandbox, credit the wallet as goodwill so the user is made whole.
        if (app()->environment(['local', 'testing', 'development'])) {
            DB::table('users')->where('id', $user->id)->increment('wallet_balance', $amount);
            return ['success' => true, 'message' => 'Refund credited to wallet (sandbox).'];
        }

        // TODO: production — call Moyasar::refund($originalReference, $amount) etc.
        return ['success' => false, 'message' => 'Gateway refund not yet implemented.'];
    }

    // ── Wallet (live) ─────────────────────────────────────────────────────────

    private function chargeWallet(User $user, float $amount, string $reference): array
    {
        return DB::transaction(function () use ($user, $amount, $reference) {
            // Lock the user row to prevent concurrent-deduction races
            $fresh = DB::table('users')->where('id', $user->id)->lockForUpdate()->first();

            if ((float) ($fresh->wallet_balance ?? 0) < $amount) {
                return [
                    'success'      => false,
                    'message'      => 'Insufficient wallet balance.',
                    'redirect_url' => null,
                    'payment_ref'  => null,
                ];
            }

            DB::table('users')->where('id', $user->id)->decrement('wallet_balance', $amount);

            return [
                'success'      => true,
                'message'      => 'Wallet payment successful.',
                'redirect_url' => null,
                'payment_ref'  => 'WALLET-' . $reference,
            ];
        });
    }

    // ── Card / Mada ───────────────────────────────────────────────────────────

    private function chargeCardOrMada(User $user, float $amount, string $reference, string $brand): array
    {
        // Sandbox: auto-approve so the full flow can be tested without a gateway.
        // Production: integrate Moyasar / Tap Payments / HyperPay.
        if (app()->environment(['local', 'testing', 'development'])) {
            Log::info("PaymentService: {$brand} sandbox approved", [
                'user'      => $user->id,
                'amount'    => $amount,
                'reference' => $reference,
            ]);
            return [
                'success'      => true,
                'message'      => ucfirst($brand) . ' payment approved (sandbox).',
                'redirect_url' => null,
                'payment_ref'  => strtoupper($brand) . '-SBX-' . substr(md5($reference), 0, 12),
            ];
        }

        // TODO: production
        // 1. $intent = Moyasar::createPayment(['amount' => $amount*100, 'source' => ['type' => $brand], 'callback_url' => route('marketplace.callback')]);
        // 2. return ['redirect_url' => $intent['source']['transaction_url'], ...];
        Log::warning('PaymentService: card payment attempted in production without gateway config');

        return [
            'success'      => false,
            'message'      => 'Card payment gateway not configured.',
            'redirect_url' => null,
            'payment_ref'  => null,
        ];
    }

    // ── STC Pay ───────────────────────────────────────────────────────────────

    private function chargeStcPay(User $user, float $amount, string $reference): array
    {
        if (app()->environment(['local', 'testing', 'development'])) {
            return [
                'success'      => true,
                'message'      => 'STC Pay approved (sandbox).',
                'redirect_url' => null,
                'payment_ref'  => 'STC-SBX-' . substr(md5($reference), 0, 12),
            ];
        }

        Log::info('PaymentService: STC Pay stub in production');
        return [
            'success'      => false,
            'message'      => 'STC Pay gateway not configured.',
            'redirect_url' => null,
            'payment_ref'  => null,
        ];
    }
}
