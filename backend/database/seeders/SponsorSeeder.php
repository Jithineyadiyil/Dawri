<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Seeds 8 realistic brand sponsors for demo/dev environments.
 *
 * Brands chosen from the Saudi gaming/esports scene:
 *   - Red Bull, Logitech, Razer, HyperX — gaming hardware/energy
 *   - STC, Mobily — telecom (local)
 *   - SAMENA, AlUla — KSA regional/tourism (Vision 2030 aligned)
 */
class SponsorSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('sponsors')->count() > 0) {
            $this->command->info('sponsors already seeded — skipping.');
            return;
        }

        $now = now();

        $sponsors = [
            ['name' => 'Red Bull', 'name_ar' => 'ريد بُل', 'tagline' => 'Gives you wings', 'logo' => '/brands/redbull.svg', 'website' => 'https://redbull.com'],
            ['name' => 'Logitech', 'name_ar' => 'لوجيتك', 'tagline' => 'Gear that elevates your game', 'logo' => '/brands/logitech.svg', 'website' => 'https://logitechg.com'],
            ['name' => 'Razer',    'name_ar' => 'ريزر',   'tagline' => 'For Gamers. By Gamers.', 'logo' => '/brands/razer.svg', 'website' => 'https://razer.com'],
            ['name' => 'HyperX',   'name_ar' => 'هايبر إكس', 'tagline' => 'We\'re all gamers', 'logo' => '/brands/hyperx.svg', 'website' => 'https://hyperxgaming.com'],
            ['name' => 'STC',      'name_ar' => 'إس تي سي', 'tagline' => 'Connecting the Kingdom', 'logo' => '/brands/stc.svg', 'website' => 'https://stc.com.sa'],
            ['name' => 'Mobily',   'name_ar' => 'موبايلي', 'tagline' => 'Life made better', 'logo' => '/brands/mobily.svg', 'website' => 'https://mobily.com.sa'],
            ['name' => 'Zain',     'name_ar' => 'زين',    'tagline' => 'A wonderful world', 'logo' => '/brands/zain.svg', 'website' => 'https://zain.com'],
            ['name' => 'AlUla',    'name_ar' => 'العُلا', 'tagline' => 'The Oasis of Arabia',  'logo' => '/brands/alula.svg', 'website' => 'https://experiencealula.com'],
        ];

        $rows = array_map(fn ($s) => [
            'id'            => (string) Str::uuid(),
            'name'          => $s['name'],
            'name_ar'       => $s['name_ar'],
            'slug'          => Str::slug($s['name']),
            'tagline'       => $s['tagline'],
            'logo_url'      => $s['logo'],
            'website_url'   => $s['website'],
            'contact_name'  => 'Partnerships Team',
            'contact_email' => 'partners@' . Str::slug($s['name']) . '.example',
            'is_active'     => true,
            'created_at'    => $now,
            'updated_at'    => $now,
        ], $sponsors);

        DB::table('sponsors')->insert($rows);
        $this->command->info('Seeded ' . count($rows) . ' sponsors.');
    }
}
