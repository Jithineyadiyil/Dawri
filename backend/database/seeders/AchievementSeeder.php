<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

final class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            // First-time milestones (bronze)
            ['key'=>'first_win',           'name'=>'First Blood',           'name_ar'=>'الفوز الأول',         'description'=>'Win your first match.',                       'icon'=>'sword',     'tier'=>'bronze',  'category'=>'match',       'xp_reward'=>50],
            ['key'=>'first_friend',        'name'=>'New Connection',        'name_ar'=>'صداقة جديدة',         'description'=>'Add your first friend.',                       'icon'=>'user-plus', 'tier'=>'bronze',  'category'=>'social',      'xp_reward'=>25],
            ['key'=>'first_purchase',      'name'=>'Marketplace Debut',     'name_ar'=>'أول شراء',            'description'=>'Make your first marketplace purchase.',         'icon'=>'shopping-bag','tier'=>'bronze','category'=>'marketplace', 'xp_reward'=>25],
            ['key'=>'identity',            'name'=>'Identity',              'name_ar'=>'هوية كاملة',          'description'=>'Complete your gaming profile and platform IDs.','icon'=>'id-card',   'tier'=>'bronze',  'category'=>'milestone',   'xp_reward'=>75],
            ['key'=>'joined_tournament',   'name'=>'Newcomer',              'name_ar'=>'مشارك جديد',          'description'=>'Join your first tournament.',                  'icon'=>'flag',      'tier'=>'bronze',  'category'=>'tournament',  'xp_reward'=>50],
            ['key'=>'voice_chatter',       'name'=>'Voice Activated',       'name_ar'=>'صوت مفعّل',           'description'=>'Send a voice message.',                        'icon'=>'mic',       'tier'=>'bronze',  'category'=>'social',      'xp_reward'=>20],

            // Mid-tier (silver)
            ['key'=>'win_10',              'name'=>'Sharpshooter',          'name_ar'=>'القناص',              'description'=>'Win 10 matches.',                              'icon'=>'crosshair', 'tier'=>'silver',  'category'=>'match',       'xp_reward'=>150],
            ['key'=>'streak_3',            'name'=>'Hat Trick',             'name_ar'=>'الثلاثية',            'description'=>'Win 3 matches in a row.',                      'icon'=>'flame',     'tier'=>'silver',  'category'=>'streak',      'xp_reward'=>100],
            ['key'=>'podium',              'name'=>'On the Podium',         'name_ar'=>'منصة التتويج',        'description'=>'Finish top 3 in a tournament.',                'icon'=>'medal',     'tier'=>'silver',  'category'=>'tournament',  'xp_reward'=>150],
            ['key'=>'social_butterfly',    'name'=>'Social Butterfly',      'name_ar'=>'فراشة اجتماعية',      'description'=>'Add 10 friends.',                              'icon'=>'users',     'tier'=>'silver',  'category'=>'social',      'xp_reward'=>100],
            ['key'=>'team_founder',        'name'=>'Founder',               'name_ar'=>'المؤسس',              'description'=>'Create your first team.',                      'icon'=>'shield',    'tier'=>'silver',  'category'=>'team',        'xp_reward'=>150],
            ['key'=>'team_player',         'name'=>'Squad Up',              'name_ar'=>'انضمام للفريق',       'description'=>'Join a team.',                                 'icon'=>'users-round','tier'=>'silver', 'category'=>'team',        'xp_reward'=>50],
            ['key'=>'challenger',          'name'=>'Challenger',            'name_ar'=>'المتحدي',             'description'=>'Win your first 1v1 challenge.',                'icon'=>'swords',    'tier'=>'silver',  'category'=>'match',       'xp_reward'=>100],

            // High-tier (gold)
            ['key'=>'win_50',              'name'=>'Veteran',               'name_ar'=>'المخضرم',             'description'=>'Win 50 matches.',                              'icon'=>'star',      'tier'=>'gold',    'category'=>'match',       'xp_reward'=>400],
            ['key'=>'streak_5',            'name'=>'Unstoppable',           'name_ar'=>'لا يُوقَف',           'description'=>'Win 5 matches in a row.',                      'icon'=>'flame',     'tier'=>'gold',    'category'=>'streak',      'xp_reward'=>300],
            ['key'=>'tournament_champion', 'name'=>'Champion',              'name_ar'=>'البطل',               'description'=>'Win a tournament.',                            'icon'=>'trophy',    'tier'=>'gold',    'category'=>'tournament',  'xp_reward'=>500],
            ['key'=>'podium_10',           'name'=>'Frequent Finalist',     'name_ar'=>'وصيف دائم',           'description'=>'Reach top 3 in 10 tournaments.',               'icon'=>'medal',     'tier'=>'gold',    'category'=>'tournament',  'xp_reward'=>400],
            ['key'=>'tournament_veteran',  'name'=>'Tournament Veteran',    'name_ar'=>'مخضرم البطولات',      'description'=>'Participate in 25 tournaments.',               'icon'=>'flag',      'tier'=>'gold',    'category'=>'tournament',  'xp_reward'=>400],
            ['key'=>'challenger_25',       'name'=>'Duelist',               'name_ar'=>'المبارز',             'description'=>'Win 25 1v1 challenges.',                       'icon'=>'swords',    'tier'=>'gold',    'category'=>'match',       'xp_reward'=>400],

            // Apex (platinum)
            ['key'=>'win_100',             'name'=>'Centurion',             'name_ar'=>'القائد',              'description'=>'Win 100 matches.',                             'icon'=>'crown',     'tier'=>'platinum','category'=>'match',       'xp_reward'=>1000],
            ['key'=>'streak_10',           'name'=>'God Run',               'name_ar'=>'انطلاقة أسطورية',     'description'=>'Win 10 matches in a row.',                     'icon'=>'flame',     'tier'=>'platinum','category'=>'streak',      'xp_reward'=>800],
            ['key'=>'tournament_champion_5','name'=>'Hall of Fame',         'name_ar'=>'قاعة المشاهير',       'description'=>'Win 5 tournaments.',                           'icon'=>'crown',     'tier'=>'platinum','category'=>'tournament',  'xp_reward'=>1500],
        ];

        $order = 0;
        foreach ($rows as $row) {
            $row['sort_order'] = ++$order;
            Achievement::updateOrCreate(['key' => $row['key']], $row);
        }
    }
}
