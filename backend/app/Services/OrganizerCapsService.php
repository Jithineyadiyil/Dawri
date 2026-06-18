<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

/**
 * OrganizerCapsService — tournament-creation limits per organizer tier.
 *
 *   Tier           Max participants  Can charge fees   Featured  Sponsors
 *   ─────────────  ────────────────  ────────────────  ────────  ────────
 *   none              16                  no              no       no
 *   verified         128                  yes             no       yes
 *   professional   unlimited              yes             yes      yes
 *
 * Platform admins (users.role='admin') bypass all caps.
 */
final class OrganizerCapsService
{
    public const TIER_NONE         = 'none';
    public const TIER_VERIFIED     = 'verified';
    public const TIER_PROFESSIONAL = 'professional';

    /** @return array<string, mixed> */
    public function capsFor(User $user): array
    {
        if ($user->role === 'admin') {
            return [
                'tier'             => 'admin',
                'max_participants' => null,    // unlimited
                'can_charge_fees'  => true,
                'can_feature'      => true,
                'can_sponsor'      => true,
            ];
        }

        return match ($user->organizer_tier ?? self::TIER_NONE) {
            self::TIER_PROFESSIONAL => [
                'tier'             => self::TIER_PROFESSIONAL,
                'max_participants' => null,
                'can_charge_fees'  => true,
                'can_feature'      => true,
                'can_sponsor'      => true,
            ],
            self::TIER_VERIFIED => [
                'tier'             => self::TIER_VERIFIED,
                'max_participants' => 128,
                'can_charge_fees'  => true,
                'can_feature'      => false,
                'can_sponsor'      => true,
            ],
            default => [
                'tier'             => self::TIER_NONE,
                'max_participants' => 16,
                'can_charge_fees'  => false,
                'can_feature'      => false,
                'can_sponsor'      => false,
            ],
        };
    }

    /**
     * Validate the requested tournament params against the user's caps.
     *
     * @param array{ max_participants?: int|null, entry_fee_sar?: int|null } $params
     * @return array<int, string> validation errors keyed by field
     */
    public function validate(User $user, array $params): array
    {
        $caps   = $this->capsFor($user);
        $errors = [];

        $cap = $caps['max_participants'];
        if ($cap !== null && isset($params['max_participants']) && $params['max_participants'] > $cap) {
            $errors['max_participants'] = sprintf(
                'Your %s tier allows up to %d participants. Apply for verification to host larger tournaments.',
                $caps['tier'], $cap,
            );
        }

        $fee = (int) ($params['entry_fee_sar'] ?? 0);
        if ($fee > 0 && ! $caps['can_charge_fees']) {
            $errors['entry_fee_sar'] = 'Charging an entry fee requires a verified organizer tier.';
        }

        return $errors;
    }
}
