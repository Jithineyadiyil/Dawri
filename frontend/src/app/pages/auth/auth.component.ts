import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type Tab = 'login' | 'register' | 'otp';

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
  private readonly fb     = inject(FormBuilder);

  readonly tab      = signal<Tab>('login');
  readonly loading  = signal(false);
  readonly errorMsg = signal('');

  readonly loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  readonly registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    country_code: ['+966'],
    phone_number: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });
  readonly otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  readonly features = [
    { icon: '🏆', text: 'Enter tournaments for EA FC 25, PUBG Mobile, and COD Mobile' },
    { icon: '🎁', text: 'Receive digital prizes — PSN, Apple, PUBG UC and more' },
    { icon: '📊', text: 'Track your ranking and tournament history' },
    { icon: '🌍', text: 'Full Arabic RTL support and GCC regional coverage' },
  ];

  setTab(t: Tab): void { this.tab.set(t); this.errorMsg.set(''); }

  login(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading.set(true); this.errorMsg.set('');
    this.api.login(this.loginForm.value as { email: string; password: string }).subscribe({
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

  register(): void {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    const v = this.registerForm.value;
    const phone = (v.country_code ?? '+966') + (v.phone_number ?? '');
    this.loading.set(true); this.errorMsg.set('');
    this.api.register({ name: v.name!, email: v.email!, password: v.password!, password_confirmation: v.password_confirmation!, phone }).subscribe({
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
}
