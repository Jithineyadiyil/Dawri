<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\DigitalProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DigitalProduct>
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

        return [
            'distributor'            => 'likecard',
            'distributor_product_id' => 'stub-' . $this->faker->unique()->numerify('#####'),
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
