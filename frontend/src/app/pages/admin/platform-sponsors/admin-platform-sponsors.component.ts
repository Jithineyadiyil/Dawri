import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface SponsorCatalogItem {
  id: string;
  name: string;
  name_ar: string | null;
  slug: string;
  logo_url: string | null;
}

interface PlatformSponsorshipRow {
  id: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_logo: string | null;
  sponsor_active: boolean;
  tier: 'title' | 'standard';
  display_order: number;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  is_currently_live: boolean;
  contract_value_sar: number | null;
  internal_notes: string | null;
  created_at: string;
}

interface FormShape {
  sponsor_id: string;
  tier: 'title' | 'standard';
  display_order: number;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  contract_value_sar: number | null;
  internal_notes: string;
}

/**
 * AdminPlatformSponsorsComponent
 *
 * Admin management of platform-level sponsorships. Lists current sponsorships,
 * lets admin add/edit/remove, and provides a quick-toggle pause button.
 */
@Component({
  selector: 'app-admin-platform-sponsors',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-platform-sponsors.component.html',
  styleUrls: ['./admin-platform-sponsors.component.scss'],
})
export class AdminPlatformSponsorsComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/platform-sponsorships';

  readonly rows    = signal<PlatformSponsorshipRow[]>([]);
  readonly catalog = signal<SponsorCatalogItem[]>([]);
  readonly loading = signal(true);
  readonly error   = signal<string | null>(null);

  readonly modalMode = signal<'create' | 'edit' | null>(null);
  readonly saving    = signal(false);
  readonly editingId = signal<string | null>(null);

  form: FormShape = this.freshForm();

  readonly liveCount    = computed(() => this.rows().filter(r => r.is_currently_live).length);
  readonly titleCount   = computed(() => this.rows().filter(r => r.tier === 'title' && r.is_currently_live).length);
  readonly pausedCount  = computed(() => this.rows().filter(r => !r.is_active).length);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: PlatformSponsorshipRow[]; catalog: SponsorCatalogItem[] }>(this.base)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (r) => {
          this.rows.set(r.data ?? []);
          this.catalog.set(r.catalog ?? []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message ?? 'Failed to load.');
          this.loading.set(false);
        },
      });
  }

  // ── Modal ────────────────────────────────────────────────────────

  openCreate(): void {
    this.form = this.freshForm();
    this.editingId.set(null);
    this.modalMode.set('create');
  }

  openEdit(row: PlatformSponsorshipRow): void {
    this.form = {
      sponsor_id:         row.sponsor_id,
      tier:               row.tier,
      display_order:      row.display_order,
      starts_at:          row.starts_at ? row.starts_at.substring(0, 10) : '',
      ends_at:            row.ends_at   ? row.ends_at.substring(0, 10)   : '',
      is_active:          row.is_active,
      contract_value_sar: row.contract_value_sar,
      internal_notes:     row.internal_notes ?? '',
    };
    this.editingId.set(row.id);
    this.modalMode.set('edit');
  }

  closeModal(): void {
    this.modalMode.set(null);
    this.editingId.set(null);
  }

  save(): void {
    if (this.saving()) return;
    if (!this.form.sponsor_id) {
      alert('Please pick a sponsor.');
      return;
    }
    const body: Record<string, any> = {
      sponsor_id:         this.form.sponsor_id,
      tier:               this.form.tier,
      display_order:      this.form.display_order,
      is_active:          this.form.is_active,
      contract_value_sar: this.form.contract_value_sar || null,
      internal_notes:     this.form.internal_notes || null,
    };
    if (this.form.starts_at) body['starts_at'] = this.form.starts_at;
    if (this.form.ends_at)   body['ends_at']   = this.form.ends_at;

    this.saving.set(true);
    const id = this.editingId();
    const req = id
      ? this.http.put<any>(`${this.base}/${id}`, body)
      : this.http.post<any>(this.base, body);

    req.subscribe({
      next: () => {
        this.saving.set(false);
        this.modalMode.set(null);
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message
          ?? Object.values(err?.error?.errors ?? {}).flat().join('\n')
          ?? 'Save failed.';
        alert(msg);
      },
    });
  }

  remove(row: PlatformSponsorshipRow): void {
    if (!confirm(`Remove ${row.sponsor_name} from platform sponsors?`)) return;
    this.http.delete(`${this.base}/${row.id}`).subscribe({
      next: () => this.load(),
      error: (err) => alert(err?.error?.message ?? 'Remove failed.'),
    });
  }

  toggle(row: PlatformSponsorshipRow): void {
    this.http.post(`${this.base}/${row.id}/toggle`, {}).subscribe({
      next: () => this.load(),
      error: (err) => alert(err?.error?.message ?? 'Toggle failed.'),
    });
  }

  private freshForm(): FormShape {
    return {
      sponsor_id:         '',
      tier:               'standard',
      display_order:      0,
      starts_at:          '',
      ends_at:            '',
      is_active:          true,
      contract_value_sar: null,
      internal_notes:     '',
    };
  }
}
