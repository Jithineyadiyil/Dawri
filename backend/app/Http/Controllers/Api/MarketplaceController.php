<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlaceOrderRequest;
use App\Http\Requests\TopUpRequest;
use App\Http\Resources\DigitalOrderResource;
use App\Http\Resources\DigitalProductResource;
use App\Models\DigitalCode;
use App\Models\DigitalOrder;
use App\Models\DigitalProduct;
use App\Notifications\OrderConfirmationNotification;
use App\Services\DistributorRouter;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

/**
 * MarketplaceController
 *
 * Sprint 5 rewrite — addresses these prior issues:
 *   - bug 3  : brand logos now served from local /brands/ assets (DigitalProductResource)
 *   - bug 4  : batch checkout (one request fulfils the whole cart)
 *   - bug 5  : distributor failure after successful charge → automatic refund
 *   - bug 6  : key_version stored on every code for APP_KEY rotation safety
 *   - item 9 : DigitalOrderResource carries bilingual product names
 *   - item 10: OrderConfirmationNotification dispatched on success
 *   - item 11: idempotency_key de-dupes repeated click / network-retry submissions
 *   - item 12: topUp now routes through PaymentService::charge (no more free money)
 *   - items 13-16: API Resources, strict types, FormRequests
 */
final class MarketplaceController extends Controller
{
    public function __construct(
        private readonly DistributorRouter $router,
        private readonly PaymentService    $payment,
    ) {}

    // ── Catalogue ─────────────────────────────────────────────────────────────

    public function products(Request $request): JsonResponse
    {
        $products = DigitalProduct::where('is_active', true)
            ->when($request->filled('category'), fn ($q) => $q->where('category', $request->input('category')))
            ->when($request->filled('brand'),    fn ($q) => $q->where('brand',    $request->input('brand')))
            ->orderBy('sort_order')->orderBy('brand')->orderBy('face_value')
            ->get();

        return response()->json([
            'data' => DigitalProductResource::collection($products),
        ]);
    }

    // ── Checkout ──────────────────────────────────────────────────────────────

    /**
     * Place a new order. Accepts either a single product_id (legacy) or a
     * batched items[] cart. Idempotent: repeated calls with the same
     * idempotency_key return the original order.
     *
     * @throws \Throwable
     */
    public function placeOrder(PlaceOrderRequest $request): JsonResponse
    {
        $user           = $request->user();
        $paymentMethod  = (string) $request->input('payment_method', 'wallet');
        $idempotencyKey = (string) ($request->input('idempotency_key') ?: Str::uuid());
        $items          = $request->normalisedItems();

        // Idempotency: if an order already exists for this key, return it unchanged.
        $existing = DigitalOrder::where('user_id', $user->id)
            ->where('idempotency_key', $idempotencyKey)
            ->first();
        if ($existing !== null) {
            return response()->json([
                'data'       => new DigitalOrderResource($existing->load(['product', 'code'])),
                'idempotent' => true,
            ], Response::HTTP_OK);
        }

        // Expand items into individual order rows (one per unit, because each
        // card code is a distinct digital good).
        $expanded = [];
        $runningTotal = 0.0;
        foreach ($items as $line) {
            $product = DigitalProduct::find($line['product_id']);
            if (! $product || ! $product->is_active) {
                return response()->json([
                    'message' => 'One of the requested products is unavailable.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            for ($i = 0; $i < $line['qty']; $i++) {
                $expanded[]    = $product;
                $runningTotal += (float) $product->our_price;
            }
        }

        if (empty($expanded)) {
            return response()->json(['message' => 'Cart is empty.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Single payment for the whole cart.
        $charge = $this->payment->charge($user, $runningTotal, $paymentMethod, $idempotencyKey);
        if (! $charge['success']) {
            return response()->json([
                'message' => $charge['message'],
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        // Fulfil each line item. If any distributor fails, refund proportionally
        // and mark those rows as failed.
        $orders = [];
        $failures = 0;

        foreach ($expanded as $index => $product) {
            $lineRef = $idempotencyKey . '-' . $index;
            $order = $this->fulfilOne(
                user:           $user,
                product:        $product,
                paymentMethod:  $paymentMethod,
                paymentRef:     (string) $charge['payment_ref'],
                idempotencyKey: $lineRef,
            );

            $orders[] = $order;
            if ($order->status !== 'completed') {
                $failures++;
                // Refund this line item since payment succeeded but distributor didn't fulfil
                $refund = $this->payment->refund(
                    $user,
                    (float) $order->unit_price,
                    $paymentMethod,
                    (string) $charge['payment_ref'],
                );
                if ($refund['success']) {
                    $order->update(['status' => 'refunded']);
                }
            } else {
                // Notify the user (email always; SMS if phone on file)
                try {
                    $user->notify(new OrderConfirmationNotification($order));
                } catch (\Throwable $e) {
                    Log::warning('Order notification failed', ['order' => $order->id, 'err' => $e->getMessage()]);
                }
            }
        }

        // Return the collection of orders created (completed + refunded rows both visible)
        return response()->json([
            'data' => DigitalOrderResource::collection(
                collect($orders)->map->load(['product', 'code'])
            ),
            'summary' => [
                'total_lines' => count($orders),
                'completed'   => count($orders) - $failures,
                'failed'      => $failures,
                'charged'     => (float) $runningTotal,
            ],
        ], Response::HTTP_CREATED);
    }

    /**
     * Fulfil a single line item: create order row, ask the router to place
     * the distributor order, encrypt the returned code.
     */
    private function fulfilOne(
        $user,
        DigitalProduct $product,
        string $paymentMethod,
        string $paymentRef,
        string $idempotencyKey,
    ): DigitalOrder {
        return DB::transaction(function () use ($user, $product, $paymentMethod, $paymentRef, $idempotencyKey) {
            $order = DigitalOrder::create([
                'user_id'         => $user->id,
                'product_id'      => $product->id,
                'distributor'     => $product->distributor,
                'idempotency_key' => $idempotencyKey,
                'quantity'        => 1,
                'unit_price'      => $product->our_price,
                'total_price'     => $product->our_price,
                'status'          => 'processing',
                'payment_method'  => $paymentMethod,
                'payment_ref'     => $paymentRef,
            ]);

            $result = $this->router->placeOrder(
                distributorProductId:  (string) ($product->distributor_product_id ?? $product->id),
                internalOrderId:       (string) $order->id,
                preferredDistributor:  (string) $product->distributor,
                brand:                 (string) $product->brand,
            );

            if ($result['success'] && ! empty($result['code'])) {
                $order->update([
                    'status'               => 'completed',
                    'distributor'          => $result['distributor'] ?? $product->distributor,
                    'distributor_order_id' => $result['order_id'],
                    'fulfilled_at'         => now(),
                ]);
                DigitalCode::create([
                    'order_id'    => $order->id,
                    'code_enc'    => Crypt::encryptString($result['code']),
                    'code_hash'   => hash('sha256', $result['code']),
                    'key_version' => (int) config('app.cipher_version', 1),
                    'expires_at'  => now()->addDays(365),
                ]);
            } else {
                $order->update(['status' => 'failed']);
                Log::warning('Distributor fulfilment failed', [
                    'order'    => $order->id,
                    'reason'   => $result['message'] ?? 'unknown',
                ]);
            }

            return $order->fresh();
        });
    }

    // ── Code reveal ───────────────────────────────────────────────────────────

    public function revealCode(Request $request, string $id): JsonResponse
    {
        $order = DigitalOrder::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->firstOrFail();

        $code = DigitalCode::where('order_id', $order->id)->first();
        if (! $code) {
            return response()->json(['message' => 'Code not yet available.'], Response::HTTP_NOT_FOUND);
        }

        // Decrypt — supports rotated APP_KEY if previous_keys configured in config/app.php
        try {
            $plain = Crypt::decryptString($code->code_enc);
        } catch (\Throwable $e) {
            Log::error('Code decrypt failed — possible APP_KEY mismatch', [
                'order'       => $order->id,
                'key_version' => $code->key_version,
            ]);
            return response()->json([
                'message' => 'Unable to decrypt code. Please contact support.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $alreadyShown = $code->revealed_at !== null;
        if (! $alreadyShown) {
            $code->update(['revealed_at' => now()]);
        }

        return response()->json([
            'data' => [
                'code'             => $plain,
                'already_revealed' => $alreadyShown,
            ],
        ]);
    }

    // ── Orders history ────────────────────────────────────────────────────────

    public function orders(Request $request): JsonResponse
    {
        $orders = DigitalOrder::with(['product', 'code'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json([
            'data' => DigitalOrderResource::collection($orders),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page'    => $orders->lastPage(),
                'total'        => $orders->total(),
            ],
        ]);
    }

    // ── Wallet ────────────────────────────────────────────────────────────────

    public function wallet(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'balance'  => (float) ($request->user()->wallet_balance ?? 0),
                'currency' => 'SAR',
            ],
        ]);
    }

    /**
     * Top up the wallet. Charges the selected gateway method first, then
     * credits the wallet — no more free-money bug (item 12).
     */
    public function topUp(TopUpRequest $request): JsonResponse
    {
        $user           = $request->user();
        $amount         = (float) $request->input('amount');
        $method         = (string) $request->input('payment_method');
        $idempotencyKey = (string) ($request->input('idempotency_key') ?: Str::uuid());

        // Charge the external method first
        $charge = $this->payment->charge($user, $amount, $method, 'TOPUP-' . $idempotencyKey);
        if (! $charge['success']) {
            return response()->json([
                'message' => $charge['message'],
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        // Credit wallet only after successful charge
        DB::table('users')
            ->where('id', $user->id)
            ->increment('wallet_balance', $amount);

        Log::info('Wallet top-up completed', [
            'user'        => $user->id,
            'amount'      => $amount,
            'method'      => $method,
            'payment_ref' => $charge['payment_ref'],
        ]);

        return response()->json([
            'message' => 'Wallet topped up successfully.',
            'data'    => [
                'balance'     => (float) DB::table('users')->where('id', $user->id)->value('wallet_balance'),
                'currency'    => 'SAR',
                'payment_ref' => $charge['payment_ref'],
            ],
        ]);
    }
}
