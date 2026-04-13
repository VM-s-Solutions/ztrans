import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../shared/services/i18n.service';

@Component({
  selector: 'app-quote-confirmation',
  imports: [RouterLink],
  templateUrl: './quote-confirmation.html',
  styleUrl: './quote-confirmation.scss',
})
export class QuoteConfirmation {
  private router = inject(Router);
  private i18n = inject(I18nService);

  quote: Record<string, unknown> | null = null;

  t(key: string): string { return this.i18n.t(key); }

  constructor() {
    const nav = this.router.getCurrentNavigation();
    this.quote = (nav?.extras?.state as Record<string, unknown>) ?? null;

    if (!this.quote) {
      this.router.navigate(['/quote']);
    }
  }
}
