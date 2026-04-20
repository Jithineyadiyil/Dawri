<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DigitalProductSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('digital_products')->count() > 0) {
            $this->command->info('digital_products already seeded — skipping.');
            return;
        }

        $now = now();

        $products = [
            // ── PSN ──────────────────────────────────────────────────────────
            ['brand' => 'PSN', 'name' => 'PlayStation Network Card 50 SAR',  'name_ar' => 'بطاقة شبكة بلايستيشن 50 ريال',  'category' => 'gaming', 'face_value' => 50,  'our_price' => 52,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 1],
            ['brand' => 'PSN', 'name' => 'PlayStation Network Card 100 SAR', 'name_ar' => 'بطاقة شبكة بلايستيشن 100 ريال', 'category' => 'gaming', 'face_value' => 100, 'our_price' => 103, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 2],
            ['brand' => 'PSN', 'name' => 'PlayStation Network Card 200 SAR', 'name_ar' => 'بطاقة شبكة بلايستيشن 200 ريال', 'category' => 'gaming', 'face_value' => 200, 'our_price' => 205, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 3],

            // ── Apple ─────────────────────────────────────────────────────────
            ['brand' => 'Apple', 'name' => 'Apple App Store & iTunes 25 SAR',  'name_ar' => 'بطاقة آبل 25 ريال',  'category' => 'shopping', 'face_value' => 25,  'our_price' => 26,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 10],
            ['brand' => 'Apple', 'name' => 'Apple App Store & iTunes 50 SAR',  'name_ar' => 'بطاقة آبل 50 ريال',  'category' => 'shopping', 'face_value' => 50,  'our_price' => 52,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 11],
            ['brand' => 'Apple', 'name' => 'Apple App Store & iTunes 100 SAR', 'name_ar' => 'بطاقة آبل 100 ريال', 'category' => 'shopping', 'face_value' => 100, 'our_price' => 103, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 12],

            // ── PUBG ──────────────────────────────────────────────────────────
            ['brand' => 'PUBG', 'name' => 'PUBG Mobile 60 UC',   'name_ar' => 'ببجي موبايل 60 UC',   'category' => 'gaming', 'face_value' => 60,   'our_price' => 4,   'currency' => 'UC',  'region' => 'SA', 'sort_order' => 20],
            ['brand' => 'PUBG', 'name' => 'PUBG Mobile 325 UC',  'name_ar' => 'ببجي موبايل 325 UC',  'category' => 'gaming', 'face_value' => 325,  'our_price' => 19,  'currency' => 'UC',  'region' => 'SA', 'sort_order' => 21],
            ['brand' => 'PUBG', 'name' => 'PUBG Mobile 660 UC',  'name_ar' => 'ببجي موبايل 660 UC',  'category' => 'gaming', 'face_value' => 660,  'our_price' => 37,  'currency' => 'UC',  'region' => 'SA', 'sort_order' => 22],
            ['brand' => 'PUBG', 'name' => 'PUBG Mobile 1800 UC', 'name_ar' => 'ببجي موبايل 1800 UC', 'category' => 'gaming', 'face_value' => 1800, 'our_price' => 95,  'currency' => 'UC',  'region' => 'SA', 'sort_order' => 23],

            // ── Xbox ──────────────────────────────────────────────────────────
            ['brand' => 'Xbox', 'name' => 'Xbox Gift Card 50 SAR',  'name_ar' => 'بطاقة Xbox 50 ريال',  'category' => 'gaming', 'face_value' => 50,  'our_price' => 52,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 30],
            ['brand' => 'Xbox', 'name' => 'Xbox Gift Card 100 SAR', 'name_ar' => 'بطاقة Xbox 100 ريال', 'category' => 'gaming', 'face_value' => 100, 'our_price' => 103, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 31],
            ['brand' => 'Xbox', 'name' => 'Xbox Gift Card 200 SAR', 'name_ar' => 'بطاقة Xbox 200 ريال', 'category' => 'gaming', 'face_value' => 200, 'our_price' => 205, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 32],

            // ── Google Play ───────────────────────────────────────────────────
            ['brand' => 'Google Play', 'name' => 'Google Play Gift Card 25 SAR',  'name_ar' => 'بطاقة جوجل بلاي 25 ريال',  'category' => 'gaming', 'face_value' => 25,  'our_price' => 26,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 40],
            ['brand' => 'Google Play', 'name' => 'Google Play Gift Card 50 SAR',  'name_ar' => 'بطاقة جوجل بلاي 50 ريال',  'category' => 'gaming', 'face_value' => 50,  'our_price' => 52,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 41],

            // ── Netflix ───────────────────────────────────────────────────────
            ['brand' => 'Netflix', 'name' => 'Netflix Gift Card 50 SAR',  'name_ar' => 'بطاقة نتفليكس 50 ريال',  'category' => 'streaming', 'face_value' => 50,  'our_price' => 52,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 50],
            ['brand' => 'Netflix', 'name' => 'Netflix Gift Card 100 SAR', 'name_ar' => 'بطاقة نتفليكس 100 ريال', 'category' => 'streaming', 'face_value' => 100, 'our_price' => 103, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 51],

            // ── Spotify ───────────────────────────────────────────────────────
            ['brand' => 'Spotify', 'name' => 'Spotify Premium 1 Month',  'name_ar' => 'سبوتيفاي بريميوم شهر',  'category' => 'streaming', 'face_value' => 23, 'our_price' => 24, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 60],
            ['brand' => 'Spotify', 'name' => 'Spotify Premium 3 Months', 'name_ar' => 'سبوتيفاي بريميوم 3 أشهر', 'category' => 'streaming', 'face_value' => 69, 'our_price' => 71, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 61],

            // ── STC ───────────────────────────────────────────────────────────
            ['brand' => 'STC', 'name' => 'STC Gaming Card 25 SAR', 'name_ar' => 'بطاقة STC للألعاب 25 ريال', 'category' => 'gaming', 'face_value' => 25, 'our_price' => 26, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 70],
            ['brand' => 'STC', 'name' => 'STC Gaming Card 50 SAR', 'name_ar' => 'بطاقة STC للألعاب 50 ريال', 'category' => 'gaming', 'face_value' => 50, 'our_price' => 52, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 71],

            // ── Jawaker ───────────────────────────────────────────────────────
            ['brand' => 'Jawaker', 'name' => 'Jawaker Tokens 10 SAR', 'name_ar' => 'رموز جواكر 10 ريال', 'category' => 'social', 'face_value' => 10, 'our_price' => 10.5, 'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 80],
            ['brand' => 'Jawaker', 'name' => 'Jawaker Tokens 25 SAR', 'name_ar' => 'رموز جواكر 25 ريال', 'category' => 'social', 'face_value' => 25, 'our_price' => 26,  'currency' => 'SAR', 'region' => 'SA', 'sort_order' => 81],
        ];

        $rows = array_map(fn ($p) => array_merge($p, [
            'id'          => (string) Str::uuid(),
            'distributor' => 'likecard',
            'is_active'   => 1,
            'our_cost'    => null,
            'image_url'   => null,
            'distributor_product_id' => null,
            'created_at'  => $now,
            'updated_at'  => $now,
        ]), $products);

        DB::table('digital_products')->insert($rows);
        $this->command->info('Seeded ' . count($rows) . ' digital products.');
    }
}
