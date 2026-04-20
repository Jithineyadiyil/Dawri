<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $organizer = User::where('email', 'organizer@dawri.gg')->first();
        if (! $organizer) {
            $this->command->warn('organizer@dawri.gg not found. Run TournamentSeeder first.');
            return;
        }

        // Give organizer a Professional plan trial
        $sub = Subscription::firstOrCreate(
            ['user_id' => $organizer->id, 'status' => 'trial'],
            [
                'plan'                 => 'professional',
                'price'                => 0,
                'billing_cycle'        => 'monthly',
                'trial_ends_at'        => now()->addDays(14),
                'current_period_start' => now(),
                'current_period_end'   => now()->addDays(14),
            ]
        );

        $organizer->update([
            'subscription_plan'  => 'professional',
            'organization_name'  => 'Dawri Demo Corp',
            'organization_name_ar' => 'شركة داوري التجريبية',
        ]);

        // Create a sample paid invoice
        Invoice::firstOrCreate(
            ['invoice_number' => 'INV-2026-00001'],
            [
                'subscription_id' => $sub->id,
                'user_id'         => $organizer->id,
                'subtotal'        => 7499,
                'vat_amount'      => 1124.85,
                'total'           => 8623.85,
                'currency'        => 'SAR',
                'status'          => 'paid',
                'period_start'    => now()->subMonth(),
                'period_end'      => now(),
                'paid_at'         => now()->subDays(25),
                'payment_method'  => 'mada',
                'line_items'      => [['description' => 'Professional Plan', 'amount' => 7499]],
            ]
        );

        $this->command->info('Seeded subscription for organizer@dawri.gg (Professional trial).');
    }
}
