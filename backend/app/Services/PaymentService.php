<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Payment abstraction layer.
 *
 * Current supported methods:
 *   wallet  — deduct from user's wallet balance (live)
 *   card    — stub, returns redirect URL (wire up Moyasar / Tap / HyperPay later)
 *   mada    — stub
 *   stc_pay — stub
 */
class PaymentService
{
    /**
     * Process payment for an order.
     *
     * @return array{success:bool,message:string,redirect_url:string|null}
     */
    public function charge(User $user, float $amount, string $method, string $orderId): array
    {
        return match ($method) {
            'wallet'  => $this->chargeWallet($user, $amount),
            'card'    => $this->chargeCard($user, $amount, $orderId),
            'mada'    => $this->chargeCard($user, $amount, $orderId),
            'stc_pay' => $this->chargeStcPay($user, $amount, $orderId),
            default   => ['success' => false, 'message' => "Unknown payment method: {$method}", 'redirect_url' => null],
        };
    }

    // ── Wallet (live) ─────────────────────────────────────────────────────────

    private function chargeWallet(User $user, float $amount): array
    {
        if (($user->wallet_balance ?? 0) < $amount) {
            return ['success' => false, 'message' => 'Insufficient wallet balance.', 'redirect_url' => null];
        }

        DB::table('users')
            ->where('id', $user->id)
            ->decrement('wallet_balance', $amount);

        return ['success' => true, 'message' => 'Wallet payment successful.', 'redirect_url' => null];
    }

    // ── Card / Mada (stub — wire up gateway later) ────────────────────────────

    private function chargeCard(User $user, float $amount, string $orderId): array
    {
        // TODO: integrate Moyasar / Tap Payments / HyperPay
        // 1. Create payment intent with gateway
        // 2. Return redirect_url for the hosted payment page
        // 3. Webhook handler confirms payment → fulfill order
        Log::info('PaymentService: card payment stub', ['user' => $user->id, 'amount' => $amount, 'order' => $orderId]);

        return [
            'success'      => false,
            'message'      => 'Card payment not yet configured. Please use wallet balance.',
            'redirect_url' => null,
        ];
    }

    // ── STC Pay (stub) ────────────────────────────────────────────────────────

    private function chargeStcPay(User $user, float $amount, string $orderId): array
    {
        // TODO: integrate STC Pay API
        Log::info('PaymentService: STC Pay stub', ['user' => $user->id, 'amount' => $amount]);

        return [
            'success'      => false,
            'message'      => 'STC Pay not yet configured. Please use wallet balance.',
            'redirect_url' => null,
        ];
    }
}
