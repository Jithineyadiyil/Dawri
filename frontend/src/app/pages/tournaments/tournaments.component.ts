import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService }  from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="t-page">
      <div class="t-header">
        <div>
          <h1 class="t-title">Tournaments</h1>
          <p class="t-sub">Join competitive events across EA FC 25, PUBG Mobile, and Call of Duty Mobile.</p>
        </div>
        <div class="t-header-actions">
          <a routerLink="/auth" *ngIf="!auth.isLoggedIn()" class="btn btn-gold">Join Free →</a>
          <button class="btn btn-gold" *ngIf="canCreate()" (click)="showCreate = !showCreate">+ Create Tournament</button>
        </div>
      </div>

      <!-- Filters -->
      <form [formGroup]="filterForm" class="filters">
        <input class="filter-search" formControlName="search" type="text" placeholder="Search tournaments…"/>
        <select class="filter-select" formControlName="game">
          @for (g of games; track g.value) { <option [value]="g.value">{{ g.label }}</option> }
        </select>
        <select class="filter-select" formControlName="format">
          @for (f of formats; track f.value) { <option [value]="f.value">{{ f.label }}</option> }
        </select>
        <label class="filter-toggle">
          <input type="checkbox" formControlName="openOnly"/> Open only
        </label>
      </form>

      <!-- Error -->
      <div class="alert" *ngIf="error()">{{ error() }}</div>

      <!-- Loading -->
      <div class="t-skeleton" *ngIf="loading()">
        <div class="skel-card" *ngFor="let i of [1,2,3,4,5,6]"></div>
      </div>

      <!-- Results -->
      <ng-container *ngIf="!loading()">
        <p class="t-count" *ngIf="filtered().length > 0">{{ filtered().length }} tournament{{ filtered().length === 1 ? '' : 's' }}</p>

        <div class="empty-state" *ngIf="filtered().length === 0 && !error()">
          <div class="empty-icon">🏆</div>
          <p>No tournaments found.</p>
          <button class="btn btn-ghost" (click)="filterForm.reset()">Clear filters</button>
        </div>

        <div class="t-grid">
          @for (t of filtered(); track t.id) {
            <article class="t-card" [routerLink]="['/tournaments', t.id]">
              <div class="t-card__top">
                <span class="t-card__game">{{ t.game_label || t.game }}</span>
                <span class="t-card__format">{{ t.format_label || t.format }}</span>
              </div>
              <h2 class="t-card__name">{{ t.name }}</h2>
              @if (t.name_ar) { <p class="t-card__name-ar" dir="rtl" lang="ar">{{ t.name_ar }}</p> }
              <div class="t-card__stats">
                <span class="t-card__stat"><b>{{ t.participant_count }}</b>/{{ t.max_participants }}</span>
                <span class="t-card__sep">·</span>
                <span class="t-card__stat">{{ t.entry_fee_sar === 0 ? 'Free' : t.entry_fee_sar + ' SAR' }}</span>
                <span class="t-card__sep">·</span>
                <span class="t-card__stat" [class.stat-open]="t.is_registration_open">
                  {{ t.status === 'registration_open' ? 'Open' : t.status === 'in_progress' ? 'Live' : t.status === 'completed' ? 'Completed' : t.status }}
                </span>
              </div>
              <div class="t-card__date">Starts {{ t.starts_at | date:'d MMM, HH:mm' }}</div>
              <div class="t-card__actions" (click)="$event.stopPropagation()">
                @if (t.is_registered) {
                  <span class="registered-badge">✓ Registered</span>
                } @else if (t.is_registration_open && auth.isLoggedIn()) {
                  <button class="btn btn-gold btn-sm" (click)="register(t, $event)">Register</button>
                }
                @if (canCreate() && t.status !== 'registration_open' && !t.bracket) {
                  <button class="btn btn-cyan btn-sm" [disabled]="generating() === t.id" (click)="generateBracket(t, $event)">
                    {{ generating() === t.id ? 'Generating…' : 'Generate Bracket' }}
                  </button>
                }
              </div>
            </article>
          }
        </div>
      </ng-container>

      <!-- Create Tournament Modal -->
      <div class="modal-backdrop" *ngIf="showCreate" (click)="showCreate = false">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2 class="modal-title">Create Tournament</h2>
          <div class="form-group"><label>Name</label><input [(ngModel)]="newT.name" class="form-input" /></div>
          <div class="form-group"><label>Name (Arabic)</label><input [(ngModel)]="newT.name_ar" class="form-input" dir="rtl" /></div>
          <div class="form-row">
            <div class="form-group"><label>Game</label>
              <select [(ngModel)]="newT.game" class="form-input">
                <option value="ea_fc25">EA FC 25</option><option value="pubg_mobile">PUBG Mobile</option><option value="cod_mobile">CoD Mobile</option>
              </select>
            </div>
            <div class="form-group"><label>Format</label>
              <select [(ngModel)]="newT.format" class="form-input">
                <option value="single_elimination">Single Elimination</option><option value="double_elimination">Double Elimination</option>
                <option value="round_robin">Round Robin</option><option value="swiss">Swiss System</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Max Participants</label><input type="number" [(ngModel)]="newT.max_participants" class="form-input" min="4" max="512" /></div>
            <div class="form-group"><label>Entry Fee (SAR)</label><input type="number" [(ngModel)]="newT.entry_fee_sar" class="form-input" min="0" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Registration Closes</label><input type="datetime-local" [(ngModel)]="newT.registration_closes_at" class="form-input" /></div>
            <div class="form-group"><label>Starts At</label><input type="datetime-local" [(ngModel)]="newT.starts_at" class="form-input" /></div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" (click)="showCreate = false">Cancel</button>
            <button class="btn btn-gold" (click)="createTournament()" [disabled]="creating()">{{ creating() ? 'Creating…' : 'Create' }}</button>
          </div>
          <p class="modal-error" *ngIf="createError()">{{ createError() }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .t-page { padding: 32px; max-width: 1100px; margin: 0 auto; }
    .t-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 24px; flex-wrap: wrap; }
    .t-header-actions { display: flex; gap: 0.5rem; }
    .t-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; letter-spacing: 2px; color: #fff; margin: 0; }
    .t-sub { font-size: .9rem; color: #8892a4; margin: 4px 0 0; }
    .t-count { font-size: .85rem; color: #8892a4; margin-bottom: 16px; }

    .filters { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 24px; padding: 14px 18px; background: #0a0e18; border: 1px solid #1e2a3a; border-radius: 10px; }
    .filter-search { flex: 1; min-width: 180px; background: #060810; border: 1px solid #1e2a3a; border-radius: 6px; padding: 8px 14px; color: #fff; font-size: .88rem; }
    .filter-search::placeholder { color: #4b5563; }
    .filter-select { background: #060810; border: 1px solid #1e2a3a; border-radius: 6px; padding: 8px 12px; color: #c8cfd8; font-size: .88rem; }
    .filter-toggle { display: flex; align-items: center; gap: 6px; font-size: .82rem; color: #8892a4; cursor: pointer; }
    .filter-toggle input { accent-color: var(--gold, #f0a500); }

    .alert { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25); color: #f87171; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: .9rem; }

    .t-skeleton { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .skel-card { height: 200px; background: #0a0e18; border-radius: 12px; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    .t-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .t-card { background: #0a0e18; border: 1px solid #1e2a3a; border-radius: 12px; padding: 20px; cursor: pointer; transition: border-color .2s, transform .15s; }
    .t-card:hover { border-color: var(--gold, #f0a500); transform: translateY(-2px); }
    .t-card__top { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .t-card__game { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--cyan, #00e5ff); background: rgba(0,229,255,.08); padding: 3px 8px; border-radius: 4px; }
    .t-card__format { font-size: .7rem; color: #8892a4; }
    .t-card__name { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; color: #fff; margin: 0 0 4px; letter-spacing: 0.5px; }
    .t-card__name-ar { font-size: .85rem; color: #8892a4; margin: 0 0 12px; }
    .t-card__stats { display: flex; align-items: center; gap: 8px; font-size: .82rem; color: #8892a4; margin-bottom: 8px; }
    .t-card__stats b { color: var(--gold, #f0a500); }
    .t-card__sep { color: #333; }
    .stat-open { color: #22c55e; }
    .t-card__date { font-size: .78rem; color: #6b7280; margin-bottom: 12px; }
    .t-card__actions { display: flex; gap: 8px; align-items: center; }
    .registered-badge { font-size: .75rem; color: #22c55e; font-weight: 600; background: rgba(34,197,94,.1); padding: 4px 10px; border-radius: 4px; }

    .empty-state { text-align: center; padding: 60px 20px; color: #8892a4; }
    .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }

    .btn { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: .82rem; letter-spacing: .06em; text-transform: uppercase; padding: 9px 20px; border-radius: 6px; cursor: pointer; border: none; transition: opacity .15s; text-decoration: none; display: inline-flex; align-items: center; }
    .btn-gold { background: var(--gold, #f0a500); color: #060810; }
    .btn-gold:hover { opacity: .85; }
    .btn-gold:disabled { opacity: .5; cursor: not-allowed; }
    .btn-cyan { background: rgba(0,229,255,.12); color: var(--cyan, #00e5ff); border: 1px solid rgba(0,229,255,.25); }
    .btn-ghost { background: transparent; border: 1px solid #1e2a3a; color: #8892a4; }
    .btn-ghost:hover { border-color: var(--gold, #f0a500); color: var(--gold, #f0a500); }
    .btn-sm { font-size: .75rem; padding: 6px 14px; }

    /* Modal */
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 300; display: flex; align-items: center; justify-content: center; }
    .modal { background: #0a0e18; border: 1px solid #1e2a3a; border-radius: 14px; padding: 2rem; width: 90%; max-width: 550px; max-height: 90vh; overflow-y: auto; }
    .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: var(--gold, #f0a500); margin: 0 0 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-size: .75rem; color: #8892a4; text-transform: uppercase; letter-spacing: .04em; margin-bottom: .3rem; }
    .form-input { width: 100%; padding: .5rem .65rem; background: #060810; border: 1px solid #1e2a3a; border-radius: 6px; color: #fff; font-size: .9rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .modal-actions { display: flex; justify-content: flex-end; gap: .75rem; margin-top: 1.5rem; }
    .modal-error { color: #ef4444; font-size: .85rem; margin-top: .75rem; }

    @media (max-width: 640px) { .t-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
  `]
})
export class TournamentsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly auth        = inject(AuthService);
  private readonly fb  = inject(FormBuilder);

  readonly tournaments = signal<any[]>([]);
  readonly loading     = signal(true);
  readonly error       = signal<string | null>(null);
  readonly generating  = signal<string | null>(null);
  readonly creating    = signal(false);
  readonly createError = signal<string | null>(null);

  showCreate = false;
  newT: any = { name: '', name_ar: '', game: 'ea_fc25', format: 'single_elimination', max_participants: 16, entry_fee_sar: 0, registration_closes_at: '', starts_at: '' };

  readonly filterForm = this.fb.group({ game: [''], format: [''], openOnly: [false], search: [''] });

  readonly games = [
    { value: '', label: 'All Games' },
    { value: 'ea_fc25', label: 'EA FC 25' },
    { value: 'pubg_mobile', label: 'PUBG Mobile' },
    { value: 'cod_mobile', label: 'CoD Mobile' },
  ];
  readonly formats = [
    { value: '', label: 'All Formats' },
    { value: 'single_elimination', label: 'Single Elimination' },
    { value: 'double_elimination', label: 'Double Elimination' },
    { value: 'round_robin', label: 'Round Robin' },
    { value: 'swiss', label: 'Swiss System' },
  ];

  readonly filtered = computed(() => {
    const { game, format, openOnly, search } = this.filterForm.value;
    return this.tournaments().filter(t => {
      if (game && t.game !== game) return false;
      if (format && t.format !== format) return false;
      if (openOnly && t.status !== 'registration_open') return false;
      if (search && !t.name.toLowerCase().includes((search as string).toLowerCase())) return false;
      return true;
    });
  });

  canCreate(): boolean {
    const role = this.auth.currentUser()?.role;
    return role === 'admin' || role === 'organizer';
  }

  ngOnInit(): void {
    this.load();
    this.filterForm.valueChanges.subscribe(() => this.tournaments.update(t => [...t]));
  }

  register(tournament: any, e: MouseEvent): void {
    e.stopPropagation();
    if (!this.auth.isLoggedIn()) return;
    this.api.registerForTournament(tournament.id).subscribe({
      next: (res: any) => {
        this.tournaments.update(ts => ts.map(t => t.id === tournament.id ? { ...t, ...res.data, is_registered: true } : t));
      },
      error: (err: any) => this.error.set(err.error?.message ?? 'Registration failed.'),
    });
  }

  generateBracket(tournament: any, e: MouseEvent): void {
    e.stopPropagation();
    this.generating.set(tournament.id);
    this.api.generateBracket(tournament.id).subscribe({
      next: () => { this.load(); this.generating.set(null); },
      error: (err: any) => { this.error.set(err.error?.message ?? 'Failed.'); this.generating.set(null); },
    });
  }

  createTournament(): void {
    this.creating.set(true);
    this.createError.set(null);
    this.api.createTournament(this.newT).subscribe({
      next: () => { this.showCreate = false; this.creating.set(false); this.load(); },
      error: (err: any) => { this.createError.set(err.error?.message ?? 'Failed to create.'); this.creating.set(false); },
    });
  }

  private load(): void {
    this.loading.set(true);
    this.api.getTournaments().subscribe({
      next: (res: any) => { this.tournaments.set(res.data ?? []); this.loading.set(false); },
      error: () => { this.error.set('Failed to load tournaments.'); this.loading.set(false); },
    });
  }
}
