import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type Tab = 'login' | 'register' | 'otp' | 'forgot' | 'reset' | 'forgot-sent';

@Component({
  selector: 'dw-auth', standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private readonly api    = inject(ApiService);
  private readonly auth   = inject(AuthService);
  private readonly toast  = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route  = inject(ActivatedRoute);
  private readonly fb     = inject(FormBuilder);

  readonly tab      = signal<Tab>('login');
  readonly loading  = signal(false);
  readonly errorMsg = signal('');

  // Password show/hide toggles
  readonly showLoginPw    = signal(false);
  readonly showRegPw      = signal(false);
  readonly showRegConfirm = signal(false);
  readonly showResetPw    = signal(false);
  readonly showResetConf  = signal(false);

  readonly loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  readonly registerForm = this.fb.group({
    name:                 ['', [Validators.required]],
    email:                ['', [Validators.required, Validators.email]],
    country_code:         ['+966'],
    phone_number:         ['', Validators.required],
    password:             ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation:['', Validators.required],
    terms:                [false, Validators.requiredTrue],
  });

  readonly otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  readonly forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly resetForm = this.fb.group({
    password:              ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
  });

  // Pre-filled from URL params when landing on /auth?token=...&email=...
  private resetToken = '';
  private resetEmail = '';

  readonly features = [
    { text: 'Join tournaments for EA FC 25, PUBG Mobile, and CoD Mobile' },
    { text: 'Win digital prizes — PSN, iTunes, PUBG UC and more' },
    { text: 'Track your ranking and full tournament history' },
    { text: 'Full Arabic RTL support and GCC regional coverage' },
  ];

  readonly countryCodes = [
    { code: '+966', flag: '🇸🇦', name: 'KSA' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+965', flag: '🇰🇼', name: 'KWT' },
    { code: '+974', flag: '🇶🇦', name: 'QAT' },
    { code: '+973', flag: '🇧🇭', name: 'BHR' },
    { code: '+968', flag: '🇴🇲', name: 'OMN' },
  ];

  constructor() {
    // Check for reset token in URL query params
    this.route.queryParams.subscribe(params => {
      if (params['token'] && params['email']) {
        this.resetToken = params['token'];
        this.resetEmail = params['email'];
        this.tab.set('reset');
      }
    });
  }

  setTab(t: Tab): void { this.tab.set(t); this.errorMsg.set(''); }

  // ── Login ─────────────────────────────────────────────────────────────
  login(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading.set(true); this.errorMsg.set('');
    const payload = {
      email:    this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.api.login(payload).subscribe({
      next: (res: any) => {
        const token = res?.data?.token ?? res?.token;
        const user  = res?.data?.user  ?? res?.user;
        if (!token || !user) { this.errorMsg.set('Unexpected response.'); this.loading.set(false); return; }
        this.auth.setSession(token, user); this.loading.set(false);
        this.toast.success('Welcome back, ' + user.name + '!');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.errorMsg.set(err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Invalid credentials.');
        this.loading.set(false);
      },
    });
  }

  // ── Register ──────────────────────────────────────────────────────────
  register(): void {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    const v = this.registerForm.value;
    const phone = (v.country_code ?? '+966') + (v.phone_number ?? '');
    this.loading.set(true); this.errorMsg.set('');
    this.api.register({
      name: v.name!, email: v.email!,
      password: v.password!, password_confirmation: v.password_confirmation!, phone
    }).subscribe({
      next: (res: any) => {
        const token = res?.data?.token ?? res?.token;
        const user  = res?.data?.user  ?? res?.user;
        if (token && user) this.auth.setSession(token, user);
        this.loading.set(false); this.setTab('otp');
        this.toast.info('Account created! Please verify your phone.');
      },
      error: (err: any) => {
        const ve = err.error?.errors;
        this.errorMsg.set(ve ? (Object.values(ve)[0] as string[])[0] : (err.error?.message ?? 'Registration failed.'));
        this.loading.set(false);
      },
    });
  }

  // ── OTP ───────────────────────────────────────────────────────────────
  verifyOtp(): void {
    if (this.otpForm.invalid) return;
    this.loading.set(true); this.errorMsg.set('');
    this.api.verifyOtp(this.otpForm.value.otp!).subscribe({
      next: (res: any) => {
        const user = res?.data?.user ?? res?.user;
        if (user) this.auth.updateUser(user);
        this.loading.set(false);
        this.toast.success('Phone verified! Welcome to Dawri.');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => { this.errorMsg.set(err.error?.message ?? 'Invalid OTP.'); this.loading.set(false); },
    });
  }

  resendOtp(): void {
    this.api.sendOtp().subscribe({
      next: () => this.toast.info('New OTP sent.'),
      error: () => this.toast.error('Failed to send OTP.'),
    });
  }

  // ── Forgot password ───────────────────────────────────────────────────
  forgotPassword(): void {
    if (this.forgotForm.invalid) { this.forgotForm.markAllAsTouched(); return; }
    this.loading.set(true); this.errorMsg.set('');
    this.api.forgotPassword(this.forgotForm.value.email!).subscribe({
      next: () => { this.loading.set(false); this.setTab('forgot-sent'); },
      error: (err: any) => {
        this.errorMsg.set(err.error?.message ?? 'Failed to send reset link.');
        this.loading.set(false);
      },
    });
  }

  // ── Reset password ────────────────────────────────────────────────────
  resetPassword(): void {
    if (this.resetForm.invalid) { this.resetForm.markAllAsTouched(); return; }
    this.loading.set(true); this.errorMsg.set('');
    this.api.resetPassword({
      token:                 this.resetToken,
      email:                 this.resetEmail,
      password:              this.resetForm.value.password!,
      password_confirmation: this.resetForm.value.password_confirmation!,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success('Password reset! Please sign in.');
        this.router.navigate(['/auth']);
        this.setTab('login');
      },
      error: (err: any) => {
        this.errorMsg.set(err.error?.message ?? 'Reset failed. The link may have expired.');
        this.loading.set(false);
      },
    });
  }
}
