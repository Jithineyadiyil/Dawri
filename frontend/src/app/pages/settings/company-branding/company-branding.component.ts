import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy,
  inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { BrandingService } from '../../../core/services/branding.service';
import { ToastService } from '../../../core/services/toast.service';

const API = 'http://localhost:8001/api/v1';

interface CompanyBrandingDto {
  id: string;
  name: string;
  logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  background_color: string | null;
  font_family: string | null;
  has_branding: boolean;
}

/**
 * CompanyBrandingComponent — settings page at /settings/company-branding.
 *
 * Responsibilities:
 *   • Load the authenticated user's company record
 *   • Let them set primary/secondary/accent/background colors + font
 *   • Upload a logo (JPG/PNG/WEBP/SVG, ≤2MB)
 *   • Provide a live preview on the right side — changes the document's
 *     CSS custom properties so the entire app previews the brand while
 *     the user is here. On leaving, the brand is reset to platform defaults.
 */
@Component({
  selector: 'app-company-branding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company-branding.component.html',
  styleUrls: ['./company-branding.component.scss'],
})
export class CompanyBrandingComponent implements OnInit, OnDestroy {
  readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly fb   = inject(FormBuilder);
  private readonly brand = inject(BrandingService);
  private readonly toast = inject(ToastService);

  readonly loading  = signal(true);
  readonly saving   = signal(false);
  readonly uploading = signal(false);
  readonly company  = signal<CompanyBrandingDto | null>(null);
  readonly error    = signal<string | null>(null);

  readonly fontOptions = [
    { value: 'Bebas Neue, Rajdhani, sans-serif', label: 'Bebas Neue (default)' },
    { value: 'Rajdhani, sans-serif',             label: 'Rajdhani' },
    { value: 'Orbitron, sans-serif',             label: 'Orbitron (gaming)' },
    { value: 'Poppins, sans-serif',              label: 'Poppins (friendly)' },
    { value: 'Inter, sans-serif',                label: 'Inter' },
    { value: 'Cairo, sans-serif',                label: 'Cairo (Arabic)' },
    { value: 'Space Mono, monospace',            label: 'Space Mono' },
  ];

  readonly form = this.fb.group({
    primary_color:    ['#f0a500'],
    secondary_color:  ['#00e5ff'],
    accent_color:     ['#22c55e'],
    background_color: ['#0b1022'],
    font_family:      ['Bebas Neue, Rajdhani, sans-serif'],
  });

  ngOnInit(): void {
    this.http.get<{ data: CompanyBrandingDto | null }>(`${API}/companies/mine`).subscribe({
      next: res => {
        const c = res.data;
        if (c) {
          this.company.set(c);
          this.form.patchValue({
            primary_color:    c.primary_color    ?? '#f0a500',
            secondary_color:  c.secondary_color  ?? '#00e5ff',
            accent_color:     c.accent_color     ?? '#22c55e',
            background_color: c.background_color ?? '#0b1022',
            font_family:      c.font_family      ?? 'Bebas Neue, Rajdhani, sans-serif',
          });
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        if (err.status === 403) {
          this.error.set('Custom branding is available on Professional and Enterprise plans.');
        } else {
          this.error.set(err.error?.message ?? 'Failed to load company.');
        }
        this.loading.set(false);
      },
    });

    // Live preview — reflect form changes to CSS vars as the user tweaks.
    this.form.valueChanges.subscribe(v => {
      this.brand.apply({
        primary_color:    v.primary_color    ?? '',
        secondary_color:  v.secondary_color  ?? '',
        accent_color:     v.accent_color     ?? '',
        background_color: v.background_color ?? '',
        font_family:      v.font_family      ?? '',
        logo_url:         this.company()?.logo_url ?? null,
        source:           'company',
      });
    });
  }

  ngOnDestroy(): void {
    // Revert to platform defaults when leaving this page.
    this.brand.reset();
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.http.patch<{ message: string; data: CompanyBrandingDto }>(
      `${API}/companies/mine/brand`, this.form.value,
    ).subscribe({
      next: res => {
        this.saving.set(false);
        this.company.set(res.data);
        this.toast.success('Branding saved.');
      },
      error: (err: any) => {
        this.saving.set(false);
        this.toast.error(err.error?.message ?? 'Failed to save.');
      },
    });
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error('Logo must be under 2MB.'); return;
    }
    const form = new FormData();
    form.append('file', file);
    this.uploading.set(true);
    this.http.post<{ message: string; logo_url: string }>(
      `${API}/companies/mine/logo`, form,
    ).subscribe({
      next: res => {
        this.uploading.set(false);
        const curr = this.company();
        if (curr) { this.company.set({ ...curr, logo_url: res.logo_url }); }
        this.toast.success('Logo uploaded.');
      },
      error: (err: any) => {
        this.uploading.set(false);
        this.toast.error(err.error?.message ?? 'Upload failed.');
      },
    });
  }

  resetToDefaults(): void {
    this.form.patchValue({
      primary_color:    '#f0a500',
      secondary_color:  '#00e5ff',
      accent_color:     '#22c55e',
      background_color: '#0b1022',
      font_family:      'Bebas Neue, Rajdhani, sans-serif',
    });
  }
}
