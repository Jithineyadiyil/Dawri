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
 * Apr 2026 — wallet consolidation:
 *   chargeWallet() and refund() now read/write the `wallets` table (the
 *   same store WalletController, DashboardController, and the frontend
 *   GET /wallet endpoint use). Previously they wrote to the legacy
 *   `users.wallet_balance` column, which was never funded by topUp() and
 *   caused false "Insufficient balance" errors at checkout. Ledger entries
 *   are written to `wallet_transactions` on a best-effort basis.
 *
 * Supported methods:
 *   wallet  — live, decrements wallets.balance in a transaction
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

        // Wallet — direct credit on the wallets table (matches chargeWallet).
        if ($method === 'wallet') {
            return DB::transaction(function () use ($user, $amount, $originalReference) {
                $wallet = DB::table('wallets')->where('user_id', $user->id)->lockForUpdate()->first();
                if ($wallet === null) {
                    // Edge case: original charge somehow happened without a wallet row.
                    // Create one and credit it so the user is made whole.
                    $walletId = (string) \Illuminate\Support\Str::uuid();
                    DB::table('wallets')->insert([
                        'id'         => $walletId,
                        'user_id'    => $user->id,
                        'balance'    => $amount,
                        'currency'   => 'SAR',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $this->writeLedger(
                        walletId:    $walletId,
                        type:        'credit',
                        amount:      $amount,
                        balanceAfter: $amount,
                        reference:   'REFUND-' . $originalReference,
                        description: 'Refund for ' . $originalReference,
                    );
                    return ['success' => true, 'message' => 'Wallet refunded.'];
                }

                DB::table('wallets')->where('id', $wallet->id)->increment('balance', $amount);
                $this->writeLedger(
                    walletId:    $wallet->id,
                    type:        'credit',
                    amount:      $amount,
                    balanceAfter: ((float) $wallet->balance) + $amount,
                    reference:   'REFUND-' . $originalReference,
                    description: 'Refund for ' . $originalReference,
                );
                return ['success' => true, 'message' => 'Wallet refunded.'];
            });
        }

        // Card / Mada / STC Pay — in production, call gateway refund API.
        // In sandbox, credit the wallet (wallets table) as goodwill so the
        // user is made whole.
        if (app()->environment(['local', 'testing', 'development'])) {
            return DB::transaction(function () use ($user, $amount, $originalReference) {
                $wallet = DB::table('wallets')->where('user_id', $user->id)->lockForUpdate()->first();
                if ($wallet === null) {
                    $walletId = (string) \Illuminate\Support\Str::uuid();
                    DB::table('wallets')->insert([
                        'id'         => $walletId,
                        'user_id'    => $user->id,
                        'balance'    => $amount,
                        'currency'   => 'SAR',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $this->writeLedger(
                        walletId:    $walletId,
                        type:        'credit',
                        amount:      $amount,
                        balanceAfter: $amount,
                        reference:   'REFUND-SBX-' . $originalReference,
                        description: 'Sandbox goodwill refund for ' . $originalReference,
                    );
                } else {
                    DB::table('wallets')->where('id', $wallet->id)->increment('balance', $amount);
                    $this->writeLedger(
                        walletId:    $wallet->id,
                        type:        'credit',
                        amount:      $amount,
                        balanceAfter: ((float) $wallet->balance) + $amount,
                        reference:   'REFUND-SBX-' . $originalReference,
                        description: 'Sandbox goodwill refund for ' . $originalReference,
                    );
                }
                return ['success' => true, 'message' => 'Refund credited to wallet (sandbox).'];
            });
        }

        // TODO: production — call Moyasar::refund($originalReference, $amount) etc.
        return ['success' => false, 'message' => 'Gateway refund not yet implemented.'];
    }

    // ── Wallet (live) ─────────────────────────────────────────────────────────
    //
    // Source of truth for wallet balance is the `wallets` table (one row per user,
    // FK on user_id). This matches:
    //   - WalletController::balance()  — what the frontend reads via GET /wallet
    //   - WalletController::topUp()    — what gets credited when the user tops up
    //   - DashboardController          — what the dashboard widgets read
    //
    // Historically chargeWallet read/wrote `users.wallet_balance` instead, which
    // caused false "Insufficient balance" errors at checkout: the user could
    // legitimately have funds in `wallets.balance` but `users.wallet_balance`
    // remained zero (never funded by topUp). This implementation consolidates
    // onto the `wallets` table so reads and writes hit the same store.
    //
    // Ledger entries are best-effort: we write to `wallet_transactions` when
    // the table exists, but a missing/renamed ledger table never blocks a
    // successful charge. The actual money movement is on `wallets.balance`.

    private function chargeWallet(User $user, float $amount, string $reference): array
    {
        return DB::transaction(function () use ($user, $amount, $reference) {
            // Ensure the user has a wallet row. firstOrCreate is idempotent
            // and matches WalletController::topUp's pattern.
            $wallet = DB::table('wallets')->where('user_id', $user->id)->lockForUpdate()->first();
            if ($wallet === null) {
                $walletId = (string) \Illuminate\Support\Str::uuid();
                DB::table('wallets')->insert([
                    'id'         => $walletId,
                    'user_id'    => $user->id,
                    'balance'    => 0,
                    'currency'   => 'SAR',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $wallet = DB::table('wallets')->where('id', $walletId)->lockForUpdate()->first();
            }

            $currentBalance = (float) ($wallet->balance ?? 0);
            if ($currentBalance < $amount) {
                return [
                    'success'      => false,
                    'message'      => 'Insufficient wallet balance.',
                    'redirect_url' => null,
                    'payment_ref'  => null,
                ];
            }

            DB::table('wallets')->where('id', $wallet->id)->decrement('balance', $amount);
            $newBalance = $currentBalance - $amount;

            $this->writeLedger(
                walletId:    $wallet->id,
                type:        'debit',
                amount:      $amount,
                balanceAfter: $newBalance,
                reference:   'WALLET-' . $reference,
                description: 'Marketplace order ' . $reference,
            );

            return [
                'success'      => true,
                'message'      => 'Wallet payment successful.',
                'redirect_url' => null,
                'payment_ref'  => 'WALLET-' . $reference,
            ];
        });
    }

    /**
     * Write a wallet_transactions ledger entry. Best-effort — if the
     * table doesn't exist (e.g. older deployments), the call is silently
     * skipped so the charge/refund itself still completes.
     *
     * @param  string  $walletId      UUID of the wallets row.
     * @param  string  $type          'credit' or 'debit'.
     * @param  float   $amount        Always positive — sign is implied by $type.
     * @param  float   $balanceAfter  Snapshot of balance immediately after this op.
     * @param  string  $reference     External reference (order id, payment ref).
     * @param  string  $description   Human-readable description.
     */
    private function writeLedger(
        string $walletId,
        string $type,
        float $amount,
        float $balanceAfter,
        string $reference,
        string $description,
    ): void {
        try {
            if (! \Illuminate\Support\Facades\Schema::hasTable('wallet_transactions')) {
                return;
            }
            DB::table('wallet_transactions')->insert([
                'id'            => (string) \Illuminate\Support\Str::uuid(),
                'wallet_id'     => $walletId,
                'type'          => $type,
                'amount'        => $amount,
                'balance_after' => $balanceAfter,
                'reference'     => substr($reference, 0, 100),
                'description'   => substr($description, 0, 200),
                'status'        => 'completed',
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);
        } catch (\Throwable $e) {
            // Ledger write failure must not block the actual money movement.
            // Log it, but the transaction wrapping the charge stays intact.
            Log::warning('PaymentService: ledger write failed', [
                'wallet_id' => $walletId,
                'type'      => $type,
                'amount'    => $amount,
                'reference' => $reference,
                'error'     => $e->getMessage(),
            ]);
        }
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
