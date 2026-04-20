<?php
declare(strict_types=1);
namespace Database\Seeders;
use App\Enums\{BracketFormat, UserRole, UserStatus};
use App\Models\{Tournament, TournamentParticipant, User, Wallet};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TournamentSeeder extends Seeder {
    public function run(): void {
        $organizer = User::firstOrCreate(
            ['email' => 'organizer@dawri.gg'],
            ['name'=>'Tournament Admin','password'=>Hash::make('password'),
             'role'=>UserRole::ORGANIZER,'status'=>UserStatus::ACTIVE,
             'phone_verified_at'=>now()]
        );
        Wallet::firstOrCreate(['user_id'=>$organizer->id]);

        $playerNames = [
            'Ali Al-Ghamdi','Sara Al-Otaibi','Omar Al-Zahrani','Nour Al-Rashidi',
            'Khalid Al-Dosari','Reem Al-Shehri','Faisal Al-Qahtani','Lina Al-Harbi',
            'Mohammed Al-Anazi','Fatima Al-Saud','Abdullah Al-Mutairi','Hessa Al-Maktoum',
            'Turki Al-Shamrani','Dana Al-Mansouri','Salman Al-Aqeel','Maha Al-Jabri',
        ];
        $players = [];
        foreach ($playerNames as $i => $name) {
            $p = User::firstOrCreate(
                ['email' => 'player'.($i+1).'@dawri.gg'],
                ['name'=>$name,'password'=>Hash::make('password'),
                 'role'=>UserRole::PLAYER,'status'=>UserStatus::ACTIVE,
                 'phone_verified_at'=>now(),'ranking_points'=>rand(100,2000)]
            );
            Wallet::firstOrCreate(['user_id'=>$p->id]);
            $players[] = $p;
        }

        $t1 = Tournament::firstOrCreate(['name'=>'Dawri Cup — EA FC 25'],[
            'name_ar'=>'كأس داوري — EA FC 25','game'=>'ea_fc25',
            'format'=>BracketFormat::SINGLE_ELIMINATION,'max_participants'=>8,
            'organizer_id'=>$organizer->id,'registration_closes_at'=>now()->addDays(3),
            'starts_at'=>now()->addDays(4),'is_public'=>true,'entry_fee_sar'=>0,
            'prize_pool'=>[['position'=>1,'reward'=>'500 SAR'],['position'=>2,'reward'=>'200 SAR']],
        ]);
        foreach (array_slice($players,0,5) as $i=>$p)
            TournamentParticipant::firstOrCreate(['tournament_id'=>$t1->id,'user_id'=>$p->id],
                ['seed'=>5-$i,'registered_at'=>now()]);

        $t2 = Tournament::firstOrCreate(['name'=>'PUBG Mobile — GCC Championship'],[
            'name_ar'=>'بطولة خليج PUBG موبايل','game'=>'pubg_mobile',
            'format'=>BracketFormat::DOUBLE_ELIMINATION,'max_participants'=>8,
            'organizer_id'=>$organizer->id,'registration_closes_at'=>now()->subHour(),
            'starts_at'=>now()->addHours(2),'is_public'=>true,'entry_fee_sar'=>0,
            'prize_pool'=>[['position'=>1,'reward'=>'1,000 SAR'],['position'=>2,'reward'=>'500 SAR']],
        ]);
        foreach (array_slice($players,0,8) as $i=>$p)
            TournamentParticipant::firstOrCreate(['tournament_id'=>$t2->id,'user_id'=>$p->id],
                ['seed'=>8-$i,'registered_at'=>now()]);

        $t3 = Tournament::firstOrCreate(['name'=>'CoD Mobile — Round Robin League'],[
            'name_ar'=>'دوري كول أوف ديوتي موبايل','game'=>'cod_mobile',
            'format'=>BracketFormat::ROUND_ROBIN,'max_participants'=>8,
            'organizer_id'=>$organizer->id,'registration_closes_at'=>now()->addDays(7),
            'starts_at'=>now()->addDays(8),'is_public'=>true,
        ]);
        foreach (array_slice($players,2,4) as $i=>$p)
            TournamentParticipant::firstOrCreate(['tournament_id'=>$t3->id,'user_id'=>$p->id],
                ['seed'=>4-$i,'registered_at'=>now()]);

        $t4 = Tournament::firstOrCreate(['name'=>'EA FC 25 — Swiss Masters'],[
            'name_ar'=>'ماسترز EA FC 25 السويسري','game'=>'ea_fc25',
            'format'=>BracketFormat::SWISS,'max_participants'=>16,'swiss_rounds'=>5,
            'organizer_id'=>$organizer->id,'registration_closes_at'=>now()->subHours(2),
            'starts_at'=>now()->addHour(),'is_public'=>true,
            'prize_pool'=>[['position'=>1,'reward'=>'PSN Card 200 SAR'],
                          ['position'=>2,'reward'=>'PSN Card 100 SAR']],
        ]);
        foreach ($players as $i=>$p)
            TournamentParticipant::firstOrCreate(['tournament_id'=>$t4->id,'user_id'=>$p->id],
                ['seed'=>count($players)-$i,'registered_at'=>now()]);

        $this->command->info('✓ Seeder done: 17 users, 4 tournaments');
        $this->command->info('  Login: organizer@dawri.gg / password');
    }
}
