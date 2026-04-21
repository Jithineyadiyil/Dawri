<?php

declare(strict_types=1);

namespace App\Services\Distributors;

use App\Contracts\DistributorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * JawakerAdapter
 *
 * Priority 3 — dedicated for Jawaker-branded cards only (GCC card game platform).
 * ⚠️ STUB — requires direct partnership with Jawaker Middle East.
 *
 * The DistributorRouter will prefer this adapter ONLY for products whose
 * brand === 'Jawaker' to ensure the right distributor is used for the right
 * product. When not configured, router falls back to Reloadly / Likecard.
 */
final class JawakerAdapter implements DistributorInterface
{
    private readonly string $baseUrl;
    private readonly string $apiKey;

    public function __construct()
    {
        $this->baseUrl = (string) config('services.jawaker.url',     'https://partners.jawaker.com/api/v1');
        $this->apiKey  = (string) config('services.jawaker.api_key', '');
    }

    public function name(): string       { return 'jawaker'; }
    public function priority(): int      { return 3; }
    public function isConfigured(): bool { return ! empty($this->apiKey); }

    public function placeOrder(string $distributorProductId, string $internalOrderId): array
    {
        if (! $this->isConfigured()) {
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => 'Jawaker not configured',
                'retryable' => true,
            ];
        }

        try {
            $res = Http::withHeaders(['Authorization' => 'Bearer ' . $this->apiKey])
                ->timeout(15)
                ->post("{$this->baseUrl}/redemption/create", [
                    'sku_code'     => $distributorProductId,
                    'reference_id' => $internalOrderId,
                ]);

            if ($res->successful()) {
                return [
                    'success'   => true,
                    'order_id'  => (string) $res->json('redemption_id'),
                    'code'      => (string) $res->json('voucher_code'),
                    'message'   => 'OK',
                    'retryable' => false,
                ];
            }

            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => (string) $res->json('error', 'Jawaker error'),
                'retryable' => $res->status() >= 500,
            ];
        } catch (\Throwable $e) {
            Log::warning('Jawaker::placeOrder failed', ['error' => $e->getMessage()]);
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
            'message'   => $this->isConfigured() ? 'Not implemented' : 'Jawaker not configured',
            'retryable' => false,
        ];
    }
}
