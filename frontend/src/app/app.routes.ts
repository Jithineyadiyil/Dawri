import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Dawri — Esports Platform',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [guestGuard],
    title: 'Sign In — Dawri',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard — Dawri',
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./pages/tournaments/tournaments.component').then(m => m.TournamentsComponent),
    title: 'Tournaments — Dawri',
  },
  // Specific route MUST come before :id
  {
    path: 'tournaments/create',
    loadComponent: () => import('./pages/tournaments/create-tournament.component').then(m => m.CreateTournamentComponent),
    canActivate: [authGuard],
    title: 'Create Tournament — Dawri',
  },
  {
    path: 'tournaments/:id',
    loadComponent: () => import('./pages/tournaments/tournament-detail.component').then(m => m.TournamentDetailComponent),
    title: 'Tournament — Dawri',
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./pages/marketplace/marketplace.component').then(m => m.MarketplaceComponent),
    title: 'Marketplace — Dawri',
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent),
    title: 'Pricing — Dawri',
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    title: 'Leaderboard — Dawri',
  },
  // Sprint 4: Company tournament calendar
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent),
    canActivate: [authGuard],
    title: 'Tournament Calendar — Dawri',
  },
  {
    path: 'players/:id',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    title: 'Player Profile — Dawri',
  },
  // Sprint 4: Current user's own editable profile
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/my-profile.component').then(m => m.MyProfileComponent),
    canActivate: [authGuard],
    title: 'My Profile — Dawri',
  },
  {
    path: 'subscription',
    loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent),
    canActivate: [authGuard],
    title: 'Subscription — Dawri',
  },
  // Sprint 3: Company branding settings
  {
    path: 'settings/company-branding',
    loadComponent: () => import('./pages/settings/company-branding/company-branding.component').then(m => m.CompanyBrandingComponent),
    canActivate: [authGuard],
    title: 'Company Branding — Dawri',
  },
  // Sprint 8: Sponsor admin page — MUST come before /admin so the more
  // specific path matches first
  {
    path: 'admin/sponsors',
    loadComponent: () => import('./pages/admin/admin-sponsors.component').then(m => m.AdminSponsorsComponent),
    canActivate: [authGuard],
    title: 'Sponsors — Admin — Dawri',
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
    title: 'Admin Panel — Dawri',
  },
  // Sprint 7: public About Us page
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About — Dawri',
  },
  // Sprint 7: public Contact Us page
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Dawri',
  },
  // Sprint 7: public Privacy Policy page
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'Privacy Policy — Dawri',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
