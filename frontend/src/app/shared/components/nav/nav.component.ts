import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav">
      <a routerLink="/" class="nav-logo" (click)="closeMenu()">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">DAWRI</span>
        <span class="logo-ar">داوري</span>
      </a>

      <div class="nav-links">
        <a routerLink="/tournaments" routerLinkActive="active" class="nav-link">Tournaments</a>
        <a routerLink="/marketplace" routerLinkActive="active" class="nav-link">Marketplace</a>
        <a routerLink="/leaderboard" routerLinkActive="active" class="nav-link">Leaderboard</a>
        <a routerLink="/pricing" routerLinkActive="active" class="nav-link">Pricing</a>
      </div>

      <div class="nav-actions">
        @if (auth.isLoggedIn()) {
          <a routerLink="/dashboard" class="nav-link nav-link--dash" routerLinkActive="active">Dashboard</a>
          @if (auth.currentUser()?.role === 'admin') {
            <a routerLink="/admin" class="nav-link nav-link--admin" routerLinkActive="active">Admin</a>
          }
          @if (auth.currentUser()?.role === 'organizer') {
            <a routerLink="/subscription" class="nav-link nav-link--sub" routerLinkActive="active">Plan</a>
          }
          <a routerLink="/dashboard" class="nav-avatar" [title]="auth.currentUser()?.name ?? ''">
            {{ (auth.currentUser()?.name ?? 'U')[0].toUpperCase() }}
          </a>
          <button class="btn-nav-ghost" (click)="logout()">Sign out</button>
        } @else {
          <a routerLink="/auth" class="btn-nav-ghost">Sign In</a>
          <a routerLink="/auth" class="btn-nav-gold">Join Free →</a>
        }
      </div>

      <button class="nav-burger" (click)="menuOpen.set(!menuOpen())" aria-label="Menu">☰</button>
    </nav>

    @if (menuOpen()) {
      <div class="nav-drawer" (click)="closeMenu()">
        <a routerLink="/tournaments" class="drawer-link">Tournaments</a>
        <a routerLink="/marketplace" class="drawer-link">Marketplace</a>
        <a routerLink="/leaderboard" class="drawer-link">Leaderboard</a>
        <a routerLink="/pricing" class="drawer-link">Pricing</a>
        @if (auth.isLoggedIn()) {
          <a routerLink="/dashboard" class="drawer-link">Dashboard</a>
          @if (auth.currentUser()?.role === 'admin') {
            <a routerLink="/admin" class="drawer-link drawer-link--admin">Admin Panel</a>
          }
          @if (auth.currentUser()?.role === 'organizer') {
            <a routerLink="/subscription" class="drawer-link">Manage Plan</a>
          }
          <button class="drawer-link" (click)="logout()">Sign out</button>
        } @else {
          <a routerLink="/auth" class="drawer-link">Sign In</a>
        }
      </div>
    }
  `,
  styles: [`
    .nav {
      position: sticky; top: 0; z-index: 200; height: 60px;
      display: flex; align-items: center; gap: 20px; padding: 0 32px;
      background: rgba(6,8,16,.95); backdrop-filter: blur(16px);
      border-bottom: 1px solid #1e2a3a;
    }
    .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-right: auto; }
    .logo-icon { font-size: 1.3rem; }
    .logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.1em; color: var(--gold, #f0a500); }
    .logo-ar { font-family: 'Noto Sans Arabic', sans-serif; font-size: 0.8rem; color: #8892a4; }

    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-link {
      font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.82rem;
      letter-spacing: 0.08em; color: #8892a4; text-transform: uppercase;
      text-decoration: none; padding: 6px 12px; border-radius: 6px; transition: all 0.15s;
    }
    .nav-link:hover, .nav-link.active { color: var(--gold, #f0a500); }
    .nav-link--dash { color: var(--cyan, #00e5ff); }
    .nav-link--dash.active { color: var(--cyan, #00e5ff); background: rgba(0,229,255,0.08); }
    .nav-link--admin { color: #a855f7; }
    .nav-link--admin.active { color: #a855f7; background: rgba(168,85,247,0.08); }
    .nav-link--sub { color: var(--gold, #f0a500); opacity: 0.7; }

    .nav-actions { display: flex; align-items: center; gap: 8px; }
    .nav-avatar {
      width: 32px; height: 32px; border-radius: 50%; background: var(--gold, #f0a500);
      color: #060810; font-weight: 700; font-size: 0.85rem;
      display: flex; align-items: center; justify-content: center; text-decoration: none;
    }
    .btn-nav-ghost {
      font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.78rem;
      letter-spacing: 0.08em; text-transform: uppercase; color: #8892a4;
      padding: 7px 16px; border: 1px solid #1e2a3a; border-radius: 6px;
      text-decoration: none; cursor: pointer; background: transparent; transition: all 0.15s;
    }
    .btn-nav-ghost:hover { border-color: var(--gold, #f0a500); color: var(--gold, #f0a500); }
    .btn-nav-gold {
      font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.78rem;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 7px 16px; border-radius: 6px; text-decoration: none;
      background: var(--gold, #f0a500); color: #060810; border: 1px solid var(--gold, #f0a500);
    }
    .btn-nav-gold:hover { opacity: 0.85; }

    .nav-burger {
      display: none; background: none; border: none; color: var(--gold, #f0a500);
      font-size: 1.4rem; cursor: pointer;
    }

    .nav-drawer {
      position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
      background: rgba(6,8,16,.97); z-index: 199;
      display: flex; flex-direction: column; padding: 2rem;
    }
    .drawer-link {
      font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem;
      letter-spacing: 0.06em; text-transform: uppercase; color: #c8cfd8;
      text-decoration: none; padding: 0.75rem 0; border-bottom: 1px solid #1e2a3a;
      background: none; border-left: none; border-right: none; border-top: none;
      cursor: pointer; text-align: left; width: 100%; display: block;
    }
    .drawer-link:hover { color: var(--gold, #f0a500); }
    .drawer-link--admin { color: #a855f7; }

    @media (max-width: 768px) {
      .nav-links, .nav-actions { display: none; }
      .nav-burger { display: block; }
    }
  `]
})
export class NavComponent {
  readonly auth     = inject(AuthService);
  readonly router   = inject(Router);
  readonly menuOpen = signal(false);

  logout(): void {
    this.auth.logout();
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
