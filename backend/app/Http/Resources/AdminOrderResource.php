<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * AdminOrderResource — richer order payload for the admin marketplace view.
 *
 * Compared to the customer-facing order resource this includes:
 *   - Internal refund + notes fields
 *   - Full customer details (id, name, email) for ops contact
 *   - Distributor order ID for cross-system reconciliation
 *   - Timestamps for created/fulfilled/refunded so the UI can show a
 *     timeline
 *
 * Sprint 12A+ addition: flat convenience fields user_id / user_name /
 * user_email / product_id / product_name / product_brand are included
 * alongside the nested objects. The admin table list reads the flat
 * fields; the detail modal reads whichever is easier. Keeping both shapes
 * is backward-compatible — existing consumers of user/product nested
 * objects continue to work.
 */
class AdminOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                   => $this->id,
            'status'               => $this->status,
            'quantity'             => (int) $this->quantity,
            'unit_price'           => (float) $this->unit_price,
            'total_price'          => (float) $this->total_price,
            'payment_method'       => $this->payment_method,
            'payment_ref'          => $this->payment_ref,
            'idempotency_key'      => $this->idempotency_key,

            'distributor'          => $this->distributor,
            'distributor_order_id' => $this->distributor_order_id,

            'refund_reason'        => $this->refund_reason,
            'admin_notes'          => $this->admin_notes,

            'created_at'           => $this->created_at?->toIso8601String(),
            'fulfilled_at'         => $this->fulfilled_at?->toIso8601String(),
            'refunded_at'          => $this->refunded_at?->toIso8601String(),

            // ── Flat convenience fields (Sprint 12A+) ──
            // Admin table reads these; fallback-safe with ?? null.
            'user_id'              => $this->user_id,
            'user_name'            => $this->whenLoaded('user', fn () => $this->user?->name),
            'user_email'           => $this->whenLoaded('user', fn () => $this->user?->email),
            'product_id'           => $this->product_id,
            'product_name'         => $this->whenLoaded('product', fn () => $this->product?->name),
            'product_brand'        => $this->whenLoaded('product', fn () => $this->product?->brand),

            // ── Nested objects (Sprint 11, preserved for API consumers) ──
            'user'                 => $this->whenLoaded('user', fn () => [
                'id'       => $this->user->id,
                'name'     => $this->user->name,
                'email'    => $this->user->email,
                'nickname' => $this->user->nickname ?? null,
            ]),

            'product'              => $this->whenLoaded('product', fn () => [
                'id'         => $this->product->id,
                'name'       => $this->product->name,
                'brand'      => $this->product->brand,
                'face_value' => (float) $this->product->face_value,
                'currency'   => $this->product->currency,
            ]),

            'has_delivered_code'   => $this->whenLoaded('code', fn () => $this->code !== null),
            'code_revealed_at'     => $this->whenLoaded('code', fn () => $this->code?->revealed_at?->toIso8601String()),
        ];
    }
}
