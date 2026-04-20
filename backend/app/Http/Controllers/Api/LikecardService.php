<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LikecardService
{
    private string $baseUrl;
    private string $apiKey;
    private bool   $sandbox;

    public function __construct()
    {
        $this->baseUrl = config('services.likecard.base_url', '');
        $this->apiKey  = config('services.likecard.api_key', '');
        $this->sandbox = empty($this->apiKey) || app()->environment('local', 'testing');
    }

    /**
     * Place an order with Likecard (or return a mock code in sandbox mode).
     */
    public function placeOrder(string $productId, string $orderId): array
    {
        if ($this->sandbox) {
            Log::info("LikecardService [SANDBOX] order={$orderId} product={$productId}");

            return [
                'success'  => true,
                'order_id' => 'SANDBOX-' . strtoupper(substr($orderId, 0, 8)),
                'code'     => 'XXXX-XXXX-XXXX-' . strtoupper(substr(md5($orderId), 0, 4)),
                'message'  => 'Sandbox code — not real',
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept'        => 'application/json',
            ])->timeout(30)->post($this->baseUrl . '/orders', [
                'product_id'    => $productId,
                'reference_id'  => $orderId,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                return [
                    'success'  => true,
                    'order_id' => $data['order_id'] ?? $data['id'] ?? null,
                    'code'     => $data['code'] ?? $data['serial'] ?? null,
                    'message'  => 'OK',
                ];
            }

            Log::error('LikecardService error', ['status' => $response->status(), 'body' => $response->body()]);

            return ['success' => false, 'order_id' => null, 'code' => null, 'message' => $response->body()];

        } catch (\Throwable $e) {
            Log::error('LikecardService exception', ['error' => $e->getMessage()]);

            return ['success' => false, 'order_id' => null, 'code' => null, 'message' => $e->getMessage()];
        }
    }

    /**
     * Check order status.
     */
    public function getOrderStatus(string $distributorOrderId): array
    {
        if ($this->sandbox) {
            return ['success' => true, 'status' => 'completed'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept'        => 'application/json',
            ])->timeout(15)->get($this->baseUrl . '/orders/' . $distributorOrderId);

            if ($response->successful()) {
                $data = $response->json();
                return ['success' => true, 'status' => $data['status'] ?? 'unknown'];
            }

            return ['success' => false, 'status' => 'error'];

        } catch (\Throwable $e) {
            return ['success' => false, 'status' => 'error'];
        }
    }
}
