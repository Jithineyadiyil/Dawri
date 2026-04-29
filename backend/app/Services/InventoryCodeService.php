<?php

declare(strict_types=1);

namespace App\Services;

use App\Exceptions\OutOfStockException;
use App\Models\CodeBatch;
use App\Models\DigitalProduct;
use App\Models\ProductCode;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * InventoryCodeService — inventory-pool lifecycle.
 *
 * v2 additions:
 *   summaryByDistributor() — per-distributor roll-up for admin cards.
 *
 * Public API:
 *   uploadBatch(product, rows, meta)   — dedupe + persist batch + codes.
 *   claim(product, orderId)            — atomic FOR UPDATE reserve.
 *   deliver(code)                      — terminal + auto-hide hook.
 *   release(code)                      — idempotent return-to-pool.
 *   markExpired()                      — nightly sweep.
 *   availableCount(productId)          — cheap count.
 *   stockBreakdown(productId)          — per-product admin numbers.
 *   summaryByDistributor()             — per-distributor roll-up (new).
 */
class InventoryCodeService
{
    /**
     * Bulk upload codes into the pool.
     *
     * @param  DigitalProduct $product
     * @param  array<int, array{code:string, serial?:?string, expires_at?:?string}> $rows
     * @param  array{
     *             supplier_name:string,
     *             supplier_ref?:?string,
     *             source?:string,
     *             unit_cost_sar?:?float,
     *             notes?:?string,
     *             uploaded_by_user_id?:?string
     *         } $batchMeta
     */
    public function uploadBatch(
        DigitalProduct $product,
        array $rows,
        array $batchMeta
    ): array {
        return DB::transaction(function () use ($product, $rows, $batchMeta) {
            $inserted     = 0;
            $duplicates   = 0;
            $invalid      = 0;
            $sampleErrors = [];

            $seenHashes = [];
            $cleanRows  = [];

            foreach ($rows as $i => $row) {
                $code = isset($row['code']) ? trim((string) $row['code']) : '';
                if ($code === '') {
                    $invalid++;
                    if (count($sampleErrors) < 5) {
                        $sampleErrors[] = 'Row ' . ($i + 1) . ': empty code';
                    }
                    continue;
                }
                if (strlen($code) > 500) {
                    $invalid++;
                    if (count($sampleErrors) < 5) {
                        $sampleErrors[] = 'Row ' . ($i + 1) . ': code too long (>500 chars)';
                    }
                    continue;
                }

                $hash = ProductCode::hashCode($code);
                if (isset($seenHashes[$hash])) {
                    $duplicates++;
                    continue;
                }
                $seenHashes[$hash] = true;

                $cleanRows[] = [
                    'code'       => $code,
                    'hash'       => $hash,
                    'serial'     => isset($row['serial']) && $row['serial'] !== ''
                                        ? (string) $row['serial'] : null,
                    'expires_at' => $this->parseDate($row['expires_at'] ?? null),
                ];
            }

            $existingHashes = [];
            if (!empty($cleanRows)) {
                $existingHashes = ProductCode::query()
                    ->whereIn('code_hash', array_column($cleanRows, 'hash'))
                    ->pluck('code_hash')
                    ->flip()
                    ->toArray();
            }

            $batch = CodeBatch::create([
                'product_id'          => $product->id,
                'supplier_name'       => $batchMeta['supplier_name'],
                'supplier_ref'        => $batchMeta['supplier_ref']   ?? null,
                'source'              => $batchMeta['source']         ?? 'manual',
                'code_count'          => 0,
                'unit_cost_sar'       => $batchMeta['unit_cost_sar']  ?? null,
                'total_cost_sar'      => null,
                'uploaded_by_user_id' => $batchMeta['uploaded_by_user_id'] ?? null,
                'notes'               => $batchMeta['notes']          ?? null,
            ]);

            foreach ($cleanRows as $r) {
                if (isset($existingHashes[$r['hash']])) {
                    $duplicates++;
                    continue;
                }
                try {
                    ProductCode::create([
                        'product_id'    => $product->id,
                        'batch_id'      => $batch->id,
                        'code_enc'      => $r['code'],
                        'code_hash'     => $r['hash'],
                        'serial_number' => $r['serial'],
                        'expires_at'    => $r['expires_at'],
                        'status'        => ProductCode::STATUS_AVAILABLE,
                    ]);
                    $inserted++;
                } catch (\Throwable $e) {
                    $duplicates++;
                    Log::warning('product_code insert failed', [
                        'product_id' => $product->id,
                        'err'        => $e->getMessage(),
                    ]);
                }
            }

            $unitCost = (float) ($batchMeta['unit_cost_sar'] ?? 0);
            $batch->update([
                'code_count'     => $inserted,
                'total_cost_sar' => $unitCost > 0 ? round($unitCost * $inserted, 2) : null,
            ]);

            if ($inserted > 0 && !$product->is_active && $product->shouldAutoHide()) {
                $product->is_active = true;
                $product->save();
                Log::info('product auto re-enabled after stock refill', [
                    'product_id' => $product->id,
                    'inserted'   => $inserted,
                ]);
            }

            return [
                'batch'         => $batch->fresh(),
                'inserted'      => $inserted,
                'duplicates'    => $duplicates,
                'invalid'       => $invalid,
                'sample_errors' => $sampleErrors,
            ];
        });
    }

    /** @throws OutOfStockException */
    public function claim(DigitalProduct $product, string $orderId): ProductCode
    {
        return DB::transaction(function () use ($product, $orderId) {
            /** @var ProductCode|null $code */
            $code = ProductCode::query()
                ->where('product_id', $product->id)
                ->where('status', ProductCode::STATUS_AVAILABLE)
                ->where(function ($q) {
                    $q->whereNull('expires_at')
                      ->orWhere('expires_at', '>', now()->toDateString());
                })
                ->lockForUpdate()
                ->orderBy('created_at')
                ->first();

            if (!$code) {
                throw new OutOfStockException($product->id);
            }

            $code->update([
                'status'               => ProductCode::STATUS_RESERVED,
                'reserved_by_order_id' => $orderId,
                'reserved_at'          => now(),
            ]);

            return $code->fresh();
        });
    }

    public function deliver(ProductCode $code): ProductCode
    {
        return DB::transaction(function () use ($code) {
            if ($code->status !== ProductCode::STATUS_RESERVED) {
                if ($code->status === ProductCode::STATUS_DELIVERED) {
                    return $code;
                }
                throw new \RuntimeException(
                    "Cannot deliver code in status {$code->status}"
                );
            }

            $code->update([
                'status'       => ProductCode::STATUS_DELIVERED,
                'delivered_at' => now(),
            ]);

            $this->maybeAutoHide($code->product_id);

            return $code->fresh();
        });
    }

    public function release(ProductCode $code): ProductCode
    {
        return DB::transaction(function () use ($code) {
            if ($code->status !== ProductCode::STATUS_RESERVED) {
                return $code;
            }
            $code->update([
                'status'               => ProductCode::STATUS_AVAILABLE,
                'reserved_by_order_id' => null,
                'reserved_at'          => null,
            ]);
            return $code->fresh();
        });
    }

    public function markExpired(): int
    {
        return ProductCode::query()
            ->where('status', ProductCode::STATUS_AVAILABLE)
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now()->toDateString())
            ->update(['status' => ProductCode::STATUS_EXPIRED]);
    }

    public function availableCount(string $productId): int
    {
        return (int) ProductCode::query()
            ->where('product_id', $productId)
            ->claimable()
            ->count();
    }

    /** @return array{available:int, reserved:int, delivered:int, expired:int, total:int} */
    public function stockBreakdown(string $productId): array
    {
        $rows = ProductCode::query()
            ->where('product_id', $productId)
            ->selectRaw('status, COUNT(*) as n')
            ->groupBy('status')
            ->pluck('n', 'status')
            ->toArray();

        return [
            'available' => (int) ($rows[ProductCode::STATUS_AVAILABLE] ?? 0),
            'reserved'  => (int) ($rows[ProductCode::STATUS_RESERVED]  ?? 0),
            'delivered' => (int) ($rows[ProductCode::STATUS_DELIVERED] ?? 0),
            'expired'   => (int) ($rows[ProductCode::STATUS_EXPIRED]   ?? 0),
            'total'     => (int) array_sum($rows),
        ];
    }

    /**
     * NEW — summary per distributor for admin card display.
     *
     * Returns a map keyed by distributor name:
     *   [
     *     'likecard' => [
     *       'inventory_products' => 2,   // products with fulfillment_mode=inventory
     *       'available_codes'    => 47,  // codes available to be claimed
     *       'delivered_30d'      => 15,  // codes delivered in the last 30 days
     *     ],
     *     'wupex' => [...],
     *     ...
     *   ]
     *
     * Distributors with no data return zero'd stats.
     *
     * @return array<string, array{inventory_products:int, available_codes:int, delivered_30d:int}>
     */
    public function summaryByDistributor(): array
    {
        // Inventory products per distributor
        $invProducts = DB::table('digital_products')
            ->select('distributor', DB::raw('COUNT(*) as n'))
            ->where('fulfillment_mode', 'inventory')
            ->groupBy('distributor')
            ->pluck('n', 'distributor')
            ->toArray();

        // Available codes per distributor
        $available = DB::table('product_codes as pc')
            ->join('digital_products as dp', 'pc.product_id', '=', 'dp.id')
            ->select('dp.distributor', DB::raw('COUNT(*) as n'))
            ->where('pc.status', 'available')
            ->where(function ($q) {
                $q->whereNull('pc.expires_at')
                  ->orWhere('pc.expires_at', '>', now()->toDateString());
            })
            ->groupBy('dp.distributor')
            ->pluck('n', 'distributor')
            ->toArray();

        // Delivered in last 30 days per distributor
        $delivered = DB::table('product_codes as pc')
            ->join('digital_products as dp', 'pc.product_id', '=', 'dp.id')
            ->select('dp.distributor', DB::raw('COUNT(*) as n'))
            ->where('pc.status', 'delivered')
            ->where('pc.delivered_at', '>', now()->subDays(30))
            ->groupBy('dp.distributor')
            ->pluck('n', 'distributor')
            ->toArray();

        $distributors = array_unique(array_merge(
            array_keys($invProducts),
            array_keys($available),
            array_keys($delivered)
        ));

        $result = [];
        foreach ($distributors as $d) {
            $result[$d] = [
                'inventory_products' => (int) ($invProducts[$d] ?? 0),
                'available_codes'    => (int) ($available[$d] ?? 0),
                'delivered_30d'      => (int) ($delivered[$d] ?? 0),
            ];
        }

        return $result;
    }

    // ── internals ──────────────────────────────────────────────────

    private function maybeAutoHide(string $productId): void
    {
        $product = DigitalProduct::find($productId);
        if (!$product || !$product->shouldAutoHide()) {
            return;
        }
        if ($this->availableCount($productId) === 0 && $product->is_active) {
            $product->is_active = false;
            $product->save();
            Log::info('product auto-hidden, stock exhausted', [
                'product_id' => $productId,
            ]);
        }
    }

    private function parseDate(?string $raw): ?string
    {
        if ($raw === null || trim($raw) === '') {
            return null;
        }
        try {
            return Carbon::parse(trim($raw))->toDateString();
        } catch (\Throwable) {
            return null;
        }
    }
}
