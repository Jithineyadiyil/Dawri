<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * PlaceOrderRequest
 *
 * Validates marketplace order requests. Accepts either a single product
 * (legacy) or a batched cart (items[]). Idempotency key is optional but
 * recommended: when provided and matches an existing order, the controller
 * returns that existing order instead of creating a duplicate.
 */
final class PlaceOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'product_id'        => ['required_without:items', 'string', 'exists:digital_products,id'],
            'payment_method'    => ['nullable', 'string', 'in:wallet,card,mada,stc_pay'],

            // Batched checkout (preferred)
            'items'             => ['required_without:product_id', 'array', 'min:1', 'max:20'],
            'items.*.product_id'=> ['required', 'string', 'exists:digital_products,id'],
            'items.*.qty'       => ['required', 'integer', 'min:1', 'max:10'],

            // Client-generated stable key to prevent duplicate orders on retry
            'idempotency_key'   => ['nullable', 'string', 'max:80'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'items.max'                      => 'You may order a maximum of 20 different products per checkout.',
            'items.*.product_id.exists'      => 'One of the items in your cart is no longer available.',
            'items.*.qty.max'                => 'You may order at most 10 of any single item per checkout.',
            'product_id.required_without'    => 'Either product_id or items[] must be provided.',
            'items.required_without'         => 'Either product_id or items[] must be provided.',
        ];
    }

    /**
     * Return items as a normalised array regardless of which input shape was used.
     *
     * @return array<int, array{product_id:string,qty:int}>
     */
    public function normalisedItems(): array
    {
        if ($this->filled('items')) {
            return array_map(
                static fn (array $i) => ['product_id' => (string) $i['product_id'], 'qty' => (int) $i['qty']],
                (array) $this->input('items', []),
            );
        }
        return [['product_id' => (string) $this->input('product_id'), 'qty' => 1]];
    }
}
