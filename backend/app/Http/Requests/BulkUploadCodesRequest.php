<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validates a bulk-upload payload for the inventory pool.
 *
 * Accepts two equivalent shapes — `codes_text` (newline-separated paste)
 * OR `codes[]` (structured array from CSV parser). At least one is required.
 *
 * Structured row format (when using `codes[]`):
 *   {
 *     "code":       "XXXX-YYYY-ZZZZ",  // required
 *     "serial":     "SN12345",         // optional
 *     "expires_at": "2027-12-31"       // optional, any parseable date
 *   }
 */
class BulkUploadCodesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // admin-only route, guard handles auth
    }

    public function rules(): array
    {
        return [
            // Batch metadata
            'supplier_name'  => ['required', 'string', 'max:120'],
            'supplier_ref'   => ['nullable', 'string', 'max:200'],
            'unit_cost_sar'  => ['nullable', 'numeric', 'min:0', 'max:99999.99'],
            'notes'          => ['nullable', 'string', 'max:2000'],
            'source'         => ['nullable', Rule::in(['manual', 'csv_upload', 'webhook'])],

            // Either codes_text or codes[] — checked in withValidator
            'codes_text'     => ['nullable', 'string', 'max:1000000'], // ~1MB cap
            'codes'          => ['nullable', 'array'],
            'codes.*.code'   => ['required_with:codes', 'string', 'max:500'],
            'codes.*.serial' => ['nullable', 'string', 'max:120'],
            'codes.*.expires_at' => ['nullable', 'string', 'max:40'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $text  = (string) $this->input('codes_text', '');
            $arr   = $this->input('codes', []);
            if (trim($text) === '' && (!is_array($arr) || count($arr) === 0)) {
                $v->errors()->add('codes_text',
                    'Provide either codes_text (pasted) or a codes[] array.');
            }
        });
    }

    /**
     * Normalized row list (merges both input shapes).
     *
     * @return array<int, array{code:string, serial?:?string, expires_at?:?string}>
     */
    public function normalizedRows(): array
    {
        $out = [];

        // From structured array
        foreach ((array) $this->input('codes', []) as $row) {
            if (!is_array($row)) continue;
            $out[] = [
                'code'       => (string) ($row['code']       ?? ''),
                'serial'     => isset($row['serial'])     ? (string) $row['serial']     : null,
                'expires_at' => isset($row['expires_at']) ? (string) $row['expires_at'] : null,
            ];
        }

        // From pasted text — one code per line
        $text = (string) $this->input('codes_text', '');
        if (trim($text) !== '') {
            foreach (preg_split('/\r\n|\r|\n/', $text) as $line) {
                $line = trim($line);
                if ($line === '') continue;
                // Allow tab-separated: code<TAB>serial<TAB>expires
                $parts = preg_split('/\t/', $line);
                $out[] = [
                    'code'       => (string) ($parts[0] ?? ''),
                    'serial'     => isset($parts[1]) && $parts[1] !== '' ? (string) $parts[1] : null,
                    'expires_at' => isset($parts[2]) && $parts[2] !== '' ? (string) $parts[2] : null,
                ];
            }
        }

        return $out;
    }
}
