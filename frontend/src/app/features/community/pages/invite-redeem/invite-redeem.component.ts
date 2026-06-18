/**
 * Phase 5 — invite redemption page. Reached at /community/join/:token.
 * Redeems the token on load and shows the outcome:
 *   joined / member → routes into the community
 *   requested       → shows a "request sent" confirmation
 *   error           → shows the failure message
 */
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommunityService } from '../../services/community.service';
import { JoinResult } from '../../models/community.model';

@Component({
  selector: 'app-invite-redeem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <div class="card">
        <div class="logo">داوري</div>

        <ng-container [ngSwitch]="state()">
          <div *ngSwitchCase="'loading'" class="msg">
            <div class="spinner"></div>
            <p>Checking your invite…</p>
          </div>

          <div *ngSwitchCase="'requested'" class="msg">
            <div class="icon ok">✓</div>
            <h2>Request sent</h2>
            <p>Your request to join has been sent to the moderators. You'll be added once it's approved.</p>
            <a routerLink="/community" class="btn">Back to communities</a>
          </div>

          <div *ngSwitchCase="'error'" class="msg">
            <div class="icon bad">!</div>
            <h2>Invite unavailable</h2>
            <p>{{ error() }}</p>
            <a routerLink="/community" class="btn">Back to communities</a>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --gold: #d4af37; --bg: #0b0a14; --surface: #161228; --line: rgba(124,58,237,0.18); --text: #eaeaf2; --mut: #8a8a9e; }
    .wrap { min-height: 100vh; display: grid; place-items: center; background: var(--bg); padding: 1.5rem; }
    .card { width: 100%; max-width: 420px; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 2.2rem 1.8rem; text-align: center; box-shadow: 0 0 40px rgba(124,58,237,0.12); }
    .logo { font-family: 'Noto Sans Arabic', 'Anton', sans-serif; font-size: 2rem; color: var(--gold); margin-bottom: 1.4rem; }
    .msg { display: flex; flex-direction: column; align-items: center; gap: 0.7rem; }
    h2 { margin: 0; color: var(--text); font-family: 'Anton', 'Bebas Neue', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; }
    p { margin: 0; color: var(--mut); font-size: 0.92rem; line-height: 1.5; }
    .icon { width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; font-size: 1.6rem; font-weight: 700; }
    .icon.ok { background: rgba(124,58,237,0.18); color: var(--accent-s); }
    .icon.bad { background: rgba(255,107,107,0.15); color: #ff6b6b; }
    .btn { margin-top: 0.6rem; display: inline-block; background: var(--accent); color: #fff; text-decoration: none; padding: 0.55rem 1.2rem; border-radius: 8px; font-weight: 700; transition: background 0.14s, box-shadow 0.14s; }
    .btn:hover { background: #6d28d9; box-shadow: 0 0 14px rgba(124,58,237,0.4); }
    .spinner { width: 36px; height: 36px; border: 3px solid var(--line); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class InviteRedeemComponent implements OnInit {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api    = inject(CommunityService);

  readonly state = signal<'loading' | 'requested' | 'error'>('loading');
  readonly error = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.state.set('error');
      this.error.set('No invite token provided.');
      return;
    }

    this.api.redeemInvite(token).subscribe({
      next: res => this.handle(res.result, res.community_slug),
      error: err => {
        this.state.set('error');
        this.error.set(err?.error?.message ?? 'This invite link is invalid or has expired.');
      },
    });
  }

  private handle(result: JoinResult, slug: string): void {
    if (result === 'joined' || result === 'member') {
      // Straight into the community.
      this.router.navigate(['/community', slug]);
      return;
    }
    // requested
    this.state.set('requested');
  }
}
