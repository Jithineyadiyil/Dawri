<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sprint 1 fix: reconcile the phone_verified vs phone_verified_at column drift.
 *
 * Problem:
 *   Original migration created `phone_verified` (bool).
 *   Every consumer in the codebase uses `phone_verified_at` (timestamp):
 *     - User model $fillable + $casts
 *     - AuthController::verifyOtp() sets phone_verified_at = now()
 *     - TournamentSeeder inserts phone_verified_at
 *     - TournamentRegistrationService gates on phone_verified_at !== null
 *     - UserResource exposes phone_verified = (phone_verified_at !== null)
 *
 *   Result: SQLSTATE[42S22] Unknown column 'phone_verified_at' on OTP verify
 *   and TournamentSeeder. The phone-verified gate always passes (null check
 *   against missing attribute = null).
 *
 * Fix:
 *   1. Add phone_verified_at (timestamp, nullable) to users.
 *   2. Backfill: if the old phone_verified bool exists and was true,
 *      set phone_verified_at = users.created_at (best-available proxy).
 *   3. Keep the old phone_verified column for one release for backward
 *      compatibility; a follow-up migration can drop it after verification.
 */
return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Add the timestamp column.
        Schema::table('users', static function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'phone_verified_at')) {
                $table->timestamp('phone_verified_at')
                    ->nullable()
                    ->after('phone')
                    ->comment('Timestamp of successful OTP verification; null means unverified.');
            }
        });

        // Step 2: Backfill from the old bool column, if it exists.
        if (Schema::hasColumn('users', 'phone_verified')) {
            DB::statement("
                UPDATE users
                SET    phone_verified_at = COALESCE(created_at, NOW())
                WHERE  phone_verified = 1
                  AND  phone_verified_at IS NULL
            ");
        }
    }

    public function down(): void
    {
        Schema::table('users', static function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'phone_verified_at')) {
                $table->dropColumn('phone_verified_at');
            }
        });
    }
};
