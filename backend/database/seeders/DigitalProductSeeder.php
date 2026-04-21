<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Digital product catalog — Sprint 6 expansion.
 *
 * Mirrors the core of Likecard's Saudi catalog organized into Dawri's 7 marketplace
 * categories (all, gaming, streaming, shopping, topup, food, services).
 *
 * ~95 SKUs across ~30 brands. All prices in SAR, region SA. Some brands have
 * multiple denominations to give the storefront realistic volume. Images point
 * to the local /brands/{slug}.svg files shipped with Sprint 5 + new additions.
 *
 * Schema note: both distributor_id (legacy NOT NULL column) and
 * distributor_product_id (newer column used by code) are populated to the same
 * deterministic stub ID until the Sprint N schema cleanup migration consolidates
 * these two columns into one.
 */
class DigitalProductSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('digital_products')->count() > 0) {
            $this->command->info('digital_products already seeded — skipping.');
            return;
        }

        $now = now();
        $rows = [];
        $sortCounter = 0;

        foreach ($this->catalog() as $item) {
            $sortCounter++;
            $stubDistId = strtolower(str_replace([' ', '&'], ['-', ''], $item['brand'])) . '-' . $sortCounter;

            $rows[] = [
                'id'                     => (string) Str::uuid(),
                'distributor'            => 'likecard',
                'distributor_id'         => $stubDistId,
                'distributor_product_id' => $stubDistId,
                'brand'                  => $item['brand'],
                'category'               => $item['category'],
                'name'                   => $item['name'],
                'name_ar'                => $item['name_ar'],
                'face_value'             => $item['face_value'],
                'currency'               => $item['currency'],
                'our_cost'               => round($item['our_price'] * 0.93, 2),
                'our_price'              => $item['our_price'],
                'region'                 => 'SA',
                'image_url'              => '/brands/' . $item['image'] . '.svg',
                'is_active'              => 1,
                'sort_order'             => $sortCounter,
                'created_at'             => $now,
                'updated_at'             => $now,
            ];
        }

        DB::table('digital_products')->insert($rows);
        $this->command->info('Seeded ' . count($rows) . ' digital products across 7 categories.');
    }

    /**
     * Product catalog — flat array, keeps seeder readable.
     *
     * @return array<int, array{brand:string,category:string,name:string,name_ar:string,face_value:float,currency:string,our_price:float,image:string}>
     */
    private function catalog(): array
    {
        return [
            // ═══════════════════════════════════════════════════════════════════
            // GAMING
            // ═══════════════════════════════════════════════════════════════════
            // PlayStation Network
            ['brand' => 'PSN', 'category' => 'gaming', 'name' => 'PSN Card 20 SAR',  'name_ar' => 'بطاقة بلايستيشن ٢٠ ريال',  'face_value' => 20,  'currency' => 'SAR', 'our_price' => 21,  'image' => 'psn'],
            ['brand' => 'PSN', 'category' => 'gaming', 'name' => 'PSN Card 50 SAR',  'name_ar' => 'بطاقة بلايستيشن ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'psn'],
            ['brand' => 'PSN', 'category' => 'gaming', 'name' => 'PSN Card 100 SAR', 'name_ar' => 'بطاقة بلايستيشن ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'psn'],
            ['brand' => 'PSN', 'category' => 'gaming', 'name' => 'PSN Card 200 SAR', 'name_ar' => 'بطاقة بلايستيشن ٢٠٠ ريال', 'face_value' => 200, 'currency' => 'SAR', 'our_price' => 205, 'image' => 'psn'],
            ['brand' => 'PSN', 'category' => 'gaming', 'name' => 'PSN Card 500 SAR', 'name_ar' => 'بطاقة بلايستيشن ٥٠٠ ريال', 'face_value' => 500, 'currency' => 'SAR', 'our_price' => 510, 'image' => 'psn'],

            // Xbox
            ['brand' => 'Xbox', 'category' => 'gaming', 'name' => 'Xbox Gift Card 25 SAR',  'name_ar' => 'بطاقة إكس بوكس ٢٥ ريال',  'face_value' => 25,  'currency' => 'SAR', 'our_price' => 26,  'image' => 'xbox'],
            ['brand' => 'Xbox', 'category' => 'gaming', 'name' => 'Xbox Gift Card 50 SAR',  'name_ar' => 'بطاقة إكس بوكس ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'xbox'],
            ['brand' => 'Xbox', 'category' => 'gaming', 'name' => 'Xbox Gift Card 100 SAR', 'name_ar' => 'بطاقة إكس بوكس ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'xbox'],
            ['brand' => 'Xbox', 'category' => 'gaming', 'name' => 'Xbox Game Pass Ultimate 1 Month', 'name_ar' => 'إكس بوكس غيم باس ألتيميت - شهر', 'face_value' => 60, 'currency' => 'SAR', 'our_price' => 62, 'image' => 'xbox'],

            // Steam
            ['brand' => 'Steam', 'category' => 'gaming', 'name' => 'Steam Wallet 20 SAR',  'name_ar' => 'محفظة ستيم ٢٠ ريال',  'face_value' => 20,  'currency' => 'SAR', 'our_price' => 21,  'image' => 'steam'],
            ['brand' => 'Steam', 'category' => 'gaming', 'name' => 'Steam Wallet 50 SAR',  'name_ar' => 'محفظة ستيم ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'steam'],
            ['brand' => 'Steam', 'category' => 'gaming', 'name' => 'Steam Wallet 100 SAR', 'name_ar' => 'محفظة ستيم ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'steam'],

            // Nintendo
            ['brand' => 'Nintendo', 'category' => 'gaming', 'name' => 'Nintendo eShop 35 SAR',  'name_ar' => 'نينتندو إي شوب ٣٥ ريال',  'face_value' => 35,  'currency' => 'SAR', 'our_price' => 37,  'image' => 'nintendo'],
            ['brand' => 'Nintendo', 'category' => 'gaming', 'name' => 'Nintendo eShop 75 SAR',  'name_ar' => 'نينتندو إي شوب ٧٥ ريال',  'face_value' => 75,  'currency' => 'SAR', 'our_price' => 78,  'image' => 'nintendo'],

            // Roblox
            ['brand' => 'Roblox', 'category' => 'gaming', 'name' => 'Roblox 400 Robux',   'name_ar' => 'روبلوكس ٤٠٠ روبوكس',  'face_value' => 400,  'currency' => 'RBX', 'our_price' => 22,  'image' => 'roblox'],
            ['brand' => 'Roblox', 'category' => 'gaming', 'name' => 'Roblox 800 Robux',   'name_ar' => 'روبلوكس ٨٠٠ روبوكس',  'face_value' => 800,  'currency' => 'RBX', 'our_price' => 42,  'image' => 'roblox'],
            ['brand' => 'Roblox', 'category' => 'gaming', 'name' => 'Roblox 2000 Robux',  'name_ar' => 'روبلوكس ٢٠٠٠ روبوكس', 'face_value' => 2000, 'currency' => 'RBX', 'our_price' => 98,  'image' => 'roblox'],

            // EA
            ['brand' => 'EA', 'category' => 'gaming', 'name' => 'EA Play 1 Month',  'name_ar' => 'إي إيه بلاي - شهر', 'face_value' => 19, 'currency' => 'SAR', 'our_price' => 20, 'image' => 'ea'],
            ['brand' => 'EA', 'category' => 'gaming', 'name' => 'FC 25 Points 1050', 'name_ar' => 'نقاط FC 25 - ١٠٥٠',  'face_value' => 1050, 'currency' => 'FCP', 'our_price' => 38, 'image' => 'ea'],

            // Riot (League of Legends / Valorant)
            ['brand' => 'Riot', 'category' => 'gaming', 'name' => 'Valorant Points 525',  'name_ar' => 'فالورانت بوينتس ٥٢٥',  'face_value' => 525,  'currency' => 'VP', 'our_price' => 20, 'image' => 'riot'],
            ['brand' => 'Riot', 'category' => 'gaming', 'name' => 'Valorant Points 1100', 'name_ar' => 'فالورانت بوينتس ١١٠٠', 'face_value' => 1100, 'currency' => 'VP', 'our_price' => 42, 'image' => 'riot'],

            // Google Play (gaming-adjacent)
            ['brand' => 'Google Play', 'category' => 'gaming', 'name' => 'Google Play 25 SAR',  'name_ar' => 'جوجل بلاي ٢٥ ريال',  'face_value' => 25,  'currency' => 'SAR', 'our_price' => 26,  'image' => 'googleplay'],
            ['brand' => 'Google Play', 'category' => 'gaming', 'name' => 'Google Play 50 SAR',  'name_ar' => 'جوجل بلاي ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'googleplay'],
            ['brand' => 'Google Play', 'category' => 'gaming', 'name' => 'Google Play 100 SAR', 'name_ar' => 'جوجل بلاي ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'googleplay'],

            // ═══════════════════════════════════════════════════════════════════
            // STREAMING — video + music under one chip (Dawri UI structure)
            // ═══════════════════════════════════════════════════════════════════
            ['brand' => 'Netflix', 'category' => 'streaming', 'name' => 'Netflix Gift Card 50 SAR',  'name_ar' => 'بطاقة نتفليكس ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'netflix'],
            ['brand' => 'Netflix', 'category' => 'streaming', 'name' => 'Netflix Gift Card 100 SAR', 'name_ar' => 'بطاقة نتفليكس ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'netflix'],
            ['brand' => 'Netflix', 'category' => 'streaming', 'name' => 'Netflix Gift Card 200 SAR', 'name_ar' => 'بطاقة نتفليكس ٢٠٠ ريال', 'face_value' => 200, 'currency' => 'SAR', 'our_price' => 205, 'image' => 'netflix'],

            ['brand' => 'Shahid',    'category' => 'streaming', 'name' => 'Shahid VIP 1 Month',  'name_ar' => 'شاهد VIP - شهر',    'face_value' => 35,  'currency' => 'SAR', 'our_price' => 36,  'image' => 'shahid'],
            ['brand' => 'Shahid',    'category' => 'streaming', 'name' => 'Shahid VIP 3 Months', 'name_ar' => 'شاهد VIP - ٣ أشهر', 'face_value' => 99,  'currency' => 'SAR', 'our_price' => 102, 'image' => 'shahid'],
            ['brand' => 'Shahid',    'category' => 'streaming', 'name' => 'Shahid VIP 12 Months','name_ar' => 'شاهد VIP - سنة',    'face_value' => 299, 'currency' => 'SAR', 'our_price' => 305, 'image' => 'shahid'],

            ['brand' => 'Apple TV',  'category' => 'streaming', 'name' => 'Apple TV+ 3 Months',  'name_ar' => 'أبل تي في+ - ٣ أشهر', 'face_value' => 29,  'currency' => 'SAR', 'our_price' => 30,  'image' => 'appletv'],

            ['brand' => 'STARZPLAY', 'category' => 'streaming', 'name' => 'STARZPLAY 1 Month',  'name_ar' => 'ستارز بلاي - شهر',   'face_value' => 29,  'currency' => 'SAR', 'our_price' => 30,  'image' => 'starzplay'],
            ['brand' => 'STARZPLAY', 'category' => 'streaming', 'name' => 'STARZPLAY 3 Months', 'name_ar' => 'ستارز بلاي - ٣ أشهر','face_value' => 79,  'currency' => 'SAR', 'our_price' => 81,  'image' => 'starzplay'],

            ['brand' => 'OSN',       'category' => 'streaming', 'name' => 'OSN+ 1 Month',       'name_ar' => 'OSN+ - شهر',         'face_value' => 49,  'currency' => 'SAR', 'our_price' => 50,  'image' => 'osn'],
            ['brand' => 'OSN',       'category' => 'streaming', 'name' => 'OSN+ 6 Months',      'name_ar' => 'OSN+ - ٦ أشهر',      'face_value' => 249, 'currency' => 'SAR', 'our_price' => 255, 'image' => 'osn'],

            ['brand' => 'Spotify',   'category' => 'streaming', 'name' => 'Spotify Premium 1 Month',   'name_ar' => 'سبوتيفاي بريميوم - شهر',    'face_value' => 23, 'currency' => 'SAR', 'our_price' => 24,  'image' => 'spotify'],
            ['brand' => 'Spotify',   'category' => 'streaming', 'name' => 'Spotify Premium 3 Months',  'name_ar' => 'سبوتيفاي بريميوم - ٣ أشهر', 'face_value' => 69, 'currency' => 'SAR', 'our_price' => 71,  'image' => 'spotify'],
            ['brand' => 'Spotify',   'category' => 'streaming', 'name' => 'Spotify Premium 12 Months', 'name_ar' => 'سبوتيفاي بريميوم - سنة',     'face_value' => 229,'currency' => 'SAR', 'our_price' => 234, 'image' => 'spotify'],

            ['brand' => 'Anghami',   'category' => 'streaming', 'name' => 'Anghami Plus 1 Month',  'name_ar' => 'أنغامي بلس - شهر',    'face_value' => 19, 'currency' => 'SAR', 'our_price' => 20, 'image' => 'anghami'],
            ['brand' => 'Anghami',   'category' => 'streaming', 'name' => 'Anghami Plus 3 Months', 'name_ar' => 'أنغامي بلس - ٣ أشهر', 'face_value' => 49, 'currency' => 'SAR', 'our_price' => 51, 'image' => 'anghami'],

            // ═══════════════════════════════════════════════════════════════════
            // SHOPPING
            // ═══════════════════════════════════════════════════════════════════
            ['brand' => 'Amazon',   'category' => 'shopping', 'name' => 'Amazon Gift Card 50 SAR',   'name_ar' => 'بطاقة أمازون ٥٠ ريال',   'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'amazon'],
            ['brand' => 'Amazon',   'category' => 'shopping', 'name' => 'Amazon Gift Card 100 SAR',  'name_ar' => 'بطاقة أمازون ١٠٠ ريال',  'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'amazon'],
            ['brand' => 'Amazon',   'category' => 'shopping', 'name' => 'Amazon Gift Card 250 SAR',  'name_ar' => 'بطاقة أمازون ٢٥٠ ريال',  'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'amazon'],

            ['brand' => 'Noon',     'category' => 'shopping', 'name' => 'Noon Gift Card 100 SAR',    'name_ar' => 'بطاقة نون ١٠٠ ريال',     'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'noon'],
            ['brand' => 'Noon',     'category' => 'shopping', 'name' => 'Noon Gift Card 250 SAR',    'name_ar' => 'بطاقة نون ٢٥٠ ريال',     'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'noon'],
            ['brand' => 'Noon',     'category' => 'shopping', 'name' => 'Noon Gift Card 500 SAR',    'name_ar' => 'بطاقة نون ٥٠٠ ريال',     'face_value' => 500, 'currency' => 'SAR', 'our_price' => 508, 'image' => 'noon'],

            ['brand' => 'SHEIN',    'category' => 'shopping', 'name' => 'SHEIN Gift Card 100 SAR',   'name_ar' => 'بطاقة شي إن ١٠٠ ريال',   'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'shein'],
            ['brand' => 'SHEIN',    'category' => 'shopping', 'name' => 'SHEIN Gift Card 250 SAR',   'name_ar' => 'بطاقة شي إن ٢٥٠ ريال',   'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'shein'],

            ['brand' => 'Jarir',    'category' => 'shopping', 'name' => 'Jarir Gift Card 100 SAR',   'name_ar' => 'بطاقة جرير ١٠٠ ريال',    'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'jarir'],
            ['brand' => 'Jarir',    'category' => 'shopping', 'name' => 'Jarir Gift Card 250 SAR',   'name_ar' => 'بطاقة جرير ٢٥٠ ريال',    'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'jarir'],

            ['brand' => 'Carrefour','category' => 'shopping', 'name' => 'Carrefour Gift 100 SAR',    'name_ar' => 'بطاقة كارفور ١٠٠ ريال',  'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'carrefour'],
            ['brand' => 'Carrefour','category' => 'shopping', 'name' => 'Carrefour Gift 250 SAR',    'name_ar' => 'بطاقة كارفور ٢٥٠ ريال',  'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'carrefour'],

            ['brand' => 'IKEA',     'category' => 'shopping', 'name' => 'IKEA Gift Card 100 SAR',    'name_ar' => 'بطاقة إيكيا ١٠٠ ريال',   'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'ikea'],
            ['brand' => 'IKEA',     'category' => 'shopping', 'name' => 'IKEA Gift Card 250 SAR',    'name_ar' => 'بطاقة إيكيا ٢٥٠ ريال',   'face_value' => 250, 'currency' => 'SAR', 'our_price' => 254, 'image' => 'ikea'],

            ['brand' => 'Starbucks','category' => 'shopping', 'name' => 'Starbucks Gift 25 SAR',     'name_ar' => 'بطاقة ستاربكس ٢٥ ريال',  'face_value' => 25,  'currency' => 'SAR', 'our_price' => 26,  'image' => 'starbucks'],
            ['brand' => 'Starbucks','category' => 'shopping', 'name' => 'Starbucks Gift 50 SAR',     'name_ar' => 'بطاقة ستاربكس ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'starbucks'],

            // ═══════════════════════════════════════════════════════════════════
            // TOPUP — telecom recharge + in-game currency (existing chip meaning)
            // ═══════════════════════════════════════════════════════════════════
            // Apple / iTunes (App Store credits = topup in Likecard taxonomy)
            ['brand' => 'Apple', 'category' => 'topup', 'name' => 'Apple App Store 25 SAR',  'name_ar' => 'آبل آب ستور ٢٥ ريال',  'face_value' => 25,  'currency' => 'SAR', 'our_price' => 26,  'image' => 'apple'],
            ['brand' => 'Apple', 'category' => 'topup', 'name' => 'Apple App Store 50 SAR',  'name_ar' => 'آبل آب ستور ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 52,  'image' => 'apple'],
            ['brand' => 'Apple', 'category' => 'topup', 'name' => 'Apple App Store 100 SAR', 'name_ar' => 'آبل آب ستور ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 103, 'image' => 'apple'],
            ['brand' => 'Apple', 'category' => 'topup', 'name' => 'Apple App Store 200 SAR', 'name_ar' => 'آبل آب ستور ٢٠٠ ريال', 'face_value' => 200, 'currency' => 'SAR', 'our_price' => 205, 'image' => 'apple'],

            // PUBG UC
            ['brand' => 'PUBG', 'category' => 'topup', 'name' => 'PUBG Mobile 60 UC',   'name_ar' => 'ببجي موبايل ٦٠ UC',    'face_value' => 60,   'currency' => 'UC', 'our_price' => 4,  'image' => 'pubg'],
            ['brand' => 'PUBG', 'category' => 'topup', 'name' => 'PUBG Mobile 325 UC',  'name_ar' => 'ببجي موبايل ٣٢٥ UC',   'face_value' => 325,  'currency' => 'UC', 'our_price' => 19, 'image' => 'pubg'],
            ['brand' => 'PUBG', 'category' => 'topup', 'name' => 'PUBG Mobile 660 UC',  'name_ar' => 'ببجي موبايل ٦٦٠ UC',   'face_value' => 660,  'currency' => 'UC', 'our_price' => 37, 'image' => 'pubg'],
            ['brand' => 'PUBG', 'category' => 'topup', 'name' => 'PUBG Mobile 1800 UC', 'name_ar' => 'ببجي موبايل ١٨٠٠ UC',  'face_value' => 1800, 'currency' => 'UC', 'our_price' => 95, 'image' => 'pubg'],
            ['brand' => 'PUBG', 'category' => 'topup', 'name' => 'PUBG Mobile 3850 UC', 'name_ar' => 'ببجي موبايل ٣٨٥٠ UC',  'face_value' => 3850, 'currency' => 'UC', 'our_price' => 190,'image' => 'pubg'],

            // Free Fire
            ['brand' => 'Free Fire', 'category' => 'topup', 'name' => 'Free Fire 100 Diamonds',  'name_ar' => 'فري فاير ١٠٠ جوهرة',  'face_value' => 100,  'currency' => 'DMD', 'our_price' => 5,  'image' => 'freefire'],
            ['brand' => 'Free Fire', 'category' => 'topup', 'name' => 'Free Fire 310 Diamonds',  'name_ar' => 'فري فاير ٣١٠ جوهرة',  'face_value' => 310,  'currency' => 'DMD', 'our_price' => 15, 'image' => 'freefire'],
            ['brand' => 'Free Fire', 'category' => 'topup', 'name' => 'Free Fire 1080 Diamonds', 'name_ar' => 'فري فاير ١٠٨٠ جوهرة', 'face_value' => 1080, 'currency' => 'DMD', 'our_price' => 48, 'image' => 'freefire'],

            // STC (telecom recharge)
            ['brand' => 'STC', 'category' => 'topup', 'name' => 'STC Recharge 30 SAR',  'name_ar' => 'STC شحن ٣٠ ريال',  'face_value' => 30,  'currency' => 'SAR', 'our_price' => 31,  'image' => 'stc'],
            ['brand' => 'STC', 'category' => 'topup', 'name' => 'STC Recharge 50 SAR',  'name_ar' => 'STC شحن ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'stc'],
            ['brand' => 'STC', 'category' => 'topup', 'name' => 'STC Recharge 100 SAR', 'name_ar' => 'STC شحن ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'stc'],

            // Mobily
            ['brand' => 'Mobily', 'category' => 'topup', 'name' => 'Mobily Recharge 30 SAR',  'name_ar' => 'موبايلي شحن ٣٠ ريال',  'face_value' => 30,  'currency' => 'SAR', 'our_price' => 31,  'image' => 'mobily'],
            ['brand' => 'Mobily', 'category' => 'topup', 'name' => 'Mobily Recharge 50 SAR',  'name_ar' => 'موبايلي شحن ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'mobily'],
            ['brand' => 'Mobily', 'category' => 'topup', 'name' => 'Mobily Recharge 100 SAR', 'name_ar' => 'موبايلي شحن ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'mobily'],

            // Zain
            ['brand' => 'Zain', 'category' => 'topup', 'name' => 'Zain Recharge 30 SAR',  'name_ar' => 'زين شحن ٣٠ ريال',  'face_value' => 30,  'currency' => 'SAR', 'our_price' => 31,  'image' => 'zain'],
            ['brand' => 'Zain', 'category' => 'topup', 'name' => 'Zain Recharge 50 SAR',  'name_ar' => 'زين شحن ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'zain'],
            ['brand' => 'Zain', 'category' => 'topup', 'name' => 'Zain Recharge 100 SAR', 'name_ar' => 'زين شحن ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'zain'],

            // Jawaker (social gaming tokens)
            ['brand' => 'Jawaker', 'category' => 'topup', 'name' => 'Jawaker 10 SAR Tokens', 'name_ar' => 'جواكر ١٠ ريال رموز', 'face_value' => 10, 'currency' => 'SAR', 'our_price' => 10.5, 'image' => 'jawaker'],
            ['brand' => 'Jawaker', 'category' => 'topup', 'name' => 'Jawaker 25 SAR Tokens', 'name_ar' => 'جواكر ٢٥ ريال رموز', 'face_value' => 25, 'currency' => 'SAR', 'our_price' => 26,   'image' => 'jawaker'],
            ['brand' => 'Jawaker', 'category' => 'topup', 'name' => 'Jawaker 50 SAR Tokens', 'name_ar' => 'جواكر ٥٠ ريال رموز', 'face_value' => 50, 'currency' => 'SAR', 'our_price' => 51,   'image' => 'jawaker'],

            // ═══════════════════════════════════════════════════════════════════
            // FOOD & DELIVERY (new chip)
            // ═══════════════════════════════════════════════════════════════════
            ['brand' => 'HungerStation', 'category' => 'food', 'name' => 'HungerStation 50 SAR',  'name_ar' => 'هنقرستيشن ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'hungerstation'],
            ['brand' => 'HungerStation', 'category' => 'food', 'name' => 'HungerStation 100 SAR', 'name_ar' => 'هنقرستيشن ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'hungerstation'],
            ['brand' => 'HungerStation', 'category' => 'food', 'name' => 'HungerStation 200 SAR', 'name_ar' => 'هنقرستيشن ٢٠٠ ريال', 'face_value' => 200, 'currency' => 'SAR', 'our_price' => 203, 'image' => 'hungerstation'],

            ['brand' => 'Jahez',   'category' => 'food', 'name' => 'Jahez Voucher 50 SAR',   'name_ar' => 'جاهز ٥٠ ريال',   'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'jahez'],
            ['brand' => 'Jahez',   'category' => 'food', 'name' => 'Jahez Voucher 100 SAR',  'name_ar' => 'جاهز ١٠٠ ريال',  'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'jahez'],

            ['brand' => 'Careem',  'category' => 'food', 'name' => 'Careem Now 50 SAR',     'name_ar' => 'كريم ناو ٥٠ ريال',  'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'careem'],
            ['brand' => 'Careem',  'category' => 'food', 'name' => 'Careem Now 100 SAR',    'name_ar' => 'كريم ناو ١٠٠ ريال', 'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'careem'],

            ['brand' => 'Mrsool',  'category' => 'food', 'name' => 'Mrsool 50 SAR',        'name_ar' => 'مرسول ٥٠ ريال',    'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'mrsool'],
            ['brand' => 'Mrsool',  'category' => 'food', 'name' => 'Mrsool 100 SAR',       'name_ar' => 'مرسول ١٠٠ ريال',   'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'mrsool'],

            ['brand' => 'ToYou',   'category' => 'food', 'name' => 'ToYou 50 SAR',         'name_ar' => 'ToYou ٥٠ ريال',    'face_value' => 50,  'currency' => 'SAR', 'our_price' => 51,  'image' => 'toyou'],
            ['brand' => 'ToYou',   'category' => 'food', 'name' => 'ToYou 100 SAR',        'name_ar' => 'ToYou ١٠٠ ريال',   'face_value' => 100, 'currency' => 'SAR', 'our_price' => 102, 'image' => 'toyou'],

            // ═══════════════════════════════════════════════════════════════════
            // SERVICES (new chip) — productivity / cloud subscriptions
            // ═══════════════════════════════════════════════════════════════════
            ['brand' => 'Microsoft 365',    'category' => 'services', 'name' => 'Microsoft 365 Personal 1 Year',  'name_ar' => 'مايكروسوفت ٣٦٥ شخصي - سنة',  'face_value' => 299,  'currency' => 'SAR', 'our_price' => 309, 'image' => 'microsoft'],
            ['brand' => 'Microsoft 365',    'category' => 'services', 'name' => 'Microsoft 365 Family 1 Year',    'name_ar' => 'مايكروسوفت ٣٦٥ عائلي - سنة', 'face_value' => 399,  'currency' => 'SAR', 'our_price' => 409, 'image' => 'microsoft'],

            ['brand' => 'Google Workspace', 'category' => 'services', 'name' => 'Google One 100 GB 1 Year',       'name_ar' => 'جوجل ون ١٠٠ جيجا - سنة',       'face_value' => 89,   'currency' => 'SAR', 'our_price' => 92,  'image' => 'googleworkspace'],
            ['brand' => 'Google Workspace', 'category' => 'services', 'name' => 'Google One 2 TB 1 Year',         'name_ar' => 'جوجل ون ٢ تيرا - سنة',         'face_value' => 389,  'currency' => 'SAR', 'our_price' => 399, 'image' => 'googleworkspace'],

            ['brand' => 'iCloud',           'category' => 'services', 'name' => 'iCloud+ 50 GB 1 Month',          'name_ar' => 'آي كلاود+ ٥٠ جيجا - شهر',      'face_value' => 4,    'currency' => 'SAR', 'our_price' => 5,   'image' => 'icloud'],
            ['brand' => 'iCloud',           'category' => 'services', 'name' => 'iCloud+ 200 GB 1 Month',         'name_ar' => 'آي كلاود+ ٢٠٠ جيجا - شهر',     'face_value' => 11,   'currency' => 'SAR', 'our_price' => 12,  'image' => 'icloud'],
            ['brand' => 'iCloud',           'category' => 'services', 'name' => 'iCloud+ 2 TB 1 Month',           'name_ar' => 'آي كلاود+ ٢ تيرا - شهر',       'face_value' => 37,   'currency' => 'SAR', 'our_price' => 39,  'image' => 'icloud'],
        ];
    }
}
