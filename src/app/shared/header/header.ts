import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService, Lang } from '../services/i18n.service';

interface LangOption {
  code: Lang;
  label: string;
  /** ISO 3166-1 alpha-2 country code used by the flag-icons library */
  flagCode: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private i18n = inject(I18nService);
  private el = inject(ElementRef<HTMLElement>);
  mobileMenuOpen = false;
  langMenuOpen = false;

  readonly langs: LangOption[] = [
    { code: 'sk', label: 'SK', flagCode: 'sk' },
    { code: 'fr', label: 'FR', flagCode: 'fr' },
    { code: 'en', label: 'EN', flagCode: 'gb' },
  ];

  get lang() { return this.i18n.lang(); }

  get currentLang(): LangOption {
    return this.langs.find(l => l.code === this.lang) ?? this.langs[2];
  }

  t(key: string): string { return this.i18n.t(key); }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
    this.langMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleLangMenu(event: Event): void {
    event.stopPropagation();
    this.langMenuOpen = !this.langMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.langMenuOpen && !this.el.nativeElement.contains(event.target)) {
      this.langMenuOpen = false;
    }
  }
}
