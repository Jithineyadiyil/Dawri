<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * ── Sprint 1 v2 fix ─────────────────────────────────────────────────────────
 *
 *   1. `id` is NOT included in updateOrCreate value arrays.
 *      The previous pass assigned a fresh UUID on every seeder run, which
 *      triggered MySQL FK cascade violations from `digital_orders` / any
 *      other child table that referenced the old id. The HasUuids trait on
 *      each model auto-generates the id on INSERT; on UPDATE we leave it
 *      alone so child rows stay valid.
 *
 *   2. Phone numbers are all unique across seeded accounts.
 *      Previously admin (+966500000001) collided with player1. Now:
 *        organizer: +966500000000
 *        admin:     +966500099999
 *        player N:  +9665001000XX
 *
 *   3. phone_verified_at set at seed time — matches the column added by
 *      migration 2026_04_20_000001_add_phone_verified_at_to_users.
 *
 *   4. wallet_balance is seeded on the users table (matches the runtime
 *      code path used by MarketplaceController + PaymentService + WalletService).
 *
 *   Safe to re-run any number of times — updateOrCreate without `id` in
 *   the values array refreshes attribute data without disturbing FKs.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Organizer ──────────────────────────────────────────────────────
        $organizer = User::updateOrCreate(
            ['email' => 'organizer@dawri.gg'],
            [
                'name'              => 'Dawri Organizer',
                'phone'             => '+966500000000',
                'password'          => Hash::make('password'),
                'role'              => 'organizer',
                'phone_verified_at' => now(),
                'wallet_balance'    => 5000,
            ]
        );

        // ── Admin (distinct phone range to avoid unique collision) ────────
        User::updateOrCreate(
            ['email' => 'admin@dawri.gg'],
            [
                'name'              => 'Dawri Admin',
                'phone'             => '+966500099999',
                'password'          => Hash::make('password'),
                'role'              => 'admin',
                'phone_verified_at' => now(),
                'wallet_balance'    => 0,
            ]
        );

        // ── 16 seeded players (phone range +9665001000XX) ─────────────────
        $players = [];
        for ($i = 1; $i <= 16; $i++) {
            $suffix = str_pad((string) $i, 2, '0', STR_PAD_LEFT);

            $players[] = User::updateOrCreate(
                ['email' => "player{$i}@dawri.gg"],
                [
                    'name'              => "Player {$i}",
                    'phone'             => "+96650010000{$suffix}",
                    'password'          => Hash::make('password'),
                    'role'              => 'player',
                    'phone_verified_at' => now(),
                    'wallet_balance'    => rand(100, 500),
                ]
            );
        }

        // ── T1: SE — open registration ────────────────────────────────────
        Tournament::updateOrCreate(
            ['name' => 'EA FC 25 Cup — Spring 2026'],
            [
                'name_ar'                => 'كأس EA FC 25 — ربيع 2026',
                'game'                   => 'ea_fc25',
                'format'                 => 'single_elimination',
                'max_participants'       => 16,
                'registration_closes_at' => now()->addDays(7),
                'starts_at'              => now()->addDays(8),
                'is_public'              => true,
                'entry_fee_sar'          => 0,
                'prize_pool'             => [
                    ['position' => 1, 'reward' => 'PSN Card 200 SAR'],
                    ['position' => 2, 'reward' => 'PSN Card 100 SAR'],
                ],
                'organizer_id'           => $organizer->id,
                'status'                 => 'registration_open',
            ]
        );

        // ── T2: Swiss — registration closed, ready to bracket ─────────────
        $swiss = Tournament::updateOrCreate(
            ['name' => 'PUBG Mobile — Swiss League'],
            [
                'name_ar'                => 'دوري PUBG السويسري',
                'game'                   => 'pubg_mobile',
                'format'                 => 'swiss',
                'max_participants'       => 8,
                'swiss_rounds'           => 4,
                'registration_closes_at' => now()->subHour(),
                'starts_at'              => now()->addHours(2),
                'is_public'              => true,
                'entry_fee_sar'          => 0,
                'prize_pool'             => [
                    ['position' => 1, 'reward' => 'PUBG UC 3000'],
                ],
                'organizer_id'           => $organizer->id,
                'status'                 => 'registration_open',
            ]
        );

        foreach (array_slice($players, 0, 8) as $idx => $p) {
            TournamentParticipant::updateOrCreate(
                ['tournament_id' => $swiss->id, 'user_id' => $p->id],
                [
                    'gamertag'      => $p->name,
                    'seed'          => $idx + 1,
                    'status'        => 'registered',
                    'registered_at' => now(),
                ]
            );
        }

        // ── T3: Round Robin ────────────────────────────────────────────────
        Tournament::updateOrCreate(
            ['name' => 'CoD Mobile — Round Robin Invitational'],
            [
                'name_ar'                => 'بطولة كول أوف ديوتي',
                'game'                   => 'cod_mobile',
                'format'                 => 'round_robin',
                'max_participants'       => 8,
                'registration_closes_at' => now()->addDays(3),
                'starts_at'              => now()->addDays(4),
                'is_public'              => true,
                'entry_fee_sar'          => 0,
                'organizer_id'           => $organizer->id,
                'status'                 => 'registration_open',
            ]
        );

        // ── T4: Double Elimination ─────────────────────────────────────────
        Tournament::updateOrCreate(
            ['name' => 'EA FC 25 — Double Chance Championship'],
            [
                'game'                   => 'ea_fc25',
                'format'                 => 'double_elimination',
                'max_participants'       => 8,
                'registration_closes_at' => now()->addDays(5),
                'starts_at'              => now()->addDays(6),
                'is_public'              => true,
                'entry_fee_sar'          => 0,
                'organizer_id'           => $organizer->id,
                'status'                 => 'registration_open',
            ]
        );
    }
}
