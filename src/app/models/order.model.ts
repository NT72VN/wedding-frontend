export interface Order {
    _id?: string;  // Thêm dòng này để khớp với MongoDB
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
