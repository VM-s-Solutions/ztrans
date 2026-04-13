import { Component, OnInit, OnDestroy, inject, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { ShipmentService } from '../../shared/services/shipment.service';
import { I18nService } from '../../shared/services/i18n.service';
import { Shipment } from '../../shared/models/shipment.model';

@Component({
  selector: 'app-shipment-map',
  imports: [RouterLink],
  templateUrl: './shipment-map.html',
  styleUrl: './shipment-map.scss',
})
export class ShipmentMap implements OnInit, OnDestroy {
  private shipmentService = inject(ShipmentService);
  private i18n = inject(I18nService);
  private map!: L.Map;
  private etaInterval: ReturnType<typeof setInterval> | null = null;
  private moveInterval: ReturnType<typeof setInterval> | null = null;
  private truckMarkers: { marker: L.Marker; shipment: Shipment }[] = [];
  mapContainer = viewChild.required<ElementRef>('mapContainer');

  activeShipments: Shipment[] = [];
  etaCountdowns: Record<string, string> = {};

  t(key: string): string { return this.i18n.t(key); }

  ngOnInit(): void {
    this.activeShipments = this.shipmentService.getActiveShipments();
    setTimeout(() => this.initMap(), 0);
    this.updateCountdowns();
    this.etaInterval = setInterval(() => this.updateCountdowns(), 1000);
  }

  ngOnDestroy(): void {
    if (this.etaInterval) clearInterval(this.etaInterval);
    if (this.moveInterval) clearInterval(this.moveInterval);
    if (this.map) this.map.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer().nativeElement, {
      center: [47.5, 8],
      zoom: 5,
      zoomControl: true,
    });

    // Dark navy-tinted map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(this.map);

    const allShipments = this.shipmentService.getShipments();
    const bounds: L.LatLngExpression[] = [];

    for (const s of allShipments) {
      // Origin marker
      const originIcon = this.createIcon(s.status === 'in_transit' ? '#4CAF50' : '#78909C', 'warehouse');
      L.marker([s.origin.lat, s.origin.lng], { icon: originIcon })
        .addTo(this.map)
        .bindPopup(`<strong>${s.origin.city}, ${s.origin.country}</strong><br>Origin — ${s.id}`);
      bounds.push([s.origin.lat, s.origin.lng]);

      // Destination marker
      const destIcon = this.createIcon(s.status === 'delivered' ? '#4CAF50' : '#1A61AB', 'flag');
      L.marker([s.destination.lat, s.destination.lng], { icon: destIcon })
        .addTo(this.map)
        .bindPopup(`<strong>${s.destination.city}, ${s.destination.country}</strong><br>Destination — ${s.id}`);
      bounds.push([s.destination.lat, s.destination.lng]);

      // Route polyline
      const routePoints: L.LatLngExpression[] = [
        [s.origin.lat, s.origin.lng],
      ];
      if (s.currentPosition) {
        routePoints.push([s.currentPosition.lat, s.currentPosition.lng]);
      }
      routePoints.push([s.destination.lat, s.destination.lng]);

      if (s.status === 'in_transit') {
        // Traveled portion (solid orange)
        L.polyline(
          [[s.origin.lat, s.origin.lng], [s.currentPosition!.lat, s.currentPosition!.lng]],
          { color: '#1A61AB', weight: 3, opacity: 0.9 }
        ).addTo(this.map);

        // Remaining portion (dashed)
        L.polyline(
          [[s.currentPosition!.lat, s.currentPosition!.lng], [s.destination.lat, s.destination.lng]],
          { color: '#1A61AB', weight: 2, opacity: 0.4, dashArray: '8, 8' }
        ).addTo(this.map);

        // Animated truck marker
        const truckIcon = L.divIcon({
          className: 'truck-marker',
          html: `<div class="truck-marker-inner">
            <span class="material-icons">local_shipping</span>
          </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        const truckMarker = L.marker([s.currentPosition!.lat, s.currentPosition!.lng], { icon: truckIcon })
          .addTo(this.map)
          .bindPopup(`
            <div style="font-family:Roboto,sans-serif;min-width:180px">
              <strong style="color:#1A61AB">${s.id}</strong><br>
              <span style="color:#666">${s.driver} — ${s.truck}</span><br>
              <span>${s.cargo}</span><br>
              <strong>ETA:</strong> ${this.formatEta(s.eta)}
            </div>
          `);
        this.truckMarkers.push({ marker: truckMarker, shipment: s });
        bounds.push([s.currentPosition!.lat, s.currentPosition!.lng]);
      } else {
        // Delivered — full route in gray
        L.polyline(routePoints, {
          color: '#78909C', weight: 2, opacity: 0.4, dashArray: '4, 6'
        }).addTo(this.map);
      }
    }

    if (bounds.length > 0) {
      this.map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }

    this.startTruckMovement();
  }

  private startTruckMovement(): void {
    // Move trucks slightly every 3 seconds to simulate GPS movement
    this.moveInterval = setInterval(() => {
      for (const { marker, shipment } of this.truckMarkers) {
        const pos = marker.getLatLng();
        const dest = shipment.destination;
        const dlat = dest.lat - pos.lat;
        const dlng = dest.lng - pos.lng;
        const dist = Math.sqrt(dlat * dlat + dlng * dlng);
        if (dist < 0.01) continue; // already at destination
        // Move ~0.005 degrees per tick (~500m)
        const step = 0.005 / dist;
        const newLat = pos.lat + dlat * step;
        const newLng = pos.lng + dlng * step;
        marker.setLatLng([newLat, newLng]);
      }
    }, 3000);
  }

  private createIcon(color: string, icon: string): L.DivIcon {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background:${color};
        width:28px;height:28px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;
      "><span class="material-icons" style="font-size:16px;color:#fff">${icon}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }

  private formatEta(eta?: string): string {
    if (!eta) return '—';
    return new Date(eta).toLocaleString();
  }

  private updateCountdowns(): void {
    const now = Date.now();
    for (const s of this.activeShipments) {
      if (s.eta) {
        const diff = new Date(s.eta).getTime() - now;
        if (diff <= 0) {
          this.etaCountdowns[s.id] = 'Arriving now';
        } else {
          const hours = Math.floor(diff / 3600000);
          const mins = Math.floor((diff % 3600000) / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          this.etaCountdowns[s.id] = `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
        }
      }
    }
  }
}
