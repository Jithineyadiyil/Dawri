import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PlayerProfileViewComponent } from '../../features/profile/player-profile-view.component';

/**
 * Public profile route — /players/:id.
 *
 * Thin shell over the unified PlayerProfileView. Self-profile lives at
 * /profile (MyProfileComponent) so this is always read-only.
 */
@Component({
  selector: 'dw-profile',
  standalone: true,
  imports: [CommonModule, PlayerProfileViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (userId(); as id) {
      <app-player-profile-view [userId]="id" mode="public" />
    } @else {
      <div style="padding:24px;text-align:center;color:#8a8aa0">Player not found.</div>
    }
  `,
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  readonly userId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );
}
