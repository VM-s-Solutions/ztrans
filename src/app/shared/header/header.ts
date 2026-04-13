import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService, Lang } from '../services/i18n.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private i18n = inject(I18nService);
  mobileMenuOpen = false;

  get lang() { return this.i18n.lang(); }

  t(key: string): string { return this.i18n.t(key); }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
