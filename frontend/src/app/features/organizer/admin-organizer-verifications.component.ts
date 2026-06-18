import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizerRequest, OrganizerVerificationService } from './organizer-verification.service';
import { TierBadgeComponent } from './tier-badge.component';
import { ToastService } from '../../core/services/toast.service';

type Filter = 'pending' | 'approved' | 'rejected' | 'all';

/**
 * /admin/organizer-verifications — review and approve/reject organizer
 * verification requests.
 */
@Component({
  selector: 'app-admin-organizer-verifications',
  standalone: true,
  imports: [CommonModule, FormsModule, TierBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="aov-shell">
  <header class="aov-head">
    <div>
      <div class="aov-eyebrow">Admin</div>
      <h1 class="aov-title">Organizer Verifications</h1>
    </div>
  </header>

  <div class="aov-tabs">
    @for (f of filters; track f.value) {
      <button [class.active]="filter() === f.value" (click)="setFilter(f.value)">{{ f.label }}</button>
    }
  </div>

  @if (loading()) {
    @for (i of [1,2,3]; track i) { <div class="aov-skel"></div> }
  } @else if (rows().length === 0) {
    <div class="aov-empty"><h3>No {{ filter() === 'all' ? '' : filter() }} requests</h3></div>
  } @else {
    <div class="aov-list">
      @for (r of rows(); track r.id) {
        <article class="aov-card" [class.aov-card--decided]="r.status !== 'pending'">
          <header class="aov-card__head">
            <div class="aov-who">
              @if (r.user?.avatar_url) { <img class="aov-ava" [src]="r.user!.avatar_url!" alt=""/> }
              @else { <span class="aov-ava aov-ava--letter">{{ (r.user?.display_name ?? '?').charAt(0) }}</span> }
              <div>
                <div class="aov-name">{{ r.user?.display_name ?? '—' }}</div>
                <div class="aov-current">
                  Currently: <app-tier-badge [tier]="r.user?.organizer_tier ?? 'none'" />
                </div>
              </div>
            </div>
            <div class="aov-req">
              <span class="aov-l">Requesting</span>
              <app-tier-badge [tier]="r.requested_tier" />
              <span class="aov-status aov-status--{{ r.status }}">{{ r.status }}</span>
            </div>
          </header>

          <dl class="aov-dl">
            <dt>Legal name</dt><dd>{{ r.legal_name }}</dd>
            @if (r.organization_name) { <dt>Organization</dt><dd>{{ r.organization_name }}</dd> }
            <dt>Location</dt><dd>{{ r.country }}{{ r.city ? ', ' + r.city : '' }}</dd>
            @if (r.website) { <dt>Website</dt><dd><a [href]="r.website" target="_blank" rel="noopener">{{ r.website }}</a></dd> }
            @if (r.phone) { <dt>Phone</dt><dd>{{ r.phone }}</dd> }
            @if (r.reason) { <dt>Reason</dt><dd>{{ r.reason }}</dd> }
            <dt>Submitted</dt><dd>{{ r.created_at | date:'d MMM y · HH:mm' }}</dd>
            @if (r.decided_at) { <dt>Decided</dt><dd>{{ r.decided_at | date:'d MMM y · HH:mm' }}</dd> }
            @if (r.decision_note) { <dt>Note</dt><dd>{{ r.decision_note }}</dd> }
          </dl>

          @if (r.status === 'pending') {
            <footer class="aov-actions">
              <input class="aov-note" placeholder="Decision note (optional)" [(ngModel)]="notes[r.id]" />
              <div class="aov-btns">
                <button class="aov-btn aov-btn--ghost"   [disabled]="busy(r.id)" (click)="reject(r)">Reject</button>
                <button class="aov-btn aov-btn--primary" [disabled]="busy(r.id)" (click)="approve(r, r.requested_tier)">Approve as {{ r.requested_tier }}</button>
                @if (r.requested_tier === 'verified') {
                  <button class="aov-btn aov-btn--gold" [disabled]="busy(r.id)" (click)="approve(r, 'professional')">Upgrade to professional</button>
                }
              </div>
            </footer>
          }
        </article>
      }
    </div>
  }
</div>
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .aov-shell { max-width: 980px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
    .aov-head { margin-bottom: 1.1rem; }
    .aov-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .aov-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }

    .aov-tabs { display:inline-flex; gap:2px; padding:3px; margin-bottom:1.1rem; background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:10px; }
    .aov-tabs button { padding:7px 14px; border-radius:7px; background:transparent; border:none; color: var(--mu, #8a8aa0); font-weight:600; font-size:13px; cursor:pointer; transition: background .15s, color .15s; text-transform: capitalize; }
    .aov-tabs button:hover { color: var(--text); } .aov-tabs button.active { background: var(--bg3, #181826); color: var(--text); }

    .aov-list { display:flex; flex-direction: column; gap: 12px; }
    .aov-card { background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; padding: 16px 18px; }
    .aov-card--decided { opacity: .85; }
    .aov-card__head { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom: 10px; flex-wrap: wrap; }
    .aov-who { display:flex; align-items:center; gap: 10px; }
    .aov-ava { width: 42px; height: 42px; border-radius: 50%; overflow: hidden; flex-shrink: 0; object-fit: cover; background: linear-gradient(135deg, var(--primary, #006c35), var(--accent, #d4af37)); display: grid; place-items: center; font-family: var(--fh, sans-serif); font-size: 18px; color: #fff; }
    .aov-ava--letter { line-height: 1; }
    .aov-name { font-weight: 700; font-size: 14px; }
    .aov-current { font-size: 12px; color: var(--mu, #8a8aa0); margin-top: 3px; display:flex; align-items:center; gap:6px; }
    .aov-req { display:flex; align-items:center; gap: 8px; }
    .aov-l { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mu, #8a8aa0); }
    .aov-status { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; padding: 2px 8px; border-radius: 100px; font-weight: 700; }
    .aov-status--pending  { background: rgba(212,175,55,.16); color: var(--accent, #d4af37); }
    .aov-status--approved { background: rgba(0,108,53,.16);   color: #4ade80; }
    .aov-status--rejected { background: rgba(239,68,68,.12);  color: #fca5a5; }

    .aov-dl { display:grid; grid-template-columns: 140px 1fr; gap: 5px 14px; margin: 10px 0 0; font-size: 13px;
      dt { color: var(--mu, #8a8aa0); } dd { margin: 0; color: var(--text); word-break: break-word; }
      a { color: var(--accent, #d4af37); text-decoration: none; &:hover { text-decoration: underline; } } }

    .aov-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--br, rgba(255,255,255,.08)); }
    .aov-note { padding: 8px 12px; background: var(--bg3, #181826); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; color: var(--text); font-size: 13px; outline: none;
      &:focus { border-color: var(--primary, #006c35); } }
    .aov-btns { display:flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; }
    .aov-btn { padding: 8px 14px; border-radius: 8px; border: 1px solid transparent; font-weight: 700; font-size: 13px; cursor: pointer; &:disabled { opacity: .5; cursor: not-allowed; } }
    .aov-btn--primary { background: var(--primary, #006c35); color: #fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .aov-btn--gold    { background: var(--accent, #d4af37); color: #1a1100; &:hover:not(:disabled){ background: var(--accent-soft, #e8c965); } }
    .aov-btn--ghost   { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.3); color: #fca5a5; } }

    .aov-empty { padding: 50px 20px; text-align:center; color: var(--mu, #8a8aa0);
      h3 { color: var(--text); margin: 0; font-family: var(--fh, sans-serif); letter-spacing:.5px; text-transform: capitalize; } }
    .aov-skel { height: 110px; background: rgba(255,255,255,.05); border-radius: 14px; animation: aovPulse 1.5s ease-in-out infinite; margin-bottom: 10px; }
    @keyframes aovPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .aov-skel { animation:none; } }
  `],
})
export class AdminOrganizerVerificationsComponent implements OnInit {
  private svc = inject(OrganizerVerificationService);
  private toast = inject(ToastService);

  readonly filters: { value: Filter; label: string }[] = [
    { value: 'pending',  label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'all',      label: 'All' },
  ];

  readonly filter  = signal<Filter>('pending');
  readonly rows    = signal<OrganizerRequest[]>([]);
  readonly loading = signal(false);
  notes: Record<string, string> = {};
  private busyIds  = signal<Set<string>>(new Set());

  ngOnInit(): void { this.refresh(); }

  setFilter(f: Filter): void { this.filter.set(f); this.refresh(); }

  private refresh(): void {
    this.loading.set(true);
    this.svc.listAdmin(this.filter()).subscribe({
      next: (r) => { this.rows.set(r.data ?? []); this.loading.set(false); },
      error: () => { this.rows.set([]); this.loading.set(false); },
    });
  }

  busy(id: string): boolean { return this.busyIds().has(id); }
  private mark(id: string, on: boolean): void {
    this.busyIds.update(s => { const n = new Set(s); on ? n.add(id) : n.delete(id); return n; });
  }

  approve(r: OrganizerRequest, tier: 'verified' | 'professional'): void {
    this.mark(r.id, true);
    this.svc.approveAdmin(r.id, tier, this.notes[r.id] || undefined).subscribe({
      next: () => { this.toast.success(`Approved as ${tier}.`); this.mark(r.id, false); this.refresh(); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(r.id, false); },
    });
  }
  reject(r: OrganizerRequest): void {
    this.mark(r.id, true);
    this.svc.rejectAdmin(r.id, this.notes[r.id] || undefined).subscribe({
      next: () => { this.toast.info('Request rejected.'); this.mark(r.id, false); this.refresh(); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(r.id, false); },
    });
  }
}
