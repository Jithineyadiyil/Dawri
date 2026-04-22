<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Sponsor;
use App\Models\Sponsorship;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

/**
 * SponsorshipService — domain operations for the sponsorship subsystem.
 *
 * Everything that mutates a sponsorship beyond plain field updates should go
 * through here: creating deals, activating them, marking fulfilled, and
 * computing aggregate values for tournament display.
 */
class SponsorshipService
{
    /**
     * Create a new sponsorship attaching a sponsor to a tournament.
     *
     * Enforces:
     *  - Only one 'title' sponsor per tournament
     *  - Only one 'presenting' sponsor per tournament
     *  - Sponsor must be active
     *  - Tournament must exist
     *  - Contribution type must match the fields supplied (cash ⇒ amount > 0,
     *    in_kind ⇒ description present, logo ⇒ no monetary fields)
     *
     * @param  array{tournament_id:string,sponsor_id:string,placement_type:string,contribution_type:string,cash_amount_sar?:float|int|string,in_kind_description?:string,in_kind_value_sar?:float|int|string,notes?:string}  $data
     */
    public function create(array $data, ?User $admin = null): Sponsorship
    {
        $this->guardSponsorActive($data['sponsor_id']);
        $this->guardTournamentExists($data['tournament_id']);
        $this->guardExclusivePlacement($data['tournament_id'], $data['placement_type']);
        $this->guardContributionCoherent($data);

        return DB::transaction(function () use ($data, $admin): Sponsorship {
            return Sponsorship::create([
                'tournament_id'          => $data['tournament_id'],
                'sponsor_id'             => $data['sponsor_id'],
                'placement_type'         => $data['placement_type'],
                'contribution_type'      => $data['contribution_type'],
                'cash_amount_sar'        => $data['cash_amount_sar'] ?? 0,
                'in_kind_description'    => $data['in_kind_description'] ?? null,
                'in_kind_description_ar' => $data['in_kind_description_ar'] ?? null,
                'in_kind_value_sar'      => $data['in_kind_value_sar'] ?? null,
                'contract_status'        => 'draft',
                'notes'                  => $data['notes'] ?? null,
                'created_by_user_id'     => $admin?->id,
            ]);
        });
    }

    /**
     * Move a sponsorship from draft/pending to active.
     * Only active sponsorships are publicly visible on tournament pages.
     */
    public function activate(Sponsorship $sponsorship): Sponsorship
    {
        if ($sponsorship->contract_status === 'cancelled') {
            throw new RuntimeException('Cancelled sponsorships cannot be activated. Create a new one.');
        }
        if ($sponsorship->contract_status === 'active') {
            return $sponsorship; // idempotent
        }

        $sponsorship->update([
            'contract_status' => 'active',
            'activated_at'    => now(),
        ]);

        return $sponsorship;
    }

    /**
     * Create a sponsorship in 'pending' state — used when a tournament
     * organizer proposes a deal that needs admin review before going public.
     *
     * Uses the same guards as create() but skips exclusive-placement checks
     * against ACTIVE sponsorships (because pending deals aren't visible yet).
     * Title/presenting exclusivity is still enforced against other pending
     * deals so two organizers can't propose competing title sponsors.
     *
     * @param  array  $data  Same shape as create()
     */
    public function createAsProposal(array $data, ?User $proposer = null): Sponsorship
    {
        $this->guardSponsorActive($data['sponsor_id']);
        $this->guardTournamentExists($data['tournament_id']);
        $this->guardExclusivePlacement($data['tournament_id'], $data['placement_type']);
        $this->guardContributionCoherent($data);

        return DB::transaction(function () use ($data, $proposer): Sponsorship {
            return Sponsorship::create([
                'tournament_id'          => $data['tournament_id'],
                'sponsor_id'             => $data['sponsor_id'],
                'placement_type'         => $data['placement_type'],
                'contribution_type'      => $data['contribution_type'],
                'cash_amount_sar'        => $data['cash_amount_sar'] ?? 0,
                'in_kind_description'    => $data['in_kind_description'] ?? null,
                'in_kind_description_ar' => $data['in_kind_description_ar'] ?? null,
                'in_kind_value_sar'      => $data['in_kind_value_sar'] ?? null,
                'contract_status'        => 'pending',
                'notes'                  => $data['notes'] ?? null,
                'created_by_user_id'     => $proposer?->id,
            ]);
        });
    }

    /**
     * Admin approves a pending organizer proposal — flips it to active.
     * Only pending deals can be approved; active/fulfilled/cancelled throw.
     */
    public function approve(Sponsorship $sponsorship): Sponsorship
    {
        if ($sponsorship->contract_status !== 'pending') {
            throw new RuntimeException(
                "Only pending sponsorships can be approved. Current status: {$sponsorship->contract_status}."
            );
        }

        $sponsorship->update([
            'contract_status' => 'active',
            'activated_at'    => now(),
        ]);

        return $sponsorship;
    }

    /**
     * Admin rejects a pending organizer proposal — flips it to cancelled
     * with a reason appended to notes. Terminal state.
     */
    public function reject(Sponsorship $sponsorship, ?string $reason = null): Sponsorship
    {
        if ($sponsorship->contract_status !== 'pending') {
            throw new RuntimeException(
                "Only pending sponsorships can be rejected. Current status: {$sponsorship->contract_status}."
            );
        }

        return $this->cancel($sponsorship, $reason ?? 'Rejected by admin');
    }

    /**
     * Mark a sponsorship fulfilled — payment received / goods delivered.
     * This is the terminal happy state.
     */
    public function fulfill(Sponsorship $sponsorship): Sponsorship
    {
        if ($sponsorship->contract_status !== 'active') {
            throw new RuntimeException('Only active sponsorships can be fulfilled.');
        }

        $sponsorship->update([
            'contract_status' => 'fulfilled',
            'fulfilled_at'    => now(),
        ]);

        return $sponsorship;
    }

    /**
     * Cancel a sponsorship. Soft-cancel — the row stays for audit but
     * no longer counts toward prize pools or renders publicly.
     */
    public function cancel(Sponsorship $sponsorship, ?string $reason = null): Sponsorship
    {
        $sponsorship->update([
            'contract_status' => 'cancelled',
            'notes'           => trim(($sponsorship->notes ?? '') . "\n\n[CANCELLED " . now()->toDateString() . "] " . ($reason ?? 'No reason provided')),
        ]);

        return $sponsorship;
    }

    /**
     * Aggregate view of all active sponsorships on one tournament, used by
     * the public tournament detail page.
     *
     * @return array{total_cash_sar:float,total_in_kind_value_sar:float,total_pool_sar:float,title_sponsor:?array,presenting_sponsors:Collection,supporting_sponsors:Collection}
     */
    public function summarizeForTournament(Tournament $tournament): array
    {
        $active = Sponsorship::active()
            ->where('tournament_id', $tournament->id)
            ->with('sponsor')
            ->get();

        $totalCash   = (float) $active->sum('cash_amount_sar');
        $totalInKind = (float) $active->sum('in_kind_value_sar');

        return [
            'total_cash_sar'        => $totalCash,
            'total_in_kind_value_sar' => $totalInKind,
            'total_pool_sar'        => $totalCash + $totalInKind,
            'title_sponsor'         => $this->formatSponsorship($active->firstWhere('placement_type', 'title')),
            'presenting_sponsors'   => $active->where('placement_type', 'presenting')->map(fn ($s) => $this->formatSponsorship($s))->values(),
            'supporting_sponsors'   => $active->where('placement_type', 'supporting')->map(fn ($s) => $this->formatSponsorship($s))->values(),
        ];
    }

    // ── Guards ────────────────────────────────────────────────────────

    private function guardSponsorActive(string $sponsorId): void
    {
        $sponsor = Sponsor::find($sponsorId);
        if (! $sponsor) {
            throw new InvalidArgumentException("Sponsor {$sponsorId} not found.");
        }
        if (! $sponsor->is_active) {
            throw new InvalidArgumentException("Sponsor {$sponsor->name} is inactive.");
        }
    }

    private function guardTournamentExists(string $tournamentId): void
    {
        if (! Tournament::where('id', $tournamentId)->exists()) {
            throw new InvalidArgumentException("Tournament {$tournamentId} not found.");
        }
    }

    private function guardExclusivePlacement(string $tournamentId, string $placement): void
    {
        if (! in_array($placement, ['title', 'presenting'], true)) {
            return; // supporting has no exclusivity
        }

        // Block if another sponsor already holds this slot in any non-terminal
        // state — including 'pending' so two organizers can't simultaneously
        // propose competing title sponsors.
        $exists = Sponsorship::where('tournament_id', $tournamentId)
            ->where('placement_type', $placement)
            ->whereIn('contract_status', ['draft', 'pending', 'active'])
            ->exists();

        if ($exists) {
            throw new InvalidArgumentException(
                "A {$placement} sponsor already exists for this tournament. Cancel the existing one first."
            );
        }
    }

    private function guardContributionCoherent(array $data): void
    {
        $type = $data['contribution_type'] ?? 'cash';
        $cash = (float) ($data['cash_amount_sar'] ?? 0);
        $desc = trim((string) ($data['in_kind_description'] ?? ''));

        switch ($type) {
            case 'cash':
                if ($cash <= 0) {
                    throw new InvalidArgumentException('Cash sponsorship must have cash_amount_sar > 0.');
                }
                break;
            case 'in_kind':
                if ($desc === '') {
                    throw new InvalidArgumentException('In-kind sponsorship must include an in_kind_description.');
                }
                break;
            case 'logo':
                if ($cash > 0 || $desc !== '') {
                    throw new InvalidArgumentException('Logo-only sponsorship must not include cash or in-kind fields.');
                }
                break;
            default:
                throw new InvalidArgumentException("Unknown contribution_type: {$type}");
        }
    }

    /**
     * Public-facing serialization of a single sponsorship for the tournament
     * detail page. Keeps internal notes/audit fields out of the wire format.
     *
     * @return array{id:string,name:string,name_ar:?string,tagline:?string,tagline_ar:?string,logo_url:?string,website_url:?string,placement_type:string,contribution_type:string,cash_amount_sar:float,in_kind_description:?string}|null
     */
    private function formatSponsorship(?Sponsorship $s): ?array
    {
        if (! $s || ! $s->sponsor) {
            return null;
        }

        return [
            'id'                   => $s->id,
            'name'                 => $s->sponsor->name,
            'name_ar'              => $s->sponsor->name_ar,
            'tagline'              => $s->sponsor->tagline,
            'tagline_ar'           => $s->sponsor->tagline_ar,
            'logo_url'             => $s->sponsor->logo_url,
            'website_url'          => $s->sponsor->website_url,
            'placement_type'       => $s->placement_type,
            'contribution_type'    => $s->contribution_type,
            'cash_amount_sar'      => (float) $s->cash_amount_sar,
            'in_kind_description'  => $s->in_kind_description,
        ];
    }
}
