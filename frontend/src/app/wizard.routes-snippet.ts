/**
 * Wizard routes — APPEND these two entries to your existing app.routes.ts.
 *
 * Both routes lazy-load the same component, which auto-detects the scope
 * from `router.url` (sees `/broadcasts/` or `/tournaments/`).
 *
 * Place them BEFORE any catch-all routes (e.g. `path: '**'`) and AFTER
 * more-specific tournament/broadcast routes that you want to keep
 * un-shadowed.
 */

import type { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const WIZARD_ROUTES: Routes = [
  {
    path: 'broadcasts/:id/setup-wizard',
    loadComponent: () =>
      import('./features/streaming/setup-wizard/setup-wizard.component')
        .then(m => m.SetupWizardComponent),
    canActivate: [authGuard],
    title: 'Streaming Setup — Dawri',
  },
  {
    path: 'tournaments/:id/setup-wizard',
    loadComponent: () =>
      import('./features/streaming/setup-wizard/setup-wizard.component')
        .then(m => m.SetupWizardComponent),
    canActivate: [authGuard],
    title: 'Streaming Setup — Dawri',
  },
];
