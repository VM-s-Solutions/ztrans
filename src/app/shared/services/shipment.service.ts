import { Injectable } from '@angular/core';
import { Shipment, Customer } from '../models/shipment.model';
import shipmentsData from '../../../assets/mock/shipments.json';
import customerData from '../../../assets/mock/customer.json';

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private shipments: Shipment[] = shipmentsData as Shipment[];
  private customer: Customer = customerData as Customer;

  getShipments(): Shipment[] {
    return this.shipments;
  }

  getActiveShipments(): Shipment[] {
    return this.shipments.filter(s => s.status === 'in_transit');
  }

  getDeliveredShipments(): Shipment[] {
    return this.shipments.filter(s => s.status === 'delivered');
  }

  getShipmentById(id: string): Shipment | undefined {
    return this.shipments.find(s => s.id === id);
  }

  getCustomer(): Customer {
    return this.customer;
  }
}
