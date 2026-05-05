<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Services\BrandingService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * TournamentResource
 *
 * Sprint 3 additions: brand, rules, cover image.
 * Sprint 4 additions: every participant reference (participants[],
 * match participant_a/participant_b, match winner, currentParticipant)
 * now exposes display_name + avatar_url so the UI can render gamer tags
 * and avatars consistently throughout the bracket and leaderboard.
 */
class TournamentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userId = $request->user()?->id;

        $matches = $this->whenLoaded('matches', fn () =>
            $this->matches->map(fn ($m) => $this->matchArray($m))->values()
        );

        $bracket = $this->buildBracket($matches);

        $currentParticipant = null;
        $isRegistered       = false;
        if ($userId && $this->relationLoaded('participants')) {
            $currentParticipant = $this->participants->firstWhere(
                fn ($p) => (string) $p->user_id === (string) $userId
            );
            $isRegistered = $currentParticipant !== null;
        }

        $participantCount = $this->participants_count
            ?? ($this->relationLoaded('participants') ? $this->participants->count() : 0);

        $maxParticipants = (int) ($this->max_participants ?? 0);
        $isFull          = $maxParticipants > 0 && $participantCount >= $maxParticipants;

        $now = now();
        $registrationOpen = in_array($this->status, ['registration', 'registration_open'], true)
            && ! $isFull
            && (! $this->registration_closes_at || $now->lt($this->registration_closes_at));

        $brand = app(BrandingService::class)->forTournament($this->resource);

        return [
            'id'                     => $this->id,
            'name'                   => $this->name,
            'name_ar'                => $this->name_ar,
            'game'                   => $this->game,
            'format'                 => $this->format,
            'status'                 => $this->status,
            'game_label'             => $this->gameLabel(),
            'format_label'           => $this->formatLabel(),
            'status_label'           => $this->statusLabel(),
            'max_participants'       => $this->max_participants,
            'participant_count'      => $participantCount,
            'participants_count'     => $participantCount,
            'starts_at'              => $this->starts_at?->toIso8601String(),
            'registration_closes_at' => $this->registration_closes_at?->toIso8601String(),
            'timezone'               => $this->timezone,
            'is_registration_open'   => $registrationOpen,
            'is_registered'          => $isRegistered,
            'is_full'                => $isFull,
            'entry_fee_sar'          => $this->entry_fee_sar ?? 0,
            'prize_pool'             => $this->prize_pool,
            'swiss_rounds'           => $this->swiss_rounds,
            'organizer_id'           => $this->organizer_id,
            'organizer_name'         => $this->whenLoaded('organizer', fn () => $this->organizer?->name),
            'organizer'              => $this->whenLoaded('organizer', fn () => $this->organizer
                ? [
                    'id'           => $this->organizer->id,
                    'name'         => $this->organizer->name,
                    'display_name' => $this->organizer->display_name,
                    'avatar_url'   => $this->organizer->avatar_url,
                ] : null),
            'company_id'             => $this->company_id,
            'company'                => $this->whenLoaded('company', fn () => $this->company ? [
                'id'       => $this->company->id,
                'name'     => $this->company->name,
                'logo_url' => $this->company->logo_url,
            ] : null),

            'cover_image_url' => $this->cover_image_url,
            'logo_url'        => $this->logo_url,
            'rules'           => $this->rules,
            'has_rules'       => $this->hasRules(),
            'brand_override'  => (bool) $this->brand_override,
            'brand'           => $brand,
            'my_participant'  => $currentParticipant ? [
                'id'                => $currentParticipant->id,
                'rules_accepted_at' => $currentParticipant->rules_accepted_at?->toIso8601String(),
            ] : null,

            'participants' => $this->whenLoaded('participants', fn () =>
                $this->participants->map(fn ($p) => [
                    'id'           => $p->id,
                    'user_id'      => $p->user_id,
                    'seed'         => $p->seed,
                    'wins'         => $p->wins ?? 0,
                    'losses'       => $p->losses ?? 0,
                    'points'       => $p->points ?? 0,
                    'buchholz'     => $p->buchholz ?? 0,
                    'name'         => $p->relationLoaded('user') ? ($p->user?->name ?? '—') : '—',
                    'display_name' => $p->relationLoaded('user') ? ($p->user?->display_name ?? '—') : '—',
                    'nickname'     => $p->relationLoaded('user') ? $p->user?->nickname : null,
                    'avatar_url'   => $p->relationLoaded('user') ? $p->user?->avatar_url : null,
                ])
            ),
            'bracket'    => $bracket,
            'matches'    => $matches,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    private function buildBracket(mixed $matches): ?array
    {
        if ($this->relationLoaded('matches') && $this->matches->isNotEmpty()) {
            $currentRound = $this->matches->where('status', '!=', 'completed')->min('round_number') ?? 1;
            $totalRounds  = $this->matches->max('round_number') ?? 1;
            $lastMatch    = $this->matches->sortByDesc('round_number')->first();
            $winner       = null;
            if ($lastMatch?->winner_id && $this->status === 'completed') {
                $wp = $lastMatch->winner;
                if ($wp) {
                    $winner = [
                        'id'           => $wp->id,
                        'name'         => $wp->user?->name ?? '—',
                        'display_name' => $wp->user?->display_name ?? '—',
                        'avatar_url'   => $wp->user?->avatar_url,
                    ];
                }
            }
            return [
                'status'        => $this->status === 'completed' ? 'completed' : 'ongoing',
                'current_round' => $currentRound,
                'total_rounds'  => $totalRounds,
                'matches'       => $matches,
                'winner'        => $winner,
            ];
        }
        if ($this->relationLoaded('bracket') && $this->bracket) {
            $b = $this->bracket;
            return [
                'status'        => $b->status ?? 'pending',
                'current_round' => $b->current_round ?? 1,
                'total_rounds'  => $b->total_rounds ?? 1,
                'matches'       => $matches ?? [],
                'winner'        => null,
            ];
        }
        return null;
    }

    private function matchArray(mixed $m): array
    {
        $pA = $m->relationLoaded('participantA') ? $m->participantA : null;
        $pB = $m->relationLoaded('participantB') ? $m->participantB : null;
        $w  = $m->relationLoaded('winner')       ? $m->winner       : null;

        return [
            'id'                   => $m->id,
            'round_number'         => $m->round_number,
            'match_number'         => $m->match_number,
            'bracket_section'      => $m->bracket_section ?? 'winners',
            'status'               => $m->status,
            'score_a'              => $m->score_a,
            'score_b'              => $m->score_b,
            'dispute_reason'       => $m->dispute_reason,
            'next_match_id'        => $m->next_match_id,
            'participant_a_is_bye' => (bool) $m->participant_a_is_bye,
            'participant_b_is_bye' => (bool) $m->participant_b_is_bye,
            'winner_id'            => $m->winner_id,
            'scheduled_at'         => $m->scheduled_at?->toIso8601String(),
            'scheduled_by_id'      => $m->scheduled_by_id ?? null,
            'stream_url'           => $m->stream_url,
            'participant_a'        => $this->participantSummary($pA),
            'participant_b'        => $this->participantSummary($pB),
            'winner'               => $this->participantSummary($w),
        ];
    }

    /**
     * Uniform participant summary used on matches. Includes display_name and
     * avatar_url so the bracket card can render gamer tags + avatars.
     */
    private function participantSummary(mixed $p): ?array
    {
        if (! $p) { return null; }
        $u = $p->user ?? null;
        return [
            'id'           => $p->id,
            'user_id'      => $p->user_id ?? null,
            'name'         => $u?->name ?? '—',
            'display_name' => $u?->display_name ?? ($u?->name ?? '—'),
            'nickname'     => $u?->nickname,
            'avatar_url'   => $u?->avatar_url,
        ];
    }

    private function gameLabel(): string
    {
        return match ($this->game) {
            'ea_fc', 'ea_fc25'  => 'EA FC 25',
            'pubg_mobile'       => 'PUBG Mobile',
            'cod_mobile'        => 'Call of Duty: Mobile',
            default             => ucfirst(str_replace('_', ' ', $this->game ?? '')),
        };
    }

    private function formatLabel(): string
    {
        return match ($this->format) {
            'single_elimination' => 'Single Elimination',
            'double_elimination' => 'Double Elimination',
            'round_robin'        => 'Round Robin',
            'swiss'              => 'Swiss System',
            default              => ucfirst(str_replace('_', ' ', $this->format ?? '')),
        };
    }

    private function statusLabel(): string
    {
        return match ($this->status) {
            'draft'              => 'Draft',
            'registration',
            'registration_open'  => 'Registration Open',
            'ongoing',
            'in_progress'        => 'Live',
            'completed'          => 'Completed',
            'cancelled'          => 'Cancelled',
            default              => ucfirst($this->status ?? ''),
        };
    }
}
