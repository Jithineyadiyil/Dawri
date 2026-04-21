<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\User;
use App\Services\PaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * PaymentServiceTest
 *
 * Unit tests for the payment abstraction:
 *   - Wallet success path decrements balance
 *   - Wallet insufficient-funds returns 422-style failure
 *   - Card payment auto-approves in sandbox
 *   - refund() restores wallet balance
 *   - refund() credits wallet as goodwill when original method was card (sandbox)
 */
class PaymentServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_wallet_charge_deducts_balance(): void
    {
        $user = User::factory()->create(['wallet_balance' => 500]);

        $result = app(PaymentService::class)->charge($user, 100.00, 'wallet', 'ref-1');

        $this->assertTrue($result['success']);
        $this->assertSame('WALLET-ref-1', $result['payment_ref']);
        $this->assertEquals(400, DB::table('users')->where('id', $user->id)->value('wallet_balance'));
    }

    public function test_wallet_charge_fails_when_insufficient_funds(): void
    {
        $user = User::factory()->create(['wallet_balance' => 50]);

        $result = app(PaymentService::class)->charge($user, 100.00, 'wallet', 'ref-2');

        $this->assertFalse($result['success']);
        $this->assertStringContainsString('Insufficient', $result['message']);
        // Balance unchanged
        $this->assertEquals(50, DB::table('users')->where('id', $user->id)->value('wallet_balance'));
    }

    public function test_card_payment_autoapproves_in_sandbox(): void
    {
        $user = User::factory()->create(['wallet_balance' => 0]);

        $result = app(PaymentService::class)->charge($user, 250.00, 'card', 'ref-3');

        // In testing env, sandbox auto-approval kicks in
        $this->assertTrue($result['success']);
        $this->assertStringContainsString('sandbox', strtolower($result['message']));
        $this->assertStringStartsWith('CARD-SBX-', $result['payment_ref']);
    }

    public function test_refund_restores_wallet_balance(): void
    {
        $user = User::factory()->create(['wallet_balance' => 400]);

        $result = app(PaymentService::class)->refund($user, 100.00, 'wallet', 'ref-4');

        $this->assertTrue($result['success']);
        $this->assertEquals(500, DB::table('users')->where('id', $user->id)->value('wallet_balance'));
    }

    public function test_card_refund_credits_wallet_as_goodwill_in_sandbox(): void
    {
        $user = User::factory()->create(['wallet_balance' => 0]);

        $result = app(PaymentService::class)->refund($user, 75.00, 'card', 'ref-5');

        $this->assertTrue($result['success']);
        $this->assertEquals(75, DB::table('users')->where('id', $user->id)->value('wallet_balance'));
    }

    public function test_rejects_invalid_amount(): void
    {
        $user = User::factory()->create(['wallet_balance' => 500]);

        $result = app(PaymentService::class)->charge($user, 0, 'wallet', 'ref-6');
        $this->assertFalse($result['success']);

        $result = app(PaymentService::class)->charge($user, -10, 'wallet', 'ref-7');
        $this->assertFalse($result['success']);
    }

    public function test_rejects_unknown_payment_method(): void
    {
        $user = User::factory()->create(['wallet_balance' => 500]);

        $result = app(PaymentService::class)->charge($user, 50, 'bitcoin', 'ref-8');

        $this->assertFalse($result['success']);
        $this->assertStringContainsString('Unknown payment method', $result['message']);
    }
}
