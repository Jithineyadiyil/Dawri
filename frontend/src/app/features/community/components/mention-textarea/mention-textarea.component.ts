/**
 * Sprint 15 — Mention autocomplete (basic).
 *
 * v1 scope: detect "@" trigger, show matching members, replace token.
 * Full popover with arrow-key navigation is Sprint 16 polish.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';
import { CommunityMember } from '../../models/community.model';

@Component({
  selector: 'app-mention-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <textarea
        [(ngModel)]="value"
        (ngModelChange)="onInput($event)"
        (keydown)="onKey($event)"
        [placeholder]="placeholder"
        rows="1"
      ></textarea>
      <ul class="suggestions" *ngIf="suggestions().length > 0">
        <li *ngFor="let s of suggestions()" (click)="apply(s)">@{{ s.user.nickname }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .wrap { position: relative; flex: 1; }
    textarea { width: 100%; padding: 0.6rem; background: #0e1428; color: #e6e8f5; border: 1px solid #1a1f3a; border-radius: 6px; resize: none; }
    .suggestions {
      position: absolute; bottom: 100%; left: 0; right: 0;
      background: #060810; border: 1px solid #1a1f3a; border-radius: 6px;
      list-style: none; padding: 0.25rem; margin: 0;
      max-height: 160px; overflow-y: auto;
    }
    li { padding: 0.4rem 0.6rem; cursor: pointer; color: #c8cbe0; border-radius: 4px; }
    li:hover { background: #1a1f3a; color: var(--cyan, #00e5ff); }
  `],
})
export class MentionTextareaComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() submit      = new EventEmitter<void>();

  private readonly state = inject(CommunityStateService);

  readonly suggestions = signal<CommunityMember[]>([]);
  private currentMentionStart = -1;

  onInput(text: string): void {
    this.value = text;
    this.valueChange.emit(text);
    this.updateSuggestions(text);
  }

  onKey(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      this.submit.emit();
    } else if (ev.key === 'Escape') {
      this.suggestions.set([]);
    }
  }

  apply(member: CommunityMember): void {
    if (this.currentMentionStart < 0) return;
    const before = this.value.slice(0, this.currentMentionStart);
    const after  = this.value.slice(this.currentMentionStart).replace(/^@\S*/, `@${member.user.nickname} `);
    this.value = before + after;
    this.valueChange.emit(this.value);
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }

  private updateSuggestions(text: string): void {
    const match = /@(\w*)$/.exec(text);
    if (!match) {
      this.suggestions.set([]);
      this.currentMentionStart = -1;
      return;
    }
    this.currentMentionStart = match.index;
    const query = match[1].toLowerCase();
    const communityId = this.state.activeCommunityId();
    if (!communityId) return;
    const all = this.state.membersByCommunity()[communityId] ?? [];
    this.suggestions.set(
      all.filter(m => (m.user.nickname ?? '').toLowerCase().includes(query)).slice(0, 8)
    );
  }
}
