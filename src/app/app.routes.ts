import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    title: 'Dashboard — Z-TRANS',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'map',
    title: 'Shipment Map — Z-TRANS',
    loadComponent: () => import('./pages/shipment-map/shipment-map').then(m => m.ShipmentMap),
  },
  {
    path: 'shipment/:id',
    title: 'Shipment Detail — Z-TRANS',
    loadComponent: () => import('./pages/shipment-detail/shipment-detail').then(m => m.ShipmentDetail),
  },
  {
    path: 'history',
    title: 'Shipment History — Z-TRANS',
    loadComponent: () => import('./pages/shipment-history/shipment-history').then(m => m.ShipmentHistory),
  },
  {
    path: 'documents',
    title: 'Documents — Z-TRANS',
    loadComponent: () => import('./pages/documents/documents').then(m => m.Documents),
  },
  {
    path: 'quote',
    title: 'Request a Quote — Z-TRANS',
    loadComponent: () => import('./pages/quote/quote').then(m => m.Quote),
  },
  {
    path: 'quote/confirmation',
    title: 'Quote Submitted — Z-TRANS',
    loadComponent: () => import('./pages/quote-confirmation/quote-confirmation').then(m => m.QuoteConfirmation),
  },
];
