<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * POST /api/v1/auth/register
     */
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'                  => ['required', 'string', 'max:100'],
            'email'                 => ['required', 'email', 'unique:users,email'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            'phone'                 => ['nullable', 'string', 'max:20'],
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'phone'    => $data['phone'] ?? null,
            'role'     => 'player',
        ]);

        $token = $user->createToken('dawri-app')->plainTextToken;

        return response()->json([
            'data' => [
                'user'  => $this->userArray($user),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * POST /api/v1/auth/login
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 422);
        }

        // Revoke old tokens
        $user->tokens()->delete();

        $token = $user->createToken('dawri-app')->plainTextToken;

        return response()->json([
            'data' => [
                'user'  => $this->userArray($user),
                'token' => $token,
            ],
        ]);
    }

    /**
     * POST /api/v1/auth/logout
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * GET /api/v1/auth/me
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $this->userArray($request->user()),
        ]);
    }

    /**
     * POST /api/v1/auth/otp/send
     */
    public function sendOtp(Request $request): JsonResponse
    {
        $request->validate(['phone' => ['nullable', 'string']]);

        $phone = $request->input('phone')
            ?? $request->user()?->phone;

        if ($phone) {
            $otp = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            Cache::put("otp:{$phone}", Hash::make($otp), now()->addMinutes(5));

            // In dev: OTP is logged. In production: dispatch via Unifonic/Taqnyat
            logger()->info("OTP for {$phone}: {$otp}");
        }

        return response()->json(['message' => 'OTP sent.']);
    }

    /**
     * POST /api/v1/auth/otp/verify
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $request->validate([
            'phone' => ['nullable', 'string'],
            'otp'   => ['required', 'string', 'size:6'],
        ]);

        $phone  = $request->input('phone') ?? $request->user()?->phone;
        $stored = Cache::get("otp:{$phone}");

        if (! $stored || ! Hash::check($request->input('otp'), $stored)) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        Cache::forget("otp:{$phone}");

        if ($user = $request->user()) {
            $user->update(['phone_verified_at' => now()]);
        }

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    /**
     * Transform user model to array for API response.
     */
    private function userArray(User $user): array
    {
        return [
            'id'                => $user->id,
            'name'              => $user->name,
            'email'             => $user->email,
            'phone'             => $user->phone,
            'role'              => $user->role ?? 'player',
            'avatar'            => $user->avatar,
            'game_username'     => $user->game_username,
            'subscription_plan' => $user->subscription_plan ?? 'free',
            'phone_verified_at' => $user->phone_verified_at?->toIso8601String(),
            'created_at'        => $user->created_at?->toIso8601String(),
        ];
    }
}
