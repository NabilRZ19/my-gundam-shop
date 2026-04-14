<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        // Biar nama dummy-nya lebih kerasa jualan Gundam
        $mechas = ['RX-78-2 Gundam', 'Zaku II', 'Barbatos Lupus', 'Gundam Exia', 'Unicorn Gundam', 'Nu Gundam', 'Sazabi', 'Gundam Aerial', 'Strike Freedom', 'Destiny Gundam'];

        return [
            'name' => $this->faker->randomElement($mechas) . ' ' . $this->faker->word(),
            'description' => $this->faker->paragraph(),

            // Sesuaikan persis dengan enum di migration
            'grade' => $this->faker->randomElement(['HG', 'RG', 'MG', 'PG', 'SD', 'FM', 'MGSD']),
            'originality' => $this->faker->randomElement(['Bandai Original', 'Bootleg', 'Third-Party']),

            // Harga random antara 150.000 sampai 4.000.000
            'price' => $this->faker->numberBetween(150000, 4000000),

            'stock' => $this->faker->numberBetween(0, 50),

            // Sesuaikan persis dengan enum status
            'status' => $this->faker->randomElement(['available', 'out_of_stock', 'discontinued', 'coming_soon']),

            // Disesuaikan dengan nama kolom baru
            'image_url' => 'https://placehold.co/600x600?text=Gunpla+Kit',
        ];
    }
}
