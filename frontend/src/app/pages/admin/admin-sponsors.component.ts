import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/** Internal types — mirror backend resources. */
interface SponsorRow {
  id: string;
  name: string;
  name_ar: string | null;
  slug: string;
  tagline: string | null;
  logo_url: string | null;
  website_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  is_active: boolean;
  is_global?: boolean;   // Sprint 10
  created_by_user_id?: string | null;
}

interface SponsorshipRow {
  id: string;
  tournament_id: string;
  sponsor?: SponsorRow;
  placement_type: 'title' | 'presenting' | 'supporting';
  contribution_type: 'cash' | 'in_kind' | 'logo';
  cash_amount_sar: number;
  in_kind_description: string | null;
  in_kind_value_sar: number | null;
  contract_status: 'draft' | 'pending' | 'active' | 'fulfilled' | 'cancelled';
}

interface TournamentLite {
  id: string;
  name: string;
  game: string;
}

/**
 * AdminSponsorsComponent
 *
 * Two tabs:
 *   1. Sponsors — CRUD brand records
 *   2. Deals    — attach sponsors to tournaments, manage contract lifecycle
 *
 * Route: /admin/sponsors — gated by authGuard + admin role
 */
@Component({
  selector: 'app-admin-sponsors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-sponsors.component.html',
  styleUrls: ['./admin-sponsors.component.scss'],
})
export class AdminSponsorsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiAdmin = `${environment.apiUrl}/admin`;

  /* ── UI state ──────────────────────────────────────────────────── */
  readonly activeTab    = signal<'sponsors' | 'deals'>('sponsors');
  readonly loading      = signal(false);
  readonly toast        = signal<{ msg: string; ok: boolean } | null>(null);

  /* ── Sponsors tab ──────────────────────────────────────────────── */
  readonly sponsors     = signal<SponsorRow[]>([]);
  readonly showNewSponsor = signal(false);
  newSponsor: Partial<SponsorRow> = this.emptySponsor();

  /* ── Deals tab ─────────────────────────────────────────────────── */
  readonly sponsorships  = signal<SponsorshipRow[]>([]);
  readonly tournaments   = signal<TournamentLite[]>([]);
  readonly showNewDeal   = signal(false);
  newDeal = this.emptyDeal();

  /* Filtered list of ACTIVE sponsors for the deal dropdown */
  readonly activeSponsors = computed(() =>
    this.sponsors().filter((s) => s.is_active)
  );

  /* Pending count — drives the "N awaiting approval" chip in the header */
  readonly pendingCount = computed(() =>
    this.sponsorships().filter((d) => d.contract_status === 'pending').length
  );

  ngOnInit(): void {
    this.loadSponsors();
    this.loadSponsorships();
    this.loadTournaments();
  }

  /* ═══════════════════════════════════════════════════════════════
   *  Data loads
   * ═══════════════════════════════════════════════════════════════ */

  loadSponsors(): void {
    this.loading.set(true);
    this.http.get<{ data: SponsorRow[] }>(`${this.apiAdmin}/sponsors`).subscribe({
      next: (res) => { this.sponsors.set(res.data); this.loading.set(false); },
      error: () => { this.flash('Could not load sponsors', false); this.loading.set(false); },
    });
  }

  loadSponsorships(): void {
    this.http.get<{ data: SponsorshipRow[] }>(`${this.apiAdmin}/sponsorships`).subscribe({
      next: (res) => this.sponsorships.set(res.data),
      error: () => this.flash('Could not load sponsorships', false),
    });
  }

  loadTournaments(): void {
    this.http.get<{ data: TournamentLite[] }>(`${environment.apiUrl}/tournaments`).subscribe({
      next: (res) => this.tournaments.set(res.data),
      error: () => {/* non-critical */},
    });
  }

  /* ═══════════════════════════════════════════════════════════════
   *  Sponsors CRUD
   * ═══════════════════════════════════════════════════════════════ */

  saveSponsor(): void {
    if (!this.newSponsor.name?.trim()) {
      this.flash('Name is required', false); return;
    }
    this.http.post<{ data: SponsorRow }>(`${this.apiAdmin}/sponsors`, this.newSponsor).subscribe({
      next: () => {
        this.flash('Sponsor created', true);
        this.showNewSponsor.set(false);
        this.newSponsor = this.emptySponsor();
        this.loadSponsors();
      },
      error: (err) => this.flash(err.error?.message ?? 'Save failed', false),
    });
  }

  toggleSponsorActive(s: SponsorRow): void {
    this.http.patch(`${this.apiAdmin}/sponsors/${s.id}`, {
      ...s, is_active: !s.is_active,
    }).subscribe({
      next: () => { this.flash('Updated', true); this.loadSponsors(); },
      error: (err) => this.flash(err.error?.message ?? 'Update failed', false),
    });
  }

  /** Sprint 10: promote a scoped sponsor to the global catalog. */
  promoteSponsor(s: SponsorRow): void {
    if (!confirm(`Promote ${s.name} to the global catalog? Every organizer will then be able to use this sponsor.`)) return;

    this.http.post(`${this.apiAdmin}/sponsors/${s.id}/promote`, {}).subscribe({
      next: () => { this.flash(`${s.name} promoted to global`, true); this.loadSponsors(); },
      error: (err) => this.flash(err.error?.message ?? 'Promote failed', false),
    });
  }

  /* ═══════════════════════════════════════════════════════════════
   *  Sponsorships (deals) CRUD
   * ═══════════════════════════════════════════════════════════════ */

  saveDeal(): void {
    // Basic client-side validation
    if (!this.newDeal.tournament_id || !this.newDeal.sponsor_id) {
      this.flash('Tournament and sponsor are required', false); return;
    }
    if (this.newDeal.contribution_type === 'cash' && !(this.newDeal.cash_amount_sar > 0)) {
      this.flash('Cash amount must be positive', false); return;
    }
    if (this.newDeal.contribution_type === 'in_kind' && !this.newDeal.in_kind_description?.trim()) {
      this.flash('In-kind requires a description', false); return;
    }

    this.http.post<{ data: SponsorshipRow }>(`${this.apiAdmin}/sponsorships`, this.newDeal).subscribe({
      next: () => {
        this.flash('Deal created as draft', true);
        this.showNewDeal.set(false);
        this.newDeal = this.emptyDeal();
        this.loadSponsorships();
      },
      error: (err) => this.flash(err.error?.message ?? 'Save failed', false),
    });
  }

  transitionDeal(deal: SponsorshipRow, action: 'activate' | 'fulfill' | 'cancel' | 'approve' | 'reject'): void {
    // Ask for confirmation on destructive/important transitions.
    const confirmMessages: Record<string, string> = {
      cancel:  'Cancel this deal?',
      reject:  'Reject this pending proposal? The organizer will be notified.',
      approve: 'Approve this proposal and make it live on the tournament page?',
    };
    if (confirmMessages[action] && !confirm(confirmMessages[action])) return;

    this.http.post(`${this.apiAdmin}/sponsorships/${deal.id}/${action}`, {}).subscribe({
      next: () => { this.flash(`Deal ${action}${action.endsWith('e') ? 'd' : 'ed'}`, true); this.loadSponsorships(); },
      error: (err) => this.flash(err.error?.message ?? `${action} failed`, false),
    });
  }

  /* ═══════════════════════════════════════════════════════════════
   *  UI helpers
   * ═══════════════════════════════════════════════════════════════ */

  statusClass(s: string): string { return `status-${s}`; }

  tournamentName(id: string): string {
    return this.tournaments().find((t) => t.id === id)?.name ?? '—';
  }

  private flash(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3000);
  }

  private emptySponsor(): Partial<SponsorRow> {
    return {
      name: '', name_ar: null, tagline: null, logo_url: null, website_url: null,
      contact_name: null, contact_email: null, is_active: true,
    };
  }

  private emptyDeal(): {
    tournament_id: string;
    sponsor_id: string;
    placement_type: 'title' | 'presenting' | 'supporting';
    contribution_type: 'cash' | 'in_kind' | 'logo';
    cash_amount_sar: number;
    in_kind_description: string;
    in_kind_value_sar: number | null;
    notes: string;
  } {
    return {
      tournament_id: '', sponsor_id: '',
      placement_type: 'supporting',
      contribution_type: 'cash',
      cash_amount_sar: 0,
      in_kind_description: '',
      in_kind_value_sar: null,
      notes: '',
    };
  }
}
