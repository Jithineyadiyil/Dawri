<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Company;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * BrandingService — resolves the effective brand payload for a tournament
 * or a company, applying the PRD's plan-gating rule so free-tier users
 * never see custom branding even if they set it in the past.
 *
 * Resolution order (matches user's "Both" Sprint 3 decision):
 *   1. Platform defaults (gold/cyan/dark) — always the base layer.
 *   2. Company branding, layered on top — only if company's plan qualifies.
 *   3. Tournament override, layered on top — only if organizer's plan qualifies
 *      AND tournament.brand_override === true.
 *
 * Plan gate: 'professional' and 'enterprise' (PRD §5.4).
 */
class BrandingService
{
    /** @var array<int, string> */
    public const BRANDING_PLANS = ['professional', 'enterprise'];

    /** Platform defaults — matches the dawri gold/cyan/dark theme. */
    public const PLATFORM_DEFAULTS = [
        'primary_color'    => '#f0a500',
        'secondary_color'  => '#00e5ff',
        'accent_color'     => '#22c55e',
        'background_color' => '#0b1022',
        'font_family'      => 'Bebas Neue, Rajdhani, sans-serif',
        'logo_url'         => null,
        'source'           => 'platform',
    ];

    /**
     * Resolve the brand to apply when rendering a given tournament.
     *
     * @return array<string, mixed>
     */
    public function forTournament(Tournament $tournament): array
    {
        $brand = self::PLATFORM_DEFAULTS;

        $company = $tournament->company ?? $tournament->organizer?->company ?? null;
        if ($company && $this->planAllowsBranding($company)) {
            $brand = $this->merge($brand, $this->fromCompany($company));
            $brand['source'] = 'company';
        }

        if ($tournament->brand_override && $this->planAllowsBrandingForUser($tournament->organizer)) {
            $brand = $this->merge($brand, $this->fromTournament($tournament));
            $brand['source'] = 'tournament';
        }

        return $brand;
    }

    /** @return array<string, mixed> */
    public function forCompany(Company $company): array
    {
        if (! $this->planAllowsBranding($company)) {
            return self::PLATFORM_DEFAULTS;
        }
        return $this->merge(self::PLATFORM_DEFAULTS, $this->fromCompany($company));
    }

    public function planAllowsBranding(Company $company): bool
    {
        $plan = $company->subscriptions()
            ->where('status', 'active')
            ->orderByDesc('created_at')
            ->value('plan');

        return $plan !== null && in_array(strtolower($plan), self::BRANDING_PLANS, true);
    }

    public function planAllowsBrandingForUser(?User $user): bool
    {
        if ($user === null) { return false; }
        if (($user->role ?? '') === 'admin') { return true; }

        if ($user->company_id) {
            $company = $user->company ?? Company::find($user->company_id);
            if ($company && $this->planAllowsBranding($company)) { return true; }
        }

        $plan = DB::table('subscriptions')
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->orderByDesc('created_at')
            ->value('plan');

        return $plan !== null && in_array(strtolower($plan), self::BRANDING_PLANS, true);
    }

    /** @param array<string, mixed> $base @param array<string, mixed> $src @return array<string, mixed> */
    private function merge(array $base, array $src): array
    {
        foreach ($src as $key => $val) {
            if ($val !== null && $val !== '') { $base[$key] = $val; }
        }
        return $base;
    }

    /** @return array<string, mixed> */
    private function fromCompany(Company $company): array
    {
        return [
            'primary_color'    => $company->primary_color,
            'secondary_color'  => $company->secondary_color,
            'accent_color'     => $company->accent_color,
            'background_color' => $company->background_color,
            'font_family'      => $company->font_family,
            'logo_url'         => $company->logo_url,
        ];
    }

    /** @return array<string, mixed> */
    private function fromTournament(Tournament $tournament): array
    {
        return [
            'primary_color'    => $tournament->primary_color,
            'secondary_color'  => $tournament->secondary_color,
            'accent_color'     => $tournament->accent_color,
            'background_color' => $tournament->background_color,
            'font_family'      => $tournament->font_family,
            'logo_url'         => $tournament->logo_url,
        ];
    }
}
