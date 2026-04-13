import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { Shipment, DocumentType } from '../../shared/models/shipment.model';

interface DocEntry {
  shipmentId: string;
  type: DocumentType;
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-documents',
  imports: [RouterLink, FormsModule],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class Documents {
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);

  allDocs: DocEntry[] = [];
  filteredDocs: DocEntry[] = [];
  activeFilter: string = 'all';
  docTypes: string[] = [];
  searchQuery: string = '';

  t(key: string): string { return this.i18n.t(key); }

  constructor() {
    const shipments = this.shipmentService.getShipments();
    const typeSet = new Set<string>();

    for (const s of shipments) {
      for (const doc of s.documents) {
        this.allDocs.push({
          shipmentId: s.id,
          type: doc,
          origin: `${s.origin.city}, ${s.origin.country}`,
          destination: `${s.destination.city}, ${s.destination.country}`,
        });
        typeSet.add(doc);
      }
    }
    this.docTypes = [...typeSet];
    this.filteredDocs = this.allDocs;
  }

  filterBy(type: string): void {
    this.activeFilter = type;
    this.applyFilters();
  }

  applyFilters(): void {
    let docs = this.activeFilter === 'all'
      ? this.allDocs
      : this.allDocs.filter(d => d.type === this.activeFilter);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      docs = docs.filter(d =>
        d.shipmentId.toLowerCase().includes(q) ||
        d.origin.toLowerCase().includes(q) ||
        d.destination.toLowerCase().includes(q)
      );
    }

    this.filteredDocs = docs;
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
}
