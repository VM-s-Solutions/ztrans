import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { ShipmentStatusBadge } from '../../shared/shipment-status-badge/shipment-status-badge';
import { Shipment, Customer } from '../../shared/models/shipment.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, SlicePipe, ShipmentStatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);

  customer: Customer = this.shipmentService.getCustomer();
  shipments: Shipment[] = this.shipmentService.getShipments();
  activeShipments: Shipment[] = this.shipmentService.getActiveShipments();
  deliveredShipments: Shipment[] = this.shipmentService.getDeliveredShipments();

  // Weekly shipment counts for sparkline (last 8 weeks)
  weeklyData: number[] = this.computeWeeklyData();
  weeklySparkline: string = this.buildSparklinePath(this.weeklyData);

  // On-time delivery rate (mock: ~92%)
  onTimeRate = this.computeOnTimeRate();

  // Avg transit time in hours
  avgTransitTime = this.computeAvgTransit();

  t(key: string): string { return this.i18n.t(key); }

  get nextEta(): string {
    const next = this.activeShipments
      .filter(s => s.eta)
      .sort((a, b) => new Date(a.eta!).getTime() - new Date(b.eta!).getTime())[0];
    if (!next?.eta) return '—';
    const d = new Date(next.eta);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  get nextEtaShipment(): Shipment | undefined {
    return this.activeShipments
      .filter(s => s.eta)
      .sort((a, b) => new Date(a.eta!).getTime() - new Date(b.eta!).getTime())[0];
  }

  private computeWeeklyData(): number[] {
    const now = Date.now();
    const weeks: number[] = [];
    for (let w = 7; w >= 0; w--) {
      const weekStart = now - (w + 1) * 7 * 86400000;
      const weekEnd = now - w * 7 * 86400000;
      const count = this.shipments.filter(s => {
        const dep = new Date(s.departedAt).getTime();
        return dep >= weekStart && dep < weekEnd;
      }).length;
      weeks.push(count);
    }
    return weeks;
  }

  private buildSparklinePath(data: number[]): string {
    if (data.length === 0) return '';
    const max = Math.max(...data, 1);
    const w = 100;
    const h = 30;
    const stepX = w / (data.length - 1);
    return data.map((v, i) => {
      const x = i * stepX;
      const y = h - (v / max) * (h - 4) - 2;
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  }

  private computeOnTimeRate(): number {
    const delivered = this.shipments.filter(s => s.status === 'delivered' && s.eta && s.deliveredAt);
    if (delivered.length === 0) return 0;
    const onTime = delivered.filter(s => new Date(s.deliveredAt!).getTime() <= new Date(s.eta!).getTime() + 3600000);
    return Math.round((onTime.length / delivered.length) * 100);
  }

  private computeAvgTransit(): string {
    const delivered = this.shipments.filter(s => s.status === 'delivered' && s.deliveredAt);
    if (delivered.length === 0) return '—';
    const totalHours = delivered.reduce((sum, s) => {
      return sum + (new Date(s.deliveredAt!).getTime() - new Date(s.departedAt).getTime()) / 3600000;
    }, 0);
    const avg = totalHours / delivered.length;
    return `${Math.round(avg)}h`;
  }
}
