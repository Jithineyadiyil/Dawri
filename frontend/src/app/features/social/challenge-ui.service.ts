import { Injectable, signal } from '@angular/core';
import { ChallengeUser } from './challenge.service';

/**
 * ChallengeUiService — opens the global "create challenge" modal from any
 * surface (friend card, member list, profile). The modal is rendered once
 * in the nav so it's available everywhere.
 */
@Injectable({ providedIn: 'root' })
export class ChallengeUiService {
  readonly createFor = signal<ChallengeUser | null>(null);

  open(user: ChallengeUser): void { this.createFor.set(user); }
  close(): void { this.createFor.set(null); }
}
