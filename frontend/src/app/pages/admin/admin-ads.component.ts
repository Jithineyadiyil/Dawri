import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { catchError, of } from 'rxjs';

interface AdPlacement {
  id: string;
  type: 'promoted_tournament' | 'in_grid_sponsor' | 'tournament_banner';
  title: string; title_ar: string | null; image_url: string | null;
  link_url: string | null; cta_label: string | null; brand_name: string | null;
  brand_color: string | null; tournament_id: string | null; is_active: boolean;
  sort_order: number; starts_at: string | null; ends_at: string | null;
  impression_count: number; click_count: number;
}

@Component({
  selector: 'app-admin-ads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="ads-page">
  <div class="ads-header">
    <div><h1 class="ads-title">Ad Placements</h1><p class="ads-sub">Manage sponsored content across the platform</p></div>
    <button class="btn-primary" (click)="onCreate()">+ New Placement</button>
  </div>

  @if (stats().length > 0) {
    <div class="stats-strip">
      @for (s of stats(); track s.type) {
        <div class="stat-card">
          <div class="stat-type">{{ getTypeLabel(s.type) }}</div>
          <div class="stat-row"><span class="stat-val">{{ s.impressions | number }}</span><span class="stat-lbl">impressions</span></div>
          <div class="stat-row"><span class="stat-val">{{ s.clicks | number }}</span><span class="stat-lbl">clicks</span></div>
          <div class="stat-ctr">CTR: {{ s.impressions > 0 ? ((s.clicks / s.impressions) * 100 | number:'1.1-1') : '0' }}%</div>
        </div>
      }
    </div>
  }

  <div class="type-guide">
    <div class="tg-item"><span class="tg-badge tg-badge--promoted">⭐ Promoted Tournament</span><p>Pins a tournament with a gold border.</p></div>
    <div class="tg-item"><span class="tg-badge tg-badge--ingrid">📦 In-Grid Sponsor</span><p>Sponsor card every 6th slot in the grid.</p></div>
    <div class="tg-item"><span class="tg-badge tg-badge--banner">🖼 Tournament Banner</span><p>Banner above bracket tabs on a tournament page.</p></div>
    <div class="tg-item"><span class="tg-badge tg-badge--sidebar">◀▶ Sidebar Ads</span><p>160px ads on left/right sides of all pages. Hidden for premium users.</p></div>
  </div>

  @if (loading()) {
    <div class="loading">Loading…</div>
  } @else if (placements().length === 0) {
    <div class="empty">
      <div class="empty-icon">📢</div>
      <h3>No ad placements yet</h3>
      <button class="btn-primary" (click)="onCreate()">Create first placement</button>
    </div>
  } @else {
    <div class="placements-list">
      @for (p of placements(); track p.id) {
        <div class="placement-row" [class.placement-row--inactive]="!p.is_active">
          <div class="placement-preview">
            @if (p.image_url) { <img [src]="p.image_url" [alt]="p.title"/> }
            @else { <div class="preview-placeholder" [style.background]="p.brand_color || '#1a2235'">{{ (p.brand_name || p.title).charAt(0) }}</div> }
          </div>
          <div class="placement-info">
            <div class="placement-title">{{ p.title }}</div>
            <div class="placement-meta">
              <span class="type-badge" [class]="'type-badge--' + p.type">{{ getTypeLabel(p.type) }}</span>
              @if (p.brand_name) { <span>{{ p.brand_name }}</span> }
              @if (!p.is_active) { <span class="paused-tag">Paused</span> }
            </div>
          </div>
          <div class="placement-stats">
            <div class="pstat"><span class="pstat-n">{{ p.impression_count | number }}</span><span class="pstat-l">views</span></div>
            <div class="pstat"><span class="pstat-n">{{ p.click_count | number }}</span><span class="pstat-l">clicks</span></div>
            <div class="pstat pstat--ctr"><span class="pstat-n">{{ p.impression_count > 0 ? ((p.click_count / p.impression_count) * 100 | number:'1.1-1') : '0' }}%</span><span class="pstat-l">CTR</span></div>
          </div>
          <div class="placement-actions">
            <button class="btn-toggle" [class.btn-toggle--on]="p.is_active" (click)="onToggle(p)">{{ p.is_active ? 'Live' : 'Paused' }}</button>
            <button class="btn-edit" (click)="onEdit(p)">Edit</button>
            <button class="btn-delete" (click)="onDelete(p)">Delete</button>
          </div>
        </div>
      }
    </div>
  }

  @if (showModal()) {
    <div class="modal-back" (click)="onCloseModal()"></div>
    <div class="modal" (click)="$event.stopPropagation()">
      <header class="modal-head">
        <h3>{{ editingId() ? 'Edit Placement' : 'New Ad Placement' }}</h3>
        <button (click)="onCloseModal()">✕</button>
      </header>
      <div class="modal-body">
        <div class="form-grid">
          <div class="field field--full">
            <label>Type *</label>
            <select [(ngModel)]="form.type">
              <option value="in_grid_sponsor">📦 In-Grid Sponsor Card</option>
              <option value="promoted_tournament">⭐ Promoted Tournament</option>
              <option value="tournament_banner">🖼 Tournament Banner</option>
              <option value="sidebar_left">◀ Left Sidebar Ad</option>
              <option value="sidebar_right">▶ Right Sidebar Ad</option>
            </select>
          </div>
          <div class="field"><label>Title *</label><input [(ngModel)]="form.title" placeholder="e.g. PSN Summer Sale"/></div>
          <div class="field"><label>Arabic Title</label><input [(ngModel)]="form.title_ar" dir="rtl" placeholder="العنوان"/></div>
          <div class="field field--full">
            <label>Banner Image</label>
            <div class="upload-row">
              <input class="upload-input" [(ngModel)]="form.image_url" placeholder="Paste image URL or upload below…"/>
              <label class="upload-btn" [class.upload-btn--loading]="uploading()">
                @if (uploading()) { ⏳ Uploading… }
                @else { 📁 Upload Image }
                <input type="file" accept="image/*" (change)="onFileSelect($event)" style="display:none"/>
              </label>
            </div>
            @if (form.image_url) { <img class="img-preview" [src]="form.image_url" alt="preview"/> }
          </div>
          <div class="field"><label>Link URL</label><input [(ngModel)]="form.link_url" placeholder="https://…"/></div>
          <div class="field"><label>CTA Label</label><input [(ngModel)]="form.cta_label" placeholder="Shop Now"/></div>
          <div class="field"><label>Brand Name</label><input [(ngModel)]="form.brand_name" placeholder="PlayStation"/></div>
          <div class="field"><label>Brand Colour</label><input type="color" [(ngModel)]="form.brand_color"/></div>
          @if (form.type === 'promoted_tournament' || form.type === 'tournament_banner') {
            <div class="field field--full"><label>Tournament ID (UUID)</label><input [(ngModel)]="form.tournament_id" placeholder="550e8400-…"/></div>
          }
          <div class="field"><label>Start Date</label><input type="datetime-local" [(ngModel)]="form.starts_at"/></div>
          <div class="field"><label>End Date</label><input type="datetime-local" [(ngModel)]="form.ends_at"/></div>
          <div class="field"><label>Sort Order</label><input type="number" [(ngModel)]="form.sort_order" min="0"/></div>
        </div>
        @if (formError()) { <p class="form-error">{{ formError() }}</p> }
      </div>
      <footer class="modal-foot">
        <button class="btn-ghost" (click)="onCloseModal()" [disabled]="saving()">Cancel</button>
        <button class="btn-primary" (click)="onSave()" [disabled]="saving()">{{ saving() ? 'Saving…' : (editingId() ? 'Save Changes' : 'Create') }}</button>
      </footer>
    </div>
  }

  @if (toastMsg()) { <div class="toast" [class.toast--ok]="toastOk()">{{ toastMsg() }}</div> }
</div>
  `,
  styles: [`
    .ads-page { padding: 32px; max-width: 1100px; margin: 0 auto; color: #fff; }
    .ads-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
    .ads-title { font-size: 32px; font-weight: 800; margin: 0; }
    .ads-sub { color: #6b7280; font-size: 13px; margin: 4px 0 0; }
    .btn-primary { padding: 10px 20px; background: #f0a500; border: none; border-radius: 8px; color: #0b1022; font-weight: 700; cursor: pointer; font-size: 14px; }
    .btn-ghost { padding: 10px 20px; background: transparent; border: 1px solid rgba(255,255,255,.15); border-radius: 8px; color: #9ca3af; cursor: pointer; }
    .stats-strip { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
    .stat-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 16px 20px; min-width: 160px; }
    .stat-type { font-size: 10px; color: #6b7280; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
    .stat-row { display: flex; align-items: baseline; gap: 6px; }
    .stat-val { font-size: 20px; font-weight: 700; }
    .stat-lbl { font-size: 11px; color: #6b7280; }
    .stat-ctr { font-size: 12px; color: #f0a500; margin-top: 4px; }
    .type-guide { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
    .tg-item { flex: 1; min-width: 180px; padding: 12px 14px; background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; }
    .tg-item p { font-size: 12px; color: #6b7280; margin: 6px 0 0; }
    .tg-badge { font-size: 11px; padding: 3px 8px; border-radius: 4px; }
    .tg-badge--promoted { background: rgba(240,165,0,.15); color: #f0a500; }
    .tg-badge--ingrid { background: rgba(88,101,242,.15); color: #818cf8; }
    .tg-badge--banner { background: rgba(16,185,129,.1); color: #10b981; }
    .tg-badge--sidebar { background: rgba(168,85,247,.1); color: #c084fc; }
    .placements-list { display: flex; flex-direction: column; gap: 8px; }
    .placement-row { display: grid; grid-template-columns: 64px 1fr auto auto; align-items: center; gap: 16px; padding: 16px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; }
    .placement-row--inactive { opacity: .5; }
    .placement-preview { width: 64px; height: 40px; border-radius: 6px; overflow: hidden; }
    .placement-preview img { width: 100%; height: 100%; object-fit: cover; }
    .preview-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }
    .placement-title { font-weight: 600; font-size: 14px; }
    .placement-meta { display: flex; gap: 8px; align-items: center; margin-top: 4px; font-size: 12px; color: #6b7280; }
    .type-badge { padding: 2px 8px; border-radius: 4px; font-size: 10px; font-family: monospace; text-transform: uppercase; }
    .type-badge--promoted_tournament { background: rgba(240,165,0,.15); color: #f0a500; }
    .type-badge--in_grid_sponsor { background: rgba(88,101,242,.15); color: #818cf8; }
    .type-badge--tournament_banner { background: rgba(16,185,129,.1); color: #10b981; }
    .paused-tag { color: #ef4444; font-size: 11px; }
    .placement-stats { display: flex; gap: 16px; }
    .pstat { display: flex; flex-direction: column; align-items: center; }
    .pstat-n { font-size: 15px; font-weight: 700; }
    .pstat-l { font-size: 10px; color: #6b7280; }
    .pstat--ctr .pstat-n { color: #f0a500; }
    .placement-actions { display: flex; gap: 8px; }
    .btn-toggle { padding: 5px 12px; border-radius: 6px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; background: rgba(255,255,255,.08); color: #6b7280; }
    .btn-toggle--on { background: rgba(16,185,129,.15); color: #10b981; }
    .btn-edit { padding: 5px 12px; background: transparent; border: 1px solid rgba(255,255,255,.15); border-radius: 6px; color: #9ca3af; font-size: 12px; cursor: pointer; }
    .btn-delete { padding: 5px 12px; background: transparent; border: 1px solid rgba(239,68,68,.25); border-radius: 6px; color: #ef4444; font-size: 12px; cursor: pointer; }
    .empty { text-align: center; padding: 60px 20px; color: #6b7280; }
    .empty-icon { font-size: 3rem; opacity: .4; margin-bottom: 12px; }
    .empty h3 { color: #9ca3af; margin: 0 0 16px; }
    .loading { text-align: center; padding: 40px; color: #6b7280; }
    .modal-back { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 500; }
    .modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 501; width: min(680px, calc(100vw - 32px)); max-height: 90vh; overflow-y: auto; background: #111827; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; }
    .modal-head { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,.08); }
    .modal-head h3 { margin: 0; font-size: 18px; }
    .modal-head button { background: none; border: none; color: #9ca3af; font-size: 18px; cursor: pointer; }
    .modal-body { padding: 20px 24px; }
    .modal-foot { display: flex; gap: 10px; justify-content: flex-end; padding: 16px 24px; border-top: 1px solid rgba(255,255,255,.08); }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field--full { grid-column: 1 / -1; }
    .field label { font-size: 12px; color: #9ca3af; font-family: monospace; letter-spacing: .5px; text-transform: uppercase; }
    .field input, .field select { padding: 10px 12px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; color: #fff; font-size: 14px; outline: none; }
    .field input[type=color] { padding: 4px; height: 40px; cursor: pointer; }
    .upload-row { display: flex; gap: 8px; }
    .upload-input { flex: 1; }
    .upload-btn { display: inline-flex; align-items: center; white-space: nowrap; padding: 10px 14px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.15); border-radius: 8px; color: #9ca3af; font-size: 13px; cursor: pointer; transition: all .15s; flex-shrink: 0; }
    .upload-btn:hover { background: rgba(255,255,255,.12); color: #fff; }
    .upload-btn--loading { opacity: .6; cursor: not-allowed; pointer-events: none; }
    .img-preview { width: 100%; max-height: 100px; object-fit: cover; border-radius: 6px; margin-top: 8px; border: 1px solid rgba(255,255,255,.1); }
    .form-error { color: #ef4444; font-size: 13px; margin-top: 8px; }
    .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; border-radius: 8px; font-size: 14px; z-index: 600; background: rgba(239,68,68,.15); color: #fca5a5; }
    .toast--ok { background: rgba(16,185,129,.15); color: #10b981; }
  `]
})
export class AdminAdsComponent implements OnInit {
  private api = inject(ApiService);
  readonly placements = signal<AdPlacement[]>([]);
  readonly stats      = signal<any[]>([]);
  readonly loading    = signal(true);
  readonly showModal  = signal(false);
  readonly editingId  = signal<string | null>(null);
  readonly saving     = signal(false);
  readonly formError  = signal<string | null>(null);
  readonly toastMsg   = signal<string | null>(null);
  readonly toastOk      = signal(true);
  readonly uploading    = signal(false);

  form = this.buildEmptyForm();

  ngOnInit(): void { this.loadPlacements(); this.loadStats(); }

  loadPlacements(): void {
    this.loading.set(true);
    this.api.adminGetAdPlacements().pipe(catchError(() => of({ data: [] }))).subscribe(r => {
      this.placements.set(r.data ?? []);
      this.loading.set(false);
    });
  }

  loadStats(): void {
    this.api.adminGetAdStats().pipe(catchError(() => of({ data: [] }))).subscribe(r => this.stats.set(r.data ?? []));
  }

  onCreate(): void { this.form = this.buildEmptyForm(); this.editingId.set(null); this.formError.set(null); this.showModal.set(true); }

  onEdit(p: AdPlacement): void {
    this.form = { type: p.type, title: p.title, title_ar: p.title_ar ?? '', image_url: p.image_url ?? '', link_url: p.link_url ?? '', cta_label: p.cta_label ?? '', brand_name: p.brand_name ?? '', brand_color: p.brand_color ?? '#f0a500', tournament_id: p.tournament_id ?? '', sort_order: p.sort_order, starts_at: p.starts_at?.slice(0,16) ?? '', ends_at: p.ends_at?.slice(0,16) ?? '' };
    this.editingId.set(p.id);
    this.formError.set(null);
    this.showModal.set(true);
  }

  onCloseModal(): void { this.showModal.set(false); }

  onSave(): void {
    if (!this.form.title) { this.formError.set('Title is required.'); return; }
    this.saving.set(true);
    const payload = { ...this.form, sort_order: Number(this.form.sort_order) };
    const req = this.editingId() ? this.api.adminUpdateAdPlacement(this.editingId()!, payload) : this.api.adminCreateAdPlacement(payload);
    req.pipe(catchError(err => { this.formError.set(err?.error?.message ?? 'Save failed.'); this.saving.set(false); return of(null); })).subscribe(r => {
      if (r) { this.saving.set(false); this.onCloseModal(); this.loadPlacements(); this.loadStats(); this.showToast('Saved!', true); }
    });
  }

  onToggle(p: AdPlacement): void {
    this.api.adminToggleAdPlacement(p.id).pipe(catchError(() => of(null))).subscribe(r => { if (r) this.loadPlacements(); });
  }

  onDelete(p: AdPlacement): void {
    if (!confirm('Delete "' + p.title + '"?')) return;
    this.api.adminDeleteAdPlacement(p.id).pipe(catchError(() => of(null))).subscribe(() => { this.loadPlacements(); this.showToast('Deleted.', true); });
  }

  getTypeLabel(type: string): string {
    const m: Record<string,string> = { promoted_tournament: '⭐ Promoted', in_grid_sponsor: '📦 In-Grid', tournament_banner: '🖼 Banner', sidebar_left: '◀ Left Sidebar', sidebar_right: '▶ Right Sidebar' };
    return m[type] ?? type;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input?.files?.[0];
    if (!file) return;
    this.uploading.set(true);
    this.api.uploadAdImage(file).subscribe({
      next: (r) => { this.form.image_url = r.url; this.uploading.set(false); },
      error: ()  => { this.uploading.set(false); alert('Upload failed. Check file size (max 5MB) and format.'); },
    });
  }

  private buildEmptyForm() {
    return { type: 'in_grid_sponsor' as 'promoted_tournament' | 'in_grid_sponsor' | 'tournament_banner' | 'sidebar_left' | 'sidebar_right', title: '', title_ar: '', image_url: '', link_url: '', cta_label: 'Learn More', brand_name: '', brand_color: '#f0a500', tournament_id: '', sort_order: 0, starts_at: '', ends_at: '' };
  }

  private showToast(msg: string, ok: boolean): void {
    this.toastMsg.set(msg); this.toastOk.set(ok);
    setTimeout(() => this.toastMsg.set(null), 3000);
  }
}
