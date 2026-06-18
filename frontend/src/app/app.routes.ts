import { Routes } from '@angular/router';
import { authGuard, guestGuard, adminGuard } from './core/guards/auth.guard';

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
    // Password reset landing — no guard so the link from email always works.
    // The AuthComponent reads ?token=&email= from query params and shows the reset form.
    path: 'reset-password',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
    title: 'Reset Password — Dawri',
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
    loadComponent: () => import('./pages/profile/my-profile-overview.component').then(m => m.MyProfileOverviewComponent),
    canActivate: [authGuard],
    title: 'My Profile — Dawri',
  },
  {
    path: 'profile/account',
    loadComponent: () => import('./pages/profile/my-profile.component').then(m => m.MyProfileComponent),
    canActivate: [authGuard],
    title: 'Account Settings — Dawri',
  },
  {
    path: 'subscription',
    loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent),
    canActivate: [authGuard],
    title: 'Subscription — Dawri',
  },
  // Social — friends
  {
    path: 'friends',
    loadComponent: () => import('./features/social/friends-page.component').then(m => m.FriendsPageComponent),
    canActivate: [authGuard],
    title: 'Friends — Dawri',
  },
  // Social — direct messages
  {
    path: 'messages',
    loadComponent: () => import('./features/social/messages-page.component').then(m => m.MessagesPageComponent),
    canActivate: [authGuard],
    title: 'Messages — Dawri',
  },
  // Social — challenges
  {
    path: 'challenges',
    loadComponent: () => import('./features/social/challenges-page.component').then(m => m.ChallengesPageComponent),
    canActivate: [authGuard],
    title: 'Challenges — Dawri',
  },
  // Discover players
  {
    path: 'players',
    loadComponent: () => import('./features/profile/player-discovery-page.component').then(m => m.PlayerDiscoveryPageComponent),
    canActivate: [authGuard],
    title: 'Discover Players — Dawri',
  },
  // Teams
  {
    path: 'teams',
    loadComponent: () => import('./features/teams/teams-page.component').then(m => m.TeamsPageComponent),
    canActivate: [authGuard],
    title: 'Teams — Dawri',
  },
  {
    path: 'teams/create',
    loadComponent: () => import('./features/teams/team-create-page.component').then(m => m.TeamCreatePageComponent),
    canActivate: [authGuard],
    title: 'Create Team — Dawri',
  },
  {
    path: 'teams/:slug',
    loadComponent: () => import('./features/teams/team-profile-page.component').then(m => m.TeamProfilePageComponent),
    canActivate: [authGuard],
    title: 'Team — Dawri',
  },
  // Organizer verification — self
  {
    path: 'organizer/verify',
    loadComponent: () => import('./features/organizer/organizer-verify-page.component').then(m => m.OrganizerVerifyPageComponent),
    canActivate: [authGuard],
    title: 'Organizer Verification — Dawri',
  },
  // Organizer verification — admin approvals
  {
    path: 'admin/organizer-verifications',
    loadComponent: () => import('./features/organizer/admin-organizer-verifications.component').then(m => m.AdminOrganizerVerificationsComponent),
    canActivate: [adminGuard],
    title: 'Organizer Verifications — Admin — Dawri',
  },
  // Sprint 3: Company branding settings
  {
    path: 'settings/company-branding',
    loadComponent: () => import('./pages/settings/company-branding/company-branding.component').then(m => m.CompanyBrandingComponent),
    canActivate: [authGuard],
    title: 'Company Branding — Dawri',
  },
  // Sprint 14: public sponsors showcase
  {
    path: 'sponsors',
    loadComponent: () => import('./pages/sponsors/sponsors.component').then(m => m.SponsorsComponent),
    title: 'Our Partners — Dawri',
  },
  // ── Admin shell — all /admin/* pages render INSIDE the sidebar layout ──
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    title: 'Admin Panel — Dawri',
    children: [
      {
        path: 'marketplace',
        loadComponent: () => import('./pages/admin/marketplace/admin-marketplace.component').then(m => m.AdminMarketplaceComponent),
        title: 'Marketplace — Admin — Dawri',
      },
      {
        path: 'finance',
        loadComponent: () => import('./pages/admin/finance/finance.component').then(m => m.FinanceComponent),
        title: 'Finance — Admin — Dawri',
      },
      {
        path: 'sponsors',
        loadComponent: () => import('./pages/admin/admin-sponsors.component').then(m => m.AdminSponsorsComponent),
        title: 'Sponsors — Admin — Dawri',
      },
      {
        path: 'platform-sponsors',
        loadComponent: () => import('./pages/admin/platform-sponsors/admin-platform-sponsors.component')
          .then(m => m.AdminPlatformSponsorsComponent),
        title: 'Platform Sponsors — Admin — Dawri',
      },
      {
        path: 'ads',
        loadComponent: () => import('./pages/admin/admin-ads.component').then(m => m.AdminAdsComponent),
        title: 'Ad Placements — Admin — Dawri',
      },
      {
        path: 'streams',
        loadComponent: () => import('./pages/admin/admin-streams.component').then(m => m.AdminStreamsComponent),
        title: 'Live Streams — Admin — Dawri',
      },
    ],
  },
  // Notifications page
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications.component').then(m => m.NotificationsComponent),
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
  // Sprint 15: Dawri Community (chat). The 'admin' sub-route is declared
  // inside COMMUNITY_ROUTES as a sibling of the shell, so loadChildren
  // covers /community, /community/:slug, /community/:slug/channel/:id,
  // and /community/admin.
  {
    path: 'community',
    canActivate: [authGuard],
    loadChildren: () => import('./features/community/community.routes').then(m => m.COMMUNITY_ROUTES),
    title: 'Community — Dawri',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
