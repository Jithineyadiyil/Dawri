import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

interface UnlockToast {
  key: string;
  name: string;
  description: string;
  tier: string;
  icon: string;
  xp_reward: number;
}

/**
 * Polls the user's notifications every 30s, finds new `achievement_unlocked`
 * records, and renders a celebratory toast. Auto-marks the notification read
 * once the toast has been shown so it doesn't re-trigger.
 */
@Component({
  selector: 'app-achievement-unlock-watcher',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (t of toasts(); track t.key) {
      <div class="auw-toast" [attr.data-tier]="t.tier">
        <div class="auw-toast__sparkle"></div>
        <div class="auw-toast__icon">{{ iconFor(t.icon) }}</div>
        <div class="auw-toast__body">
          <div class="auw-toast__head">Achievement Unlocked!</div>
          <div class="auw-toast__name">{{ t.name }}</div>
          <div class="auw-toast__desc">{{ t.description }}</div>
          <div class="auw-toast__xp">+{{ t.xp_reward }} XP</div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      position: fixed; top: 5rem; right: 1.5rem; z-index: 9999;
      display: flex; flex-direction: column; gap: 0.75rem; pointer-events: none;
    }
    .auw-toast {
      display: flex; gap: 0.85rem; align-items: center;
      padding: 1rem 1.25rem; min-width: 320px; max-width: 380px;
      background: linear-gradient(135deg, rgba(11,16,34,0.95), rgba(0,108,53,0.85));
      border: 2px solid #d4af37; border-radius: 14px;
      box-shadow: 0 14px 40px rgba(0,0,0,0.55), 0 0 24px rgba(212,175,55,0.4);
      animation: auw-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both,
                 auw-out 0.4s ease 5.5s forwards;
      position: relative; overflow: hidden;
    }
    .auw-toast[data-tier="platinum"] { border-color: #2e8bff; box-shadow: 0 14px 40px rgba(0,0,0,0.6), 0 0 30px rgba(46,139,255,0.45); }
    .auw-toast[data-tier="gold"]     { border-color: #d4af37; }
    .auw-toast[data-tier="silver"]   { border-color: #c0c0c0; }
    .auw-toast[data-tier="bronze"]   { border-color: #cd7f32; }
    .auw-toast__sparkle {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 30%),
                  radial-gradient(circle at 80% 60%, rgba(212,175,55,0.4), transparent 35%);
      animation: auw-shine 2s ease-in-out infinite;
    }
    .auw-toast__icon {
      width: 54px; height: 54px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.9rem;
      background: rgba(212,175,55,0.18);
      flex-shrink: 0; z-index: 1;
    }
    .auw-toast__body { position: relative; z-index: 1; }
    .auw-toast__head { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: #d4af37; font-weight: 700; }
    .auw-toast__name { font-size: 1.1rem; font-weight: 800; color: #fff; margin-top: 0.1rem; }
    .auw-toast__desc { font-size: 0.78rem; opacity: 0.85; color: #fff; margin-top: 0.2rem; line-height: 1.3; }
    .auw-toast__xp   { font-size: 0.82rem; font-weight: 700; color: #d4af37; margin-top: 0.4rem; }
    @keyframes auw-pop {
      0% { transform: translateX(40px) scale(0.85); opacity: 0; }
      100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    @keyframes auw-out {
      to { transform: translateX(40px); opacity: 0; }
    }
    @keyframes auw-shine {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
  `],
})
export class AchievementUnlockWatcherComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private timer: any = null;
  private shown = new Set<string>();

  readonly toasts = signal<UnlockToast[]>([]);

  ngOnInit(): void {
    if (!this.auth.isLoggedIn?.()) return;
    this.tick();
    this.timer = setInterval(() => this.tick(), 30_000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private tick(): void {
    this.http.get<{ data: any[] }>(`${environment.apiUrl}/notifications?page=1`).subscribe({
      next: res => {
        const unlocks = (res.data ?? []).filter(n =>
          (n.data?.type === 'achievement_unlocked' || n.type?.includes('AchievementUnlocked'))
          && !n.read_at && !this.shown.has(n.id)
        );
        for (const n of unlocks) {
          const d = n.data ?? {};
          this.shown.add(n.id);
          this.push({
            key: d.key, name: d.name, description: d.description ?? '',
            tier: d.tier ?? 'bronze', icon: d.icon ?? 'trophy',
            xp_reward: d.xp_reward ?? 0,
          });
          this.http.post(`${environment.apiUrl}/notifications/${n.id}/read`, {}).subscribe({ error: () => {} });
        }
      },
      error: () => {},
    });
  }

  private push(t: UnlockToast): void {
    this.toasts.update(x => [...x, t]);
    setTimeout(() => this.toasts.update(x => x.filter(y => y.key !== t.key)), 6000);
  }

  iconFor(key: string): string {
    const map: Record<string, string> = {
      'trophy': '🏆', 'crown': '👑', 'flame': '🔥', 'sword': '⚔️', 'swords': '⚔️',
      'medal': '🥇', 'shield': '🛡️', 'star': '⭐', 'flag': '🚩',
      'crosshair': '🎯', 'user-plus': '🤝', 'users': '👥', 'users-round': '👥',
      'mic': '🎙️', 'shopping-bag': '🛍️', 'id-card': '🪪',
    };
    return map[key] ?? '🏅';
  }
}
