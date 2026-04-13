import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { ShipmentStatusBadge } from '../../shared/shipment-status-badge/shipment-status-badge';
import { Shipment, DocumentType } from '../../shared/models/shipment.model';

@Component({
  selector: 'app-shipment-detail',
  imports: [RouterLink, DatePipe, ShipmentStatusBadge],
  templateUrl: './shipment-detail.html',
  styleUrl: './shipment-detail.scss',
})
export class ShipmentDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);

  shipment: Shipment | undefined;

  t(key: string): string { return this.i18n.t(key); }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shipment = this.shipmentService.getShipmentById(id);
    }
  }

  docLabel(type: DocumentType): string {
    return this.i18n.t(`doc.${type}`);
  }

  docIcon(type: DocumentType): string {
    switch (type) {
      case 'cmr': return 'article';
      case 'delivery_note': return 'receipt_long';
      case 'pod': return 'verified';
      case 'invoice': return 'request_quote';
      case 'customs_declaration': return 'gavel';
    }
  }

  downloadDoc(type: DocumentType): void {
    const fileMap: Record<DocumentType, string> = {
      cmr: 'cmr-sample.pdf',
      delivery_note: 'delivery-note-sample.pdf',
      pod: 'pod-sample.pdf',
      invoice: 'invoice-sample.pdf',
      customs_declaration: 'customs-declaration-sample.pdf',
    };
    const link = document.createElement('a');
    link.href = `assets/docs/${fileMap[type]}`;
    link.download = fileMap[type];
    link.click();
  }

  get timelineSteps(): { label: string; icon: string; done: boolean; date?: string }[] {
    if (!this.shipment) return [];
    const s = this.shipment;
    const isDelivered = s.status === 'delivered';

    return [
      { label: this.t('timeline.pickup'), icon: 'warehouse', done: true, date: s.departedAt },
      { label: this.t('timeline.in_transit'), icon: 'local_shipping', done: true, date: s.departedAt },
      { label: this.t('timeline.border_crossing'), icon: 'flag', done: isDelivered || s.status === 'in_transit' },
      { label: this.t('timeline.delivered'), icon: 'check_circle', done: isDelivered, date: s.deliveredAt },
    ];
  }
}
