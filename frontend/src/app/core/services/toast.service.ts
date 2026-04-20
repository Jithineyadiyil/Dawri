import { Injectable, signal } from '@angular/core';

export interface Toast { id: number; type: 'success' | 'error' | 'info' | 'warning'; message: string; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private next = 0;

  success(msg: string): void { this.add('success', msg); }
  error(msg: string):   void { this.add('error', msg); }
  info(msg: string):    void { this.add('info', msg); }
  warning(msg: string): void { this.add('warning', msg); }

  dismiss(id: number): void { this.toasts.update(ts => ts.filter(t => t.id !== id)); }

  private add(type: Toast['type'], message: string): void {
    const id = ++this.next;
    this.toasts.update(ts => [...ts, { id, type, message }]);
    setTimeout(() => this.dismiss(id), 4000);
  }
}
