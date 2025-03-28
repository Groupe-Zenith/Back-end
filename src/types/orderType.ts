// ordersType.ts

export type OrderStatus = 'ordered' | 'delivered' | 'partial' | 'cancelled';

export interface Order {
  id: string;  // MongoDB utilise un ObjectId
  manager_id: string;
  purchase_request_id: string;
  supplier_id: string;
  order_date: Date;
  status: OrderStatus;
  total_amount: number;
  payment_status: boolean;
  photo_url?: string;  // URL de la photo, facultatif
  createdAt?: Date;  // Date de création
  updatedAt?: Date;  // Date de mise à jour
}
