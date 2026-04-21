<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * DigitalOrderResource
 *
 * Sprint 5: exposes product.name_ar so the cart and orders views can render
 * bilingual labels in RTL (item 9).
 *
 * @mixin \App\Models\DigitalOrder
 */
final class DigitalOrderResource extends JsonResource
{
    /**
     * @param  Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'product'        => $this->product ? [
                'id'        => $this->product->id,
                'name'      => $this->product->name,
                'name_ar'   => $this->product->name_ar,
                'brand'     => $this->product->brand,
                'image_url' => $this->product->image_url,
            ] : null,
            'distributor'    => $this->distributor,
            'status'         => $this->status,
            'total_price'    => (float) $this->total_price,
            'payment_method' => $this->payment_method,
            'has_code'       => $this->code !== null,
            'revealed'       => $this->code?->revealed_at !== null,
            'refunded'       => $this->status === 'refunded',
            'created_at'     => $this->created_at?->toIso8601String(),
            'fulfilled_at'   => $this->fulfilled_at?->toIso8601String(),
        ];
    }
}
