<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\DigitalProduct;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Sprint 11:   base rules for admin product create/update.
 * Sprint 12A:  fulfillment_mode + low_stock_threshold.
 * Sprint 12A+: auto_hide_when_empty.
 *
 * Accepts both absolute URLs (https://...) and relative paths
 * (/brands/apple.svg) for image_url — Sprint 11 S11V fix.
 */
class StoreDigitalProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'distributor'            => ['required', 'string', 'max:50'],
            'distributor_product_id' => ['nullable', 'string', 'max:120'],
            'name'                   => ['required', 'string', 'max:200'],
            'name_ar'                => ['nullable', 'string', 'max:200'],
            'brand'                  => ['required', 'string', 'max:100'],
            'category'               => ['required', 'string', 'max:50'],
            'face_value'             => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'currency'               => ['required', 'string', 'size:3'],
            'our_cost'               => ['nullable', 'numeric', 'min:0'],
            'our_price'              => ['required', 'numeric', 'min:0'],
            'region'                 => ['nullable', 'string', 'max:10'],
            'image_url'              => [
                'nullable',
                'string',
                'max:500',
                'regex:/^(https?:\/\/[^\s<>"]+|\/[^\s<>"]*)$/i',
            ],
            'is_active'              => ['boolean'],
            'sort_order'             => ['nullable', 'integer', 'min:0'],

            // Sprint 12A
            'fulfillment_mode'       => ['nullable', Rule::in(DigitalProduct::MODES)],
            'low_stock_threshold'    => ['nullable', 'integer', 'min:0', 'max:100000'],

            // Sprint 12A+ — per-product opt-out of auto-hide when pool empty
            'auto_hide_when_empty'   => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'image_url.regex' => 'Image URL must be a full URL (https://…) or a relative path starting with /.',
        ];
    }
}
