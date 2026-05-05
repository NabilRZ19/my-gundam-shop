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

    // Mapping nama unit ke series asal
    protected static array $unitSeriesMap = [
        'RX-78-2 Gundam'       => 'Mobile Suit Gundam',
        'Zaku II'              => 'Mobile Suit Gundam',
        'Char\'s Zaku II'     => 'Mobile Suit Gundam',
        'Gundam Mk-II'        => 'Zeta Gundam',
        'Zeta Gundam'          => 'Zeta Gundam',
        'Nu Gundam'            => 'Char\'s Counterattack',
        'Sazabi'               => 'Char\'s Counterattack',
        'Wing Zero EW'         => 'Gundam Wing: Endless Waltz',
        'Gundam Wing'          => 'Gundam Wing',
        'Tallgeese III'        => 'Gundam Wing',
        'Strike Gundam'        => 'Gundam SEED',
        'Strike Freedom'       => 'Gundam SEED Destiny',
        'Destiny Gundam'       => 'Gundam SEED Destiny',
        'Freedom Gundam'       => 'Gundam SEED',
        'Infinite Justice'     => 'Gundam SEED Destiny',
        'Gundam Exia'          => 'Gundam 00',
        'Gundam 00 Raiser'     => 'Gundam 00',
        'Reborns Gundam'       => 'Gundam 00',
        'Unicorn Gundam'       => 'Gundam Unicorn',
        'Sinanju'              => 'Gundam Unicorn',
        'Kshatriya'            => 'Gundam Unicorn',
        'AGE-1 Gundam'         => 'Gundam AGE',
        'Gundam Build Strike'  => 'Gundam Build Fighters',
        'Gundam Barbatos'      => 'Iron-Blooded Orphans',
        'Barbatos Lupus'       => 'Iron-Blooded Orphans',
        'Barbatos Lupus Rex'   => 'Iron-Blooded Orphans',
        'Gundam Gusion'        => 'Iron-Blooded Orphans',
        'Gundam Vidar'         => 'Iron-Blooded Orphans',
        'Gundam Aerial'        => 'The Witch from Mercury',
        'Gundam Calibarn'      => 'The Witch from Mercury',
        'Pharact'              => 'The Witch from Mercury',
    ];

    public function definition(): array
    {
        $units = array_keys(self::$unitSeriesMap);
        $name  = $this->faker->randomElement($units);
        $series = self::$unitSeriesMap[$name];

        return [
            'name'        => $name,
            'description' => $this->faker->paragraph(),
            'grade'       => $this->faker->randomElement(['HG', 'RG', 'MG', 'PG', 'SD', 'FM', 'MGSD']),
            'originality' => $this->faker->randomElement(['Bandai Original', 'Bootleg', 'Third-Party']),
            'price'       => $this->faker->numberBetween(150000, 4000000),
            'stock'       => $this->faker->numberBetween(0, 50),
            'status'      => $this->faker->randomElement(['available', 'out_of_stock', 'discontinued', 'coming_soon']),
            'image_url'   => 'https://placehold.co/600x600?text=' . urlencode($name),
            'series'      => $series,
        ];
    }
}
