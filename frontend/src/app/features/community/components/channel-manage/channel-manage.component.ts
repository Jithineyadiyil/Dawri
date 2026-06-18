/**
 * Phase 6c — channel management panel (moderators+). Create channels, edit a
 * channel's name/topic/type, and delete (archive) channels. Self-contained:
 * uses CommunityService for writes and refreshes via CommunityStateService.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';
import { CommunityStateService } from '../../services/community-state.service';
import { Channel, ChannelType } from '../../models/community.model';

@Component({
  selector: 'app-channel-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class.overlay]="!embedded" (click)="onBackdrop($event)">
      <aside [class.panel]="!embedded" [class.embedded-body]="embedded">
        <header class="ph" *ngIf="!embedded">
          <span class="title">Manage channels</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <div class="body" [class.flush]="embedded">
          <!-- Create -->
          <section class="block">
            <h4>Create a channel</h4>
            <div class="create">
              <input class="f" [(ngModel)]="newName" placeholder="channel-name" maxlength="60" />
              <select class="f type" [(ngModel)]="newType">
                <option value="text">Text</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <input class="f" [(ngModel)]="newTopic" placeholder="Topic (optional)" maxlength="200" />
            <p class="slug-hint" *ngIf="newName.trim()">
              Will be created as <code>#{{ slugPreview() }}</code>
            </p>
            <p class="create-err" *ngIf="createError()">⚠ {{ createError() }}</p>
            <div class="actions">
              <button class="create-btn" [disabled]="!newName.trim() || creating()" (click)="create()">
                {{ creating() ? 'Creating…' : '+ Create channel' }}
              </button>
            </div>
          </section>

          <!-- Existing -->
          <section class="block">
            <h4>Channels</h4>
            <div class="ch" *ngFor="let c of channels()">
              <ng-container *ngIf="editingId() !== c.id; else editRow">
                <span class="ch-hash">{{ c.type === 'announcement' ? '📢' : '#' }}</span>
                <div class="ch-info">
                  <span class="ch-name">{{ c.name }}</span>
                  <span class="ch-topic" *ngIf="c.topic">{{ c.topic }}</span>
                </div>
                <button class="mini" (click)="startEdit(c)">Edit</button>
                <button class="mini danger" (click)="remove(c)">Delete</button>
              </ng-container>
              <ng-template #editRow>
                <div class="edit-fields">
                  <input class="f" [(ngModel)]="editName" maxlength="60" placeholder="name" />
                  <input class="f" [(ngModel)]="editTopic" maxlength="200" placeholder="topic" />
                </div>
                <button class="mini ok" (click)="saveEdit(c)">Save</button>
                <button class="mini" (click)="cancelEdit()">Cancel</button>
              </ng-template>
            </div>
            <p class="hint" *ngIf="channels().length === 0">No channels yet.</p>
          </section>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --bg: #0b0a14; --surface: #161228; --raised: #1c1833; --line: rgba(124,58,237,0.15); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 960; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 460px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; animation: slide 0.18s ease-out; }
    @keyframes slide { from { transform: translateX(30px); opacity: 0; } to { transform: none; opacity: 1; } }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .body { flex: 1; overflow-y: auto; padding: 1rem 1.1rem 2rem; min-height: 0; }
    .embedded-body { display: block; width: 100%; }
    .body.flush { padding: 0.5rem 0 1rem; }
    .block { margin-bottom: 1.6rem; }
    h4 { margin: 0 0 0.6rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mut); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .hint { color: var(--mut); font-size: 0.85rem; }
    .create { display: flex; gap: 0.4rem; margin-bottom: 0.4rem; }
    .create .f { flex: 1; }
    .create .type { flex: 0 0 130px; }
    .f { width: 100%; background: var(--raised); border: 1px solid var(--line); border-radius: 8px; padding: 0.5rem 0.65rem; color: var(--text); font-family: 'Archivo', system-ui, sans-serif; font-size: 0.92rem; }
    .f:focus { outline: none; border-color: var(--accent); }
    .actions { margin-top: 0.5rem; display: flex; justify-content: flex-end; }
    .create-btn { background: var(--accent); color: #fff; border: none; border-radius: 8px; padding: 0.5rem 1rem; font-weight: 700; cursor: pointer; transition: background 0.14s, box-shadow 0.14s; }
    .create-btn:hover { background: #6d28d9; box-shadow: 0 0 14px rgba(124,58,237,0.4); }
    .create-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .slug-hint { font-size: 0.78rem; color: var(--mut); margin: 0.4rem 0 0; }
    .slug-hint code { color: var(--accent-s); background: rgba(124,58,237,0.1); padding: 0.05rem 0.3rem; border-radius: 4px; }
    .create-err { font-size: 0.82rem; color: #ff8a8a; margin: 0.4rem 0 0; }
    .ch { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.6rem; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; margin-bottom: 0.4rem; }
    .ch-hash { opacity: 0.7; }
    .ch-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .ch-name { color: var(--text); font-weight: 600; }
    .ch-topic { font-size: 0.78rem; color: var(--mut); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .edit-fields { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
    .mini { background: var(--raised); border: 1px solid var(--line); color: #cfcfe0; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.76rem; cursor: pointer; white-space: nowrap; }
    .mini:hover { border-color: var(--accent); color: var(--accent-s); }
    .mini.ok:hover { border-color: var(--accent); color: var(--accent-s); }
    .mini.danger:hover { border-color: #ff6b6b; color: #ff6b6b; }
  `],
})
export class ChannelManageComponent {
  @Input({ required: true }) communityId!: string;
  @Input() embedded = false;
  @Output() close = new EventEmitter<void>();

  private readonly api = inject(CommunityService);
  private readonly state = inject(CommunityStateService);

  readonly channels = computed<Channel[]>(() =>
    this.state.channelsByCommunity()[this.communityId] ?? []
  );

  // Create
  newName = '';
  newTopic = '';
  newType: ChannelType = 'text';
  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  // Edit
  readonly editingId = signal<string | null>(null);
  editName = '';
  editTopic = '';

  create(): void {
    const name = this.slugify(this.newName);
    if (!name || name.length < 2) {
      this.createError.set('Name must be at least 2 letters/numbers.');
      return;
    }
    this.createError.set(null);
    this.creating.set(true);
    this.api.createChannel(this.communityId, {
      name,
      topic: this.newTopic.trim() || null,
      type: this.newType,
    }).subscribe({
      next: () => {
        this.newName = '';
        this.newTopic = '';
        this.newType = 'text';
        this.creating.set(false);
        this.state.loadChannels(this.communityId);
      },
      error: (err) => {
        this.creating.set(false);
        const msg = err?.error?.errors?.name?.[0]
          ?? err?.error?.message
          ?? 'Could not create the channel.';
        this.createError.set(msg);
      },
    });
  }

  /** Convert free text into a valid channel slug (lowercase, hyphens). */
  private slugify(input: string): string {
    return (input ?? '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → hyphen
      .replace(/^-+|-+$/g, '')        // trim leading/trailing hyphens
      .slice(0, 80);
  }

  /** Live preview of the slug as the user types. */
  slugPreview(): string {
    return this.slugify(this.newName);
  }

  startEdit(c: Channel): void {
    this.editingId.set(c.id);
    this.editName = c.name;
    this.editTopic = c.topic ?? '';
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  saveEdit(c: Channel): void {
    const name = this.slugify(this.editName);
    if (!name || name.length < 2) return;
    this.api.updateChannel(c.id, { name, topic: this.editTopic.trim() || null }).subscribe(() => {
      this.editingId.set(null);
      this.state.loadChannels(this.communityId);
    });
  }

  remove(c: Channel): void {
    if (!confirm(`Delete #${c.name}? Its messages will no longer be accessible.`)) return;
    this.api.archiveChannel(c.id).subscribe(() => this.state.loadChannels(this.communityId));
  }

  onBackdrop(ev: MouseEvent): void {
    if (this.embedded) return;
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
