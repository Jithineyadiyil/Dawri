/**
 * Sprint 15 — Admin panel for community + channel management.
 * Routed at /community/admin. Admin-only via existing role guard.
 */
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
          <thead><tr><th>Channel</th><th>Type</th><th>Position</th><th></th></tr></thead>
          <tbody>
            <tr *ngFor="let ch of c.channels">
              <td>#{{ ch.name }}</td>
              <td>{{ ch.type }}</td>
              <td>{{ ch.position }}</td>
              <td><button (click)="archive(ch)" *ngIf="!ch.is_archived">Archive</button></td>
            </tr>
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
    .admin-wrap { padding: 2rem; color: #e6e8f5; }
    h2 { font-family: 'Bebas Neue', sans-serif; color: var(--gold, #f0a500); }
    section { margin-bottom: 2rem; padding: 1rem; background: #0e1428; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.5rem; border-bottom: 1px solid #1a1f3a; text-align: start; }
    .new-channel { margin-top: 1rem; display: flex; gap: 0.5rem; }
    input, select { padding: 0.5rem; background: #060810; color: #e6e8f5; border: 1px solid #1a1f3a; border-radius: 4px; }
    button { padding: 0.5rem 1rem; background: var(--cyan, #00e5ff); color: #060810; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
  `],
})
export class CommunityAdminComponent implements OnInit {
  private readonly state = inject(CommunityStateService);
  private readonly api   = inject(CommunityService);

  readonly communities = this.state.communities;
  newChannelName = '';
  newChannelType: 'text' | 'announcement' = 'text';

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

  archive(channel: Channel): void {
    if (!confirm(`Archive #${channel.name}? Messages remain visible.`)) return;
    this.api.archiveChannel(channel.id).subscribe(() => this.state.loadChannels(channel.community_id));
  }
}
