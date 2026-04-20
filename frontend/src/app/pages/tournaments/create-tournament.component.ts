import {
  ChangeDetectionStrategy, Component, EventEmitter,
  OnInit, Output, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ApiService }  from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';

const API = 'http://localhost:8001/api/v1';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit {
  @Output() created   = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly api   = inject(ApiService);
  private readonly http  = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly fb    = inject(FormBuilder);

  readonly saving = signal(false);
  readonly games  = signal<{ value: string; label: string }[]>([
    { value: 'ea_fc25',     label: 'EA FC 25'           },
    { value: 'pubg_mobile', label: 'PUBG Mobile'         },
    { value: 'cod_mobile',  label: 'Call of Duty Mobile' },
  ]);

  readonly formats = [
    { value: 'single_elimination', label: 'Single Elimination', desc: 'Lose once and you are out.'            },
    { value: 'double_elimination', label: 'Double Elimination', desc: 'Losers get a second chance.'           },
    { value: 'round_robin',        label: 'Round Robin',        desc: 'Everyone plays everyone.'              },
    { value: 'swiss',              label: 'Swiss System',       desc: 'Paired by performance, no eliminations.' },
  ];

  readonly form = this.fb.group({
    name:                   ['', [Validators.required, Validators.maxLength(150)]],
    name_ar:                ['', Validators.maxLength(150)],
    game:                   ['ea_fc25', Validators.required],
    format:                 ['single_elimination', Validators.required],
    max_participants:       [16, [Validators.required, Validators.min(2), Validators.max(512)]],
    swiss_rounds:           [5],
    registration_closes_at: [this.dt(1), Validators.required],
    starts_at:              [this.dt(2), Validators.required],
    timezone:               ['Asia/Riyadh'],
    is_public:              [true],
    entry_fee_sar:          [0, [Validators.min(0)]],
    prize_1:                [''],
    prize_2:                [''],
    prize_3:                [''],
  });

  ngOnInit(): void {
    // Load games from backend, fall back to hardcoded if API fails
    this.http.get<{ data: any[] }>(`${API}/games/active`).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res?.data?.length) {
        this.games.set(res.data.map(g => ({ value: g.key, label: g.name })));
        // Set first game as default
        this.form.patchValue({ game: res.data[0].key });
      }
    });
  }

  get isSwiss(): boolean { return this.form.value.format === 'swiss'; }

  minDatetime(): string { return this.dt(0); }

  private dt(hoursFromNow: number): string {
    const d = new Date(Date.now() + (hoursFromNow * 60 + 30) * 60 * 1000);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const v = this.form.value;

    const prizePool: { position: number; reward: string }[] = [];
    if (v.prize_1?.trim()) prizePool.push({ position: 1, reward: v.prize_1.trim() });
    if (v.prize_2?.trim()) prizePool.push({ position: 2, reward: v.prize_2.trim() });
    if (v.prize_3?.trim()) prizePool.push({ position: 3, reward: v.prize_3.trim() });

    const payload: any = {
      name:                   v.name,
      name_ar:                v.name_ar || undefined,
      game:                   v.game,
      format:                 v.format,
      max_participants:       v.max_participants,
      starts_at:              v.starts_at,
      start_date:             v.starts_at,
      registration_closes_at: v.registration_closes_at,
      registration_end:       v.registration_closes_at,
      timezone:               v.timezone,
      is_public:              v.is_public,
      entry_fee_sar:          v.entry_fee_sar ?? 0,
      prize_pool:             prizePool.length ? prizePool : undefined,
    };
    if (this.isSwiss) payload.swiss_rounds = v.swiss_rounds;

    this.api.createTournament(payload).subscribe({
      next: (res: any) => {
        this.toast.success('Tournament created!');
        this.created.emit(res.data);
        this.saving.set(false);
      },
      error: (err: any) => {
        const errors = err.error?.errors;
        const msg = errors
          ? Object.values(errors).flat().join(' ')
          : (err.error?.message ?? 'Failed to create tournament.');
        this.toast.error(String(msg));
        this.saving.set(false);
      },
    });
  }
}
