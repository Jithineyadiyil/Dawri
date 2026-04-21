import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * ContactComponent — public "Contact Us" page.
 *
 * Renders a bilingual (EN + AR) contact form alongside Dawri's physical
 * coordinates (HQ, support email, social handles, working hours).
 *
 * Submission is currently client-side only: validation runs, a success toast
 * appears, and the form resets. A backend endpoint (POST /api/v1/contact)
 * should replace the simulated delay in Sprint 8 — ticket noted in the
 * `onSubmit()` docblock.
 *
 * Route: /contact
 * Auth:  public
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  /** Reactive form holding all four input fields. */
  readonly form: FormGroup;

  /** Submission in-flight flag — disables the submit button while true. */
  readonly submitting = signal(false);

  /** Success / error toast state. null when no toast is visible. */
  readonly toast = signal<{ msg: string; ok: boolean } | null>(null);

  /** Characters remaining for the message textarea (max 1000). */
  readonly charCount = signal(0);

  /** Static company details mirrored to the sidebar card. */
  readonly company = {
    email:   'support@dawri.com.sa',
    sales:   'sales@dawri.com.sa',
    phone:   '+966 55 000 0000',
    address: 'King Fahd Road, Al Olaya, Riyadh 12211, Saudi Arabia',
    addressAr: 'طريق الملك فهد، العليا، الرياض ١٢٢١١، المملكة العربية السعودية',
    hours:   'Sunday – Thursday, 9:00 AM – 6:00 PM (AST)',
    hoursAr: 'الأحد إلى الخميس، ٩:٠٠ صباحًا – ٦:٠٠ مساءً (بتوقيت السعودية)',
    socials: [
      { label: 'Twitter / X', href: 'https://twitter.com/dawri_gg', icon: '𝕏' },
      { label: 'Instagram',   href: 'https://instagram.com/dawri.gg', icon: '📷' },
      { label: 'LinkedIn',    href: 'https://linkedin.com/company/dawri', icon: '💼' },
      { label: 'Discord',     href: 'https://discord.gg/dawri', icon: '💬' },
    ],
  } as const;

  /** Subject dropdown options — grouped by audience. */
  readonly subjects = [
    { value: 'general',      label: 'General inquiry' },
    { value: 'support',      label: 'Account or technical support' },
    { value: 'tournament',   label: 'Tournament question' },
    { value: 'marketplace',  label: 'Marketplace / order help' },
    { value: 'billing',      label: 'Billing or subscription' },
    { value: 'partnership',  label: 'B2B / partnership opportunity' },
    { value: 'press',        label: 'Press or media' },
  ] as const;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email:   ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      subject: ['general', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });

    // Keep the visual character counter in sync with the textarea.
    this.form.get('message')?.valueChanges.subscribe((v) => {
      this.charCount.set((v ?? '').length);
    });
  }

  /** Convenience accessor for template invalid-state styling. */
  invalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  /**
   * Submit handler.
   *
   * TODO (Sprint 8): replace the simulated delay with a real POST to
   * `/api/v1/contact` once the backend ContactController + ContactMessage
   * model are in place. The form payload shape already matches what the
   * API is planned to accept.
   */
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.flashToast('Please correct the highlighted fields.', false);
      return;
    }
    this.submitting.set(true);

    // Placeholder until backend endpoint lands in Sprint 8.
    setTimeout(() => {
      this.submitting.set(false);
      this.form.reset({ subject: 'general' });
      this.charCount.set(0);
      this.flashToast(`Thanks — we'll reply within one business day.`, true);
    }, 700);
  }

  /** Show a toast for 3.5 seconds. */
  private flashToast(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3500);
  }
}
