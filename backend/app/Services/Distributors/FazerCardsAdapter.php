<?php

declare(strict_types=1);

namespace App\Services\Distributors;

use App\Contracts\DistributorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * FazerCardsAdapter
 *
 * Priority 3 — Phase 1 testing distributor before WUPEX enterprise contract.
 * Docs: https://reseller.fazercards.com/en#docs
 * Auth: Bearer token (API key from Dashboard).
 *
 * Products available: PSN, Xbox, iTunes, PUBG, Free Fire, Valorant,
 * COD, Roblox, Netflix, Spotify — good coverage for GCC market.
 *
 * Pricing: Free trial (5 days) → Gold plan $11.99/mo
 *
 * To activate:
 *   1. Register at https://reseller.fazercards.com/en
 *   2. Generate API key from Dashboard
 *   3. Add to .env: FAZERCARDS_API_KEY=your_key_here
 *
 * When isConfigured() returns false, the router skips this adapter and falls
 * through to LikecardAdapter (sandbox stub). Once credentials are added,
 * this adapter takes priority 3 (ahead of WUPEX stub at 5).
 */
final class FazerCardsAdapter implements DistributorInterface
{
    private readonly string $baseUrl;
    private readonly string $apiKey;

    public function __construct()
    {
        $this->baseUrl = (string) config('services.fazercards.url',     'https://api.fazercards.com/v1');
        $this->apiKey  = (string) config('services.fazercards.api_key', '');
    }

    public function name(): string       { return 'fazercards'; }
    public function priority(): int      { return 3; }
    public function isConfigured(): bool { return ! empty($this->apiKey); }

    public function placeOrder(string $distributorProductId, string $internalOrderId): array
    {
        if (! $this->isConfigured()) {
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => 'FazerCards not configured — add FAZERCARDS_API_KEY to .env',
                'retryable' => true,
            ];
        }

        try {
            $res = Http::withToken($this->apiKey)
                ->timeout(20)
                ->post("{$this->baseUrl}/orders", [
                    'product_id'   => $distributorProductId,
                    'quantity'     => 1,
                    'customer_ref' => $internalOrderId,
                ]);

            if ($res->successful()) {
                $data = $res->json();

                // FazerCards returns order with redemption code on success
                $code = $data['code']
                    ?? $data['redemption_code']
                    ?? $data['serial']
                    ?? null;

                if ($code) {
                    return [
                        'success'   => true,
                        'order_id'  => (string) ($data['order_id'] ?? $data['id'] ?? $internalOrderId),
                        'code'      => (string) $code,
                        'message'   => 'OK',
                        'retryable' => false,
                    ];
                }

                // Order placed but code not yet ready — treat as pending
                return [
                    'success'   => false,
                    'order_id'  => (string) ($data['order_id'] ?? $data['id'] ?? null),
                    'code'      => null,
                    'message'   => 'Order pending — code not yet delivered',
                    'retryable' => false,
                ];
            }

            $errorMsg = $res->json('message')
                ?? $res->json('error')
                ?? "HTTP {$res->status()}";

            Log::warning('FazerCards::placeOrder failed', [
                'status'  => $res->status(),
                'body'    => $res->body(),
                'product' => $distributorProductId,
            ]);

            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => "FazerCards error: {$errorMsg}",
                'retryable' => $res->status() >= 500,
            ];

        } catch (\Throwable $e) {
            Log::error('FazerCards::placeOrder exception', [
                'error'   => $e->getMessage(),
                'product' => $distributorProductId,
            ]);

            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => $e->getMessage(),
                'retryable' => true,
            ];
        }
    }

    public function orderStatus(string $distributorOrderId): array
    {
        if (! $this->isConfigured()) {
            return [
                'success'   => false,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => 'FazerCards not configured',
                'retryable' => false,
            ];
        }

        try {
            $res = Http::withToken($this->apiKey)
                ->timeout(10)
                ->get("{$this->baseUrl}/orders/{$distributorOrderId}");

            if ($res->successful()) {
                $data   = $res->json();
                $status = strtolower($data['status'] ?? '');
                $code   = $data['code'] ?? $data['redemption_code'] ?? null;

                return [
                    'success'   => $status === 'completed' && $code !== null,
                    'order_id'  => $distributorOrderId,
                    'code'      => $code,
                    'message'   => $data['status'] ?? 'unknown',
                    'retryable' => false,
                ];
            }

            return [
                'success'   => false,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => "HTTP {$res->status()}",
                'retryable' => false,
            ];

        } catch (\Throwable $e) {
            return [
                'success'   => false,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => $e->getMessage(),
                'retryable' => true,
            ];
        }
    }

    /**
     * Fetch available products from FazerCards catalog.
     * Used for product sync / catalog refresh.
     */
    public function getProducts(string $region = 'SA'): array
    {
        if (! $this->isConfigured()) {
            return [];
        }

        try {
            $res = Http::withToken($this->apiKey)
                ->timeout(30)
                ->get("{$this->baseUrl}/products", [
                    'region' => $region,
                ]);

            if ($res->successful()) {
                return $res->json('data', $res->json() ?? []);
            }

            Log::warning('FazerCards::getProducts failed', ['status' => $res->status()]);
            return [];

        } catch (\Throwable $e) {
            Log::error('FazerCards::getProducts exception', ['error' => $e->getMessage()]);
            return [];
        }
    }
}
