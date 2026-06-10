/**
 * Phase 3 — a minimal full-screen image lightbox. Click the backdrop or the ✕
 * to close; the image is centered and scaled to fit.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lb" (click)="onBackdrop($event)">
      <button class="close" (click)="close.emit()" title="Close" aria-label="Close">✕</button>
      <img [src]="src" alt="" class="full" />
    </div>
  `,
  styles: [`
    .lb {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(0,0,0,0.9); backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center; padding: 2rem;
      animation: fade 0.14s ease-out;
    }
    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    .full { max-width: 95vw; max-height: 92vh; object-fit: contain; border-radius: 8px; box-shadow: 0 12px 50px rgba(0,0,0,0.6); }
    .close {
      position: absolute; top: 1.1rem; right: 1.2rem;
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,0.1); border: none; color: #fff;
      font-size: 1.1rem; cursor: pointer; display: grid; place-items: center;
      transition: background 0.12s ease;
    }
    .close:hover { background: rgba(255,255,255,0.25); }
  `],
})
export class ImageLightboxComponent {
  @Input({ required: true }) src!: string;
  @Output() close = new EventEmitter<void>();

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('lb')) {
      this.close.emit();
    }
  }
}
