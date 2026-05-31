/**
 * @fileoverview Optional standalone route for the browser-broadcast widget.
 *
 * Most callers will embed `<app-browser-broadcast>` inside their existing
 * tournament-detail page. This file is provided for the rare case where
 * you want it on its own URL.
 *
 * Wire it into your main app routes like so:
 *
 *   {
 *     path: 'broadcasts/:broadcastId/browser-go-live',
 *     loadChildren: () =>
 *       import('./features/streaming/browser-broadcast/browser-broadcast.routes')
 *         .then((m) => m.BROWSER_BROADCAST_ROUTES),
 *   }
 */

import { Routes } from '@angular/router';

export const BROWSER_BROADCAST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./browser-broadcast.component').then((m) => m.BrowserBroadcastComponent),
  },
];
