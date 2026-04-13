import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { DocumentType } from '../../shared/models/shipment.model';

interface DocEntry {
  shipmentId: string;
  type: DocumentType;
  origin: string;
  destination: string;
  departedAt: string;
}

type SortKey = 'newest' | 'oldest' | 'shipment_id' | 'type';

@Component({
  selector: 'app-documents',
  imports: [RouterLink, FormsModule, MatPaginatorModule],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class Documents implements AfterViewInit {
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);
  private paginatorIntl = inject(MatPaginatorIntl);

  allDocs: DocEntry[] = [];
  filteredDocs: DocEntry[] = [];
  pagedDocs: DocEntry[] = [];
  activeFilter: string = 'all';
  docTypes: string[] = [];
  searchQuery: string = '';
  sortKey: SortKey = 'newest';

  pageSize = 12;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
          departedAt: s.departedAt,
        });
        typeSet.add(doc);
      }
    }
    this.docTypes = [...typeSet];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.localizePaginator();
  }

  private localizePaginator(): void {
    this.paginatorIntl.itemsPerPageLabel = this.t('paginator.per_page');
    this.paginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length === 0) return `0 ${this.t('paginator.of')} 0`;
      const start = page * pageSize + 1;
      const end = Math.min((page + 1) * pageSize, length);
      return `${start} – ${end} ${this.t('paginator.of')} ${length}`;
    };
    this.paginatorIntl.changes.next();
  }

  filterBy(type: string): void {
    this.activeFilter = type;
    this.applyFilters();
  }

  setSort(key: SortKey): void {
    this.sortKey = key;
    this.applyFilters();
  }

  applyFilters(): void {
    let docs = this.activeFilter === 'all'
      ? [...this.allDocs]
      : this.allDocs.filter(d => d.type === this.activeFilter);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      docs = docs.filter(d =>
        d.shipmentId.toLowerCase().includes(q) ||
        d.origin.toLowerCase().includes(q) ||
        d.destination.toLowerCase().includes(q)
      );
    }

    docs.sort((a, b) => {
      switch (this.sortKey) {
        case 'newest': return new Date(b.departedAt).getTime() - new Date(a.departedAt).getTime();
        case 'oldest': return new Date(a.departedAt).getTime() - new Date(b.departedAt).getTime();
        case 'shipment_id': return b.shipmentId.localeCompare(a.shipmentId);
        case 'type': return a.type.localeCompare(b.type);
      }
    });

    this.filteredDocs = docs;
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
    this.updatePagedDocs();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedDocs();
  }

  private updatePagedDocs(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedDocs = this.filteredDocs.slice(start, start + this.pageSize);
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
