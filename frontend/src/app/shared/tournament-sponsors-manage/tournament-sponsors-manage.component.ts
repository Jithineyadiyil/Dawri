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
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/* ── API shapes ────────────────────────────────────────────────────── */

interface SponsorCatalogEntry {
  id: string;
  name: string;
  name_ar: string | null;
  logo_url: string | null;
  tagline: string | null;
  is_active: boolean;
}

interface SponsorshipRow {
  id: string;
  tournament_id: string;
  sponsor?: SponsorCatalogEntry;
  placement_type: 'title' | 'presenting' | 'supporting';
  contribution_type: 'cash' | 'in_kind' | 'logo';
  cash_amount_sar: number;
  in_kind_description: string | null;
  in_kind_value_sar: number | null;
  contract_status: 'draft' | 'pending' | 'active' | 'fulfilled' | 'cancelled';
}

/**
 * TournamentSponsorsManageComponent
 *
 * Embedded manager for tournament organizers to propose sponsorship deals
 * on their OWN tournaments. Rendered inline on the tournament detail page,
 * visible only to the organizer of that tournament or admins.
 *
 * Workflow:
 *   1. Organizer clicks "+ Propose sponsor" → form opens
 *   2. Picks sponsor from catalog, sets placement + contribution + amount
 *   3. Save → deal created with status='pending'
 *   4. Admin reviews in /admin/sponsors, approves → public on the page
 *
 * Organizers can withdraw their own pending proposals at any time.
 * Active/fulfilled deals require admin action to cancel.
 */
@Component({
  selector: 'app-tournament-sponsors-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournament-sponsors-manage.component.html',
  styleUrls: ['./tournament-sponsors-manage.component.scss'],
})
export class TournamentSponsorsManageComponent implements OnChanges {
  readonly tournamentId = input.required<string>();

  private readonly http = inject(HttpClient);

  readonly loading   = signal(true);
  readonly deals     = signal<SponsorshipRow[]>([]);
  readonly catalog   = signal<SponsorCatalogEntry[]>([]);
  readonly showForm  = signal(false);
  readonly saving    = signal(false);
  readonly toast     = signal<{ msg: string; ok: boolean } | null>(null);

  /* ── Form model ─────────────────────────────────────────────────── */
  newDeal = this.emptyDeal();

  /* Pending deals count for the header badge */
  readonly pendingCount = computed(() =>
    this.deals().filter(d => d.contract_status === 'pending').length
  );
  readonly activeCount = computed(() =>
    this.deals().filter(d => d.contract_status === 'active').length
  );

  ngOnChanges(ch: SimpleChanges): void {
    if (ch['tournamentId']) {
      this.loadDeals();
      this.loadCatalog();
    }
  }

  /* ── Data loads ─────────────────────────────────────────────────── */

  private loadDeals(): void {
    this.loading.set(true);
    this.http
      .get<{ data: SponsorshipRow[] }>(
        `${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage`
      )
      .subscribe({
        next: (res) => { this.deals.set(res.data); this.loading.set(false); },
        error: () => { this.flash('Could not load sponsorships', false); this.loading.set(false); },
      });
  }

  private loadCatalog(): void {
    this.http
      .get<{ data: SponsorCatalogEntry[] }>(`${environment.apiUrl}/sponsors-catalog`)
      .subscribe({
        next: (res) => this.catalog.set(res.data),
        error: () => {/* non-critical */},
      });
  }

  /* ── Form actions ───────────────────────────────────────────────── */

  openForm(): void {
    this.newDeal = this.emptyDeal();
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
  }

  saveDeal(): void {
    if (!this.newDeal.sponsor_id) { this.flash('Pick a sponsor', false); return; }

    if (this.newDeal.contribution_type === 'cash' && !(this.newDeal.cash_amount_sar > 0)) {
      this.flash('Cash amount must be positive', false); return;
    }
    if (this.newDeal.contribution_type === 'in_kind' && !this.newDeal.in_kind_description.trim()) {
      this.flash('In-kind requires a description', false); return;
    }

    this.saving.set(true);
    this.http
      .post<{ data: SponsorshipRow }>(
        `${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage`,
        this.newDeal
      )
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.showForm.set(false);
          this.flash('Proposal sent for admin review', true);
          this.loadDeals();
        },
        error: (err) => {
          this.saving.set(false);
          this.flash(err.error?.message ?? 'Could not submit proposal', false);
        },
      });
  }

  withdrawProposal(deal: SponsorshipRow): void {
    if (!confirm(`Withdraw proposal to sponsor ${deal.sponsor?.name ?? 'this deal'}?`)) return;

    this.http
      .delete(`${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage/${deal.id}`)
      .subscribe({
        next: () => { this.flash('Proposal withdrawn', true); this.loadDeals(); },
        error: (err) => this.flash(err.error?.message ?? 'Could not withdraw', false),
      });
  }

  /* ── Helpers ────────────────────────────────────────────────────── */

  statusClass(s: string): string { return `status-${s}`; }

  prettyStatus(s: string): string {
    const map: Record<string, string> = {
      draft: 'Draft', pending: 'Awaiting approval',
      active: 'Active', fulfilled: 'Fulfilled', cancelled: 'Cancelled',
    };
    return map[s] ?? s;
  }

  private flash(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3000);
  }

  private emptyDeal(): {
    sponsor_id: string;
    placement_type: 'title' | 'presenting' | 'supporting';
    contribution_type: 'cash' | 'in_kind' | 'logo';
    cash_amount_sar: number;
    in_kind_description: string;
    in_kind_value_sar: number | null;
    notes: string;
  } {
    return {
      sponsor_id: '',
      placement_type: 'supporting',
      contribution_type: 'cash',
      cash_amount_sar: 0,
      in_kind_description: '',
      in_kind_value_sar: null,
      notes: '',
    };
  }
}
