import { Component, inject, input } from '@angular/core';
import { ShipmentStatus } from '../models/shipment.model';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-shipment-status-badge',
  imports: [],
  templateUrl: './shipment-status-badge.html',
  styleUrl: './shipment-status-badge.scss',
})
export class ShipmentStatusBadge {
  status = input.required<ShipmentStatus>();
  private i18n = inject(I18nService);

  get label(): string {
    return this.i18n.t(`status.${this.status()}`);
  }

  get icon(): string {
    switch (this.status()) {
      case 'in_transit': return 'local_shipping';
      case 'delivered': return 'check_circle';
      case 'pending': return 'schedule';
    }
  }
}
