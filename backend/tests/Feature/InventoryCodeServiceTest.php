<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Exceptions\OutOfStockException;
use App\Models\DigitalProduct;
use App\Models\ProductCode;
use App\Services\InventoryCodeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * InventoryCodeServiceTest (hotfix v2)
 *
 * WHY THE PREVIOUS FIX FAILED:
 *   The original test fixture passed `distributor_id` to DigitalProduct::create()
 *   but Laravel silently dropped it because the column is NOT in the model's
 *   $fillable array. Only keys listed in $fillable survive mass-assignment.
 *   The INSERT SQL showed no `distributor_id`, so MySQL rejected it.
 *
 * THE FIX:
 *   Use DigitalProduct::unguarded(...) to disable mass-assignment protection
 *   for test fixture creation. This bypasses $fillable entirely and lets ANY
 *   key reach the INSERT — future-proofs the tests against other NOT-NULL
 *   columns we haven't discovered yet. Production code is unaffected because
 *   unguarded() only applies inside the closure.
 *
 *   `distributor_id` is NOT added to $fillable on purpose — the column is
 *   tech debt scheduled for removal (duplicate of `distributor`). We don't
 *   want real code paths to start writing to it.
 */
class InventoryCodeServiceTest extends TestCase
{
    use RefreshDatabase;

    private InventoryCodeService $service;
    private DigitalProduct       $product;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(InventoryCodeService::class);
        $this->product = $this->makeProduct();
    }

    /**
     * Helper — create a DigitalProduct with all schema-required columns.
     * Uses unguarded() to bypass $fillable.
     */
    private function makeProduct(array $overrides = []): DigitalProduct
    {
        $attrs = array_merge([
            'id'                   => (string) Str::uuid(),
            'distributor'          => 'likecard',
            'distributor_id'       => 'likecard',
            'name'                 => 'Apple Pay 50 SAR',
            'name_ar'              => 'آبل باي 50 ريال',
            'brand'                => 'Apple',
            'category'             => 'gaming',
            'face_value'           => 50.00,
            'currency'             => 'SAR',
            'our_price'            => 52.00,
            'our_cost'             => 47.50,
            'region'               => 'SA',
            'is_active'            => true,
            'sort_order'           => 0,
            'fulfillment_mode'     => 'inventory',
            'low_stock_threshold'  => 5,
        ], $overrides);

        return DigitalProduct::unguarded(
            fn () => DigitalProduct::create($attrs)
        );
    }

    // ── uploadBatch ──────────────────────────────────────────────────

    public function test_upload_inserts_codes_and_populates_batch(): void
    {
        $result = $this->service->uploadBatch(
            $this->product,
            [
                ['code' => 'ABCD-1111', 'serial' => 'SN001', 'expires_at' => '2027-12-31'],
                ['code' => 'ABCD-2222'],
                ['code' => 'ABCD-3333'],
            ],
            ['supplier_name' => 'LikeCard', 'supplier_ref' => 'PO-001', 'unit_cost_sar' => 47.50],
        );

        $this->assertSame(3, $result['inserted']);
        $this->assertSame(0, $result['duplicates']);
        $this->assertSame(3, $result['batch']->code_count);
        $this->assertEquals(142.50, (float) $result['batch']->total_cost_sar);
        $this->assertSame(3, ProductCode::where('product_id', $this->product->id)->count());
    }

    public function test_upload_dedupes_within_payload(): void
    {
        $result = $this->service->uploadBatch(
            $this->product,
            [
                ['code' => 'ABCD-1111'],
                ['code' => 'ABCD-1111'],
                ['code' => 'ABCD-2222'],
            ],
            ['supplier_name' => 'LikeCard'],
        );

        $this->assertSame(2, $result['inserted']);
        $this->assertSame(1, $result['duplicates']);
    }

    public function test_upload_dedupes_against_existing_codes(): void
    {
        $this->service->uploadBatch(
            $this->product,
            [['code' => 'ABCD-1111']],
            ['supplier_name' => 'LikeCard'],
        );

        $result = $this->service->uploadBatch(
            $this->product,
            [
                ['code' => 'ABCD-1111'],
                ['code' => 'ABCD-2222'],
            ],
            ['supplier_name' => 'LikeCard'],
        );

        $this->assertSame(1, $result['inserted']);
        $this->assertSame(1, $result['duplicates']);
        $this->assertSame(2, ProductCode::where('product_id', $this->product->id)->count());
    }

    public function test_upload_rejects_empty_and_oversized_codes(): void
    {
        $result = $this->service->uploadBatch(
            $this->product,
            [
                ['code' => ''],
                ['code' => '   '],
                ['code' => str_repeat('X', 600)],
                ['code' => 'VALID-CODE'],
            ],
            ['supplier_name' => 'LikeCard'],
        );

        $this->assertSame(1, $result['inserted']);
        $this->assertSame(3, $result['invalid']);
        $this->assertNotEmpty($result['sample_errors']);
    }

    public function test_upload_re_enables_hidden_product(): void
    {
        $this->product->is_active = false;
        $this->product->save();

        $this->service->uploadBatch(
            $this->product,
            [['code' => 'FRESH-STOCK']],
            ['supplier_name' => 'LikeCard'],
        );

        $this->assertTrue((bool) $this->product->fresh()->is_active);
    }

    // ── claim ────────────────────────────────────────────────────────

    public function test_claim_returns_oldest_available_fifo(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'OLDEST-CODE']], ['supplier_name' => 'LikeCard']);

        usleep(100_000);

        $this->service->uploadBatch($this->product,
            [['code' => 'NEWER-CODE']], ['supplier_name' => 'LikeCard']);

        $claimed = $this->service->claim($this->product, (string) Str::uuid());

        $this->assertSame('OLDEST-CODE', $claimed->code_enc);
        $this->assertSame(ProductCode::STATUS_RESERVED, $claimed->status);
    }

    public function test_claim_skips_expired_codes(): void
    {
        $this->service->uploadBatch($this->product, [
            ['code' => 'EXPIRED-CODE', 'expires_at' => '2020-01-01'],
            ['code' => 'FRESH-CODE',   'expires_at' => '2099-01-01'],
        ], ['supplier_name' => 'LikeCard']);

        $claimed = $this->service->claim($this->product, (string) Str::uuid());

        $this->assertSame('FRESH-CODE', $claimed->code_enc);
    }

    public function test_claim_throws_when_empty(): void
    {
        $this->expectException(OutOfStockException::class);
        $this->service->claim($this->product, (string) Str::uuid());
    }

    public function test_claim_skips_already_reserved_codes(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'CODE-A'], ['code' => 'CODE-B']],
            ['supplier_name' => 'LikeCard']);

        $first  = $this->service->claim($this->product, (string) Str::uuid());
        $second = $this->service->claim($this->product, (string) Str::uuid());

        $this->assertNotSame($first->code_enc, $second->code_enc);
        $this->assertSame(0, $this->service->availableCount($this->product->id));

        $this->expectException(OutOfStockException::class);
        $this->service->claim($this->product, (string) Str::uuid());
    }

    public function test_claim_prevents_double_allocation(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'SINGLE-CODE']],
            ['supplier_name' => 'LikeCard']);

        $firstOrderId  = (string) Str::uuid();
        $secondOrderId = (string) Str::uuid();

        $first = $this->service->claim($this->product, $firstOrderId);
        $this->assertSame($firstOrderId, $first->reserved_by_order_id);

        $this->expectException(OutOfStockException::class);
        $this->service->claim($this->product, $secondOrderId);
    }

    // ── deliver ──────────────────────────────────────────────────────

    public function test_deliver_is_terminal_and_idempotent(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'CODE-A']], ['supplier_name' => 'LikeCard']);

        $claimed   = $this->service->claim($this->product, (string) Str::uuid());
        $delivered = $this->service->deliver($claimed);

        $this->assertSame(ProductCode::STATUS_DELIVERED, $delivered->status);
        $this->assertNotNull($delivered->delivered_at);

        $again = $this->service->deliver($delivered);
        $this->assertSame(ProductCode::STATUS_DELIVERED, $again->status);
    }

    public function test_deliver_auto_hides_product_on_empty_pool(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'LAST-CODE']], ['supplier_name' => 'LikeCard']);

        $claim = $this->service->claim($this->product, (string) Str::uuid());
        $this->service->deliver($claim);

        $this->assertFalse((bool) $this->product->fresh()->is_active);
    }

    public function test_deliver_does_not_auto_hide_api_mode_products(): void
    {
        $this->product->fulfillment_mode = 'api';
        $this->product->save();

        $code = ProductCode::create([
            'product_id'           => $this->product->id,
            'code_enc'             => 'MANUAL',
            'code_hash'            => ProductCode::hashCode('MANUAL'),
            'status'               => ProductCode::STATUS_RESERVED,
            'reserved_by_order_id' => (string) Str::uuid(),
            'reserved_at'          => now(),
        ]);

        $this->service->deliver($code);

        $this->assertTrue((bool) $this->product->fresh()->is_active);
    }

    // ── release ──────────────────────────────────────────────────────

    public function test_release_returns_code_to_available(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'RELEASE-ME']], ['supplier_name' => 'LikeCard']);

        $claimed  = $this->service->claim($this->product, (string) Str::uuid());
        $released = $this->service->release($claimed);

        $this->assertSame(ProductCode::STATUS_AVAILABLE, $released->status);
        $this->assertNull($released->reserved_by_order_id);
        $this->assertSame(1, $this->service->availableCount($this->product->id));
    }

    public function test_release_is_idempotent_on_available_code(): void
    {
        $this->service->uploadBatch($this->product,
            [['code' => 'NEVER-RESERVED']], ['supplier_name' => 'LikeCard']);

        $code = ProductCode::where('product_id', $this->product->id)->first();
        $result = $this->service->release($code);

        $this->assertSame(ProductCode::STATUS_AVAILABLE, $result->status);
    }

    // ── markExpired + stockBreakdown ─────────────────────────────────

    public function test_markExpired_updates_only_past_dated_available(): void
    {
        ProductCode::create([
            'product_id' => $this->product->id,
            'code_enc'   => 'EXPIRED-A',
            'code_hash'  => ProductCode::hashCode('EXPIRED-A'),
            'expires_at' => '2020-01-01',
            'status'     => ProductCode::STATUS_AVAILABLE,
        ]);
        ProductCode::create([
            'product_id' => $this->product->id,
            'code_enc'   => 'FRESH-B',
            'code_hash'  => ProductCode::hashCode('FRESH-B'),
            'expires_at' => '2099-01-01',
            'status'     => ProductCode::STATUS_AVAILABLE,
        ]);
        ProductCode::create([
            'product_id' => $this->product->id,
            'code_enc'   => 'NO-EXPIRY-C',
            'code_hash'  => ProductCode::hashCode('NO-EXPIRY-C'),
            'expires_at' => null,
            'status'     => ProductCode::STATUS_AVAILABLE,
        ]);

        $updated = $this->service->markExpired();

        $this->assertSame(1, $updated);

        $this->assertSame(ProductCode::STATUS_EXPIRED,
            ProductCode::where('code_hash', ProductCode::hashCode('EXPIRED-A'))->first()->status);
        $this->assertSame(ProductCode::STATUS_AVAILABLE,
            ProductCode::where('code_hash', ProductCode::hashCode('FRESH-B'))->first()->status);
        $this->assertSame(ProductCode::STATUS_AVAILABLE,
            ProductCode::where('code_hash', ProductCode::hashCode('NO-EXPIRY-C'))->first()->status);
    }

    public function test_stockBreakdown_returns_counts_by_status(): void
    {
        $this->service->uploadBatch($this->product, [
            ['code' => 'A'], ['code' => 'B'], ['code' => 'C'],
        ], ['supplier_name' => 'LikeCard']);

        $c1 = $this->service->claim($this->product, (string) Str::uuid());
        $this->service->deliver($c1);

        $this->service->claim($this->product, (string) Str::uuid());

        $b = $this->service->stockBreakdown($this->product->id);

        $this->assertSame(1, $b['available']);
        $this->assertSame(1, $b['reserved']);
        $this->assertSame(1, $b['delivered']);
        $this->assertSame(0, $b['expired']);
        $this->assertSame(3, $b['total']);
    }
}
