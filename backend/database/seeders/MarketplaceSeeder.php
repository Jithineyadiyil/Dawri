<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class MarketplaceSeeder extends Seeder
{
    public function run(): void
    {
        if (!Schema::hasTable('digital_products')) {
            $this->command->error('digital_products table does not exist. Run migrations first.');
            return;
        }

        if (DB::table('digital_products')->count() > 0) {
            $this->command->info('digital_products already has data — skipping seed.');
            return;
        }

        $now = now();

        $products = [
            // ── PlayStation Network ──────────────────────────────────────────
            ['brand' => 'PlayStation',  'category' => 'gaming',    'name' => 'PSN Gift Card 50 SAR',   'name_ar' => 'بطاقة بلايستيشن 50 ريال',   'face_value' => 50,   'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'PlayStation',  'category' => 'gaming',    'name' => 'PSN Gift Card 100 SAR',  'name_ar' => 'بطاقة بلايستيشن 100 ريال',  'face_value' => 100,  'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'PlayStation',  'category' => 'gaming',    'name' => 'PSN Gift Card 200 SAR',  'name_ar' => 'بطاقة بلايستيشن 200 ريال',  'face_value' => 200,  'our_price' => 208,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Apple App Store ──────────────────────────────────────────────
            ['brand' => 'Apple',        'category' => 'gaming',    'name' => 'App Store & iTunes 25 SAR',  'name_ar' => 'آبل ستور 25 ريال',   'face_value' => 25,  'our_price' => 26,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Apple',        'category' => 'gaming',    'name' => 'App Store & iTunes 50 SAR',  'name_ar' => 'آبل ستور 50 ريال',   'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Apple',        'category' => 'gaming',    'name' => 'App Store & iTunes 100 SAR', 'name_ar' => 'آبل ستور 100 ريال',  'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],

            // ── PUBG Mobile ──────────────────────────────────────────────────
            ['brand' => 'PUBG Mobile',  'category' => 'gaming',    'name' => 'PUBG Mobile 60 UC',   'name_ar' => 'ببجي 60 يوسي',   'face_value' => 60,   'our_price' => 4,    'currency' => 'UC',  'region' => 'GLOBAL'],
            ['brand' => 'PUBG Mobile',  'category' => 'gaming',    'name' => 'PUBG Mobile 325 UC',  'name_ar' => 'ببجي 325 يوسي',  'face_value' => 325,  'our_price' => 20,   'currency' => 'UC',  'region' => 'GLOBAL'],
            ['brand' => 'PUBG Mobile',  'category' => 'gaming',    'name' => 'PUBG Mobile 660 UC',  'name_ar' => 'ببجي 660 يوسي',  'face_value' => 660,  'our_price' => 38,   'currency' => 'UC',  'region' => 'GLOBAL'],
            ['brand' => 'PUBG Mobile',  'category' => 'gaming',    'name' => 'PUBG Mobile 1800 UC', 'name_ar' => 'ببجي 1800 يوسي', 'face_value' => 1800, 'our_price' => 100,  'currency' => 'UC',  'region' => 'GLOBAL'],

            // ── Xbox ─────────────────────────────────────────────────────────
            ['brand' => 'Xbox',         'category' => 'gaming',    'name' => 'Xbox Gift Card 50 SAR',  'name_ar' => 'بطاقة إكس بوكس 50 ريال',  'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Xbox',         'category' => 'gaming',    'name' => 'Xbox Gift Card 100 SAR', 'name_ar' => 'بطاقة إكس بوكس 100 ريال', 'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Google Play ──────────────────────────────────────────────────
            ['brand' => 'Google Play',  'category' => 'gaming',    'name' => 'Google Play 25 SAR',  'name_ar' => 'جوجل بلاي 25 ريال',  'face_value' => 25,  'our_price' => 26,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Google Play',  'category' => 'gaming',    'name' => 'Google Play 50 SAR',  'name_ar' => 'جوجل بلاي 50 ريال',  'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Google Play',  'category' => 'gaming',    'name' => 'Google Play 100 SAR', 'name_ar' => 'جوجل بلاي 100 ريال', 'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Netflix ──────────────────────────────────────────────────────
            ['brand' => 'Netflix',      'category' => 'streaming',  'name' => 'Netflix Gift Card 50 SAR',  'name_ar' => 'نتفلكس 50 ريال',  'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Netflix',      'category' => 'streaming',  'name' => 'Netflix Gift Card 100 SAR', 'name_ar' => 'نتفلكس 100 ريال', 'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Spotify ──────────────────────────────────────────────────────
            ['brand' => 'Spotify',      'category' => 'streaming',  'name' => 'Spotify Premium 30 Days',  'name_ar' => 'سبوتيفاي 30 يوم',  'face_value' => 30, 'our_price' => 32,   'currency' => 'SAR', 'region' => 'SA'],

            // ── STC ──────────────────────────────────────────────────────────
            ['brand' => 'STC',          'category' => 'topup',      'name' => 'STC Recharge 50 SAR',  'name_ar' => 'شحن STC 50 ريال',  'face_value' => 50,  'our_price' => 50,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'STC',          'category' => 'topup',      'name' => 'STC Recharge 100 SAR', 'name_ar' => 'شحن STC 100 ريال', 'face_value' => 100, 'our_price' => 100,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Jawaker ──────────────────────────────────────────────────────
            ['brand' => 'Jawaker',      'category' => 'gaming',     'name' => 'Jawaker Token 50 SAR',  'name_ar' => 'جواكر 50 ريال',  'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Jawaker',      'category' => 'gaming',     'name' => 'Jawaker Token 100 SAR', 'name_ar' => 'جواكر 100 ريال', 'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],

            // ── Amazon ───────────────────────────────────────────────────────
            ['brand' => 'Amazon',       'category' => 'shopping',   'name' => 'Amazon Gift Card 50 SAR',  'name_ar' => 'أمازون 50 ريال',  'face_value' => 50,  'our_price' => 52,   'currency' => 'SAR', 'region' => 'SA'],
            ['brand' => 'Amazon',       'category' => 'shopping',   'name' => 'Amazon Gift Card 100 SAR', 'name_ar' => 'أمازون 100 ريال', 'face_value' => 100, 'our_price' => 104,  'currency' => 'SAR', 'region' => 'SA'],
        ];

        $rows = array_map(fn ($p, $i) => [
            'id'          => (string) Str::uuid(),
            'distributor' => 'likecard',
            'name'        => $p['name'],
            'name_ar'     => $p['name_ar'] ?? null,
            'brand'       => $p['brand'],
            'category'    => $p['category'],
            'face_value'  => $p['face_value'],
            'currency'    => $p['currency'],
            'our_cost'    => $p['our_price'] * 0.93,
            'our_price'   => $p['our_price'],
            'margin_pct'  => 7,
            'region'      => $p['region'],
            'image_url'   => null,
            'is_active'   => true,
            'sort_order'  => $i,
            'created_at'  => $now,
            'updated_at'  => $now,
        ], $products, array_keys($products));

        DB::table('digital_products')->insert($rows);

        $this->command->info('Seeded ' . count($rows) . ' digital products.');
    }
}
