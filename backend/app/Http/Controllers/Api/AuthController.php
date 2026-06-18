<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\LoginNotification;
use App\Mail\WelcomeEmail;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

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

        // Auto-join the global Dawri Community so the user sees channels immediately.
        $this->joinGlobalCommunity($user);

        // Send welcome email (queued — non-blocking)
        Mail::to($user->email)->queue(new WelcomeEmail($user));

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

        // Sign-in security: send notification to BOTH channels
        // 1) Email — login alert with IP, device, time
        // 2) SMS OTP — handled separately by POST /api/v1/auth/otp/send
        Mail::to($user->email)->queue(new LoginNotification(
            user:      $user,
            ipAddress: $request->ip() ?? 'Unknown',
            userAgent: substr($request->userAgent() ?? 'Unknown', 0, 80),
            loginAt:   now()->setTimezone('Asia/Riyadh')->format('d M Y, H:i T'),
        ));

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
     * POST /api/v1/auth/password/forgot
     * Sends a password reset link to the user's email address.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        // Use Laravel's built-in Password broker — sends a signed reset link.
        // Always returns success to prevent email enumeration attacks.
        Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => 'If an account with that email exists, a password reset link has been sent.',
        ]);
    }

    /**
     * POST /api/v1/auth/password/reset
     * Resets the user's password using the token from the reset email.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token'                 => ['required', 'string'],
            'email'                 => ['required', 'email'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password'       => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                // Revoke all existing tokens so previous sessions are logged out.
                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'message' => __($status),
            ], 422);
        }

        return response()->json(['message' => 'Password reset successfully. Please sign in with your new password.']);
    }

    /**
     * Add the user as a member of the global Dawri Community.
     * Idempotent — safe to call even if the user is already a member.
     * Called on registration so every new user sees channels immediately.
     */
    private function joinGlobalCommunity(User $user): void
    {
        try {
            $global = Community::where('type', 'global')->first();
            if (! $global) return;

            CommunityMember::firstOrCreate(
                ['community_id' => $global->id, 'user_id' => $user->id],
                ['role' => 'member', 'joined_at' => now()],
            );
        } catch (\Throwable $e) {
            // Non-fatal — user can still use the platform; log and continue.
            \Illuminate\Support\Facades\Log::warning('joinGlobalCommunity failed: ' . $e->getMessage());
        }
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
