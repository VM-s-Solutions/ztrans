import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../shared/services/i18n.service';
import { ShipmentService } from '../../shared/services/shipment.service';

export interface QuoteRequest {
  origin: string;
  destination: string;
  cargoType: string;
  weight: number | null;
  pickupDate: string;
  contactName: string;
  contactEmail: string;
  notes: string;
}

@Component({
  selector: 'app-quote',
  imports: [FormsModule],
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
})
export class Quote {
  private router = inject(Router);
  private i18n = inject(I18nService);
  private shipmentService = inject(ShipmentService);

  t(key: string): string { return this.i18n.t(key); }

  skCities = ['Púchov', 'Bratislava', 'Žilina', 'Trnava', 'Nitra', 'Prešov', 'Košice'];
  frCities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Strasbourg', 'Lille', 'Nantes', 'Toulouse', 'Nice', 'Rennes'];
  cargoTypes = ['Pallets — standard', 'Pallets — oversized', 'Bulk cargo', 'Temperature-controlled', 'ADR — hazardous'];

  form: QuoteRequest = {
    origin: '',
    destination: '',
    cargoType: '',
    weight: null,
    pickupDate: '',
    contactName: this.shipmentService.getCustomer().contactPerson,
    contactEmail: this.shipmentService.getCustomer().email,
    notes: '',
  };

  get minDate(): string {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  submit(): void {
    if (!this.form.origin || !this.form.destination || !this.form.cargoType || !this.form.weight || !this.form.pickupDate) return;

    const quoteId = 'Q-2026-' + String(Math.floor(Math.random() * 9000) + 1000);

    this.router.navigate(['/quote/confirmation'], {
      state: { ...this.form, quoteId },
    });
  }
}
