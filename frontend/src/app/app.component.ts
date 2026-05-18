import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent }    from './shared/components/nav/nav.component';
import { SidebarAdComponent } from './components/sidebar-ad/sidebar-ad.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent }  from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, SidebarAdComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
