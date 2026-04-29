import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionsDashboardComponent } from './dashboard-subs/subscriptions-dashboard.component';

@Component({
  selector: 'dw-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SubscriptionsDashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin">
      <div class="admin-header">
        <h1 class="admin-title">Dawri Control Panel</h1>
        <p class="admin-sub">Manage companies, subscriptions, pricing, and platform operations</p>
      </div>

      <div class="tab-bar">
        @for (tab of tabs; track tab.key) {
          <button class="tab" [class.tab--active]="activeTab() === tab.key" (click)="switchTab(tab.key)">
            {{ tab.label }}
          </button>
        }
        <!-- Sprint 8: sponsors live on their own page; render as a tab-styled link -->
        <a class="tab" routerLink="/admin/sponsors">🤝 Sponsors</a>
        <!-- Sprint 14: platform-level sponsors management -->
        <a class="tab" routerLink="/admin/platform-sponsors">🎯 Platform Sponsors</a>
        <!-- Sprint 11: marketplace admin also lives on its own page -->
        <a class="tab" routerLink="/admin/marketplace">🛒 Marketplace</a>
        <!-- Sprint 13: finance & reports on its own page -->
        <a class="tab" routerLink="/admin/finance">💰 Finance</a>
      </div>

      <!-- ═══ OVERVIEW ═══ -->
      <ng-container *ngIf="activeTab() === 'overview'">
        <div class="stats-row" *ngIf="overview()">
          @for (s of overview()!.stats; track s.label) {
            <div class="stat-card">
              <span class="stat-val">{{ s.format === 'currency' ? (s.value | number:'1.0-0') + ' SAR' : s.value }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          }
        </div>
        <div class="grid-2" *ngIf="overview()">
          <div class="panel">
            <h3 class="panel-title">Subscriptions by Plan</h3>
            @for (p of overview()!.subscriptions_by_plan; track p.plan) {
              <div class="plan-row"><span class="pr-name">{{ p.plan | titlecase }}</span><span class="pr-count">{{ p.count }} clients</span><span class="pr-rev">{{ p.revenue | number:'1.0-0' }} SAR/mo</span></div>
            }
          </div>
          <div class="panel">
            <h3 class="panel-title">Revenue Trend</h3>
            <div class="chart-bars" *ngIf="overview()!.revenue_trend?.length">
              @for (m of overview()!.revenue_trend; track m.month) {
                <div class="bar-group"><div class="bar" [style.height.%]="barH(m.total, overview()!.revenue_trend)"></div><span class="bar-label">{{ m.month.slice(5) }}</span></div>
              }
            </div>
          </div>
        </div>
      </ng-container>

      <!-- ═══ PLANS / PRICING ═══ -->
      <ng-container *ngIf="activeTab() === 'plans'">
        <div class="plans-config">
          @for (plan of plansList(); track plan.key) {
            <div class="plan-config-card" [class.plan-inactive]="!plan.is_active">
              <div class="pcc-header">
                <div>
                  <span class="pcc-name">{{ plan.name }}</span>
                  <span class="pcc-name-ar">{{ plan.name_ar }}</span>
                  <span class="pcc-type">{{ plan.type | uppercase }}</span>
                </div>
                <span class="plan-badge" [class]="'plan--' + plan.key">{{ plan.key }}</span>
              </div>
              <div class="pcc-section">
                <label class="pcc-label">Price (SAR/month)</label>
                <div class="pcc-row">
                  <input type="number" class="pcc-input" [(ngModel)]="plan.price" [disabled]="plan.key === 'free'" min="0" />
                  <span class="pcc-hint" *ngIf="plan.price === null">Custom pricing</span>
                </div>
              </div>
              <div class="pcc-section">
                <label class="pcc-label">Description</label>
                <input type="text" class="pcc-input pcc-input--wide" [(ngModel)]="plan.description" />
              </div>
              <div class="pcc-section">
                <label class="pcc-label">Description (Arabic)</label>
                <input type="text" class="pcc-input pcc-input--wide" [(ngModel)]="plan.description_ar" dir="rtl" />
              </div>
              <div class="pcc-section">
                <label class="pcc-label">Limits</label>
                <div class="pcc-limits">
                  <div class="pcc-limit"><span>Tournaments/month</span><input type="number" [(ngModel)]="plan.limits.tournaments_per_month" min="-1" /><span class="pcc-hint" *ngIf="plan.limits.tournaments_per_month === -1">Unlimited</span></div>
                  <div class="pcc-limit"><span>Max participants</span><input type="number" [(ngModel)]="plan.limits.max_participants" min="0" /></div>
                  <div class="pcc-limit"><span>Max employees</span><input type="number" [(ngModel)]="plan.limits.max_employees" min="-1" /><span class="pcc-hint" *ngIf="plan.limits.max_employees === -1">Unlimited</span></div>
                  <div class="pcc-limit"><span>Moderators</span><input type="number" [(ngModel)]="plan.limits.moderators" min="-1" /></div>
                </div>
              </div>
              <div class="pcc-section">
                <label class="pcc-label">Features</label>
                <div class="pcc-features">
                  @for (feat of featureKeys; track feat.key) {
                    <label class="pcc-feat"><input type="checkbox" [(ngModel)]="plan.features[feat.key]" />{{ feat.label }}</label>
                  }
                </div>
              </div>
              <div class="pcc-footer">
                <label class="pcc-feat"><input type="checkbox" [(ngModel)]="plan.is_active" />Active</label>
                <button class="btn btn-gold" (click)="savePlan(plan)" [disabled]="saving()">{{ saving() ? 'Saving...' : 'Save Changes' }}</button>
              </div>
            </div>
          }
        </div>
      </ng-container>

      <!-- ═══ COMPANIES ═══ -->
      <ng-container *ngIf="activeTab() === 'companies'">
        <div class="toolbar">
          <input class="search-input" [(ngModel)]="companySearch" (input)="loadCompanies()" placeholder="Search companies..." />
          <select class="filter-select" [(ngModel)]="companyStatusFilter" (change)="loadCompanies()">
            <option value="">All Status</option>
            <option value="active">Active</option><option value="trial">Trial</option>
            <option value="suspended">Suspended</option><option value="churned">Churned</option>
          </select>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Company</th><th>Plan</th><th>Status</th><th>Users</th><th>Tournaments</th><th>Actions</th></tr></thead>
            <tbody>
              @for (c of companies(); track c.id) {
                <tr>
                  <td><div class="company-cell"><span class="cname">{{ c.name }}</span><span class="dim">{{ c.domain }}</span></div></td>
                  <td><span class="plan-badge plan--{{ c.active_subscription?.plan ?? 'None' }}">{{ c.active_subscription?.plan ?? 'None' }}</span></td>
                  <td><span class="status-badge status--{{ c.status }}">{{ c.status }}</span></td>
                  <td class="mono">{{ c.users_count }}</td>
                  <td class="mono">{{ c.tournaments_count }}</td>
                  <td><button class="btn-xs" (click)="selectCompany(c)">View</button></td>
                </tr>
              }
              <tr *ngIf="!companies().length"><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No companies found.</td></tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ SUBSCRIPTIONS ═══ -->
      <ng-container *ngIf="activeTab() === 'subscriptions'">
        <!-- Sprint 13: subscriptions-focused dashboard (MRR, plans, renewals, trials). -->
        <app-subscriptions-dashboard [isActive]="activeTab() === 'subscriptions'"></app-subscriptions-dashboard>

        <div class="toolbar">
          <select class="filter-select" [(ngModel)]="subPlanFilter" (change)="loadSubscriptions()">
            <option value="">All Plans</option>
            <option value="free">Free</option><option value="starter">Starter</option>
            <option value="professional">Professional</option><option value="enterprise">Enterprise</option>
          </select>
          <select class="filter-select" [(ngModel)]="subStatusFilter" (change)="loadSubscriptions()">
            <option value="">All Status</option>
            <option value="active">Active</option><option value="trial">Trial</option>
            <option value="cancelled">Cancelled</option><option value="expired">Expired</option>
          </select>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>User</th><th>Plan</th><th>Status</th><th>Price</th><th>Expires</th><th>Actions</th></tr></thead>
            <tbody>
              @for (s of subs(); track s.id) {
                <tr>
                  <td><div class="company-cell"><span class="cname">{{ s.user?.name }}</span><span class="dim">{{ s.user?.email }}</span></div></td>
                  <td><span class="plan-badge plan--{{ s.plan }}">{{ s.plan }}</span></td>
                  <td><span class="status-badge status--{{ s.status }}">{{ s.status }}</span></td>
                  <td class="mono">{{ s.price | number:'1.0-0' }} SAR</td>
                  <td class="dim">{{ s.current_period_end | date:'mediumDate' }}</td>
                  <td style="display:flex;gap:0.3rem">
                    <button class="btn-xs btn-gold" (click)="extendSub(s.id)">+1mo</button>
                    <button class="btn-xs btn-danger" (click)="cancelSub(s.id)">Cancel</button>
                  </td>
                </tr>
              }
              <tr *ngIf="!subs().length"><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No subscriptions found.</td></tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ USERS ═══ -->
      <ng-container *ngIf="activeTab() === 'users'">
        <div class="toolbar">
          <input class="search-input" [(ngModel)]="userSearch" (input)="loadUsers()" placeholder="Search users..." />
          <select class="filter-select" [(ngModel)]="userRoleFilter" (change)="loadUsers()">
            <option value="">All Roles</option>
            <option value="admin">Admin</option><option value="organizer">Organizer</option>
            <option value="player">Player</option><option value="moderator">Moderator</option>
          </select>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>User</th><th>Role</th><th>Plan</th><th>Phone</th><th>Joined</th></tr></thead>
            <tbody>
              @for (u of allUsers(); track u.id) {
                <tr>
                  <td><div class="company-cell"><span class="cname">{{ u.name }}</span><span class="dim">{{ u.email }}</span></div></td>
                  <td><span class="role-badge">{{ u.role }}</span></td>
                  <td><span class="plan-badge plan--{{ u.subscription_plan ?? 'free' }}">{{ u.subscription_plan ?? 'free' }}</span></td>
                  <td><span class="status-badge" [class]="u.phone_verified ? 'status--active' : 'status--suspended'">{{ u.phone_verified ? 'Verified' : 'Unverified' }}</span></td>
                  <td class="dim">{{ u.created_at | date:'mediumDate' }}</td>
                </tr>
              }
              <tr *ngIf="!allUsers().length"><td colspan="5" style="text-align:center;color:#8892a4;padding:2rem">No users found.</td></tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ INVOICES ═══ -->
      <ng-container *ngIf="activeTab() === 'invoices'">
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Invoice #</th><th>User</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              @for (inv of invoices(); track inv.id) {
                <tr>
                  <td class="mono">{{ inv.invoice_number }}</td>
                  <td><div class="company-cell"><span class="cname">{{ inv.user?.name }}</span><span class="dim">{{ inv.user?.email }}</span></div></td>
                  <td class="mono">{{ inv.total | number:'1.2-2' }} {{ inv.currency }}</td>
                  <td><span class="status-badge inv--{{ inv.status }}">{{ inv.status }}</span></td>
                  <td class="dim">{{ inv.created_at | date:'mediumDate' }}</td>
                  <td><button class="btn-xs btn-gold" *ngIf="inv.status !== 'paid'" (click)="markPaid(inv.id)">Mark Paid</button></td>
                </tr>
              }
              <tr *ngIf="!invoices().length"><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No invoices found.</td></tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ GAMES ═══ -->
      <ng-container *ngIf="activeTab() === 'games'">
        <div class="toolbar">
          <input class="search-input" [(ngModel)]="gameSearch" (input)="filterGames()" placeholder="Search games..." />
          <select class="filter-select" [(ngModel)]="gameStatusFilter" (change)="filterGames()">
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button class="btn btn-gold" style="margin-left:auto" (click)="openGameModal()">+ Add Game</button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Key</th>
                <th>Platform</th>
                <th>Genre</th>
                <th>Formats</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (g of filteredGames(); track g.id) {
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:0.5rem">
                      <span style="font-size:1.3rem">{{ g.icon_emoji || '🎮' }}</span>
                      <div class="company-cell">
                        <span class="cname">{{ g.name }}</span>
                        <span class="dim" *ngIf="g.name_ar" dir="rtl">{{ g.name_ar }}</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="mono">{{ g.key }}</span></td>
                  <td class="dim">{{ g.platform || '—' }}</td>
                  <td class="dim">{{ g.genre || '—' }}</td>
                  <td>
                    <div style="display:flex;gap:0.2rem;flex-wrap:wrap">
                      @for (f of g.supported_formats; track f) {
                        <span class="plan-badge plan--starter" style="font-size:0.6rem">
                          {{ f === 'single_elimination' ? 'SE' : f === 'double_elimination' ? 'DE' : f === 'round_robin' ? 'RR' : 'SW' }}
                        </span>
                      }
                    </div>
                  </td>
                  <td class="mono">{{ g.sort_order }}</td>
                  <td>
                    <span class="status-badge" [class]="g.is_active ? 'status--active' : 'status--suspended'">
                      {{ g.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td style="display:flex;gap:0.3rem">
                    <button class="btn-xs" (click)="openGameModal(g)">Edit</button>
                    <button class="btn-xs" (click)="toggleGame(g)">{{ g.is_active ? 'Disable' : 'Enable' }}</button>
                    <button class="btn-xs btn-danger" (click)="deleteGame(g)">Del</button>
                  </td>
                </tr>
              }
              <tr *ngIf="!filteredGames().length">
                <td colspan="8" style="text-align:center;color:#8892a4;padding:2rem">No games found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ GAME MODAL ═══ -->
      <div class="modal-backdrop" *ngIf="showGameModal()" (click)="closeGameModal()">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <div class="modal-hdr">
            <span>{{ editingGame() ? 'Edit Game' : 'Add Game' }}</span>
            <button (click)="closeGameModal()" style="background:none;border:none;color:#8892a4;font-size:1.1rem;cursor:pointer">✕</button>
          </div>
          <div class="modal-body">
            <div class="mg-row">
              <div class="mg-field">
                <label>Key *</label>
                <input [(ngModel)]="gForm.key" placeholder="e.g. pubg_mobile" [disabled]="!!editingGame()" />
                <small>Lowercase + underscores. Locked after creation.</small>
              </div>
              <div class="mg-field">
                <label>Name (English) *</label>
                <input [(ngModel)]="gForm.name" placeholder="e.g. PUBG Mobile" />
              </div>
            </div>
            <div class="mg-row">
              <div class="mg-field">
                <label>Name (Arabic)</label>
                <input [(ngModel)]="gForm.name_ar" placeholder="ببجي موبايل" dir="rtl" />
              </div>
              <div class="mg-field">
                <label>Icon Emoji</label>
                <input [(ngModel)]="gForm.icon_emoji" placeholder="🎯" maxlength="4" />
              </div>
            </div>
            <div class="mg-field">
              <label>Cover Image URL</label>
              <input [(ngModel)]="gForm.icon_url" placeholder="https://cdn.example.com/game.png" />
            </div>
            <div class="mg-row">
              <div class="mg-field">
                <label>Platform</label>
                <select [(ngModel)]="gForm.platform">
                  <option value="">— Select —</option>
                  <option>Mobile</option><option>PC</option>
                  <option>Console</option><option>Cross-platform</option>
                </select>
              </div>
              <div class="mg-field">
                <label>Genre</label>
                <select [(ngModel)]="gForm.genre">
                  <option value="">— Select —</option>
                  <option>Battle Royale</option><option>FPS</option>
                  <option>Sports</option><option>Fighting</option>
                  <option>MOBA</option><option>Strategy</option>
                  <option>Racing</option><option>Other</option>
                </select>
              </div>
            </div>
            <div class="mg-field">
              <label>Bracket Formats</label>
              <div class="mg-checks">
                <label class="pcc-feat"><input type="checkbox" [(ngModel)]="gForm.fmt_se" />Single Elimination</label>
                <label class="pcc-feat"><input type="checkbox" [(ngModel)]="gForm.fmt_de" />Double Elimination</label>
                <label class="pcc-feat"><input type="checkbox" [(ngModel)]="gForm.fmt_rr" />Round Robin</label>
                <label class="pcc-feat"><input type="checkbox" [(ngModel)]="gForm.fmt_sw" />Swiss System</label>
              </div>
            </div>
            <div class="mg-row">
              <div class="mg-field">
                <label>Sort Order</label>
                <input type="number" [(ngModel)]="gForm.sort_order" min="0" />
              </div>
              <div class="mg-field">
                <label>Status</label>
                <label class="pcc-feat" style="margin-top:0.5rem">
                  <input type="checkbox" [(ngModel)]="gForm.is_active" />Active
                </label>
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn-xs" (click)="closeGameModal()">Cancel</button>
            <button class="btn btn-gold" (click)="saveGame()" [disabled]="saving()">
              {{ saving() ? 'Saving...' : (editingGame() ? 'Save Changes' : 'Add Game') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div class="toast" [class.toast--error]="toastType()==='error'" *ngIf="toast()">{{ toast() }}</div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .admin { padding: 1.5rem; max-width: 1400px; margin: 0 auto; }
    .admin-header { margin-bottom: 1.5rem; }
    .admin-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.1em; color: #fff; margin: 0 0 0.25rem; }
    .admin-sub { color: #8892a4; font-size: 0.9rem; margin: 0; }
    .tab-bar { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; flex-wrap: wrap; border-bottom: 1px solid #243048; padding-bottom: 0; }
    .tab { background: transparent; border: none; border-bottom: 2px solid transparent; color: #8892a4; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.6rem 1rem; cursor: pointer; transition: all 0.15s; margin-bottom: -1px; }
    .tab:hover { color: #dde1ee; }
    .tab--active { color: var(--gold, #a855f7); border-bottom-color: var(--gold, #a855f7); }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .stat-card { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .stat-val { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: var(--gold, #a855f7); line-height: 1; }
    .stat-lbl { display: block; font-size: 0.75rem; color: #8892a4; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
    .panel { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .panel-title { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.08em; color: #8892a4; text-transform: uppercase; margin: 0 0 0.75rem; }
    .plan-row { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0; border-bottom: 1px solid #1a2235; }
    .pr-name { flex: 1; color: #dde1ee; font-size: 0.85rem; } .pr-count { font-size: 0.8rem; color: #8892a4; } .pr-rev { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--cyan, #fbbf24); margin-left: auto; }
    .chart-bars { display: flex; align-items: flex-end; gap: 0.5rem; height: 120px; }
    .bar-group { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; flex: 1; height: 100%; justify-content: flex-end; }
    .bar { width: 100%; background: linear-gradient(180deg, var(--gold, #a855f7), rgba(168,85,247,0.3)); border-radius: 3px 3px 0 0; min-height: 4px; transition: height 0.3s; }
    .bar-label { font-size: 0.65rem; color: #8892a4; }
    .plans-config { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }
    .plan-config-card { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .plan-inactive { opacity: 0.6; }
    .pcc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
    .pcc-name { display: block; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1.1rem; color: #fff; }
    .pcc-name-ar { display: block; font-size: 0.8rem; color: #8892a4; direction: rtl; }
    .pcc-type { display: inline-block; font-size: 0.65rem; background: #1a2235; color: #8892a4; padding: 0.1rem 0.4rem; border-radius: 4px; margin-top: 0.25rem; }
    .pcc-section { margin-bottom: 0.75rem; }
    .pcc-label { display: block; font-size: 0.7rem; color: #8892a4; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
    .pcc-row { display: flex; align-items: center; gap: 0.5rem; }
    .pcc-input { background: #1a2235; border: 1px solid #243048; border-radius: 4px; color: #dde1ee; padding: 0.35rem 0.6rem; font-size: 0.85rem; width: 100px; }
    .pcc-input--wide { width: 100%; box-sizing: border-box; }
    .pcc-hint { font-size: 0.7rem; color: var(--cyan, #fbbf24); }
    .pcc-limits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .pcc-limit { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.75rem; color: #8892a4; }
    .pcc-limit input { background: #1a2235; border: 1px solid #243048; border-radius: 4px; color: #dde1ee; padding: 0.25rem 0.5rem; font-size: 0.8rem; width: 70px; }
    .pcc-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem; }
    .pcc-feat { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: #8892a4; cursor: pointer; }
    .pcc-feat input { accent-color: var(--cyan, #fbbf24); }
    .pcc-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #1a2235; margin-top: 0.75rem; }
    .toolbar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .search-input { background: #1a2235; border: 1px solid #243048; border-radius: 6px; color: #dde1ee; padding: 0.45rem 0.75rem; font-size: 0.85rem; flex: 1; min-width: 180px; }
    .search-input::placeholder { color: #4b5563; }
    .filter-select { background: #1a2235; border: 1px solid #243048; border-radius: 6px; color: #dde1ee; padding: 0.45rem 0.75rem; font-size: 0.85rem; }
    .table-wrap { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { padding: 0.65rem 0.75rem; text-align: left; font-family: 'Rajdhani', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4b5563; border-bottom: 1px solid #243048; white-space: nowrap; }
    .data-table td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #1a2235; color: #dde1ee; font-size: 0.85rem; }
    .data-table tr:hover { background: #1a2235; }
    .company-cell { display: flex; flex-direction: column; } .cname { color: #fff; font-weight: 500; }
    .dim { color: #8892a4; } .mono { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: var(--cyan, #fbbf24); }
    .plan-badge { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; }
    .plan--free { background: #1a2235; color: #8892a4; } .plan--starter { background: rgba(251,191,36,0.1); color: #fbbf24; }
    .plan--professional { background: rgba(168,85,247,0.12); color: #a855f7; } .plan--enterprise { background: rgba(168,85,247,0.12); color: #a855f7; }
    .plan--None { background: #1a2235; color: #4b5563; }
    .status-badge { font-size: 0.7rem; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; }
    .status--active { background: rgba(34,197,94,0.1); color: #22c55e; } .status--trial { background: rgba(59,130,246,0.1); color: #3b82f6; }
    .status--suspended,.status--cancelled,.status--expired,.status--churned { background: rgba(239,68,68,0.1); color: #ef4444; }
    .inv--paid { background: rgba(34,197,94,0.1); color: #22c55e; } .inv--pending { background: rgba(245,158,11,0.1); color: #f59e0b; }
    .role-badge { font-size: 0.7rem; text-transform: uppercase; color: var(--cyan, #fbbf24); }
    .btn { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.45rem 1rem; border-radius: 6px; cursor: pointer; border: none; transition: all 0.15s; }
    .btn-gold { background: var(--gold, #a855f7); color: #0b1022; } .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-xs { font-size: 0.7rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid #243048; background: transparent; color: #8892a4; cursor: pointer; }
    .btn-xs:hover { border-color: var(--cyan, #fbbf24); color: var(--cyan, #fbbf24); }
    .btn-xs.btn-gold { background: var(--gold, #a855f7); color: #0b1022; border-color: var(--gold, #a855f7); }
    .btn-xs.btn-danger { border-color: #ef4444; color: #ef4444; } .btn-xs.btn-danger:hover { background: #ef4444; color: #fff; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(3px); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-box { background: #1a2235; border: 1px solid rgba(168,85,247,0.25); border-radius: 8px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(0,0,0,0.6); }
    .modal-hdr { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #243048; font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: 0.1em; color: var(--gold, #a855f7); }
    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; }
    .modal-foot { display: flex; justify-content: flex-end; gap: 0.65rem; padding: 0.85rem 1.25rem; border-top: 1px solid #243048; }
    .mg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
    .mg-field { display: flex; flex-direction: column; gap: 0.3rem; }
    .mg-field label { font-size: 0.72rem; color: #8892a4; text-transform: uppercase; letter-spacing: 0.08em; }
    .mg-field input, .mg-field select { background: rgba(255,255,255,0.04); border: 1px solid #243048; border-radius: 4px; color: #dde1ee; padding: 0.45rem 0.65rem; font-size: 0.88rem; width: 100%; box-sizing: border-box; }
    .mg-field input:focus, .mg-field select:focus { outline: none; border-color: rgba(251,191,36,0.4); }
    .mg-field select option { background: #1a2235; }
    .mg-field small { font-size: 0.7rem; color: #4b5563; }
    .mg-checks { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #22c55e; color: #fff; padding: 0.75rem 1.5rem; border-radius: 8px; z-index: 100; font-family: 'Rajdhani', sans-serif; font-weight: 600; }
    .toast--error { background: #ef4444; }
    @media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .grid-2 { grid-template-columns: 1fr; } .pcc-limits, .pcc-features { grid-template-columns: 1fr; } .mg-row { grid-template-columns: 1fr; } }
  `]
})
export class AdminComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  readonly tabs = [
    { key: 'overview',       label: 'Overview' },
    { key: 'plans',          label: 'Plans & Pricing' },
    { key: 'companies',      label: 'Companies' },
    { key: 'subscriptions',  label: 'Subscriptions' },
    { key: 'users',          label: 'Users' },
    { key: 'invoices',       label: 'Invoices' },
    { key: 'games',          label: '🎮 Game Types' },
  ];

  readonly featureKeys = [
    { key: 'create_tournaments',    label: 'Create tournaments' },
    { key: 'hr_csv_import',         label: 'HR CSV import' },
    { key: 'hr_api_integration',    label: 'SAP / Oracle / Workday' },
    { key: 'white_label',           label: 'White label branding' },
    { key: 'bulk_prize_distribution', label: 'Bulk prize distribution' },
    { key: 'engagement_reports',    label: 'Engagement reports' },
    { key: 'advanced_analytics',    label: 'Advanced analytics' },
    { key: 'sso_saml',              label: 'SAML 2.0 / SSO' },
    { key: 'dedicated_manager',     label: 'Dedicated account manager' },
    { key: 'custom_sla',            label: 'Custom SLA' },
  ];

  readonly activeTab   = signal('overview');
  readonly overview    = signal<any>(null);
  readonly plansList   = signal<any[]>([]);
  readonly companies   = signal<any[]>([]);
  readonly subs        = signal<any[]>([]);
  readonly allUsers    = signal<any[]>([]);
  readonly invoices    = signal<any[]>([]);
  readonly gamesList   = signal<any[]>([]);
  readonly filteredGames = signal<any[]>([]);
  readonly showGameModal = signal(false);
  readonly editingGame   = signal<any>(null);
  readonly toast     = signal<string | null>(null);
  readonly toastType = signal<'success' | 'error'>('success');
  readonly saving    = signal(false);

  companySearch = ''; companyStatusFilter = '';
  subPlanFilter = ''; subStatusFilter = '';
  userSearch = ''; userRoleFilter = '';
  gameSearch = ''; gameStatusFilter = '';

  gForm: any = this.emptyGameForm();

  ngOnInit(): void {
    this.loadOverview();
    this.loadPlans();
    this.loadCompanies();
    this.loadSubscriptions();
    this.loadUsers();
    this.loadInvoices();
    this.loadGames();
  }

  switchTab(key: string): void { this.activeTab.set(key); }

  loadOverview(): void { this.http.get<any>(`${this.base}/admin/overview`).subscribe({ next: r => this.overview.set(r.data) }); }

  loadPlans(): void { this.http.get<any>(`${this.base}/admin/plans`).subscribe({ next: r => this.plansList.set(r.data ?? []) }); }

  savePlan(plan: any): void {
    this.saving.set(true);
    const body: any = {
      name: plan.name, name_ar: plan.name_ar, price: plan.price,
      description: plan.description, description_ar: plan.description_ar, is_active: plan.is_active,
      limit_tournaments_per_month: plan.limits.tournaments_per_month,
      limit_max_participants: plan.limits.max_participants,
      limit_max_employees: plan.limits.max_employees,
      limit_moderators: plan.limits.moderators,
      feat_create_tournaments: plan.features.create_tournaments,
      feat_hr_csv_import: plan.features.hr_csv_import,
      feat_hr_api_integration: plan.features.hr_api_integration,
      feat_white_label: plan.features.white_label,
      feat_bulk_prizes: plan.features.bulk_prize_distribution,
      feat_engagement_reports: plan.features.engagement_reports,
      feat_advanced_analytics: plan.features.advanced_analytics,
      feat_sso_saml: plan.features.sso_saml,
      feat_dedicated_manager: plan.features.dedicated_manager,
      feat_custom_sla: plan.features.custom_sla,
    };
    this.http.put<any>(`${this.base}/admin/plans/${plan.key}`, body).subscribe({
      next: r => { this.showToast(r.message ?? 'Plan saved!', 'success'); this.saving.set(false); },
      error: e => { this.showToast(e.error?.message ?? 'Failed to save.', 'error'); this.saving.set(false); },
    });
  }

  loadCompanies(): void {
    const p: any = {};
    if (this.companySearch) p.search = this.companySearch;
    if (this.companyStatusFilter) p.status = this.companyStatusFilter;
    this.http.get<any>(`${this.base}/admin/companies`, { params: p }).subscribe({ next: r => this.companies.set(r.data ?? []) });
  }

  loadSubscriptions(): void {
    const p: any = {};
    if (this.subPlanFilter) p.plan = this.subPlanFilter;
    if (this.subStatusFilter) p.status = this.subStatusFilter;
    this.http.get<any>(`${this.base}/admin/subscriptions`, { params: p }).subscribe({ next: r => this.subs.set(r.data ?? []) });
  }

  loadUsers(): void {
    const p: any = {};
    if (this.userSearch) p.search = this.userSearch;
    if (this.userRoleFilter) p.role = this.userRoleFilter;
    this.http.get<any>(`${this.base}/admin/users`, { params: p }).subscribe({ next: r => this.allUsers.set(r.data ?? []) });
  }

  loadInvoices(): void { this.http.get<any>(`${this.base}/admin/invoices`).subscribe({ next: r => this.invoices.set(r.data ?? []) }); }

  selectCompany(c: any): void { this.showToast(`Selected: ${c.name}`, 'success'); }

  extendSub(id: string): void {
    this.http.post<any>(`${this.base}/admin/subscriptions/${id}/extend`, { months: 1 }).subscribe({
      next: r => { this.showToast(r.message, 'success'); this.loadSubscriptions(); },
      error: e => this.showToast(e.error?.message ?? 'Failed', 'error'),
    });
  }

  cancelSub(id: string): void {
    if (!confirm('Cancel this subscription?')) return;
    this.http.post<any>(`${this.base}/admin/subscriptions/${id}/cancel`, {}).subscribe({
      next: () => { this.showToast('Cancelled.', 'success'); this.loadSubscriptions(); },
      error: e => this.showToast(e.error?.message ?? 'Failed', 'error'),
    });
  }

  markPaid(id: string): void {
    this.http.put<any>(`${this.base}/admin/invoices/${id}/mark-paid`, {}).subscribe({
      next: () => { this.showToast('Marked as paid.', 'success'); this.loadInvoices(); this.loadOverview(); },
      error: e => this.showToast(e.error?.message ?? 'Failed', 'error'),
    });
  }

  // ── Games ──────────────────────────────────────────────────────────────────

  loadGames(): void {
    this.http.get<any>(`${this.base}/games`).pipe(
      catchError(() => of({ data: [] }))
    ).subscribe(r => { this.gamesList.set(r.data ?? []); this.filterGames(); });
  }

  filterGames(): void {
    const q = this.gameSearch.toLowerCase();
    this.filteredGames.set(this.gamesList().filter(g => {
      const matchQ = !q || g.name.toLowerCase().includes(q) || g.key.includes(q);
      const matchF = !this.gameStatusFilter ||
        (this.gameStatusFilter === 'active' ? g.is_active : !g.is_active);
      return matchQ && matchF;
    }));
  }

  openGameModal(g?: any): void {
    this.editingGame.set(g ?? null);
    if (g) {
      this.gForm = {
        key: g.key, name: g.name, name_ar: g.name_ar ?? '',
        icon_emoji: g.icon_emoji ?? '', icon_url: g.icon_url ?? '',
        platform: g.platform ?? '', genre: g.genre ?? '',
        is_active: g.is_active, sort_order: g.sort_order,
        fmt_se: g.supported_formats?.includes('single_elimination') ?? false,
        fmt_de: g.supported_formats?.includes('double_elimination') ?? false,
        fmt_rr: g.supported_formats?.includes('round_robin') ?? false,
        fmt_sw: g.supported_formats?.includes('swiss') ?? false,
      };
    } else {
      this.gForm = this.emptyGameForm();
    }
    this.showGameModal.set(true);
  }

  closeGameModal(): void { this.showGameModal.set(false); }

  saveGame(): void {
    if (!this.gForm.key || !this.gForm.name) { this.showToast('Key and Name are required.', 'error'); return; }
    this.saving.set(true);
    const formats: string[] = [
      ...(this.gForm.fmt_se ? ['single_elimination'] : []),
      ...(this.gForm.fmt_de ? ['double_elimination'] : []),
      ...(this.gForm.fmt_rr ? ['round_robin']        : []),
      ...(this.gForm.fmt_sw ? ['swiss']              : []),
    ];
    const payload = {
      key: this.gForm.key, name: this.gForm.name, name_ar: this.gForm.name_ar || null,
      icon_emoji: this.gForm.icon_emoji || null, icon_url: this.gForm.icon_url || null,
      platform: this.gForm.platform || null, genre: this.gForm.genre || null,
      supported_formats: formats, is_active: this.gForm.is_active, sort_order: +this.gForm.sort_order,
    };
    const edit = this.editingGame();
    const req$ = edit
      ? this.http.put<any>(`${this.base}/admin/games/${edit.id}`, payload)
      : this.http.post<any>(`${this.base}/admin/games`, payload);

    req$.pipe(catchError(e => { this.showToast(e.error?.message ?? 'Save failed.', 'error'); this.saving.set(false); return of(null); }))
      .subscribe(res => {
        if (!res) return;
        this.loadGames();
        this.saving.set(false);
        this.closeGameModal();
        this.showToast(edit ? 'Game updated.' : 'Game added.', 'success');
      });
  }

  toggleGame(g: any): void {
    this.http.patch<any>(`${this.base}/admin/games/${g.id}/toggle`, {}).pipe(
      catchError(() => { this.showToast('Toggle failed.', 'error'); return of(null); })
    ).subscribe(res => {
      if (!res) return;
      this.loadGames();
      this.showToast(`${res.data.name} ${res.data.is_active ? 'enabled' : 'disabled'}.`, 'success');
    });
  }

  deleteGame(g: any): void {
    if (!confirm(`Delete "${g.name}"?`)) return;
    this.http.delete(`${this.base}/admin/games/${g.id}`).pipe(
      catchError(() => { this.showToast('Delete failed.', 'error'); return of(null); })
    ).subscribe(() => { this.loadGames(); this.showToast(`${g.name} deleted.`, 'success'); });
  }

  private emptyGameForm(): any {
    return { key:'', name:'', name_ar:'', icon_emoji:'', icon_url:'', platform:'', genre:'', is_active:true, sort_order:0, fmt_se:true, fmt_de:true, fmt_rr:false, fmt_sw:false };
  }

  barH(val: number, trend: any[]): number { const max = Math.max(...trend.map((m: any) => m.total), 1); return Math.round((val / max) * 100); }
  private showToast(msg: string, type: 'success' | 'error'): void { this.toast.set(msg); this.toastType.set(type); setTimeout(() => this.toast.set(null), 3500); }
}
