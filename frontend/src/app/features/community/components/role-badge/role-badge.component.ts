/**
 * Phase 7 — a small role badge (OWNER / ADMIN / MOD) shown next to a member's
 * name in the feed and member list. Renders nothing for regular members.
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRole } from '../../models/community.model';

@Component({
  selector: 'app-role-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" *ngIf="label()" [attr.data-role]="role">{{ label() }}</span>
  `,
  styles: [`
    .badge {
      display: inline-block; font-size: 0.6rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.06em;
      padding: 0.05rem 0.35rem; border-radius: 4px; vertical-align: middle;
      font-family: 'JetBrains Mono', ui-monospace, monospace; line-height: 1.4;
    }
    .badge[data-role="owner"] { background: rgba(212,175,55,0.18); color: #d4af37; }
    .badge[data-role="admin"] { background: rgba(255,107,107,0.18); color: #ff8a8a; }
    .badge[data-role="moderator"] { background: rgba(0,229,255,0.16); color: #00e5ff; }
  `],
})
export class RoleBadgeComponent {
  @Input() role: MemberRole | null = null;

  label(): string | null {
    switch (this.role) {
      case 'owner': return 'Owner';
      case 'admin': return 'Admin';
      case 'moderator': return 'Mod';
      default: return null; // regular members get no badge
    }
  }
}
