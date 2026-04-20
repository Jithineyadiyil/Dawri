<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@dawri.gg'],
            [
                'name'              => 'Dawri Admin',
                'password'          => Hash::make('password'),
                'role'              => 'admin',
                'phone'             => '+966500000001',
                'subscription_plan' => 'enterprise',
            ]
        );

        // Create sample companies
        $companies = [
            [
                'name' => 'Aramco Gaming League', 'name_ar' => 'دوري أرامكو للألعاب',
                'domain' => 'aramco.com', 'industry' => 'Energy', 'country' => 'SA', 'city' => 'Dhahran',
                'contact_name' => 'Mohammed Al-Rashid', 'contact_email' => 'gaming@aramco.com',
                'employee_count' => 5000, 'status' => 'active', 'plan' => 'enterprise', 'price' => 15000,
            ],
            [
                'name' => 'STC Esports', 'name_ar' => 'STC للرياضات الإلكترونية',
                'domain' => 'stc.com.sa', 'industry' => 'Telecom', 'country' => 'SA', 'city' => 'Riyadh',
                'contact_name' => 'Sara Al-Otaibi', 'contact_email' => 'esports@stc.com.sa',
                'employee_count' => 2000, 'status' => 'active', 'plan' => 'professional', 'price' => 7499,
            ],
            [
                'name' => 'NEOM Gaming Hub', 'name_ar' => 'مركز نيوم للألعاب',
                'domain' => 'neom.com', 'industry' => 'Development', 'country' => 'SA', 'city' => 'NEOM',
                'contact_name' => 'Khalid Al-Zahrani', 'contact_email' => 'gaming@neom.com',
                'employee_count' => 800, 'status' => 'active', 'plan' => 'professional', 'price' => 7499,
            ],
            [
                'name' => 'KAUST Student League', 'name_ar' => 'دوري طلاب كاوست',
                'domain' => 'kaust.edu.sa', 'industry' => 'Education', 'country' => 'SA', 'city' => 'Thuwal',
                'contact_name' => 'Dr. Ahmed Al-Harbi', 'contact_email' => 'student.affairs@kaust.edu.sa',
                'employee_count' => 300, 'status' => 'trial', 'plan' => 'professional', 'price' => 0,
            ],
            [
                'name' => 'Mobily Play', 'name_ar' => 'موبايلي بلاي',
                'domain' => 'mobily.com.sa', 'industry' => 'Telecom', 'country' => 'SA', 'city' => 'Riyadh',
                'contact_name' => 'Nour Al-Dosari', 'contact_email' => 'play@mobily.com.sa',
                'employee_count' => 1500, 'status' => 'active', 'plan' => 'starter', 'price' => 2499,
            ],
        ];

        foreach ($companies as $data) {
            $plan  = $data['plan'];
            $price = $data['price'];
            unset($data['plan'], $data['price']);

            $company = Company::firstOrCreate(['domain' => $data['domain']], $data);

            // Create organizer user for this company
            $orgEmail = 'org@' . $data['domain'];
            $organizer = User::firstOrCreate(
                ['email' => $orgEmail],
                [
                    'name'              => $data['contact_name'],
                    'password'          => Hash::make('password'),
                    'role'              => 'organizer',
                    'company_id'        => $company->id,
                    'subscription_plan' => $plan,
                ]
            );

            // Create subscription
            Subscription::firstOrCreate(
                ['user_id' => $organizer->id, 'company_id' => $company->id],
                [
                    'plan'                 => $plan,
                    'status'               => $data['status'] === 'trial' ? 'trial' : 'active',
                    'price'                => $price,
                    'billing_cycle'        => 'monthly',
                    'trial_ends_at'        => $data['status'] === 'trial' ? now()->addDays(14) : null,
                    'current_period_start' => now()->subDays(15),
                    'current_period_end'   => now()->addDays(15),
                ]
            );
        }

        // Link existing organizer to demo company
        $organizer = User::where('email', 'organizer@dawri.gg')->first();
        if ($organizer) {
            $demoCompany = Company::where('domain', 'stc.com.sa')->first();
            if ($demoCompany) {
                $organizer->update(['company_id' => $demoCompany->id]);
                Subscription::where('user_id', $organizer->id)
                    ->update(['company_id' => $demoCompany->id]);
            }
        }

        $this->command->info('Seeded admin user (admin@dawri.gg / password) + 5 companies with subscriptions.');
    }
}
