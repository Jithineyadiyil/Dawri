import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeService, CHALLENGE_GAMES } from './challenge.service';
import { ChallengeUiService } from './challenge-ui.service';
import { ToastService } from '../../core/services/toast.service';

/**
 * ChallengeCreateComponent — global modal to challenge a friend.
 * Visible whenever ChallengeUiService.createFor() is set.
 */
@Component({
  selector: 'app-challenge-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (ui.createFor(); as u) {
      <div class="cc-overlay" (click)="close()">
        <div class="cc-modal" (click)="$event.stopPropagation()">
          <header class="cc-head">
            <div class="cc-who">
              <span class="cc-ava">
                @if (u.avatar_url) { <img [src]="u.avatar_url" [alt]="u.display_name"/> }
                @else { <span class="cc-ava-letter">{{ (u.display_name || '?').charAt(0) }}</span> }
              </span>
              <div>
                <div class="cc-title">Challenge {{ u.display_name }}</div>
                <div class="cc-sub">Friendly 1v1 — pick a game</div>
              </div>
            </div>
            <button class="cc-x" (click)="close()" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </header>

          <div class="cc-body">
            <span class="cc-label">Game</span>
            <div class="cc-games">
              @for (g of games; track g.value) {
                <button type="button" class="cc-game" [class.active]="game() === g.value" (click)="game.set(g.value)">{{ g.label }}</button>
              }
            </div>

            <span class="cc-label">Message (optional)</span>
            <textarea class="cc-input" rows="2" maxlength="500" [(ngModel)]="message" placeholder="Trash talk, time, or rules…"></textarea>
          </div>

          <footer class="cc-foot">
            <button class="cc-btn cc-btn--ghost" (click)="close()">Cancel</button>
            <button class="cc-btn cc-btn--primary" [disabled]="sending()" (click)="submit(u)">
              {{ sending() ? 'Sending…' : 'Send challenge' }}
            </button>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [`
    .cc-overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,.7); backdrop-filter:blur(4px); display:grid; place-items:center; padding:20px; }
    .cc-modal { width:100%; max-width:440px; background: var(--bg2, #10101c); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius:16px; overflow:hidden;
      animation: ccIn .22s cubic-bezier(.22,1,.36,1) both; }
    @keyframes ccIn { from { opacity:0; transform: translateY(10px) scale(.97); } to { opacity:1; transform:none; } }
    .cc-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:18px 20px; border-bottom:1px solid var(--br, rgba(255,255,255,.08)); }
    .cc-who { display:flex; align-items:center; gap:12px; }
    .cc-ava { width:44px; height:44px; border-radius:50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .cc-ava img { width:100%; height:100%; object-fit:cover; } .cc-ava-letter { font-family: var(--fh, sans-serif); font-size:18px; color:#fff; }
    .cc-title { font-weight:800; font-size:16px; color: var(--text, #ececf1); }
    .cc-sub { font-size:12px; color: var(--mu, #8a8aa0); margin-top:2px; }
    .cc-x { background:none; border:none; color: var(--mu, #8a8aa0); cursor:pointer; padding:6px; border-radius:6px; &:hover { color: var(--text); background: rgba(255,255,255,.06); } }
    .cc-body { padding:18px 20px; display:flex; flex-direction:column; }
    .cc-label { font-family: var(--fm, monospace); font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color: var(--mu, #8a8aa0); margin-bottom:8px; }
    .cc-games { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
    .cc-game { padding:9px 14px; border-radius:9px; cursor:pointer; font-size:13px; font-weight:600;
      background: var(--bg3, #181826); border:1px solid var(--br, rgba(255,255,255,.08)); color: var(--text, #ececf1); transition: border-color .15s, background .15s, color .15s; }
    .cc-game:hover { border-color: var(--br2, rgba(255,255,255,.14)); }
    .cc-game.active { background: rgba(0,108,53,.16); border-color: var(--primary, #006c35); color: #4ade80; }
    .cc-input { background: var(--bg3, #181826); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius:10px; padding:10px 12px; color: var(--text); font-family: var(--fb, sans-serif); font-size:14px; outline:none; resize:vertical;
      &:focus { border-color: var(--primary, #006c35); } }
    .cc-foot { display:flex; justify-content:flex-end; gap:10px; padding:14px 20px; border-top:1px solid var(--br, rgba(255,255,255,.08)); }
    .cc-btn { padding:10px 18px; border-radius:9px; font-weight:700; font-size:14px; cursor:pointer; border:1px solid transparent;
      &:disabled { opacity:.5; cursor:not-allowed; } }
    .cc-btn--primary { background: var(--primary, #006c35); color:#fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .cc-btn--ghost { background:transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover { background: rgba(255,255,255,.05); } }
    @media (prefers-reduced-motion: reduce) { .cc-modal { animation:none; } }
  `],
})
export class ChallengeCreateComponent {
  readonly ui = inject(ChallengeUiService);
  private challenges = inject(ChallengeService);
  private toast = inject(ToastService);

  readonly games = CHALLENGE_GAMES;
  readonly game  = signal<string>(CHALLENGE_GAMES[0].value);
  readonly sending = signal(false);
  message = '';

  close(): void { this.ui.close(); this.message = ''; this.game.set(CHALLENGE_GAMES[0].value); }

  submit(u: { id: string; display_name: string }): void {
    if (this.sending()) return;
    this.sending.set(true);
    this.challenges.create(u.id, this.game(), this.message.trim()).subscribe({
      next: () => { this.sending.set(false); this.toast.success(`Challenge sent to ${u.display_name}.`); this.close(); },
      error: (e) => { this.sending.set(false); this.toast.error(e?.error?.message ?? 'Could not send challenge.'); },
    });
  }
}
