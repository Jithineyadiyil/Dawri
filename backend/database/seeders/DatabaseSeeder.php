<?php

namespace Database\Seeders;

use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $organizer = User::create([
            'id' => (string) Str::uuid(), 'name' => 'Dawri Organizer',
            'email' => 'organizer@dawri.gg', 'phone' => '+966500000000',
            'password' => Hash::make('password'), 'role' => 'organizer', 'phone_verified' => true,
        ]);
        Wallet::create(['id' => (string) Str::uuid(), 'user_id' => $organizer->id, 'balance' => 5000]);

        for ($i = 1; $i <= 16; $i++) {
            $player = User::create([
                'id' => (string) Str::uuid(), 'name' => "Player {$i}",
                'email' => "player{$i}@dawri.gg",
                'phone' => '+96650000' . str_pad((string)$i, 4, '0', STR_PAD_LEFT),
                'password' => Hash::make('password'), 'role' => 'player', 'phone_verified' => true,
            ]);
            Wallet::create(['id' => (string) Str::uuid(), 'user_id' => $player->id, 'balance' => rand(100, 500)]);
        }

        $players = User::where('role', 'player')->get();

        // T1: SE - Open registration
        Tournament::create([
            'id' => (string) Str::uuid(),
            'name' => 'EA FC 25 Cup — Spring 2026', 'name_ar' => 'كأس EA FC 25 — ربيع 2026',
            'game' => 'ea_fc25', 'format' => 'single_elimination', 'max_participants' => 16,
            'registration_closes_at' => now()->addDays(7), 'starts_at' => now()->addDays(8),
            'is_public' => true, 'entry_fee_sar' => 0,
            'prize_pool' => [['position'=>1,'reward'=>'PSN Card 200 SAR'],['position'=>2,'reward'=>'PSN Card 100 SAR']],
            'organizer_id' => $organizer->id,
        ]);

        // T2: Swiss - Registration closed, ready to bracket
        $swiss = Tournament::create([
            'id' => (string) Str::uuid(),
            'name' => 'PUBG Mobile — Swiss League', 'name_ar' => 'دوري PUBG السويسري',
            'game' => 'pubg_mobile', 'format' => 'swiss', 'max_participants' => 8, 'swiss_rounds' => 4,
            'registration_closes_at' => now()->subHour(), 'starts_at' => now()->addHours(2),
            'is_public' => true, 'entry_fee_sar' => 0,
            'prize_pool' => [['position'=>1,'reward'=>'PUBG UC 3000']],
            'organizer_id' => $organizer->id,
        ]);
        $players->take(8)->each(fn($p) => TournamentParticipant::create([
            'id' => (string) Str::uuid(), 'tournament_id' => $swiss->id, 'user_id' => $p->id, 'registered_at' => now(),
        ]));

        // T3: Round Robin
        Tournament::create([
            'id' => (string) Str::uuid(),
            'name' => 'CoD Mobile — Round Robin Invitational', 'name_ar' => 'بطولة كول أوف ديوتي',
            'game' => 'cod_mobile', 'format' => 'round_robin', 'max_participants' => 8,
            'registration_closes_at' => now()->addDays(3), 'starts_at' => now()->addDays(4),
            'is_public' => true, 'entry_fee_sar' => 0,
            'organizer_id' => $organizer->id,
        ]);

        // T4: Double Elimination
        Tournament::create([
            'id' => (string) Str::uuid(),
            'name' => 'EA FC 25 — Double Chance Championship',
            'game' => 'ea_fc25', 'format' => 'double_elimination', 'max_participants' => 8,
            'registration_closes_at' => now()->addDays(5), 'starts_at' => now()->addDays(6),
            'is_public' => true, 'entry_fee_sar' => 0, 'organizer_id' => $organizer->id,
        ]);
    }
}
