<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\Distributors\ReloadlyAdapter;
use Illuminate\Console\Command;

/**
 *   php artisan reloadly:check         — verify creds + balance
 *   php artisan reloadly:check --sync  — list available SA gift-card products
 *
 * Run this BEFORE going live so you know auth, balance and the catalog
 * call all work end-to-end against the real Reloadly API.
 */
final class ReloadlyCheck extends Command
{
    protected $signature   = 'reloadly:check {--sync : Also dump catalog}';
    protected $description = 'Verify Reloadly credentials, wallet balance, and (optionally) the SA gift-card catalog.';

    public function handle(ReloadlyAdapter $r): int
    {
        if (! $r->isConfigured()) {
            $this->error('Reloadly is NOT configured. Set RELOADLY_CLIENT_ID and RELOADLY_CLIENT_SECRET in .env.');
            $this->line('  Auth URL:  ' . config('services.reloadly.auth_url'));
            $this->line('  API base:  ' . config('services.reloadly.url'));
            return self::FAILURE;
        }

        $this->info('Checking wallet balance…');
        $balance = $r->getBalance();
        if (! $balance['success']) {
            $this->error('Balance check FAILED: ' . $balance['message']);
            return self::FAILURE;
        }
        $this->info(sprintf('  Balance: %s %s', number_format((float) $balance['amount'], 2), $balance['currency']));

        if ($this->option('sync')) {
            $this->info('Fetching SA gift-card catalog…');
            $cat = $r->getCatalog('SA');
            if (! $cat['success']) {
                $this->error('Catalog fetch FAILED: ' . $cat['message']);
                return self::FAILURE;
            }
            $count = count($cat['products']);
            $this->info("  {$count} products available.");
            foreach (array_slice($cat['products'], 0, 5) as $p) {
                $this->line(sprintf('    %s — %s (%s)', $p['id'] ?: '—', $p['name'], $p['brand']));
            }
        }

        $this->info('OK — Reloadly is wired correctly.');
        return self::SUCCESS;
    }
}
