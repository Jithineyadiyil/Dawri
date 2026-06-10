/**
 * Phase 6 — admin & safety panel (moderators+). A slide-in panel with three
 * tabs: edit community Rules, manage the blocked-word list (keyword
 * auto-moderation), and view the audit log. Self-contained: calls
 * CommunityService directly and holds its own local state.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';
import { CommunityStateService } from '../../services/community-state.service';
import { AuditEntry, BlockedWord, WordMode } from '../../models/community.model';

type Tab = 'rules' | 'words' | 'audit';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class.overlay]="!embedded" (click)="onBackdrop($event)">
      <aside [class.panel]="!embedded" [class.embedded-body]="embedded">
        <header class="ph" *ngIf="!embedded">
          <span class="title">Admin &amp; safety</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <nav class="tabs">
          <button [class.active]="tab() === 'rules'" (click)="tab.set('rules')">Rules</button>
          <button [class.active]="tab() === 'words'" (click)="switchTo('words')">Blocked words</button>
          <button [class.active]="tab() === 'audit'" (click)="switchTo('audit')">Audit log</button>
        </nav>

        <div class="body">
          <!-- RULES -->
          <section *ngIf="tab() === 'rules'">
            <p class="hint">Shown to members. Plain text — line breaks are kept.</p>
            <textarea class="rules-area" [(ngModel)]="rulesDraft" rows="12"
              placeholder="e.g.&#10;1. Be respectful.&#10;2. No spam or self-promotion.&#10;3. English or Arabic only."></textarea>
            <div class="actions">
              <button class="save" (click)="saveRules()" [disabled]="savingRules()">
                {{ savingRules() ? 'Saving…' : 'Save rules' }}
              </button>
              <span class="saved" *ngIf="rulesSaved()">Saved ✓</span>
            </div>
          </section>

          <!-- BLOCKED WORDS -->
          <section *ngIf="tab() === 'words'">
            <p class="hint">Messages containing a <b>block</b> word are rejected; <b>flag</b> words are allowed but logged.</p>
            <div class="add-row">
              <input class="f" [(ngModel)]="newWord" placeholder="word or phrase" maxlength="100"
                (keyup.enter)="addWord()" />
              <select class="f mode" [(ngModel)]="newMode">
                <option value="block">Block</option>
                <option value="flag">Flag</option>
              </select>
              <button class="mini" (click)="addWord()" [disabled]="!newWord.trim()">Add</button>
            </div>
            <p class="hint" *ngIf="words().length === 0 && !loadingWords()">No blocked words yet.</p>
            <div class="word" *ngFor="let w of words()">
              <span class="w-text">{{ w.word }}</span>
              <span class="w-mode" [class.flag]="w.mode === 'flag'">{{ w.mode }}</span>
              <button class="mini danger" (click)="removeWord(w.id)">Remove</button>
            </div>
          </section>

          <!-- AUDIT LOG -->
          <section *ngIf="tab() === 'audit'">
            <p class="hint">Recent moderation and admin actions.</p>
            <p class="hint" *ngIf="audit().length === 0 && !loadingAudit()">No activity yet.</p>
            <div class="entry" *ngFor="let e of audit()">
              <div class="e-line">
                <span class="e-action" [attr.data-action]="e.action">{{ label(e.action) }}</span>
                <span class="e-time">{{ e.created_at | date:'MMM d, h:mm a' }}</span>
              </div>
              <div class="e-detail">
                <span *ngIf="e.actor">{{ e.actor.nickname ?? 'Someone' }}</span>
                <span *ngIf="e.target"> → {{ e.target.nickname ?? 'a user' }}</span>
                <span class="e-meta" *ngIf="metaText(e)">· {{ metaText(e) }}</span>
              </div>
              <div class="e-actions" *ngIf="messageIdOf(e) as mid">
                <button class="mini" (click)="view(e)">View message</button>
                <button class="mini danger" *ngIf="!removed().has(mid)" (click)="remove(e)">Remove message</button>
                <span class="removed-tag" *ngIf="removed().has(mid)">removed ✓</span>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --accent-d: #06281c; --gold: #d4af37; --bg: #0b0b14; --surface: #14141f; --raised: #16161f; --line: rgba(255,255,255,0.09); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 960; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 480px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; animation: slide 0.18s ease-out; }
    @keyframes slide { from { transform: translateX(30px); opacity: 0; } to { transform: none; opacity: 1; } }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .tabs { display: flex; gap: 0.25rem; padding: 0.6rem 1.1rem 0; border-bottom: 1px solid var(--line); }
    .tabs button { background: none; border: none; border-bottom: 2px solid transparent; color: var(--mut); padding: 0.5rem 0.7rem; cursor: pointer; font-size: 0.85rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .tabs button.active { color: var(--accent); border-bottom-color: var(--accent); }
    .body { flex: 1; overflow-y: auto; padding: 1rem 1.1rem 2rem; min-height: 0; }
    .embedded-body { display: block; width: 100%; }
    .hint { color: var(--mut); font-size: 0.82rem; margin: 0 0 0.7rem; line-height: 1.5; }
    .rules-area, .f { width: 100%; background: var(--raised); border: 1px solid var(--line); border-radius: 8px; padding: 0.55rem 0.7rem; color: var(--text); font-family: 'Archivo', system-ui, sans-serif; font-size: 0.92rem; }
    .rules-area { resize: vertical; line-height: 1.5; }
    .rules-area:focus, .f:focus { outline: none; border-color: rgba(0,255,163,0.55); }
    .actions { display: flex; align-items: center; gap: 0.7rem; margin-top: 0.7rem; }
    .save { background: var(--accent); color: var(--accent-d); border: none; border-radius: 8px; padding: 0.5rem 1.1rem; font-weight: 700; cursor: pointer; }
    .save:disabled { opacity: 0.5; cursor: not-allowed; }
    .saved { color: var(--accent); font-size: 0.82rem; }
    .add-row { display: flex; gap: 0.4rem; margin-bottom: 0.8rem; }
    .add-row .f { flex: 1; }
    .add-row .mode { flex: 0 0 90px; }
    .mini { background: var(--raised); border: 1px solid var(--line); color: #cfcfe0; border-radius: 6px; padding: 0.3rem 0.7rem; font-size: 0.78rem; cursor: pointer; white-space: nowrap; }
    .mini:hover { border-color: var(--accent); color: var(--accent); }
    .mini:disabled { opacity: 0.5; cursor: not-allowed; }
    .mini.danger:hover { border-color: #ff6b6b; color: #ff6b6b; }
    .word { display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.6rem; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; margin-bottom: 0.4rem; }
    .w-text { flex: 1; color: var(--text); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.85rem; }
    .w-mode { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 0.1rem 0.45rem; border-radius: 999px; background: rgba(255,107,107,0.18); color: #ff8a8a; }
    .w-mode.flag { background: rgba(212,175,55,0.18); color: var(--gold); }
    .entry { padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .e-line { display: flex; align-items: center; justify-content: space-between; }
    .e-action { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', ui-monospace, monospace; color: var(--accent); }
    .e-action[data-action="ban"], .e-action[data-action="word_flagged"] { color: #ff8a8a; }
    .e-action[data-action="rules_updated"], .e-action[data-action="word_added"], .e-action[data-action="word_removed"] { color: var(--gold); }
    .e-time { font-size: 0.72rem; color: var(--mut); }
    .e-detail { font-size: 0.85rem; color: #cfcfe0; margin-top: 0.2rem; }
    .e-meta { color: var(--mut); }
    .e-actions { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.45rem; }
    .removed-tag { font-size: 0.74rem; color: var(--mut); font-style: italic; }
  `],
})
export class AdminPanelComponent implements OnInit {
  @Input({ required: true }) communityId!: string;
  @Input() embedded = false;
  @Output() close = new EventEmitter<void>();
  @Output() jumpToMessage = new EventEmitter<{ channelId: string; messageId: string }>();

  private readonly api = inject(CommunityService);
  private readonly state = inject(CommunityStateService);

  /** Message ids already removed in this session (to update the button). */
  readonly removed = signal<Set<string>>(new Set());

  readonly tab = signal<Tab>('rules');

  // Rules
  rulesDraft = '';
  readonly savingRules = signal(false);
  readonly rulesSaved  = signal(false);

  // Words
  readonly words        = signal<BlockedWord[]>([]);
  readonly loadingWords = signal(false);
  newWord = '';
  newMode: WordMode = 'block';

  // Audit
  readonly audit        = signal<AuditEntry[]>([]);
  readonly loadingAudit = signal(false);

  ngOnInit(): void {
    this.api.getRules(this.communityId).subscribe(r => (this.rulesDraft = r ?? ''));
  }

  switchTo(tab: Tab): void {
    this.tab.set(tab);
    if (tab === 'words' && this.words().length === 0) this.loadWords();
    if (tab === 'audit') this.loadAudit();
  }

  // ── Rules ──
  saveRules(): void {
    this.savingRules.set(true);
    this.rulesSaved.set(false);
    this.api.setRules(this.communityId, this.rulesDraft.trim() || null).subscribe({
      next: () => { this.savingRules.set(false); this.rulesSaved.set(true); setTimeout(() => this.rulesSaved.set(false), 1500); },
      error: () => this.savingRules.set(false),
    });
  }

  // ── Words ──
  private loadWords(): void {
    this.loadingWords.set(true);
    this.api.listBlockedWords(this.communityId).subscribe({
      next: list => { this.words.set(list); this.loadingWords.set(false); },
      error: () => this.loadingWords.set(false),
    });
  }

  addWord(): void {
    const w = this.newWord.trim();
    if (!w) return;
    this.api.addBlockedWord(this.communityId, w, this.newMode).subscribe(entry => {
      this.words.update(list => [...list.filter(x => x.id !== entry.id), entry].sort((a, b) => a.word.localeCompare(b.word)));
      this.newWord = '';
    });
  }

  removeWord(id: string): void {
    this.api.removeBlockedWord(this.communityId, id).subscribe(() => {
      this.words.update(list => list.filter(w => w.id !== id));
    });
  }

  // ── Audit ──
  private loadAudit(): void {
    this.loadingAudit.set(true);
    this.api.getAuditLog(this.communityId).subscribe({
      next: list => { this.audit.set(list); this.loadingAudit.set(false); },
      error: () => this.loadingAudit.set(false),
    });
  }

  label(action: string): string {
    const map: Record<string, string> = {
      mute: 'muted', unmute: 'unmuted', ban: 'banned', unban: 'unbanned',
      kick: 'removed', set_role: 'role changed',
      rules_updated: 'rules updated', policy_updated: 'join policy updated',
      word_added: 'word added', word_removed: 'word removed', word_flagged: 'message flagged',
    };
    return map[action] ?? action;
  }

  metaText(e: AuditEntry): string {
    if (!e.meta) return '';
    const m = e.meta as Record<string, unknown>;
    if (typeof m['word'] === 'string') return `"${m['word']}"`;
    if (typeof m['reason'] === 'string' && m['reason']) return String(m['reason']);
    if (typeof m['minutes'] === 'number') return `${m['minutes']} min`;
    if (typeof m['role'] === 'string') return String(m['role']);
    return '';
  }

  /** The flagged message id from an entry's meta, if present. */
  messageIdOf(e: AuditEntry): string | null {
    const m = (e.meta ?? {}) as Record<string, unknown>;
    return typeof m['message_id'] === 'string' ? m['message_id'] : null;
  }

  /** Channel id from an entry's meta, if present. */
  private channelIdOf(e: AuditEntry): string | null {
    const m = (e.meta ?? {}) as Record<string, unknown>;
    return typeof m['channel_id'] === 'string' ? m['channel_id'] : null;
  }

  /** Jump to the flagged message in its channel (closes the panel). */
  view(e: AuditEntry): void {
    const messageId = this.messageIdOf(e);
    const channelId = this.channelIdOf(e);
    if (messageId && channelId) {
      this.jumpToMessage.emit({ channelId, messageId });
    }
  }

  /** Remove (soft-delete) the flagged message. */
  remove(e: AuditEntry): void {
    const messageId = this.messageIdOf(e);
    const channelId = this.channelIdOf(e);
    if (!messageId || !channelId) return;
    if (!confirm('Remove this message? It will be deleted for everyone.')) return;
    this.state.deleteMessageById(channelId, messageId);
    this.removed.update(set => new Set(set).add(messageId));
  }

  onBackdrop(ev: MouseEvent): void {
    if (this.embedded) return;
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
