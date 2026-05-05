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
            'name'     => 'Admin Gundam',
            'username' => 'AdminToko',
            'email'    => 'admin@gundam.com',
            'password' => bcrypt('password'),
            'role'     => 'admin',
        ]);

        // Buat beberapa Buyer dummy
        $customers = [
            ['name' => 'Amuro Ray',        'username' => 'amuro_rx78',    'email' => 'amuro@efsf.com'],
            ['name' => 'Char Aznable',     'username' => 'red_comet',     'email' => 'char@zeon.com'],
            ['name' => 'Kira Yamato',      'username' => 'kira_strike',   'email' => 'kira@zaft.com'],
            ['name' => 'Setsuna F. Seiei', 'username' => 'setsuna_exia',  'email' => 'setsuna@cb.com'],
            ['name' => 'Mikazuki Augus',   'username' => 'mika_barbatos', 'email' => 'mika@tekkadan.com'],
        ];

        foreach ($customers as $customer) {
            User::create([
                'name'     => $customer['name'],
                'username' => $customer['username'],
                'email'    => $customer['email'],
                'password' => Hash::make('password'),
                'role'     => 'customer',
            ]);
        }

        // Data produk dummy manual (kaya dengan atribut series)
        $products = [
            // === Mobile Suit Gundam (Universal Century) ===
            [
                'name'        => 'RX-78-2 Gundam',
                'description' => 'The legendary first Gundam. RX-78-2 dipiloti oleh Amuro Ray dalam Perang Satu Tahun melawan Zeon. Kit ini menampilkan detail panel line yang tajam dan aksesoris senjata lengkap.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 750000,
                'stock'       => 15,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=RX-78-2+MG&font=montserrat',
                'series'      => 'Mobile Suit Gundam',
            ],
            [
                'name'        => 'Char\'s Zaku II',
                'description' => 'Zaku II milik Char Aznable, the Red Comet dari Zeon. Dengan warna merah khasnya, dikatakan 3x lebih cepat dari Zaku biasa. Kit MG versi 2.0 ini punya inner frame detail.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 680000,
                'stock'       => 8,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=Char+Zaku+II+MG&font=montserrat',
                'series'      => 'Mobile Suit Gundam',
            ],
            [
                'name'        => 'RX-78-2 Gundam',
                'description' => 'Versi High Grade dari legenda abadi RX-78-2. Cocok untuk pemula yang ingin memulai perjalanan gunpla mereka dengan ikon paling ikonik.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 185000,
                'stock'       => 30,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=RX-78-2+HG&font=montserrat',
                'series'      => 'Mobile Suit Gundam',
            ],

            // === Char's Counterattack ===
            [
                'name'        => 'Nu Gundam Ver.Ka',
                'description' => 'Gundam terakhir Amuro Ray. Versi Ka dari Katoki Hajime dengan propellant tank fin funnel dan detail eksklusif. Salah satu kit MG paling prestisius.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 1250000,
                'stock'       => 5,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=Nu+Gundam+Ver.Ka&font=montserrat',
                'series'      => 'Char\'s Counterattack',
            ],
            [
                'name'        => 'Sazabi Ver.Ka',
                'description' => 'Mobile suit Char Aznable di CCA. Kit MG Ver.Ka dengan inner frame luar biasa detail, 6 funnel, cockpit yang bisa dibuka, dan finishing yang memukau.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 1350000,
                'stock'       => 4,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=Sazabi+Ver.Ka&font=montserrat',
                'series'      => 'Char\'s Counterattack',
            ],

            // === Zeta Gundam ===
            [
                'name'        => 'Zeta Gundam Ver.Ka',
                'description' => 'Transformable mobile suit klasik dari Kamille Bidan. Kit MG Ver.Ka bisa transformasi penuh dari mobile suit ke wave rider tanpa harus lepas part.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 950000,
                'stock'       => 7,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=Zeta+Gundam&font=montserrat',
                'series'      => 'Zeta Gundam',
            ],

            // === Gundam Wing ===
            [
                'name'        => 'Wing Zero EW',
                'description' => 'XXXG-00W0 Wing Gundam Zero Custom dari film Endless Waltz. Sayap malaikat yang ikonik dengan twin buster rifle. RG dengan detail luar biasa.',
                'grade'       => 'RG',
                'originality' => 'Bandai Original',
                'price'       => 580000,
                'stock'       => 12,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=Wing+Zero+EW+RG&font=montserrat',
                'series'      => 'Gundam Wing: Endless Waltz',
            ],
            [
                'name'        => 'Gundam Deathscythe Hell EW',
                'description' => 'XXXG-01D2 Gundam Deathscythe Hell Custom. Dengan active cloak dan beam scythe berukuran raksasa. Desain gothic yang paling gelap di seri Wing.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 220000,
                'stock'       => 18,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/1A1A2E/9B59B6?text=Deathscythe+Hell&font=montserrat',
                'series'      => 'Gundam Wing: Endless Waltz',
            ],

            // === Gundam SEED ===
            [
                'name'        => 'Strike Freedom Gundam',
                'description' => 'Mobile suit ultimate milik Kira Yamato. PG Strike Freedom dengan LED unit bercahaya pada DRAGOON system dan wing buster rifle. The pinnacle of SEED series.',
                'grade'       => 'PG',
                'originality' => 'Bandai Original',
                'price'       => 3500000,
                'stock'       => 2,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF8E1/C8970A?text=PG+Strike+Freedom&font=montserrat',
                'series'      => 'Gundam SEED Destiny',
            ],
            [
                'name'        => 'Strike Freedom Gundam',
                'description' => 'Versi RG dari Strike Freedom dengan detail luar biasa dalam skala 1/144. Full Burst mode DRAGOON system terartikulasi dan bersayap. Wajib koleksi.',
                'grade'       => 'RG',
                'originality' => 'Bandai Original',
                'price'       => 620000,
                'stock'       => 10,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF8E1/C8970A?text=Strike+Freedom+RG&font=montserrat',
                'series'      => 'Gundam SEED Destiny',
            ],
            [
                'name'        => 'Destiny Gundam',
                'description' => 'Mobile suit milik Shinn Asuka. Dengan palm beam cannons, anti-ship sword, dan flash edge 2 beam boomerang. HG dengan poseability yang baik.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 195000,
                'stock'       => 22,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/1A1A2E/E74C3C?text=Destiny+Gundam&font=montserrat',
                'series'      => 'Gundam SEED Destiny',
            ],
            [
                'name'        => 'Infinite Justice Gundam',
                'description' => 'Mobile suit Athrun Zala di SEED Destiny. Dilengkapi fatum-01 sub-flight lifter dan beam saber di berbagai posisi. MG dengan articulation joint detail.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 820000,
                'stock'       => 6,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=Infinite+Justice&font=montserrat',
                'series'      => 'Gundam SEED Destiny',
            ],

            // === Gundam 00 ===
            [
                'name'        => 'Gundam Exia',
                'description' => 'GN-001 Gundam Exia, mobile suit Setsuna F. Seiei. Kit RG dengan GN Drive transparan, 7 pedang/saber terartikulasi, dan GN field effect part.',
                'grade'       => 'RG',
                'originality' => 'Bandai Original',
                'price'       => 520000,
                'stock'       => 14,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=Gundam+Exia+RG&font=montserrat',
                'series'      => 'Gundam 00',
            ],
            [
                'name'        => '00 Raiser',
                'description' => 'GNT-0000 00 Raiser dengan 0 Raiser support unit. Kit MG Ver.Ka dengan GN Drive Twin yang ikonik dan trans-am effect parts berwarna merah transparan.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 1150000,
                'stock'       => 5,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=00+Raiser+MG&font=montserrat',
                'series'      => 'Gundam 00',
            ],

            // === Gundam Unicorn ===
            [
                'name'        => 'Unicorn Gundam',
                'description' => 'RX-0 Unicorn Gundam dalam versi Perfect Grade. Kit dengan LED unit untuk Psycho-frame yang menyala, transformasi dari Unicorn ke Destroy Mode.',
                'grade'       => 'PG',
                'originality' => 'Bandai Original',
                'price'       => 3800000,
                'stock'       => 1,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=PG+Unicorn&font=montserrat',
                'series'      => 'Gundam Unicorn',
            ],
            [
                'name'        => 'Sinanju',
                'description' => 'MSN-06S Sinanju milik Full Frontal. Kit MG dengan gold decal, thruster vernier detail penuh, dan funnel yang terartikulasi. Terasa sangat premium.',
                'grade'       => 'MG',
                'originality' => 'Bandai Original',
                'price'       => 1200000,
                'stock'       => 4,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=Sinanju+MG&font=montserrat',
                'series'      => 'Gundam Unicorn',
            ],
            [
                'name'        => 'Unicorn Gundam',
                'description' => 'Versi RG dari Unicorn Gundam dengan inner frame pre-painted. Psycho-frame transparan yang bisa ditransformasi dan efek partikel inclus.',
                'grade'       => 'RG',
                'originality' => 'Bandai Original',
                'price'       => 650000,
                'stock'       => 9,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF0F0/C0392B?text=Unicorn+RG&font=montserrat',
                'series'      => 'Gundam Unicorn',
            ],

            // === Iron-Blooded Orphans ===
            [
                'name'        => 'Gundam Barbatos Lupus Rex',
                'description' => 'ASW-G-08 Gundam Barbatos Lupus Rex, bentuk final Barbatos yang dipiloti Mikazuki Augus. Kit RG dengan tail blade, cakar, dan mane buster rifle.',
                'grade'       => 'RG',
                'originality' => 'Bandai Original',
                'price'       => 580000,
                'stock'       => 11,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/F0FFF0/1A7A3A?text=Barbatos+Lupus+Rex&font=montserrat',
                'series'      => 'Iron-Blooded Orphans',
            ],
            [
                'name'        => 'Gundam Barbatos',
                'description' => 'ASW-G-08 Gundam Barbatos form pertama. Kit HG dengan mace besar dan smooth joint system khas IBO. Mudah dipose untuk pose pertempuran sengit.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 210000,
                'stock'       => 25,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/F0FFF0/1A7A3A?text=Barbatos+HG&font=montserrat',
                'series'      => 'Iron-Blooded Orphans',
            ],
            [
                'name'        => 'Gundam Gusion Rebake Full City',
                'description' => 'ASW-G-11 Gundam Gusion Rebake Full City milik Akihiro Altland. Kit HG dengan multiple shields yang bisa dikombinasikan dan hyper mace yang masif.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 225000,
                'stock'       => 16,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F5E9/2E7D32?text=Gusion+Rebake&font=montserrat',
                'series'      => 'Iron-Blooded Orphans',
            ],

            // === The Witch from Mercury ===
            [
                'name'        => 'Gundam Aerial',
                'description' => 'XVX-016 Gundam Aerial milik Suletta Mercury. Kit HG terbaru dengan shield bit/stave system dan GUND-BIT yang bisa dipasang di berbagai posisi.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 235000,
                'stock'       => 20,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F5E9/388E3C?text=Gundam+Aerial&font=montserrat',
                'series'      => 'The Witch from Mercury',
            ],
            [
                'name'        => 'Gundam Calibarn',
                'description' => 'CFK-029 Gundam Calibarn. Kit HG dengan GUND-BIT weapon system yang lebih agresif. Desain yang elegan namun mematikan.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 245000,
                'stock'       => 13,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FCE4EC/880E4F?text=Gundam+Calibarn&font=montserrat',
                'series'      => 'The Witch from Mercury',
            ],
            [
                'name'        => 'Gundam Aerial Rebuild',
                'description' => 'Versi upgrade dari Gundam Aerial dengan GUND format yang ditingkatkan. Kit HG dengan color scheme baru dan additional bit stave. Tampil lebih garang.',
                'grade'       => 'HG',
                'originality' => 'Bandai Original',
                'price'       => 255000,
                'stock'       => 17,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F5E9/1B5E20?text=Aerial+Rebuild&font=montserrat',
                'series'      => 'The Witch from Mercury',
            ],

            // === SD / Special ===
            [
                'name'        => 'BB Senshi RX-78-2',
                'description' => 'Versi super deformed SD dari RX-78-2 Gundam. Kit murah meriah cocok untuk display meja kerja. Proporsional chibi tapi tetap punya detail cantik.',
                'grade'       => 'SD',
                'originality' => 'Bandai Original',
                'price'       => 85000,
                'stock'       => 35,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=SD+RX-78-2&font=montserrat',
                'series'      => 'Mobile Suit Gundam',
            ],
            [
                'name'        => 'MGSD Strike Freedom',
                'description' => 'Master Grade Super Deformed Strike Freedom. Kombinasi detail MG dengan proporsi SD yang menggemaskan. Wing DRAGOON system berfungsi penuh.',
                'grade'       => 'MGSD',
                'originality' => 'Bandai Original',
                'price'       => 550000,
                'stock'       => 7,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/FFF8E1/C8970A?text=MGSD+Strike+Freedom&font=montserrat',
                'series'      => 'Gundam SEED Destiny',
            ],

            // === Third-Party / Bootleg ===
            [
                'name'        => 'Wing Zero EW (Bootleg)',
                'description' => 'Replika bootleg dari Wing Zero EW. Kualitas rata-rata, cocok untuk customize atau painting project. Tidak disarankan untuk koleksi utama.',
                'grade'       => 'HG',
                'originality' => 'Bootleg',
                'price'       => 95000,
                'stock'       => 50,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/F5F5F5/9E9E9E?text=Wing+Zero+Bootleg&font=montserrat',
                'series'      => 'Gundam Wing: Endless Waltz',
            ],
            [
                'name'        => 'Freedom Gundam (Third-Party)',
                'description' => 'Produk third-party Freedom Gundam dengan kualitas mendekati original. Wings articulation yang smooth dan detail panel line. Value for money.',
                'grade'       => 'MG',
                'originality' => 'Third-Party',
                'price'       => 380000,
                'stock'       => 9,
                'status'      => 'available',
                'image_url'   => 'https://placehold.co/600x600/E8F0FB/005CB9?text=Freedom+3rd+Party&font=montserrat',
                'series'      => 'Gundam SEED',
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
