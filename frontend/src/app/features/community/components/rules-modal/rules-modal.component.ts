/**
 * Phase 6 — read-only community rules modal, shown to any member via a Rules
 * button (and surfaced on join). Fetches the rules text on open.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-rules-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onBackdrop($event)">
      <div class="card">
        <header class="ph">
          <span class="title">Community rules</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>
        <div class="content">
          <div class="loading" *ngIf="loading()">Loading…</div>
          <p class="empty" *ngIf="!loading() && !rules()">This community hasn't set any rules yet.</p>
          <pre class="rules" *ngIf="!loading() && rules()">{{ rules() }}</pre>
        </div>
        <footer class="pf">
          <button class="ok" (click)="close.emit()">Got it</button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --bg: #0b0a14; --surface: #161228; --raised: #1c1833; --line: rgba(124,58,237,0.18); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 970; background: rgba(0,0,0,0.6); display: grid; place-items: center; padding: 1.5rem; }
    @keyframes cardPop {
      0%   { transform: scale(.92) translateY(16px); opacity: 0; }
      60%  { transform: scale(1.02) translateY(-4px); opacity: 1; }
      100% { transform: scale(1) translateY(0); }
    }
    .card { width: 100%; max-width: 520px; max-height: 80vh; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; display: flex; flex-direction: column; box-shadow: 0 0 40px rgba(124,58,237,0.15); animation: cardPop .3s cubic-bezier(.34,1.56,.64,1) both; }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .content { padding: 1.1rem 1.2rem; overflow-y: auto; min-height: 0; }
    .loading, .empty { color: var(--mut); text-align: center; padding: 1.5rem 0; }
    .rules { margin: 0; color: #dcdce8; font-family: 'Archivo', system-ui, sans-serif; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
    .pf { padding: 0.9rem 1.2rem; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; }
    .ok { background: var(--accent); color: #fff; border: none; border-radius: 8px; padding: 0.5rem 1.3rem; font-weight: 700; cursor: pointer; transition: background 0.14s, box-shadow 0.14s; }
    .ok:hover { background: #6d28d9; box-shadow: 0 0 14px rgba(124,58,237,0.4); }
  `],
})
export class RulesModalComponent implements OnInit {
  @Input({ required: true }) communityId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly api = inject(CommunityService);

  readonly rules   = signal<string | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.api.getRules(this.communityId).subscribe({
      next: r => { this.rules.set(r); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onBackdrop(ev: MouseEvent): void {
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
