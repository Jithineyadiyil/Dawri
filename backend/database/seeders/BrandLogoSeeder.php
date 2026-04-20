<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandLogoSeeder extends Seeder
{
    public function run(): void
    {
        $logos = [
            'Netflix'     => 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png',
            'Spotify'     => 'https://assets.stickpng.com/images/5ece5029123d6d0004ce5f8b.png',
            'Google Play' => 'https://assets.stickpng.com/images/5847e209cef1014c0b5e4833.png',
            'PUBG Mobile' => 'https://assets.stickpng.com/images/5e17d1f0ff6a0b0004d71d84.png',
            'Apple'       => 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png',
            'Amazon'      => 'https://assets.stickpng.com/images/5848224bcef1014c0b5e498e.png',
            'Jawaker'     => 'https://play-lh.googleusercontent.com/4_XTBLVKGGuGO7jtIxMmJMWECiNjHagapRE8q7HidRLbLUlhCOe_jrEZ1ZNKJAnLhPk=w480-h960-rw',
            'STC'         => 'https://seeklogo.com/images/S/stc-logo-BC754E1742-seeklogo.com.png',
            'PlayStation' => 'https://assets.stickpng.com/images/5a1c1ad8da2b4f099b95da15.png',
            'Xbox'        => 'https://assets.stickpng.com/images/5848309bcef1014c0b5e510e.png',
        ];

        foreach ($logos as $brand => $url) {
            DB::table('digital_products')
                ->where('brand', $brand)
                ->update(['image_url' => $url]);
        }

        $this->command->info('Brand logos updated successfully.');
    }
}
