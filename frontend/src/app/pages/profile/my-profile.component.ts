import {
  ChangeDetectionStrategy, Component, OnInit, inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

const API = 'http://localhost:8001/api/v1';

export interface PlayerProfile {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  email: string;
  phone: string | null;
  role: string;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  game_username: string | null;
  psn_id: string | null;
  pubg_id: string | null;
  cod_id: string | null;
  preferred_games: string[] | null;
  status: string;
  subscription_plan: string;
  company_id: string | null;
  created_at: string;
}

/**
 * ProfileComponent — editable profile page at /profile/me.
 *
 * Fields:
 *   • Real name
 *   • Nickname (gamer tag) — shown on tournament brackets and leaderboards
 *   • Bio (short about-me)
 *   • Country / City
 *   • Game handles (PSN, PUBG, CoD) — optional, for result verification
 *   • Avatar — uploaded via dedicated endpoint, JPG/PNG/WEBP ≤2MB
 *
 * UX contract:
 *   Avatar is uploaded immediately on file select (separate endpoint).
 *   Text fields are saved via a single "Save Profile" button that sends
 *   only the dirty fields in a PATCH.
 */
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  private readonly http  = inject(HttpClient);
  private readonly fb    = inject(FormBuilder);
  readonly auth          = inject(AuthService);
  private readonly toast = inject(ToastService);

  readonly profile   = signal<PlayerProfile | null>(null);
  readonly loading   = signal(true);
  readonly saving    = signal(false);
  readonly uploading = signal(false);
  readonly error     = signal<string | null>(null);

  readonly form = this.fb.group({
    name:          ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    nickname:      ['', [Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9_]*$/)]],
    bio:           ['', [Validators.maxLength(500)]],
    country:       ['', [Validators.maxLength(50)]],
    city:          ['', [Validators.maxLength(50)]],
    psn_id:        ['', [Validators.maxLength(50)]],
    pubg_id:       ['', [Validators.maxLength(50)]],
    cod_id:        ['', [Validators.maxLength(50)]],
  });

  readonly bioLen       = computed(() => (this.form.value.bio ?? '').length);
  readonly nicknameTaken = signal(false);

  /** Letter used for avatar placeholder when no photo. */
  readonly avatarLetter = computed(() => {
    const p = this.profile();
    return (p?.display_name ?? p?.name ?? '?').charAt(0).toUpperCase();
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.loading.set(true);
    this.http.get<{ data: PlayerProfile }>(`${API}/profile/me`).subscribe({
      next: res => {
        const p = res.data;
        this.profile.set(p);
        this.form.patchValue({
          name:     p.name ?? '',
          nickname: p.nickname ?? '',
          bio:      p.bio ?? '',
          country:  p.country ?? '',
          city:     p.city ?? '',
          psn_id:   p.psn_id ?? '',
          pubg_id:  p.pubg_id ?? '',
          cod_id:   p.cod_id ?? '',
        });
        this.form.markAsPristine();
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.error?.message ?? 'Failed to load profile.');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    // Only send dirty fields — preserves server-side values on untouched inputs.
    const payload: Record<string, string | null> = {};
    for (const key of Object.keys(this.form.controls) as Array<keyof typeof this.form.controls>) {
      const ctrl: AbstractControl = this.form.controls[key];
      if (ctrl.dirty) {
        const v = ctrl.value;
        payload[key as string] = v === '' ? null : v;
      }
    }
    if (Object.keys(payload).length === 0) {
      this.toast.info('Nothing to save.');
      return;
    }

    this.saving.set(true);
    this.nicknameTaken.set(false);
    this.http.patch<{ message: string; data: PlayerProfile }>(`${API}/profile/me`, payload).subscribe({
      next: res => {
        this.profile.set(res.data);
        this.form.markAsPristine();
        this.saving.set(false);
        // Propagate name/nickname/avatar changes to the nav avatar + drawer label.
        this.syncAuth(res.data);
        this.toast.success('Profile saved.');
      },
      error: err => {
        this.saving.set(false);
        // 422 validation — surface nickname conflict specially.
        if (err.status === 422 && err.error?.errors?.nickname) {
          this.nicknameTaken.set(true);
          this.form.controls.nickname.setErrors({ taken: true });
        }
        this.toast.error(err.error?.message ?? 'Failed to save.');
      },
    });
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { this.toast.error('Avatar must be under 2MB.'); return; }

    const form = new FormData(); form.append('file', file);
    this.uploading.set(true);
    this.http.post<{ message: string; avatar_url: string }>(`${API}/profile/me/avatar`, form).subscribe({
      next: res => {
        this.uploading.set(false);
        const curr = this.profile();
        if (curr) {
          const next = { ...curr, avatar_url: res.avatar_url };
          this.profile.set(next);
          this.syncAuth(next);
        }
        this.toast.success('Avatar updated.');
      },
      error: err => {
        this.uploading.set(false);
        this.toast.error(err.error?.message ?? 'Upload failed.');
      },
    });
  }

  removeAvatar(): void {
    this.http.delete<{ message: string }>(`${API}/profile/me/avatar`).subscribe({
      next: () => {
        const curr = this.profile();
        if (curr) {
          const next = { ...curr, avatar_url: null };
          this.profile.set(next);
          this.syncAuth(next);
        }
        this.toast.success('Avatar removed.');
      },
      error: err => this.toast.error(err.error?.message ?? 'Failed.'),
    });
  }

  /**
   * Push relevant profile fields into the AuthService so the nav avatar
   * + drawer reflect changes immediately without a full reload.
   */
  private syncAuth(p: PlayerProfile): void {
    const u = this.auth.currentUser();
    if (!u) return;
    this.auth.updateUser({
      ...u,
      name:         p.name,
      nickname:     p.nickname,
      display_name: p.display_name,
      avatar_url:   p.avatar_url,
    });
  }
}
