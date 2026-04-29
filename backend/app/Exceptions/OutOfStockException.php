<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;

/**
 * Thrown when an inventory-mode product has no claimable codes left.
 * Caught by MarketplaceController and returned as HTTP 409 Conflict
 * with a user-friendly message ("Out of stock, please check back soon").
 */
class OutOfStockException extends Exception
{
    public function __construct(
        public readonly string $productId,
        string $message = 'Product is out of stock'
    ) {
        parent::__construct($message);
    }
}
