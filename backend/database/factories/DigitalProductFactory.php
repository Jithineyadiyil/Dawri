<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\DigitalProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DigitalProduct>
 *
 * Note on dual distributor_id / distributor_product_id columns:
 * The live digital_products table carries BOTH columns because the
 * original 2026-01-01 schema used `distributor_id` (NOT NULL) while the
 * 2026-04-08 follow-up migration added `distributor_product_id` without
 * dropping the first. Factory writes to both so inserts satisfy the NOT
 * NULL constraint on the legacy column.
 */
class DigitalProductFactory extends Factory
{
    protected $model = DigitalProduct::class;

    /**
     * Default state — a gaming card product, active and ready to purchase.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faceValue = $this->faker->randomElement([50, 100, 200, 500]);
        $stubId    = 'stub-' . $this->faker->unique()->numerify('#####');

        return [
            'distributor'            => 'likecard',
            'distributor_id'         => $stubId,  // legacy column (NOT NULL on live schema)
            'distributor_product_id' => $stubId,  // newer column used by current code
            'name'                   => "\${$faceValue} Gift Card",
            'name_ar'                => "بطاقة هدية {$faceValue} دولار",
            'brand'                  => $this->faker->randomElement(['PSN', 'Xbox', 'Steam', 'PUBG']),
            'category'               => 'gaming',
            'face_value'             => $faceValue,
            'currency'               => 'USD',
            'our_cost'               => $faceValue * 0.95,
            'our_price'              => $faceValue * 1.00,
            'region'                 => 'SA',
            'image_url'              => null,
            'is_active'              => true,
            'sort_order'             => 0,
        ];
    }

    /**
     * Mark the product as inactive (not purchasable).
     */
    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }

    /**
     * Force a specific brand (useful for testing brand-specific routing).
     */
    public function brand(string $brand): static
    {
        return $this->state(fn () => ['brand' => $brand]);
    }
}
