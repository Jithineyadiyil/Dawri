<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Exceptions\OutOfStockException;
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
use App\Services\InventoryCodeService;
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
 * Sprint 5  : distributor-based fulfillment (WUPEX / Reloadly / Jawaker).
 * Sprint 12A: fulfillment_mode branching — inventory-pool products
 *             serve pre-loaded codes; API products still call distributor.
 *
 * Sprint 12A+ hotfix v2: PaymentService::charge actual signature is
 *   charge(User $user, float $amount, string $method, string $reference)
 * — not (user, amount, method, array $meta). Earlier call sites passed
 * an array where a string reference was expected. Fixed throughout.
 */
final class MarketplaceController extends Controller
{
    public function __construct(
        private readonly DistributorRouter    $router,
        private readonly PaymentService       $payment,
        private readonly InventoryCodeService $inventory,
    ) {}

    // ── Catalogue ─────────────────────────────────────────────────────────

    public function products(Request $request): JsonResponse
    {
        $products = DigitalProduct::where('is_active', true)
            ->when($request->filled('category'), fn($q) => $q->where('category', $request->input('category')))
            ->when($request->filled('brand'),    fn($q) => $q->where('brand',    $request->input('brand')))
            ->orderBy('sort_order')->orderBy('brand')->orderBy('face_value')
            ->get();

        return response()->json([
            'data' => DigitalProductResource::collection($products),
        ]);
    }

    // ── Checkout ──────────────────────────────────────────────────────────

    /**
     * Place a new order. Accepts a single product_id (legacy) or a
     * batched items[] cart. Idempotent on idempotency_key.
     *
     * @throws \Throwable
     */
    public function placeOrder(PlaceOrderRequest $request): JsonResponse
    {
        $user           = $request->user();
        $paymentMethod  = (string) $request->input('payment_method', 'wallet');
        $idempotencyKey = (string) ($request->input('idempotency_key') ?: Str::uuid());
        $items          = $request->normalisedItems();

        // Idempotency: return existing orders for this key unchanged.
        $existing = DigitalOrder::where('idempotency_key', $idempotencyKey)
            ->where('user_id', $user->id)
            ->get();
        if ($existing->isNotEmpty()) {
            return response()->json([
                'data'    => DigitalOrderResource::collection($existing),
                'message' => 'Order already processed.',
            ]);
        }

        // Resolve + validate products + compute total
        $products = DigitalProduct::whereIn('id', array_column($items, 'product_id'))->get()->keyBy('id');

        $total = 0.0;
        foreach ($items as $it) {
            $p = $products->get($it['product_id']);
            if (!$p || !$p->is_active) {
                return response()->json([
                    'message' => "Product {$it['product_id']} is unavailable.",
                ], 422);
            }
            $total += ((float) $p->our_price) * (int) ($it['quantity'] ?? 1);
        }

        // Charge payment up front; fulfilment failures refund per-order.
        // Signature: charge(User, float $amount, string $method, string $reference)
        // We pass idempotency_key as the reference — PaymentService uses it
        // to de-dup charges internally.
        $charge = $this->payment->charge($user, (float) $total, $paymentMethod, $idempotencyKey);

        if (!$charge['success']) {
            return response()->json([
                'message' => $charge['message'] ?? 'Payment failed.',
            ], 402);
        }

        $paymentRef = (string) ($charge['payment_ref'] ?? $idempotencyKey);

        // Fulfil each line, tracking refunds needed on failure.
        $orders      = [];
        $refundTotal = 0.0;

        foreach ($items as $it) {
            /** @var DigitalProduct $p */
            $p = $products->get($it['product_id']);
            $qty = (int) ($it['quantity'] ?? 1);

            for ($i = 0; $i < $qty; $i++) {
                $order = $this->fulfilOne(
                    user:           $user,
                    product:        $p,
                    paymentMethod:  $paymentMethod,
                    paymentRef:     $paymentRef,
                    idempotencyKey: $idempotencyKey . '-' . $p->id . '-' . $i,
                );
                $orders[] = $order;

                if ($order->status === 'failed') {
                    $refundTotal += (float) $order->total_price;
                }
            }
        }

        // Refund any failed lines — same signature shape as charge.
        // Reference = original payment ref so operator can trace the
        // partial reversal against the original wallet debit.
        if ($refundTotal > 0) {
            $this->payment->refund($user, (float) $refundTotal, $paymentMethod, $paymentRef);
        }

        // Send confirmation on at least one successful order
        $success = array_filter($orders, fn($o) => $o->status === 'completed');
        if (!empty($success)) {
            try {
                $user->notify(new OrderConfirmationNotification(array_values($success)));
            } catch (\Throwable $e) {
                Log::warning('OrderConfirmationNotification failed', ['err' => $e->getMessage()]);
            }
        }

        return response()->json([
            'data'    => DigitalOrderResource::collection(collect($orders)),
            'message' => count($success) === count($orders)
                            ? 'All items fulfilled.'
                            : 'Order partially fulfilled — failed items refunded.',
        ]);
    }

    /**
     * Fulfill a single unit of product. Routes by fulfillment_mode.
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
                'unit_price'      => (float) $product->our_price,
                'total_price'     => (float) $product->our_price,
                'status'          => 'processing',
                'payment_method'  => $paymentMethod,
                'payment_ref'     => $paymentRef,
            ]);

            if ($product->isInventoryMode()) {
                return $this->fulfilFromInventory($order, $product);
            }

            return $this->fulfilFromDistributor($order, $product);
        });
    }

    /**
     * Sprint 12A — inventory-pool fulfillment path.
     */
    private function fulfilFromInventory(DigitalOrder $order, DigitalProduct $product): DigitalOrder
    {
        try {
            $claim = $this->inventory->claim($product, (string) $order->id);
        } catch (OutOfStockException $e) {
            $order->update(['status' => 'failed']);
            Log::warning('Inventory fulfilment failed — out of stock', [
                'order'   => $order->id,
                'product' => $product->id,
            ]);
            return $order->fresh();
        }

        DigitalCode::create([
            'order_id'    => $order->id,
            'code_enc'    => Crypt::encryptString($claim->code_enc),
            'code_hash'   => hash('sha256', $claim->code_enc),
            'key_version' => (int) config('app.cipher_version', 1),
            'expires_at'  => $claim->expires_at ?? now()->addDays(365),
        ]);

        $this->inventory->deliver($claim);

        $order->update([
            'status'       => 'completed',
            'fulfilled_at' => now(),
        ]);

        return $order->fresh();
    }

    /**
     * Sprint 5 — API distributor fulfillment path.
     */
    private function fulfilFromDistributor(DigitalOrder $order, DigitalProduct $product): DigitalOrder
    {
        $result = $this->router->placeOrder(
            distributorProductId: (string) ($product->distributor_product_id ?? $product->id),
            internalOrderId:      (string) $order->id,
            preferredDistributor: (string) $product->distributor,
            brand:                (string) $product->brand,
        );

        if ($result['success'] && !empty($result['code'])) {
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
                'order'  => $order->id,
                'reason' => $result['message'] ?? 'unknown',
            ]);
        }

        return $order->fresh();
    }

    // ── Code reveal ───────────────────────────────────────────────────────

    public function revealCode(Request $request, string $id): JsonResponse
    {
        $order = DigitalOrder::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->firstOrFail();

        $code = DigitalCode::where('order_id', $order->id)->firstOrFail();

        try {
            $plain = Crypt::decryptString($code->code_enc);
        } catch (\Throwable $e) {
            Log::error('Code decrypt failed', [
                'order_id' => $order->id,
                'err'      => $e->getMessage(),
            ]);
            return response()->json([
                'message' => 'Unable to reveal code. Please contact support.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $code->update(['revealed_at' => $code->revealed_at ?? now()]);

        return response()->json([
            'data' => [
                'order_id'    => $order->id,
                'code'        => $plain,
                'revealed_at' => $code->revealed_at?->toIso8601String(),
                'expires_at'  => $code->expires_at?->toIso8601String(),
            ],
        ]);
    }

    // ── Orders + wallet ───────────────────────────────────────────────────

    public function orders(Request $request): JsonResponse
    {
        $orders = DigitalOrder::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(25);

        return response()->json([
            'data' => DigitalOrderResource::collection($orders),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page'    => $orders->lastPage(),
                'total'        => $orders->total(),
            ],
        ]);
    }

    public function wallet(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'data' => [
                'balance'  => (float) ($user->wallet_balance ?? 0),
                'currency' => 'SAR',
            ],
        ]);
    }

    public function topUp(TopUpRequest $request): JsonResponse
    {
        $user   = $request->user();
        $amount = (float) $request->input('amount');
        $method = (string) $request->input('payment_method');
        $ref    = (string) ($request->input('reference') ?: Str::uuid());

        // Same (User, float $amount, string $method, string $reference) signature.
        $charge = $this->payment->charge($user, $amount, $method, $ref);

        if (!$charge['success']) {
            return response()->json([
                'message' => $charge['message'] ?? 'Top-up failed.',
            ], 402);
        }

        $user->increment('wallet_balance', $amount);

        return response()->json([
            'message' => 'Wallet topped up.',
            'data'    => [
                'balance' => (float) $user->fresh()->wallet_balance,
                'amount'  => $amount,
            ],
        ]);
    }
}
