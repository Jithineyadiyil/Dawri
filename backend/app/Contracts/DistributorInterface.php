<?php

declare(strict_types=1);

namespace App\Contracts;

/**
 * DistributorInterface
 *
 * Abstraction for digital goods distributors (Likecard, WUPEX, Reloadly,
 * Jawaker, etc.). All concrete adapters must implement these methods so
 * the DistributorRouter can swap and failover transparently.
 *
 * Response shape for placeOrder / orderStatus:
 *   [
 *     'success'    => bool,
 *     'order_id'   => ?string,   // Distributor-side order ID
 *     'code'       => ?string,   // Plaintext redemption code when fulfilled
 *     'message'    => ?string,   // Human-readable detail on failure
 *     'retryable'  => bool,      // If true, router should try the next distributor
 *   ]
 */
interface DistributorInterface
{
    /**
     * Stable identifier for this distributor (e.g. "likecard", "wupex").
     */
    public function name(): string;

    /**
     * Place an order for a specific product.
     *
     * @param string $distributorProductId The distributor's SKU/product code
     * @param string $internalOrderId      Dawri's own order UUID (for reconciliation)
     * @return array{success:bool,order_id:?string,code:?string,message:?string,retryable:bool}
     */
    public function placeOrder(string $distributorProductId, string $internalOrderId): array;

    /**
     * Poll the status of a previously placed order.
     *
     * @return array{success:bool,order_id:?string,code:?string,message:?string,retryable:bool}
     */
    public function orderStatus(string $distributorOrderId): array;

    /**
     * Whether the distributor is currently configured with valid credentials.
     * Used by the router to skip unconfigured adapters without logging errors.
     */
    public function isConfigured(): bool;

    /**
     * Priority (lower number = tried first). Used to order the failover chain.
     */
    public function priority(): int;
}
