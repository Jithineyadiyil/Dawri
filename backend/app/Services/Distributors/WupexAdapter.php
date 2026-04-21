<?php

declare(strict_types=1);

namespace App\Services\Distributors;

use App\Contracts\DistributorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * WupexAdapter
 *
 * Priority 5 (configured as primary per PRD digital integration plan, but
 * behind Likecard during sandbox testing).
 *
 * Docs: https://wupex.com/api-doc-overview/
 * Auth: Bearer token, issued via /auth/token.
 *
 * ⚠️ STUB — requires signed reseller agreement + funded wallet before it can
 *         be activated. Set services.wupex.api_key in config/services.php
 *         and .env once credentials are provisioned, then isConfigured()
 *         will return true and the router will prefer this adapter.
 */
final class WupexAdapter implements DistributorInterface
{
    private readonly string $baseUrl;
    private readonly string $apiKey;

    public function __construct()
    {
        $this->baseUrl = (string) config('services.wupex.url',     'https://api.wupex.com/v1');
        $this->apiKey  = (string) config('services.wupex.api_key', '');
    }

    public function name(): string       { return 'wupex'; }
    public function priority(): int      { return 5; }   // preferred once configured
    public function isConfigured(): bool { return ! empty($this->apiKey); }

    public function placeOrder(string $distributorProductId, string $internalOrderId): array
    {
        // When not configured, return unconfigured signal so router skips us
        if (! $this->isConfigured()) {
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => 'WUPEX not configured',
                'retryable' => true,  // let router try next distributor
            ];
        }

        try {
            $res = Http::withToken($this->apiKey)
                ->timeout(15)
                ->post("{$this->baseUrl}/orders/create", [
                    'product_id'      => $distributorProductId,
                    'idempotency_key' => $internalOrderId,
                    'quantity'        => 1,
                ]);

            if ($res->successful() && $res->json('success') === true) {
                return [
                    'success'   => true,
                    'order_id'  => (string) $res->json('order_id'),
                    'code'      => (string) $res->json('redemption_code'),
                    'message'   => 'OK',
                    'retryable' => false,
                ];
            }

            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => (string) $res->json('error.message', 'WUPEX error'),
                'retryable' => $res->status() >= 500,
            ];
        } catch (\Throwable $e) {
            Log::warning('Wupex::placeOrder failed', ['error' => $e->getMessage()]);
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
        return [
            'success'   => false,
            'order_id'  => $distributorOrderId,
            'code'      => null,
            'message'   => $this->isConfigured() ? 'Not implemented' : 'WUPEX not configured',
            'retryable' => false,
        ];
    }
}
