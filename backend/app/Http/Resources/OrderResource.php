<?php
declare(strict_types=1);
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id'          => $this->id,
            'product'     => new ProductResource($this->whenLoaded('product')),
            'quantity'    => $this->quantity,
            'unit_price'  => $this->unit_price,
            'total_price' => $this->total_price,
            'status'      => $this->status,
            'revealed'    => $this->code?->revealed_at !== null,
            'fulfilled_at'=> $this->fulfilled_at?->toIso8601String(),
            'created_at'  => $this->created_at?->toIso8601String(),
        ];
    }
}
