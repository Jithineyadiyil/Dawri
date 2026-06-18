import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerTier, TIER_LABELS } from './organizer-verification.service';

/**
 * Compact organizer tier badge. Used on tournament cards / detail / profile.
 *
 *   <app-tier-badge [tier]="t.organizer_tier" />
 */
@Component({
  selector: 'app-tier-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tier() && tier() !== 'none') {
      <span class="tb" [class]="'tb--' + tier()" [title]="label()">
        @if (tier() === 'professional') {
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        } @else if (tier() === 'verified') {
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M12 1l3 2h4v4l2 3-2 3v4h-4l-3 2-3-2H5v-4l-2-3 2-3V3h4l3-2z"/></svg>
        } @else if (tier() === 'admin') {
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></svg>
        }
        {{ label() }}
      </span>
    }
  `,
  styles: [`
    .tb {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 8px; border-radius: 100px;
      font-family: var(--fm, monospace); font-size: 10px; font-weight: 700;
      letter-spacing: 1px; text-transform: uppercase; line-height: 1;
    }
    .tb--verified     { background: rgba(0,108,53,.16);  color: #4ade80; border: 1px solid rgba(0,108,53,.5); }
    .tb--professional { background: rgba(212,175,55,.15); color: var(--accent, #d4af37); border: 1px solid rgba(212,175,55,.5); }
    .tb--admin        { background: rgba(46,139,255,.15); color: #5ba6ff; border: 1px solid rgba(46,139,255,.5); }
  `],
})
export class TierBadgeComponent {
  readonly tier = input<OrganizerTier | null | undefined>('none');
  label(): string { return TIER_LABELS[this.tier() ?? 'none']; }
}
