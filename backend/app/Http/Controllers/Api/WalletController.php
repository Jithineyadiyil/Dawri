<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\WalletLedger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * GET /api/v1/wallet
     */
    public function balance(Request $request): JsonResponse
    {
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['balance' => 0, 'currency' => 'SAR']
        );

        return response()->json([
            'data' => [
                'balance'  => (float) $wallet->balance,
                'currency' => $wallet->currency ?? 'SAR',
            ],
        ]);
    }

    /**
     * POST /api/v1/wallet/topup
     */
    public function topUp(Request $request): JsonResponse
    {
        $request->validate([
            'amount'         => ['required', 'numeric', 'min:10', 'max:10000'],
            'payment_method' => ['nullable', 'string', 'in:mada,stc_pay,credit_card'],
        ]);

        $wallet = Wallet::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['balance' => 0, 'currency' => 'SAR']
        );

        $amount = (float) $request->input('amount');
        $wallet->increment('balance', $amount);

        // Record ledger entry
        if (class_exists(WalletLedger::class)) {
            WalletLedger::create([
                'wallet_id'   => $wallet->id,
                'user_id'     => $request->user()->id,
                'type'        => 'credit',
                'amount'      => $amount,
                'balance'     => $wallet->balance,
                'description' => 'Top-up via ' . ($request->input('payment_method') ?? 'card'),
                'reference'   => 'TOPUP-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            ]);
        }

        return response()->json([
            'message' => 'Wallet topped up successfully.',
            'data'    => ['balance' => (float) $wallet->balance],
        ]);
    }

    /**
     * GET /api/v1/wallet/transactions
     */
    public function transactions(Request $request): JsonResponse
    {
        $transactions = [];

        if (class_exists(WalletLedger::class)) {
            $wallet = Wallet::where('user_id', $request->user()->id)->first();
            if ($wallet) {
                $transactions = WalletLedger::where('wallet_id', $wallet->id)
                    ->orderByDesc('created_at')
                    ->limit(50)
                    ->get(['id', 'type', 'amount', 'balance', 'description', 'reference', 'created_at'])
                    ->toArray();
            }
        }

        return response()->json(['data' => $transactions]);
    }
}
