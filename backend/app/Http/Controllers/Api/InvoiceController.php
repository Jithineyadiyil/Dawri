<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function download(Request $request, string $id)
    {
        $user = null;
        $tokenValue = $request->query('token');

        if ($tokenValue) {
            // Sanctum format: "{id}|{rawToken}" — hash only the rawToken part
            if (str_contains($tokenValue, '|')) {
                [$tokenId, $rawToken] = explode('|', $tokenValue, 2);
                $hashed = hash('sha256', $rawToken);

                $pat = DB::table('personal_access_tokens')
                    ->where('id', $tokenId)
                    ->where('token', $hashed)
                    ->first();
            } else {
                $pat = DB::table('personal_access_tokens')
                    ->where('token', hash('sha256', $tokenValue))
                    ->first();
            }

            if (!empty($pat)) {
                $user = User::find($pat->tokenable_id);
            }
        }

        if (!$user) {
            $user = $request->user('sanctum');
        }

        if (!$user) {
            abort(401, 'Unauthorized');
        }

        $invoice = DB::table('invoices')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$invoice) {
            abort(404, 'Invoice not found.');
        }

        $data = [
            'invoice'    => $invoice,
            'user'       => $user,
            'vat_number' => 'SA-VAT-XXXXXXXXXX',
            'cr_number'  => 'SA-CR-XXXXXXXXXX',
            'subtotal'   => $invoice->subtotal ?? $invoice->amount,
            'vat'        => $invoice->vat_amount ?? 0,
            'total'      => $invoice->total ?? $invoice->amount,
        ];

        $pdf      = Pdf::loadView('invoices.invoice', $data)->setPaper('a4', 'portrait');
        $filename = 'DAWRI-' . ($invoice->invoice_number ?? strtoupper(substr($id, 0, 8))) . '.pdf';

        return $pdf->download($filename);
    }
}
