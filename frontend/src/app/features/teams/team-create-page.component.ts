import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeamService } from './team.service';
import { GAME_LABELS } from '../profile/player-profile.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-team-create-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="tc-shell">
  <header class="tc-head">
    <div>
      <div class="tc-eyebrow">Compete</div>
      <h1 class="tc-title">Create Team</h1>
    </div>
    <a routerLink="/teams" class="tc-link">← Back to teams</a>
  </header>

  <form class="tc-card" (ngSubmit)="submit()">
    <div class="tc-row">
      <label class="tc-f"><span>Team name <em>*</em></span>
        <input [(ngModel)]="form.name" name="name" maxlength="100" required placeholder="e.g. Riyadh Vipers"/>
      </label>
      <label class="tc-f"><span>Tag</span>
        <input [(ngModel)]="form.tag" name="tag" maxlength="10" placeholder="e.g. RVP"/>
      </label>
    </div>

    <span class="tc-l">Primary game <em>*</em></span>
    <div class="tc-games">
      @for (g of games; track g.value) {
        <button type="button" class="tc-game" [class.active]="form.game === g.value" (click)="form.game = g.value">{{ g.label }}</button>
      }
    </div>

    <div class="tc-row">
      <label class="tc-f"><span>Region</span>
        <input [(ngModel)]="form.region" name="region" maxlength="80" placeholder="e.g. KSA, GCC, MENA"/>
      </label>
      <label class="tc-f"><span>Logo URL</span>
        <input [(ngModel)]="form.logo_url" name="logo_url" type="url" maxlength="500" placeholder="https://"/>
      </label>
    </div>

    <label class="tc-f"><span>Description</span>
      <textarea [(ngModel)]="form.description" name="description" rows="3" maxlength="500" placeholder="Who you are, what you play, what you're looking for."></textarea>
    </label>

    <div class="tc-actions">
      <a routerLink="/teams" class="tc-btn tc-btn--ghost">Cancel</a>
      <button type="submit" class="tc-btn tc-btn--primary" [disabled]="submitting() || !canSubmit()">
        {{ submitting() ? 'Creating…' : 'Create team' }}
      </button>
    </div>
  </form>
</div>
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .tc-shell { max-width: 760px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
    .tc-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom: 1.1rem; flex-wrap:wrap; }
    .tc-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .tc-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }
    .tc-link { font-family: var(--fm, monospace); font-size: 12px; color: var(--mu, #8a8aa0); text-decoration: none; &:hover { color: var(--text); } }

    .tc-card { background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:14px; padding: 20px 22px; display:flex; flex-direction:column; gap: 14px; }
    .tc-row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
    @media (max-width: 540px) { .tc-row { grid-template-columns: 1fr; } }
    .tc-l { font-family: var(--fm, monospace); font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color: var(--mu, #8a8aa0); em { color: #fca5a5; font-style: normal; } }
    .tc-f { display:flex; flex-direction:column; gap:6px;
      span { font-family: var(--fm, monospace); font-size: 10px; letter-spacing:1.3px; text-transform: uppercase; color: var(--mu, #8a8aa0); em { color: #fca5a5; font-style: normal; } }
      input, textarea { background: var(--bg3, #181826); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 13px; outline: none; font-family: inherit; &:focus { border-color: var(--primary, #006c35); } }
      textarea { resize: vertical; } }

    .tc-games { display:flex; gap:8px; flex-wrap:wrap; }
    .tc-game { padding:8px 12px; border-radius:8px; cursor:pointer; font-size: 12.5px; font-weight:600; background: var(--bg3, #181826); border:1px solid var(--br, rgba(255,255,255,.08)); color: var(--text);
      &:hover { border-color: var(--br2, rgba(255,255,255,.14)); }
      &.active { border-color: var(--primary, #006c35); background: rgba(0,108,53,.14); color: #4ade80; font-weight: 700; } }

    .tc-actions { display:flex; gap: 10px; justify-content:flex-end; }
    .tc-btn { padding: 10px 20px; border-radius: 10px; border: 1px solid transparent; font-weight: 700; font-size: 14px; cursor: pointer; text-decoration:none; display:inline-flex; align-items:center; &:disabled { opacity:.5; cursor:not-allowed; } }
    .tc-btn--primary { background: var(--primary, #006c35); color:#fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .tc-btn--ghost   { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(255,255,255,.05); } }
  `],
})
export class TeamCreatePageComponent {
  private svc = inject(TeamService);
  private toast = inject(ToastService);
  private router = inject(Router);

  readonly games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));
  readonly submitting = signal(false);
  form = { name: '', tag: '', game: 'ea_fc25', region: '', description: '', logo_url: '' };

  canSubmit(): boolean { return this.form.name.trim().length >= 2 && !!this.form.game; }

  submit(): void {
    if (!this.canSubmit() || this.submitting()) return;
    this.submitting.set(true);
    this.svc.create({
      name: this.form.name.trim(),
      tag: this.form.tag.trim() || null,
      game: this.form.game,
      region: this.form.region.trim() || null,
      description: this.form.description.trim() || null,
      logo_url: this.form.logo_url.trim() || null,
    }).subscribe({
      next: (r) => {
        this.submitting.set(false);
        this.toast.success(`Team ${r.data.name} created.`);
        this.router.navigate(['/teams', r.data.slug]);
      },
      error: (e) => {
        const msg = e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? 'Could not create team.';
        this.toast.error(msg); this.submitting.set(false);
      },
    });
  }
}
