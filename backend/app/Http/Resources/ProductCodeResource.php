<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ProductCodeResource — code listing for admin pool drawer.
 *
 * Security: the plaintext code is NEVER returned in listings.
 * A separate reveal endpoint returns the plain code once, on demand,
 * and logs the access for audit (Sprint 12C).
 *
 * @mixin \App\Models\ProductCode
 */
class ProductCodeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                   => $this->id,
            'batch_id'             => $this->batch_id,
            'masked'               => $this->maskedCode(),
            'serial_number'        => $this->serial_number,
            'status'               => $this->status,
            'expires_at'           => $this->expires_at?->toDateString(),
            'reserved_by_order_id' => $this->reserved_by_order_id,
            'reserved_at'          => $this->reserved_at?->toIso8601String(),
            'delivered_at'         => $this->delivered_at?->toIso8601String(),
            'created_at'           => $this->created_at?->toIso8601String(),
        ];
    }
}
