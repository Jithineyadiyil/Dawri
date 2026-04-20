<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    /**
     * Charge the user. $reference accepts any type (UUID object or string).
     */
    public function charge(
        \App\Models\User $user,
        float $amount,
        string $method,
        mixed $reference   // mixed — accepts Str::uuid() object OR string
    ): array {
        $method = $method ?: 'wallet';

        return match ($method) {
            'wallet'            => $this->chargeWallet($user, $amount),
            'card', 'mada',
            'stc_pay'           => $this->chargeExternal($user, $amount, $method, (string) $reference),
            default             => ['success' => false, 'message' => "Unknown payment method: {$method}"],
        };
    }

    private function chargeWallet(\App\Models\User $user, float $amount): array
    {
        if ($amount <= 0) {
            return ['success' => true, 'message' => 'Zero amount.'];
        }

        $balance = (float) ($user->wallet_balance ?? 0);

        if ($balance < $amount) {
            return [
                'success' => false,
                'message' => "Insufficient wallet balance. Available: {$balance} SAR, required: {$amount} SAR.",
            ];
        }

        $updated = DB::table('users')
            ->where('id', $user->id)
            ->where('wallet_balance', '>=', $amount)
            ->decrement('wallet_balance', $amount);

        if (!$updated) {
            return ['success' => false, 'message' => 'Wallet charge failed. Please retry.'];
        }

        Log::info("Wallet charged {$amount} SAR from user {$user->id}");

        return ['success' => true, 'message' => 'Wallet charged successfully.'];
    }

    private function chargeExternal(
        \App\Models\User $user,
        float $amount,
        string $method,
        string $reference
    ): array {
        if (app()->environment('local', 'testing')) {
            Log::info("PaymentService [SANDBOX] {$method} {$amount} SAR user={$user->id}");
            return ['success' => true, 'message' => "Sandbox {$method} approved."];
        }

        return [
            'success' => false,
            'message' => "Payment method '{$method}' not yet available. Please use wallet.",
        ];
    }

    public function refundWallet(\App\Models\User $user, float $amount): void
    {
        if ($amount <= 0) return;
        DB::table('users')->where('id', $user->id)->increment('wallet_balance', $amount);
        Log::info("Wallet refunded {$amount} SAR to user {$user->id}");
    }
}
