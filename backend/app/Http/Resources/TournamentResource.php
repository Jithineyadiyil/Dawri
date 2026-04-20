<?php
declare(strict_types=1);
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TournamentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userId = $request->user()?->id;

        $matches = $this->whenLoaded('matches', fn () =>
            $this->matches->map(fn ($m) => $this->matchArray($m))->values()
        );

        $bracket = null;
        if ($this->relationLoaded('matches') && $this->matches->isNotEmpty()) {
            $currentRound = $this->matches->where('status', '!=', 'completed')->min('round_number') ?? 1;
            $totalRounds  = $this->matches->max('round_number') ?? 1;
            $lastMatch    = $this->matches->sortByDesc('round_number')->first();
            $winner       = null;
            if ($lastMatch?->winner_id && $this->status === 'completed') {
                $wp = $lastMatch->winner;
                if ($wp) {
                    $winner = ['id' => $wp->id, 'name' => $wp->user?->name ?? '—'];
                }
            }
            $bracket = [
                'status'        => $this->status === 'completed' ? 'completed' : 'ongoing',
                'current_round' => $currentRound,
                'total_rounds'  => $totalRounds,
                'matches'       => $matches,
                'winner'        => $winner,
            ];
        } elseif ($this->relationLoaded('bracket') && $this->bracket) {
            $b = $this->bracket;
            $bracket = [
                'status'        => $b->status ?? 'pending',
                'current_round' => $b->current_round ?? 1,
                'total_rounds'  => $b->total_rounds ?? 1,
                'matches'       => $matches ?? [],
                'winner'        => null,
            ];
        }

        $isRegistered = false;
        if ($userId && $this->relationLoaded('participants')) {
            $isRegistered = $this->participants->contains(fn ($p) => (string)$p->user_id === (string)$userId);
        }

        $now = now();
        // Open only if status is registration AND close date hasn't passed
        $registrationOpen = in_array($this->status, ['registration', 'registration_open'])
            && (!$this->registration_closes_at || $now->lt($this->registration_closes_at));

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
            'participant_count'      => $this->participants_count ?? ($this->relationLoaded('participants') ? $this->participants->count() : 0),
            'participants_count'     => $this->participants_count ?? ($this->relationLoaded('participants') ? $this->participants->count() : 0),
            'starts_at'              => $this->starts_at?->toIso8601String(),
            'registration_closes_at' => $this->registration_closes_at?->toIso8601String(),
            'timezone'               => $this->timezone,
            'is_registration_open'   => $registrationOpen,
            'is_registered'          => $isRegistered,
            'entry_fee_sar'          => $this->entry_fee_sar ?? 0,
            'prize_pool'             => $this->prize_pool,
            'swiss_rounds'           => $this->swiss_rounds,
            'organizer_name'         => $this->whenLoaded('organizer', fn () => $this->organizer?->name),
            'organizer'              => $this->whenLoaded('organizer', fn () => ['id' => $this->organizer->id, 'name' => $this->organizer->name]),
            'participants'           => $this->whenLoaded('participants', fn () =>
                $this->participants->map(fn ($p) => [
                    'id'       => $p->id,
                    'user_id'  => $p->user_id,
                    'seed'     => $p->seed,
                    'wins'     => $p->wins ?? 0,
                    'losses'   => $p->losses ?? 0,
                    'points'   => $p->points ?? 0,
                    'buchholz' => $p->buchholz ?? 0,
                    'name'     => $p->relationLoaded('user') ? ($p->user?->name ?? '—') : '—',
                ])
            ),
            'bracket'    => $bracket,
            'matches'    => $matches,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
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
            'participant_a'        => $pA ? ['id' => $pA->id, 'name' => $pA->user?->name ?? '—'] : null,
            'participant_b'        => $pB ? ['id' => $pB->id, 'name' => $pB->user?->name ?? '—'] : null,
            'winner'               => $w  ? ['id' => $w->id,  'name' => $w->user?->name  ?? '—'] : null,
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
            'registration'       => 'Registration Open',
            'registration_open'  => 'Registration Open',
            'ongoing'            => 'Live',
            'in_progress'        => 'Live',
            'completed'          => 'Completed',
            'cancelled'          => 'Cancelled',
            default              => ucfirst($this->status ?? ''),
        };
    }
}
