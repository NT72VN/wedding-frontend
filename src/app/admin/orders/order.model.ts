export interface Order {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled';
  createdAt: string;
  items: any[];
}