/**
 * Phase 5 — join management panel (moderators+). A slide-in panel to:
 *   - set the community join policy (open / request / closed)
 *   - generate, copy, and revoke invite links
 *   - review and approve/deny pending join requests
 *
 * Self-contained: it calls CommunityService directly and holds its own local
 * state (invites / requests / policy), refreshing after each action.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../../services/community.service';
import { CommunityInvite, JoinPolicy, JoinRequest } from '../../models/community.model';

@Component({
  selector: 'app-join-panel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class.overlay]="!embedded" (click)="onBackdrop($event)">
      <aside [class.panel]="!embedded" [class.embedded-body]="embedded">
        <header class="ph" *ngIf="!embedded">
          <span class="title">Join settings</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <div class="body" [class.flush]="embedded">
          <!-- Policy -->
          <section class="block">
            <h4>Who can join</h4>
            <div class="policy">
              <button
                *ngFor="let p of policies"
                class="pol"
                [class.active]="policy() === p.key"
                (click)="setPolicy(p.key)"
              >
                <span class="pol-name">{{ p.label }}</span>
                <span class="pol-desc">{{ p.desc }}</span>
              </button>
            </div>
          </section>

          <!-- Invites -->
          <section class="block">
            <div class="block-head">
              <h4>Invite links</h4>
              <button class="mini" (click)="generate()" [disabled]="generating()">+ New link</button>
            </div>
            <p class="hint" *ngIf="invites().length === 0 && !loadingInvites()">No invite links yet.</p>
            <div class="invite" *ngFor="let inv of invites()">
              <div class="inv-main">
                <code class="link">{{ linkFor(inv.token) }}</code>
                <div class="inv-meta">
                  <span [class.dead]="!inv.is_usable">
                    {{ inv.is_revoked ? 'revoked' : (inv.is_usable ? 'active' : 'expired') }}
                  </span>
                  <span>· {{ inv.uses }}<ng-container *ngIf="inv.max_uses">/{{ inv.max_uses }}</ng-container> used</span>
                </div>
              </div>
              <div class="inv-actions">
                <button class="mini" (click)="copy(inv.token)">{{ copiedToken() === inv.token ? 'Copied!' : 'Copy' }}</button>
                <button class="mini danger" *ngIf="!inv.is_revoked" (click)="revoke(inv.id)">Revoke</button>
              </div>
            </div>
          </section>

          <!-- Requests -->
          <section class="block" *ngIf="policy() === 'request'">
            <h4>Pending requests <span class="count" *ngIf="requests().length">({{ requests().length }})</span></h4>
            <p class="hint" *ngIf="requests().length === 0 && !loadingRequests()">No pending requests.</p>
            <div class="req" *ngFor="let r of requests()">
              <div class="req-user">
                <img *ngIf="r.user.avatar" [src]="r.user.avatar" alt="" class="ava" />
                <span *ngIf="!r.user.avatar" class="ava letter">{{ (r.user.nickname ?? '?').charAt(0) }}</span>
                <div class="req-info">
                  <span class="req-name">{{ r.user.nickname ?? 'Unknown' }}</span>
                  <span class="req-msg" *ngIf="r.message">{{ r.message }}</span>
                </div>
              </div>
              <div class="req-actions">
                <button class="mini ok" (click)="approve(r.id)">Approve</button>
                <button class="mini danger" (click)="deny(r.id)">Deny</button>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --bg: #0b0a14; --surface: #161228; --raised: #1c1833; --line: rgba(124,58,237,0.15); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 950; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 460px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; animation: slide 0.18s ease-out; }
    @keyframes slide {
      0%   { transform: translateX(40px); opacity: 0; }
      60%  { transform: translateX(-6px); opacity: 1; }
      80%  { transform: translateX(3px); }
      100% { transform: translateX(0); }
    }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .body { flex: 1; overflow-y: auto; padding: 1rem 1.1rem 2rem; min-height: 0; }
    .embedded-body { display: block; width: 100%; }
    .body.flush { padding: 0.5rem 0 1rem; }
    .block { margin-bottom: 1.6rem; }
    .block-head { display: flex; align-items: center; justify-content: space-between; }
    h4 { margin: 0 0 0.6rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mut); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .count { color: var(--accent); }
    .hint { color: var(--mut); font-size: 0.85rem; margin: 0.2rem 0; }
    .policy { display: flex; flex-direction: column; gap: 0.4rem; }
    .pol { text-align: left; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 0.6rem 0.8rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.15rem; transition: border-color 0.12s ease; }
    .pol:hover { border-color: rgba(124,58,237,0.45); }
    .pol.active { border-color: var(--accent); background: rgba(124,58,237,0.1); }
    .pol-name { font-weight: 700; color: var(--text); }
    .pol-desc { font-size: 0.78rem; color: var(--mut); }
    .invite { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 0.6rem 0.75rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
    .inv-main { min-width: 0; flex: 1; }
    .link { display: block; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.74rem; color: #b8b8c8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .inv-meta { font-size: 0.72rem; color: var(--mut); margin-top: 0.2rem; display: flex; gap: 0.3rem; }
    .inv-meta .dead { color: #ff6b6b; }
    .inv-actions, .req-actions { display: flex; gap: 0.35rem; flex-shrink: 0; }
    .mini { background: var(--raised); border: 1px solid var(--line); color: #cfcfe0; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.74rem; cursor: pointer; white-space: nowrap; }
    .mini:hover { border-color: var(--accent); color: var(--accent-s); }
    .mini:disabled { opacity: 0.5; cursor: not-allowed; }
    .mini.ok:hover { border-color: var(--accent); color: var(--accent-s); }
    .mini.danger:hover { border-color: #ff6b6b; color: #ff6b6b; }
    .req { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 0.6rem 0.75rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
    .req-user { display: flex; align-items: center; gap: 0.6rem; min-width: 0; }
    .ava { width: 34px; height: 34px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
    .ava.letter { display: grid; place-items: center; background: var(--raised); color: var(--accent-s); font-family: 'Anton', sans-serif; }
    .req-info { display: flex; flex-direction: column; min-width: 0; }
    .req-name { font-weight: 600; color: var(--text); }
    .req-msg { font-size: 0.78rem; color: var(--mut); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  `],
})
export class JoinPanelComponent implements OnInit {
  @Input({ required: true }) communityId!: string;
  @Input() initialPolicy: JoinPolicy = 'closed';
  @Input() embedded = false;
  @Output() close = new EventEmitter<void>();
  @Output() policyChanged = new EventEmitter<JoinPolicy>();

  private readonly api = inject(CommunityService);

  readonly policy          = signal<JoinPolicy>('closed');
  readonly invites         = signal<CommunityInvite[]>([]);
  readonly requests        = signal<JoinRequest[]>([]);
  readonly loadingInvites  = signal(false);
  readonly loadingRequests = signal(false);
  readonly generating      = signal(false);
  readonly copiedToken     = signal<string | null>(null);

  readonly policies: { key: JoinPolicy; label: string; desc: string }[] = [
    { key: 'open',    label: 'Open',          desc: 'Anyone with an invite link joins instantly.' },
    { key: 'request', label: 'Request to join', desc: 'People request; a moderator approves them.' },
    { key: 'closed',  label: 'Invite-only',   desc: 'Only people with a valid invite link can join.' },
  ];

  ngOnInit(): void {
    this.policy.set(this.initialPolicy);
    this.refreshInvites();
    if (this.policy() === 'request') this.refreshRequests();
  }

  private refreshInvites(): void {
    this.loadingInvites.set(true);
    this.api.listInvites(this.communityId).subscribe({
      next: list => { this.invites.set(list); this.loadingInvites.set(false); },
      error: () => this.loadingInvites.set(false),
    });
  }

  private refreshRequests(): void {
    this.loadingRequests.set(true);
    this.api.listJoinRequests(this.communityId).subscribe({
      next: list => { this.requests.set(list); this.loadingRequests.set(false); },
      error: () => this.loadingRequests.set(false),
    });
  }

  setPolicy(p: JoinPolicy): void {
    if (p === this.policy()) return;
    this.api.setJoinPolicy(this.communityId, p).subscribe(saved => {
      this.policy.set(saved);
      this.policyChanged.emit(saved);
      if (saved === 'request') this.refreshRequests();
    });
  }

  generate(): void {
    this.generating.set(true);
    this.api.createInvite(this.communityId, {}).subscribe({
      next: inv => { this.invites.update(list => [inv, ...list]); this.generating.set(false); },
      error: () => this.generating.set(false),
    });
  }

  revoke(inviteId: string): void {
    this.api.revokeInvite(inviteId).subscribe(() => this.refreshInvites());
  }

  approve(requestId: string): void {
    this.api.approveRequest(requestId).subscribe(() => {
      this.requests.update(list => list.filter(r => r.id !== requestId));
    });
  }

  deny(requestId: string): void {
    this.api.denyRequest(requestId).subscribe(() => {
      this.requests.update(list => list.filter(r => r.id !== requestId));
    });
  }

  linkFor(token: string): string {
    return `${window.location.origin}/community/join/${token}`;
  }

  copy(token: string): void {
    const link = this.linkFor(token);
    navigator.clipboard?.writeText(link).then(() => {
      this.copiedToken.set(token);
      setTimeout(() => this.copiedToken.set(null), 1500);
    });
  }

  onBackdrop(e: MouseEvent): void {
    if (this.embedded) return;
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this.close.emit();
    }
  }
}
