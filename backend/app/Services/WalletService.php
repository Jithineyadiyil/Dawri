<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Wallet service — manages player balance and transaction ledger.
 * Payment gateway integration point: when a gateway is added,
 * call creditWallet() after confirmed payment to top up balance.
 */
class WalletService
{
    /**
     * Get current wallet balance for a user.
     */
    public function getBalance(User $user): float
    {
        return (float) ($user->wallet_balance ?? 0);
    }

    /**
     * Debit wallet for a purchase.
     *
     * @throws RuntimeException If insufficient balance.
     */
    public function debit(User $user, float $amount, string $description, string $refType, string $refId): void
    {
        DB::transaction(function () use ($user, $amount, $description, $refType, $refId): void {
            // Lock the user row to prevent race conditions
            $user = User::lockForUpdate()->findOrFail($user->id);

            $balance = (float) ($user->wallet_balance ?? 0);

            if ($balance < $amount) {
                throw new RuntimeException("Insufficient wallet balance. Available: {$balance} SAR, required: {$amount} SAR.");
            }

            $newBalance = round($balance - $amount, 2);

            $user->update(['wallet_balance' => $newBalance]);

            DB::table('wallet_transactions')->insert([
                'user_id'      => $user->id,
                'type'         => 'debit',
                'amount'       => $amount,
                'balance_after' => $newBalance,
                'description'  => $description,
                'ref_type'     => $refType,
                'ref_id'       => $refId,
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        });
    }

    /**
     * Credit wallet (prize payout or top-up or refund).
     */
    public function credit(User $user, float $amount, string $description, string $refType = 'manual', string $refId = ''): void
    {
        DB::transaction(function () use ($user, $amount, $description, $refType, $refId): void {
            $user = User::lockForUpdate()->findOrFail($user->id);

            $newBalance = round((float) ($user->wallet_balance ?? 0) + $amount, 2);

            $user->update(['wallet_balance' => $newBalance]);

            DB::table('wallet_transactions')->insert([
                'user_id'       => $user->id,
                'type'          => 'credit',
                'amount'        => $amount,
                'balance_after' => $newBalance,
                'description'   => $description,
                'ref_type'      => $refType,
                'ref_id'        => $refId,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);
        });
    }

    /**
     * Get paginated transaction history.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function transactions(User $user, int $perPage = 20)
    {
        return DB::table('wallet_transactions')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }
}
