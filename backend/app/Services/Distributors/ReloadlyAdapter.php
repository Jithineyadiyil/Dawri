<?php

declare(strict_types=1);

namespace App\Services\Distributors;

use App\Contracts\DistributorInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * ReloadlyAdapter
 *
 * Priority 7 — secondary / failover.
 * Docs: https://docs.reloadly.com (OAuth 2.0 Client Credentials flow).
 *
 * ⚠️ STUB — requires Reloadly account + funded wallet. Set credentials in
 *         services.reloadly.* then isConfigured() returns true.
 *
 * Auth note: uses OAuth 2.0 client_credentials. Tokens are cached for ~30 days
 * per the integration plan; we cache for 29 days to avoid expiry races.
 */
final class ReloadlyAdapter implements DistributorInterface
{
    private readonly string $authUrl;
    private readonly string $baseUrl;
    private readonly string $clientId;
    private readonly string $clientSecret;

    public function __construct()
    {
        $this->authUrl      = (string) config('services.reloadly.auth_url', 'https://auth.reloadly.com/oauth/token');
        $this->baseUrl      = (string) config('services.reloadly.url',      'https://giftcards.reloadly.com');
        $this->clientId     = (string) config('services.reloadly.client_id', '');
        $this->clientSecret = (string) config('services.reloadly.client_secret', '');
    }

    public function name(): string       { return 'reloadly'; }
    public function priority(): int      { return 7; }
    public function isConfigured(): bool { return ! empty($this->clientId) && ! empty($this->clientSecret); }

    public function placeOrder(string $distributorProductId, string $internalOrderId): array
    {
        if (! $this->isConfigured()) {
            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => 'Reloadly not configured',
                'retryable' => true,
            ];
        }

        try {
            $token = $this->accessToken();

            $res = Http::withToken($token)
                ->withHeaders(['Accept' => 'application/com.reloadly.giftcards-v1+json'])
                ->timeout(15)
                ->post("{$this->baseUrl}/orders", [
                    'productId'        => (int) $distributorProductId,
                    'countryCode'      => 'SA',
                    'quantity'         => 1,
                    'customIdentifier' => $internalOrderId,
                ]);

            if ($res->successful()) {
                return [
                    'success'   => true,
                    'order_id'  => (string) $res->json('transactionId'),
                    'code'      => (string) $res->json('cardInfo.cardNumber'),
                    'message'   => 'OK',
                    'retryable' => false,
                ];
            }

            return [
                'success'   => false,
                'order_id'  => null,
                'code'      => null,
                'message'   => (string) $res->json('message', 'Reloadly error'),
                'retryable' => $res->status() >= 500,
            ];
        } catch (\Throwable $e) {
            Log::warning('Reloadly::placeOrder failed', ['error' => $e->getMessage()]);
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
            'message'   => $this->isConfigured() ? 'Not implemented' : 'Reloadly not configured',
            'retryable' => false,
        ];
    }

    /**
     * Acquire or refresh the OAuth 2.0 access token. Cached for 29 days.
     */
    private function accessToken(): string
    {
        return Cache::remember('reloadly.access_token', 60 * 60 * 24 * 29, function (): string {
            $res = Http::asJson()->post($this->authUrl, [
                'client_id'     => $this->clientId,
                'client_secret' => $this->clientSecret,
                'grant_type'    => 'client_credentials',
                'audience'      => 'https://giftcards.reloadly.com',
            ]);
            if (! $res->successful()) {
                throw new \RuntimeException('Reloadly auth failed: ' . $res->body());
            }
            return (string) $res->json('access_token');
        });
    }
}
