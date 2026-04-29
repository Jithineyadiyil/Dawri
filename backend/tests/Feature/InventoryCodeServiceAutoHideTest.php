<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\DigitalProduct;
use App\Services\InventoryCodeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * InventoryCodeServiceAutoHideTest (v2 — unguarded fixture).
 *
 * Uses DigitalProduct::unguarded(...) so `distributor_id` reaches the
 * INSERT despite not being in the model's $fillable array. Matches the
 * fix pattern used in InventoryCodeServiceTest v2.
 */
class InventoryCodeServiceAutoHideTest extends TestCase
{
    use RefreshDatabase;

    private InventoryCodeService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(InventoryCodeService::class);
    }

    private function makeProduct(array $overrides = []): DigitalProduct
    {
        $attrs = array_merge([
            'id'                   => (string) Str::uuid(),
            'distributor'          => 'likecard',
            'distributor_id'       => 'likecard',
            'name'                 => 'Test Product',
            'brand'                => 'Apple',
            'category'             => 'gaming',
            'face_value'           => 50.00,
            'currency'             => 'SAR',
            'our_price'            => 52.00,
            'region'               => 'SA',
            'is_active'            => true,
            'sort_order'           => 0,
            'fulfillment_mode'     => 'inventory',
            'low_stock_threshold'  => 5,
            'auto_hide_when_empty' => true,
        ], $overrides);

        return DigitalProduct::unguarded(
            fn () => DigitalProduct::create($attrs)
        );
    }

    public function test_auto_hide_runs_when_flag_is_true(): void
    {
        $product = $this->makeProduct(['auto_hide_when_empty' => true]);

        $this->service->uploadBatch($product,
            [['code' => 'LAST-CODE']],
            ['supplier_name' => 'LikeCard']);

        $claim = $this->service->claim($product, (string) Str::uuid());
        $this->service->deliver($claim);

        $this->assertFalse((bool) $product->fresh()->is_active,
            'Product should auto-hide when flag=true and pool empties');
    }

    public function test_auto_hide_skipped_when_flag_is_false(): void
    {
        $product = $this->makeProduct(['auto_hide_when_empty' => false]);

        $this->service->uploadBatch($product,
            [['code' => 'LAST-CODE']],
            ['supplier_name' => 'LikeCard']);

        $claim = $this->service->claim($product, (string) Str::uuid());
        $this->service->deliver($claim);

        $this->assertTrue((bool) $product->fresh()->is_active,
            'Product should stay visible when flag=false even at 0 stock');
    }

    public function test_auto_re_enable_on_refill_when_flag_is_true(): void
    {
        $product = $this->makeProduct(['auto_hide_when_empty' => true]);
        $product->is_active = false;
        $product->save();

        $this->service->uploadBatch($product,
            [['code' => 'FRESH']],
            ['supplier_name' => 'LikeCard']);

        $this->assertTrue((bool) $product->fresh()->is_active,
            'Product should auto re-enable when flag=true and stock refilled');
    }

    public function test_auto_re_enable_skipped_when_flag_is_false(): void
    {
        $product = $this->makeProduct(['auto_hide_when_empty' => false]);
        $product->is_active = false;
        $product->save();

        $this->service->uploadBatch($product,
            [['code' => 'FRESH']],
            ['supplier_name' => 'LikeCard']);

        $this->assertFalse((bool) $product->fresh()->is_active,
            'Product manually hidden should stay hidden on refill when flag=false');
    }

    public function test_api_mode_products_never_auto_hide(): void
    {
        $product = $this->makeProduct([
            'fulfillment_mode'     => 'api',
            'auto_hide_when_empty' => true,
        ]);

        $this->assertFalse($product->shouldAutoHide(),
            'api-mode products should never auto-hide');
    }

    public function test_shouldAutoHide_returns_true_for_inventory_with_flag(): void
    {
        $product = $this->makeProduct([
            'fulfillment_mode'     => 'inventory',
            'auto_hide_when_empty' => true,
        ]);

        $this->assertTrue($product->shouldAutoHide());
    }

    public function test_shouldAutoHide_returns_false_for_inventory_without_flag(): void
    {
        $product = $this->makeProduct([
            'fulfillment_mode'     => 'inventory',
            'auto_hide_when_empty' => false,
        ]);

        $this->assertFalse($product->shouldAutoHide());
    }
}
