import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { ShipmentStatusBadge } from '../../shared/shipment-status-badge/shipment-status-badge';
import { Shipment } from '../../shared/models/shipment.model';

@Component({
  selector: 'app-shipment-history',
  imports: [RouterLink, DatePipe, FormsModule, MatTableModule, MatSortModule, ShipmentStatusBadge],
  templateUrl: './shipment-history.html',
  styleUrl: './shipment-history.scss',
})
export class ShipmentHistory implements AfterViewInit {
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);

  displayedColumns = ['id', 'origin', 'destination', 'status', 'departed', 'driver'];
  allShipments = this.shipmentService.getShipments();
  dataSource = new MatTableDataSource<Shipment>(this.allShipments);

  searchQuery = '';
  dateFrom = '';
  dateTo = '';

  @ViewChild(MatSort) sort!: MatSort;

  t(key: string): string { return this.i18n.t(key); }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Shipment, property: string) => {
      switch (property) {
        case 'origin': return item.origin.city;
        case 'destination': return item.destination.city;
        case 'departed': return item.departedAt;
        default: return (item as unknown as Record<string, unknown>)[property] as string;
      }
    };
  }

  applyFilters(): void {
    let filtered = this.allShipments;

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.id.toLowerCase().includes(q) ||
        s.origin.city.toLowerCase().includes(q) ||
        s.destination.city.toLowerCase().includes(q) ||
        s.driver.toLowerCase().includes(q) ||
        s.cargo.toLowerCase().includes(q)
      );
    }

    if (this.dateFrom) {
      const from = new Date(this.dateFrom).getTime();
      filtered = filtered.filter(s => new Date(s.departedAt).getTime() >= from);
    }

    if (this.dateTo) {
      const to = new Date(this.dateTo).getTime() + 86400000; // end of day
      filtered = filtered.filter(s => new Date(s.departedAt).getTime() <= to);
    }

    this.dataSource.data = filtered;
  }
}
