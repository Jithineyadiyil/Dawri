import {
  ChangeDetectionStrategy, Component, OnInit, inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService }  from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:8001/api/v1';

/**
 * Create-tournament page — Sprint 3 redesign.
 *
 * Sectioned layout:
 *   1. Basics              (name, name_ar, game, format)
 *   2. Schedule & Capacity (dates, max participants, swiss rounds, entry fee)
 *   3. Rules & Conditions  (NEW — multi-line text editor)
 *   4. Cover Image         (NEW — upload + preview with game-art fallback)
 *   5. Branding            (NEW — plan-gated brand override panel)
 *   6. Prizes              (1st / 2nd / 3rd)
 *
 * Submit strategy: save core tournament → upload cover (if any) → apply
 * brand override (if any). All three happen sequentially so a failure
 * in step 2 or 3 doesn't roll back step 1 — the user can retry from the
 * tournament detail page.
 */
@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly toast  = inject(ToastService);
  private readonly fb     = inject(FormBuilder);
  private readonly http   = inject(HttpClient);

  readonly saving = signal(false);

  readonly games = signal<{ value: string; label: string; emoji: string }[]>([
    { value: 'ea_fc25',     label: 'EA FC 25',           emoji: '⚽' },
    { value: 'pubg_mobile', label: 'PUBG Mobile',        emoji: '🔫' },
    { value: 'cod_mobile',  label: 'Call of Duty Mobile', emoji: '🎯' },
  ]);

  readonly formats = [
    { value: 'single_elimination', label: 'Single Elimination', desc: 'Lose once → out.' },
    { value: 'double_elimination', label: 'Double Elimination', desc: 'Losers get a second chance.' },
    { value: 'round_robin',        label: 'Round Robin',        desc: 'Everyone plays everyone.' },
    { value: 'swiss',              label: 'Swiss System',       desc: 'Paired by performance.' },
  ];

  readonly fontOptions = [
    { value: 'Bebas Neue, Rajdhani, sans-serif', label: 'Bebas Neue (default)' },
    { value: 'Rajdhani, sans-serif',             label: 'Rajdhani' },
    { value: 'Orbitron, sans-serif',             label: 'Orbitron (gaming)' },
    { value: 'Poppins, sans-serif',              label: 'Poppins (friendly)' },
    { value: 'Inter, sans-serif',                label: 'Inter' },
    { value: 'Cairo, sans-serif',                label: 'Cairo (Arabic)' },
    { value: 'Space Mono, monospace',            label: 'Space Mono' },
  ];

  readonly form = this.fb.group({
    name:                   ['', [Validators.required, Validators.maxLength(150)]],
    name_ar:                ['', Validators.maxLength(150)],
    game:                   ['ea_fc25', Validators.required],
    format:                 ['single_elimination', Validators.required],
    max_participants:       [16, [Validators.required, Validators.min(2), Validators.max(512)]],
    swiss_rounds:           [5],
    registration_closes_at: [this.dt(24), Validators.required],
    starts_at:              [this.dt(48), Validators.required],
    timezone:               ['Asia/Riyadh'],
    is_public:              [true],
    entry_fee_sar:          [0, [Validators.min(0)]],
    prize_1:                [''],
    prize_2:                [''],
    prize_3:                [''],
    // Sprint 3
    rules:                  [''],
    brand_override:         [false],
    primary_color:          [''],
    secondary_color:        [''],
    font_family:            [''],
  });

  // Cover image upload
  readonly coverFile    = signal<File | null>(null);
  readonly coverPreview = signal<string | null>(null);

  // Plan eligibility — drives whether branding section is enabled
  readonly canBrand = signal(false);

  readonly isSwiss = computed(() => this.form.value.format === 'swiss');
  readonly brandEnabled = computed(() => this.form.value.brand_override && this.canBrand());

  ngOnInit(): void {
    this.http.get<{ data: any[] }>(`${API}/games/active`).subscribe(res => {
      if (res?.data?.length) {
        this.games.set(res.data.map(g => ({
          value: g.key, label: g.name,
          emoji: g.icon_emoji ?? '🎮',
        })));
      }
    });

    // Check if the current user has branding access.
    this.http.get<any>(`${API}/companies/mine`).subscribe({
      next: res => this.canBrand.set(res?.data?.has_branding !== undefined),
      error: () => this.canBrand.set(false),
    });
  }

  onCoverSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.toast.error('Cover must be under 5MB.'); return;
    }
    this.coverFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.coverPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeCover(): void {
    this.coverFile.set(null);
    this.coverPreview.set(null);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);

    const v = this.form.value;
    const prize_pool: any[] = [];
    if (v.prize_1) prize_pool.push({ position: 1, reward: v.prize_1 });
    if (v.prize_2) prize_pool.push({ position: 2, reward: v.prize_2 });
    if (v.prize_3) prize_pool.push({ position: 3, reward: v.prize_3 });

    const payload: any = {
      name:                   v.name,
      name_ar:                v.name_ar || null,
      game:                   v.game,
      format:                 v.format,
      max_participants:       v.max_participants,
      swiss_rounds:           this.isSwiss() ? v.swiss_rounds : null,
      registration_closes_at: new Date(v.registration_closes_at!).toISOString(),
      starts_at:              new Date(v.starts_at!).toISOString(),
      timezone:               v.timezone,
      is_public:              v.is_public,
      entry_fee_sar:          v.entry_fee_sar,
      prize_pool:             prize_pool.length ? prize_pool : null,
      rules:                  v.rules || null,
    };

    this.api.createTournament(payload).subscribe({
      next: (res: any) => {
        const created = res.data;
        this.postCreateChain(created);
      },
      error: (err: any) => {
        this.saving.set(false);
        this.toast.error(err.error?.message ?? 'Failed to create tournament.');
      },
    });
  }

  /**
   * Post-create: upload cover (if any), set brand override (if any), then redirect.
   * Failures in these secondary steps are surfaced but don't block the redirect —
   * the user can retry from the tournament detail page.
   */
  private postCreateChain(created: any): void {
    const id = created.id;
    const coverUpload$ = this.coverFile()
      ? this.http.post(`${API}/tournaments/${id}/cover`, (() => {
          const f = new FormData(); f.append('file', this.coverFile()!);
          return f;
        })())
      : null;

    const brandUpdate$ = (this.brandEnabled() && (this.form.value.primary_color || this.form.value.font_family))
      ? this.http.patch(`${API}/tournaments/${id}/brand`, {
          brand_override:  true,
          primary_color:   this.form.value.primary_color || null,
          secondary_color: this.form.value.secondary_color || null,
          font_family:     this.form.value.font_family || null,
        })
      : null;

    const finish = () => {
      this.saving.set(false);
      this.toast.success('Tournament created!');
      this.router.navigate(['/tournaments', id]);
    };

    if (coverUpload$) {
      coverUpload$.subscribe({
        next: () => {
          if (brandUpdate$) { brandUpdate$.subscribe({ next: finish, error: finish }); }
          else finish();
        },
        error: () => { this.toast.warning('Created, but cover failed to upload.'); finish(); },
      });
    } else if (brandUpdate$) {
      brandUpdate$.subscribe({ next: finish, error: finish });
    } else {
      finish();
    }
  }

  private dt(hoursFromNow: number): string {
    const d = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60 * 1000).toISOString().slice(0, 16);
  }
}
