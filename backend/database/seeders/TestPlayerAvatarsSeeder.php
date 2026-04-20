<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * TestPlayerAvatarsSeeder
 *
 * Assigns esports-themed nicknames + DiceBear avatar URLs to the 16 seeded
 * test players (player1@dawri.gg through player16@dawri.gg). Idempotent —
 * safe to run multiple times, will not overwrite a user who has already
 * set a custom nickname or uploaded their own avatar via the profile page.
 *
 * Run:   php artisan db:seed --class=TestPlayerAvatarsSeeder
 */
class TestPlayerAvatarsSeeder extends Seeder
{
    /** @var array<int, array{nickname: string, style: string}> */
    private const ROSTER = [
        1  => ['nickname' => 'blaze_rider',   'style' => 'adventurer'],
        2  => ['nickname' => 'shadow_fox',    'style' => 'adventurer'],
        3  => ['nickname' => 'storm_king',    'style' => 'avataaars'],
        4  => ['nickname' => 'phoenix_ace',   'style' => 'avataaars'],
        5  => ['nickname' => 'titan_wolf',    'style' => 'bottts'],
        6  => ['nickname' => 'ghost_sniper',  'style' => 'bottts'],
        7  => ['nickname' => 'viper_strike',  'style' => 'lorelei'],
        8  => ['nickname' => 'neon_samurai',  'style' => 'lorelei'],
        9  => ['nickname' => 'frost_ninja',   'style' => 'adventurer'],
        10 => ['nickname' => 'void_hunter',   'style' => 'adventurer'],
        11 => ['nickname' => 'pulse_reaper',  'style' => 'avataaars'],
        12 => ['nickname' => 'crimson_rogue', 'style' => 'avataaars'],
        13 => ['nickname' => 'solar_knight',  'style' => 'bottts'],
        14 => ['nickname' => 'lunar_edge',    'style' => 'bottts'],
        15 => ['nickname' => 'thunder_ghost', 'style' => 'lorelei'],
        16 => ['nickname' => 'ember_duke',    'style' => 'lorelei'],
    ];

    public function run(): void
    {
        foreach (self::ROSTER as $i => $data) {
            $email = "player{$i}@dawri.gg";
            $user  = User::where('email', $email)->first();

            if (! $user) {
                $this->command->warn("Skipping {$email} — user not found.");
                continue;
            }

            // Don't overwrite a real uploaded avatar (storage path, no http prefix).
            $hasUploadedAvatar = ! empty($user->avatar)
                && ! preg_match('#^https?://#i', (string) $user->avatar);

            // Don't overwrite a custom-set nickname (anything other than null
            // or one of our preset nicknames from a previous seed run).
            $presetNicks   = array_column(self::ROSTER, 'nickname');
            $hasCustomNick = ! empty($user->nickname)
                && ! in_array($user->nickname, $presetNicks, true);

            $nickname = $hasCustomNick ? $user->nickname : $data['nickname'];
            $avatar   = $hasUploadedAvatar
                ? $user->avatar
                : $this->dicebearUrl($data['style'], $data['nickname']);

            $user->update([
                'nickname' => $nickname,
                'avatar'   => $avatar,
            ]);

            $this->command->info("✓ {$email} → @{$nickname}");
        }
    }

    /**
     * Build a DiceBear avatar URL with gold/cyan brand-matched background.
     * Stable per seed — same nickname always renders the same character.
     */
    private function dicebearUrl(string $style, string $seed): string
    {
        $params = http_build_query([
            'seed'            => $seed,
            'backgroundColor' => 'f0a500,00e5ff,1a2040',
            'backgroundType'  => 'gradientLinear',
        ]);
        return "https://api.dicebear.com/7.x/{$style}/svg?{$params}";
    }
}
