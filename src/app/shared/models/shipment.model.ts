export interface GeoPoint {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface CurrentPosition {
  lat: number;
  lng: number;
  updatedAt: string;
}

export type ShipmentStatus = 'in_transit' | 'delivered' | 'pending';
export type DocumentType = 'cmr' | 'delivery_note' | 'pod' | 'invoice' | 'customs_declaration';

export interface Shipment {
  id: string;
  origin: GeoPoint;
  destination: GeoPoint;
  status: ShipmentStatus;
  currentPosition: CurrentPosition | null;
  departedAt: string;
  eta?: string;
  deliveredAt?: string;
  driver: string;
  truck: string;
  cargo: string;
  weight: string;
  documents: DocumentType[];
}

export interface Customer {
  id: string;
  company: string;
  country: string;
  language: string;
  contactPerson: string;
  email: string;
  activeShipments: number;
  totalShipments: number;
  since: string;
}
