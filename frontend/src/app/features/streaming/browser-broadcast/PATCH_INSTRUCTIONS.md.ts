/**
 * @fileoverview PATCH INSTRUCTIONS for existing components.
 *
 * Do NOT replace your existing files with this — only append the marked
 * sections to integrate browser broadcasting alongside the existing
 * OBS-path controls shipped in Sprint 5.
 */

/* ════════════════════════════════════════════════════════════════════════
   1. broadcast-controls.component.ts
   ════════════════════════════════════════════════════════════════════════

   Add the BrowserBroadcastComponent to the `imports` array:

       imports: [
         CommonModule,
         // ... existing imports ...
         BrowserBroadcastComponent,   // ← NEW
       ],

   Add a signal to toggle between OBS and Browser modes:

       readonly broadcastMode = signal<'obs' | 'browser'>('obs');

   In the template, add a mode-switcher above the existing OBS controls:

       <div class="mode-switcher">
         <button
           type="button"
           [class.active]="broadcastMode() === 'obs'"
           (click)="broadcastMode.set('obs')">
           🎬 OBS (Pro)
         </button>
         <button
           type="button"
           [class.active]="broadcastMode() === 'browser'"
           (click)="broadcastMode.set('browser')">
           🌐 Browser (Quick)
         </button>
       </div>

       @if (broadcastMode() === 'obs') {
         <!-- existing OBS flow stays exactly as-is -->
       } @else {
         <app-browser-broadcast [broadcastId]="broadcast().id" />
       }

   ════════════════════════════════════════════════════════════════════════
   2. LiveBroadcastResource.php  (add to toArray() return)
   ════════════════════════════════════════════════════════════════════════

       'browser_broadcast' => [
           'enabled'  => true,
           'open_url' => route('broadcasts.browser-session.store', $this->id),
           'provider' => $this->bridge_provider,
       ],

   ════════════════════════════════════════════════════════════════════════
   3. tournament-detail.component.html  (optional inline embed)
   ════════════════════════════════════════════════════════════════════════

       <!-- next to or replacing existing OBS panel -->
       <app-browser-broadcast
         *ngIf="broadcast?.id"
         [broadcastId]="broadcast.id" />

   ════════════════════════════════════════════════════════════════════════ */
