import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * PrivacyComponent — public Privacy Policy page.
 *
 * Content is structured to address the Saudi PDPL (Personal Data Protection
 * Law) which governs any service collecting data from residents of the
 * Kingdom. Dawri's B2C and B2B customers are primarily KSA-based, so the
 * policy centers on PDPL rights (access, correction, erasure, portability,
 * objection) while remaining readable for non-lawyer users.
 *
 * Route: /privacy
 * Auth:  public
 *
 * Note: this content is a reasonable baseline drafted against Dawri's actual
 * data flows (tournaments, wallet, marketplace, HR integrations). It should
 * be reviewed by counsel before production launch — this is not a substitute
 * for legal advice.
 */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {
  /** Policy last reviewed / updated — keep in sync with actual revisions. */
  readonly lastUpdated = 'April 21, 2026';
  readonly lastUpdatedAr = '٢١ أبريل ٢٠٢٦';

  /** Jump-to anchor links rendered in the sidebar table of contents. */
  readonly sections = [
    { id: 'overview',   label: '1. Overview' },
    { id: 'collect',    label: '2. Information we collect' },
    { id: 'use',        label: '3. How we use information' },
    { id: 'share',      label: '4. How we share information' },
    { id: 'retention',  label: '5. Data retention' },
    { id: 'security',   label: '6. Security' },
    { id: 'rights',     label: '7. Your PDPL rights' },
    { id: 'minors',     label: '8. Minors' },
    { id: 'cookies',    label: '9. Cookies & analytics' },
    { id: 'transfers',  label: '10. International transfers' },
    { id: 'changes',    label: '11. Changes to this policy' },
    { id: 'contact',    label: '12. Contact our DPO' },
  ] as const;

  /**
   * Smooth-scroll to an in-page anchor. Honors `prefers-reduced-motion`.
   */
  jumpTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
}
