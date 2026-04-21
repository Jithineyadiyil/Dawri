<?php

declare(strict_types=1);

namespace App\Services\Distributors;

use App\Contracts\DistributorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * LikecardAdapter
 *
 * Priority 1 (primary for small-scale / sandbox testing per the integration plan).
 * Real API docs: https://www.like4card.com/en/api — X-Api-Key header auth.
 *
 * When no API key is configured, returns a deterministic stub response so the
 * full end-to-end flow can be tested without a vendor account.
 */
final class LikecardAdapter implements DistributorInterface
{
    private readonly string $baseUrl;
    private readonly string $apiKey;
    private readonly string $agentCode;

    public function __construct()
    {
        $this->baseUrl   = (string) config('services.likecard.url',        'https://api.like4card.com/v1');
        $this->apiKey    = (string) config('services.likecard.api_key',    '');
        $this->agentCode = (string) config('services.likecard.agent_code', '');
    }

    public function name(): string       { return 'likecard'; }
    public function priority(): int      { return 10; }
    public function isConfigured(): bool { return true; }  // stub fallback always available

    /**
     * @inheritDoc
     */
    public function placeOrder(string $distributorProductId, string $internalOrderId): array
    {
        // Stub path — when credentials not yet provisioned, return a deterministic
        // success so the downstream flow (DB write, encryption, reveal) can be
        // exercised in development.
        if (empty($this->apiKey)) {
            return [
                'success'   => true,
                'order_id'  => 'STUB-' . strtoupper(substr($internalOrderId, 0, 8)),
                'code'      => 'STUB-' . strtoupper(substr(md5($internalOrderId), 0, 16)),
                'message'   => 'Stub response (no API key configured)',
                'retryable' => false,
            ];
        }

        try {
            $res = Http::withHeaders(['X-Api-Key' => $this->apiKey])
                ->timeout(15)
                ->post("{$this->baseUrl}/orders", [
                    'agent_code'   => $this->agentCode,
                    'product_id'   => $distributorProductId,
                    'reference_id' => $internalOrderId,
                    'quantity'     => 1,
                ]);

            if ($res->successful() && $res->json('status') === 'success') {
                return [
                    'success'   => true,
                    'order_id'  => $res->json('data.order_id'),
                    'code'      => $res->json('data.code'),
                    'message'   => 'OK',
                    'retryable' => false,
                ];
            }

            // Non-success with an explicit message — not retryable (likely product-level failure)
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => (string) $res->json('message', 'Likecard error'),
                'retryable' => $res->status() >= 500,
            ];
        } catch (\Throwable $e) {
            Log::warning('Likecard::placeOrder failed', [
                'error'     => $e->getMessage(),
                'reference' => $internalOrderId,
            ]);
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => 'Network error: ' . $e->getMessage(),
                'retryable' => true,
            ];
        }
    }

    /**
     * @inheritDoc
     */
    public function orderStatus(string $distributorOrderId): array
    {
        if (empty($this->apiKey)) {
            return [
                'success'   => true,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => 'Stub (no API key)',
                'retryable' => false,
            ];
        }

        try {
            $res = Http::withHeaders(['X-Api-Key' => $this->apiKey])
                ->timeout(10)
                ->get("{$this->baseUrl}/orders/{$distributorOrderId}");

            if ($res->successful()) {
                return [
                    'success'   => $res->json('status') === 'completed',
                    'order_id'  => $distributorOrderId,
                    'code'      => $res->json('data.code'),
                    'message'   => (string) $res->json('message', 'OK'),
                    'retryable' => false,
                ];
            }

            return [
                'success'   => false,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => 'Status check failed',
                'retryable' => true,
            ];
        } catch (\Throwable $e) {
            Log::warning('Likecard::orderStatus failed', ['error' => $e->getMessage()]);
            return [
                'success'   => false,
                'order_id'  => $distributorOrderId,
                'code'      => null,
                'message'   => $e->getMessage(),
                'retryable' => true,
            ];
        }
    }
}
