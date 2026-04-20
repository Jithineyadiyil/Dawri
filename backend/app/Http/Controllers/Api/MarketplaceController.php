<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DigitalCode;
use App\Models\DigitalOrder;
use App\Models\DigitalProduct;
use App\Services\LikecardService;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MarketplaceController extends Controller
{
    public function __construct(
        private readonly LikecardService $likecard,
        private readonly PaymentService  $payment,
    ) {}

    public function products(Request $request): JsonResponse
    {
        $products = DigitalProduct::where('is_active', true)
            ->when($request->filled('category'), fn ($q) => $q->where('category', $request->input('category')))
            ->when($request->filled('brand'),    fn ($q) => $q->where('brand',    $request->input('brand')))
            ->orderBy('sort_order')->orderBy('brand')->orderBy('face_value')
            ->get()
            ->map(fn ($p) => [
                'id'          => $p->id,
                'name'        => $p->name,
                'name_ar'     => $p->name_ar,
                'brand'       => $p->brand,
                'category'    => $p->category,
                'face_value'  => $p->face_value,
                'currency'    => $p->currency,
                'our_price'   => $p->our_price,
                'region'      => $p->region,
                'image_url'   => $p->image_url ?: $this->brandLogo($p->brand),
                'distributor' => $p->distributor,
            ]);

        return response()->json(['data' => $products]);
    }

    private function brandLogo(string $brand): string
    {
        $logos = [
            // Gaming
            'PSN'            => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png',
            'PlayStation'    => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png',
            'Xbox'           => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2560px-Xbox_one_logo.svg.png',
            'Steam'          => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png',
            'PUBG'           => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/PUBG_Mobile_icon.png/600px-PUBG_Mobile_icon.png',
            'Roblox'         => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Roblox_Logo_2022.png/1200px-Roblox_Logo_2022.png',
            'Valorant'       => 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
            'Fortnite'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Fortnite_-_Logo.svg/2560px-Fortnite_-_Logo.svg.png',
            'Call of Duty'   => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Call_of_Duty_Mobile_Logo.svg/2048px-Call_of_Duty_Mobile_Logo.svg.png',
            'Free Fire'      => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Garena_Free_Fire_Logo.png/800px-Garena_Free_Fire_Logo.png',
            'Minecraft'      => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
            'Jawaker'        => 'https://play-lh.googleusercontent.com/7Ak3MBsYEG3bMQxLbxMpWfPbGN3VCLbO1WQAXi2G_z3GEF3-P3F4AVBK3VZOX-8LYQA',
            // Streaming
            'Netflix'        => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
            'Spotify'        => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
            'Apple'          => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
            'iTunes'         => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
            'Google Play'    => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Google_Play_logo_2022.svg/2048px-Google_Play_logo_2022.svg.png',
            'YouTube'        => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2048px-YouTube_full-color_icon_%282017%29.svg.png',
            'Shahid'         => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Shahid_Logo.png/800px-Shahid_Logo.png',
            'OSN'            => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/OSN_Logo.svg/2560px-OSN_Logo.svg.png',
            // Shopping / local
            'Amazon'         => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
            'Noon'           => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Noon_logo.svg/2560px-Noon_logo.svg.png',
            'STC Pay'        => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/STC_Pay_Logo.svg/2560px-STC_Pay_Logo.svg.png',
            'Carrefour'      => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/2560px-Carrefour_logo.svg.png',
            'Starbucks'      => 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
        ];

        $key = trim($brand);
        if (isset($logos[$key])) return $logos[$key];

        // Partial match
        foreach ($logos as $name => $url) {
            if (stripos($key, $name) !== false || stripos($name, $key) !== false) {
                return $url;
            }
        }

        return '';
    }

    public function placeOrder(Request $request): JsonResponse
    {
        $request->validate([
            'product_id'     => ['required', 'string', 'exists:digital_products,id'],
            'payment_method' => ['nullable', 'string', 'in:wallet,card,mada,stc_pay'],
        ]);

        $user          = $request->user();
        $product       = DigitalProduct::findOrFail($request->input('product_id'));
        $paymentMethod = $request->input('payment_method', 'wallet');
        $reference     = (string) Str::uuid();

        if (!$product->is_active) {
            return response()->json(['message' => 'Product is not available.'], 422);
        }

        $charge = $this->payment->charge($user, (float) $product->our_price, $paymentMethod, $reference);

        if (!$charge['success']) {
            return response()->json(['message' => $charge['message']], Response::HTTP_PAYMENT_REQUIRED);
        }

        $order = DB::transaction(function () use ($user, $product, $paymentMethod, $reference) {
            $order = DigitalOrder::create([
                'user_id'         => $user->id,
                'product_id'      => $product->id,
                'distributor'     => $product->distributor,
                'idempotency_key' => $reference,
                'quantity'        => 1,
                'unit_price'      => $product->our_price,
                'total_price'     => $product->our_price,
                'status'          => 'processing',
                'payment_method'  => $paymentMethod,
            ]);

            $result = $this->likecard->placeOrder(
                (string) ($product->distributor_product_id ?? $product->id),
                (string) $order->id
            );

            if ($result['success'] && $result['code']) {
                $order->update([
                    'status'               => 'completed',
                    'distributor_order_id' => $result['order_id'],
                    'fulfilled_at'         => now(),
                ]);
                DigitalCode::create([
                    'order_id'   => $order->id,
                    'code_enc'   => Crypt::encryptString($result['code']),
                    'code_hash'  => hash('sha256', $result['code']),
                    'expires_at' => now()->addDays(365),
                ]);
            } else {
                $order->update(['status' => 'failed']);
                if ($paymentMethod === 'wallet') {
                    DB::table('users')
                        ->where('id', $user->id)
                        ->increment('wallet_balance', $product->our_price);
                }
            }

            return $order->fresh();
        });

        return response()->json([
            'data' => [
                'id'     => $order->id,
                'status' => $order->status,
                'ready'  => $order->status === 'completed',
            ],
        ], 201);
    }

    public function revealCode(Request $request, string $id): JsonResponse
    {
        $order = DigitalOrder::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->firstOrFail();

        $code = DigitalCode::where('order_id', $order->id)->first();

        if (!$code) {
            return response()->json(['message' => 'Code not yet available.'], 404);
        }

        $plainCode    = Crypt::decryptString($code->code_enc);
        $alreadyShown = $code->revealed_at !== null;

        if (!$alreadyShown) {
            $code->update(['revealed_at' => now()]);
        }

        return response()->json([
            'data' => [
                'code'             => $plainCode,
                'already_revealed' => $alreadyShown,
            ],
        ]);
    }

    public function orders(Request $request): JsonResponse
    {
        $orders = DigitalOrder::with(['product', 'code'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json([
            'data' => $orders->map(fn ($o) => [
                'id'             => $o->id,
                'product'        => $o->product ? [
                    'name'      => $o->product->name,
                    'brand'     => $o->product->brand,
                    'image_url' => $o->product->image_url,
                ] : null,
                'status'         => $o->status,
                'total_price'    => $o->total_price,
                'payment_method' => $o->payment_method,
                'has_code'       => $o->code !== null,
                'revealed'       => $o->code?->revealed_at !== null,
                'created_at'     => $o->created_at?->toIso8601String(),
            ]),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page'    => $orders->lastPage(),
                'total'        => $orders->total(),
            ],
        ]);
    }

    public function wallet(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'balance'  => (float) ($request->user()->wallet_balance ?? 0),
                'currency' => 'SAR',
            ],
        ]);
    }

    public function topUp(Request $request): JsonResponse
    {
        $request->validate([
            'amount'         => ['required', 'numeric', 'min:10', 'max:10000'],
            'payment_method' => ['required', 'string', 'in:card,mada,stc_pay'],
        ]);

        $user   = $request->user();
        $amount = (float) $request->input('amount');

        DB::table('users')
            ->where('id', $user->id)
            ->increment('wallet_balance', $amount);

        Log::info("Wallet topped up {$amount} SAR for user {$user->id}");

        return response()->json([
            'message' => 'Wallet topped up successfully.',
            'data'    => [
                'balance'  => (float) DB::table('users')->where('id', $user->id)->value('wallet_balance'),
                'currency' => 'SAR',
            ],
        ]);
    }
}
