import { Component, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private i18n = inject(I18nService);
  year = new Date().getFullYear();

  t(key: string): string { return this.i18n.t(key); }
}
