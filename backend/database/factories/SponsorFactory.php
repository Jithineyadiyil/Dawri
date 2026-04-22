<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Sponsor> */
class SponsorFactory extends Factory
{
    protected $model = Sponsor::class;

    /** @return array<string, mixed> */
    public function definition(): array
    {
        $name = $this->faker->unique()->company();

        return [
            'name'       => $name,
            'name_ar'    => null,
            'slug'       => Str::slug($name) . '-' . $this->faker->unique()->numerify('#####'),
            'tagline'    => $this->faker->catchPhrase(),
            'logo_url'   => '/brands/generic.svg',
            'website_url'=> 'https://' . Str::slug($name) . '.example',
            'is_active'  => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }
}
