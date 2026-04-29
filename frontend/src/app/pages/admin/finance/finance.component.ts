import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RevenueReportComponent } from './revenue-report.component';
import { InvoiceRegisterComponent } from './invoice-register.component';
import { VatReportComponent } from './vat-report.component';

/**
 * FinanceComponent
 *
 * Landing page for /admin/finance. Container with three sub-tabs, each
 * of which is a focused report component. Tab state is local — no URL
 * param routing in v1 (can be added later if deep-linking becomes
 * useful).
 */
@Component({
  selector: 'app-admin-finance',
  standalone: true,
  imports: [
    CommonModule,
    RevenueReportComponent,
    InvoiceRegisterComponent,
    VatReportComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent {
  readonly tab = signal<'revenue' | 'invoices' | 'vat'>('revenue');

  setTab(t: 'revenue' | 'invoices' | 'vat'): void {
    this.tab.set(t);
  }
}
