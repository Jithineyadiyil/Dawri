import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementRow, AchievementService } from './achievement.service';

@Component({
  selector: 'app-achievements-grid',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ach-wrap">
      <div class="ach-xp">
        <div class="ach-xp__level">
          <span class="ach-xp__lvl-num">{{ svc.xp().level }}</span>
          <span class="ach-xp__lvl-label">Level</span>
        </div>
        <div class="ach-xp__bar-block">
          <div class="ach-xp__bar"><span [style.width.%]="svc.progressPct()"></span></div>
          <div class="ach-xp__meta">
            <span>{{ svc.xp().total | number }} XP</span>
            <span>{{ (svc.xp().next_at - svc.xp().total) | number }} to next level</span>
          </div>
        </div>
        <div class="ach-xp__stats">
          <div><b>{{ svc.unlocked().length }}</b><span>Unlocked</span></div>
          <div><b>{{ svc.inProgress().length }}</b><span>In progress</span></div>
        </div>
      </div>

      @if (svc.loading()) {
        <p class="ach-empty">Loading achievements…</p>
      } @else {
        @if (svc.unlocked().length) {
          <h3 class="ach-title">Unlocked</h3>
          <div class="ach-grid">
            @for (a of svc.unlocked(); track a.key) {
              <div class="ach-card ach-card--unlocked" [attr.data-tier]="a.tier">
                <div class="ach-icon">{{ iconFor(a.icon) }}</div>
                <div class="ach-card__body">
                  <div class="ach-card__name">{{ a.name }}</div>
                  <div class="ach-card__desc">{{ a.description }}</div>
                  <div class="ach-card__xp">+{{ a.xp_reward }} XP · {{ a.tier }}</div>
                </div>
              </div>
            }
          </div>
        }

        @if (svc.inProgress().length) {
          <h3 class="ach-title">In progress</h3>
          <div class="ach-grid">
            @for (a of svc.inProgress(); track a.key) {
              <div class="ach-card ach-card--locked" [attr.data-tier]="a.tier">
                <div class="ach-icon">{{ iconFor(a.icon) }}</div>
                <div class="ach-card__body">
                  <div class="ach-card__name">{{ a.name }}</div>
                  <div class="ach-card__desc">{{ a.description }}</div>
                  <div class="ach-prog">
                    <div class="ach-prog__bar"><span [style.width.%]="pct(a)"></span></div>
                    <small>{{ a.progress }} / {{ a.threshold }}</small>
                  </div>
                </div>
              </div>
            }
          </div>
        }

        @if (!svc.unlocked().length && !svc.inProgress().length) {
          <p class="ach-empty">No achievements yet — go win a match!</p>
        }
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ach-wrap { padding: 1rem 0; }
    .ach-xp {
      display: flex; align-items: center; gap: 1.5rem;
      padding: 1rem 1.25rem; margin-bottom: 1.5rem;
      background: linear-gradient(135deg, rgba(0,108,53,0.18), rgba(212,175,55,0.12));
      border: 1px solid rgba(212,175,55,0.35); border-radius: 16px;
    }
    .ach-xp__level {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg, #006c35, #d4af37); color: #fff; flex-shrink: 0;
    }
    .ach-xp__lvl-num { font-size: 1.5rem; font-weight: 800; line-height: 1; }
    .ach-xp__lvl-label { font-size: 0.65rem; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
    .ach-xp__bar-block { flex: 1; }
    .ach-xp__bar {
      height: 10px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden;
    }
    .ach-xp__bar span {
      display: block; height: 100%;
      background: linear-gradient(90deg, #006c35, #d4af37);
      transition: width 0.6s ease;
    }
    .ach-xp__meta { display: flex; justify-content: space-between; font-size: 0.78rem; margin-top: 0.4rem; opacity: 0.85; }
    .ach-xp__stats { display: flex; gap: 1rem; }
    .ach-xp__stats > div { text-align: center; min-width: 64px; }
    .ach-xp__stats b { display: block; font-size: 1.3rem; font-weight: 700; }
    .ach-xp__stats span { font-size: 0.7rem; opacity: 0.75; text-transform: uppercase; }

    .ach-title { font-size: 1rem; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.9; margin: 1.25rem 0 0.75rem; }
    .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }

    .ach-card {
      display: flex; gap: 0.75rem; padding: 0.85rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px; transition: transform 0.15s ease;
    }
    .ach-card:hover { transform: translateY(-2px); }
    .ach-card--locked { opacity: 0.65; filter: grayscale(0.5); }
    .ach-card[data-tier="bronze"]   { border-color: rgba(205,127,50,0.5); }
    .ach-card[data-tier="silver"]   { border-color: rgba(192,192,192,0.55); }
    .ach-card[data-tier="gold"]     { border-color: rgba(212,175,55,0.65); box-shadow: 0 0 12px rgba(212,175,55,0.15); }
    .ach-card[data-tier="platinum"] { border-color: rgba(46,139,255,0.7); box-shadow: 0 0 18px rgba(46,139,255,0.18); }

    .ach-icon {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem;
      background: rgba(255,255,255,0.06);
      flex-shrink: 0;
    }
    .ach-card__body { flex: 1; min-width: 0; }
    .ach-card__name { font-weight: 700; font-size: 0.95rem; }
    .ach-card__desc { font-size: 0.78rem; opacity: 0.75; margin-top: 0.15rem; }
    .ach-card__xp { font-size: 0.7rem; margin-top: 0.4rem; color: #d4af37; text-transform: uppercase; letter-spacing: 0.5px; }

    .ach-prog { margin-top: 0.5rem; }
    .ach-prog__bar { height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; }
    .ach-prog__bar span { display: block; height: 100%; background: linear-gradient(90deg, #2e8bff, #d4af37); }
    .ach-prog small { font-size: 0.7rem; opacity: 0.7; }

    .ach-empty { text-align: center; padding: 2rem; opacity: 0.6; }
  `],
})
export class AchievementsGridComponent implements OnInit {
  readonly svc = inject(AchievementService);

  /** When provided, loads achievements for that user. Otherwise loads "mine". */
  readonly userId = input<string | null>(null);

  ngOnInit(): void {
    const uid = this.userId();
    if (uid) this.svc.loadForUser(uid);
    else this.svc.loadMine();
  }

  pct(a: AchievementRow): number {
    return Math.min(100, Math.round((a.progress / Math.max(1, a.threshold)) * 100));
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
