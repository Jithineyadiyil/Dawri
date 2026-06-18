import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrganizerVerificationService } from './organizer-verification.service';
import { TierBadgeComponent } from './tier-badge.component';
import { ToastService } from '../../core/services/toast.service';

/**
 * /organizer/verify — apply for verified / professional organizer tier.
 *
 * Shows your current tier + caps and the apply form. If you already have a
 * pending request, the form is replaced with a status card.
 */
@Component({
  selector: 'app-organizer-verify-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TierBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="ov-shell">
  <header class="ov-head">
    <div>
      <div class="ov-eyebrow">Organizer</div>
      <h1 class="ov-title">Verification</h1>
    </div>
    <a routerLink="/tournaments/create" class="ov-link">Back to tournament create →</a>
  </header>

  @if (svc.status(); as s) {
    <!-- Current tier + caps -->
    <section class="ov-card">
      <div class="ov-tierline">
        <span class="ov-l">Your tier</span>
        <app-tier-badge [tier]="s.tier" />
        @if (s.tier === 'none') { <span class="ov-tierline__hint">Unverified — basic limits apply.</span> }
      </div>
      <div class="ov-caps">
        <div class="ov-cap"><span class="ov-cap__l">Max participants</span><span class="ov-cap__v">{{ s.caps.max_participants ?? 'Unlimited' }}</span></div>
        <div class="ov-cap"><span class="ov-cap__l">Charge entry fees</span><span class="ov-cap__v">{{ s.caps.can_charge_fees ? 'Yes' : 'No' }}</span></div>
        <div class="ov-cap"><span class="ov-cap__l">Featured listing</span><span class="ov-cap__v">{{ s.caps.can_feature ? 'Yes' : 'No' }}</span></div>
        <div class="ov-cap"><span class="ov-cap__l">Attach sponsors</span><span class="ov-cap__v">{{ s.caps.can_sponsor ? 'Yes' : 'No' }}</span></div>
      </div>
    </section>

    @if (s.pending) {
      <section class="ov-card ov-pending">
        <header class="ov-pending__head">
          <h2>Request pending</h2>
          <app-tier-badge [tier]="s.pending.requested_tier" />
        </header>
        <p>Your application for <strong>{{ s.pending.requested_tier }}</strong> is awaiting admin review.</p>
        <dl class="ov-dl">
          <dt>Legal name</dt><dd>{{ s.pending.legal_name }}</dd>
          @if (s.pending.organization_name) { <dt>Organization</dt><dd>{{ s.pending.organization_name }}</dd> }
          <dt>Country</dt><dd>{{ s.pending.country }}{{ s.pending.city ? ', ' + s.pending.city : '' }}</dd>
          @if (s.pending.website) { <dt>Website</dt><dd>{{ s.pending.website }}</dd> }
          @if (s.pending.phone) { <dt>Phone</dt><dd>{{ s.pending.phone }}</dd> }
          @if (s.pending.reason) { <dt>Reason</dt><dd>{{ s.pending.reason }}</dd> }
          <dt>Submitted</dt><dd>{{ s.pending.created_at | date:'d MMM y · HH:mm' }}</dd>
        </dl>
      </section>
    } @else if (s.tier === 'professional') {
      <section class="ov-card"><p style="margin:0;color:var(--mu)">You already hold the highest organizer tier.</p></section>
    } @else {
      <!-- Apply form -->
      <section class="ov-card">
        <h2 class="ov-h">Apply for {{ s.tier === 'none' ? 'verified' : 'professional' }} tier</h2>
        <p class="ov-lede">Tell us about you so we can verify your application. Reviewed within 1–2 business days.</p>
        <form class="ov-form" (ngSubmit)="submit()">
          <div class="ov-tier-pick">
            <label class="ov-tier-opt" [class.active]="form.requested_tier === 'verified'">
              <input type="radio" [(ngModel)]="form.requested_tier" name="tier" value="verified" />
              <span class="ov-tier-opt__name">Verified</span>
              <span class="ov-tier-opt__cap">Up to 128 participants · entry fees · sponsors</span>
            </label>
            <label class="ov-tier-opt" [class.active]="form.requested_tier === 'professional'">
              <input type="radio" [(ngModel)]="form.requested_tier" name="tier" value="professional" />
              <span class="ov-tier-opt__name">Professional</span>
              <span class="ov-tier-opt__cap">Unlimited · featured listings · ticketing</span>
            </label>
          </div>

          <label class="ov-f"><span>Legal name <em>*</em></span><input [(ngModel)]="form.legal_name" name="legal_name" required maxlength="150"/></label>
          <label class="ov-f"><span>Organization (optional)</span><input [(ngModel)]="form.organization_name" name="organization_name" maxlength="150"/></label>
          <div class="ov-row">
            <label class="ov-f"><span>Country <em>*</em></span><input [(ngModel)]="form.country" name="country" required maxlength="80"/></label>
            <label class="ov-f"><span>City</span><input [(ngModel)]="form.city" name="city" maxlength="80"/></label>
          </div>
          <div class="ov-row">
            <label class="ov-f"><span>Website</span><input [(ngModel)]="form.website" name="website" type="url" placeholder="https://" maxlength="255"/></label>
            <label class="ov-f"><span>Phone</span><input [(ngModel)]="form.phone" name="phone" maxlength="40"/></label>
          </div>
          <label class="ov-f"><span>Why are you applying?</span>
            <textarea rows="3" maxlength="2000" [(ngModel)]="form.reason" name="reason" placeholder="A short note about the tournaments you plan to run."></textarea>
          </label>

          <div class="ov-actions">
            <button type="submit" class="ov-btn ov-btn--primary" [disabled]="submitting() || !form.legal_name || !form.country">
              {{ submitting() ? 'Submitting…' : 'Submit application' }}
            </button>
          </div>
        </form>
      </section>
    }
  } @else {
    <div class="ov-skel"></div>
    <div class="ov-skel"></div>
  }
</div>
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .ov-shell { max-width: 760px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
    .ov-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom: 1.2rem; flex-wrap:wrap; }
    .ov-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .ov-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }
    .ov-link { font-family: var(--fm, monospace); font-size: 12px; color: var(--mu, #8a8aa0); text-decoration: none; &:hover { color: var(--text); } }

    .ov-card { background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; padding: 20px 22px; margin-bottom: 14px; }
    .ov-tierline { display:flex; align-items:center; gap: 10px; margin-bottom: 14px; flex-wrap:wrap; }
    .ov-l { font-family: var(--fm, monospace); font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color: var(--mu, #8a8aa0); }
    .ov-tierline__hint { font-size: 12px; color: var(--mu, #8a8aa0); }

    .ov-caps { display:grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
    @media (max-width: 540px) { .ov-caps { grid-template-columns: 1fr; } }
    .ov-cap { display:flex; justify-content:space-between; padding: 8px 12px; background: var(--bg3, #181826); border-radius: 8px; }
    .ov-cap__l { font-size: 12px; color: var(--mu, #8a8aa0); }
    .ov-cap__v { font-size: 13px; font-weight: 700; }

    .ov-pending__head { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom: 8px;
      h2 { font-family: var(--fh, sans-serif); font-size: 18px; letter-spacing:.5px; text-transform: uppercase; margin: 0; } }
    .ov-dl { display:grid; grid-template-columns: 130px 1fr; gap: 6px 14px; margin: 12px 0 0; font-size: 13px;
      dt { color: var(--mu, #8a8aa0); } dd { margin: 0; color: var(--text); } }

    .ov-h { font-family: var(--fh, sans-serif); font-size: 18px; letter-spacing: .8px; text-transform: uppercase; margin: 0 0 6px; }
    .ov-lede { color: var(--mu, #8a8aa0); margin: 0 0 16px; }

    .ov-tier-pick { display:flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
    .ov-tier-opt { display:flex; flex-direction:column; gap: 4px; flex: 1; min-width: 220px; padding: 12px 14px; cursor: pointer;
      background: var(--bg3, #181826); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 10px;
      input { display: none; }
      &.active { border-color: var(--primary, #006c35); background: rgba(0,108,53,.1); } }
    .ov-tier-opt__name { font-weight: 700; }
    .ov-tier-opt__cap  { font-size: 12px; color: var(--mu, #8a8aa0); }

    .ov-form { display:flex; flex-direction: column; gap: 12px; }
    .ov-row { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 540px) { .ov-row { grid-template-columns: 1fr; } }
    .ov-f { display:flex; flex-direction:column; gap: 6px;
      span { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.3px; text-transform: uppercase; color: var(--mu, #8a8aa0); em { color: #fca5a5; font-style: normal; } }
      input, textarea { background: var(--bg3, #181826); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 13px; outline: none; font-family: inherit; &:focus { border-color: var(--primary, #006c35); } }
      textarea { resize: vertical; } }

    .ov-actions { display:flex; justify-content: flex-end; }
    .ov-btn { padding: 10px 20px; border-radius: 10px; border: 1px solid transparent; font-weight: 700; font-size: 14px; cursor: pointer; &:disabled { opacity: .5; cursor: not-allowed; } }
    .ov-btn--primary { background: var(--primary, #006c35); color: #fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .ov-skel { height: 90px; background: rgba(255,255,255,.05); border-radius: 14px; margin-bottom: 12px; animation: ovPulse 1.5s ease-in-out infinite; }
    @keyframes ovPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .ov-skel { animation: none; } }
  `],
})
export class OrganizerVerifyPageComponent implements OnInit {
  readonly svc = inject(OrganizerVerificationService);
  private toast = inject(ToastService);

  readonly submitting = signal(false);
  form = {
    requested_tier: 'verified' as 'verified' | 'professional',
    legal_name: '', organization_name: '', country: '', city: '',
    website: '', phone: '', reason: '',
  };

  ngOnInit(): void { this.svc.loadStatus(); }

  submit(): void {
    if (this.submitting()) return;
    if (!this.form.legal_name.trim() || !this.form.country.trim()) {
      this.toast.error('Legal name and country are required.'); return;
    }
    this.submitting.set(true);
    this.svc.apply(this.form as any).subscribe({
      next: () => { this.toast.success('Application submitted. We\'ll review it shortly.'); this.submitting.set(false); },
      error: (e) => {
        const msg = e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? 'Failed to submit.';
        this.toast.error(msg); this.submitting.set(false);
      },
    });
  }
}
