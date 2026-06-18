/**
 * Sprint 15 — Admin panel for community + channel management.
 * Routed at /community/admin. Admin-only via existing role guard.
 * Adds inline channel editing (rename + change topic) alongside create/archive.
 */
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';
import { CommunityService } from '../../services/community.service';
import { Channel, Community } from '../../models/community.model';

@Component({
  selector: 'app-community-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-wrap">
      <h2>Community Administration</h2>

      <section *ngFor="let c of communities()">
        <h3>{{ c.name }} <small>({{ c.type }})</small></h3>
        <table class="channels">
          <thead><tr><th>Channel</th><th>Type</th><th>Topic</th><th>Position</th><th></th></tr></thead>
          <tbody>
            <ng-container *ngFor="let ch of c.channels">
              <!-- View row -->
              <tr *ngIf="editingId() !== ch.id">
                <td>#{{ ch.name }}</td>
                <td>{{ ch.type }}</td>
                <td class="topic-cell">{{ ch.topic || '—' }}</td>
                <td>{{ ch.position }}</td>
                <td class="row-actions">
                  <button class="ghost" (click)="startEdit(ch)">Edit</button>
                  <button class="ghost danger" (click)="archive(ch)" *ngIf="!ch.is_archived">Archive</button>
                </td>
              </tr>
              <!-- Edit row -->
              <tr *ngIf="editingId() === ch.id" class="edit-row">
                <td><input [(ngModel)]="editName" placeholder="channel-name" /></td>
                <td>{{ ch.type }}</td>
                <td><input [(ngModel)]="editTopic" placeholder="Channel topic" /></td>
                <td>{{ ch.position }}</td>
                <td class="row-actions">
                  <button (click)="saveEdit(ch)">Save</button>
                  <button class="ghost" (click)="cancelEdit()">Cancel</button>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>

        <div class="new-channel">
          <input [(ngModel)]="newChannelName" placeholder="new-channel-name" />
          <select [(ngModel)]="newChannelType">
            <option value="text">text</option>
            <option value="announcement">announcement</option>
          </select>
          <button (click)="addChannel(c)">Create channel</button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .admin-wrap { padding: 2rem; color: #eaeaf2; }
    h2 { font-family: 'Anton', 'Bebas Neue', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; color: #eaeaf2; }
    section { margin-bottom: 2rem; padding: 1rem; background: #110f1e; border: 1px solid rgba(124,58,237,0.15); border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.07); text-align: start; }
    .topic-cell { color: #7a7a92; }
    .row-actions { display: flex; gap: 0.5rem; }
    .edit-row input { width: 100%; }
    .new-channel { margin-top: 1rem; display: flex; gap: 0.5rem; }
    input, select { padding: 0.5rem; background: #07070d; color: #eaeaf2; border: 1px solid rgba(255,255,255,0.07); border-radius: 4px; }
    button { padding: 0.5rem 1rem; background: #7c3aed; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.14s; }
    button:hover { background: #6d28d9; }
    button.ghost { background: transparent; color: #7a7a92; padding: 0.5rem; }
    button.ghost:hover { color: #a78bfa; }
    button.ghost.danger:hover { color: #ff6b6b; }
  `],
})
export class CommunityAdminComponent implements OnInit {
  private readonly state = inject(CommunityStateService);
  private readonly api   = inject(CommunityService);

  readonly communities = this.state.communities;
  newChannelName = '';
  newChannelType: 'text' | 'announcement' = 'text';

  /** Which channel is currently being edited (by id), or null. */
  readonly editingId = signal<string | null>(null);
  editName = '';
  editTopic = '';

  ngOnInit(): void {
    this.state.loadCommunities();
  }

  addChannel(community: Community): void {
    if (!this.newChannelName) return;
    this.api.createChannel(community.id, {
      name: this.newChannelName,
      type: this.newChannelType,
    }).subscribe(() => {
      this.newChannelName = '';
      this.state.loadChannels(community.id);
    });
  }

  startEdit(channel: Channel): void {
    this.editName = channel.name;
    this.editTopic = channel.topic ?? '';
    this.editingId.set(channel.id);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editName = '';
    this.editTopic = '';
  }

  saveEdit(channel: Channel): void {
    const name = this.editName.trim();
    if (name.length === 0) return;
    this.api.updateChannel(channel.id, {
      name,
      topic: this.editTopic.trim(),
    }).subscribe(() => {
      this.editingId.set(null);
      this.state.loadChannels(channel.community_id);
    });
  }

  archive(channel: Channel): void {
    if (!confirm(`Archive #${channel.name}? Messages remain visible.`)) return;
    this.api.archiveChannel(channel.id).subscribe(() => this.state.loadChannels(channel.community_id));
  }
}
