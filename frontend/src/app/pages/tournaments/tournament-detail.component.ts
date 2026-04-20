import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ApiService }  from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

export interface BracketMatch {
  id: string;
  round_number: number;
  match_number: number;
  bracket_section: string;
  status: string;
  participant_a: { id: string; name: string } | null;
  participant_b: { id: string; name: string } | null;
  participant_a_is_bye: boolean;
  participant_b_is_bye: boolean;
  winner_id: string | null;
  score_a: number | null;
  score_b: number | null;
  dispute_reason: string | null;
  next_match_id: string | null;
}

export interface BracketRound {
  num: number;
  label: string;
  section: string;
  matches: BracketMatch[];
  slotHeight: number;
}

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api   = inject(ApiService);
  readonly auth          = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly fb    = inject(FormBuilder);

  readonly tournament    = signal<any>(null);
  readonly loading       = signal(true);
  readonly error         = signal<string | null>(null);
  readonly generating    = signal(false);
  readonly registering   = signal(false);
  readonly submitting    = signal(false);
  readonly activeTab     = signal<'bracket' | 'leaderboard' | 'prize'>('bracket');
  readonly selectedMatch = signal<BracketMatch | null>(null);
  readonly disputeMode   = signal(false);

  readonly resultForm = this.fb.group({
    winner_participant_id: ['', Validators.required],
    score_a: [null as number | null],
    score_b: [null as number | null],
  });

  readonly disputeForm = this.fb.group({
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  readonly rounds = computed<BracketRound[]>(() => {
    const t = this.tournament();
    if (!t) return [];
    const matches: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];
    if (!matches.length) return [];
    const format: string = t.format ?? 'single_elimination';
    const map = new Map<string, BracketMatch[]>();
    for (const m of matches) {
      const key = `${m.bracket_section ?? 'winners'}::${m.round_number}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    }
    const MATCH_H = 88;
    const GAP     = 12;
    const sorted = [...map.entries()].sort((a, b) => {
      const [secA, rA] = a[0].split('::');
      const [secB, rB] = b[0].split('::');
      const secOrder: Record<string, number> = { winners: 0, swiss: 0, round_robin: 0, losers: 1, grand_final: 2 };
      const sO = (secOrder[secA] ?? 0) - (secOrder[secB] ?? 0);
      return sO !== 0 ? sO : parseInt(rA) - parseInt(rB);
    });
    return sorted.map(([key, ms], idx) => {
      const [section, rn] = key.split('::');
      const roundNum = parseInt(rn);
      let slotHeight: number;
      if (format === 'single_elimination' || (format === 'double_elimination' && section === 'winners')) {
        slotHeight = (MATCH_H + GAP) * Math.pow(2, idx) - GAP;
      } else {
        slotHeight = MATCH_H;
      }
      const totalRounds = t?.bracket?.total_rounds ?? sorted.length;
      return {
        num: roundNum,
        label: this.roundLabel(section, roundNum, totalRounds, format),
        section,
        matches: ms.sort((a, b) => a.match_number - b.match_number),
        slotHeight,
      };
    });
  });

  readonly leaderboard = computed(() => {
    const t = this.tournament();
    if (!t?.participants?.length) return [];
    return [...t.participants]
      .sort((a: any, b: any) => b.wins - a.wins || b.points - a.points || a.losses - b.losses)
      .map((p: any, i: number) => ({
        rank: i + 1, name: p.name ?? '—', seed: p.seed,
        wins: p.wins ?? 0, losses: p.losses ?? 0,
        points: p.points ?? 0, buchholz: p.buchholz ?? 0,
      }));
  });

  readonly isOrganizerOrAdmin = computed(() => {
    const role = this.auth.currentUser()?.role ?? '';
    return role === 'organizer' || role === 'admin';
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(p => {
        this.loading.set(true);
        this.error.set(null);
        this.tournament.set(null);
        return this.api.getTournament(p.get('id')!);
      })
    ).subscribe({
      next: (res: any) => { this.tournament.set(res.data ?? res); this.loading.set(false); },
      error: (err: any) => { this.error.set(err?.error?.message ?? 'Failed to load tournament.'); this.loading.set(false); },
    });
  }

  register(): void {
    if (!this.auth.isLoggedIn()) { this.toast.info('Sign in to register.'); return; }
    this.registering.set(true);
    this.api.registerForTournament(this.tournament()?.id).subscribe({
      next: () => { this.refresh(); this.registering.set(false); this.toast.success('Registered!'); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.registering.set(false); },
    });
  }

  generateBracket(): void {
    this.generating.set(true);
    this.api.generateBracket(this.tournament()?.id).subscribe({
      next: () => { this.refresh(); this.generating.set(false); this.toast.success('Bracket generated!'); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.generating.set(false); },
    });
  }

  matchIsClickable(m: BracketMatch): boolean {
    return ['pending', 'scheduled', 'ongoing', 'submitted', 'disputed'].includes(m.status)
      && !!m.participant_a && !!m.participant_b;
  }

  openMatch(m: BracketMatch): void {
    if (!this.matchIsClickable(m)) return;
    this.selectedMatch.set(m);
    this.disputeMode.set(false);
    this.resultForm.reset({ winner_participant_id: '', score_a: null, score_b: null });
    this.disputeForm.reset();
  }

  closeModal(): void { this.selectedMatch.set(null); }

  getWinnerName(m: BracketMatch): string {
    if (!m.winner_id) return 'N/A';
    if (m.participant_a?.id === m.winner_id) return m.participant_a?.name ?? 'N/A';
    if (m.participant_b?.id === m.winner_id) return m.participant_b?.name ?? 'N/A';
    return 'N/A';
  }

  submitResult(): void {
    if (this.resultForm.invalid) { this.resultForm.markAllAsTouched(); return; }
    this.submitting.set(true);
    const v = this.resultForm.value;
    const body: any = { winner_participant_id: v.winner_participant_id };
    if (v.score_a != null) body.score_a = v.score_a;
    if (v.score_b != null) body.score_b = v.score_b;
    this.api.submitResult(this.tournament()!.id, this.selectedMatch()!.id, body).subscribe({
      next: () => { this.submitting.set(false); this.toast.success('Result submitted!'); this.closeModal(); this.refresh(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  confirmResult(): void {
    this.submitting.set(true);
    this.api.confirmResult(this.selectedMatch()!.id).subscribe({
      next: () => { this.submitting.set(false); this.toast.success('Confirmed!'); this.closeModal(); this.refresh(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  submitDispute(): void {
    if (this.disputeForm.invalid) return;
    this.submitting.set(true);
    this.api.disputeResult(this.selectedMatch()!.id, this.disputeForm.value.reason!).subscribe({
      next: () => { this.submitting.set(false); this.toast.warning('Dispute submitted.'); this.closeModal(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pending', scheduled: 'Scheduled', ongoing: 'Live',
      submitted: 'Awaiting confirm', confirmed: 'Confirmed',
      disputed: 'Disputed', completed: 'Done', walkover: 'Walkover', bye: 'Bye',
    };
    return map[status] ?? status;
  }

  private roundLabel(section: string, num: number, total: number, format: string): string {
    if (section === 'grand_final') return 'Grand Final';
    if (section === 'losers')      return `Losers R${num}`;
    if (section === 'round_robin') return `Round ${num}`;
    if (section === 'swiss')       return `Swiss R${num}`;
    const wbRounds = (format === 'double_elimination') ? Math.ceil(total / 2) : total;
    if (num === wbRounds)     return 'Final';
    if (num === wbRounds - 1) return 'Semis';
    if (num === wbRounds - 2) return 'Quarters';
    return `Round ${num}`;
  }

  private refresh(): void {
    const id = this.tournament()?.id;
    if (!id) return;
    this.api.getTournament(id).subscribe({
      next: (res: any) => this.tournament.set(res.data ?? res),
    });
  }
}
