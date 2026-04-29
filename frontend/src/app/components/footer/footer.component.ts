import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlatformSponsorsStripComponent } from '../platform-sponsors-strip/platform-sponsors-strip.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, PlatformSponsorsStripComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
