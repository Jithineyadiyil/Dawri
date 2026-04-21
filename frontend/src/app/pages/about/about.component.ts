import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * AboutComponent — public "About Us" page.
 *
 * Tells the Dawri story: who we are, why we exist, what we build, and what
 * we stand for. Content is structured as data so copy edits don't require
 * touching the template.
 *
 * Route: /about
 * Auth:  public
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

  /** Headline numbers shown in the "By the numbers" strip. */
  readonly stats = [
    { label: 'Saudi gamers reached',  value: '23M+', sub: 'addressable market' },
    { label: 'Vision 2030 gaming',    value: '$38B', sub: 'national investment' },
    { label: 'GCC countries',         value: '6',    sub: 'primary markets' },
    { label: 'Supported languages',   value: '2',    sub: 'Arabic + English, RTL-native' },
  ] as const;

  /** The three product pillars. */
  readonly pillars = [
    {
      icon: '🏆',
      title: 'Tournament Engine',
      titleAr: 'محرك البطولات',
      body:
        'Automated brackets for single elimination, double elimination, round robin, and Swiss ' +
        'formats. Real-time results, dispute resolution, and AI-assisted screenshot verification.',
      link: '/tournaments',
      linkLabel: 'Browse tournaments',
    },
    {
      icon: '🎁',
      title: 'Digital Marketplace',
      titleAr: 'المتجر الرقمي',
      body:
        '98 SKUs across 37 brands — gaming cards, streaming, shopping, food delivery, telecom. ' +
        'Instant delivery via a multi-distributor backend with automatic failover.',
      link: '/marketplace',
      linkLabel: 'Open marketplace',
    },
    {
      icon: '🏢',
      title: 'Enterprise Engagement',
      titleAr: 'حلول الشركات',
      body:
        'White-label tournaments for corporates, universities, and government. Native integrations ' +
        'with SAP SuccessFactors, Oracle HCM, and Workday.',
      link: '/pricing',
      linkLabel: 'See plans',
    },
  ] as const;

  /** Founding values — short and memorable, not corporate fluff. */
  readonly values = [
    {
      icon: '🇸🇦',
      title: 'Saudi-first',
      body:
        'Arabic-native UX, Saudi payment rails, KSA-hosted servers, PDPL-compliant by design.',
    },
    {
      icon: '⚡',
      title: 'Ship quickly, then iterate',
      body:
        'We ship small, measure real usage, and let the data pick the next feature. No committee-driven roadmaps.',
    },
    {
      icon: '🔒',
      title: 'Fair and transparent',
      body:
        'Automated brackets with screenshot verification. Clear rules, visible moderator actions, honest dispute handling.',
    },
    {
      icon: '🤝',
      title: 'Players own their data',
      body:
        'We never sell personal information. Every PDPL right is real: access, correction, deletion, portability.',
    },
  ] as const;

  /** Milestones that actually happened / are on the roadmap. */
  readonly milestones = [
    { year: '2025', title: 'Dawri founded in Riyadh',                body: 'Initial platform and Sprint 1 MVP — single elimination brackets, manual moderators.' },
    { year: '2026', title: 'Marketplace + distributor abstraction',  body: 'Multi-vendor fulfillment with circuit breaker, 98 SKUs across 7 categories.' },
    { year: '2026', title: 'Saudi Arabia launch',                    body: 'Arabic-native rollout, SMS OTP via Unifonic and Taqnyat, wallet + Mada + STC Pay.' },
    { year: '2027', title: 'GCC expansion',                          body: 'UAE, Kuwait, Qatar, Bahrain, Oman rollout with local payment rails and brand partners.' },
    { year: '2027', title: 'Enterprise engagement GA',               body: 'HR integrations for SAP, Oracle, Workday. White-label subdomains. Department-level analytics.' },
  ] as const;
}
