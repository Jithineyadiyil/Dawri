<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * TopUpRequest
 *
 * Validates wallet top-up amounts. Minimum 10 SAR to discourage micro-charges;
 * maximum 10,000 SAR per single top-up to match typical card-gateway limits
 * and to flag potentially suspicious amounts for manual review.
 */
final class TopUpRequest extends FormRequest
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
            'amount'          => ['required', 'numeric', 'min:10', 'max:10000'],
            'payment_method'  => ['required', 'string', 'in:card,mada,stc_pay'],
            'idempotency_key' => ['nullable', 'string', 'max:80'],
        ];
    }
}
