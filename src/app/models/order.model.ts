export interface Order {
    id?: string;
    name: string;
    phone: string;
    weddingDate: string;
    note?: string;
    items: any[];
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt?: Date | string;
}