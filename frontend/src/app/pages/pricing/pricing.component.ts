import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing', standalone: true,
  imports: [RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  readonly plans = [
    {
      name: 'Free', nameAr: 'مجاني', price: 0, period: 'Forever',
      desc: 'For individual players who want to compete.',
      highlight: false,
      features: [
        'Join unlimited public tournaments',
        'All 4 bracket formats',
        'Receive digital prize rewards',
        'Player ranking & leaderboard',
        'Match history & stats',
      ],
      cta: 'Get started free', ctaLink: '/auth'
    },
    {
      name: 'Starter', nameAr: 'المبتدئ', price: 299, period: 'per month',
      desc: 'For small companies running occasional events.',
      highlight: false,
      features: [
        'Everything in Free',
        'Create up to 5 tournaments/month',
        'Up to 64 participants per tournament',
        'Department engagement report',
        'CSV employee import',
        'Email support',
      ],
      cta: 'Start Starter plan', ctaLink: '/auth'
    },
    {
      name: 'Professional', nameAr: 'المحترف', price: 999, period: 'per month',
      desc: 'For HR teams running regular engagement programs.',
      highlight: true,
      features: [
        'Everything in Starter',
        'Unlimited tournaments',
        'Up to 256 participants',
        'SAP / Oracle / Workday integration',
        'White label subdomain',
        'Bulk prize distribution',
        'Priority support',
      ],
      cta: 'Start Professional', ctaLink: '/auth'
    },
    {
      name: 'Enterprise', nameAr: 'المؤسسي', price: null, period: 'Custom pricing',
      desc: 'For large enterprises and multi-location companies.',
      highlight: false,
      features: [
        'Everything in Professional',
        'Up to 512 participants',
        'Dedicated account manager',
        'Custom SLA',
        'SAML 2.0 / OIDC SSO',
        'Advanced analytics & retention reports',
        'On-site onboarding',
      ],
      cta: 'Contact sales', ctaLink: '/auth'
    },
  ];
}
