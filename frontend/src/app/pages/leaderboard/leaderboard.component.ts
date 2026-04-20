import {
  Component, OnInit, signal, computed, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { ApiService, LeaderboardEntry } from '../../core/services/api.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  private api = inject(ApiService);

  games = [
    { key: 'ea_fc',       label: 'EA FC 25',    icon: '⚽' },
    { key: 'pubg_mobile', label: 'PUBG Mobile',  icon: '🎯' },
    { key: 'cod_mobile',  label: 'Call of Duty', icon: '💀' },
    { key: 'valorant',    label: 'Valorant',      icon: '🔫' },
    { key: 'fortnite',    label: 'Fortnite',      icon: '🏗️' },
  ];

  activeGame    = signal<string>('ea_fc');
  entries       = signal<LeaderboardEntry[]>([]);
  loading       = signal(true);
  error         = signal<string | null>(null);
  highlightedId = signal<string | null>(null);

  top3 = computed(() => this.entries().slice(0, 3));
  rest = computed(() => this.entries().slice(3));
  podiumOrder = [1, 0, 2];

  ngOnInit(): void { this.load(); }

  selectGame(key: string): void { this.activeGame.set(key); this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.entries.set([]);

    this.api.getLeaderboard(this.activeGame(), 50).pipe(
      // Any API error (404, 500, network) = no rankings yet — show empty state
      catchError(() => of({ data: [] as LeaderboardEntry[] }))
    ).subscribe(res => {
      this.entries.set(res.data ?? []);
      this.loading.set(false);
    });
  }

  highlight(id: string): void { this.highlightedId.set(id); }
  unhighlight(): void         { this.highlightedId.set(null); }

  trackById(_: number, e: LeaderboardEntry): string { return e.user_id; }

  winRate(e: LeaderboardEntry): string {
    const total = e.wins + e.losses;
    return total === 0 ? '—' : Math.round((e.wins / total) * 100) + '%';
  }
}
