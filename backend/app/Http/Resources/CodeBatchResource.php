<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * CodeBatchResource — admin-facing batch listing for inventory drawer.
 *
 * @mixin \App\Models\CodeBatch
 */
class CodeBatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'product_id'      => $this->product_id,
            'supplier_name'   => $this->supplier_name,
            'supplier_ref'    => $this->supplier_ref,
            'source'          => $this->source,
            'code_count'      => (int) $this->code_count,
            'unit_cost_sar'   => $this->unit_cost_sar !== null ? (float) $this->unit_cost_sar : null,
            'total_cost_sar'  => $this->total_cost_sar !== null ? (float) $this->total_cost_sar : null,
            'notes'           => $this->notes,
            'uploaded_by'     => $this->whenLoaded('uploader', fn() => [
                'id'   => $this->uploader->id ?? null,
                'name' => $this->uploader->name ?? null,
            ]),
            'created_at'      => $this->created_at?->toIso8601String(),
        ];
    }
}
