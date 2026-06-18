import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export type OrganizerTier = 'none' | 'verified' | 'professional' | 'admin';

export interface OrganizerCaps {
  tier: OrganizerTier;
  max_participants: number | null;
  can_charge_fees: boolean;
  can_feature: boolean;
  can_sponsor: boolean;
}

export interface OrganizerRequest {
  id: string;
  requested_tier: 'verified' | 'professional';
  status: 'pending' | 'approved' | 'rejected';
  legal_name: string;
  organization_name: string | null;
  country: string;
  city: string | null;
  website: string | null;
  phone: string | null;
  reason: string | null;
  decided_at: string | null;
  decision_note: string | null;
  created_at: string;
  user?: { id: string; display_name: string; avatar_url: string | null; organizer_tier: OrganizerTier } | null;
}

export interface OrganizerStatus {
  tier: OrganizerTier;
  caps: OrganizerCaps;
  pending: OrganizerRequest | null;
}

@Injectable({ providedIn: 'root' })
export class OrganizerVerificationService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  readonly status  = signal<OrganizerStatus | null>(null);
  readonly loading = signal(false);

  loadStatus(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.http.get<OrganizerStatus>(`${this.base}/me/organizer-status`).subscribe({
      next: (s) => { this.status.set(s); this.loading.set(false); },
      error: () => { this.loading.set(false); },
    });
  }

  apply(payload: Partial<OrganizerRequest> & {
    requested_tier: 'verified' | 'professional';
    legal_name: string; country: string;
  }): Observable<{ data: OrganizerRequest }> {
    return this.http.post<{ data: OrganizerRequest }>(`${this.base}/me/organizer-verification`, payload)
      .pipe(tap(() => this.loadStatus()));
  }

  // Admin
  listAdmin(status: 'pending' | 'approved' | 'rejected' | 'all' = 'pending'): Observable<{ data: OrganizerRequest[] }> {
    return this.http.get<{ data: OrganizerRequest[] }>(`${this.base}/admin/organizer-verifications`, { params: { status } });
  }
  approveAdmin(id: string, tier?: 'verified' | 'professional', note?: string): Observable<{ data: OrganizerRequest }> {
    return this.http.post<{ data: OrganizerRequest }>(`${this.base}/admin/organizer-verifications/${id}/approve`, { tier, note });
  }
  rejectAdmin(id: string, note?: string): Observable<{ data: OrganizerRequest }> {
    return this.http.post<{ data: OrganizerRequest }>(`${this.base}/admin/organizer-verifications/${id}/reject`, { note });
  }
}

export const TIER_LABELS: Record<OrganizerTier, string> = {
  none: 'Unverified',
  verified: 'Verified',
  professional: 'Professional',
  admin: 'Admin',
};
