/**
 * Sprint 15 — Right-side member list. Groups by role.
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { CommunityMember, MemberRole, PresenceStatus } from '../../models/community.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="member-list">
      <section *ngFor="let group of groups()">
        <h4>{{ group.label }} — {{ group.members.length }}</h4>
        <ul>
          <li *ngFor="let m of group.members">
            <span class="dot" [class]="presence(m.user.id)"></span>
            <img *ngIf="m.user.avatar" [src]="m.user.avatar" [alt]="m.user.nickname ?? ''" />
            <span class="nick" [class.muted]="m.is_muted">{{ m.user.nickname ?? '—' }}</span>
            <span class="muted-flag" *ngIf="m.is_muted" title="Muted">🔇</span>
          </li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .member-list { padding: 0.75rem; font-size: 0.85rem; }
    section { margin-bottom: 1rem; }
    h4 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8b91b3; margin: 0 0 0.4rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.4rem; border-radius: 4px; }
    li:hover { background: #1a1f3a; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #4a5277; }
    .dot.online  { background: #43b581; }
    .dot.idle    { background: var(--gold, #f0a500); }
    .dot.offline { background: #4a5277; }
    img { width: 24px; height: 24px; border-radius: 50%; }
    .nick { flex: 1; color: #c8cbe0; }
    .nick.muted { opacity: 0.55; }
  `],
})
export class MemberListComponent {
  private readonly state = inject(CommunityStateService);

  readonly groups = computed(() => {
    const communityId = this.state.activeCommunityId();
    if (!communityId) return [];
    const members = this.state.membersByCommunity()[communityId] ?? [];
    const buckets: Record<MemberRole, CommunityMember[]> = { owner: [], admin: [], moderator: [], member: [] };
    for (const m of members) buckets[m.role].push(m);
    const labelMap: Record<MemberRole, string> = {
      owner: 'Owner', admin: 'Admins', moderator: 'Moderators', member: 'Members',
    };
    return (['owner', 'admin', 'moderator', 'member'] as MemberRole[])
      .filter(role => buckets[role].length > 0)
      .map(role => ({ label: labelMap[role], members: buckets[role] }));
  });

  presence(userId: string): PresenceStatus {
    return this.state.presenceByUser()[userId] ?? 'offline';
  }
}
