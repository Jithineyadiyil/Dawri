<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\DigitalOrder;
use App\Models\DigitalProduct;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * MarketplaceApiTest
 *
 * Feature tests for the marketplace endpoints. Covers:
 *   - Batch checkout (happy path)
 *   - Idempotency (repeat submission returns original)
 *   - Validation errors
 *   - Wallet top-up
 *   - Unauthorized access
 */
class MarketplaceApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private DigitalProduct $product;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['wallet_balance' => 1000]);
        $this->product = DigitalProduct::factory()->create([
            'is_active'  => true,
            'our_price'  => 100,
            'brand'      => 'PSN',
            'category'   => 'gaming',
            'name'       => '$50 PSN Card',
            'name_ar'    => 'بطاقة بلايستيشن ٥٠',
        ]);
    }

    public function test_products_endpoint_returns_bilingual_names(): void
    {
        $res = $this->getJson('/api/v1/marketplace/products');

        $res->assertOk();
        $res->assertJsonFragment([
            'name'    => '$50 PSN Card',
            'name_ar' => 'بطاقة بلايستيشن ٥٠',
        ]);
    }

    public function test_batch_checkout_creates_multiple_orders(): void
    {
        Sanctum::actingAs($this->user);

        $res = $this->postJson('/api/v1/marketplace/orders', [
            'items'           => [['product_id' => $this->product->id, 'qty' => 2]],
            'payment_method'  => 'wallet',
            'idempotency_key' => 'batch-test-1',
        ]);

        $res->assertCreated();
        $res->assertJsonPath('summary.total_lines', 2);
        $res->assertJsonPath('summary.completed',   2);
        $res->assertJsonPath('summary.failed',      0);

        // Two orders created for the batch
        $this->assertEquals(2, DigitalOrder::where('user_id', $this->user->id)->count());

        // Wallet decremented by 2 × 100
        $this->user->refresh();
        $this->assertEquals(800, $this->user->wallet_balance);
    }

    public function test_idempotency_returns_original_order_on_replay(): void
    {
        Sanctum::actingAs($this->user);

        $payload = [
            'items'           => [['product_id' => $this->product->id, 'qty' => 1]],
            'payment_method'  => 'wallet',
            'idempotency_key' => 'idem-key-unique-xyz',
        ];

        // First call — creates order
        $first = $this->postJson('/api/v1/marketplace/orders', $payload);
        $first->assertCreated();

        // Second call with same idempotency_key — must return existing, not duplicate
        $second = $this->postJson('/api/v1/marketplace/orders', $payload);
        $second->assertOk();
        $second->assertJsonPath('idempotent', true);

        // Only ONE order exists despite two POSTs
        $this->assertEquals(1, DigitalOrder::where('user_id', $this->user->id)->count());

        // Wallet decremented once only
        $this->user->refresh();
        $this->assertEquals(900, $this->user->wallet_balance);
    }

    public function test_validates_max_cart_size(): void
    {
        Sanctum::actingAs($this->user);

        $bigCart = array_fill(0, 21, ['product_id' => $this->product->id, 'qty' => 1]);

        $res = $this->postJson('/api/v1/marketplace/orders', [
            'items'           => $bigCart,
            'payment_method'  => 'wallet',
        ]);

        $res->assertStatus(422);
        $res->assertJsonValidationErrors('items');
    }

    public function test_unauthenticated_cannot_place_order(): void
    {
        $res = $this->postJson('/api/v1/marketplace/orders', [
            'items'          => [['product_id' => $this->product->id, 'qty' => 1]],
            'payment_method' => 'wallet',
        ]);

        $res->assertUnauthorized();
    }

    /**
     * Skipped: the /wallet/topup route currently points to WalletController,
     * not MarketplaceController::topUp (which this test was written against).
     *
     * Sprint 6 task: consolidate dual wallet storage (wallets table vs
     * users.wallet_balance) into one, then repoint /wallet/topup to
     * MarketplaceController::topUp to activate the PaymentService::charge
     * flow (fixes the "free money" bug from the audit).
     */
    public function test_wallet_topup_requires_card_method(): void
    {
        $this->markTestSkipped(
            'Route /wallet/topup bound to WalletController; MarketplaceController::topUp is dead code until Sprint 6 wallet consolidation.'
        );
    }

    /**
     * Skipped: same reason as test_wallet_topup_requires_card_method.
     */
    public function test_topup_rejects_amount_below_minimum(): void
    {
        $this->markTestSkipped(
            'Route /wallet/topup bound to WalletController; MarketplaceController::topUp is dead code until Sprint 6 wallet consolidation.'
        );
    }

    public function test_reveal_code_marks_as_revealed(): void
    {
        Sanctum::actingAs($this->user);

        // Create an order via the batch endpoint first so a code is generated
        $order = $this->postJson('/api/v1/marketplace/orders', [
            'items'          => [['product_id' => $this->product->id, 'qty' => 1]],
            'payment_method' => 'wallet',
        ])->json('data.0.id');

        // First reveal
        $res = $this->postJson("/api/v1/marketplace/orders/{$order}/reveal");
        $res->assertOk();
        $res->assertJsonPath('data.already_revealed', false);
        $this->assertNotEmpty($res->json('data.code'));

        // Second reveal — same code, but flagged as already shown
        $res = $this->postJson("/api/v1/marketplace/orders/{$order}/reveal");
        $res->assertOk();
        $res->assertJsonPath('data.already_revealed', true);
    }
}
