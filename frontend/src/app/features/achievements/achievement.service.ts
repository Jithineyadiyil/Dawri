import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type AchievementCategory =
  | 'tournament' | 'match' | 'streak' | 'social' | 'team' | 'marketplace' | 'milestone';

export interface AchievementRow {
  key: string;
  name: string;
  name_ar?: string | null;
  description: string;
  icon: string;
  tier: AchievementTier;
  category: AchievementCategory;
  xp_reward: number;
  progress: number;
  threshold: number;
  unlocked_at: string | null;
}

export interface XpSummary {
  total: number;
  level: number;
  next_at: number;
  current_at: number;
}

export interface AchievementPayload {
  unlocked: AchievementRow[];
  in_progress: AchievementRow[];
  xp: XpSummary;
}

@Injectable({ providedIn: 'root' })
export class AchievementService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  readonly unlocked = signal<AchievementRow[]>([]);
  readonly inProgress = signal<AchievementRow[]>([]);
  readonly xp = signal<XpSummary>({ total: 0, level: 1, next_at: 200, current_at: 100 });
  readonly loading = signal(false);

  readonly progressPct = computed(() => {
    const x = this.xp();
    const span = Math.max(1, x.next_at - x.current_at);
    return Math.min(100, Math.round(((x.total - x.current_at) / span) * 100));
  });

  loadMine() {
    this.loading.set(true);
    this.http.get<{ data: AchievementPayload }>(`${this.base}/me/achievements`).subscribe({
      next: r => {
        this.unlocked.set(r.data.unlocked ?? []);
        this.inProgress.set(r.data.in_progress ?? []);
        this.xp.set(r.data.xp);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadForUser(userId: string) {
    this.loading.set(true);
    this.http.get<{ data: AchievementPayload }>(`${this.base}/users/${userId}/achievements`).subscribe({
      next: r => {
        this.unlocked.set(r.data.unlocked ?? []);
        this.inProgress.set(r.data.in_progress ?? []);
        this.xp.set(r.data.xp);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
