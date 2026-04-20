/**
 * PATCH — Remove hardcoded leaderboard from tournaments.component.ts
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 1: Delete the hardcoded leaderboard array
 * ═══════════════════════════════════════════════════════════════════
 *
 * Find and DELETE the entire block that looks like:
 *
 *   readonly leaderboard = [
 *     {rank:1, name:'SpeedKing_SA', pts:4820, wins:34, played:40},
 *     {rank:2, name:'ProGamer99', pts:4510, wins:31, played:38},
 *     ...
 *   ];
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 2: Replace with real API-powered signals
 * ═══════════════════════════════════════════════════════════════════
 *
 * Add these signals to the component class:
 *
 *   readonly leaderboard = signal<any[]>([]);
 *   readonly lbLoading = signal(false);
 *   readonly lbGame = signal('ea_fc25');
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 3: Add a loadLeaderboard() method
 * ═══════════════════════════════════════════════════════════════════
 *
 *   loadLeaderboard(game?: string): void {
 *     if (game) this.lbGame.set(game);
 *     this.lbLoading.set(true);
 *     this.api.getLeaderboard(this.lbGame(), 20).subscribe({
 *       next: (res: any) => {
 *         this.leaderboard.set(res.data ?? []);
 *         this.lbLoading.set(false);
 *       },
 *       error: () => this.lbLoading.set(false),
 *     });
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 4: Call loadLeaderboard() in ngOnInit
 * ═══════════════════════════════════════════════════════════════════
 *
 * In your existing ngOnInit(), after this.load(), add:
 *
 *   this.loadLeaderboard();
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 5: Update the leaderboard tab HTML
 * ═══════════════════════════════════════════════════════════════════
 *
 * In the template, find the leaderboard tab content and replace
 * with iteration over the signal:
 *
 *   @for (e of leaderboard(); track e.user_id) {
 *     <tr class="lb-row" [routerLink]="['/players', e.user_id]">
 *       <td>{{ e.rank }}</td>
 *       <td>{{ e.name }}</td>
 *       <td>{{ e.total_points }}</td>
 *       <td>{{ e.wins }}W / {{ e.losses }}L</td>
 *       <td>{{ e.win_rate }}%</td>
 *     </tr>
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 6: Add "View Full Leaderboard" link
 * ═══════════════════════════════════════════════════════════════════
 *
 * At the bottom of the leaderboard tab, add:
 *
 *   <a routerLink="/leaderboard" class="btn btn-ghost">View Full Leaderboard →</a>
 *
 */
