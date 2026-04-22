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
  is_global?: boolean;   // Sprint 10 — scoped sponsors show "Private" pill
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

  /* Sprint 10: inline sponsor creation state */
  readonly showCreateSponsor = signal(false);
  readonly creatingSponsor   = signal(false);
  readonly uploadingLogo     = signal(false);
  readonly logoFile          = signal<File | null>(null);
  readonly logoPreviewUrl    = signal<string | null>(null);
  /** Validation + server errors for the create modal. Null = no error showing. */
  readonly createError       = signal<{ message: string; fields: Record<string, string> } | null>(null);
  newSponsor = this.emptySponsor();

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

  /* ═══════════════════════════════════════════════════════════════
   *  Sprint 10 — Inline sponsor creation + logo upload
   * ═══════════════════════════════════════════════════════════════ */

  openCreateSponsor(): void {
    this.newSponsor = this.emptySponsor();
    this.logoFile.set(null);
    this.logoPreviewUrl.set(null);
    this.createError.set(null);
    this.showCreateSponsor.set(true);
  }

  cancelCreateSponsor(): void {
    this.showCreateSponsor.set(false);
  }

  /** Handle <input type="file"> change. Validates size and type client-side. */
  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0] ?? null;
    if (!file) { this.logoFile.set(null); this.logoPreviewUrl.set(null); return; }

    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.flash('Logo must be PNG, JPG, SVG, or WebP', false);
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.flash('Logo must be 2 MB or smaller', false);
      input.value = '';
      return;
    }

    this.logoFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.logoPreviewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  /**
   * Create the sponsor, then upload its logo (if one was chosen), then
   * refresh the catalog and auto-select the new entry in the deal form.
   */
  saveNewSponsor(): void {
    this.createError.set(null);

    if (!this.newSponsor.name.trim()) {
      this.createError.set({ message: 'Brand name is required.', fields: { name: 'Required' } });
      return;
    }

    // Auto-prepend https:// if the user typed a bare domain. Saves them
    // the validation round-trip for a really common mistake.
    if (this.newSponsor.website_url && !/^https?:\/\//i.test(this.newSponsor.website_url)) {
      this.newSponsor.website_url = 'https://' + this.newSponsor.website_url.trim();
    }

    this.creatingSponsor.set(true);
    this.http
      .post<{ data: SponsorCatalogEntry }>(`${environment.apiUrl}/sponsors`, this.newSponsor)
      .subscribe({
        next: (res) => {
          const created = res.data;
          if (this.logoFile()) {
            this.uploadLogoFor(created.id, () => this.onSponsorCreated(created));
          } else {
            this.onSponsorCreated(created);
          }
        },
        error: (err) => {
          this.creatingSponsor.set(false);
          this.applyServerError(err);
        },
      });
  }

  /**
   * Parse a Laravel error response and render inline in the modal.
   * Handles 422 (validation), 403 (authz), 500 (server), and network errors.
   */
  private applyServerError(err: unknown): void {
    const e = err as { status?: number; error?: { message?: string; errors?: Record<string, string[]> } };
    const fields: Record<string, string> = {};

    if (e.error?.errors) {
      for (const [key, msgs] of Object.entries(e.error.errors)) {
        fields[key] = Array.isArray(msgs) ? msgs[0] : String(msgs);
      }
    }

    const topMessage =
      e.error?.message ??
      (e.status === 0       ? 'Cannot reach the server. Check your connection.'
      : e.status === 403    ? 'You are not authorized to create sponsors.'
      : e.status === 500    ? 'Server error. Please try again or contact support.'
      : 'Could not create sponsor.');

    this.createError.set({ message: topMessage, fields });
  }

  private uploadLogoFor(sponsorId: string, done: () => void): void {
    const file = this.logoFile();
    if (!file) { done(); return; }

    this.uploadingLogo.set(true);
    const fd = new FormData();
    fd.append('logo', file);

    this.http
      .post(`${environment.apiUrl}/sponsors/${sponsorId}/logo`, fd)
      .subscribe({
        next: () => { this.uploadingLogo.set(false); done(); },
        error: () => {
          // Sponsor was created but logo failed — still proceed, flash a warning
          this.uploadingLogo.set(false);
          this.flash('Sponsor created but logo upload failed. You can retry later.', false);
          done();
        },
      });
  }

  private onSponsorCreated(created: SponsorCatalogEntry): void {
    this.creatingSponsor.set(false);
    this.flash('Sponsor created. Now set up the deal.', true);
    this.showCreateSponsor.set(false);
    this.loadCatalog();
    // Auto-select the newly-created sponsor in the deal form
    this.newDeal.sponsor_id = created.id;
  }

  private emptySponsor(): {
    name: string;
    name_ar: string | null;
    tagline: string | null;
    website_url: string | null;
    contact_name: string | null;
    contact_email: string | null;
  } {
    return {
      name: '', name_ar: null, tagline: null,
      website_url: null, contact_name: null, contact_email: null,
    };
  }
}
