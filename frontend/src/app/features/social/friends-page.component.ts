import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FriendService, FriendUser } from '../../core/services/friend.service';
import { DmService } from './dm.service';
import { ChallengeUiService } from './challenge-ui.service';
import { ToastService } from '../../core/services/toast.service';

type Tab = 'friends' | 'requests' | 'sent';

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="fr-page">
  <header class="fr-head">
    <div>
      <div class="fr-eyebrow">Social</div>
      <h1 class="fr-title">Friends</h1>
    </div>
    <a routerLink="/community" class="fr-link">Back to Community →</a>
  </header>

  <div class="fr-tabs" role="tablist">
    <button role="tab" [class.active]="tab() === 'friends'"  (click)="tab.set('friends')">
      Friends <span class="fr-count">{{ fs.friends().length }}</span>
    </button>
    <button role="tab" [class.active]="tab() === 'requests'" (click)="tab.set('requests')">
      Requests
      @if (fs.requestCount() > 0) { <span class="fr-count fr-count--alert">{{ fs.requestCount() }}</span> }
    </button>
    <button role="tab" [class.active]="tab() === 'sent'"     (click)="tab.set('sent')">
      Sent <span class="fr-count">{{ fs.sent().length }}</span>
    </button>
  </div>

  @if (fs.loading() && !fs.loaded()) {
    <div class="fr-grid">
      @for (i of [1,2,3,4,5,6]; track i) { <div class="fr-skel"></div> }
    </div>
  } @else {

    <!-- ── Friends ── -->
    @if (tab() === 'friends') {
      @if (fs.friends().length === 0) {
        <div class="fr-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <h3>No friends yet</h3>
          <p>Open a community and add members as friends to start chatting and challenging them.</p>
          <a routerLink="/community" class="fr-btn fr-btn--primary">Browse communities</a>
        </div>
      } @else {
        <div class="fr-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search friends" [value]="query()" (input)="query.set($any($event.target).value)" />
        </div>
        @if (filteredFriends().length === 0) {
          <p class="fr-none">No friends match "{{ query() }}".</p>
        } @else {
          <div class="fr-list">
            @for (f of filteredFriends(); track f.id) {
              <div class="fr-row">
                <span class="fr-ava fr-ava--sm">
                  <span class="fr-dot fr-dot--corner" [class]="'fr-dot--' + fs.presenceOf(f.id)" [title]="fs.presenceOf(f.id)"></span>
                  @if (f.avatar_url) { <img [src]="f.avatar_url" [alt]="f.display_name"/> }
                  @else { <span class="fr-ava-letter">{{ (f.display_name || '?').charAt(0) }}</span> }
                </span>
                <div class="fr-info">
                  <div class="fr-name">{{ f.display_name }}</div>
                  <div class="fr-sub">
                    <span class="fr-pres fr-pres--{{ fs.presenceOf(f.id) }}">{{ fs.presenceOf(f.id) }}</span>
                    @if (f.nickname) { · {{ '@' + f.nickname }} }
                  </div>
                </div>
                <div class="fr-actions">
                  <button class="fr-icon fr-icon--challenge" title="Challenge to a match" (click)="challenge(f)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  </button>
                  <button class="fr-icon fr-icon--msg" title="Message" (click)="message(f)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </button>
                  <button class="fr-icon" title="Remove friend" (click)="remove(f)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      }
    }

    <!-- ── Incoming requests ── -->
    @if (tab() === 'requests') {
      @if (fs.requests().length === 0) {
        <div class="fr-empty">
          <h3>No pending requests</h3>
          <p>When someone adds you, their request shows up here.</p>
        </div>
      } @else {
        <div class="fr-list">
          @for (r of fs.requests(); track r.friendship_id) {
            <div class="fr-row">
              <span class="fr-ava">
                @if (r.user.avatar_url) { <img [src]="r.user.avatar_url" [alt]="r.user.display_name"/> }
                @else { <span class="fr-ava-letter">{{ (r.user.display_name || '?').charAt(0) }}</span> }
              </span>
              <div class="fr-info">
                <div class="fr-name">{{ r.user.display_name }}</div>
                <div class="fr-sub">wants to be friends</div>
              </div>
              <div class="fr-actions">
                <button class="fr-btn fr-btn--ghost" [disabled]="busy().has(r.friendship_id)" (click)="decline(r)">Decline</button>
                <button class="fr-btn fr-btn--primary" [disabled]="busy().has(r.friendship_id)" (click)="accept(r)">Accept</button>
              </div>
            </div>
          }
        </div>
      }
    }

    <!-- ── Sent requests ── -->
    @if (tab() === 'sent') {
      @if (fs.sent().length === 0) {
        <div class="fr-empty">
          <h3>No sent requests</h3>
          <p>Requests you send that are still pending will appear here.</p>
        </div>
      } @else {
        <div class="fr-list">
          @for (r of fs.sent(); track r.friendship_id) {
            <div class="fr-row">
              <span class="fr-ava">
                @if (r.user.avatar_url) { <img [src]="r.user.avatar_url" [alt]="r.user.display_name"/> }
                @else { <span class="fr-ava-letter">{{ (r.user.display_name || '?').charAt(0) }}</span> }
              </span>
              <div class="fr-info">
                <div class="fr-name">{{ r.user.display_name }}</div>
                <div class="fr-sub">request pending…</div>
              </div>
              <div class="fr-actions">
                <button class="fr-btn fr-btn--ghost" [disabled]="busy().has(r.user.id)" (click)="cancel(r.user)">Cancel</button>
              </div>
            </div>
          }
        </div>
      }
    }
  }
</div>
  `,
  styles: [`
    :host { display:block; }
    .fr-page { max-width: 680px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; color: var(--text, #ececf1); }
    .fr-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom: 1.1rem; flex-wrap:wrap; }
    .fr-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .fr-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }
    .fr-link { font-family: var(--fm, monospace); font-size: 12px; color: var(--mu, #8a8aa0); text-decoration:none; &:hover { color: var(--text); } }

    .fr-tabs {
      display:inline-flex; gap:2px; padding:3px; margin-bottom:1.1rem;
      background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:10px;
    }
    .fr-tabs button {
      display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:7px;
      background: transparent; border:none; color: var(--mu, #8a8aa0);
      font-family: var(--fb, sans-serif); font-weight: 600; font-size: 13px; cursor: pointer;
      transition: background .15s, color .15s;
    }
    .fr-tabs button:hover { color: var(--text); }
    .fr-tabs button.active { background: var(--bg3, #181826); color: var(--text); }

    .fr-search { display:flex; align-items:center; gap:8px; padding: 9px 12px; margin-bottom: 10px;
      background: var(--bg2, #10101c); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 10px; }
    .fr-search svg { color: var(--mu, #8a8aa0); flex-shrink:0; }
    .fr-search input { flex:1; background:transparent; border:none; outline:none; color: var(--text); font-size: 14px; font-family: var(--fb, sans-serif);
      &::placeholder { color: var(--mu, #8a8aa0); } }
    .fr-none { color: var(--mu, #8a8aa0); padding: 16px 4px; font-size: 14px; }
    .fr-pres { text-transform: capitalize; }
    .fr-pres--online { color: #4ade80; }
    .fr-pres--idle   { color: var(--accent, #d4af37); }
    .fr-pres--offline{ color: var(--mu, #8a8aa0); }
    .fr-count { font-family: var(--fm, monospace); font-size: 11px; padding: 1px 7px; border-radius: 100px; background: rgba(255,255,255,.08); color: var(--mu); }
    .fr-count--alert { background: var(--primary, #006c35); color: #fff; }

    .fr-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
    .fr-card {
      display:flex; align-items:center; gap: 10px; padding: 12px; position:relative;
      background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 12px;
      transition: border-color .15s, transform .15s;
    }
    .fr-card:hover { border-color: var(--br2, rgba(255,255,255,.14)); transform: translateY(-2px); }

    .fr-list { display:flex; flex-direction:column; gap: 4px; }
    .fr-row {
      display:flex; align-items:center; gap: 11px; padding: 8px 10px;
      border-radius: 10px; transition: background .12s;
    }
    .fr-row:hover { background: var(--bg2, #10101c); }

    .fr-ava { width: 40px; height: 40px; border-radius: 50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; position:relative;
      background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .fr-ava--sm { width: 38px; height: 38px; }
    .fr-ava img { width:100%; height:100%; object-fit:cover; }
    .fr-ava-letter { font-family: var(--fh, sans-serif); font-size: 17px; color:#fff; }
    .fr-dot { position:absolute; top: 10px; left: 10px; width: 9px; height: 9px; border-radius: 50%; border: 2px solid var(--bg2, #10101c); }
    .fr-dot--corner { top: auto; left: auto; bottom: -1px; right: -1px; width: 11px; height: 11px; border-color: var(--bg, #0a0a12); }
    .fr-dot--online { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
    .fr-dot--idle   { background: var(--accent, #d4af37); }
    .fr-dot--offline{ background: #4b5563; }

    .fr-info { flex:1; min-width:0; }
    .fr-name { font-weight: 700; font-size: 14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .fr-sub  { font-size: 12px; color: var(--mu, #8a8aa0); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

    .fr-actions { display:flex; gap: 6px; flex-shrink:0; }
    .fr-btn {
      padding: 8px 14px; border-radius: 8px; font-family: var(--fb, sans-serif); font-weight: 700; font-size: 13px; cursor: pointer;
      border: 1px solid transparent; transition: background .15s, border-color .15s, color .15s;
      &:disabled { opacity:.5; cursor:not-allowed; }
    }
    .fr-btn--primary { background: var(--primary, #006c35); color:#fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .fr-btn--ghost { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(255,255,255,.05); } }
    .fr-icon {
      width: 34px; height: 34px; border-radius: 8px; display:grid; place-items:center; cursor:pointer;
      background: transparent; border: 1px solid var(--br2, rgba(255,255,255,.14)); color: var(--mu, #8a8aa0);
      transition: color .15s, border-color .15s, background .15s;
      &:hover { color: #fca5a5; border-color: rgba(239,68,68,.4); background: rgba(239,68,68,.08); }
    }
    .fr-icon--msg:hover { color: #4ade80 !important; border-color: rgba(0,108,53,.5) !important; background: rgba(0,108,53,.12) !important; }
    .fr-icon--challenge:hover { color: var(--accent, #d4af37) !important; border-color: rgba(212,175,55,.5) !important; background: rgba(212,175,55,.12) !important; }

    .fr-empty { text-align:center; padding: 60px 20px; color: var(--mu, #8a8aa0);
      svg { color: var(--dim, #55556e); margin-bottom: 12px; }
      h3 { color: var(--text); margin: 0 0 8px; font-family: var(--fh, sans-serif); letter-spacing:.5px; }
      p { margin: 0 auto 18px; max-width: 42ch; line-height: 1.5; }
    }
    .fr-skel { height: 64px; border-radius: 12px; background: rgba(255,255,255,.05); animation: frPulse 1.5s ease-in-out infinite; }
    @keyframes frPulse { 0%,100%{opacity:.5} 50%{opacity:1} }

    @media (prefers-reduced-motion: reduce) { .fr-card, .fr-skel { transition:none; animation:none; } }
  `],
})
export class FriendsPageComponent implements OnInit {
  readonly fs = inject(FriendService);
  private dm = inject(DmService);
  private challengeUi = inject(ChallengeUiService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly tab   = signal<Tab>('friends');
  readonly busy  = signal<Set<string>>(new Set());
  readonly query = signal('');

  /** Friends filtered by the search box. */
  readonly filteredFriends = computed(() => {
    const q = this.query().toLowerCase().trim();
    const list = this.fs.friends();
    if (!q) return list;
    return list.filter(f =>
      (f.display_name ?? '').toLowerCase().includes(q) ||
      (f.nickname ?? '').toLowerCase().includes(q));
  });

  ngOnInit(): void {
    this.fs.load();
    const t = new URLSearchParams(location.search).get('tab');
    if (t === 'requests' || t === 'sent') this.tab.set(t);
  }

  private mark(id: string, on: boolean): void {
    this.busy.update(s => { const n = new Set(s); on ? n.add(id) : n.delete(id); return n; });
  }

  accept(r: { friendship_id: string; user: FriendUser }): void {
    this.mark(r.friendship_id, true);
    this.fs.accept(r as any).subscribe({
      next: () => { this.toast.success(`You and ${r.user.display_name} are now friends.`); this.mark(r.friendship_id, false); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed to accept.'); this.mark(r.friendship_id, false); },
    });
  }

  decline(r: { friendship_id: string }): void {
    this.mark(r.friendship_id, true);
    this.fs.decline(r as any).subscribe({
      next: () => this.mark(r.friendship_id, false),
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(r.friendship_id, false); },
    });
  }

  cancel(user: FriendUser): void {
    this.mark(user.id, true);
    this.fs.remove(user.id).subscribe({
      next: () => this.mark(user.id, false),
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(user.id, false); },
    });
  }

  remove(user: FriendUser): void {
    this.fs.remove(user.id).subscribe({
      next: () => this.toast.info(`Removed ${user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Failed.'),
    });
  }

  message(user: FriendUser): void {
    this.dm.openWith(user).subscribe({
      next: () => this.router.navigate(['/community/home'], { queryParams: { pane: 'messages' } }),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not open chat.'),
    });
  }

  challenge(user: FriendUser): void {
    this.challengeUi.open(user);
  }
}
