<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Likecard distributor service (stub).
 * Replace TODO sections with real calls once vendor account is approved.
 * Docs: https://www.like4card.com/en/api
 * Auth: header  X-Api-Key: {key}
 */
class LikecardService
{
    private string $baseUrl;
    private string $apiKey;
    private string $agentCode;

    public function __construct()
    {
        $this->baseUrl   = config('services.likecard.url',        'https://api.like4card.com/v1');
        $this->apiKey    = config('services.likecard.api_key',    '');
        $this->agentCode = config('services.likecard.agent_code', '');
    }

    /** Fetch available products. TODO: real API call. */
    public function getProducts(): array
    {
        if (empty($this->apiKey)) {
            return [];
        }
        // TODO: Http::withHeaders(['X-Api-Key' => $this->apiKey])->get(...)
        return [];
    }

    /**
     * Place order. Returns stub fulfilled response when no API key is set.
     * @return array{success:bool,order_id:string|null,code:string|null,message:string}
     */
    public function placeOrder(string $productId, string $referenceId): array
    {
        if (empty($this->apiKey)) {
            // STUB — simulate success so the full flow can be tested end-to-end
            return [
                'success'  => true,
                'order_id' => 'STUB-' . strtoupper(substr($referenceId, 0, 8)),
                'code'     => 'STUB-' . strtoupper(substr(md5($referenceId), 0, 16)),
                'message'  => 'Stub (no API key configured)',
            ];
        }

        // TODO: uncomment after credentials approved
        // try {
        //     $res = Http::withHeaders(['X-Api-Key' => $this->apiKey])
        //         ->post("{$this->baseUrl}/orders", [
        //             'agent_code'   => $this->agentCode,
        //             'product_id'   => $productId,
        //             'reference_id' => $referenceId,
        //             'quantity'     => 1,
        //         ]);
        //     if ($res->successful() && $res->json('status') === 'success') {
        //         return ['success' => true, 'order_id' => $res->json('data.order_id'), 'code' => $res->json('data.code'), 'message' => 'OK'];
        //     }
        //     return ['success' => false, 'order_id' => null, 'code' => null, 'message' => $res->json('message', 'Likecard error')];
        // } catch (\Exception $e) {
        //     Log::error('Likecard::placeOrder', ['err' => $e->getMessage()]);
        //     return ['success' => false, 'order_id' => null, 'code' => null, 'message' => $e->getMessage()];
        // }

        return ['success' => false, 'order_id' => null, 'code' => null, 'message' => 'API not configured'];
    }

    public function getBalance(): float { return 0.0; }
}
