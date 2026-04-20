import {
  Component, OnInit, signal, computed, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

const API = 'http://localhost:8001/api/v1';

interface Game {
  id: number; key: string; name: string; name_ar: string | null;
  icon_url: string | null; icon_emoji: string | null;
  platform: string | null; genre: string | null;
  supported_formats: string[]; is_active: boolean; sort_order: number;
}

@Component({
  selector: 'app-admin-games',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss'],
})
export class AdminGamesComponent implements OnInit {
  private http = inject(HttpClient);
  private fb   = inject(FormBuilder);

  games     = signal<Game[]>([]);
  loading   = signal(true);
  saving    = signal(false);
  deleting  = signal<number | null>(null);
  showModal = signal(false);
  editGame  = signal<Game | null>(null);
  search    = signal('');
  filter    = signal<'all'|'active'|'inactive'>('all');
  toast     = signal<{msg:string;ok:boolean}|null>(null);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return this.games().filter(g => {
      const matchQ = !q || g.name.toLowerCase().includes(q) || g.key.includes(q);
      const matchF = this.filter()==='all' ? true : this.filter()==='active' ? g.is_active : !g.is_active;
      return matchQ && matchF;
    });
  });

  form!: FormGroup;

  ngOnInit(): void { this.buildForm(); this.load(); }

  buildForm(): void {
    this.form = this.fb.group({
      key:        ['', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/)]],
      name:       ['', Validators.required],
      name_ar:    [''],
      icon_emoji: [''],
      icon_url:   [''],
      platform:   [''],
      genre:      [''],
      is_active:  [true],
      sort_order: [0],
      fmt_se: [true], fmt_de: [true], fmt_rr: [false], fmt_sw: [false],
    });
  }

  load(): void {
    this.loading.set(true);
    this.http.get<{data:Game[]}>(`${API}/games`).pipe(
      catchError(() => of({data:[]}))
    ).subscribe(r => { this.games.set(r.data); this.loading.set(false); });
  }

  openAdd(): void {
    this.editGame.set(null);
    this.form.reset({ is_active:true, sort_order:0, fmt_se:true, fmt_de:true, fmt_rr:false, fmt_sw:false });
    this.form.get('key')?.enable();
    this.showModal.set(true);
  }

  openEdit(g: Game): void {
    this.editGame.set(g);
    this.form.patchValue({
      key:g.key, name:g.name, name_ar:g.name_ar??'',
      icon_emoji:g.icon_emoji??'', icon_url:g.icon_url??'',
      platform:g.platform??'', genre:g.genre??'',
      is_active:g.is_active, sort_order:g.sort_order,
      fmt_se: g.supported_formats.includes('single_elimination'),
      fmt_de: g.supported_formats.includes('double_elimination'),
      fmt_rr: g.supported_formats.includes('round_robin'),
      fmt_sw: g.supported_formats.includes('swiss'),
    });
    this.form.get('key')?.disable(); // key locked after creation
    this.showModal.set(true);
  }

  closeModal(): void { this.showModal.set(false); this.form.get('key')?.enable(); }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const v = this.form.getRawValue();
    const formats: string[] = [
      ...(v.fmt_se ? ['single_elimination'] : []),
      ...(v.fmt_de ? ['double_elimination'] : []),
      ...(v.fmt_rr ? ['round_robin']        : []),
      ...(v.fmt_sw ? ['swiss']              : []),
    ];
    const payload = { key:v.key, name:v.name, name_ar:v.name_ar||null, icon_emoji:v.icon_emoji||null, icon_url:v.icon_url||null, platform:v.platform||null, genre:v.genre||null, supported_formats:formats, is_active:v.is_active, sort_order:+v.sort_order };
    const edit = this.editGame();
    const req$ = edit
      ? this.http.put<{data:Game}>(`${API}/admin/games/${edit.id}`, payload)
      : this.http.post<{data:Game}>(`${API}/admin/games`, payload);

    req$.pipe(catchError(err => {
      this.notify(err?.error?.message ?? 'Save failed.', false);
      this.saving.set(false);
      return of(null);
    })).subscribe(res => {
      if (!res) return;
      const g = res.data;
      this.games.update(gs => edit ? gs.map(x => x.id===g.id ? g : x) : [...gs, g]);
      this.saving.set(false);
      this.closeModal();
      this.notify(edit ? 'Game updated.' : 'Game added.', true);
    });
  }

  toggle(g: Game): void {
    this.http.patch<{data:Game}>(`${API}/admin/games/${g.id}/toggle`, {}).pipe(
      catchError(() => { this.notify('Toggle failed.', false); return of(null); })
    ).subscribe(res => {
      if (!res) return;
      this.games.update(gs => gs.map(x => x.id===res.data.id ? res.data : x));
      this.notify(`${res.data.name} ${res.data.is_active?'enabled':'disabled'}.`, true);
    });
  }

  delete(g: Game): void {
    if (!confirm(`Delete "${g.name}"? Existing tournaments won't be affected.`)) return;
    this.deleting.set(g.id);
    this.http.delete(`${API}/admin/games/${g.id}`).pipe(
      catchError(() => { this.notify('Delete failed.', false); this.deleting.set(null); return of(null); })
    ).subscribe(() => {
      this.games.update(gs => gs.filter(x => x.id !== g.id));
      this.deleting.set(null);
      this.notify(`${g.name} deleted.`, true);
    });
  }

  setSearch(e: Event): void { this.search.set((e.target as HTMLInputElement).value); }
  setFilter(f: 'all'|'active'|'inactive'): void { this.filter.set(f); }
  err(f: string): boolean { const c = this.form.get(f); return !!(c?.invalid && c.touched); }

  private notify(msg: string, ok: boolean): void {
    this.toast.set({msg, ok});
    setTimeout(() => this.toast.set(null), 3500);
  }
}
