import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Shape returned by GET /tournaments/{id}/sponsorships.
 * Mirrors SponsorshipService::summarizeForTournament() exactly.
 */
export interface TournamentSponsorSummary {
  total_cash_sar: number;
  total_in_kind_value_sar: number;
  total_pool_sar: number;
  title_sponsor: SponsorDisplay | null;
  presenting_sponsors: SponsorDisplay[];
  supporting_sponsors: SponsorDisplay[];
}

export interface SponsorDisplay {
  id: string;
  name: string;
  name_ar: string | null;
  logo_url: string | null;
  website_url: string | null;
  placement_type: 'title' | 'presenting' | 'supporting';
  contribution_type: 'cash' | 'in_kind' | 'logo';
  cash_amount_sar: number;
  in_kind_description: string | null;
}

/**
 * TournamentSponsorsComponent
 *
 * Drop-in widget for the tournament detail page that renders the three tiers
 * of active sponsors and the combined prize pool. Fetches its own data when
 * the tournamentId input changes; doesn't require the parent to pre-fetch.
 *
 * Usage:
 *   <app-tournament-sponsors [tournamentId]="tournament.id" />
 */
@Component({
  selector: 'app-tournament-sponsors',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournament-sponsors.component.html',
  styleUrls: ['./tournament-sponsors.component.scss'],
})
export class TournamentSponsorsComponent implements OnChanges {
  readonly tournamentId = input.required<string>();

  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly error   = signal<string | null>(null);
  readonly summary = signal<TournamentSponsorSummary | null>(null);

  /** True if any sponsor exists at any tier. Hides the whole widget otherwise. */
  readonly hasAnySponsor = computed(() => {
    const s = this.summary();
    if (!s) return false;
    return !!s.title_sponsor
      || s.presenting_sponsors.length > 0
      || s.supporting_sponsors.length > 0;
  });

  /** Pretty-formatted prize pool, e.g. "75,000 SAR" */
  readonly prizePoolLabel = computed(() => {
    const s = this.summary();
    if (!s || s.total_pool_sar <= 0) return null;
    return `${s.total_pool_sar.toLocaleString('en-US')} SAR`;
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tournamentId']) this.fetch();
  }

  private fetch(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<{ data: TournamentSponsorSummary }>(
        `${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships`,
      )
      .subscribe({
        next: (res) => {
          this.summary.set(res.data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load sponsors.');
          this.loading.set(false);
        },
      });
  }
}
