import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionsDashboardComponent } from './dashboard-subs/subscriptions-dashboard.component';

@Component({
  selector: 'dw-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, SubscriptionsDashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-shell">

      <!-- ── Sidebar navigation ─────────────────────────────── -->
      <aside class="admin-nav">
        <div class="admin-nav__brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Control Panel</span>
        </div>

        <!-- Group 1: Platform -->
        <div class="nav-group">
          <span class="nav-group-label">Platform</span>
          <button class="nav-item" [class.active]="activeTab()==='overview'" (click)="switchTab('overview')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Overview
          </button>
          <button class="nav-item" [class.active]="activeTab()==='companies'" (click)="switchTab('companies')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Companies
          </button>
          <button class="nav-item" [class.active]="activeTab()==='users'" (click)="switchTab('users')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Users
          </button>
          <button class="nav-item" [class.active]="activeTab()==='games'" (click)="switchTab('games')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="11" x2="15.01" y2="11"/><line x1="18" y1="13" x2="18.01" y2="13"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>
            Game Types
          </button>
        </div>

        <!-- Group 2: Monetization -->
        <div class="nav-group">
          <span class="nav-group-label">Monetization</span>
          <button class="nav-item" [class.active]="activeTab()==='plans'" (click)="switchTab('plans')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Plans & Pricing
          </button>
          <button class="nav-item" [class.active]="activeTab()==='subscriptions'" (click)="switchTab('subscriptions')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Subscriptions
          </button>
          <button class="nav-item" [class.active]="activeTab()==='invoices'" (click)="switchTab('invoices')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Invoices
          </button>
        </div>

        <!-- Group 3: Separate pages -->
        <div class="nav-group">
          <span class="nav-group-label">Sections</span>
          <a class="nav-item" routerLink="/admin/marketplace" routerLinkActive="active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Marketplace
          </a>
          <a class="nav-item" routerLink="/admin/finance" routerLinkActive="active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Finance
          </a>
          <a class="nav-item" routerLink="/admin/sponsors" routerLinkActive="active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Sponsors
          </a>
          <a class="nav-item" routerLink="/admin/platform-sponsors" routerLinkActive="active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Platform Sponsors
          </a>
          <a class="nav-item" routerLink="/admin/ads" routerLinkActive="active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
            Ad Placements
          </a>
        </div>
      </aside>

      <!-- ── Main content ────────────────────────────────────── -->
      <div class="admin-main">
        <!-- Shell page-header only for in-page tabs; child routes render their own header -->
        @if (!hasChildRoute()) {
        <div class="admin-page-header">
          <div>
            <h1 class="admin-title">{{ currentPageTitle() }}</h1>
            <p class="admin-sub">Dawri Control Panel · {{ today() }}</p>
          </div>
        </div>
        }
        <!-- Child route pages (Marketplace, Finance, Sponsors etc.) render here -->
        <router-outlet />

        <!-- In-page tabs — hidden when a child route is active -->
        @if (!hasChildRoute()) {
        <div class="admin">

      <!-- ═══ OVERVIEW ═══ -->
      @if (activeTab() === 'overview') {
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
            @if (overview()!.subscriptions_by_plan?.length) {
              @for (p of overview()!.subscriptions_by_plan; track p.plan) {
                <div class="plan-row"><span class="pr-name">{{ p.plan | titlecase }}</span><span class="pr-count">{{ p.count }} clients</span><span class="pr-rev">{{ p.revenue | number:'1.0-0' }} SAR/mo</span></div>
              }
            } @else {
              <div class="panel-empty">No active subscriptions yet. Plan breakdown appears once companies subscribe.</div>
            }
          </div>
          <div class="panel">
            <h3 class="panel-title">Revenue Trend</h3>
            @if (overview()!.revenue_trend?.length) {
              <div class="chart-bars">
                @for (m of overview()!.revenue_trend; track m.month) {
                  <div class="bar-group"><div class="bar" [style.height.%]="barH(m.total, overview()!.revenue_trend)"></div><span class="bar-label">{{ m.month.slice(5) }}</span></div>
                }
              </div>
            } @else {
              <div class="panel-empty">No revenue recorded yet. Monthly trend appears after the first paid invoice.</div>
            }
          </div>
        </div>
      }

      <!-- ═══ PLANS / PRICING ═══ -->
      @if (activeTab() === 'plans') {
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
      }

      <!-- ═══ COMPANIES ═══ -->
      @if (activeTab() === 'companies') {
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
              @if (!companies().length) { <tr><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No companies found.</td></tr> }
            </tbody>
          </table>
        </div>
      }

      <!-- ═══ SUBSCRIPTIONS ═══ -->
      @if (activeTab() === 'subscriptions') {
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
              @if (!subs().length) { <tr><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No subscriptions found.</td></tr> }
            </tbody>
          </table>
        </div>
      }

      <!-- ═══ USERS ═══ -->
      @if (activeTab() === 'users') {
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
              @if (!allUsers().length) { <tr><td colspan="5" style="text-align:center;color:#8892a4;padding:2rem">No users found.</td></tr> }
            </tbody>
          </table>
        </div>
      }

      <!-- ═══ INVOICES ═══ -->
      @if (activeTab() === 'invoices') {
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
              @if (!invoices().length) { <tr><td colspan="6" style="text-align:center;color:#8892a4;padding:2rem">No invoices found.</td></tr> }
            </tbody>
          </table>
        </div>
      }

      <!-- ═══ GAMES ═══ -->
      @if (activeTab() === 'games') {
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
                      @if (g.icon_emoji) {
                        <span style="font-size:1.2rem">{{ g.icon_emoji }}</span>
                      } @else {
                        <svg style="width:18px;height:18px;color:#8892a4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="11" x2="15.01" y2="11"/><line x1="18" y1="13" x2="18.01" y2="13"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>
                      }
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
      }

      <!-- ═══ GAME MODAL ═══ -->
      @if (showGameModal()) {
      <div class="modal-backdrop" (click)="closeGameModal()">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <div class="modal-hdr">
            <span>{{ editingGame() ? 'Edit Game' : 'Add Game' }}</span>
            <button (click)="closeGameModal()" style="background:none;border:none;color:#8892a4;cursor:pointer;display:grid;place-items:center;width:28px;height:28px;border-radius:6px" title="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
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
      }

      <!-- Inline confirmation banner (replaces window.confirm) -->
      @if (confirmPending(); as cp) {
        <div class="confirm-bar">
          <span class="confirm-msg">{{ cp.label }}</span>
          <div class="confirm-actions">
            <button class="btn-xs" (click)="confirmPending.set(null)">Cancel</button>
            @if (cp.action === 'cancelSub') {
              <button class="btn-xs btn-danger" (click)="cancelSubConfirmed(cp.id)">Yes, cancel</button>
            }
            @if (cp.action === 'deleteGame') {
              <button class="btn-xs btn-danger" (click)="deleteGameConfirmed(cp.id)">Yes, delete</button>
            }
          </div>
        </div>
      }

      <!-- Toast -->
      @if (toast()) {
        <div class="toast" [class.toast--error]="toastType()==='error'">{{ toast() }}</div>
      }
        </div><!-- /admin -->
        }<!-- /hasChildRoute -->
      </div><!-- /admin-main -->
    </div><!-- /admin-shell -->
  `,
  styles: [`
    :host { display: block; height: 100%; }

    /* ── Shell layout ──────────────────────────────────────── */
    .admin-shell { display: grid; grid-template-columns: 220px 1fr; min-height: calc(100vh - 60px); background: #0b0f1a; }

    /* ── Sidebar ────────────────────────────────────────────── */
    .admin-nav {
      background: #0e1220; border-right: 1px solid #1e2a3a;
      padding: 0; display: flex; flex-direction: column;
      position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto;
    }
    .admin-nav__brand {
      display: flex; align-items: center; gap: 10px;
      padding: 1.25rem 1.1rem; border-bottom: 1px solid #1e2a3a;
      font-family: var(--fh, 'Anton', sans-serif); font-size: 0.9rem; letter-spacing: .12em;
      text-transform: uppercase; color: var(--accent, #d4af37);
      svg { flex-shrink: 0; }
    }
    .nav-group { padding: 1rem 0.65rem 0.5rem; }
    .nav-group-label {
      display: block; padding: 0 0.5rem; margin-bottom: 0.35rem;
      font-family: var(--fm, monospace); font-size: 0.62rem; letter-spacing: 2px;
      text-transform: uppercase; color: #3d4f63; font-weight: 600;
    }
    .nav-item {
      width: 100%; box-sizing: border-box;
      display: flex; align-items: center; gap: 10px;
      min-height: 38px; padding: 0 0.75rem; margin: 0;
      border-radius: 8px; border: none; background: transparent;
      color: #6b7280; font-family: inherit; font-size: 0.84rem; font-weight: 500;
      line-height: 1; text-align: left;
      cursor: pointer; text-decoration: none; white-space: nowrap;
      transition: background .14s, color .14s;
      svg { flex-shrink: 0; display: block; width: 15px; height: 15px; transition: color .14s; }
      &:hover { background: rgba(255,255,255,.05); color: #e5e7eb; }
      &.active {
        background: rgba(212,175,55,.1); color: var(--accent, #d4af37);
        font-weight: 600;
        svg { color: var(--accent, #d4af37); }
      }
    }
    .nav-group .nav-item + .nav-item { margin-top: 2px; }

    /* ── Main content area ──────────────────────────────────── */
    .admin-main { display: flex; flex-direction: column; min-width: 0; }
    .admin-page-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.25rem 1.75rem; border-bottom: 1px solid #1e2a3a;
      background: #0e1220;
    }
    .admin-title { font-family: var(--fh, 'Anton', sans-serif); font-size: 1.6rem; letter-spacing: .08em; text-transform: uppercase; color: #fff; margin: 0; }
    .admin-sub { color: #4b5563; font-size: 0.78rem; margin: 2px 0 0; font-family: var(--fm, monospace); letter-spacing: .5px; }
    .admin { padding: 1.5rem 1.75rem; flex: 1; }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .stat-card { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; min-height: 84px; display: flex; flex-direction: column; justify-content: center; }
    .stat-val { display: block; font-family: var(--fh, sans-serif); font-size: 1.8rem; color: var(--accent, #d4af37); line-height: 1.15; }
    .stat-lbl { display: block; font-size: 0.75rem; color: #8892a4; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
    .panel { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .panel-title { font-family: var(--fb, sans-serif); font-weight: 700; font-size: 0.9rem; letter-spacing: 0.08em; color: #8892a4; text-transform: uppercase; margin: 0 0 0.75rem; }
    .panel-empty { display: flex; align-items: center; justify-content: center; text-align: center; min-height: 120px; padding: 1rem; color: #5b667a; font-size: 0.82rem; line-height: 1.5; border: 1px dashed #243048; border-radius: 6px; }
    .plan-row { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0; border-bottom: 1px solid #1a2235; }
    .pr-name { flex: 1; color: #dde1ee; font-size: 0.85rem; } .pr-count { font-size: 0.8rem; color: #8892a4; } .pr-rev { font-family: var(--fm, monospace); font-size: 0.75rem; color: var(--accent, #d4af37); margin-left: auto; }
    .chart-bars { display: flex; align-items: flex-end; gap: 0.5rem; height: 120px; }
    .bar-group { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; flex: 1; height: 100%; justify-content: flex-end; }
    .bar { width: 100%; background: linear-gradient(180deg, var(--accent, #d4af37), rgba(212,175,55,0.3)); border-radius: 3px 3px 0 0; min-height: 4px; transition: height 0.3s; }
    .bar-label { font-size: 0.65rem; color: #8892a4; }
    .plans-config { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }
    .plan-config-card { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .plan-inactive { opacity: 0.6; }
    .pcc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
    .pcc-name { display: block; font-family: var(--fb, sans-serif); font-weight: 700; font-size: 1.1rem; color: #fff; }
    .pcc-name-ar { display: block; font-size: 0.8rem; color: #8892a4; direction: rtl; }
    .pcc-type { display: inline-block; font-size: 0.65rem; background: #1a2235; color: #8892a4; padding: 0.1rem 0.4rem; border-radius: 4px; margin-top: 0.25rem; }
    .pcc-section { margin-bottom: 0.75rem; }
    .pcc-label { display: block; font-size: 0.7rem; color: #8892a4; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
    .pcc-row { display: flex; align-items: center; gap: 0.5rem; }
    .pcc-input { background: #1a2235; border: 1px solid #243048; border-radius: 4px; color: #dde1ee; padding: 0.35rem 0.6rem; font-size: 0.85rem; width: 100px; }
    .pcc-input--wide { width: 100%; box-sizing: border-box; }
    .pcc-hint { font-size: 0.7rem; color: var(--accent, #d4af37); }
    .pcc-limits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .pcc-limit { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.75rem; color: #8892a4; }
    .pcc-limit input { background: #1a2235; border: 1px solid #243048; border-radius: 4px; color: #dde1ee; padding: 0.25rem 0.5rem; font-size: 0.8rem; width: 70px; }
    .pcc-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem; }
    .pcc-feat { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: #8892a4; cursor: pointer; }
    .pcc-feat input { accent-color: var(--accent, #d4af37); }
    .pcc-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #1a2235; margin-top: 0.75rem; }
    .toolbar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .search-input { background: #1a2235; border: 1px solid #243048; border-radius: 6px; color: #dde1ee; padding: 0.45rem 0.75rem; font-size: 0.85rem; flex: 1; min-width: 180px; }
    .search-input::placeholder { color: #4b5563; }
    .filter-select { background: #1a2235; border: 1px solid #243048; border-radius: 6px; color: #dde1ee; padding: 0.45rem 0.75rem; font-size: 0.85rem; }
    .table-wrap { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { padding: 0.65rem 0.75rem; text-align: left; font-family: var(--fb, sans-serif); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4b5563; border-bottom: 1px solid #243048; white-space: nowrap; }
    .data-table td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #1a2235; color: #dde1ee; font-size: 0.85rem; }
    .data-table tr:hover { background: #1a2235; }
    .company-cell { display: flex; flex-direction: column; } .cname { color: #fff; font-weight: 500; }
    .dim { color: #8892a4; } .mono { font-family: var(--fm, monospace); font-size: 0.8rem; color: var(--accent, #d4af37); }
    .plan-badge { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; }
    .plan--free { background: #1a2235; color: #8892a4; } .plan--starter { background: rgba(251,191,36,0.1); color: #fbbf24; }
    .plan--professional { background: rgba(212,175,55,0.12); color: #d4af37; } .plan--enterprise { background: rgba(212,175,55,0.12); color: #d4af37; }
    .plan--None { background: #1a2235; color: #4b5563; }
    .status-badge { font-size: 0.7rem; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; }
    .status--active { background: rgba(34,197,94,0.1); color: #22c55e; } .status--trial { background: rgba(59,130,246,0.1); color: #3b82f6; }
    .status--suspended,.status--cancelled,.status--expired,.status--churned { background: rgba(239,68,68,0.1); color: #ef4444; }
    .inv--paid { background: rgba(34,197,94,0.1); color: #22c55e; } .inv--pending { background: rgba(245,158,11,0.1); color: #f59e0b; }
    .role-badge { font-size: 0.7rem; text-transform: uppercase; color: var(--accent, #d4af37); }
    .btn { font-family: var(--fb, sans-serif); font-weight: 700; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.45rem 1rem; border-radius: 6px; cursor: pointer; border: none; transition: all 0.15s; }
    .btn-gold { background: var(--accent, #d4af37); color: #0b1022; } .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-xs { font-size: 0.7rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid #243048; background: transparent; color: #8892a4; cursor: pointer; }
    .btn-xs:hover { border-color: var(--accent, #d4af37); color: var(--accent, #d4af37); }
    .btn-xs.btn-gold { background: var(--accent, #d4af37); color: #0b1022; border-color: var(--accent, #d4af37); }
    .btn-xs.btn-danger { border-color: #ef4444; color: #ef4444; } .btn-xs.btn-danger:hover { background: #ef4444; color: #fff; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(3px); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-box { background: #1a2235; border: 1px solid rgba(212,175,55,0.25); border-radius: 8px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(0,0,0,0.6); }
    .modal-hdr { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #243048; font-family: var(--fh, sans-serif); font-size: 1.3rem; letter-spacing: 0.1em; color: var(--accent, #d4af37); }
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
    .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #22c55e; color: #fff; padding: 0.75rem 1.5rem; border-radius: 8px; z-index: 100; font-family: var(--fb, sans-serif); font-weight: 600; }
    .toast--error { background: #ef4444; }
    .confirm-bar { position: sticky; bottom: 0; left: 0; right: 0; z-index: 50; margin: 1rem -1.5rem -1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.9rem 1.5rem; background: rgba(239,68,68,0.12); border-top: 1px solid rgba(239,68,68,0.35); backdrop-filter: blur(8px); }
    .confirm-msg { font-size: 0.88rem; color: #fca5a5; font-weight: 600; }
    .confirm-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
    @media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .grid-2 { grid-template-columns: 1fr; } .pcc-limits, .pcc-features { grid-template-columns: 1fr; } .mg-row { grid-template-columns: 1fr; } }
  `]
})
export class AdminComponent implements OnInit {
  private readonly http   = inject(HttpClient);
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);
  private readonly base = environment.apiUrl;

  /** True when a child route (Marketplace, Finance etc.) is active */
  readonly hasChildRoute = signal(false);

  /** Page title — reflects both in-page tabs and child route pages */
  readonly currentPageTitle = () => {
    const url = this.router.url;
    if (url.includes('/admin/marketplace'))       return 'Marketplace';
    if (url.includes('/admin/finance'))           return 'Finance & Reports';
    if (url.includes('/admin/platform-sponsors')) return 'Platform Sponsors';
    if (url.includes('/admin/sponsors'))          return 'Sponsors';
    if (url.includes('/admin/ads'))               return 'Ad Placements';
    if (url.includes('/admin/streams'))           return 'Live Streams';
    const map: Record<string, string> = {
      overview: 'Overview', plans: 'Plans & Pricing', companies: 'Companies',
      subscriptions: 'Subscriptions', users: 'Users', invoices: 'Invoices', games: 'Game Types',
    };
    return map[this.activeTab()] ?? 'Admin';
  };

  today = () => new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  /** Inline confirmation state — avoids window.confirm() dialogs */
  readonly confirmPending = signal<{ action: string; label: string; id: string } | null>(null);

  readonly tabs = [
    { key: 'overview',       label: 'Overview' },
    { key: 'plans',          label: 'Plans & Pricing' },
    { key: 'companies',      label: 'Companies' },
    { key: 'subscriptions',  label: 'Subscriptions' },
    { key: 'users',          label: 'Users' },
    { key: 'invoices',       label: 'Invoices' },
    { key: 'games',          label: 'Game Types' },
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

  constructor() {
    if (this.auth.currentUser()?.role !== 'admin') {
      this.router.navigate(['/dashboard']);
    }
    // Track whether a child route (Marketplace, Finance etc.) is active
    const updateChildRoute = () => {
      const isChild = this.router.url !== '/admin' && this.router.url.startsWith('/admin/');
      this.hasChildRoute.set(isChild);
    };
    updateChildRoute();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => updateChildRoute());
  }

  ngOnInit(): void {
    this.loadOverview();
    this.loadPlans();
    this.loadCompanies();
    this.loadSubscriptions();
    this.loadUsers();
    this.loadInvoices();
    this.loadGames();
  }

  switchTab(key: string): void {
    this.activeTab.set(key);
    // Navigate to /admin (no child route) so hasChildRoute() becomes false
    // and the in-page tab content becomes visible.
    if (this.hasChildRoute()) {
      this.router.navigate(['/admin']);
    }
  }

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
    // Set pending confirmation — template renders inline confirm buttons
    this.confirmPending.set({ action: 'cancelSub', label: 'Cancel this subscription?', id });
  }

  cancelSubConfirmed(id: string): void {
    this.confirmPending.set(null);
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
    this.confirmPending.set({ action: 'deleteGame', label: `Delete "${g.name}"?`, id: g.id });
  }

  deleteGameConfirmed(id: string): void {
    this.confirmPending.set(null);
    const g = this.gamesList().find(x => x.id === id);
    this.http.delete(`${this.base}/admin/games/${id}`).pipe(
      catchError(() => { this.showToast('Delete failed.', 'error'); return of(null); })
    ).subscribe(() => { this.loadGames(); this.showToast(`${g?.name ?? 'Game'} deleted.`, 'success'); });
  }

  private emptyGameForm(): any {
    return { key:'', name:'', name_ar:'', icon_emoji:'', icon_url:'', platform:'', genre:'', is_active:true, sort_order:0, fmt_se:true, fmt_de:true, fmt_rr:false, fmt_sw:false };
  }

  barH(val: number, trend: any[]): number { const max = Math.max(...trend.map((m: any) => m.total), 1); return Math.round((val / max) * 100); }
  private showToast(msg: string, type: 'success' | 'error'): void { this.toast.set(msg); this.toastType.set(type); setTimeout(() => this.toast.set(null), 3500); }
}
