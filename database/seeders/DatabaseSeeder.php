<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat Admin
        \App\Models\User::create([
            'name' => 'Admin Gundam',
            'username' => 'AdminToko',
            'email' => 'admin@gundam.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Buat 10 Buyer dummy
        $customers = [
            ['name' => 'Amuro Ray', 'username' => 'amuro_rx78', 'email' => 'amuro@efsf.com'],
            ['name' => 'Char Aznable', 'username' => 'red_comet', 'email' => 'char@zeon.com'],
            ['name' => 'Kira Yamato', 'username' => 'kira_strike', 'email' => 'kira@zaft.com'],
            ['name' => 'Setsuna F. Seiei', 'username' => 'setsuna_exia', 'email' => 'setsuna@cb.com'],
            ['name' => 'Mikazuki Augus', 'username' => 'mika_barbatos', 'email' => 'mika@tekkadan.com'],
        ];

        foreach ($customers as $customer) {
            User::create([
                'name' => $customer['name'],
                'username' => $customer['username'],
                'email' => $customer['email'],
                'password' => Hash::make('password'),
                'role' => 'customer',
            ]);
        }

        // Buat 30 Produk Gundam
        \App\Models\Product::factory(30)->create();
    }
}
