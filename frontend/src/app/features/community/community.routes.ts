/**
 * Sprint 15 — Lazy-loaded routes for the Dawri Community feature.
 *
 * Wire into the main app routes:
 *   { path: 'community',
 *     loadChildren: () => import('./features/community/community.routes')
 *       .then(m => m.COMMUNITY_ROUTES) }
 */
import { Routes } from '@angular/router';

export const COMMUNITY_ROUTES: Routes = [
  {
    path: 'join/:token',
    loadComponent: () => import('./pages/invite-redeem/invite-redeem.component')
      .then(m => m.InviteRedeemComponent),
  },
  {
    path: '',
    loadComponent: () => import('./pages/community-shell/community-shell.component')
      .then(m => m.CommunityShellComponent),
    children: [
      {
        path: ':slug',
        loadComponent: () => import('./pages/channel-view/channel-view.component')
          .then(m => m.ChannelViewComponent),
      },
      {
        path: ':slug/channel/:channelId',
        loadComponent: () => import('./pages/channel-view/channel-view.component')
          .then(m => m.ChannelViewComponent),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/community-admin/community-admin.component')
      .then(m => m.CommunityAdminComponent),
  },
];
